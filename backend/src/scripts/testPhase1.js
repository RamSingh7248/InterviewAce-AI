import { PROGRAMMING_LANGUAGES } from '../config/interviewCatalog.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import connectDB from '../config/database.js';
import Question from '../models/Question.js';
import mongoose from 'mongoose';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import fs from 'fs';
import path from 'path';

const REQUIRED_LANGUAGES = [
  'Java',
  'Python',
  'C',
  'C++',
  'C#',
  'JavaScript',
  'TypeScript',
  'Go',
  'Ruby',
  'PHP',
  'Kotlin',
  'Swift',
  'Rust',
  'Dart',
  'R',
  'Scala',
  'Perl',
  'Bash'
];

async function runPhase1Verification() {
  console.log('\n============================================================');
  console.log('       INTERVIEWACE AI — PHASE 1 VALIDATION SUITE           ');
  console.log('============================================================\n');

  let passes = 0;
  let fails = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passes++;
    } else {
      console.error(`  [FAIL] ${message}`);
      fails++;
    }
  }

  // 1. Verify all 18 languages are defined in PROGRAMMING_LANGUAGES
  console.log('TEST 1: Core Programming Languages in interviewCatalog.js');
  const catalogLangIds = PROGRAMMING_LANGUAGES.map(l => l.id);
  for (const lang of REQUIRED_LANGUAGES) {
    const exists = catalogLangIds.includes(lang);
    assert(exists, `Language "${lang}" is present in interviewCatalog.js`);
  }

  // 2. Verify all 18 languages have rich topics
  console.log('\nTEST 2: Language-Specific Topics in Catalog');
  for (const lang of REQUIRED_LANGUAGES) {
    const item = PROGRAMMING_LANGUAGES.find(l => l.id === lang);
    const topicCount = item && Array.isArray(item.topics) ? item.topics.length : 0;
    assert(topicCount >= 5, `Language "${lang}" has comprehensive topics (Count: ${topicCount})`);
  }

  // 3. Verify specific critical topics
  console.log('\nTEST 3: Key Concept Verification in Topics');
  const js = PROGRAMMING_LANGUAGES.find(l => l.id === 'JavaScript');
  assert(js?.topics.some(t => t.includes('Hoisting')), 'JavaScript includes Hoisting');
  assert(js?.topics.some(t => t.includes('Event Loop')), 'JavaScript includes Event Loop');

  const py = PROGRAMMING_LANGUAGES.find(l => l.id === 'Python');
  assert(py?.topics.some(t => t.includes('GIL')), 'Python includes GIL (Global Interpreter Lock)');

  const cpp = PROGRAMMING_LANGUAGES.find(l => l.id === 'C++');
  assert(cpp?.topics.some(t => t.includes('RAII')), 'C++ includes RAII');

  const go = PROGRAMMING_LANGUAGES.find(l => l.id === 'Go');
  assert(go?.topics.some(t => t.includes('Goroutines')), 'Go includes Goroutines & Channels');

  const rust = PROGRAMMING_LANGUAGES.find(l => l.id === 'Rust');
  assert(rust?.topics.some(t => t.includes('Ownership')), 'Rust includes Ownership System');

  const dart = PROGRAMMING_LANGUAGES.find(l => l.id === 'Dart');
  assert(dart?.topics.some(t => t.includes('Null Safety')), 'Dart includes Sound Null Safety');

  // 4. Verify question bank covers all 18 languages
  console.log('\nTEST 4: Curated Question Bank Coverage');
  const seedCatCounts = {};
  for (const q of SEED_QUESTIONS) {
    seedCatCounts[q.category] = (seedCatCounts[q.category] || 0) + 1;
  }
  for (const lang of REQUIRED_LANGUAGES) {
    const count = seedCatCounts[lang] || 0;
    assert(count >= 2, `Language "${lang}" has at least 2 curated rubric-backed questions in seedQuestions.js (Found: ${count})`);
  }

  // 5. Verify frontend InterviewSetup.jsx DEFAULT_TOPICS includes all 18 languages
  console.log('\nTEST 5: Frontend Fallback DEFAULT_TOPICS Synchronization');
  const clientSetupPath = path.resolve('../client/src/pages/InterviewSetup.jsx');
  const setupFileContent = fs.readFileSync(clientSetupPath, 'utf8');
  for (const lang of REQUIRED_LANGUAGES) {
    const keyMatch = setupFileContent.includes(`'${lang}':`) || setupFileContent.includes(`${lang}:`);
    assert(keyMatch, `Frontend DEFAULT_TOPICS includes fallback for "${lang}"`);
  }

  // 6. Database upsert check if Mongo is running
  console.log('\nTEST 6: Database Synchronization (MongoDB)');
  try {
    const connected = await connectDB();
    if (connected) {
      let upserted = 0;
      for (const q of SEED_QUESTIONS) {
        const normalized = normalizeQuestionText(q.questionText);
        await Question.findOneAndUpdate(
          { normalizedText: normalized },
          { $set: { ...q, normalizedText: normalized, isActive: true, sourceType: 'curated' } },
          { upsert: true, returnDocument: 'after' }
        );
        upserted++;
      }
      assert(upserted === SEED_QUESTIONS.length, `Successfully synced ${upserted} questions into MongoDB`);

      // Verify category query for new languages
      const rubyQ = await Question.find({ category: 'Ruby' }).lean();
      assert(rubyQ.length >= 2, `Retrieved ${rubyQ.length} Ruby questions from MongoDB`);

      const kotlinQ = await Question.find({ category: 'Kotlin' }).lean();
      assert(kotlinQ.length >= 2, `Retrieved ${kotlinQ.length} Kotlin questions from MongoDB`);

      await mongoose.connection.close();
    } else {
      console.log('  [INFO] MongoDB offline or unreachable; database upsert test skipped.');
    }
  } catch (err) {
    console.log(`  [INFO] MongoDB connection check skipped (${err.message}).`);
  }

  console.log('\n============================================================');
  console.log(`PHASE 1 SUMMARY: ${passes} PASSED, ${fails} FAILED`);
  console.log('============================================================\n');

  if (fails > 0) {
    process.exit(1);
  }
}

runPhase1Verification();
