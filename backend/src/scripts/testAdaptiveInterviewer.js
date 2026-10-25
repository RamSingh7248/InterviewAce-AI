/**
 * InterviewAce AI - Adaptive Interviewer Test Suite
 * 
 * Verifies:
 * 1. Adaptive engine strategy calibration (Deepen, Probe Gap, Scaffold).
 * 2. Strict subject isolation during adaptive follow-up generation.
 * 3. Dynamic replacement/assignment of Question N+1 upon answering Question N.
 * 4. End-to-end HTTP lifecycle from /start -> /answer -> adaptive follow-up -> /next -> results.
 * 5. Sanitization of un-evaluated adaptive follow-up questions.
 */

import http from 'http';
import mongoose from 'mongoose';
import app from '../app.js';
import { connectDB } from '../config/database.js';
import { generateAdaptiveFollowUpQuestion } from '../services/ai.service.js';
import { validateQuestionSubject } from '../utils/subjectValidator.js';

const runTests = async () => {
  console.log('================================================================');
  console.log('   INTERVIEWACE AI - ADAPTIVE INTERVIEWER TEST SUITE');
  console.log('================================================================\n');

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.log('[INFO] Database connection skipped/offline:', err.message);
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
    // Test Group 1: Adaptive Strategy Calibration
    // -------------------------------------------------------------
    console.log('[Test Group 1] Adaptive Engine Strategy Calibration:');

    // 1a. High Score -> Deepen
    const highEval = {
      score: 9,
      feedback: 'Excellent explanation of Java Memory Model and volatile keyword.',
      strengths: ['Clear explanation of visibility and happens-before guarantees'],
      missingConcepts: [],
      suggestions: ['Consider discussing compiler reordering at the hardware architecture level.']
    };
    const prevJavaQ = {
      questionText: 'Explain the volatile keyword in Java and its interaction with the Java Memory Model.',
      topic: 'Multithreading, Concurrency & JMM',
      difficulty: 'Medium',
      questionType: 'conceptual'
    };

    const deepenFollowUp = await generateAdaptiveFollowUpQuestion({
      category: 'Java',
      difficulty: 'Medium',
      targetRole: 'Senior Java Developer',
      experienceLevel: 'senior',
      previousQuestion: prevJavaQ,
      userAnswer: 'Volatile guarantees memory visibility across threads by reading and writing directly to main memory and prevents instruction reordering via happens-before relationships.',
      evaluation: highEval,
      excludeNormalized: [],
      excludeIds: []
    });

    assert(Boolean(deepenFollowUp), 'Deepen follow-up question generated successfully');
    assert(deepenFollowUp.isAdaptiveFollowUp === true, 'Follow-up is marked isAdaptiveFollowUp = true');
    assert(deepenFollowUp.category === 'Java', 'Follow-up preserves Java category');
    assert(deepenFollowUp.difficulty === 'Hard' || deepenFollowUp.difficulty === 'Medium', 'Deepen targets higher/same difficulty');
    assert(deepenFollowUp.adaptiveReason.toLowerCase().includes('deep-dive'), 'Adaptive reason reflects deepen strategy');

    // 1b. Medium Score -> Probe Gap
    const medEval = {
      score: 6,
      feedback: 'Good overview of Python decorators, but missed functools.wraps and closure mechanics.',
      strengths: ['Understands wrapper function pattern'],
      missingConcepts: ['functools.wraps preserving function metadata', 'closure scope mechanics'],
      suggestions: ['Explain how metadata like __name__ and __doc__ is preserved.']
    };
    const prevPythonQ = {
      questionText: 'How do decorators work in Python, and how would you implement one with arguments?',
      topic: 'Decorators, Context Managers & Closures',
      difficulty: 'Medium',
      questionType: 'conceptual'
    };

    const probeGapFollowUp = await generateAdaptiveFollowUpQuestion({
      category: 'Python',
      difficulty: 'Medium',
      targetRole: 'Python Developer',
      experienceLevel: 'mid',
      previousQuestion: prevPythonQ,
      userAnswer: 'Decorators take a function as an argument and return a wrapper function to add behavior before and after.',
      evaluation: medEval,
      excludeNormalized: [],
      excludeIds: []
    });

    assert(Boolean(probeGapFollowUp), 'Probe gap follow-up generated successfully');
    assert(probeGapFollowUp.isAdaptiveFollowUp === true, 'Probe gap is marked isAdaptiveFollowUp = true');
    assert(probeGapFollowUp.category === 'Python', 'Probe gap preserves Python category');
    assert(probeGapFollowUp.adaptiveReason.toLowerCase().includes('gap') || probeGapFollowUp.adaptiveReason.toLowerCase().includes('follow-up'), 'Adaptive reason reflects gap probe');

    // 1c. Low Score -> Scaffold
    const lowEval = {
      score: 3,
      feedback: 'Candidate struggled with C pointers and pointer arithmetic.',
      strengths: [],
      missingConcepts: ['Pointer dereferencing syntax', 'Memory addressing', 'Stack vs heap pointers'],
      suggestions: ['Review address-of operator and dereferencing syntax.']
    };
    const prevCQ = {
      questionText: 'Explain pointer arithmetic on multi-dimensional dynamically allocated arrays in C.',
      topic: 'Pointer Arithmetic & Multi-dimensional Arrays',
      difficulty: 'Hard',
      questionType: 'conceptual'
    };

    const scaffoldFollowUp = await generateAdaptiveFollowUpQuestion({
      category: 'C',
      difficulty: 'Hard',
      targetRole: 'C Developer',
      experienceLevel: 'junior',
      previousQuestion: prevCQ,
      userAnswer: 'I am not sure how pointer arithmetic works with 2D arrays.',
      evaluation: lowEval,
      excludeNormalized: [],
      excludeIds: []
    });

    assert(Boolean(scaffoldFollowUp), 'Scaffold follow-up generated successfully');
    assert(scaffoldFollowUp.isAdaptiveFollowUp === true, 'Scaffold is marked isAdaptiveFollowUp = true');
    assert(scaffoldFollowUp.category === 'C', 'Scaffold preserves C category');
    assert(scaffoldFollowUp.difficulty === 'Medium' || scaffoldFollowUp.difficulty === 'Easy', 'Scaffold steps down difficulty');

    // -------------------------------------------------------------
    // Test Group 2: Strict Subject Isolation in Adaptive Follow-ups
    // -------------------------------------------------------------
    console.log('\n[Test Group 2] Subject Isolation in Adaptive Questions:');
    const javaValidation = validateQuestionSubject(deepenFollowUp, 'Java');
    assert(javaValidation.isValid, 'Java adaptive question passes strict subject isolation validator');

    const pythonValidation = validateQuestionSubject(probeGapFollowUp, 'Python');
    assert(pythonValidation.isValid, 'Python adaptive question passes strict subject isolation validator');

    const cValidation = validateQuestionSubject(scaffoldFollowUp, 'C');
    assert(cValidation.isValid, 'C adaptive question passes strict subject isolation validator');

    // -------------------------------------------------------------
    // Test Group 3: End-to-End Interview Session Adaptive Pipeline
    // -------------------------------------------------------------
    console.log('\n[Test Group 3] Live End-to-End Session Adaptive Pipeline:');

    // Register test candidate
    const testEmail = `adaptive_candidate_${Date.now()}@test.io`;
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Adaptive Test Candidate',
        email: testEmail,
        password: 'Password123!',
        targetRole: 'Java Developer'
      })
    });
    const signupData = await signupRes.json();
    const token = signupData.token;
    assert(signupRes.status === 201 && token, 'Registered test candidate for session testing');

    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    // Start 3-question Java session
    const startRes = await fetch(`${BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        category: 'Java',
        difficulty: 'Medium',
        totalQuestions: 3,
        targetRole: 'Java Developer',
        experienceLevel: 'junior'
      })
    });
    const startData = await startRes.json();
    assert(startRes.status === 201, 'POST /api/interviews/start returns HTTP 201');
    const interviewId = startData.interview._id;
    const initialQ2Id = startData.interview.questions[1].questionId;
    const initialQ2Text = startData.interview.questions[1].questionText;

    // Submit Answer for Question 1
    const answerRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        answer: 'The difference between equals and == is that == checks memory references whereas equals checks semantic value equality. Overriding hashCode is required so hash map buckets work correctly.',
        questionId: startData.interview.questions[0].questionId
      })
    });
    const answerData = await answerRes.json();
    assert(answerRes.status === 200, 'POST /api/interviews/:id/answer returns HTTP 200');
    assert(answerData.evaluation && answerData.evaluation.score !== undefined, 'Answer evaluated successfully');

    // Fetch session and verify Question 2 has become an adaptive follow-up
    const sessionRes = await fetch(`${BASE_URL}/interviews/${interviewId}`, {
      headers: authHeaders
    });
    const sessionData = await sessionRes.json();
    const activeSession = sessionData.interview;
    assert(sessionRes.status === 200, 'GET /api/interviews/:id returns session');

    const updatedQ2 = activeSession.questions[1];
    assert(Boolean(updatedQ2.isAdaptiveFollowUp), 'Question 2 is now marked isAdaptiveFollowUp = true');
    assert(Boolean(updatedQ2.adaptiveReason), `Question 2 has adaptiveReason: "${updatedQ2.adaptiveReason}"`);
    assert(updatedQ2.category === 'Java', 'Question 2 maintains strict Java category');

    // Advance to Question 2 via /next
    const nextRes = await fetch(`${BASE_URL}/interviews/${interviewId}/next`, {
      method: 'POST',
      headers: authHeaders
    });
    const nextData = await nextRes.json();
    assert(nextRes.status === 200, 'POST /api/interviews/:id/next returns HTTP 200');
    assert(nextData.interview.currentQuestionIndex === 1, 'Current question index advanced to 1 (Question 2)');
    assert(nextData.interview.questions[1].isAdaptiveFollowUp === true, 'Candidate receives adaptive follow-up on Question 2');

    // Sanitization check: Reference answer on un-evaluated Question 2 must be hidden
    assert(!nextData.interview.questions[1].referenceAnswer, 'Reference answer on active question 2 is safely sanitized from candidate');

    // Finish session: Answer Question 2
    await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        answer: 'HashMap uses buckets. In Java 8, when a bucket has more than 8 nodes and array capacity >= 64, it converts to a red-black tree for O(log n) lookups.',
        questionId: updatedQ2.questionId
      })
    });
    const nextRes2 = await fetch(`${BASE_URL}/interviews/${interviewId}/next`, {
      method: 'POST',
      headers: authHeaders
    });
    const nextData2 = await nextRes2.json();
    const activeQ3 = nextData2.interview.questions[2];

    // Answer Question 3 (Final Question)
    const finalAnswerRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        answer: 'Java Garbage collection divides memory into Eden, S0, S1, and Tenured partitions based on the generational hypothesis.',
        questionId: activeQ3.questionId
      })
    });
    const finalAnswerData = await finalAnswerRes.json();
    assert(finalAnswerData.status === 'success', 'Final question answered with HTTP 200');
    assert(finalAnswerData.interview && finalAnswerData.interview.status === 'completed', 'Session completed after answering final question');
    assert(finalAnswerData.interview.finalScore > 0, `Final score calculated (${finalAnswerData.interview.finalScore}%)`);

    // Results inspection
    const resultsRes = await fetch(`${BASE_URL}/interviews/${interviewId}`, {
      headers: authHeaders
    });
    const resultsData = await resultsRes.json();
    assert(resultsData.interview.status === 'completed', 'Completed session retrieved for results view');
    const hasAdaptiveInResults = resultsData.interview.questions.some(q => q.isAdaptiveFollowUp);
    assert(hasAdaptiveInResults, 'Adaptive follow-up badge and question data preserved in final assessment results');

    console.log('\n================================================================');
    console.log(`ADAPTIVE INTERVIEWER TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

  } catch (error) {
    console.error('Test execution error:', error);
    failed++;
  } finally {
    server.close();
    await mongoose.connection.close();
  }

  process.exit(failed > 0 ? 1 : 0);
};

runTests();
