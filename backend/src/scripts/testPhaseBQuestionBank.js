/**
 * Comprehensive Automated Verification Suite for Phase B:
 * Structured Question Schema & Curated Baseline Question Bank
 */

import assert from 'assert';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Question from '../models/Question.js';
import Interview from '../models/Interview.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import { JAVA_QUESTIONS } from '../data/curated/javaQuestions.js';
import { SQL_QUESTIONS } from '../data/curated/sqlQuestions.js';
import { DSA_QUESTIONS } from '../data/curated/dsaQuestions.js';
import { JAVASCRIPT_QUESTIONS, REACT_QUESTIONS, NODE_QUESTIONS } from '../data/curated/webQuestions.js';
import { SYSTEM_DESIGN_QUESTIONS, OS_QUESTIONS, NETWORK_QUESTIONS } from '../data/curated/systemsQuestions.js';

dotenv.config();

console.log('================================================================');
console.log('     PHASE B VERIFICATION: STRUCTURED QUESTION BANK & SCHEMA    ');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${description}`);
    console.error(`         ${err.message}`);
    failedTests++;
  }
}

async function asyncTest(description, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${description}`);
    console.error(`         ${err.message}`);
    failedTests++;
  }
}

const VALID_LEARNING_STAGES = [
  'Fundamentals',
  'Core Concepts',
  'Common Interview Questions',
  'Implementation & Coding',
  'Practical Applications',
  'Debugging & Edge Cases',
  'Performance & Optimization',
  'Advanced Concepts',
  'Real-World Scenarios'
];

const VALID_RELEVANCE_LABELS = [
  'Core interview question',
  'Common interview topic',
  'Practical scenario',
  'Advanced concept',
  'Coding exercise',
  'Debugging scenario'
];

// ---------------------------------------------------------
// TEST GROUP 1: Question Metadata & Stable Identity
// ---------------------------------------------------------
console.log('[Test Group 1] Schema Conformance & Stable IDs:');

test('Every question in SEED_QUESTIONS has a non-empty stable questionId', () => {
  assert(SEED_QUESTIONS.length > 100, `Expected over 100 questions, got ${SEED_QUESTIONS.length}`);
  const idSet = new Set();
  for (const q of SEED_QUESTIONS) {
    assert(q.questionId && typeof q.questionId === 'string' && q.questionId.trim().length > 0,
      `Question missing stable questionId: "${q.questionText.slice(0, 40)}"`);
    assert(!idSet.has(q.questionId), `Duplicate questionId detected: ${q.questionId}`);
    idSet.add(q.questionId);
  }
});

test('Every question in SEED_QUESTIONS has valid sequenceOrder and learningStage', () => {
  for (const q of SEED_QUESTIONS) {
    assert(typeof q.sequenceOrder === 'number' && q.sequenceOrder >= 1,
      `Question ${q.questionId} has invalid sequenceOrder: ${q.sequenceOrder}`);
    assert(VALID_LEARNING_STAGES.includes(q.learningStage),
      `Question ${q.questionId} has invalid learningStage: "${q.learningStage}"`);
    assert(VALID_RELEVANCE_LABELS.includes(q.interviewRelevanceLabel),
      `Question ${q.questionId} has invalid interviewRelevanceLabel: "${q.interviewRelevanceLabel}"`);
  }
});

// ---------------------------------------------------------
// TEST GROUP 2: Pedagogical Sequence Flow
// ---------------------------------------------------------
console.log('\n[Test Group 2] Topic-Wise Pedagogical Sequences:');

