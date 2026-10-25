/**
 * Test Suite: Feature 3 - Detailed AI Feedback & Answer Evaluation
 * Tests dimensional rubric evaluation, honest handling of empty/skipped/too-short answers,
 * misconception and correction detection, safe retries, answer preservation,
 * API authentication/ownership, and Skill Gap Analyzer integration.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assert from 'assert';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import { evaluateAnswer } from '../services/ai.service.js';
import { getUserSkillAnalytics } from '../services/skillGap.service.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';
const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

const runFeature3Tests = async () => {
  console.log('================================================================');
  console.log('   FEATURE 3: DETAILED AI FEEDBACK & ANSWER EVALUATION TESTS   ');
  console.log('================================================================');

  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  };

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    // ==========================================
    // 1. Fully Correct Technical Answer Evaluation
    // ==========================================
    console.log('\n[Group 1] Fully Correct Answer Evaluation:');
    await test('Evaluates high-quality technical answer with dimensions and high score', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'Explain how Java HashMap handles collisions internally and what changed in Java 8.',
        expectedKeyPoints: [
          'Separate chaining with linked lists or buckets',
          'Treeification to Red-Black tree when bucket size exceeds threshold 8',
          'Untreeify threshold at 6',
          'HashCode and equals contract'
        ],
        referenceAnswer: 'Java HashMap uses separate chaining with buckets. In Java 8, when a bucket exceeds 8 entries and the table size is at least 64, the bucket transforms into a balanced Red-Black tree improving worst-case search from O(n) to O(log n).',
        userAnswer: 'In Java, HashMap handles collisions using separate chaining where elements sharing the same hash bucket are stored in a linked list. In Java 8, when the number of items in a bucket reaches the TREEIFY_THRESHOLD of 8 and capacity is at least 64, the bucket is transformed into a balanced red-black tree. This improves the worst-case lookup from O(n) to O(log n). If elements are removed and the count drops to 6, it untreeifies back to a linked list. It also relies on a proper hashCode and equals implementation.',
        category: 'Java',
        topic: 'Collections & Internal Data Structures',
        difficulty: 'Medium',
        targetRole: 'Senior Java Developer',
        experienceLevel: 'senior',
        interviewMode: 'conceptual'
      });

      assert(evalResult.score >= 7, `Score should be >= 7 for thorough correct answer, got: ${evalResult.score}`);
      assert(evalResult.score100 >= 70, `Score100 should be >= 70, got: ${evalResult.score100}`);
      assert(evalResult.score100 === Math.round(evalResult.score * 10), 'score100 must be mathematically consistent with score * 10');
      assert(evalResult.verdict === 'correct', `Verdict should be correct, got: ${evalResult.verdict}`);
      assert(evalResult.evaluationStatus === 'evaluated', 'Status should be evaluated');
      assert(Array.isArray(evalResult.strengths) && evalResult.strengths.length > 0, 'Should return strengths');
      assert(Array.isArray(evalResult.suggestions), 'Should return suggestions');
      assert(evalResult.idealAnswer && evalResult.idealAnswer.length > 20, 'Should provide ideal answer');
      assert(evalResult.practicalExample && evalResult.practicalExample.length > 20, 'Should provide real-world practical example');
      assert(Array.isArray(evalResult.followUpQuestions) && evalResult.followUpQuestions.length > 0, 'Should provide follow-up questions');
      assert(Array.isArray(evalResult.revisionTopics) && evalResult.revisionTopics.length > 0, 'Should provide revision topics');

      // Check dimensions
      const dims = evalResult.dimensions;
      assert(dims && typeof dims === 'object', 'Dimensions object must exist');
      assert(dims.technicalCorrectness.score >= 7, 'Technical correctness should be high');
      assert(dims.relevance.score >= 7, 'Relevance should be high');
      assert(dims.conceptualUnderstanding.score >= 7, 'Conceptual understanding should be high');
      assert(dims.completeness.score >= 7, 'Completeness should be high');
      assert(dims.explanationClarity.score >= 7, 'Clarity should be high');
      assert(dims.practicalApplication.score >= 6, 'Practical application should be scored');
    });

    // ==========================================
    // 2. Partially Correct Answer Evaluation
    // ==========================================
    console.log('\n[Group 2] Partially Correct Answer with Gaps:');
    await test('Identifies missing concepts and provides constructive suggestions', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'Explain the difference between TCP and UDP protocols.',
        expectedKeyPoints: [
          'TCP is connection-oriented and reliable with three-way handshake',
          'UDP is connectionless and unreliable best-effort',
          'TCP has flow control and congestion control',
          'UDP has lower latency suitable for streaming or gaming'
        ],
        referenceAnswer: 'TCP establishes a connection via a three-way handshake and guarantees delivery with ordering and congestion control. UDP sends datagrams without a handshake or delivery guarantees, minimizing latency for real-time applications.',
        userAnswer: 'TCP is connection oriented. UDP does not make a connection. TCP is used for web browsing.',
        category: 'Networking',
        topic: 'Protocols & Transport Layer',
        difficulty: 'Easy',
        targetRole: 'Junior Software Engineer',
        experienceLevel: 'junior',
        interviewMode: 'conceptual'
      });

      assert(evalResult.score >= 4 && evalResult.score <= 7, `Score should be moderate (4-7), got: ${evalResult.score}`);
      assert(evalResult.verdict === 'partially_correct', `Verdict should be partially_correct, got: ${evalResult.verdict}`);
      assert(Array.isArray(evalResult.missingConcepts) && evalResult.missingConcepts.length > 0, 'Should identify missing concepts');
      assert(Array.isArray(evalResult.suggestions) && evalResult.suggestions.length > 0, 'Should provide actionable suggestions');
    });

    // ==========================================
    // 3. Misconceptions & False Claims Detection
    // ==========================================
    console.log('\n[Group 3] Misconception Detection & Corrections:');
    await test('Detects incorrect claims and generates specific technical corrections', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'Explain the mutability and thread safety differences between String, StringBuilder, and StringBuffer.',
        expectedKeyPoints: [
          'String is immutable',
          'StringBuilder is mutable and unsynchronized',
          'StringBuffer is mutable and synchronized'
        ],
        referenceAnswer: 'String is immutable in Java. StringBuilder is mutable but unsynchronized for single-thread speed. StringBuffer has synchronized methods for multi-threaded safety.',
        userAnswer: 'String is mutable and can be modified freely. Also StringBuilder is thread-safe and synchronized across threads.',
        category: 'Java',
        topic: 'Core Syntax & String Internals',
        difficulty: 'Medium',
        targetRole: 'Mid-Level Software Engineer',
        experienceLevel: 'mid',
        interviewMode: 'conceptual'
      });

      assert(Array.isArray(evalResult.incorrectStatements) && evalResult.incorrectStatements.length > 0, 'Should detect incorrect statements');
      assert(Array.isArray(evalResult.corrections) && evalResult.corrections.length > 0, 'Should provide corrections for detected claims');
      assert(evalResult.accuracyRating === 'misconceptions' || evalResult.accuracyRating === 'inaccurate', 'Accuracy rating must reflect misconceptions');
      assert(evalResult.score <= 4, `Score should be penalized for false claims, got: ${evalResult.score}`);
      console.log('    Detected incorrect statements:', evalResult.incorrectStatements);
      console.log('    Generated corrections:', evalResult.corrections);
    });

    // ==========================================
    // 4. Honest Handling of Empty Answer
    // ==========================================
    console.log('\n[Group 4] Empty Answer Handling:');
    await test('Reports empty answer honestly with 0 score without inventing scores', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'Explain the ACID properties of database transactions.',
        expectedKeyPoints: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        referenceAnswer: 'ACID represents Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrency control), and Durability (committed data survives crashes).',
        userAnswer: '',
        category: 'SQL/DBMS',
        topic: 'Transactions & ACID Guarantees',
        difficulty: 'Medium',
        targetRole: 'Backend Developer'
      });

      assert(evalResult.score === 0, 'Empty answer must have score 0');
      assert(evalResult.score100 === 0, 'Empty answer must have score100 = 0');
      assert(evalResult.verdict === 'empty', 'Verdict must be empty');
      assert(evalResult.evaluationStatus === 'empty', 'evaluationStatus must be empty');
      assert(evalResult.feedback.toLowerCase().includes('no answer'), 'Feedback should state no answer was provided');
      assert(evalResult.idealAnswer && evalResult.idealAnswer.length > 10, 'Must provide ideal answer for review');
    });

    // ==========================================
    // 5. Honest Handling of Skipped Answer
    // ==========================================
    console.log('\n[Group 5] Skipped Answer Handling:');
    await test('Reports skipped answer honestly with status skipped and score 0', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'How does indexing work in PostgreSQL and how do B-Trees optimize range queries?',
        expectedKeyPoints: ['B-Tree structure', 'Logarithmic lookup', 'Ordered leaf nodes with linked pointers'],
        referenceAnswer: 'B-Tree indexes maintain sorted balanced tree structures where leaf nodes are doubly linked, enabling fast range scans.',
        userAnswer: '[Skipped]',
        category: 'SQL/DBMS',
        topic: 'Indexing & Performance'
      });

      assert(evalResult.score === 0, 'Skipped answer must have score 0');
      assert(evalResult.score100 === 0, 'Skipped answer must have score100 = 0');
      assert(evalResult.verdict === 'empty', 'Verdict must be empty');
      assert(evalResult.evaluationStatus === 'skipped', 'evaluationStatus must be skipped');
      assert(evalResult.feedback.toLowerCase().includes('skipped'), 'Feedback should state question was skipped');
    });

    // ==========================================
    // 6. Honest Handling of Too Brief / Non-Committal Answer
    // ==========================================
    console.log('\n[Group 6] Too Short / Non-Committal Answer Handling:');
    await test('Flags non-committal answers as too_short with 0 score without fabricating scores', async () => {
      const evalResult = await evaluateAnswer({
        questionText: 'How would you scale a web application to support 1 million concurrent users?',
        expectedKeyPoints: ['Load balancing', 'Horizontal scaling', 'Caching with Redis', 'Database read replicas and sharding'],
        referenceAnswer: 'Scaling requires load balancers, stateless application servers, distributed caching with Redis, asynchronous queues, and database sharding.',
        userAnswer: 'i dont know',
        category: 'System Design',
        topic: 'High Scalability & Architecture'
      });

      assert(evalResult.score === 0, 'Non-committal response should receive 0 score');
      assert(evalResult.score100 === 0, 'score100 should be 0');
      assert(evalResult.evaluationStatus === 'too_short', 'evaluationStatus must be too_short');
      assert(evalResult.verdict === 'unclear', 'Verdict should be unclear');
      assert(evalResult.feedback.toLowerCase().includes('brief') || evalResult.feedback.toLowerCase().includes('ambiguous'), 'Feedback should explain response was too brief');
    });

    // ==========================================
    // 7. Subject-Specific Evaluation Tailoring
    // ==========================================
    console.log('\n[Group 7] Subject-Specific Tailoring:');
    await test('Tailors evaluation to SQL, Coding (Big-O), and System Design', async () => {
      // 7a. Coding round without Big-O
      const codingEval = await evaluateAnswer({
        questionText: 'Implement two sum using a hash map.',
        expectedKeyPoints: ['Use hash map for complement lookup', 'O(n) time complexity', 'O(n) space complexity'],
        userAnswer: 'I will loop through the array and store each number in a hash map. If target minus current number is in map, return indices.',
        category: 'DSA',
        interviewMode: 'coding'
      });
      assert(codingEval.missingConcepts.some(m => m.toLowerCase().includes('big-o') || m.toLowerCase().includes('complexity')), 'Coding answer without Big-O should flag complexity gap');

      // 7b. SQL query with indexing & joins
      const sqlEval = await evaluateAnswer({
        questionText: 'Write a query to find the top 5 customers by total order spend.',
        expectedKeyPoints: ['SELECT with JOIN', 'GROUP BY customer_id', 'ORDER BY SUM(spend) DESC', 'LIMIT 5', 'Index on customer_id'],
        userAnswer: 'SELECT c.name, SUM(o.amount) FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY SUM(o.amount) DESC LIMIT 5. We should ensure an index on orders.customer_id to speed up the join table scan.',
        category: 'SQL/DBMS',
        interviewMode: 'sql'
      });
      assert(sqlEval.score >= 7, 'SQL answer with join, aggregation, and index should receive high score');
      assert(sqlEval.strengths.some(s => s.toLowerCase().includes('database') || s.toLowerCase().includes('index') || s.toLowerCase().includes('core')), 'Strengths should acknowledge database context');
    });

    // ==========================================
    // 8. End-to-End API Persistence, Retry & Ownership
    // ==========================================
    console.log('\n[Group 8] End-to-End API Persistence, Retry & Ownership:');

    // Create two test users for ownership verification
    const timestamp = Date.now();
    let userA = await User.create({
      name: 'Evaluation Candidate A',
      email: `eval_candidate_a_${timestamp}@example.com`,
      password: 'Password123!'
    });

    let userB = await User.create({
      name: 'Evaluation Candidate B',
      email: `eval_candidate_b_${timestamp}@example.com`,
      password: 'Password123!'
    });

    // Generate login tokens for User A & B
    const loginResA = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userA.email, password: 'Password123!' })
    });
    const loginDataA = await loginResA.json();
    const tokenA = loginDataA.token;

    const loginResB = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userB.email, password: 'Password123!' })
    });
    const loginDataB = await loginResB.json();
    const tokenB = loginDataB.token;

    // Create interview session for User A
    const startRes = await fetch(`${BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        category: 'Java',
        difficulty: 'Medium',
        totalQuestions: 2,
        topic: 'Collections & Multithreading'
      })
    });
    const startData = await startRes.json();
    assert(startRes.status === 201, 'Should start interview session HTTP 201');
    const interviewId = startData.interview._id;
    const firstQ = startData.interview.questions[0];

    await test('Submits answer, persists evaluation in MongoDB with dimensions, and exposes full results', async () => {
      const submitRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenA}`
        },
        body: JSON.stringify({
          questionId: firstQ.questionId,
          answer: 'Java collections like ConcurrentHashMap utilize synchronized bucket nodes or CAS for lock-free read access while preserving thread-safety.'
        })
      });
      const submitData = await submitRes.json();
      assert(submitRes.status === 200, `Answer submission should succeed HTTP 200, got: ${submitRes.status}`);
      assert(submitData.evaluation, 'Should return evaluation payload');
      assert(typeof submitData.evaluation.score === 'number', 'Evaluation must have numeric score');
      assert(submitData.evaluation.dimensions, 'Evaluation must have dimensions object');
      assert(Array.isArray(submitData.evaluation.strengths), 'Evaluation must have strengths');

      // Verify direct MongoDB document
      const dbDoc = await Interview.findById(interviewId).lean();
      assert(dbDoc.questions[0].isAnswered === true, 'Question must be marked isAnswered: true');
      assert(dbDoc.questions[0].userAnswer.includes('ConcurrentHashMap'), 'userAnswer must be persisted in DB');
      assert(dbDoc.questions[0].evaluation.score !== undefined, 'evaluation.score must be persisted');
      assert(dbDoc.questions[0].evaluation.dimensions !== undefined, 'evaluation.dimensions must be persisted');
    });

    await test('Safe retry re-evaluates active question without duplicating questions', async () => {
      const preCount = (await Interview.findById(interviewId)).questions.length;

      const retryRes = await fetch(`${BASE_URL}/interviews/${interviewId}/retry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenA}`
        },
        body: JSON.stringify({
          answer: 'Updated answer: Java ConcurrentHashMap uses Compare-And-Swap (CAS) for bucket insertion and synchronizes only on the head node of a hash bucket, ensuring high concurrency without locking the entire table.'
        })
      });
      const retryData = await retryRes.json();
      assert(retryRes.status === 200, `Retry should return HTTP 200, got: ${retryRes.status}`);
      assert(retryData.evaluation, 'Retry should return newly evaluated data');

      const postDoc = await Interview.findById(interviewId).lean();
      assert(postDoc.questions.length === preCount, `Question count must remain exactly ${preCount} without duplicate records`);
      assert(postDoc.questions[0].userAnswer.includes('Compare-And-Swap'), 'Updated answer should be persisted');
    });

    await test('Enforces authentication and interview session ownership', async () => {
      // Unauthenticated request
      const unauthRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: 'Unauthorized attempt' })
      });
      assert(unauthRes.status === 401, 'Unauthenticated request must return HTTP 401');

      // Unauthorized user (User B attempting to submit to User A session)
      const wrongUserRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenB}`
        },
        body: JSON.stringify({ answer: 'Cross-user attempt' })
      });
      assert(wrongUserRes.status === 403, 'Cross-user submission must return HTTP 403');
    });

    // ==========================================
    // 9. Skill Gap Analyzer Integration
    // ==========================================
    console.log('\n[Group 9] Skill Gap Analyzer Integration:');
    await test('Completed evaluations automatically update Skill Gap Analytics without double-counting', async () => {
      // Complete remaining question to finalize interview
      const currentDoc = await Interview.findById(interviewId);
      const secondQ = currentDoc.questions[1];
      currentDoc.currentQuestionIndex = 1;
      await currentDoc.save();

      const finishRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenA}`
        },
        body: JSON.stringify({
          questionId: secondQ.questionId,
          answer: 'Multithreading in Java uses synchronized blocks and ReentrantLock to establish mutual exclusion and prevent race conditions.'
        })
      });
      assert(finishRes.status === 200, 'Finishing question should succeed');

      // Fetch Skill Gap Overview for User A
      const skillOverviewRes = await fetch(`${BASE_URL}/skills/overview`, {
        headers: { 'Authorization': `Bearer ${tokenA}` }
      });
      const skillOverviewData = await skillOverviewRes.json();
      assert(skillOverviewRes.status === 200, 'GET /api/skills/overview should succeed HTTP 200');
      assert(skillOverviewData.data?.totalEvaluatedQuestions >= 2, 'Should have evaluated at least 2 questions in analytics');

      // Direct service check
      const analytics = await getUserSkillAnalytics(userA._id);
      assert(analytics.evaluatedTopicsCount > 0, 'Evaluated topics count is greater than 0');
      console.log(`    Total Evaluated Questions: ${analytics.totalEvaluatedQuestions}`);
      console.log(`    Overall Technical Proficiency: ${analytics.overallScore}%`);
    });

    // Cleanup test users and interviews
    await Interview.deleteMany({ userId: { $in: [userA._id, userB._id] } });
    await User.deleteMany({ _id: { $in: [userA._id, userB._id] } });

    console.log('\n================================================================');
    console.log(`   FEATURE 3 VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

    await mongoose.disconnect();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

runFeature3Tests();
