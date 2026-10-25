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
import SkillProfile from '../models/SkillProfile.js';
import { 
  calculateEMA, 
  calculateLast5Trend, 
  getMasteryLabel, 
  calculateRoleReadiness,
  updateUserSkillProfile 
} from '../services/skillGap.service.js';
import { getRequirementsForRole } from '../data/roleRequirements.js';

async function runTests() {
  console.log('=== Starting Phase 3 Skill Gap Analyzer Verification ===\n');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB at', mongoUri);

  try {
    // Test 1: Deterministic EMA Calculation
    console.log('\n[Test 1] Deterministic EMA Calculation...');
    const sampleScores = [50, 60, 70, 80, 90];
    // Step-by-step:
    // ema0 = 50
    // ema1 = 0.3 * 60 + 0.7 * 50 = 18 + 35 = 53
    // ema2 = 0.3 * 70 + 0.7 * 53 = 21 + 37.1 = 58.1
    // ema3 = 0.3 * 80 + 0.7 * 58.1 = 24 + 40.67 = 64.67
    // ema4 = 0.3 * 90 + 0.7 * 64.67 = 27 + 45.269 = 72.269 -> 72.3
    const computedEMA = calculateEMA(sampleScores);
    console.log('Scores:', sampleScores, '-> Computed EMA:', computedEMA);
    if (Math.abs(computedEMA - 72.3) > 0.2) {
      throw new Error(`Expected EMA ~72.3, got ${computedEMA}`);
    }
    console.log('✓ Test 1 Passed: EMA calculated accurately with alpha = 0.3.');

    // Test 2: Last-5 Trend & Mastery Labels
    console.log('\n[Test 2] Trend and Mastery Classification...');
    const improvingScores = [40, 45, 60, 75, 85];
    const trendImproving = calculateLast5Trend(improvingScores);
    console.log('Scores:', improvingScores, '-> Trend:', trendImproving);
    if (trendImproving !== 'improving') {
      throw new Error(`Expected 'improving' trend, got ${trendImproving}`);
    }

    const decliningScores = [85, 80, 75, 60, 40];
    const trendDeclining = calculateLast5Trend(decliningScores);
    console.log('Scores:', decliningScores, '-> Trend:', trendDeclining);
    if (trendDeclining !== 'declining') {
      throw new Error(`Expected 'declining' trend, got ${trendDeclining}`);
    }

    if (getMasteryLabel(45) !== 'Beginner' || 
        getMasteryLabel(65) !== 'Developing' || 
        getMasteryLabel(75) !== 'Proficient' || 
        getMasteryLabel(90) !== 'Strong') {
      throw new Error('Mastery label classification threshold failure');
    }
    console.log('✓ Test 2 Passed: Trend and Mastery Labels classified properly.');

    // Test 3: Role Requirements & Readiness % Calculation
    console.log('\n[Test 3] Target Role Readiness % Calculation...');
    const sdeReqs = getRequirementsForRole('Software Development Engineer (SDE-1)');
    console.log(`Role: ${sdeReqs.name}, required skills count: ${sdeReqs.skills.length}`);
    if (!sdeReqs.skills || sdeReqs.skills.length === 0) {
      throw new Error('SDE-1 role requirements missing skills catalog');
    }

    const mockTopics = [
      { category: 'DSA', topic: 'Arrays, Strings & Two Pointers', emaScore: 90, attempts: 4 },
      { category: 'DSA', topic: 'Hashing & Frequency Counting', emaScore: 85, attempts: 3 },
      { category: 'Java', topic: 'Core Java & JVM Internals', emaScore: 80, attempts: 3 }
    ];
    const mockCategories = [
      { category: 'DSA', emaScore: 88, attempts: 7 },
      { category: 'Java', emaScore: 80, attempts: 3 },
      { category: 'SQL/DBMS', emaScore: 70, attempts: 2 }
    ];

    const readinessResult = calculateRoleReadiness('Software Development Engineer (SDE-1)', mockTopics, mockCategories);
    console.log('Readiness % computed:', readinessResult.readinessPercentage, '%');
    if (readinessResult.readinessPercentage <= 0 || readinessResult.readinessPercentage > 100) {
      throw new Error('Invalid readiness percentage calculated');
    }
    console.log('✓ Test 3 Passed: Role readiness % computed deterministically.');

    // Test 4: End-to-End SkillProfile MongoDB Persistence
    console.log('\n[Test 4] End-to-End SkillProfile Persistence for Test User...');
    const testUser = await User.findOne({ email: 'test_eval_user@interviewace.ai' }) || 
                     await User.findOne();
    if (!testUser) {
      throw new Error('No test user found in database');
    }

    const profileData = await updateUserSkillProfile(testUser._id, 'Software Development Engineer (SDE-1)');
    console.log('Updated Profile for user:', testUser.email);
    console.log('Overall Score:', profileData.overallScore);
    console.log('Role Readiness:', profileData.readinessPercentage, '%');
    console.log('Evaluated Categories count:', profileData.categories.length);
    console.log('Evaluated Topics count:', profileData.topics.length);
    console.log('Narrative Summary:', profileData.narrativeSummary);

    const savedDoc = await SkillProfile.findOne({ userId: testUser._id });
    if (!savedDoc) {
      throw new Error('SkillProfile document was not saved in MongoDB');
    }
    if (savedDoc.readinessPercentage !== profileData.readinessPercentage) {
      throw new Error('Saved readiness does not match computed readiness');
    }
    console.log('✓ Test 4 Passed: SkillProfile persisted and retrieved successfully from MongoDB.');

    console.log('\nAll Phase 3 tests passed successfully!');

  } catch (err) {
    console.error('\n❌ Test Error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

runTests();
