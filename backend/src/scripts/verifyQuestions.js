/**
 * verifyQuestions.js
 * Verification and simulation script for InterviewAce AI Question Bank
 *
 * Checks:
 * 1. Question count per category (assert >= 30 minimum for all 56 categories)
 * 2. Breakdowns per category: difficulty, experience level, interview mode, curated topic chips
 * 3. Integrity checks: missing fields, empty answers, exact duplicates, near-duplicates
 * 4. Simulation: for every category, runs 100 fake sessions of 10 questions each (5,600 sessions total),
 *    confirming zero duplicate questions within any session.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Question from '../models/Question.js';
import { INTERVIEW_CATALOG } from '../config/interviewCatalog.js';
import { retrieveCuratedQuestions, isTooSimilar } from '../services/ai.service.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MIN_QUESTIONS_PER_CATEGORY = 30;
const SIMULATION_SESSIONS_PER_CATEGORY = 100;
const QUESTIONS_PER_SESSION = 10;

async function runVerification() {
  const startTime = Date.now();
  console.log('='.repeat(80));
  console.log('InterviewAce AI - Comprehensive Question Bank Verification & Simulation');
  console.log('='.repeat(80));

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';
  console.log(`Connecting to MongoDB: ${mongoUri}...`);
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected successfully.\n');

  const allActiveQuestions = await Question.find({ isActive: true }).lean();
  console.log(`Total Active Questions in Database: ${allActiveQuestions.length}`);

  const catalogCategories = INTERVIEW_CATALOG.categories.map(c => c.id);
  console.log(`Expected Categories in Catalog: ${catalogCategories.length} (56 target categories)\n`);

  let failuresCount = 0;
  const categoryStats = [];

  // Group questions by normalized category
  const questionsByCategory = new Map();
  for (const catId of catalogCategories) {
    questionsByCategory.set(catId.toLowerCase(), []);
  }

  for (const q of allActiveQuestions) {
    const key = (q.category || '').trim().toLowerCase();
    if (questionsByCategory.has(key)) {
      questionsByCategory.get(key).push(q);
    } else {
      // Find matching catalog category case-insensitively
      const match = catalogCategories.find(c => c.toLowerCase() === key);
      if (match) {
        questionsByCategory.get(match.toLowerCase()).push(q);
      } else {
        console.warn(`[Warning] Question found with unknown category: "${q.category}"`);
      }
    }
  }

  // 1. Category Count & Breakdown Analysis
  console.log('-'.repeat(80));
  console.log('PART 1: Category Coverage & Topic Breakdown');
  console.log('-'.repeat(80));

  for (const catObj of INTERVIEW_CATALOG.categories) {
    const catName = catObj.id;
    const catKey = catName.toLowerCase();
    const questions = questionsByCategory.get(catKey) || [];
    const count = questions.length;

    // Difficulty breakdown
    const diffMap = { Easy: 0, Medium: 0, Hard: 0 };
    // Level breakdown
    const levelMap = { internship: 0, fresher: 0, junior: 0, mid: 0, senior: 0 };
    // Mode breakdown
    const modeMap = {
      'mixed-technical': 0,
      'conceptual-deep-dive': 0,
      'live-coding': 0,
      'sql-database': 0,
      'debugging': 0,
      'system-design': 0,
      'scenario-based': 0,
      'role-specific': 0
    };
    // Topic breakdown
    const topicMap = new Map();
    for (const t of catObj.topics || []) {
      topicMap.set(t.toLowerCase(), 0);
    }

    for (const q of questions) {
      // Difficulty
      if (diffMap[q.difficulty] !== undefined) {
        diffMap[q.difficulty]++;
      } else {
        diffMap['Medium']++;
      }

      // Experience levels
      const levels = Array.isArray(q.experienceLevels) && q.experienceLevels.length > 0
        ? q.experienceLevels
        : (Array.isArray(q.levels) ? q.levels : ['junior', 'mid']);
      for (const lvl of levels) {
        const lKey = (lvl || '').toLowerCase();
        if (levelMap[lKey] !== undefined) levelMap[lKey]++;
      }

      // Interview modes
      const modes = Array.isArray(q.interviewModes) && q.interviewModes.length > 0
        ? q.interviewModes
        : (Array.isArray(q.modes) ? q.modes : ['mixed-technical', 'conceptual-deep-dive']);
      for (const m of modes) {
        const mKey = (m || '').toLowerCase();
        if (modeMap[mKey] !== undefined) modeMap[mKey]++;
      }

      // Topics
      const qTopic = (q.topic || '').trim().toLowerCase();
      let matchedTopic = false;
      for (const [tKey] of topicMap.entries()) {
        if (qTopic.includes(tKey) || tKey.includes(qTopic)) {
          topicMap.set(tKey, topicMap.get(tKey) + 1);
          matchedTopic = true;
          break;
        }
      }
      if (!matchedTopic && qTopic) {
        topicMap.set(qTopic, (topicMap.get(qTopic) || 0) + 1);
      }
    }

    const isBelowMin = count < MIN_QUESTIONS_PER_CATEGORY;
    if (isBelowMin) {
      failuresCount++;
      console.error(`[FAIL] Category "${catName}" has only ${count} questions (minimum is ${MIN_QUESTIONS_PER_CATEGORY})!`);
    }

    categoryStats.push({
      category: catName,
      count,
      easy: diffMap.Easy,
      medium: diffMap.Medium,
      hard: diffMap.Hard,
      topicChipsCovered: Array.from(topicMap.values()).filter(v => v > 0).length,
      totalTopicChips: catObj.topics ? catObj.topics.length : 0,
      status: isBelowMin ? 'FAIL' : 'PASS'
    });
  }

  // Print summary table of categories
  console.table(
    categoryStats.map(s => ({
      Category: s.category,
      Count: s.count,
      'Easy/Med/Hard': `${s.easy}/${s.medium}/${s.hard}`,
      'Topics Covered': `${s.topicChipsCovered}/${s.totalTopicChips}`,
      Status: s.status
    }))
  );

  // 2. Data Integrity Checks: Missing Fields, Empty Answers & Duplicates
  console.log('\n' + '-'.repeat(80));
  console.log('PART 2: Integrity & Deduplication Validation');
  console.log('-'.repeat(80));

  let missingFieldIssues = 0;
  let emptyAnswerIssues = 0;
  let duplicateHashIssues = 0;
  let nearDuplicateIssues = 0;

  for (const catObj of INTERVIEW_CATALOG.categories) {
    const catName = catObj.id;
    const questions = questionsByCategory.get(catName.toLowerCase()) || [];

    const seenHashes = new Map();
    const seenTexts = [];

    for (const q of questions) {
      const qText = (q.questionText || q.question || '').trim();
      const ans = (q.referenceAnswer || q.idealAnswer || '').trim();
      const keyPoints = q.expectedKeyPoints || q.keyPoints || [];
      const hash = q.normalizedHash || q.normalizedText || normalizeQuestionText(qText);

      // Check missing fields
      if (!qText || qText.length < 10) {
        console.error(`[Integrity Error] [${catName}] Question text missing or too short (ID: ${q._id}): "${qText}"`);
        missingFieldIssues++;
      }
      if (!q.category) {
        console.error(`[Integrity Error] Question missing category (ID: ${q._id})`);
        missingFieldIssues++;
      }
      if (!q.topic) {
        console.error(`[Integrity Error] [${catName}] Question missing topic (ID: ${q._id})`);
        missingFieldIssues++;
      }
      if (!ans || ans.length < 15) {
        console.error(`[Integrity Error] [${catName}] Question has empty or invalid answer (ID: ${q._id}): "${qText.slice(0, 40)}"`);
        emptyAnswerIssues++;
      }
      if (!Array.isArray(keyPoints) || keyPoints.length === 0) {
        console.error(`[Integrity Error] [${catName}] Question missing key evaluation points (ID: ${q._id})`);
        missingFieldIssues++;
      }

      // Check exact hash duplicate in same category
      if (seenHashes.has(hash)) {
        console.error(`[Duplicate Error] [${catName}] Exact duplicate normalized hash: "${hash}"`);
        duplicateHashIssues++;
      } else {
        seenHashes.set(hash, q._id);
      }

      // Near duplicate check (Jaccard similarity >= 0.85)
      for (const prev of seenTexts) {
        if (isTooSimilar(prev.text, qText, 0.85)) {
          console.warn(`[Near-Duplicate Warning] [${catName}] Questions highly similar:\n  1: "${prev.text.slice(0, 70)}..."\n  2: "${qText.slice(0, 70)}..."`);
          nearDuplicateIssues++;
          break;
        }
      }
      seenTexts.push({ id: q._id, text: qText });
    }
  }

  console.log(`Missing Fields Count: ${missingFieldIssues}`);
  console.log(`Empty/Invalid Answers Count: ${emptyAnswerIssues}`);
  console.log(`Exact Duplicate Normalized Hashes: ${duplicateHashIssues}`);
  console.log(`Near-Duplicate Warnings: ${nearDuplicateIssues}`);

  if (missingFieldIssues > 0 || emptyAnswerIssues > 0 || duplicateHashIssues > 0) {
    failuresCount += (missingFieldIssues + emptyAnswerIssues + duplicateHashIssues);
  }

  // 3. Multi-Session Repeat Simulation (100 fake sessions per category)
  console.log('\n' + '-'.repeat(80));
  console.log(`PART 3: Multi-Session Zero-Repeat Simulation (${catalogCategories.length} categories × ${SIMULATION_SESSIONS_PER_CATEGORY} sessions = 5,600 sessions)`);
  console.log('-'.repeat(80));

  let totalSimulatedSessions = 0;
  let sessionRepeatFailures = 0;
  const difficulties = ['Easy', 'Medium', 'Hard'];

  for (const catObj of INTERVIEW_CATALOG.categories) {
    const category = catObj.id;
    let categoryRepeatErrors = 0;

    for (let s = 1; s <= SIMULATION_SESSIONS_PER_CATEGORY; s++) {
      totalSimulatedSessions++;
      const sessionDifficulty = difficulties[s % difficulties.length];
      const sessionSeenNorm = new Set();
      const sessionSeenIds = new Set();
      const sessionQuestions = [];

      // Simulate a session generating 10 questions using retrieveCuratedQuestions with progressive selection
      // We retrieve questions in batches, excluding already asked questions in the session
      let remainingCount = QUESTIONS_PER_SESSION;
      let pass = 0;

      while (sessionQuestions.length < QUESTIONS_PER_SESSION && pass < 5) {
        pass++;
        const needed = QUESTIONS_PER_SESSION - sessionQuestions.length;
        const retrieved = await retrieveCuratedQuestions({
          category,
          difficulty: sessionDifficulty,
          count: needed,
          excludeNormalized: Array.from(sessionSeenNorm),
          excludeIds: Array.from(sessionSeenIds),
          interviewMode: 'mixed'
        });

        for (const q of retrieved) {
          const norm = q.normalizedHash || q.normalizedText || normalizeQuestionText(q.questionText);
          const id = (q.questionId || q._id || '').toString();

          // ASSERT: Must never pick the same question twice in one session
          if (sessionSeenNorm.has(norm) || (id && sessionSeenIds.has(id))) {
            categoryRepeatErrors++;
            sessionRepeatFailures++;
            console.error(`[REPEAT DETECTED] Category "${category}" Session #${s}: Question repeated in session! ID: ${id}, Hash: ${norm}`);
            break;
          }

          sessionSeenNorm.add(norm);
          if (id) sessionSeenIds.add(id);
          sessionQuestions.push(q);
          if (sessionQuestions.length >= QUESTIONS_PER_SESSION) break;
        }

        if (retrieved.length === 0) break;
      }

      // Assert zero repeats in session
      const uniqueNorms = new Set(sessionQuestions.map(q => q.normalizedHash || q.normalizedText));
      if (uniqueNorms.size !== sessionQuestions.length) {
        categoryRepeatErrors++;
        sessionRepeatFailures++;
        console.error(`[REPEAT DETECTED] Category "${category}" Session #${s}: sessionQuestions had ${sessionQuestions.length} items but only ${uniqueNorms.size} unique normalized hashes!`);
      }
    }

    if (categoryRepeatErrors === 0) {
      process.stdout.write(`  ✓ ${category.padEnd(30)} : 100/100 sessions passed with 0 repeats\n`);
    } else {
      console.error(`  ✗ ${category.padEnd(30)} : ${categoryRepeatErrors} repeat violations!`);
      failuresCount += categoryRepeatErrors;
    }
  }

  const durationSec = Math.round((Date.now() - startTime) / 1000);
  console.log('\n' + '='.repeat(80));
  console.log('SIMULATION & VERIFICATION FINAL RESULTS');
  console.log('='.repeat(80));
  console.log(`Total Categories Tested: ${catalogCategories.length}`);
  console.log(`Total Questions In DB: ${allActiveQuestions.length}`);
  console.log(`Total Simulated Sessions: ${totalSimulatedSessions}`);
  console.log(`Session Repeat Violations: ${sessionRepeatFailures}`);
  console.log(`Execution Time: ${durationSec} seconds`);

  if (failuresCount === 0) {
    console.log('\n>>> SUCCESS: ALL 56 CATEGORIES SATISFY REQUIREMENTS (>= 30 questions, zero repeats in 5,600 sessions)! <<<\n');
    await mongoose.disconnect();
    process.exit(0);
  } else {
    console.error(`\n>>> FAILURE: Encountered ${failuresCount} errors during verification! <<<\n`);
    await mongoose.disconnect();
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Fatal error during verification:', err);
  mongoose.disconnect().finally(() => process.exit(1));
});
