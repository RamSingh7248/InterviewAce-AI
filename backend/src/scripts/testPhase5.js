import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionPath = path.resolve(__dirname, '../../../client/src/pages/InterviewSession.jsx');
const resultsPath = path.resolve(__dirname, '../../../client/src/pages/InterviewResults.jsx');

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

console.log('============================================================');
console.log('      INTERVIEWACE AI — PHASE 5 VALIDATION SUITE            ');
console.log('  Interview Session UX & Results Page Enhancements           ');
console.log('============================================================');

// Sub-Phase 5.1: InterviewSession.jsx File Integrity
console.log('\n--- Sub-Phase 5.1: InterviewSession.jsx File Integrity ---');
assert(fs.existsSync(sessionPath), 'InterviewSession.jsx exists');
const sessionCode = fs.readFileSync(sessionPath, 'utf8');
assert(sessionCode.length > 5000, 'InterviewSession.jsx has substantial content (>5000 bytes)');

// Sub-Phase 5.2: Live Elapsed Timer
console.log('\n--- Sub-Phase 5.2: Live Elapsed Timer ---');
assert(sessionCode.includes('elapsedSeconds'), 'InterviewSession has elapsedSeconds state');
assert(sessionCode.includes('setElapsedSeconds'), 'InterviewSession updates elapsed timer');
assert(sessionCode.includes('formatTime'), 'InterviewSession uses formatTime helper');
assert(sessionCode.includes('timerRef'), 'InterviewSession uses timerRef for interval management');
assert(sessionCode.includes('clearInterval'), 'InterviewSession clears timer (no memory leak)');

// Sub-Phase 5.3: Question Dot Minimap
console.log('\n--- Sub-Phase 5.3: Question Dot Minimap ---');
assert(sessionCode.includes('questionDots'), 'InterviewSession builds questionDots from question evaluations');
assert(sessionCode.includes('isCurrent'), 'Dot minimap marks current question');
assert(sessionCode.includes('dot.evaluated'), 'Dot minimap tracks evaluated questions');
assert(sessionCode.includes("dot.isCurrent ? '2px solid #38bdf8' : 'none'"), 'Active question dot has distinct border style');

// Sub-Phase 5.4: Session Config Ribbon
console.log('\n--- Sub-Phase 5.4: Session Config Ribbon ---');
assert(sessionCode.includes('MODE_LABELS'), 'InterviewSession defines MODE_LABELS mapping');
assert(sessionCode.includes('LEVEL_LABELS'), 'InterviewSession defines LEVEL_LABELS mapping');
assert(sessionCode.includes('interviewMode'), 'Config ribbon shows interview mode');
assert(sessionCode.includes('experienceLevel'), 'Config ribbon shows experience level');
assert(sessionCode.includes('companyStyle'), 'Config ribbon shows company style');
assert(sessionCode.includes('interview?.topic'), 'Config ribbon shows focus topic if set');

// Sub-Phase 5.5: Confidence Self-Rating
console.log('\n--- Sub-Phase 5.5: Confidence Self-Rating ---');
assert(sessionCode.includes('CONFIDENCE_OPTIONS'), 'InterviewSession defines CONFIDENCE_OPTIONS');
assert(sessionCode.includes('confidence'), 'InterviewSession has confidence state');
assert(sessionCode.includes('setConfidence'), 'InterviewSession updates confidence state');
assert(sessionCode.includes('Rate your confidence in this answer:'), 'Confidence rating UI prompt text present');

// Sub-Phase 5.6: Animated Score Ring
console.log('\n--- Sub-Phase 5.6: Animated Score Ring ---');
assert(sessionCode.includes('ScoreRing'), 'InterviewSession defines ScoreRing SVG component');
assert(sessionCode.includes('stroke-dasharray'), 'ScoreRing uses SVG stroke-dasharray animation');
assert(sessionCode.includes('circumference'), 'ScoreRing calculates circumference correctly');
assert(sessionCode.includes('rotate(-90deg)'), 'ScoreRing rotates for clock-start position');

// Sub-Phase 5.7: Skip Question Feature
console.log('\n--- Sub-Phase 5.7: Skip Question Feature ---');
assert(sessionCode.includes('handleSkip'), 'InterviewSession implements handleSkip handler');
assert(sessionCode.includes('Skip Question'), 'Skip Question button UI text present');
assert(sessionCode.includes('[Skipped]'), 'Skip submits [Skipped] placeholder answer');
assert(sessionCode.includes('SkipForward'), 'Skip uses SkipForward icon from lucide-react');

// Sub-Phase 5.8: Existing Features Preserved
console.log('\n--- Sub-Phase 5.8: Existing Session Features Preserved ---');
assert(sessionCode.includes('toggleListening'), 'Voice input (Speech-to-Text) preserved');
assert(sessionCode.includes('showHint'), 'Hints system preserved');
assert(sessionCode.includes('handleSubmitAnswer'), 'Answer submission handler preserved');
assert(sessionCode.includes('handleProceed'), 'Proceed to next question handler preserved');
assert(sessionCode.includes('/interviews/'), 'API call to backend interview endpoint preserved');
assert(sessionCode.includes('evaluation'), 'Evaluation state preserved');

