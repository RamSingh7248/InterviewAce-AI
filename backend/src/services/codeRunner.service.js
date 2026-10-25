/**
 * InterviewAce AI - Secure CodeRunner Interface
 * 
 * SECURITY STRICT RULE:
 * NEVER execute user code directly on the backend host (no eval, vm, child_process, exec, or spawn).
 * Remote execution is delegated to configured sandboxed providers (Judge0, Piston).
 * If no provider is configured, the runner reports 'no_provider'.
 * JavaScript runs client-side in a sandboxed Web Worker.
 */

const MAX_OUTPUT_BYTES = 10 * 1024; // 10 KB limit
const DEFAULT_TIMEOUT_MS = 5000;    // 5 seconds max
const DEFAULT_MEMORY_LIMIT_KB = 128 * 1024; // 128 MB

// Judge0 Language IDs
const JUDGE0_LANGUAGE_IDS = {
  javascript: 63, // Node.js
  typescript: 74, // TypeScript
  python: 71,     // Python 3
  java: 62,       // OpenJDK
  cpp: 54,        // C++ (GCC 9.2.0)
  'c++': 54,
  c: 50,          // C (GCC 9.2.0)
  go: 60,         // Go
  rust: 73        // Rust
};

/**
 * Truncate output to avoid denial of service through huge logs
 */
function truncateOutput(str) {
  if (!str) return '';
  if (typeof str !== 'string') str = String(str);
  if (str.length > MAX_OUTPUT_BYTES) {
    return str.slice(0, MAX_OUTPUT_BYTES) + '\n... [Output truncated: exceeded 10KB limit]';
  }
  return str;
}

/**
 * Judge0 Provider Implementation
 */
class Judge0Provider {
  constructor() {
    this.apiUrl = process.env.JUDGE0_API_URL || process.env.JUDGE0_URL || '';
    this.apiKey = process.env.JUDGE0_API_KEY || process.env.JUDGE0_KEY || '';
  }

  isConfigured() {
    return Boolean(this.apiUrl && this.apiUrl.trim());
  }

  async execute({ code, language, stdin = '', timeoutMs = DEFAULT_TIMEOUT_MS }) {
    const langKey = (language || 'javascript').toLowerCase().trim();
    const languageId = JUDGE0_LANGUAGE_IDS[langKey] || JUDGE0_LANGUAGE_IDS.javascript;
    const startTime = Date.now();

    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.apiKey) {
      headers['X-Auth-Token'] = this.apiKey;
      headers['x-rapidapi-key'] = this.apiKey;
    }

    const payload = {
      source_code: code,
      language_id: languageId,
      stdin: stdin || '',
      cpu_time_limit: Math.min(Math.max(1, Math.floor(timeoutMs / 1000)), 10),
      memory_limit: DEFAULT_MEMORY_LIMIT_KB
    };

    const endpoint = `${this.apiUrl.replace(/\/+$/, '')}/submissions?base64_encoded=false&wait=true`;
    
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs + 2000);

    try {
      const response = await globalThis.fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errText = await response.text();
        return {
          status: 'error',
          stdout: '',
          stderr: truncateOutput(`Judge0 execution error (${response.status}): ${errText}`),
          exitCode: 1,
          durationMs: Date.now() - startTime,
          provider: 'judge0'
        };
      }

      const result = await response.json();
      const stdout = truncateOutput(result.stdout || '');
      const compileErr = truncateOutput(result.compile_output || '');
      const stderr = truncateOutput(result.stderr || '');
      const statusId = result.status?.id;

      // Judge0 status IDs: 3 = Accepted, 4 = Wrong Answer, 5 = Time Limit Exceeded, 6 = Compilation Error, etc.
      let execStatus = 'success';
      if (statusId === 6) {
        execStatus = 'compile_error';
      } else if (statusId === 5) {
        execStatus = 'time_limit_exceeded';
      } else if (statusId > 3) {
        execStatus = 'runtime_error';
      }

      return {
        status: execStatus,
        stdout,
        stderr: compileErr ? `${compileErr}\n${stderr}`.trim() : stderr,
        exitCode: statusId === 3 ? 0 : 1,
        durationMs: Date.now() - startTime,
        memoryUsedKb: result.memory || 0,
        provider: 'judge0'
      };
    } catch (err) {
      clearTimeout(timer);
      const isTimeout = err.name === 'AbortError';
      return {
        status: isTimeout ? 'time_limit_exceeded' : 'error',
        stdout: '',
        stderr: isTimeout ? 'Execution timed out.' : `Judge0 connection failed: ${err.message}`,
        exitCode: 1,
        durationMs: Date.now() - startTime,
        provider: 'judge0'
      };
    }
  }
}

/**
 * Mock Provider for automated testing & CI without external network dependencies
 */
class MockProvider {
  constructor() {
    this.name = 'mock';
  }

  isConfigured() {
    return true;
  }

  async execute({ code, language, stdin = '', timeoutMs = DEFAULT_TIMEOUT_MS }) {
    const startTime = Date.now();

    // Check for obvious syntax or intent
    if (!code || !code.trim()) {
      return {
        status: 'error',
        stdout: '',
        stderr: 'Empty code submission.',
        exitCode: 1,
        durationMs: 5,
        provider: 'mock'
      };
    }

    // Simulate mock runner
    return {
      status: 'success',
      stdout: `[MockRunner ${language}] Execution completed.\nInput: ${stdin || '(none)'}`,
      stderr: '',
      exitCode: 0,
      durationMs: 25,
      memoryUsedKb: 2048,
      provider: 'mock'
    };
  }
}

/**
 * Null Provider when no remote runner is configured
 */
class NullProvider {
  isConfigured() {
    return false;
  }

  async execute({ language }) {
    return {
      status: 'no_provider',
      stdout: '',
      stderr: `No remote execution server (Judge0) configured in environment. JavaScript can be run safely in the browser Web Worker. You may still Submit your code for comprehensive AI evaluation and feedback.`,
      exitCode: 1,
      durationMs: 0,
      provider: 'none'
    };
  }
}

/**
 * Factory to retrieve the active CodeRunner provider
 */
export function getCodeRunner() {
  const chosenProvider = (process.env.CODE_RUNNER_PROVIDER || '').toLowerCase();

  if (chosenProvider === 'mock') {
    return new MockProvider();
  }

  const judge0 = new Judge0Provider();
  if (judge0.isConfigured() || chosenProvider === 'judge0') {
    return judge0;
  }

  return new NullProvider();
}

/**
 * High-level execution entry point
 */
export async function runCode({ code, language = 'javascript', stdin = '', timeoutMs = DEFAULT_TIMEOUT_MS }) {
  const runner = getCodeRunner();
  return await runner.execute({ code, language, stdin, timeoutMs });
}
