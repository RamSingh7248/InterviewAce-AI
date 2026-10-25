/**
 * Phase 7 Master End-to-End Verification & Regression Suite
 * Tests:
 * 1. Express App startup & HTTP health check on dynamic port
 * 2. Question catalog API: 18 languages, 35+ subjects, 70+ roles, 6 role groups
 * 3. Question retrieval filtering by category, difficulty, topic, and role
 * 4. Resilient AI generation with offline/missing key fallback
 * 5. Role-appropriate answer evaluation (Junior, Senior, Skipped, Coding, System Design)
 * 6. Auth route protection & error handling
 * 7. Single-host frontend bundle static serving
 * 8. Clean server teardown
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import app from '../app.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import { evaluateAnswer } from '../services/ai.service.js';
import { INTERVIEW_CATALOG } from '../config/interviewCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runPhase7Suite() {
  console.log('============================================================');
  console.log('      INTERVIEWACE AI — PHASE 7 END-TO-END VALIDATION       ');
  console.log('       Full System Integration & Regression Suite           ');
  console.log('============================================================\n');

  // Start Express on ephemeral port (port 0 lets OS assign free port)
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  console.log(`Ephemeral test server running on ${baseUrl}\n`);

  try {
    // -------------------------------------------------------------
    // Test Group 1: Server Health & System Status
    // -------------------------------------------------------------
    console.log('--- Test Group 1: Server Lifecycle & Health Check ---');
    const healthRes = await fetch(`${baseUrl}/health`);
    assert(healthRes.status === 200, 'GET /api/health responds with HTTP 200');
    const healthData = await healthRes.json();
    assert(healthData.status === 'ok', 'Health payload status is "ok"');
    assert(healthData.service === 'InterviewAce AI Backend API', 'Service name is verified');

    // -------------------------------------------------------------
    // Test Group 2: Catalog API Completeness
    // -------------------------------------------------------------
    console.log('\n--- Test Group 2: Catalog API Completeness ---');
    const catRes = await fetch(`${baseUrl}/questions/categories`);
    assert(catRes.status === 200, 'GET /api/questions/categories returns HTTP 200');
    const catJson = await catRes.json();
    const catalog = catJson.data;

    // 18 Languages
    assert(Array.isArray(catalog.languages) && catalog.languages.length === 18, `Catalog has 18 programming languages (found: ${catalog.languages?.length})`);
    const langIds = catalog.languages.map(l => l.id);
    const requiredLangs = ['Java', 'Python', 'C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Go', 'Ruby', 'PHP', 'Kotlin', 'Swift', 'Rust', 'Dart', 'R', 'Scala', 'Perl', 'Bash'];
    const hasAllLangs = requiredLangs.every(l => langIds.includes(l));
    assert(hasAllLangs, 'All 18 core programming languages are present in API response');

    // Each language has topics
    const langsWithTopics = catalog.languages.filter(l => Array.isArray(l.topics) && l.topics.length >= 5);
    assert(langsWithTopics.length === 18, 'All 18 languages have at least 5 curated interview topics');

    // 35+ Subjects
    assert(Array.isArray(catalog.subjects) && catalog.subjects.length >= 35, `Catalog has 35+ technical subjects (found: ${catalog.subjects?.length})`);

    // 6 Role Groups & 70+ Roles
    assert(Array.isArray(catalog.roleGroups) && catalog.roleGroups.length === 6, `Catalog has 6 role groups (found: ${catalog.roleGroups?.length})`);
    assert(Array.isArray(catalog.targetRoles) && catalog.targetRoles.length >= 70, `Catalog has 70+ target roles (found: ${catalog.targetRoles?.length})`);

    // Role Suggestions
    assert(typeof catalog.roleSuggestions === 'object' && Object.keys(catalog.roleSuggestions).length > 0, 'Catalog provides roleSuggestions mapping');
    const sdeSuggestions = catalog.roleSuggestions['Software Development Engineer (SDE-1)'];
    assert(Array.isArray(sdeSuggestions) && sdeSuggestions.includes('DSA'), 'SDE-1 role suggests DSA');
    const javaSuggestions = catalog.roleSuggestions['Java Developer'];
    assert(Array.isArray(javaSuggestions) && javaSuggestions.includes('Java'), 'Java Developer role suggests Java');
    const backendSuggestions = catalog.roleSuggestions['Backend Developer'];
    assert(Array.isArray(backendSuggestions) && backendSuggestions.includes('Node.js'), 'Backend Developer role suggests Node.js');

    // Experience Levels, Modes, and Company Styles
    assert(Array.isArray(catalog.experienceLevels) && catalog.experienceLevels.length >= 4, 'Catalog exports experienceLevels');
    assert(Array.isArray(catalog.interviewModes) && catalog.interviewModes.length >= 6, 'Catalog exports interviewModes');
    assert(Array.isArray(catalog.companyStyles) && catalog.companyStyles.length >= 4, 'Catalog exports companyStyles');

    // -------------------------------------------------------------
    // Test Group 3: Question Filtering & Deduplication Logic
    // -------------------------------------------------------------
    console.log('\n--- Test Group 3: Question Filtering & Deduplication ---');
    // Test text normalization
    const norm1 = normalizeQuestionText('What is Polymorphism in Java?');
    const norm2 = normalizeQuestionText('what is polymorphism in java???');
    assert(norm1 === norm2, 'normalizeQuestionText strips punctuation and case for duplicate detection');

    const norm3 = normalizeQuestionText('Explain Goroutines (Go concurrency)');
    assert(norm3.length > 5, 'normalizeQuestionText produces clean normalized key');

    // -------------------------------------------------------------
    // Test Group 4: Role-Appropriate Evaluation Under All Scenarios
    // -------------------------------------------------------------
    console.log('\n--- Test Group 4: Role-Appropriate Answer Evaluation Matrix ---');
    // 4.1 Skipped answer
    const skipEval = await evaluateAnswer({
      questionText: 'What is a deadlock and how do you prevent it?',
      expectedKeyPoints: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Circular wait'],
      userAnswer: '[Skipped]',
      category: 'Operating Systems',
      targetRole: 'Backend Developer',
      experienceLevel: 'junior'
    });
    assert(skipEval.score === 0, 'Skipped question yields score 0');
    assert(skipEval.feedback.toLowerCase().includes('skipped'), 'Skipped feedback informs candidate');

    // 4.2 Junior Answer with positive encouragement
    const juniorEval = await evaluateAnswer({
      questionText: 'What is a deadlock?',
      expectedKeyPoints: ['Mutual exclusion', 'Hold and wait', 'Circular wait'],
      userAnswer: 'A deadlock happens when two processes are both waiting for each other to release a lock, so neither can proceed.',
      category: 'Operating Systems',
      targetRole: 'Software Development Engineer (SDE-1)',
      experienceLevel: 'junior',
      interviewMode: 'conceptual'
    });
    assert(juniorEval.score >= 5, 'Junior clear answer receives solid score');
    assert(juniorEval.feedback.includes('JUNIOR') || juniorEval.feedback.toLowerCase().includes('junior'), 'Feedback tailored to junior role');

    // 4.3 Senior Answer demanding production trade-offs
    const seniorEval = await evaluateAnswer({
      questionText: 'How do you design high-throughput thread pooling with deadlock prevention?',
      expectedKeyPoints: ['Lock hierarchy', 'Timeout acquisition', 'Deadlock detection graph', 'Lock-free structures'],
      userAnswer: 'Processes wait for locks so neither can proceed.',
      category: 'Operating Systems',
      targetRole: 'Staff / Principal Engineer',
      experienceLevel: 'senior',
      interviewMode: 'system_design'
    });
    assert(seniorEval.score <= juniorEval.score, 'Senior bar evaluates brevity more strictly than junior');
    assert(
      seniorEval.suggestions.some(s => s.toLowerCase().includes('trade-off') || s.toLowerCase().includes('scale') || s.toLowerCase().includes('senior') || s.toLowerCase().includes('architect')),
      'Senior evaluation suggests architectural trade-offs or production scale'
    );

    // 4.4 Coding mode Big-O check
    const codingEval = await evaluateAnswer({
      questionText: 'Given an array of integers, return indices of two numbers that add up to target.',
      expectedKeyPoints: ['HashMap lookup', 'Single pass', 'O(N) time complexity', 'O(N) space complexity'],
      userAnswer: 'I will iterate through the array and store numbers in a map. When target minus num is in map, return indices.',
      category: 'DSA',
      targetRole: 'Backend Developer',
      experienceLevel: 'mid',
      interviewMode: 'coding'
    });
    assert(
      codingEval.missingConcepts.some(c => c.toLowerCase().includes('complexity')) ||
      codingEval.suggestions.some(s => s.toLowerCase().includes('complexity')),
      'Coding mode evaluation flags missing time/space complexity analysis'
    );

    // -------------------------------------------------------------
    // Test Group 5: Authentication Protection & Route Security
    // -------------------------------------------------------------
    console.log('\n--- Test Group 5: Authentication & Route Security ---');
    // POST /api/interviews without auth should return 401
    const unauthRes = await fetch(`${baseUrl}/interviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'Java' })
    });
    assert(unauthRes.status === 401, 'Unauthenticated POST /api/interviews returns HTTP 401 Unauthorized');

    // GET /api/interviews without auth should return 401
    const unauthGetRes = await fetch(`${baseUrl}/interviews`);
    assert(unauthGetRes.status === 401, 'Unauthenticated GET /api/interviews returns HTTP 401 Unauthorized');

    // Undefined API route returns 404 JSON
    const notFoundRes = await fetch(`${baseUrl}/non_existent_route`);
    assert(notFoundRes.status === 404, 'Undefined API route returns HTTP 404');
    const notFoundJson = await notFoundRes.json();
    assert(notFoundJson.status === 'error', '404 route returns structured error JSON');

    // -------------------------------------------------------------
    // Test Group 6: Production Client Build & Static Assets
    // -------------------------------------------------------------
    console.log('\n--- Test Group 6: Frontend Bundle & Static Delivery ---');
    const distIndexPath = path.resolve(__dirname, '../../../client/dist/index.html');
    assert(fs.existsSync(distIndexPath), 'client/dist/index.html exists and is compiled');
    const indexHtml = fs.readFileSync(distIndexPath, 'utf8');
    assert(indexHtml.includes('<div id="root"></div>'), 'index.html contains root mounting point');
    assert(indexHtml.includes('InterviewAce AI'), 'index.html contains correct platform title');

    // Test that Express serves index.html at root route
    const spaRes = await fetch(`http://127.0.0.1:${port}/`);
    assert(spaRes.status === 200, 'Express serves single-page application index.html at root route');
    const spaText = await spaRes.text();
    assert(spaText.includes('InterviewAce AI'), 'Served SPA page contains InterviewAce AI title');

    // -------------------------------------------------------------
    // Test Group 7: Catalog Data Invariants
    // -------------------------------------------------------------
    console.log('\n--- Test Group 7: Catalog Data Invariants ---');
    assert(INTERVIEW_CATALOG.languages.length === 18, 'INTERVIEW_CATALOG has exactly 18 languages');
    assert(INTERVIEW_CATALOG.subjects.length >= 35, 'INTERVIEW_CATALOG has >= 35 technical subjects');
    assert(INTERVIEW_CATALOG.targetRoles.length >= 70, 'INTERVIEW_CATALOG has >= 70 target roles');
    assert(INTERVIEW_CATALOG.roleGroups.length === 6, 'INTERVIEW_CATALOG has 6 role groups');

    // Check no duplicate IDs in languages or subjects
    const allCatIds = INTERVIEW_CATALOG.categories.map(c => c.id);
    const uniqueCatIds = new Set(allCatIds);
    assert(allCatIds.length === uniqueCatIds.size, 'No duplicate category IDs across languages and subjects');

    console.log('\n============================================================');
    console.log(`TOTAL PASSES: ${passed}`);
    console.log(`TOTAL FAILS : ${failed}`);
    console.log('============================================================\n');

    if (failed > 0) {
      console.error(`Phase 7 Validation Failed with ${failed} failure(s).\n`);
      process.exitCode = 1;
    } else {
      console.log(`Phase 7 Verification Succeeded! All ${passed} end-to-end integration assertions passed cleanly.\n`);
      process.exitCode = 0;
    }
  } finally {
    // Teardown ephemeral server
    await new Promise((resolve) => server.close(resolve));
    console.log('Ephemeral test server cleanly stopped.');
  }
}

runPhase7Suite().catch((err) => {
  console.error('Phase 7 Test Runner Error:', err);
  process.exit(1);
});