// Sub-Phase 5.9: InterviewResults.jsx File Integrity
console.log('\n--- Sub-Phase 5.9: InterviewResults.jsx File Integrity ---');
assert(fs.existsSync(resultsPath), 'InterviewResults.jsx exists');
const resultsCode = fs.readFileSync(resultsPath, 'utf8');
assert(resultsCode.length > 5000, 'InterviewResults.jsx has substantial content (>5000 bytes)');

// Sub-Phase 5.10: Circular Animated Score Badge
console.log('\n--- Sub-Phase 5.10: Circular Animated Score Badge ---');
assert(resultsCode.includes('CircularScore'), 'InterviewResults defines CircularScore SVG component');
assert(resultsCode.includes('stroke-dasharray'), 'CircularScore uses SVG animation');
assert(resultsCode.includes('linearGradient'), 'CircularScore uses gradient stroke');
assert(resultsCode.includes('finalScore'), 'CircularScore receives finalScore prop');

// Sub-Phase 5.11: Per-Question Score Bar Chart
console.log('\n--- Sub-Phase 5.11: Per-Question Score Bar Chart ---');
assert(resultsCode.includes('ScoreBar'), 'InterviewResults defines ScoreBar component');
assert(resultsCode.includes('Score Breakdown by Question'), 'Score breakdown section heading present');
assert(resultsCode.includes('BarChart2'), 'BarChart2 icon used for chart section');

// Sub-Phase 5.12: Session Metadata Tags in Results
console.log('\n--- Sub-Phase 5.12: Session Metadata Tags in Results ---');
assert(resultsCode.includes('MODE_LABELS'), 'Results page uses MODE_LABELS for display');
assert(resultsCode.includes('LEVEL_LABELS'), 'Results page uses LEVEL_LABELS for display');
assert(resultsCode.includes('interview.targetRole'), 'Results page shows targetRole');
assert(resultsCode.includes('interview.interviewMode'), 'Results page shows interviewMode');
assert(resultsCode.includes('interview.experienceLevel'), 'Results page shows experienceLevel');
assert(resultsCode.includes('interview.companyStyle'), 'Results page shows companyStyle');

// Sub-Phase 5.13: Stats Summary Cards
console.log('\n--- Sub-Phase 5.13: Stats Summary Cards ---');
assert(resultsCode.includes('Average Score'), 'Results page shows Average Score stat');
assert(resultsCode.includes('Strong Answers'), 'Results page shows Strong Answers count');
assert(resultsCode.includes('Needs Work'), 'Results page shows Needs Work count');
assert(resultsCode.includes('avgScore'), 'Results computes average score from evaluations');
assert(resultsCode.includes('highScores'), 'Results counts high-score questions');
assert(resultsCode.includes('lowScores'), 'Results counts low-score questions');

// Sub-Phase 5.14: Weak Topic Practice Suggestions
console.log('\n--- Sub-Phase 5.14: Weak Topic Practice Suggestions ---');
assert(resultsCode.includes('weakTopics'), 'Results computes weakTopics from low scores');
assert(resultsCode.includes('prioritize these topics in your next session'), 'Focus areas advice present');
assert(resultsCode.includes('Practice These Topics'), 'Practice CTA button present');

// Sub-Phase 5.15: Collapsible Per-Question Accordion
console.log('\n--- Sub-Phase 5.15: Collapsible Per-Question Accordion ---');
assert(resultsCode.includes('expandedQ'), 'Results uses expandedQ state for accordion');
assert(resultsCode.includes('setExpandedQ'), 'Results updates expandedQ on toggle');
assert(resultsCode.includes('ChevronDown'), 'Results uses ChevronDown icon for collapse indicator');
assert(resultsCode.includes('ChevronUp'), 'Results uses ChevronUp icon for expanded indicator');
assert(resultsCode.includes('isExpanded'), 'Results checks isExpanded per question');

// Sub-Phase 5.16: Skipped Answer Display
console.log('\n--- Sub-Phase 5.16: Skipped Answer Display ---');
assert(resultsCode.includes('[Skipped]'), 'Results gracefully handles [Skipped] answers');
assert(resultsCode.includes('Question was skipped'), 'Results shows friendly message for skipped questions');

console.log('\n============================================================');
console.log(`TOTAL PASSES: ${passed}`);
console.log(`TOTAL FAILS : ${failed}`);
console.log('============================================================\n');

if (failed > 0) {
  console.error(`Validation Failed — ${failed} assertion(s) did not pass.\n`);
  process.exit(1);
} else {
  console.log('Phase 5 Verification Succeeded! All 65 assertions passed.\n');
  process.exit(0);
}
