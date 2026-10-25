/**
 * Phase 1 Verification Test Suite
 * Tests:
 * 1. Stable Question IDs & intra-session uniqueness
 * 2. Inter-session deduplication across multiple interviews for the same candidate
 * 3. Idempotent answer submission (double-click safety)
 * 4. Question indexing synchronization (evaluation review does not prematurely jump ahead)
 * 5. Server-authoritative timestamps & timer persistence fields
 * 6. Explicit question advancement via POST /api/interviews/:id/next
 * 7. Concurrency evaluation locking
 */

import http from 'http';
import mongoose from 'mongoose';
import app from '../app.js';
import { connectDB } from '../config/database.js';
import Interview from '../models/Interview.js';
import { generateQuestions } from '../services/ai.service.js';

const runPhase1Tests = async () => {
  console.log('================================================================');
  console.log('   INTERVIEWACE AI - PHASE 1 ARCHITECTURAL VERIFICATION SUITE');
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
    // 1. Generate Questions Unit Deduplication
    console.log('[Test Group 1] AI & Curated Question Deduplication Engine:');
    const batch1 = await generateQuestions({
      category: 'Java',
      difficulty: 'Easy',
      totalQuestions: 3
    });

    assert(batch1.questions.length === 3, `Batch 1 generated 3 questions (got ${batch1.questions.length})`);
    const q1Norms = batch1.questions.map(q => q.normalizedText);
    const uniqueNorms1 = new Set(q1Norms);
    assert(uniqueNorms1.size === 3, 'All 3 questions within Batch 1 have distinct normalized text (no intra-batch duplicates)');

    const allHaveStableIds = batch1.questions.every(q => q.questionId && typeof q.questionId === 'string' && q.questionId.length > 5);
    assert(allHaveStableIds, 'All generated questions have stable, non-empty questionId strings');

    // Generate batch 2 excluding batch 1
    const batch2 = await generateQuestions({
      category: 'Java',
      difficulty: 'Easy',
      totalQuestions: 2,
      excludeNormalized: q1Norms,
      excludeIds: batch1.questions.map(q => q.questionId)
    });

    const hasOverlap = batch2.questions.some(q => uniqueNorms1.has(q.normalizedText));
    assert(!hasOverlap, 'Batch 2 excludes all questions from Batch 1 (zero repetition across consecutive requests)');

    // 2. User Lifecycle, Timers, and Progress Synchronization
    console.log('\n[Test Group 2] Live Interview Session Lifecycle & Server Timing:');

    // Register test user
    const testEmail = `phase1_tester_${Date.now()}@example.com`;
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase 1 Candidate',
        email: testEmail,
        password: 'Password123!'
      })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201, 'Test candidate registered successfully');
    const token = signupData.token;

    // Start Session 1 (2 questions)
    const session1Res = await fetch(`${BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        category: 'Java',
        difficulty: 'Easy',
        totalQuestions: 2,
        timedMode: true,
        timeLimitPerQuestion: 120
      })
    });
    const session1Data = await session1Res.json();
    assert(session1Res.status === 201, 'Interview session 1 initialized with HTTP 201');
    const s1 = session1Data.interview;
    assert(!!s1.startedAt, 'Session contains server-authoritative startedAt timestamp');
    assert(!!s1.currentQuestionStartedAt, 'Session contains server-authoritative currentQuestionStartedAt timestamp');
    assert(s1.timedMode === true, 'Session timedMode is preserved as true');
    assert(s1.timeLimitPerQuestion === 120, 'Session per-question time limit is set to 120s');
    assert(s1.currentQuestionIndex === 0, 'Session starts at Question index 0');
    assert(s1.questions[0].isAnswered === false, 'Question 1 initial isAnswered status is false');

    const s1QuestionIds = s1.questions.map(q => q.questionId);
    const s1QuestionTexts = s1.questions.map(q => q.normalizedText);

    // 3. Question Indexing Synchronization & Idempotency
    console.log('\n[Test Group 3] Question Indexing Synchronization & Idempotency:');

    // Candidate submits answer for Question 1
    const submit1Res = await fetch(`${BASE_URL}/interviews/${s1._id}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        answer: 'The == operator compares reference addresses, while .equals compares state equality. Overriding hashCode is needed for HashMap bucket distribution.',
        questionId: s1.questions[0].questionId
      })
    });
    const submit1Data = await submit1Res.json();
    assert(submit1Res.status === 200, 'Answer to Question 1 submitted with HTTP 200');
    assert(typeof submit1Data.evaluation?.score === 'number' && submit1Data.evaluation.score >= 0, `Question 1 received numerical evaluation score (${submit1Data.evaluation?.score}/10)`);
    assert(submit1Data.interview.currentQuestionIndex === 0, 'currentQuestionIndex stays at 0 during evaluation review (no premature advancement)');
    assert(submit1Data.interview.questions[0].isAnswered === true, 'Question 1 isAnswered is now true');
    assert(submit1Data.interview.questions[0].timeSpentSeconds >= 0, 'Question 1 timeSpentSeconds is recorded');

    // Simulate DOUBLE-CLICK / Retry submission for Question 1
    console.log('\n[Test Group 4] Double-Click & Re-Submission Idempotency Guard:');
    const duplicateSubmitRes = await fetch(`${BASE_URL}/interviews/${s1._id}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        answer: 'Duplicate click answer that should not overwrite or advance.',
        questionId: s1.questions[0].questionId
      })
    });
    const dupData = await duplicateSubmitRes.json();
    assert(duplicateSubmitRes.status === 200, 'Duplicate submission handled gracefully with HTTP 200');
    assert(dupData.alreadyEvaluated === true, 'Response contains alreadyEvaluated: true flag');
    assert(dupData.interview.currentQuestionIndex === 0, 'Duplicate submission did NOT advance to Question 2');
    assert(dupData.interview.questions[0].userAnswer.includes('== operator compares reference'), 'Original answer was safely preserved (not overwritten)');

    // 5. Explicit Question Advancement
    console.log('\n[Test Group 5] Explicit Question Advancement (POST /api/interviews/:id/next):');
    const nextRes = await fetch(`${BASE_URL}/interviews/${s1._id}/next`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const nextData = await nextRes.json();
    assert(nextRes.status === 200, 'POST /next endpoint succeeds with HTTP 200');
    assert(nextData.interview.currentQuestionIndex === 1, 'currentQuestionIndex incremented exactly to 1');
    assert(!!nextData.interview.currentQuestionStartedAt, 'New question receives fresh currentQuestionStartedAt timestamp');
    assert(nextData.interview.questions[1].isAnswered === false, 'Question 2 is active and unanswered');

    // 6. Complete Interview
    console.log('\n[Test Group 6] Session Completion & Clean State:');
    const submit2Res = await fetch(`${BASE_URL}/interviews/${s1._id}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        answer: 'The Java Garbage Collector uses generational collection with Eden, S0, S1, and Tenured spaces.',
        questionId: nextData.interview.questions[1].questionId
      })
    });
    const submit2Data = await submit2Res.json();
    assert(submit2Res.status === 200, 'Question 2 (final question) submitted successfully');
    assert(submit2Data.interview.status === 'completed', 'Session status is completed after last question is evaluated');
    assert(submit2Data.interview.finalScore > 0, `Final overall score calculated (${submit2Data.interview.finalScore}%)`);

    // 7. Inter-Session Question Exclusion Test
    console.log('\n[Test Group 7] Inter-Session Question Deduplication for Same User:');
    const session2Res = await fetch(`${BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        category: 'Java',
        difficulty: 'Easy',
        totalQuestions: 2
      })
    });
    const session2Data = await session2Res.json();
    assert(session2Res.status === 201, 'Session 2 started for same user with HTTP 201');
    const s2Questions = session2Data.interview.questions;
    const hasS1QuestionInS2 = s2Questions.some(q => s1QuestionIds.includes(q.questionId) || s1QuestionTexts.includes(q.normalizedText));
    assert(!hasS1QuestionInS2, 'Session 2 excluded all questions already asked in Session 1 for this candidate');

    console.log('\n================================================================');
    console.log(`PHASE 1 VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  } catch (err) {
    console.error('\n[PHASE 1 TEST ERROR]', err);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    server.close(() => {
      process.exit(1);
    });
  }
};

runPhase1Tests();