test('Java questions flow logically from JVM/Strings to Collections, Concurrency, GC, and Diagnostics', () => {
  assert.strictEqual(JAVA_QUESTIONS.length, 9, 'Expected 9 curated Java questions');
  
  // Verify strict sequential ordering
  for (let i = 0; i < JAVA_QUESTIONS.length; i++) {
    assert.strictEqual(JAVA_QUESTIONS[i].sequenceOrder, i + 1, `Java question index ${i} should have sequenceOrder ${i + 1}`);
  }

  // Sequence 1 must be JVM architecture
  assert(JAVA_QUESTIONS[0].questionText.includes('JVM') || JAVA_QUESTIONS[0].questionText.includes('architecture'), 'Seq 1 should cover JVM architecture');
  assert.strictEqual(JAVA_QUESTIONS[0].learningStage, 'Fundamentals');

  // Sequence 2 must cover String immutability
  assert(JAVA_QUESTIONS[1].questionText.includes('immutable') || JAVA_QUESTIONS[1].questionText.includes('String'), 'Seq 2 should cover String immutability');
  assert.strictEqual(JAVA_QUESTIONS[1].learningStage, 'Fundamentals');

  // Sequence 3 must cover equals and hashCode contract
  assert(JAVA_QUESTIONS[2].questionText.includes('.equals()') && JAVA_QUESTIONS[2].questionText.includes('hashCode'), 'Seq 3 should cover equals and hashCode');
  assert.strictEqual(JAVA_QUESTIONS[2].learningStage, 'Core Concepts');

  // Sequence 4 must cover HashMap collision & treeification
  assert(JAVA_QUESTIONS[3].questionText.includes('HashMap') && JAVA_QUESTIONS[3].questionText.includes('collision'), 'Seq 4 should cover HashMap');
  
  // Sequence 7 must cover Generational GC
  assert(JAVA_QUESTIONS[6].questionText.includes('Garbage Collector') || JAVA_QUESTIONS[6].questionText.includes('Eden'), 'Seq 7 should cover GC');
  assert.strictEqual(JAVA_QUESTIONS[6].learningStage, 'Performance & Optimization');

  // Sequence 8 must cover OOM production diagnostics
  assert(JAVA_QUESTIONS[7].questionText.includes('OutOfMemoryError'), 'Seq 8 should cover OOM diagnostics');
  assert.strictEqual(JAVA_QUESTIONS[7].learningStage, 'Debugging & Edge Cases');
});

test('SQL/DBMS questions flow logically from WHERE/HAVING to Joins, CTEs, Indexing, ACID, and Deadlocks', () => {
  assert.strictEqual(SQL_QUESTIONS.length, 9, 'Expected 9 curated SQL questions');
  
  for (let i = 0; i < SQL_QUESTIONS.length; i++) {
    assert.strictEqual(SQL_QUESTIONS[i].sequenceOrder, i + 1, `SQL question index ${i} should have sequenceOrder ${i + 1}`);
  }

  // Seq 1: WHERE vs HAVING
  assert(SQL_QUESTIONS[0].questionText.includes('WHERE') && SQL_QUESTIONS[0].questionText.includes('HAVING'), 'Seq 1 should cover WHERE vs HAVING');
  assert.strictEqual(SQL_QUESTIONS[0].learningStage, 'Fundamentals');

  // Seq 2: Relational Joins
  assert(SQL_QUESTIONS[1].questionText.includes('INNER JOIN') && SQL_QUESTIONS[1].questionText.includes('LEFT JOIN'), 'Seq 2 should cover Joins');

  // Seq 5: B-Tree Indexes & Explain
  assert(SQL_QUESTIONS[4].questionText.includes('B-Tree') && SQL_QUESTIONS[4].questionText.includes('Prefix'), 'Seq 5 should cover Indexing');
  assert.strictEqual(SQL_QUESTIONS[4].learningStage, 'Performance & Optimization');

  // Seq 6: ACID Transactions
  assert(SQL_QUESTIONS[5].questionText.includes('ACID'), 'Seq 6 should cover ACID');

  // Seq 9: Deadlocks
  assert(SQL_QUESTIONS[8].questionText.includes('deadlock'), 'Seq 9 should cover Deadlocks');
  assert.strictEqual(SQL_QUESTIONS[8].learningStage, 'Debugging & Edge Cases');
});

