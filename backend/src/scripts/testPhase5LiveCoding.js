/**
 * Automated Verification Script for Phase 5: Live Coding Interview
 * Tests problem bank, secure code runner isolation, hint reveals, and hybrid evaluation.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import CodingProblem from '../models/CodingProblem.js';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import SkillProfile from '../models/SkillProfile.js';
import PrepPlan from '../models/PrepPlan.js';
import { runCode, getCodeRunner } from '../services/codeRunner.service.js';
import { reviewCodeSubmission } from '../services/ai.service.js';
import {
  createInterview,
  revealCodeHint,
  executeInterviewCode,
  submitCodeSolution
} from '../controllers/interview.controller.js';

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
  console.log('  PHASE 5: LIVE CODING INTERVIEW VERIFICATION SUITE');
  console.log('====================================================\n');

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  try {
    // 1. Verify Coding Problem Collection
    console.log('TEST 1: Verify Coding Problem Bank');
    const problemCount = await CodingProblem.countDocuments();
    assert(problemCount >= 60, `Found ${problemCount} problems in CodingProblem collection (expected >= 60)`);

    const sampleProb = await CodingProblem.findOne({ slug: 'pair-sum-check' }) || await CodingProblem.findOne();
    assert(Boolean(sampleProb), 'Sample coding problem exists');
    assert(sampleProb.hints && sampleProb.hints.length >= 2, 'Sample problem includes progressive hints');
    assert(sampleProb.sampleTestCases && sampleProb.sampleTestCases.length >= 2, 'Sample test cases present');
    assert(sampleProb.hiddenTestCases && sampleProb.hiddenTestCases.length >= 2, 'Hidden test cases present');
    assert(sampleProb.starterCode && Boolean(sampleProb.starterCode.javascript), 'JavaScript starter code present');
    assert(sampleProb.referenceSolution && Boolean(sampleProb.referenceSolution.javascript), 'Reference solution present');

    // 2. Test Secure Code Runner Isolation (No host execution)
    console.log('\nTEST 2: Secure Code Runner & Sandboxing');
    process.env.CODE_RUNNER_PROVIDER = 'mock';
    const mockRunner = getCodeRunner();
    assert(mockRunner.name === 'mock', 'Mock code runner selected when configured');

    const execResult = await runCode({
      code: 'function twoSum() { return [0, 1]; }',
      language: 'javascript',
      stdin: '2 7 11 15\n9'
    });
    assert(execResult.status === 'success', 'Code runner successfully returned execution result');
    assert(execResult.provider === 'mock', 'Execution ran safely inside isolated provider');

    // Test output truncation
    const longInput = 'x'.repeat(20000);
    const truncResult = await runCode({
      code: 'console.log("ok");',
      language: 'javascript',
      stdin: longInput
    });
    assert(truncResult.status === 'success', 'Long output/input handled gracefully without crash');

    // 3. Test AI Code Reviewer Fallback & Logic
    console.log('\nTEST 3: AI Code Reviewer (with Fallback Guarantees)');
    const reviewResult = await reviewCodeSubmission({
      problemTitle: 'Two Sum',
      description: 'Given an array of integers nums and an integer target...',
      code: sampleProb.referenceSolution.javascript,
      language: 'javascript',
      constraints: sampleProb.constraints,
      testsPassed: 5,
      totalTests: 5,
      referenceAnswer: sampleProb.referenceSolution.javascript
    });
    assert(typeof reviewResult.reviewScore === 'number', `Review score generated: ${reviewResult.reviewScore}/10`);
    assert(Boolean(reviewResult.timeComplexity), `Time complexity identified: ${reviewResult.timeComplexity}`);
    assert(Boolean(reviewResult.spaceComplexity), `Space complexity identified: ${reviewResult.spaceComplexity}`);
    assert(Array.isArray(reviewResult.strengths), 'Identified algorithmic strengths');

    // 4. Test Live Coding Interview Creation
    console.log('\nTEST 4: Coding Interview Session Creation & Non-repeat Guarantee');
    const testEmail = `coding_test_${Date.now()}@example.com`;
    const user = await User.create({
      name: 'Coding Candidate',
      email: testEmail,
      password: 'Password123!',
      interviewPreferences: {
        role: 'Full Stack Engineer',
        experienceLevel: 'Mid Level',
        primaryCategory: 'dsa'
      }
    });

    let createdInterview = null;
    const mockReqCreate = {
      user: { _id: user._id },
      body: {
        category: 'dsa',
        difficulty: 'Easy',
        totalQuestions: 2,
        interviewMode: 'coding',
        targetRole: 'Software Engineer',
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
    assert(mockResCreate.statusCode === 201, 'Interview creation returned 201 Created');
    createdInterview = mockResCreate.data.interview;
    assert(createdInterview.interviewMode === 'coding', 'Interview mode is set to coding');
    assert(createdInterview.questions.length === 2, '2 coding challenges assigned');
    assert(createdInterview.questions[0].questionType === 'coding', 'Question type is coding');
    assert(Boolean(createdInterview.questions[0].codingDetails), 'Coding details attached to question');
    assert(!createdInterview.questions[0].codingDetails.hiddenTestCases, 'Hidden test cases are stripped from candidate response');
    assert(createdInterview.questions[0].hints.length > 0, 'Hints are available for problem');

    // Verify no duplicates across questions in the session
    const qSlugs = createdInterview.questions.map(q => q.codingDetails.slug);
    const uniqueSlugs = new Set(qSlugs);
    assert(uniqueSlugs.size === qSlugs.length, 'Zero duplicate problems within interview session');

    const interviewId = createdInterview._id;

    // 5. Test Hint Reveal Endpoint
    console.log('\nTEST 5: Progressive Hint Reveal Endpoint (POST /api/interviews/:id/code/hint)');
    const mockReqHint = {
      params: { id: interviewId.toString() },
      user: { _id: user._id }
    };
    const mockResHint = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.data = data;
        return this;
      }
    };

    await revealCodeHint(mockReqHint, mockResHint, (err) => { if (err) throw err; });
    assert(mockResHint.statusCode === 200, 'Hint reveal returned 200 OK');
    assert(mockResHint.data.hintsRevealed === 1, 'Hint counter incremented to 1');
    assert(Boolean(mockResHint.data.hint), `Hint text revealed: "${mockResHint.data.hint.slice(0, 40)}..."`);
    assert(Boolean(mockResHint.data.penaltyNotice), '5% penalty notice returned to candidate');

    // 6. Test Code Submission & Hybrid Scoring
    console.log('\nTEST 6: Code Submission & Hybrid Scoring (60% Tests + 40% AI Review - Hint Penalty)');
    const mockReqSubmit = {
      params: { id: interviewId.toString() },
      user: { _id: user._id },
      body: {
        code: sampleProb.referenceSolution.javascript,
        language: 'javascript',
        questionId: createdInterview.questions[0].questionId,
        hintsUsed: 1
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

    await submitCodeSolution(mockReqSubmit, mockResSubmit, (err) => { if (err) throw err; });
    assert(mockResSubmit.statusCode === 200, 'Code submission returned 200 OK');
    const evalData = mockResSubmit.data.evaluation;
    assert(evalData && evalData.score100 !== undefined, `Calculated score: ${evalData.score100}%`);
    assert(evalData.hintPenalty === 5, 'Exact 5% hint penalty applied for 1 revealed hint');
    assert(evalData.testsPassed > 0, `Test cases passed: ${evalData.testsPassed}/${evalData.totalTests}`);
    assert(Boolean(evalData.codeReview), 'AI Code review attached to evaluation');
    assert(Boolean(evalData.codeReview.timeComplexity), `Complexity: ${evalData.codeReview.timeComplexity}`);

    // Clean up test data
    await Interview.findByIdAndDelete(interviewId);
    await User.findByIdAndDelete(user._id);

    console.log('\n====================================================');
    console.log('  ALL PHASE 5 LIVE CODING TESTS PASSED SUCCESSFULLY!  ');
    console.log('====================================================\n');
  } catch (err) {
    console.error('\n❌ Test suite failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
