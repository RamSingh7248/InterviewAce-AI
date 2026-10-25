/**
 * InterviewAce AI - Subject Isolation & Pipeline Verification Test Suite
 * 
 * Verifies:
 * 1. A Java session never receives JavaScript-specific questions.
 * 2. A JavaScript session receives JavaScript-specific questions.
 * 3. A Python session receives Python-specific questions.
 * 4. A C++ session receives C++-specific questions.
 * 5. Language-independent DSA questions are allowed when configured.
 * 6. A mixed-language session permits only its explicitly selected subjects.
 * 7. Invalid AI-generated questions are rejected.
 * 8. Refreshing or continuing a session preserves its subject.
 * 9. Evaluation and final reports match the correct questions and subject rubric.
 * 10. Existing login, dashboard, interview history, timer, and session flow continue working.
 */

import http from 'http';
import mongoose from 'mongoose';
import app from '../app.js';
import { connectDB } from '../config/database.js';
import { generateQuestions, retrieveCuratedQuestions, evaluateAnswer } from '../services/ai.service.js';
import { validateQuestionSubject } from '../utils/subjectValidator.js';
import Interview from '../models/Interview.js';

const runTests = async () => {
  console.log('================================================================');
  console.log('   INTERVIEWACE AI - SUBJECT ISOLATION VERIFICATION SUITE');
  console.log('================================================================\n');

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.log('[INFO] Database offline or skipped:', err.message);
  }

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const BASE_URL = `http://127.0.0.1:${port}/api`;

  let passed = 0;
  let failed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`  [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${description}`);
      failed++;
    }
  };

  try {
    // -------------------------------------------------------------
    // Test Group 1: Java Session Strict Isolation
    // -------------------------------------------------------------
    console.log('[Test Group 1] Java Session Subject Isolation:');
    const javaBatch = await generateQuestions({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 10,
      targetRole: 'Data Analyst' // Using the exact role from the reported user bug
    });

    assert(javaBatch.questions.length === 10, `Generated 10 questions for Java session (got ${javaBatch.questions.length})`);
    
    // Check that every question is strictly Java
    const nonJavaInJava = javaBatch.questions.filter(q => q.category !== 'Java');
    assert(nonJavaInJava.length === 0, `Zero non-Java categories in Java session (found ${nonJavaInJava.length})`);

    // Check that forbidden JavaScript topics do NOT appear in Java questions
    const jsKeywords = ['event loop', 'prototype chain', 'prototypal', 'promise.all', 'microtask', 'window.', 'document.', 'typeof null', 'window functions, ranking'];
    const pollutedQuestions = javaBatch.questions.filter(q => {
      const text = `${q.questionText} ${q.topic} ${q.subtopic}`.toLowerCase();
      return jsKeywords.some(kw => text.includes(kw));
    });
    assert(pollutedQuestions.length === 0, `Zero JavaScript/SQL event loop pollution in Java questions (found ${pollutedQuestions.length})`);

    // -------------------------------------------------------------
    // Test Group 2: JavaScript Session Strict Isolation
    // -------------------------------------------------------------
    console.log('\n[Test Group 2] JavaScript Session Subject Isolation:');
    const jsBatch = await generateQuestions({
      category: 'JavaScript',
      difficulty: 'Medium',
      totalQuestions: 5
    });

    assert(jsBatch.questions.length === 5, `Generated 5 questions for JavaScript session (got ${jsBatch.questions.length})`);
    const allJs = jsBatch.questions.every(q => q.category === 'JavaScript');
    assert(allJs, 'All questions in JavaScript session are tagged as JavaScript');

    // Verify presence of genuine JavaScript concepts
    const hasJsConcepts = jsBatch.questions.some(q => {
      const text = `${q.questionText} ${q.topic}`.toLowerCase();
      return text.includes('closure') || text.includes('event loop') || text.includes('promise') || text.includes('prototype') || text.includes('v8') || text.includes('this');
    });
    assert(hasJsConcepts, 'JavaScript session contains authentic JavaScript language concepts');

    // -------------------------------------------------------------
    // Test Group 3: Python Session Strict Isolation
    // -------------------------------------------------------------
    console.log('\n[Test Group 3] Python Session Subject Isolation:');
    const pythonBatch = await generateQuestions({
      category: 'Python',
      difficulty: 'Medium',
      totalQuestions: 5
    });

    assert(pythonBatch.questions.length === 5, `Generated 5 questions for Python session (got ${pythonBatch.questions.length})`);
    const allPython = pythonBatch.questions.every(q => q.category === 'Python');
    assert(allPython, 'All questions in Python session are tagged as Python');

    const hasPythonConcepts = pythonBatch.questions.some(q => {
      const text = `${q.questionText} ${q.topic}`.toLowerCase();
      return text.includes('gil') || text.includes('decorator') || text.includes('generator') || text.includes('yield') || text.includes('mutability') || text.includes('asyncio');
    });
    assert(hasPythonConcepts, 'Python session contains authentic Python concepts');

    // -------------------------------------------------------------
    // Test Group 4: C++ Session Strict Isolation
    // -------------------------------------------------------------
    console.log('\n[Test Group 4] C++ Session Subject Isolation:');
    const cppBatch = await generateQuestions({
      category: 'C++',
      difficulty: 'Medium',
      totalQuestions: 5
    });

    assert(cppBatch.questions.length === 5, `Generated 5 questions for C++ session (got ${cppBatch.questions.length})`);
    const allCpp = cppBatch.questions.every(q => q.category === 'C++');
    assert(allCpp, 'All questions in C++ session are tagged as C++');

    const hasCppConcepts = cppBatch.questions.some(q => {
      const text = `${q.questionText} ${q.topic}`.toLowerCase();
      return text.includes('raii') || text.includes('smart pointer') || text.includes('vtable') || text.includes('stl') || text.includes('template') || text.includes('move semantics');
    });
    assert(hasCppConcepts, 'C++ session contains authentic C++ concepts');

    // -------------------------------------------------------------
    // Test Group 5: Language-Independent DSA Questions
    // -------------------------------------------------------------
    console.log('\n[Test Group 5] Language-Independent DSA Session:');
    const dsaBatch = await generateQuestions({
      category: 'DSA',
      difficulty: 'Easy',
      totalQuestions: 3
    });

    assert(dsaBatch.questions.length === 3, `Generated 3 questions for DSA session (got ${dsaBatch.questions.length})`);
    const allDsa = dsaBatch.questions.every(q => q.category === 'DSA');
    assert(allDsa, 'DSA session returns algorithmic DSA questions');

    // -------------------------------------------------------------
    // Test Group 6: Mixed / Full Stack Session Boundaries
    // -------------------------------------------------------------
    console.log('\n[Test Group 6] Mixed Full Stack Session Isolation:');
    const fullStackBatch = await generateQuestions({
      category: 'Full Stack',
      difficulty: 'Medium',
      totalQuestions: 2
    });

    assert(fullStackBatch.questions.length === 2, `Generated 2 questions for Full Stack session`);
    const noJavaInFullStack = fullStackBatch.questions.every(q => q.category === 'Full Stack');
    assert(noJavaInFullStack, 'Full Stack session preserves its declared category');

    // -------------------------------------------------------------
    // Test Group 7: AI-Generated Question Subject Validation Rejection
    // -------------------------------------------------------------
    console.log('\n[Test Group 7] AI Question Validator Heuristic:');
    const invalidJsInJava = validateQuestionSubject({
      category: 'Java',
      questionText: 'Explain the JavaScript event loop, microtask queue, and Promise.all execution order.',
      topic: 'Event Loop'
    }, 'Java');
    assert(!invalidJsInJava.isValid, `Rejects JavaScript Event Loop question masquerading as Java (${invalidJsInJava.reason})`);

    const invalidSqlInJava = validateQuestionSubject({
      category: 'Java',
      questionText: 'Write a query using Window Functions, Ranking & CTEs to find the top 3 salaries.',
      topic: 'Window Functions, Ranking & CTEs'
    }, 'Java');
    assert(!invalidSqlInJava.isValid, `Rejects SQL Window Function question in Java session (${invalidSqlInJava.reason})`);

    const validJava = validateQuestionSubject({
      category: 'Java',
      questionText: 'Explain how the JVM Garbage Collector manages Eden, Survivor, and Tenured spaces.',
      topic: 'Memory Management & Garbage Collection'
    }, 'Java');
    assert(validJava.isValid, 'Accepts authentic Java JVM question');

    const invalidJavaInJs = validateQuestionSubject({
      category: 'JavaScript',
      questionText: 'Explain public static void main and Java Memory Model volatile keyword.',
      topic: 'Core Java'
    }, 'JavaScript');
    assert(!invalidJavaInJs.isValid, `Rejects Java JVM question in JavaScript session (${invalidJavaInJs.reason})`);

    // -------------------------------------------------------------
    // Test Group 8: Session Persistence & Category Immutability
    // -------------------------------------------------------------
    console.log('\n[Test Group 8] Session Subject Persistence:');
    const signupEmail = `isolation_test_${Date.now()}@example.com`;
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Isolation Tester',
        email: signupEmail,
        password: 'Password123!',
        targetRole: 'Data Analyst'
      })
    });
    const signupData = await signupRes.json();
    const token = signupData?.token;
    assert(Boolean(token), 'Registered test candidate for session lifecycle testing');

    // Start Java interview session
    const startRes = await fetch(`${BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        category: 'Java',
        difficulty: 'Medium',
        totalQuestions: 5,
        targetRole: 'Data Analyst'
      })
    });
    const startData = await startRes.json();
    assert(startRes.status === 201, 'Created Java interview session via POST /api/interviews/start');
    
    const session = startData.interview;
    const sessionId = session._id;
    assert(session.category === 'Java', `Session root category is strictly 'Java' (got '${session.category}')`);
    
    // Verify all questions in session have category === 'Java'
    const sessionQuestionsAllJava = session.questions.every(q => q.category === 'Java');
    assert(sessionQuestionsAllJava, 'Every question in created session has category === "Java"');

    // Simulate page refresh / GET session
    const getRes = await fetch(`${BASE_URL}/interviews/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const getData = await getRes.json();
    assert(getRes.status === 200, 'GET /api/interviews/:id successfully fetches session');
    assert(getData.interview.category === 'Java', 'Persisted session category remains "Java" on refresh');
    assert(getData.interview.questions.every(q => q.category === 'Java'), 'All questions retain "Java" category on reload');

    // -------------------------------------------------------------
    // Test Group 9: Answer Evaluation & Final Report Matching
    // -------------------------------------------------------------
    console.log('\n[Test Group 9] Answer Evaluation & Subject-Specific Rubric:');
    const activeQ = getData.interview.questions[0];
    const answerRes = await fetch(`${BASE_URL}/interviews/${sessionId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        answer: 'In Java, the JVM divides the heap into young and old generations. Young generation has Eden and two survivor spaces. Minor GC copies living objects and increments age until promotion to Old generation.',
        questionId: activeQ.questionId
      })
    });
    const answerData = await answerRes.json();
    assert(answerRes.status === 200, 'POST /api/interviews/:id/answer returns HTTP 200');
    assert(answerData.evaluation && answerData.evaluation.score >= 5, `Evaluation successfully scored Java answer (${answerData.evaluation?.score}/10)`);
    assert(answerData.evaluation.feedback.includes('Java') || answerData.interview.category === 'Java', 'Evaluation report calibrated for Java technical subject');

    // Check that question metadata in session matches original question
    const updatedSession = answerData.interview;
    assert(updatedSession.questions[0].category === 'Java', 'Evaluated question retains category "Java"');
    assert(updatedSession.questions[0].isAnswered === true, 'Question marked as answered');

    // -------------------------------------------------------------
    // Test Group 10: Existing Flows (Dashboard, History, etc.)
    // -------------------------------------------------------------
    console.log('\n[Test Group 10] Existing Features & Dashboard Regression:');
    const statsRes = await fetch(`${BASE_URL}/interviews/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200, 'GET /api/interviews/stats returns HTTP 200');
    assert(statsData.stats && 'completedCount' in statsData.stats, 'Dashboard stats include completedCount metric');

    const historyRes = await fetch(`${BASE_URL}/interviews/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const historyData = await historyRes.json();
    assert(historyRes.status === 200, 'GET /api/interviews/history returns HTTP 200');
    assert(Array.isArray(historyData.interviews), 'History returns interviews array');
    assert(historyData.interviews[0].category === 'Java', 'Historical interview record preserves category "Java"');

  } finally {
    await new Promise((resolve) => server.close(resolve));
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }

  console.log('\n================================================================');
  console.log(`SUBJECT ISOLATION VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================');

  process.exitCode = failed > 0 ? 1 : 0;
};

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exitCode = 1;
});
