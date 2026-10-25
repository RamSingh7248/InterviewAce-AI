/**
 * Automated Verification Script for Phase 6: Realistic Voice Interview & Voice Metrics
 * Tests speech rate (WPM) calculation, filler word detection (English & Hindi),
 * silence detection heuristics, and communication score calibration.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import User from '../models/User.js';
import Interview from '../models/Interview.js';
import { computeVoiceMetrics } from '../utils/voiceMetrics.js';
import { createInterview, submitAnswer } from '../controllers/interview.controller.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    throw new Error(message);
  }
  console.log(`  ✓ ${message}`);
}

async function run() {
  console.log('====================================================');
  console.log('  PHASE 6: REALISTIC VOICE INTERVIEW VERIFICATION   ');
  console.log('====================================================\n');

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  try {
    // 1. Test Voice Metrics Computation: Optimal Pace & Zero Fillers
    console.log('TEST 1: Voice Metrics Computation (Optimal Pace & Zero Fillers)');
    const cleanAnswer = 'In React, the virtual DOM is a lightweight JavaScript representation of the real DOM. When component state changes, React creates a new virtual DOM tree, computes diffs using the reconciliation algorithm, and applies minimal batched mutations to the real browser DOM.';
    const cleanMetrics = computeVoiceMetrics(cleanAnswer, { durationSeconds: 20, pauseCount: 2 });

    assert(cleanMetrics.wordsCount >= 35, `Words counted: ${cleanMetrics.wordsCount}`);
    assert(cleanMetrics.wpm >= 100 && cleanMetrics.wpm <= 160, `Calculated WPM: ${cleanMetrics.wpm} WPM (expected ~125 WPM)`);
    assert(cleanMetrics.fillerWordsCount === 0, 'Zero filler words detected in clean answer');
    assert(cleanMetrics.paceAssessment === 'Natural interview pace', `Pace assessment: ${cleanMetrics.paceAssessment}`);
    assert(Boolean(cleanMetrics.clarityTip), 'Generated clarity tip for candidate');

    // 2. Test Filler Words Detection (English & Hindi / Hinglish)
    console.log('\nTEST 2: Filler Words Detection (English & Hindi / Hinglish)');
    const fillerAnswer = 'Um basically, in Java, like garbage collection actually happens automatically, matlab the JVM deallocates memory, yaani unreferenced objects get cleared.';
    const fillerMetrics = computeVoiceMetrics(fillerAnswer, { durationSeconds: 15, pauseCount: 4 });

    assert(fillerMetrics.fillerWordsCount >= 5, `Detected ${fillerMetrics.fillerWordsCount} filler words (expected >= 5)`);
    assert(fillerMetrics.fillerWords.includes('basically'), 'Detected English filler "basically"');
    assert(fillerMetrics.fillerWords.includes('like'), 'Detected English filler "like"');
    assert(fillerMetrics.fillerWords.includes('matlab'), 'Detected Hindi filler "matlab"');
    assert(fillerMetrics.fillerWords.includes('yaani'), 'Detected Hindi filler "yaani"');
    assert(fillerMetrics.clarityTip.includes('filler words'), 'Clarity tip warns about disfluencies');

    // 3. Test Speaking Pace Boundaries (Slow vs Rapid)
    console.log('\nTEST 3: Speaking Pace Thresholds (Slow vs Rapid)');
    const slowMetrics = computeVoiceMetrics('A very brief answer.', { durationSeconds: 30, pauseCount: 1 });
    assert(slowMetrics.wpm < 85, `Slow speaking rate flagged: ${slowMetrics.wpm} WPM`);
    assert(slowMetrics.paceAssessment.includes('Slow'), 'Slow pace assessment assigned');

    const rapidAnswer = 'Word '.repeat(80).trim();
    const rapidMetrics = computeVoiceMetrics(rapidAnswer, { durationSeconds: 15, pauseCount: 0 });
    assert(rapidMetrics.wpm > 180, `Rapid speaking rate flagged: ${rapidMetrics.wpm} WPM`);
    assert(rapidMetrics.paceAssessment.includes('Fast'), 'Fast pace assessment assigned');

    // 4. Test Interview Creation in Voice Mode
    console.log('\nTEST 4: Interview Session Creation with Voice Mode Enabled');
    const testUser = await User.create({
      name: 'Voice Candidate',
      email: `voice_test_${Date.now()}@example.com`,
      password: 'Password123!'
    });

    const mockReqCreate = {
      user: { _id: testUser._id },
      body: {
        category: 'React',
        difficulty: 'Medium',
        totalQuestions: 2,
        targetRole: 'Frontend Engineer',
        voiceMode: true,
        language: 'en-US'
      }
    };
    const mockResCreate = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.data = data;
        return this;
      }
    };

    await createInterview(mockReqCreate, mockResCreate, (err) => { if (err) throw err; });
    assert(mockResCreate.statusCode === 201, 'Voice interview created with 201 Created');
    const interview = mockResCreate.data.interview;
    assert(interview.voiceMode === true, 'Interview session saved with voiceMode: true');
    assert(interview.questions.length === 2, 'Assigned 2 practice questions');

    const interviewId = interview._id;

    // 5. Test Answer Submission with Voice Metrics & Communication Score Calibration
    console.log('\nTEST 5: Answer Submission with Voice Metrics & Communication Scoring');
    const mockReqSubmit = {
      params: { id: interviewId.toString() },
      user: { _id: testUser._id },
      body: {
        answer: cleanAnswer,
        questionId: interview.questions[0].questionId,
        voiceMetrics: cleanMetrics
      }
    };
    const mockResSubmit = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.data = data;
        return this;
      }
    };

    await submitAnswer(mockReqSubmit, mockResSubmit, (err) => { if (err) throw err; });
    assert(mockResSubmit.statusCode === 200, 'Answer submission returned 200 OK');
    const evaluation = mockResSubmit.data.evaluation;
    assert(Boolean(evaluation), 'Evaluation generated');
    assert(Boolean(evaluation.voiceMetrics), 'voiceMetrics saved to evaluation');
    assert(evaluation.voiceMetrics.wpm === cleanMetrics.wpm, 'Evaluation reflects candidate WPM');
    assert(evaluation.scores && typeof evaluation.scores.communication === 'number', `Communication score assigned: ${evaluation.scores?.communication}/10`);
    assert(evaluation.scores.communication >= 7, 'Optimal pace and zero fillers rewarded in communication score');

    // Clean up test data
    await Interview.findByIdAndDelete(interviewId);
    await User.findByIdAndDelete(testUser._id);

    console.log('\n====================================================');
    console.log('  ALL PHASE 6 VOICE INTERVIEW TESTS PASSED!          ');
    console.log('====================================================\n');
  } catch (err) {
    console.error('\n❌ Test suite failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
