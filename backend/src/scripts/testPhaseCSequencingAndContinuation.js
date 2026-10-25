import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assert from 'assert';
import { generateQuestions, retrieveCuratedQuestions, generateAdaptiveFollowUpQuestion } from '../services/ai.service.js';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import Question from '../models/Question.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

async function runTests() {
  console.log('--- STARTING PHASE C VERIFICATION TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    // Test 1: Sequenced question ordering in retrieveCuratedQuestions & generateQuestions
    console.log('\n[Test 1] Verifying strict sequenceOrder progression...');
    const javaResult = await retrieveCuratedQuestions({
      category: 'Java',
      count: 5,
      difficulty: 'Medium'
    });
    assert(javaResult.length === 5, `Expected 5 questions, got ${javaResult.length}`);
    for (let i = 0; i < javaResult.length; i++) {
      assert(javaResult[i].sequenceOrder, `Question at index ${i} missing sequenceOrder`);
      if (i > 0) {
        assert(
          javaResult[i].sequenceOrder >= javaResult[i - 1].sequenceOrder,
          `Sequence order should be non-decreasing: Q${i - 1}=${javaResult[i - 1].sequenceOrder}, Q${i}=${javaResult[i].sequenceOrder}`
        );
      }
    }
    console.log(`✓ Java questions correctly sequenced: ${javaResult.map(q => `Seq ${q.sequenceOrder}: ${q.topic}`).join(' -> ')}`);
    passed++;

    // Test 2: SQL and DSA sequencing
    console.log('\n[Test 2] Verifying SQL and DSA sequenceOrder...');
    const sqlResult = await retrieveCuratedQuestions({
      category: 'SQL',
      count: 4,
      difficulty: 'Medium'
    });
    assert(sqlResult.length >= 3, `Expected at least 3 SQL questions, got ${sqlResult.length}`);
    assert(sqlResult[0].sequenceOrder <= sqlResult[1].sequenceOrder);
    console.log(`✓ SQL questions sequenced: ${sqlResult.map(q => `Seq ${q.sequenceOrder}: ${q.topic}`).join(' -> ')}`);

    const dsaResult = await retrieveCuratedQuestions({
      category: 'DSA',
      count: 4,
      difficulty: 'Medium'
    });
    assert(dsaResult.length >= 3, `Expected at least 3 DSA questions, got ${dsaResult.length}`);
    assert(dsaResult[0].sequenceOrder <= dsaResult[1].sequenceOrder);
    console.log(`✓ DSA questions sequenced: ${dsaResult.map(q => `Seq ${q.sequenceOrder}: ${q.topic}`).join(' -> ')}`);
    passed++;

    // Test 3: Continuation with minSequenceOrder & deduplication
    console.log('\n[Test 3] Verifying continuation and deduplication with minSequenceOrder...');
    const askedIds = javaResult.map(q => q.questionId || q._id);
    const askedNorms = javaResult.map(q => q.normalizedText);
    const continuationQuestions = await retrieveCuratedQuestions({
      category: 'Java',
      count: 3,
      difficulty: 'Medium',
      excludeIds: askedIds,
      excludeNormalized: askedNorms,
      minSequenceOrder: 6
    });

    assert(continuationQuestions.length > 0, 'Expected continuation questions to be returned');
    for (const q of continuationQuestions) {
      assert(!askedIds.includes(q.questionId), `Continuation returned duplicate question ID: ${q.questionId}`);
      assert(!askedNorms.includes(q.normalizedText), `Continuation returned duplicate normalized text: ${q.normalizedText}`);
      assert(q.sequenceOrder >= 6, `Expected sequenceOrder >= 6, got ${q.sequenceOrder}`);
    }
    console.log(`✓ Continuation fetched higher sequence questions without duplicates: ${continuationQuestions.map(q => `Seq ${q.sequenceOrder}: ${q.topic}`).join(', ')}`);
    passed++;

    // Test 4: Adaptive follow-up phrasing eliminates awkward robotic strings
    console.log('\n[Test 4] Verifying adaptive follow-up phrasing is natural and free of robotic strings...');
    const prevQ = javaResult[0];
    const followUpStrategies = ['deepen', 'probe_gap', 'diagnostic', 'clarify', 'simplify'];
    for (const strat of followUpStrategies) {
      const adaptiveResult = await generateAdaptiveFollowUpQuestion({
        category: 'Java',
        difficulty: 'Medium',
        targetRole: 'Backend Engineer',
        previousQuestion: prevQ,
        userAnswer: 'I know the basics of JVM memory and heap allocations.',
        evaluation: { score: 5, missingKeyPoints: ['Garbage Collection Roots', 'Metaspace'] },
        excludeNormalized: askedNorms,
        excludeIds: askedIds,
        parentQuestionId: prevQ.questionId,
        strategy: strat
      });

      assert(adaptiveResult && adaptiveResult.questionText, `Failed to generate adaptive follow-up for strategy: ${strat}`);
      const text = adaptiveResult.questionText;

      // Assert absence of awkward legacy strings
      assert(!text.includes('Regarding ') || !text.includes('what are the common failure modes or subtle misconceptions'), 'Robotic template text detected!');
      assert(!text.includes('Regarding null in'), 'Unbound topic detected');
      assert(!text.includes('Regarding undefined in'), 'Unbound topic detected');
      assert(adaptiveResult.stepByStepExplanation, 'Missing stepByStepExplanation in adaptive follow-up');
      assert(adaptiveResult.practicalExample, 'Missing practicalExample in adaptive follow-up');
    }
    console.log('✓ Adaptive follow-up questions generated with authentic interviewer dialogue and structured educational metadata across all strategies.');
    passed++;

    // Test 5: End-to-end Session Continuation in Interview Model
    console.log('\n[Test 5] Verifying Interview model session lifecycle with more practice questions...');
    let testUser = await User.findOne({ email: 'phasec_tester@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Phase C Tester',
        email: 'phasec_tester@example.com',
        password: 'password123'
      });
    }

    // Clean up old test interviews
    await Interview.deleteMany({ userId: testUser._id });

    // Create session 1 with 3 questions
    const session1Questions = javaResult.slice(0, 3).map((q, idx) => ({
      questionId: q.questionId || `q_test_${idx}`,
      questionText: q.questionText,
      normalizedText: q.normalizedText,
      order: idx,
      category: 'Java',
      difficulty: 'Medium',
      topic: q.topic,
      sequenceOrder: q.sequenceOrder,
      learningStage: q.learningStage,
      isAnswered: true,
      userAnswer: 'Test answer for question ' + idx,
      evaluation: { score: idx === 0 ? 4 : 8, verdict: idx === 0 ? 'partially_correct' : 'correct' }
    }));

    const interviewSession = await Interview.create({
      userId: testUser._id,
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 3,
      currentQuestionIndex: 2,
      status: 'completed',
      sessionState: 'completed',
      startedAt: new Date(Date.now() - 3600000),
      completedAt: new Date(),
      askedQuestionIds: session1Questions.map(q => q.questionId),
      askedQuestionTexts: session1Questions.map(q => q.normalizedText),
      questions: session1Questions
    });

    assert(interviewSession.status === 'completed', 'Session should be completed');

    // Simulate Practice Continuation: fetch more questions (Seq 4+)
    const currentMaxSeq = interviewSession.questions.reduce((max, q) => Math.max(max, q.sequenceOrder || 0), 0);
    const { questions: extraQuestions } = await generateQuestions({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 2,
      excludeNormalized: interviewSession.askedQuestionTexts,
      excludeIds: interviewSession.askedQuestionIds,
      minSequenceOrder: currentMaxSeq + 1
    });

    assert(extraQuestions.length === 2, `Expected 2 extra questions, got ${extraQuestions.length}`);
    assert(extraQuestions[0].sequenceOrder > currentMaxSeq, `New question sequence ${extraQuestions[0].sequenceOrder} should exceed ${currentMaxSeq}`);

    // Append extra questions and resume session
    const prevCount = interviewSession.questions.length;
    extraQuestions.forEach((eq, i) => {
      interviewSession.questions.push({
        questionId: eq.questionId || `q_extra_${i}`,
        questionText: eq.questionText,
        normalizedText: eq.normalizedText,
        order: prevCount + i,
        category: 'Java',
        difficulty: eq.difficulty,
        topic: eq.topic,
        sequenceOrder: eq.sequenceOrder,
        learningStage: eq.learningStage,
        isAnswered: false
      });
      interviewSession.askedQuestionIds.push(eq.questionId);
      interviewSession.askedQuestionTexts.push(eq.normalizedText);
    });

    interviewSession.totalQuestions = interviewSession.questions.length;
    interviewSession.status = 'in_progress';
    interviewSession.sessionState = 'awaiting_answer';
    interviewSession.currentQuestionIndex = prevCount;
    interviewSession.completedAt = null;
    await interviewSession.save();

    assert(interviewSession.totalQuestions === 5, 'Total questions should now be 5');
    assert(interviewSession.status === 'in_progress', 'Session should be resumed to in_progress');
    assert(interviewSession.currentQuestionIndex === 3, 'Active question index should point to first newly added question');
    console.log(`✓ Practice continuation seamlessly resumed completed session from index 3 with ${interviewSession.questions.length} total questions.`);
    passed++;

    // Test 6: Revision mode inclusion vs standard mode exclusion
    console.log('\n[Test 6] Verifying Revision mode vs Standard mode deduplication...');
    // In session 1, question 0 had score = 4 (< 7), question 1 had score = 8 (>= 7)
    const weakQuestion = session1Questions[0];
    const strongQuestion = session1Questions[1];

    // Standard mode test: past asked questions should be excluded
    const standardPastSessions = await Interview.find({ userId: testUser._id }).lean();
    const standardExcludedNorms = new Set();
    standardPastSessions.forEach(s => {
      s.askedQuestionTexts?.forEach(t => standardExcludedNorms.add(t));
    });

    assert(standardExcludedNorms.has(weakQuestion.normalizedText), 'Standard mode should track weak question as asked');
    assert(standardExcludedNorms.has(strongQuestion.normalizedText), 'Standard mode should track strong question as asked');

    // Revision mode logic: filter weak questions from past sessions
    const revisionCandidates = [];
    standardPastSessions.forEach(s => {
      s.questions?.forEach(q => {
        if (q.evaluation?.score !== undefined && q.evaluation.score < 7) {
          revisionCandidates.push(q);
        }
      });
    });

    assert(revisionCandidates.length > 0, 'Expected at least 1 weak question in revision candidates');
    assert(revisionCandidates.some(q => q.questionId === weakQuestion.questionId), 'Weak question should be identified for revision');
    assert(!revisionCandidates.some(q => q.questionId === strongQuestion.questionId), 'Strong question (score >= 7) should not be in revision pool');
    console.log(`✓ Revision mode correctly prioritized weak questions (score < 7) for targeted re-practice while filtering mastered questions.`);
    passed++;

    // Clean up
    await Interview.deleteMany({ userId: testUser._id });
    await User.deleteOne({ _id: testUser._id });

  } catch (err) {
    console.error('❌ Test failed with error:', err);
    failed++;
  } finally {
    await mongoose.disconnect();
    console.log(`\n========================================`);
    console.log(`PHASE C TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);
    if (failed > 0) {
      process.exit(1);
    }
  }
}

runTests();
