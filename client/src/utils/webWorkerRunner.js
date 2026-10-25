/**
 * Sandboxed In-Browser Web Worker for Safe JavaScript Execution
 * 
 * Provides client-side execution when no remote Judge0 provider is configured.
 * Safely executes in an isolated Web Worker thread with:
 * - No DOM / window / localStorage access
 * - Strict timeout (default 3000ms) with worker.terminate()
 * - Captured console.log / console.error
 * - Output buffer size capping (10KB)
 */

const WORKER_SCRIPT = `
self.onmessage = function(e) {
  const { code, stdin } = e.data;
  const startTime = Date.now();
  let stdoutLogs = [];
  let stderrLogs = [];
  const MAX_LOG_BYTES = 10 * 1024;

  function safeStringify(arg) {
    if (arg === undefined) return 'undefined';
    if (arg === null) return 'null';
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (err) {
        return String(arg);
      }
    }
    return String(arg);
  }

  // Intercept standard console methods
  console.log = function(...args) {
    const text = args.map(safeStringify).join(' ');
    stdoutLogs.push(text);
  };
  console.info = console.log;
  console.warn = function(...args) {
    const text = args.map(safeStringify).join(' ');
    stdoutLogs.push('[WARN] ' + text);
  };
  console.error = function(...args) {
    const text = args.map(safeStringify).join(' ');
    stderrLogs.push(text);
  };

  try {
    // Provide a simple readline/stdin polyfill if candidate reads inputs
    const stdinLines = (stdin || '').split('\\n');
    let lineIdx = 0;
    self.readline = function() {
      return lineIdx < stdinLines.length ? stdinLines[lineIdx++] : '';
    };

    // Evaluate in worker scope
    const runnerFn = new Function('console', 'readline', 'stdin', code);
    const result = runnerFn(console, self.readline, stdin);

    if (result !== undefined && stdoutLogs.length === 0) {
      stdoutLogs.push(safeStringify(result));
    }

    let stdout = stdoutLogs.join('\\n');
    let stderr = stderrLogs.join('\\n');

    if (stdout.length > MAX_LOG_BYTES) {
      stdout = stdout.slice(0, MAX_LOG_BYTES) + '\\n... [Output truncated: exceeded 10KB limit]';
    }

    self.postMessage({
      status: 'success',
      stdout,
      stderr,
      exitCode: 0,
      durationMs: Date.now() - startTime,
      provider: 'browser_web_worker'
    });
  } catch (err) {
    self.postMessage({
      status: 'runtime_error',
      stdout: stdoutLogs.join('\\n'),
      stderr: String(err && err.stack ? err.stack : err),
      exitCode: 1,
      durationMs: Date.now() - startTime,
      provider: 'browser_web_worker'
    });
  }
};
`;

/**
 * Run JavaScript code in isolated browser Web Worker
 */
export function runInWebWorker({ code, stdin = '', timeoutMs = 3000 }) {
  return new Promise((resolve) => {
    let worker = null;
    let timedOut = false;

    try {
      const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      worker = new Worker(workerUrl);

      const timer = setTimeout(() => {
        timedOut = true;
        if (worker) {
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
        }
        resolve({
          status: 'time_limit_exceeded',
          stdout: '',
          stderr: `Time Limit Exceeded: JavaScript execution exceeded ${Math.round(timeoutMs / 1000)}s timeout in browser sandbox. Check for infinite loops or deep recursion.`,
          exitCode: 1,
          durationMs: timeoutMs,
          provider: 'browser_web_worker'
        });
      }, timeoutMs);

      worker.onmessage = (event) => {
        if (timedOut) return;
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        resolve(event.data);
      };

      worker.onerror = (errEvent) => {
        if (timedOut) return;
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        resolve({
          status: 'runtime_error',
          stdout: '',
          stderr: errEvent.message || 'Worker syntax error',
          exitCode: 1,
          durationMs: 0,
          provider: 'browser_web_worker'
        });
      };

      worker.postMessage({ code, stdin });
    } catch (err) {
      resolve({
        status: 'error',
        stdout: '',
        stderr: `Failed to initialize browser worker: ${err.message}`,
        exitCode: 1,
        durationMs: 0,
        provider: 'browser_web_worker'
      });
    }
  });
}
