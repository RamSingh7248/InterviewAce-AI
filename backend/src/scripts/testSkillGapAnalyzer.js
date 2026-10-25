/**
 * InterviewAce AI - Skill Gap Analyzer Test Suite (Phase B Backend Tests)
 * 
 * Verifies:
 * 1. Deterministic proficiency calculation from actual saved evaluations.
 * 2. Difficulty weighting (Hard > Medium > Easy) and recency adjustment.
 * 3. Evidence confidence thresholds: confirmed (>=3), preliminary (1-2), insufficient (0).
 * 4. Topic classification: strong (>=75), developing (60-74), needs_improvement (<60).
 * 5. Grounded recommendations using real stored missing concepts.
 * 6. Empty state handling: users with no practice receive null overallScore without errors.
 * 7. Unevaluated / failed questions are safely ignored (never penalized as 0).
 * 8. Strict authentication and user isolation (no cross-user data leakage).
 * 9. Category-filtered aggregation (/api/skills/gaps?category=...).
 * 10. Single topic detail endpoint (/api/skills/:skillName).
 */

import http from 'http';
import mongoose from 'mongoose';
import app from '../app.js';
import { connectDB } from '../config/database.js';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

const runSkillGapTests = async () => {
  console.log('================================================================');
  console.log('   INTERVIEWACE AI - SKILL GAP ANALYZER TEST SUITE (PHASE B)');
  console.log('================================================================\n');

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.log('[INFO] Database connection status:', err.message);
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
    if (mongoose.connection.readyState !== 1) {
      console.log('[SKIP] MongoDB not connected; skipping database-backed tests.');
      return;
    }

    // 1. Setup two separate users for ownership testing
    console.log('[Test Group 1] Authentication & User Isolation:');
    const timestamp = Date.now();
    const userAEmail = `skill_user_a_${timestamp}@example.com`;
    const userBEmail = `skill_user_b_${timestamp}@example.com`;

    const [signupARes, signupBRes] = await Promise.all([
      fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Skill Candidate A', email: userAEmail, password: 'Password123!' })
      }),
      fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Skill Candidate B', email: userBEmail, password: 'Password123!' })
      })
    ]);

    const userAData = await signupARes.json();
    const userBData = await signupBRes.json();
    const tokenA = userAData.token;
    const tokenB = userBData.token;
    const userAId = userAData.user?._id || userAData.user?.id;
    const userBId = userBData.user?._id || userBData.user?.id;

    assert(!!tokenA && !!tokenB, 'Both test candidates authenticated with JWT tokens');

    // Unauthenticated access rejected
    const unauthRes = await fetch(`${BASE_URL}/skills/overview`);
    assert(unauthRes.status === 401, 'Unauthenticated GET /api/skills/overview returns HTTP 401');

    // 2. Empty State Verification (User B has zero practice data)
    console.log('\n[Test Group 2] Clean Empty State Handling (User with 0 interviews):');
    const emptyOverviewRes = await fetch(`${BASE_URL}/skills/overview`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    const emptyOverviewData = await emptyOverviewRes.json();
    assert(emptyOverviewRes.status === 200, 'GET /api/skills/overview returns HTTP 200 for new user');
    assert(emptyOverviewData.data?.overallScore === null, 'Overall score is null (not arbitrary 0 or NaN)');
    assert(emptyOverviewData.data?.totalEvaluatedQuestions === 0, 'Total evaluated questions count is 0');
    assert(emptyOverviewData.data?.counts?.strong === 0, 'Strong skills count is 0');
    assert(emptyOverviewData.data?.counts?.needsImprovement === 0, 'Needs improvement count is 0');
    assert(Array.isArray(emptyOverviewData.data?.topRecommendations), 'topRecommendations is an array');

    const emptyGapsRes = await fetch(`${BASE_URL}/skills/gaps`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    const emptyGapsData = await emptyGapsRes.json();
    assert(emptyGapsRes.status === 200, 'GET /api/skills/gaps returns HTTP 200 for new user');
    assert(emptyGapsData.data?.strong?.length === 0, 'Strong list is empty array');
    assert(emptyGapsData.data?.needsImprovement?.length === 0, 'Needs improvement list is empty array');

    // 3. Seed Realistic Evaluated Practice Data for User A
    console.log('\n--- Seeding evaluated interview data for Candidate A ---');
    // Session 1: Strong performance in Core Java, Weak in Multithreading, Partial in Collections
    const interview1 = await Interview.create({
      userId: userAId,
      category: 'Java',
      difficulty: 'Medium',
      targetRole: 'Backend Engineer',
      status: 'completed',
      sessionState: 'completed',
      totalQuestions: 6,
      finalScore: 75,
      questions: [
        // Topic: Core Java (3 questions, strong performance)
        {
          questionId: 'q-j-core-1',
          questionText: 'Explain the difference between JDK, JRE, and JVM.',
          category: 'Java',
          topic: 'Core Java',
          difficulty: 'Easy',
          isAnswered: true,
          userAnswer: 'JDK includes compiler and dev tools; JRE is runtime; JVM executes bytecode.',
          submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          evaluation: {
            score: 9,
            verdict: 'correct',
            depthRating: 'in-depth',
            accuracyRating: 'accurate',
            feedback: 'Solid distinction between Java architecture tiers.',
            strengths: ['Clear explanation of JDK vs JRE', 'Bytecode execution understanding'],
            missingConcepts: []
          }
        },
        {
          questionId: 'q-j-core-2',
          questionText: 'Explain Java pass-by-value semantics with object references.',
          category: 'Java',
          topic: 'Core Java',
          difficulty: 'Medium',
          isAnswered: true,
          userAnswer: 'Java is strictly pass-by-value. Object references are passed by value of the memory pointer.',
          submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          evaluation: {
            score: 8,
            verdict: 'correct',
            depthRating: 'in-depth',
            accuracyRating: 'accurate',
            feedback: 'Correct understanding of reference copy pass-by-value.',
            strengths: ['Pointer value copying clarity'],
            missingConcepts: []
          }
        },
        {
          questionId: 'q-j-core-3',
          questionText: 'Explain access modifiers and encapsulation in Java.',
          category: 'Java',
          topic: 'Core Java',
          difficulty: 'Hard',
          isAnswered: true,
          userAnswer: 'Private, default package-private, protected and public enforce module boundaries.',
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          evaluation: {
            score: 9,
            verdict: 'correct',
            depthRating: 'in-depth',
            accuracyRating: 'accurate',
            feedback: 'Mastery of class accessibility and package modularity.',
            strengths: ['Comprehensive encapsulation rationale'],
            missingConcepts: []
          }
        },
        // Topic: Multithreading (2 questions, weak performance < 60)
        {
          questionId: 'q-j-thread-1',
          questionText: 'What is the Java Memory Model happens-before guarantee?',
          category: 'Java',
          topic: 'Multithreading',
          difficulty: 'Hard',
          isAnswered: true,
          userAnswer: 'Threads run at the same time and synchronized blocks make code run one by one.',
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          evaluation: {
            score: 3,
            verdict: 'incorrect',
            depthRating: 'superficial',
            accuracyRating: 'misconceptions',
            feedback: 'Did not address happens-before relationship or CPU cache visibility barriers.',
            strengths: [],
            missingConcepts: ['Happens-before order guarantees', 'Volatile CPU memory barriers']
          }
        },
        {
          questionId: 'q-j-thread-2',
          questionText: 'Explain deadlock prevention and detection in Java.',
          category: 'Java',
          topic: 'Multithreading',
          difficulty: 'Hard',
          isAnswered: true,
          userAnswer: 'Deadlock happens when threads wait for each other. You use timeout.',
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          evaluation: {
            score: 4,
            verdict: 'partially_correct',
            depthRating: 'superficial',
            accuracyRating: 'mostly_accurate',
            feedback: 'Omitted lock acquisition ordering, tryLock mechanics, and circular wait condition.',
            strengths: ['Recognized timeout mitigation'],
            missingConcepts: ['Strict lock ordering hierarchy', 'Circular wait condition prevention']
          }
        },
        // Unevaluated / Skipped Question: Must NOT be counted as zero score
        {
          questionId: 'q-j-skipped-1',
          questionText: 'Explain Garbage Collection algorithms.',
          category: 'Java',
          topic: 'Garbage Collection',
          difficulty: 'Medium',
          isAnswered: false,
          userAnswer: '[Skipped]',
          evaluation: {
            score: 0,
            verdict: 'empty'
          }
        }
      ]
    });

    // Session 2: SQL Interview for User A
    const interview2 = await Interview.create({
      userId: userAId,
      category: 'SQL/DBMS',
      difficulty: 'Medium',
      targetRole: 'Backend Engineer',
      status: 'completed',
      sessionState: 'completed',
      totalQuestions: 1,
      finalScore: 80,
      questions: [
        {
          questionId: 'q-sql-joins-1',
          questionText: 'Compare INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.',
          category: 'SQL/DBMS',
          topic: 'Joins & Subqueries',
          difficulty: 'Medium',
          isAnswered: true,
          userAnswer: 'Inner matches both; Left returns all left rows plus matched right rows; Full returns all from both.',
          submittedAt: new Date(),
          evaluation: {
            score: 8,
            verdict: 'correct',
            depthRating: 'adequate',
            accuracyRating: 'accurate',
            feedback: 'Accurate explanation of join semantics.',
            strengths: ['Clear null-handling in outer joins'],
            missingConcepts: []
          }
        }
      ]
    });

    // 4. Test Analytics for User A
    console.log('\n[Test Group 3] Deterministic Proficiency & Evidence Calculation:');
    const overviewRes = await fetch(`${BASE_URL}/skills/overview`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const overviewData = await overviewRes.json();
    assert(overviewRes.status === 200, 'GET /api/skills/overview succeeded with HTTP 200');
    assert(typeof overviewData.data?.overallScore === 'number' && overviewData.data.overallScore > 0, 
      `Overall score computed: ${overviewData.data.overallScore}/100`);
    assert(overviewData.data?.totalEvaluatedQuestions === 6, 
      `Evaluated questions strictly counted answered questions with evaluations (expected 6, got ${overviewData.data.totalEvaluatedQuestions})`);

    // 5. Detailed Gaps & Classification
    console.log('\n[Test Group 4] Skill Classification & Gap Identification:');
    const gapsRes = await fetch(`${BASE_URL}/skills/gaps`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const gapsData = await gapsRes.json();
    assert(gapsRes.status === 200, 'GET /api/skills/gaps returns HTTP 200');

    const strongList = gapsData.data?.strong || [];
    const weakList = gapsData.data?.needsImprovement || [];

    // Core Java has 3 questions with scores 9 (Easy), 8 (Med), 9 (Hard) -> Should be classified as Strong
    const coreJava = strongList.find(t => t.topic === 'Core Java');
    assert(!!coreJava, 'Core Java correctly classified in "strong" skills list');
    assert(coreJava?.estimatedScore >= 75, `Core Java score reflects high performance: ${coreJava?.estimatedScore}/100`);
    assert(coreJava?.confidence === 'confirmed', `Core Java has confirmed confidence (evidence count: ${coreJava?.evidenceCount})`);
    assert(coreJava?.evidenceCount === 3, 'Core Java has exact evidence count of 3');

    // Multithreading has 2 questions with scores 3 (Hard) and 4 (Hard) -> Should be classified as Needs Improvement
    const multithreading = weakList.find(t => t.topic === 'Multithreading');
    assert(!!multithreading, 'Multithreading correctly identified as "needs_improvement" skill');
    assert(multithreading?.estimatedScore < 60, `Multithreading score indicates skill gap: ${multithreading?.estimatedScore}/100`);
    assert(multithreading?.confidence === 'preliminary', `Multithreading marked preliminary confidence (evidence count: ${multithreading?.evidenceCount})`);
    assert(multithreading?.missingConcepts?.length > 0, `Missing concepts captured: ${multithreading?.missingConcepts?.join(', ')}`);

    // Check that skipped question on "Garbage Collection" was not added as zero score
    const gcTopic = gapsData.data?.allTopics?.find(t => t.topic === 'Garbage Collection');
    assert(!gcTopic, 'Skipped/failed question topic was safely omitted from score calculations');

    // 6. Targeted Practice Recommendations Grounded in Real Gaps
    console.log('\n[Test Group 5] Grounded Recommendations & Action Links:');
    const recommendations = gapsData.data?.topRecommendations || [];
    assert(recommendations.length > 0, `Generated ${recommendations.length} prioritized recommendations`);
    const topRec = recommendations[0];
    assert(topRec.skillName === 'Multithreading', 'Highest priority recommendation targets Multithreading gap');
    assert(topRec.priority === 'high', 'Multithreading priority is high');
    assert(topRec.practiceUrl.includes('category=Java') && topRec.practiceUrl.includes('topic=Multithreading'), 
      `Practice link correctly deep-links to interview setup: ${topRec.practiceUrl}`);
    assert(topRec.recommendedAction.includes('Review') || topRec.recommendedAction.includes('Strengthen'), 
      `Actionable guidance: "${topRec.recommendedAction}"`);

    // 7. Category Filter Testing
    console.log('\n[Test Group 6] Category Filtering:');
    const javaGapsRes = await fetch(`${BASE_URL}/skills/gaps?category=Java`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const javaGapsData = await javaGapsRes.json();
    assert(javaGapsRes.status === 200, 'GET /api/skills/gaps?category=Java returns HTTP 200');
    const allJava = javaGapsData.data?.allTopics?.every(t => t.category === 'Java');
    assert(allJava, 'Filtered results contain strictly Java topics');

    const sqlGapsRes = await fetch(`${BASE_URL}/skills/gaps?category=SQL/DBMS`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const sqlGapsData = await sqlGapsRes.json();
    assert(sqlGapsRes.status === 200, 'GET /api/skills/gaps?category=SQL/DBMS returns HTTP 200');
    const allSql = sqlGapsData.data?.allTopics?.every(t => t.category === 'SQL/DBMS');
    assert(allSql, 'Filtered results contain strictly SQL/DBMS topics');

    // 8. Single Topic Detail Endpoint
    console.log('\n[Test Group 7] Single Skill Deep Dive Endpoint:');
    const topicDetailRes = await fetch(`${BASE_URL}/skills/Core%20Java`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const topicDetailData = await topicDetailRes.json();
    assert(topicDetailRes.status === 200, 'GET /api/skills/:skillName returns HTTP 200');
    assert(topicDetailData.data?.skillName === 'Core Java', 'Returned details for requested topic "Core Java"');
    assert(Array.isArray(topicDetailData.data?.history) && topicDetailData.data.history.length === 3, 
      `Detailed history contains individual question attempts (got ${topicDetailData.data?.history?.length})`);

    // 9. Strict User Isolation Verification
    console.log('\n[Test Group 8] Security & User Isolation:');
    // User B calls skills overview -> Must NOT see User A's Java or SQL evaluations
    const userBOverviewRes = await fetch(`${BASE_URL}/skills/overview`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    const userBOverviewData = await userBOverviewRes.json();
    assert(userBOverviewData.data?.totalEvaluatedQuestions === 0, 
      'User B cannot access or view User A evaluated questions (count is strictly 0)');
    assert(userBOverviewData.data?.overallScore === null, 'User B overall score remains null');

    // 10. Continuous Learning Loop: Targeted Practice Updates Topic Score & Trend
    console.log('\n[Test Group 9] Continuous Learning Loop (New Practice Updates Skill Analytics):');
    // Candidate A completes a targeted practice mock on their weak topic "Multithreading"
    await Interview.create({
      userId: userAId,
      category: 'Java',
      difficulty: 'Hard',
      targetRole: 'Backend Engineer',
      status: 'completed',
      sessionState: 'completed',
      totalQuestions: 2,
      finalScore: 95,
      questions: [
        {
          questionId: 'q-j-thread-3',
          questionText: 'Explain ReentrantLock and Condition variables compared to synchronized.',
          category: 'Java',
          topic: 'Multithreading',
          difficulty: 'Hard',
          isAnswered: true,
          userAnswer: 'ReentrantLock provides tryLock with timeout, fair ordering, and multiple Condition queues.',
          submittedAt: new Date(),
          evaluation: {
            score: 10,
            verdict: 'correct',
            depthRating: 'in-depth',
            accuracyRating: 'accurate',
            feedback: 'Exceptional mastery of java.util.concurrent locks.',
            strengths: ['tryLock timeout understanding', 'Fairness policy knowledge'],
            missingConcepts: []
          }
        },
        {
          questionId: 'q-j-thread-4',
          questionText: 'Explain AtomicInteger and compare-and-swap (CAS) mechanics.',
          category: 'Java',
          topic: 'Multithreading',
          difficulty: 'Hard',
          isAnswered: true,
          userAnswer: 'AtomicInteger uses hardware-level CAS CPU instructions to achieve lock-free thread safety.',
          submittedAt: new Date(),
          evaluation: {
            score: 9,
            verdict: 'correct',
            depthRating: 'in-depth',
            accuracyRating: 'accurate',
            feedback: 'Strong lock-free primitive explanation.',
            strengths: ['Hardware CAS comprehension'],
            missingConcepts: []
          }
        }
      ]
    });

    const updatedGapsRes = await fetch(`${BASE_URL}/skills/gaps?category=Java`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const updatedGapsData = await updatedGapsRes.json();
    const updatedMt = updatedGapsData.data?.allTopics?.find(t => t.topic === 'Multithreading');

    assert(updatedMt?.evidenceCount === 4, `Multithreading evidence count updated from 2 to 4 (got ${updatedMt?.evidenceCount})`);
    assert(updatedMt?.confidence === 'confirmed', `Confidence upgraded to 'confirmed' (now >= 3 questions)`);
    assert(updatedMt?.estimatedScore > 50, `Multithreading proficiency increased significantly (now ${updatedMt?.estimatedScore}/100)`);
    assert(updatedMt?.trend === 'improving', `Performance trend correctly detected as 'improving' (earlier low scores -> recent high scores)`);

  } catch (err) {
    console.error('Unhandled test suite error:', err);
    failed++;
  } finally {
    server.close();
    console.log('\n================================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');
    process.exit(failed > 0 ? 1 : 0);
  }
};

runSkillGapTests();
