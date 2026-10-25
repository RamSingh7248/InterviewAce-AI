/**
 * Phase 6 Verification Suite — Role-Appropriate Answer Evaluation
 * Tests:
 * 1. evaluateAnswer export & parameter contract
 * 2. [Skipped] and empty answer handling
 * 3. Junior vs Senior/Lead level rubric calibration
 * 4. Mode-aware evaluation (coding Big-O, system_design scalability)
 * 5. Role-aware evaluation criteria & feedback
 * 6. interview.controller.js integration & parameter forwarding
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { evaluateAnswer } from '../services/ai.service.js';

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

async function runPhase6Tests() {
  console.log('============================================================');
  console.log('      INTERVIEWACE AI — PHASE 6 VALIDATION SUITE            ');
  console.log('       Role-Appropriate Answer Evaluation System            ');
  console.log('============================================================\n');

  // Sub-Phase 6.1: Service Signature & Export Contract
  console.log('--- Sub-Phase 6.1: evaluateAnswer Export & Contract ---');
  assert(typeof evaluateAnswer === 'function', 'evaluateAnswer is exported as an async function');

  // Sub-Phase 6.2: Skipped and Empty Answer Handling
  console.log('\n--- Sub-Phase 6.2: Skipped and Empty Answer Handling ---');
  const skippedEval = await evaluateAnswer({
    questionText: 'What is polymorphism in Java?',
    expectedKeyPoints: ['Method overloading', 'Method overriding', 'Dynamic dispatch'],
    referenceAnswer: 'Polymorphism allows objects to be treated as instances of their parent class.',
    userAnswer: '[Skipped]',
    category: 'Java',
    difficulty: 'Medium',
    targetRole: 'Backend Developer',
    experienceLevel: 'junior'
  });

  assert(skippedEval.score === 0, 'Skipped answer produces score 0');
  assert(skippedEval.feedback.toLowerCase().includes('skipped'), 'Skipped answer feedback clearly indicates question was skipped');
  assert(Array.isArray(skippedEval.suggestions) && skippedEval.suggestions.length > 0, 'Skipped answer returns actionable study suggestions');
  assert(Boolean(skippedEval.idealAnswer), 'Skipped answer provides ideal reference answer for learning');

  const emptyEval = await evaluateAnswer({
    questionText: 'Explain goroutines in Go',
    expectedKeyPoints: ['Lightweight threads', 'M:N scheduler'],
    userAnswer: '',
    category: 'Go',
    difficulty: 'Medium',
    targetRole: 'DevOps / SRE'
  });
  assert(emptyEval.score === 0, 'Empty answer produces score 0');

  // Sub-Phase 6.3: Junior Level Evaluation Calibration
  console.log('\n--- Sub-Phase 6.3: Junior Level Evaluation Calibration ---');
  const juniorAnswer = 'A goroutine is like a lightweight thread managed by Go runtime. It uses very little memory.';
  const juniorEval = await evaluateAnswer({
    questionText: 'What are goroutines in Go and how are they managed?',
    expectedKeyPoints: ['Lightweight threads', 'Go runtime M:N scheduler', 'Channels for communication'],
    referenceAnswer: 'Goroutines are lightweight threads managed by the Go runtime scheduler.',
    userAnswer: juniorAnswer,
    category: 'Go',
    difficulty: 'Easy',
    targetRole: 'Backend Developer',
    experienceLevel: 'junior',
    interviewMode: 'conceptual'
  });

  assert(juniorEval.score >= 5, 'Junior answer covering basic concept receives encouraging passing score');
  assert(juniorEval.feedback.includes('JUNIOR') || juniorEval.feedback.toLowerCase().includes('junior'), 'Feedback references junior level calibration');
  assert(juniorEval.strengths.length > 0, 'Junior evaluation highlights demonstrated strengths');

  // Sub-Phase 6.4: Senior / Lead Level Evaluation Calibration
  console.log('\n--- Sub-Phase 6.4: Senior / Lead Level Evaluation Calibration ---');
  // The same brief answer evaluated at Senior / Lead level should demand trade-offs
  const seniorEval = await evaluateAnswer({
    questionText: 'What are goroutines in Go and how are they managed in high-concurrency systems?',
    expectedKeyPoints: ['Lightweight threads', 'Go runtime M:N scheduler', 'Channels for communication', 'Work stealing', 'OS thread preemption'],
    referenceAnswer: 'Goroutines are user-space threads managed by an M:N scheduler utilizing work-stealing and cooperative preemption.',
    userAnswer: juniorAnswer,
    category: 'Go',
    difficulty: 'Hard',
    targetRole: 'Backend Developer',
    experienceLevel: 'senior',
    interviewMode: 'system_design'
  });

  assert(seniorEval.score <= juniorEval.score, 'Senior bar is strictly higher than Junior bar for the same brief answer');
  const seniorSuggestionsStr = seniorEval.suggestions.join(' ').toLowerCase();
  assert(
    seniorSuggestionsStr.includes('trade-off') || seniorSuggestionsStr.includes('scale') || seniorSuggestionsStr.includes('senior') || seniorSuggestionsStr.includes('architecture'),
    'Senior evaluation suggests discussing trade-offs, architecture, or scalability'
  );

  // Sub-Phase 6.5: Mode-Specific Evaluation Criteria
  console.log('\n--- Sub-Phase 6.5: Mode-Specific Evaluation Criteria ---');
  // Coding mode without Big-O
  const codingEval = await evaluateAnswer({
    questionText: 'How would you find duplicates in an array?',
    expectedKeyPoints: ['Hash set approach', 'Sorting approach', 'Time complexity O(N)', 'Space complexity O(N)'],
    referenceAnswer: 'Use a HashSet for O(N) time and O(N) auxiliary space.',
    userAnswer: 'I will loop through the array and store each element in a set. If it already exists in the set, it is a duplicate.',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    targetRole: 'Full Stack Developer',
    experienceLevel: 'mid',
    interviewMode: 'coding'
  });

  assert(
    codingEval.missingConcepts.some(c => c.toLowerCase().includes('complexity') || c.toLowerCase().includes('big-o')) ||
    codingEval.suggestions.some(s => s.toLowerCase().includes('complexity')),
    'Coding mode prompts for time/space complexity analysis'
  );

  // System Design mode without caching/scale
  const sysDesignEval = await evaluateAnswer({
    questionText: 'Design a URL shortener like bit.ly',
    expectedKeyPoints: ['Base62 encoding', 'Database schema', 'Caching layer Redis', 'Scale calculations'],
    referenceAnswer: 'Use Base62 encoding on unique IDs with a Redis cache and partitioned NoSQL storage.',
    userAnswer: 'I will create a REST API that takes a long URL, hashes it to 6 characters, and saves it in a table.',
    category: 'System Design',
    difficulty: 'Hard',
    targetRole: 'Backend Developer',
    experienceLevel: 'senior',
    interviewMode: 'system_design'
  });

  assert(
    sysDesignEval.missingConcepts.some(c => c.toLowerCase().includes('scal') || c.toLowerCase().includes('cache') || c.toLowerCase().includes('storage')) ||
    sysDesignEval.suggestions.some(s => s.toLowerCase().includes('scal') || s.toLowerCase().includes('cache')),
    'System Design mode checks for scalability and caching considerations'
  );

  // Sub-Phase 6.6: Controller Parameter Forwarding & Summary
  console.log('\n--- Sub-Phase 6.6: Controller Integration Verification ---');
  const controllerPath = path.resolve(__dirname, '../controllers/interview.controller.js');
  const controllerCode = fs.readFileSync(controllerPath, 'utf8');

  assert(controllerCode.includes('targetRole: interview.targetRole'), 'interview.controller passes targetRole to evaluateAnswer');
  assert(controllerCode.includes('experienceLevel: interview.experienceLevel'), 'interview.controller passes experienceLevel to evaluateAnswer');
  assert(controllerCode.includes('interviewMode: interview.interviewMode'), 'interview.controller passes interviewMode to evaluateAnswer');
  assert(controllerCode.includes('companyStyle: interview.companyStyle'), 'interview.controller passes companyStyle to evaluateAnswer');
  assert(controllerCode.includes('feedbackSummary'), 'interview.controller generates feedbackSummary');
  assert(controllerCode.includes('roleStr'), 'feedbackSummary includes target role details');

  // Sub-Phase 6.7: AI Service Source Integrity
  console.log('\n--- Sub-Phase 6.7: AI Service Rubric Integrity ---');
  const aiServicePath = path.resolve(__dirname, '../services/ai.service.js');
  const aiServiceCode = fs.readFileSync(aiServicePath, 'utf8');

  assert(aiServiceCode.includes('levelGuidelines'), 'ai.service defines levelGuidelines');
  assert(aiServiceCode.includes('modeGuidelines'), 'ai.service defines modeGuidelines');
  assert(aiServiceCode.includes('companyGuidelines'), 'ai.service defines companyGuidelines');
  assert(aiServiceCode.includes('isSkipped'), 'ai.service explicitly handles isSkipped check');
  assert(aiServiceCode.includes('EVALUATION RUBRIC GUIDELINES'), 'Gemini prompt includes calibrated rubric guidelines');

  console.log('\n============================================================');
  console.log(`TOTAL PASSES: ${passed}`);
  console.log(`TOTAL FAILS : ${failed}`);
  console.log('============================================================\n');

  if (failed > 0) {
    console.error(`Validation Failed — ${failed} assertion(s) did not pass.\n`);
    process.exit(1);
  } else {
    console.log('Phase 6 Verification Succeeded! All role-appropriate evaluation assertions passed.\n');
    process.exit(0);
  }
}

runPhase6Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
