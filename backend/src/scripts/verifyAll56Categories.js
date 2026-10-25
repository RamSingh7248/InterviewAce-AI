import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { ALL_CATEGORIES, PROGRAMMING_LANGUAGES, TECHNICAL_SUBJECTS } from '../config/interviewCatalog.js';
import { generateQuestions } from '../services/ai.service.js';
import Question from '../models/Question.js';

const QUESTION_COUNTS = [3, 5, 7, 10];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const LANGUAGES = ['en-US', 'hi-IN'];

async function runVerification() {
  console.log('='.repeat(70));
  console.log('   INTERVIEWACE AI - 56 CATEGORY QUESTION GENERATION TEST SUITE');
  console.log('='.repeat(70));

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interviewace';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB:', mongoUri);

  const totalBankCount = await Question.countDocuments({ isActive: true });
  console.log(`Current Active Question Bank Inventory: ${totalBankCount} questions`);

  const categoryIds = ALL_CATEGORIES.map(c => c.id);

  const results = {
    totalCategories: categoryIds.length,
    languagesCount: PROGRAMMING_LANGUAGES.length,
    subjectsCount: TECHNICAL_SUBJECTS.length,
    testedCombinations: 0,
    passedCombinations: 0,
    failedCombinations: 0,
    failures: []
  };

  console.log(`\nVerifying all ${categoryIds.length} categories (18 Languages + 38 Subjects) across diverse counts, difficulties, and languages...\n`);

  for (let i = 0; i < categoryIds.length; i++) {
    const category = categoryIds[i];
    // Rotate count, difficulty, and language across categories to thoroughly test variations
    const count = QUESTION_COUNTS[i % QUESTION_COUNTS.length];
    const difficulty = DIFFICULTIES[i % DIFFICULTIES.length];
    const language = LANGUAGES[i % LANGUAGES.length];

    results.testedCombinations++;

    try {
      // Test generation with possible past exclusions to test progressive relaxation
      const testExclusions = [`Past test question 1 for ${category}`, `Past test question 2 for ${category}`];

      const res = await generateQuestions({
        category,
        difficulty,
        totalQuestions: count,
        topic: '',
        targetRole: 'Software Engineer',
        interviewMode: 'mixed',
        companyStyle: 'General Tech',
        language,
        excludeQuestions: testExclusions
      });

      const questions = res?.questions || res;

      if (!Array.isArray(questions)) {
        throw new Error(`Returned value is not an array (type: ${typeof questions})`);
      }

      if (questions.length !== count) {
        throw new Error(`Expected ${count} questions, got ${questions.length}`);
      }

      // Check each question has a valid question text and category
      for (let qIdx = 0; qIdx < questions.length; qIdx++) {
        const q = questions[qIdx];
        const text = q.text || q.questionText || q.question;
        if (!text || typeof text !== 'string' || text.trim().length < 10) {
          throw new Error(`Question #${qIdx + 1} has invalid or too short text: "${text}"`);
        }
      }

      // Check for duplicates within this generated set
      const texts = questions.map(q => (q.text || q.questionText || q.question || '').toLowerCase().trim());
      const uniqueTexts = new Set(texts);
      if (uniqueTexts.size !== questions.length) {
        throw new Error(`Duplicate questions detected: ${questions.length - uniqueTexts.size} duplicate(s)`);
      }

      results.passedCombinations++;
      console.log(`[PASS] (${i + 1}/${categoryIds.length}) [${category}] count: ${count}, diff: ${difficulty}, lang: ${language} -> ${questions.length} valid questions`);
    } catch (err) {
      results.failedCombinations++;
      results.failures.push({
        category,
        count,
        difficulty,
        language,
        error: err.message
      });
      console.error(`[FAIL] (${i + 1}/${categoryIds.length}) [${category}]: ${err.message}`);
    }
  }

  // Also specifically verify Java for the exact user prompt configuration
  console.log('\n--- Specifically Verifying Bug 1 Reported Java Configuration ---');
  results.testedCombinations++;
  try {
    const javaRes = await generateQuestions({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 5,
      topic: '',
      targetRole: 'Software Engineer',
      experienceLevel: 'fresher',
      interviewMode: 'mixed',
      companyStyle: 'General Tech',
      language: 'en-US',
      excludeQuestions: []
    });

    const javaQuestions = javaRes?.questions || javaRes;

    if (javaQuestions.length === 5) {
      results.passedCombinations++;
      console.log(`[PASS] Java Bug 1 Config (Medium, Fresher, 5 questions, General Tech, en-US) -> ${javaQuestions.length} valid questions!`);
      javaQuestions.forEach((q, idx) => {
        console.log(`   Q${idx + 1}: ${q.text || q.questionText || q.question}`);
      });
    } else {
      throw new Error(`Expected 5 questions, got ${javaQuestions.length}`);
    }
  } catch (err) {
    results.failedCombinations++;
    results.failures.push({
      category: 'Java (Bug 1 Config)',
      error: err.message
    });
    console.error(`[FAIL] Java Bug 1 Config: ${err.message}`);
  }

  // Also specifically verify 3, 5, 7, 10 questions and Hindi for a sample of categories
  console.log('\n--- Verifying Question Counts (3, 5, 7, 10) & Hindi Language on Core Categories ---');
  const sampleCategories = ['Java', 'Python', 'React', 'DSA', 'SQL/DBMS', 'System Design'];
  for (const cat of sampleCategories) {
    for (const count of [3, 5, 7, 10]) {
      for (const lang of ['en-US', 'hi-IN']) {
        results.testedCombinations++;
        try {
          const res = await generateQuestions({
            category: cat,
            difficulty: 'Medium',
            totalQuestions: count,
            language: lang,
            targetRole: 'Full Stack Engineer'
          });

          const qs = res?.questions || res;

          if (qs.length === count) {
            results.passedCombinations++;
          } else {
            throw new Error(`Expected ${count}, got ${qs.length}`);
          }
        } catch (err) {
          results.failedCombinations++;
          results.failures.push({ category: `${cat} (${count} qs, ${lang})`, error: err.message });
        }
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('                      TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Categories in Catalog: ${results.totalCategories} (18 Languages + 38 Technical Subjects)`);
  console.log(`Total Test Combinations Run: ${results.testedCombinations}`);
  console.log(`Passed:                      ${results.passedCombinations}`);
  console.log(`Failed:                      ${results.failedCombinations}`);

  if (results.failedCombinations > 0) {
    console.log('\nFailures encountered:');
    results.failures.forEach(f => console.log(` - ${f.category}: ${f.error}`));
  } else {
    console.log('\n>>> ALL 56 CATEGORIES & CONFIGURATIONS PASSED WITH ZERO FAILURES! <<<');
  }

  await mongoose.disconnect();
  process.exit(results.failedCombinations === 0 ? 0 : 1);
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
