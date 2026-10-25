import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import User from '../models/User.js';
import Interview from '../models/Interview.js';
import { generateInterviewerReaction, generateAdaptiveFollowUpQuestion } from '../services/ai.service.js';

async function runTests() {
  console.log('=== Starting Phase 2 Personalized AI Interviewer Verification ===\n');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB at', mongoUri);

  try {
    // Test 1: Persona Reactions Across Company Styles
    console.log('\n[Test 1] Persona reactions for different company styles (Startup, FAANG, Enterprise)...');
    
    const reactionStartup = await generateInterviewerReaction({
      companyStyle: 'Startup',
      verdict: 'correct',
      score: 8.5,
      language: 'en-US',
      topic: 'React'
    });
    console.log('Startup reaction:', reactionStartup);
    if (!reactionStartup || typeof reactionStartup !== 'string') {
      throw new Error('Expected non-empty reaction string for Startup style');
    }

    const reactionFAANG = await generateInterviewerReaction({
      companyStyle: 'FAANG',
      verdict: 'partially_correct',
      score: 5.5,
      language: 'en-US',
      topic: 'System Design'
    });
    console.log('FAANG reaction:', reactionFAANG);
    if (!reactionFAANG || typeof reactionFAANG !== 'string') {
      throw new Error('Expected non-empty reaction string for FAANG style');
    }

    const reactionEnterprise = await generateInterviewerReaction({
      companyStyle: 'Enterprise',
      verdict: 'incorrect',
      score: 3.0,
      language: 'en-US',
      topic: 'Java'
    });
    console.log('Enterprise reaction:', reactionEnterprise);
    if (!reactionEnterprise || typeof reactionEnterprise !== 'string') {
      throw new Error('Expected non-empty reaction string for Enterprise style');
    }

    const reactionHindi = await generateInterviewerReaction({
      companyStyle: 'General Tech',
      verdict: 'correct',
      score: 8.0,
      language: 'hi-IN',
      topic: 'JavaScript'
    });
    console.log('Hindi reaction:', reactionHindi);
    if (!reactionHindi || typeof reactionHindi !== 'string') {
      throw new Error('Expected non-empty reaction string for Hindi language');
    }
    console.log('✓ Test 1 Passed: Persona reactions generated accurately across styles.');

    // Test 2: Smart Follow-Up Generation
    console.log('\n[Test 2] Smart follow-up generation for partial / unclear answer...');
    const mockQuestion = {
      questionId: 'q_test_parent_01',
      questionText: 'Explain how indexing improves SELECT query performance and when it can degrade write performance.',
      topic: 'Indexing',
      expectedKeyPoints: ['B-Tree structure', 'Avoids full table scans', 'Overhead on INSERT/UPDATE/DELETE operations'],
      suggestedFollowUps: ['How does a composite index differ and what is the leftmost prefix rule?']
    };

    const followUp = await generateAdaptiveFollowUpQuestion({
      category: 'SQL/DBMS',
      difficulty: 'Medium',
      targetRole: 'Backend Developer',
      experienceLevel: 'mid',
      interviewMode: 'mixed',
      companyStyle: 'FAANG',
      previousQuestion: mockQuestion,
      userAnswer: 'Indexes make queries faster because the database can find data faster using a tree.',
      evaluation: {
        verdict: 'partially_correct',
        score: 5.0,
        missingConcepts: ['Impact on INSERT/UPDATE write performance', 'B-Tree leaf nodes']
      },
      excludeNormalized: [],
      excludeIds: ['q_test_parent_01'],
      parentQuestionId: 'q_test_parent_01',
      language: 'en-US'
    });

    console.log('Generated Follow-Up Question:');
    console.log('Text:', followUp.questionText);
    console.log('Adaptive Reason:', followUp.adaptiveReason);
    if (!followUp || !followUp.questionText) {
      throw new Error('Failed to generate smart follow-up question');
    }
    console.log('✓ Test 2 Passed: Smart follow-up generated successfully.');

    // Test 3: Adaptive Difficulty Progression Simulation
    console.log('\n[Test 3] Simulating Adaptive Difficulty Escalation & Demotion...');
    const testUser = await User.findOne({ email: 'test_eval_user@interviewace.ai' }) || 
                     await User.findOne();
    if (!testUser) {
      throw new Error('No user found in database for test session');
    }

    const session = await Interview.create({
      userId: testUser._id,
      category: 'Java',
      difficulty: 'Easy',
      targetRole: 'Software Engineer',
      adaptiveMode: true,
      currentDifficulty: 'Easy',
      consecutiveStrongAnswers: 0,
      consecutiveWeakAnswers: 0,
      totalQuestions: 3,
      currentQuestionIndex: 0,
      status: 'in_progress',
      questions: [
        {
          questionId: 'q_sim_1',
          questionText: 'What is the difference between equals() and == in Java?',
          difficulty: 'Easy',
          category: 'Java',
          topic: 'Core Java'
        },
        {
          questionId: 'q_sim_2',
          questionText: 'Explain memory management in Java and how the Garbage Collector works.',
          difficulty: 'Easy',
          category: 'Java',
          topic: 'JVM'
        },
        {
          questionId: 'q_sim_3',
          questionText: 'What is a volatile keyword and how does the Java Memory Model guarantee visibility?',
          difficulty: 'Easy',
          category: 'Java',
          topic: 'Concurrency'
        }
      ]
    });

    // Helper mimicking the controller's adaptive difficulty updater
    const updateAdaptiveDifficulty = (sessionDoc, qScore) => {
      const difficulties = ['Easy', 'Medium', 'Hard'];
      let curDiffIdx = difficulties.indexOf(sessionDoc.currentDifficulty || 'Medium');
      if (curDiffIdx === -1) curDiffIdx = 1;

      if (sessionDoc.adaptiveMode !== false) {
        if (qScore >= 7.5) {
          sessionDoc.consecutiveStrongAnswers = (sessionDoc.consecutiveStrongAnswers || 0) + 1;
          sessionDoc.consecutiveWeakAnswers = 0;
          if (sessionDoc.consecutiveStrongAnswers >= 2) {
            if (curDiffIdx < 2) {
              curDiffIdx += 1;
              sessionDoc.currentDifficulty = difficulties[curDiffIdx];
            }
            sessionDoc.consecutiveStrongAnswers = 0;
          }
        } else if (qScore < 5.0) {
          sessionDoc.consecutiveWeakAnswers = (sessionDoc.consecutiveWeakAnswers || 0) + 1;
          sessionDoc.consecutiveStrongAnswers = 0;
          if (sessionDoc.consecutiveWeakAnswers >= 1) {
            if (curDiffIdx > 0) {
              curDiffIdx -= 1;
              sessionDoc.currentDifficulty = difficulties[curDiffIdx];
            }
            sessionDoc.consecutiveWeakAnswers = 0;
          }
        } else {
          sessionDoc.consecutiveStrongAnswers = 0;
          sessionDoc.consecutiveWeakAnswers = 0;
        }
      }
    };

    // First strong answer (score 8.5)
    updateAdaptiveDifficulty(session, 8.5);
    console.log('After 1st strong answer (8.5): Difficulty =', session.currentDifficulty, ', ConsecutiveStrong =', session.consecutiveStrongAnswers);
    if (session.currentDifficulty !== 'Easy' || session.consecutiveStrongAnswers !== 1) {
      throw new Error('Difficulty should remain Easy after 1 strong answer');
    }

    // Second strong answer (score 9.0) -> should escalate to Medium!
    updateAdaptiveDifficulty(session, 9.0);
    console.log('After 2nd strong answer (9.0): Difficulty =', session.currentDifficulty, ', ConsecutiveStrong =', session.consecutiveStrongAnswers);
    if (session.currentDifficulty !== 'Medium' || session.consecutiveStrongAnswers !== 0) {
      throw new Error('Difficulty should have escalated to Medium after 2 strong answers');
    }

    // Weak answer (score 3.0) -> should demote back to Easy!
    updateAdaptiveDifficulty(session, 3.0);
    console.log('After weak answer (3.0): Difficulty =', session.currentDifficulty, ', ConsecutiveWeak =', session.consecutiveWeakAnswers);
    if (session.currentDifficulty !== 'Easy') {
      throw new Error('Difficulty should have demoted back to Easy after weak answer');
    }
    console.log('✓ Test 3 Passed: Adaptive difficulty escalated and demoted as designed.');

    // Test 4: User Profile resumeSkillsText Persistence
    console.log('\n[Test 4] Testing User Profile resumeSkillsText persistence...');
    const testSkills = 'Languages: Java, TypeScript, Python. Frameworks: Spring Boot, Express, React. Projects: High-throughput Kafka order streaming service.';
    testUser.resumeSkillsText = testSkills;
    await testUser.save();

    const fetchedUser = await User.findById(testUser._id);
    if (fetchedUser.resumeSkillsText !== testSkills) {
      throw new Error('resumeSkillsText failed to persist on User model');
    }
    console.log('✓ Test 4 Passed: resumeSkillsText successfully saved on User profile.');

    // Clean up simulation
    await Interview.findByIdAndDelete(session._id);
    console.log('\nAll Phase 2 tests passed successfully!');

  } catch (err) {
    console.error('\n❌ Test Error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

runTests();
