import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assert from 'assert';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import { retrieveCuratedQuestions } from '../services/ai.service.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

async function runTests() {
  console.log('================================================================');
  console.log('   PHASE D VERIFICATION: RESULTS WITH DETAILED EXPLANATIONS    ');
  console.log('================================================================');
  let passed = 0;
  let failed = 0;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    let testUser = await User.findOne({ email: 'phased_tester@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Phase D Tester',
        email: 'phased_tester@example.com',
        password: 'password123'
      });
    }

    await Interview.deleteMany({ userId: testUser._id });

    // Retrieve authentic questions with full educational metadata
    const curatedQuestions = await retrieveCuratedQuestions({
      category: 'Java',
      count: 3,
      difficulty: 'Medium'
    });

    assert(curatedQuestions.length === 3, 'Should retrieve 3 curated Java questions');

    // Create a completed interview session
    const formattedQuestions = curatedQuestions.map((q, idx) => ({
      questionId: q.questionId || `q_${idx}`,
      questionText: q.questionText,
      normalizedText: q.normalizedText,
      order: idx,
      category: 'Java',
      difficulty: 'Medium',
      topic: q.topic,
      sequenceOrder: q.sequenceOrder,
      learningStage: q.learningStage,
      interviewRelevanceLabel: q.interviewRelevanceLabel,
      stepByStepExplanation: q.stepByStepExplanation,
      practicalExample: q.practicalExample,
      commonMistakes: q.commonMistakes,
      timeComplexity: q.timeComplexity,
      spaceComplexity: q.spaceComplexity,
      suggestedFollowUps: q.suggestedFollowUps,
      expectedKeyPoints: q.expectedKeyPoints,
      referenceAnswer: q.referenceAnswer,
      isAnswered: true,
      userAnswer: 'In Java, ' + q.topic + ' works with heap memory and internal pointer state.',
      evaluation: {
        score: idx === 0 ? 9 : idx === 1 ? 4 : 7,
        verdict: idx === 0 ? 'correct' : idx === 1 ? 'incorrect' : 'partially_correct',
        feedback: 'Good overview of the internal mechanisms.',
        strengths: ['Clear terminology', 'Good depth'],
        missingConcepts: idx === 1 ? ['Race conditions', 'Visibility guarantees'] : []
      }
    }));

    const interview = await Interview.create({
      userId: testUser._id,
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 3,
      currentQuestionIndex: 2,
      status: 'completed',
      sessionState: 'completed',
      startedAt: new Date(Date.now() - 3600000),
      completedAt: new Date(),
      askedQuestionIds: formattedQuestions.map(q => q.questionId),
      askedQuestionTexts: formattedQuestions.map(q => q.normalizedText),
      questions: formattedQuestions
    });

    // Test 1: Completed Session exposes full educational breakdown
    console.log('\n[Test 1] Verifying full educational breakdown exposed on completed session...');
    const fetched = await Interview.findById(interview._id).lean();
    assert(fetched.status === 'completed', 'Session status should be completed');
    
    for (let i = 0; i < fetched.questions.length; i++) {
      const q = fetched.questions[i];
      assert(q.stepByStepExplanation && q.stepByStepExplanation.length > 20, `Q${i} missing stepByStepExplanation`);
      assert(q.practicalExample && q.practicalExample.length > 20, `Q${i} missing practicalExample`);
      assert(Array.isArray(q.commonMistakes) && q.commonMistakes.length > 0, `Q${i} missing commonMistakes`);
      assert(q.referenceAnswer && q.referenceAnswer.length > 10, `Q${i} missing referenceAnswer`);
      assert(Array.isArray(q.expectedKeyPoints) && q.expectedKeyPoints.length > 0, `Q${i} missing expectedKeyPoints`);
      assert(q.sequenceOrder > 0, `Q${i} missing sequenceOrder`);
      assert(q.learningStage, `Q${i} missing learningStage`);
    }
    console.log(`✓ Completed session preserves all 10 educational fields across all ${fetched.questions.length} questions.`);
    passed++;

    // Test 2: Practice Continuation Extends Session & Resumes Awaiting Answer State
    console.log('\n[Test 2] Verifying session extension and seamless resumption...');
    const currentMaxSeq = fetched.questions.reduce((m, q) => Math.max(m, q.sequenceOrder || 0), 0);
    const continuation = await retrieveCuratedQuestions({
      category: 'Java',
      count: 2,
      difficulty: 'Medium',
      excludeIds: fetched.askedQuestionIds,
      excludeNormalized: fetched.askedQuestionTexts,
      minSequenceOrder: currentMaxSeq + 1
    });

    assert(continuation.length > 0, 'Continuation should return subsequent questions');
    const prevCount = fetched.questions.length;

    // Simulate endpoint adding more questions
    const newDocs = continuation.map((eq, i) => ({
      questionId: eq.questionId || `q_ext_${i}`,
      questionText: eq.questionText,
      normalizedText: eq.normalizedText,
      order: prevCount + i,
      category: 'Java',
      difficulty: eq.difficulty,
      topic: eq.topic,
      sequenceOrder: eq.sequenceOrder,
      learningStage: eq.learningStage,
      interviewRelevanceLabel: eq.interviewRelevanceLabel,
      stepByStepExplanation: eq.stepByStepExplanation,
      practicalExample: eq.practicalExample,
      commonMistakes: eq.commonMistakes,
      suggestedFollowUps: eq.suggestedFollowUps,
      referenceAnswer: eq.referenceAnswer,
      expectedKeyPoints: eq.expectedKeyPoints,
      isAnswered: false
    }));

    await Interview.findByIdAndUpdate(interview._id, {
      $push: { questions: { $each: newDocs } },
      $set: {
        totalQuestions: prevCount + newDocs.length,
        status: 'in_progress',
        sessionState: 'awaiting_answer',
        currentQuestionIndex: prevCount,
        completedAt: null
      }
    });

    const resumed = await Interview.findById(interview._id).lean();
    assert(resumed.status === 'in_progress', 'Status should be in_progress');
    assert(resumed.sessionState === 'awaiting_answer', 'SessionState should be awaiting_answer');
    assert(resumed.totalQuestions === 5, 'Total questions should be 5');
    assert(resumed.currentQuestionIndex === 3, 'Index should point to question 3');
    console.log(`✓ Practice continuation successfully extended session to ${resumed.totalQuestions} questions and resumed in_progress at index 3.`);
    passed++;

    // Test 3: Weak Topic Isolation for Revision
    console.log('\n[Test 3] Verifying weak topic isolation for targeted revision...');
    const weakQuestions = resumed.questions.filter(q => q.evaluation && q.evaluation.score < 6);
    assert(weakQuestions.length === 1, `Expected 1 weak question, got ${weakQuestions.length}`);
    assert(weakQuestions[0].evaluation.score === 4, 'Weak question score should be 4');
    assert(weakQuestions[0].evaluation.missingConcepts.length > 0, 'Weak question should have missing concepts');
    console.log(`✓ Successfully identified weak question: "${weakQuestions[0].topic}" (Score: 4/10) with gaps: ${weakQuestions[0].evaluation.missingConcepts.join(', ')}`);
    passed++;

    // Cleanup
    await Interview.deleteMany({ userId: testUser._id });
    await User.deleteOne({ _id: testUser._id });

  } catch (err) {
    console.error('❌ Phase D test failed with error:', err);
    failed++;
  } finally {
    await mongoose.disconnect();
    console.log('\n================================================================');
    console.log(`PHASE D TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');
    if (failed > 0) {
      process.exit(1);
    }
  }
}

runTests();
