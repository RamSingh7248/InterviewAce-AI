/**
 * InterviewAce AI - Code Execution Service
 * 
 * Delegates exclusively to the secure CodeRunner interface.
 * Zero usage of child_process, exec, eval, or vm on the host server.
 */

import { runCode, getCodeRunner } from './codeRunner.service.js';

export async function executeCode({ code, language = 'java', stdin = '', timeout = 5000 }) {
  return await runCode({
    code,
    language,
    stdin,
    timeoutMs: timeout
  });
}

export function isCodeExecutionConfigured() {
  const runner = getCodeRunner();
  return runner.isConfigured();
}
