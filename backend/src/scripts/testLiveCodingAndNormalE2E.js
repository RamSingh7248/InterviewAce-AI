/**
 * End-to-end Verification Script:
 * 1. Test Normal Interview Flow (Mixed mode)
 * 2. Test Live Coding Interview Flow (live_coding mode)
 * 3. Verify Code Execution (Valid Java, Syntax Error, Timeout)
 * 4. Verify Code Solution Submission & Evaluation Persistence
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import { executeCode } from '../services/codeExecution.service.js';

const BASE_URL = 'http://localhost:5000/api';

async function runE2EVerification() {
  console.log('\n======================================================');
  console.log('   INTERVIEWACE AI - LIVE CODING & NORMAL E2E TEST   ');
  console.log('======================================================\n');

  let passes = 0;
  let fails = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log('  [PASS] ' + msg);
      passes++;
    } else {
      console.error('  [FAIL] ' + msg);
      fails++;
    }
  }

  // 1. Authenticate / Login test user
  console.log('--- 1. Authenticating Test User ---');
  let token = '';
  let userId = '';

  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
  });

  if (loginRes.ok) {
    const data = await loginRes.json();
    token = data.token;
    userId = data.user?._id || data.user?.id;
    assert(!!token, 'Login successful, received JWT token');
  } else {
    // Register if user doesn't exist
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Live Coding Tester',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const sData = await signupRes.json();
    token = sData.token;
    userId = sData.user?._id || sData.user?.id;
    assert(!!token, 'Signup successful, received JWT token');
  }

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  // 2. Test Normal Interview Flow (Preserve existing flow)
  console.log('\n--- 2. Testing Normal Interview Flow (Mixed Mode) ---');
  const normalStartRes = await fetch(`${BASE_URL}/interviews/start`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 2,
      interviewMode: 'mixed',
      targetRole: 'Software Engineer',
      experienceLevel: 'fresher'
    })
  });

  const normalData = await normalStartRes.json();
  assert(normalStartRes.status === 201, 'Normal interview created (HTTP 201)');
  assert(normalData.interview?.interviewMode === 'mixed', "Normal interview mode is 'mixed'");
  const normalId = normalData.interview?._id;

  const normalGetRes = await fetch(`${BASE_URL}/interviews/${normalId}`, {
    headers: authHeaders
  });
  const normalGetData = await normalGetRes.json();
  assert(normalGetRes.status === 200, 'Normal interview fetched successfully (HTTP 200)');
  assert(normalGetData.interview?.interviewMode === 'mixed', "Fetched mode preserved as 'mixed'");

  // 3. Test Live Coding Interview Flow
  console.log('\n--- 3. Testing Live Coding Interview Creation ---');
  const codingStartRes = await fetch(`${BASE_URL}/interviews/start`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 2,
      interviewMode: 'live_coding',
      targetRole: 'Software Engineer',
      experienceLevel: 'fresher'
    })
  });

  const codingData = await codingStartRes.json();
  assert(codingStartRes.status === 201, 'Live coding interview created (HTTP 201)');
  assert(codingData.interview?.interviewMode === 'live_coding', "Live coding interview mode is 'live_coding'");
  const codingId = codingData.interview?._id;

  const codingGetRes = await fetch(`${BASE_URL}/interviews/${codingId}`, {
    headers: authHeaders
  });
  const codingGetData = await codingGetRes.json();
  assert(codingGetRes.status === 200, 'Live coding interview fetched successfully');
  assert(codingGetData.interview?.interviewMode === 'live_coding', "Live coding mode preserved in database");

  // 4. Test Code Execution Endpoint (POST /api/interviews/:id/code/execute)
  console.log('\n--- 4. Testing Code Execution Endpoint ---');
  
  // 4a. Valid Java execution
  const javaCode = `public class Main {
    public static void main(String[] args) {
      System.out.println("Hello from Live Coding Test! Sum: " + (25 + 75));
    }
  }`;

  const execRes1 = await fetch(`${BASE_URL}/interviews/${codingId}/code/execute`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      code: javaCode,
      language: 'java'
    })
  });

  const execData1 = await execRes1.json();
  assert(execRes1.status === 200, 'Code execution endpoint returned HTTP 200');
  assert(execData1.status === 'success', 'Code execution status is success');
  assert(execData1.execution?.stdout?.includes('Sum: 100'), `Execution output contains expected stdout (got: ${execData1.execution?.stdout?.trim()})`);
  assert(execData1.execution?.exitCode === 0, 'Exit code is 0');

  // 4b. Java Syntax Error
  const syntaxErrorCode = `public class Main {
    public static void main(String[] args) {
      System.out.println("No semicolon")
    }
  }`;

  const execRes2 = await fetch(`${BASE_URL}/interviews/${codingId}/code/execute`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      code: syntaxErrorCode,
      language: 'java'
    })
  });

  const execData2 = await execRes2.json();
  assert(execRes2.status === 200, 'Syntax error handled gracefully with HTTP 200');
  assert(execData2.execution?.status === 'compile_error' || execData2.execution?.exitCode !== 0, 'Status flags compile error correctly');
  assert(execData2.execution?.stderr?.length > 0, 'Compiler error details returned in stderr');

  // 4c. Execution Timeout
  const timeoutCode = `public class Main {
    public static void main(String[] args) {
      while(true) {}
    }
  }`;

  const execRes3 = await fetch(`${BASE_URL}/interviews/${codingId}/code/execute`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      code: timeoutCode,
      language: 'java'
    })
  });

  const execData3 = await execRes3.json();
  assert(execRes3.status === 200, 'Timeout handled gracefully with HTTP 200');
  assert(execData3.execution?.status === 'timeout', `Execution status marked as timeout (got: ${execData3.execution?.status})`);

  // 5. Test Solution Submission (POST /api/interviews/:id/code/submit)
  console.log('\n--- 5. Testing Solution Submission & Evaluation ---');
  const solutionCode = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Solution implementation with O(N) time and O(1) space complexity
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        System.out.println("Result: " + sum);
    }
}`;

  const submitRes = await fetch(`${BASE_URL}/interviews/${codingId}/code/submit`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      code: solutionCode,
      language: 'java'
    })
  });

  const submitData = await submitRes.json();
  assert(submitRes.status === 200, 'Solution submission returned HTTP 200');
  assert(submitData.status === 'success', 'Submission status is success');
  assert(submitData.evaluation && typeof submitData.evaluation.score === 'number', `Evaluation contains score (score: ${submitData.evaluation?.score}/10)`);
  assert(Array.isArray(submitData.evaluation?.strengths), 'Evaluation contains strengths list');
  assert(Array.isArray(submitData.evaluation?.suggestions), 'Evaluation contains suggestions list');

  // 6. Verify Results Persistence
  console.log('\n--- 6. Verifying Results Persistence ---');
  const afterSubmitRes = await fetch(`${BASE_URL}/interviews/${codingId}`, {
    headers: authHeaders
  });
  const afterSubmitData = await afterSubmitRes.json();
  const q0 = afterSubmitData.interview?.questions?.[0];
  assert(q0?.isAnswered === true, 'Question 0 marked as answered');
  assert(q0?.userAnswer === solutionCode, 'Question 0 saved candidate code solution');
  assert(q0?.evaluation?.score !== undefined, `Persisted score is ${q0?.evaluation?.score}`);

  // Summary
  console.log('\n======================================================');
  console.log(`TOTAL PASSES: ${passes}`);
  console.log(`TOTAL FAILS : ${fails}`);
  console.log('======================================================\n');

  if (fails > 0) {
    process.exit(1);
  } else {
    console.log('SUCCESS: All backend Live Coding and Normal Interview tests passed!');
    process.exit(0);
  }
}

runE2EVerification().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