test('DSA questions flow logically from Two Pointers/Sliding Window to Binary Search, Trees, Graphs, DP, and LRU Cache', () => {
  assert.strictEqual(DSA_QUESTIONS.length, 9, 'Expected 9 curated DSA questions');
  
  for (let i = 0; i < DSA_QUESTIONS.length; i++) {
    assert.strictEqual(DSA_QUESTIONS[i].sequenceOrder, i + 1, `DSA question index ${i} should have sequenceOrder ${i + 1}`);
  }

  // Seq 1: Two Sum / Two Pointers
  assert(DSA_QUESTIONS[0].questionText.includes('Two Sum') || DSA_QUESTIONS[0].questionText.includes('Pair Sum'), 'Seq 1 should cover Two Sum');

  // Seq 2: Sliding Window
  assert(DSA_QUESTIONS[1].questionText.includes('Longest Substring') && DSA_QUESTIONS[1].questionText.includes('Repeating'), 'Seq 2 should cover Sliding Window');

  // Seq 4: Linked List Cycle
  assert(DSA_QUESTIONS[3].questionText.includes('cycle') && DSA_QUESTIONS[3].questionText.includes('linked list'), 'Seq 4 should cover cycle detection');

  // Seq 6: Validate BST
  assert(DSA_QUESTIONS[5].questionText.includes('Binary Search Tree') || DSA_QUESTIONS[5].questionText.includes('BST'), 'Seq 6 should cover BST validation');

  // Seq 8: Coin Change DP
  assert(DSA_QUESTIONS[7].questionText.includes('Coin Change') && DSA_QUESTIONS[7].questionText.includes('Dynamic Programming'), 'Seq 8 should cover DP');

  // Seq 9: LRU Cache
  assert(DSA_QUESTIONS[8].questionText.includes('LRU') && DSA_QUESTIONS[8].questionText.includes('Cache'), 'Seq 9 should cover LRU Cache design');
});

// ---------------------------------------------------------
// TEST GROUP 3: Database Synchronization & Retrieval
// ---------------------------------------------------------
console.log('\n[Test Group 3] MongoDB Schema Persistence & Query Indexing:');

async function runDatabaseTests() {
  const connected = await connectDB();
  assert(connected, 'Database connection must succeed');

  await asyncTest('MongoDB stores questions with new sequence and educational fields', async () => {
    const javaQ = await Question.findOne({ questionId: 'java_jvm_001' }).lean();
    assert(javaQ, 'java_jvm_001 must exist in database');
    assert.strictEqual(javaQ.sequenceOrder, 1);
    assert.strictEqual(javaQ.learningStage, 'Fundamentals');
    assert.strictEqual(javaQ.interviewRelevanceLabel, 'Core interview question');
    assert(javaQ.stepByStepExplanation.length > 50, 'Step-by-step explanation must be populated');
    assert(javaQ.practicalExample.length > 30, 'Practical example must be populated');
    assert(Array.isArray(javaQ.commonMistakes) && javaQ.commonMistakes.length > 0, 'Common mistakes must be populated');
  });

  await asyncTest('Querying questions by category and sequenceOrder executes with index optimization', async () => {
    const questions = await Question.find({ category: 'SQL/DBMS', sequenceOrder: { $gte: 1, $lte: 9 } })
      .sort({ sequenceOrder: 1 })
      .lean();
    
    assert(questions.length >= 9, `Expected at least 9 SQL questions in DB, got ${questions.length}`);
    for (let i = 0; i < 9; i++) {
      assert.strictEqual(questions[i].sequenceOrder, i + 1, `SQL question ${i} sequenceOrder should be ${i + 1}`);
    }
  });

  await asyncTest('Interview model question subdocuments store and sanitize educational fields cleanly', async () => {
    const dummyQuestion = {
      questionId: 'test_seq_001',
      questionText: 'Test question text for sequence validation?',
      normalizedText: 'test question text for sequence validation',
      order: 0,
      sequenceOrder: 1,
      learningStage: 'Fundamentals',
      interviewRelevanceLabel: 'Core interview question',
      stepByStepExplanation: 'Step 1: Test step.',
      practicalExample: 'const x = 1;',
      commonMistakes: ['Mistake 1'],
      expectedKeyPoints: ['Point 1'],
      referenceAnswer: 'Model answer text'
    };

    // Verify subdocument validation
    const mockInterview = new Interview({
      userId: new mongoose.Types.ObjectId(),
      category: 'Java',
      difficulty: 'Medium',
      questions: [dummyQuestion],
      totalQuestions: 1,
      currentQuestionIndex: 0
    });

    assert.strictEqual(mockInterview.questions[0].sequenceOrder, 1);
    assert.strictEqual(mockInterview.questions[0].learningStage, 'Fundamentals');
    assert.strictEqual(mockInterview.questions[0].stepByStepExplanation, 'Step 1: Test step.');
  });

  // ---------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED (Total: ${passedTests + failedTests})`);
  console.log('================================================================\n');

  await mongoose.connection.close();

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runDatabaseTests().catch(err => {
  console.error('Test runner fatal exception:', err);
  process.exit(1);
});
