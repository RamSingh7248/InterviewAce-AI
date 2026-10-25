import { TECHNICAL_SUBJECTS, ALL_CATEGORIES, PROGRAMMING_LANGUAGES } from '../config/interviewCatalog.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import connectDB from '../config/database.js';
import Question from '../models/Question.js';
import mongoose from 'mongoose';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import fs from 'fs';
import path from 'path';

const REQUIRED_SUBJECTS = [
  'DSA',
  'OOP',
  'SQL/DBMS',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering',
  'System Design',
  'Design Patterns',
  'REST APIs',
  'Competitive Programming',
  'Git & Version Control',
  'Testing & QA',
  'Software Architecture',
  'Distributed Systems',
  'Microservices',
  'Web Security',
  'Performance & Optimization',
  'Cloud Computing',
  'DevOps',
  'Docker & Kubernetes',
  'Linux & Shell Scripting',
  'Networking & Infrastructure',
  'Data Engineering',
  'Data Analytics',
  'AI & Machine Learning',
  'Deep Learning',
  'Generative AI & LLMs',
  'Prompt Engineering',
  'Vector DB & RAG',
  'MLOps',
  'Big Data',
  'Cybersecurity',
  'Blockchain',
  'Mobile Development',
  'Accessibility & Performance'
];

async function runPhase2Verification() {
  console.log('\n============================================================');
  console.log('       INTERVIEWACE AI — PHASE 2 VALIDATION SUITE           ');
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

  // 1. Verify all required technical subjects are present in interviewCatalog.js
  console.log('TEST 1: Technical Subjects Definition in interviewCatalog.js');
  const catalogSubjectIds = TECHNICAL_SUBJECTS.map(s => s.id);
  for (const subjectId of REQUIRED_SUBJECTS) {
    const exists = catalogSubjectIds.includes(subjectId);
    assert(exists, `Subject "${subjectId}" is defined in TECHNICAL_SUBJECTS`);
  }

  // 2. Verify all technical subjects have at least 6 rich topics
  console.log('\nTEST 2: Subject Topic Depth and Quality');
  for (const s of TECHNICAL_SUBJECTS) {
    const topicCount = s.topics ? s.topics.length : 0;
    assert(topicCount >= 6, `Subject "${s.name}" (${s.id}) has >= 6 topics (Count: ${topicCount})`);
  }

  // 3. Verify ALL_CATEGORIES unification
  console.log('\nTEST 3: Catalog Unified ALL_CATEGORIES');
  assert(ALL_CATEGORIES.length >= 56, `ALL_CATEGORIES has unified array (Length: ${ALL_CATEGORIES.length})`);
  assert(PROGRAMMING_LANGUAGES.length === 18, `18 Programming Languages registered`);
  assert(TECHNICAL_SUBJECTS.length >= 35, `Major Technical Subjects registered (Count: ${TECHNICAL_SUBJECTS.length})`);

  // 4. Verify frontend InterviewSetup.jsx FALLBACK_SUBJECTS and DEFAULT_TOPICS
  console.log('\nTEST 4: Frontend Fallback Synchronization');
  const clientSetupPath = path.resolve('../client/src/pages/InterviewSetup.jsx');
  const setupFileContent = fs.readFileSync(clientSetupPath, 'utf8');

  for (const subjectId of REQUIRED_SUBJECTS) {
    const inFallback = setupFileContent.includes(`id: '${subjectId}'`) || setupFileContent.includes(`id: "${subjectId}"`);
    assert(inFallback, `Frontend FALLBACK_SUBJECTS contains "${subjectId}"`);

    const inDefaultTopics = setupFileContent.includes(`'${subjectId}':`) || setupFileContent.includes(`${subjectId}:`);
    assert(inDefaultTopics, `Frontend DEFAULT_TOPICS contains fallback topics for "${subjectId}"`);
  }

  // 5. Verify Question Bank Curated Questions for all 38 subjects
  console.log('\nTEST 5: Question Bank Coverage for Technical Subjects');
  const seedCatCounts = {};
  for (const q of SEED_QUESTIONS) {
    seedCatCounts[q.category] = (seedCatCounts[q.category] || 0) + 1;
  }
  for (const subjectId of REQUIRED_SUBJECTS) {
    const count = seedCatCounts[subjectId] || 0;
    assert(count >= 1, `Subject "${subjectId}" has curated rubric-backed questions in seedQuestions.js (Found: ${count})`);
  }

  // 6. Total question bank count
  console.log('\nTEST 6: Question Bank Scalability');
  assert(SEED_QUESTIONS.length >= 90, `Total curated production questions >= 90 (Current: ${SEED_QUESTIONS.length})`);

  // 7. Database synchronization (if Mongo is reachable)
  console.log('\nTEST 7: MongoDB Synchronization (Optional / if reachable)');
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
      assert(upserted === SEED_QUESTIONS.length, `Synced ${upserted} questions into MongoDB`);

      const totalActive = await Question.countDocuments({ isActive: true });
      assert(totalActive >= 90, `Total active questions in DB: ${totalActive}`);
      await mongoose.connection.close();
    } else {
      console.log('  [INFO] MongoDB offline or unreachable; database sync skipped.');
    }
  } catch (err) {
    console.log(`  [INFO] MongoDB connection check skipped (${err.message}).`);
  }

  console.log('\n============================================================');
  console.log(`PHASE 2 SUMMARY: ${passes} PASSED, ${fails} FAILED`);
  console.log('============================================================\n');

  if (fails > 0) {
    process.exit(1);
  }
}

runPhase2Verification();
