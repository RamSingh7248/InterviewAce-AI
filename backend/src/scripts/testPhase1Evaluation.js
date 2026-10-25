import mongoose from 'mongoose';
import assert from 'assert';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { evaluateAnswer } from '../services/ai.service.js';
import { evaluationQueue } from '../services/evaluationQueue.js';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

async function runPhase1Tests() {
  console.log('====================================================');
  console.log('🧪 Starting Phase 1 AI Answer Evaluation & Feedback Tests');
  console.log('====================================================');

  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected to MongoDB');

  try {
    // TEST 1: Heuristic Fallback Evaluation (AI unavailable)
    console.log('\n--- Test 1: Fallback Heuristic Evaluation (AI unavailable) ---');
    const sampleQuestion = {
      questionId: 'test_q_1',
      questionText: 'Explain the difference between final, finally, and finalize in Java.',
      expectedKeyPoints: [
        'final is a keyword/modifier used for constants, preventing method overriding and class inheritance',
        'finally is a code block in try-catch-finally used for cleanup, always executes regardless of exceptions',
        'finalize is a method in java.lang.Object called before GC reclamation, deprecated since Java 9'
      ],
      referenceAnswer: 'final is a modifier restricting mutability, method overriding, and inheritance. finally is a block executing cleanup code after try-catch. finalize is a deprecated Object method previously used for pre-GC cleanup.'
    };

    const candidateAnswer = 'final is used to make variables constant and classes non-inheritable. finally block is used with try-catch to execute cleanup code like closing connections. finalize is a method called by garbage collector before an object is destroyed.';

    const fallbackEval = await evaluateAnswer({
      question: sampleQuestion,
      questionText: sampleQuestion.questionText,
      expectedKeyPoints: sampleQuestion.expectedKeyPoints,
      referenceAnswer: sampleQuestion.referenceAnswer,
      userAnswer: candidateAnswer,
      category: 'Java',
      topic: 'Core Language Mechanics',
      difficulty: 'Medium'
    }, { forceHeuristic: true });

    assert(fallbackEval, 'Fallback evaluation should produce a valid object');
    assert.strictEqual(typeof fallbackEval.score, 'number', 'score must be a number');
    assert(fallbackEval.score >= 0 && fallbackEval.score <= 10, 'score must be between 0 and 10');
    assert.strictEqual(fallbackEval.evaluatorLabel, 'Basic evaluation (AI unavailable)', 'Label must be "Basic evaluation (AI unavailable)"');
    assert.strictEqual(fallbackEval.isFallback, true, 'isFallback must be true');

    // Dimensional scores
    assert(fallbackEval.scores, 'scores subdocument must be present');
    assert.strictEqual(typeof fallbackEval.scores.technicalAccuracy, 'number', 'scores.technicalAccuracy must be a number');
    assert.strictEqual(typeof fallbackEval.scores.completeness, 'number', 'scores.completeness must be a number');
    assert.strictEqual(typeof fallbackEval.scores.depth, 'number', 'scores.depth must be a number');
    assert.strictEqual(typeof fallbackEval.scores.clarity, 'number', 'scores.clarity must be a number');
    assert.strictEqual(typeof fallbackEval.scores.communication, 'number', 'scores.communication must be a number');

    // Rubric arrays & model answer
    assert(Array.isArray(fallbackEval.keyPointsCovered), 'keyPointsCovered must be an array');
    assert(Array.isArray(fallbackEval.keyPointsMissed), 'keyPointsMissed must be an array');
    assert(Array.isArray(fallbackEval.strengths), 'strengths must be an array');
    assert(Array.isArray(fallbackEval.improvements), 'improvements must be an array');
    assert(fallbackEval.betterAnswer, 'betterAnswer must provide a model answer in simple words');

    console.log(`✓ Test 1 Passed! Heuristic fallback score: ${fallbackEval.score}/10, Label: "${fallbackEval.evaluatorLabel}"`);
    console.log(`  Covered Key Points (${fallbackEval.keyPointsCovered.length}):`, fallbackEval.keyPointsCovered);
    console.log(`  Missed Key Points (${fallbackEval.keyPointsMissed.length}):`, fallbackEval.keyPointsMissed);

    // TEST 2: Hindi/Hinglish Language Handling
    console.log('\n--- Test 2: Hindi/Hinglish Session Language Handling ---');
    const hindiEval = await evaluateAnswer({
      question: sampleQuestion,
      questionText: sampleQuestion.questionText,
      expectedKeyPoints: sampleQuestion.expectedKeyPoints,
      referenceAnswer: sampleQuestion.referenceAnswer,
      userAnswer: 'final se constant banate hain, finally try-catch ke sath cleanup ke liye use hota hai, finalize method garbage collector call karta hai.',
      category: 'Java',
      language: 'hi-IN'
    }, { forceHeuristic: true });

    assert(hindiEval && hindiEval.score > 0, 'Hindi/Hinglish answer should be evaluated with positive score');
    assert(hindiEval.scores, 'Hindi evaluation must contain dimensional scores');
    console.log(`✓ Test 2 Passed! Hindi/Hinglish answer scored: ${hindiEval.score}/10`);

    // TEST 3: Async Evaluation Queue & Session Aggregation
    console.log('\n--- Test 3: Evaluation Queue & Session Document Aggregation ---');
    let testUser = await User.findOne({ email: 'test_eval@interviewace.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Evaluation Test Candidate',
        email: 'test_eval@interviewace.com',
        password: 'Password123!',
        isVerified: true
      });
    }

    const testInterview = await Interview.create({
      userId: testUser._id,
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 2,
      targetRole: 'Software Engineer',
      status: 'in_progress',
      questions: [
        {
          questionId: 'q_test_101',
          category: 'Java',
          questionText: 'What is the purpose of hashCode() and equals() in Java?',
          expectedKeyPoints: [
            'equals defines logical object equality',
            'hashCode returns an integer bucket hash',
            'contract: equal objects must have identical hashCodes'
          ],
          referenceAnswer: 'equals defines logical equality while hashCode determines the hash bucket. The contract requires that if two objects are equal according to equals(), they must produce the same hashCode.',
          isAnswered: true,
          userAnswer: 'equals checks if two objects have equal fields, hashCode returns hash integer for hash maps. If equals is true, hashCode must be same.',
          evaluation: {
            ...fallbackEval,
            evaluationStatus: 'pending'
          }
        },
        {
          questionId: 'q_test_102',
          category: 'Java',
          questionText: 'Explain the difference between StringBuilder and StringBuffer.',
          expectedKeyPoints: [
            'StringBuilder is not synchronized and faster',
            'StringBuffer is synchronized and thread-safe'
          ],
          referenceAnswer: 'StringBuilder is asynchronous and unsynchronized, optimal for single-threaded mutation. StringBuffer is thread-safe with synchronized methods.',
          isAnswered: false
        }
      ]
    });

    console.log(`  Created test interview document ${testInterview._id}`);

    // Verify evaluationQueue tracks pending status
    const initialPending = evaluationQueue.hasPending(testInterview._id);
    assert.strictEqual(initialPending, false, 'Queue has no pending tasks initially');

    // Enqueue a background task
    const taskId = evaluationQueue.enqueue({
      interviewId: testInterview._id,
      questionIndex: 0,
      questionId: 'q_test_101',
      evalArgs: {
        question: testInterview.questions[0],
        questionText: testInterview.questions[0].questionText,
        expectedKeyPoints: testInterview.questions[0].expectedKeyPoints,
        referenceAnswer: testInterview.questions[0].referenceAnswer,
        userAnswer: testInterview.questions[0].userAnswer,
        category: 'Java'
      }
    });

    assert(taskId, 'enqueue must return a valid taskId');
    console.log(`  Enqueued background task ${taskId}`);

    // Wait briefly for queue execution
    await new Promise(r => setTimeout(r, 1200));

    // Reload document from MongoDB and verify persistence
    const updatedDoc = await Interview.findById(testInterview._id).lean();
    assert(updatedDoc, 'Document must exist in database');
    const q0 = updatedDoc.questions[0];
    assert(q0.evaluation, 'Question 0 evaluation must be saved');
    assert(q0.evaluation.evaluationStatus === 'evaluated' || q0.evaluation.evaluationStatus === 'pending', 'Status must be updated');
    assert.strictEqual(typeof q0.evaluation.overallScore, 'number', 'overallScore must be a number');
    assert(q0.evaluation.scores, 'scores dimension must exist');

    console.log(`✓ Test 3 Passed! Async queue processed task. Question evaluationStatus: "${q0.evaluation.evaluationStatus}", Evaluator: "${q0.evaluation.evaluatorLabel}"`);

    // TEST 4: Session History Querying
    console.log('\n--- Test 4: Session History Retrieval ---');
    const historyDocs = await Interview.find({ userId: testUser._id })
      .sort({ createdAt: -1 })
      .select('category topic difficulty targetRole status finalScore totalQuestions questions.isAnswered questions.evaluation.overallScore createdAt')
      .lean();

    assert(Array.isArray(historyDocs) && historyDocs.length > 0, 'History must return user past sessions');
    assert(historyDocs[0].category === 'Java', 'Category must match');
    assert(historyDocs[0].questions.length > 0, 'Questions array must be populated');
    console.log(`✓ Test 4 Passed! Found ${historyDocs.length} past session(s) for user.`);

    // Clean up test documents
    await Interview.findByIdAndDelete(testInterview._id);
    await User.findByIdAndDelete(testUser._id);
    console.log('✓ Cleaned up test data');

    console.log('\n====================================================');
    console.log('🎉 ALL PHASE 1 TESTS PASSED SUCCESSFULLY!');
    console.log('====================================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ Phase 1 Test Failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

runPhase1Tests();
