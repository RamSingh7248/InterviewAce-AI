/**
 * Phase 4 Verification Suite — Role-Based Interview Configuration & Parameter Alignment
 * Tests: INTERVIEW_MODES, EXPERIENCE_LEVELS, COMPANY_STYLES, payload contracts, and E2E alignment.
 */

import {
  INTERVIEW_MODES,
  EXPERIENCE_LEVELS,
  COMPANY_STYLES,
  DIFFICULTIES,
  QUESTION_TYPES,
  ALL_ROLES,
  ALL_CATEGORIES,
  INTERVIEW_CATALOG
} from '../config/interviewCatalog.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runPhase4Verification() {
  console.log('\n============================================================');
  console.log('      INTERVIEWACE AI — PHASE 4 VALIDATION SUITE            ');
  console.log('  Role-Based Config & End-to-End Payload Alignment           ');
  console.log('============================================================\n');

  let passes = 0;
  let fails = 0;

  function assert(condition, message) {
    if (condition) {
      console.log('  [PASS] ' + message);
      passes++;
    } else {
      console.error('  [FAIL] ' + message);
      fails++;
    }
  }

  // ======================================================================
  // Sub-Phase 4.1: Interview Modes
  // ======================================================================
  console.log('--- Sub-Phase 4.1: Interview Modes ---');

  const EXPECTED_MODE_IDS = ['mixed', 'conceptual', 'coding', 'sql', 'debugging', 'system_design', 'scenario', 'role_specific'];

  assert(Array.isArray(INTERVIEW_MODES), 'INTERVIEW_MODES is an array');
  assert(INTERVIEW_MODES.length === 8, 'INTERVIEW_MODES contains exactly 8 modes (found: ' + INTERVIEW_MODES.length + ')');

  EXPECTED_MODE_IDS.forEach(modeId => {
    const mode = INTERVIEW_MODES.find(m => m.id === modeId);
    assert(!!mode, "Interview mode '" + modeId + "' exists");
    if (mode) {
      assert(typeof mode.label === 'string' && mode.label.length > 3, "Mode '" + modeId + "' has a valid label");
      assert(typeof mode.desc === 'string' && mode.desc.length > 5, "Mode '" + modeId + "' has a valid description");
    }
  });

  const modeIds = INTERVIEW_MODES.map(m => m.id);
  const uniqueModeIds = [...new Set(modeIds)];
  assert(modeIds.length === uniqueModeIds.length, 'All interview mode IDs are unique (no duplicates)');

  // ======================================================================
  // Sub-Phase 4.2: Experience Levels
  // ======================================================================
  console.log('\n--- Sub-Phase 4.2: Experience Levels ---');

  const EXPECTED_LEVEL_IDS = ['internship', 'fresher', 'junior', 'mid', 'senior'];

  assert(Array.isArray(EXPERIENCE_LEVELS), 'EXPERIENCE_LEVELS is an array');
  assert(EXPERIENCE_LEVELS.length === 5, 'EXPERIENCE_LEVELS contains exactly 5 levels (found: ' + EXPERIENCE_LEVELS.length + ')');

  EXPECTED_LEVEL_IDS.forEach(levelId => {
    const level = EXPERIENCE_LEVELS.find(l => l.id === levelId);
    assert(!!level, "Experience level '" + levelId + "' exists");
    if (level) {
      assert(typeof level.label === 'string' && level.label.length > 3, "Level '" + levelId + "' has a valid label");
      assert(typeof level.desc === 'string' && level.desc.length > 5, "Level '" + levelId + "' has a description");
    }
  });

  const levelIds = EXPERIENCE_LEVELS.map(l => l.id);
  const uniqueLevelIds = [...new Set(levelIds)];
  assert(levelIds.length === uniqueLevelIds.length, 'All experience level IDs are unique (no duplicates)');

  // ======================================================================
  // Sub-Phase 4.3: Company Styles
  // ======================================================================
  console.log('\n--- Sub-Phase 4.3: Company Practice Styles ---');

  const EXPECTED_STYLE_IDS = ['General Tech', 'FAANG / Big Tech', 'High-Growth Startup', 'Enterprise / FinTech'];

  assert(Array.isArray(COMPANY_STYLES), 'COMPANY_STYLES is an array');
  assert(COMPANY_STYLES.length === 4, 'COMPANY_STYLES contains exactly 4 styles (found: ' + COMPANY_STYLES.length + ')');

  EXPECTED_STYLE_IDS.forEach(styleId => {
    const style = COMPANY_STYLES.find(s => s.id === styleId);
    assert(!!style, "Company style '" + styleId + "' exists");
    if (style) {
      assert(typeof style.label === 'string' && style.label.length > 3, "Style '" + styleId + "' has a valid label");
      assert(typeof style.desc === 'string' && style.desc.length > 10, "Style '" + styleId + "' has a description");
    }
  });

  // ======================================================================
  // Sub-Phase 4.4: Difficulty & Question Types
  // ======================================================================
  console.log('\n--- Sub-Phase 4.4: Difficulties & Question Types ---');

  assert(Array.isArray(DIFFICULTIES), 'DIFFICULTIES is an array');
  assert(DIFFICULTIES.length === 3, 'DIFFICULTIES has 3 levels (found: ' + DIFFICULTIES.length + ')');
  assert(DIFFICULTIES.includes('Easy'), "DIFFICULTIES includes 'Easy'");
  assert(DIFFICULTIES.includes('Medium'), "DIFFICULTIES includes 'Medium'");
  assert(DIFFICULTIES.includes('Hard'), "DIFFICULTIES includes 'Hard'");

  assert(Array.isArray(QUESTION_TYPES), 'QUESTION_TYPES is an array');
  assert(QUESTION_TYPES.length >= 6, 'QUESTION_TYPES has 6+ types (found: ' + QUESTION_TYPES.length + ')');

  const expectedQTypes = ['conceptual', 'coding', 'sql', 'debugging', 'scenario', 'output_prediction'];
  expectedQTypes.forEach(qt => {
    assert(QUESTION_TYPES.includes(qt), "Question type '" + qt + "' exists in QUESTION_TYPES");
  });

  // ======================================================================
  // Sub-Phase 4.5: INTERVIEW_CATALOG Unified Export
  // ======================================================================
  console.log('\n--- Sub-Phase 4.5: INTERVIEW_CATALOG Unified Export ---');

  assert(typeof INTERVIEW_CATALOG === 'object' && INTERVIEW_CATALOG !== null, 'INTERVIEW_CATALOG is a valid object');

  const expectedCatalogKeys = [
    'languages', 'subjects', 'categories',
    'roleGroups', 'targetRoles', 'roleSuggestions',
    'experienceLevels', 'difficulties', 'questionTypes',
    'interviewModes', 'companyStyles'
  ];

  expectedCatalogKeys.forEach(key => {
    assert(key in INTERVIEW_CATALOG, "INTERVIEW_CATALOG exports key '" + key + "'");
  });

  assert(INTERVIEW_CATALOG.languages.length >= 18, 'INTERVIEW_CATALOG.languages has 18+ programming languages');
  assert(INTERVIEW_CATALOG.subjects.length >= 35, 'INTERVIEW_CATALOG.subjects has 35+ technical subjects');
  assert(INTERVIEW_CATALOG.categories.length >= 53, 'INTERVIEW_CATALOG.categories has 53+ total categories');
  assert(INTERVIEW_CATALOG.targetRoles.length >= 70, 'INTERVIEW_CATALOG.targetRoles has 70+ roles');

  // ======================================================================
  // Sub-Phase 4.6: Payload Schema Simulation
  // ======================================================================
  console.log('\n--- Sub-Phase 4.6: End-to-End Payload Construction Simulation ---');

  const testPayloads = [
    { category: 'Java', difficulty: 'Medium', totalQuestions: 5, targetRole: 'Software Development Engineer (SDE-1)', experienceLevel: 'junior', interviewMode: 'mixed', companyStyle: 'General Tech' },
    { category: 'Python', difficulty: 'Hard', totalQuestions: 7, targetRole: 'Data Scientist', experienceLevel: 'mid', interviewMode: 'conceptual', companyStyle: 'FAANG / Big Tech' },
    { category: 'System Design', difficulty: 'Hard', totalQuestions: 5, targetRole: 'Staff / Principal Engineer', experienceLevel: 'senior', interviewMode: 'system_design', companyStyle: 'FAANG / Big Tech' },
    { category: 'DSA', difficulty: 'Easy', totalQuestions: 3, targetRole: 'Software Engineer Intern', experienceLevel: 'internship', interviewMode: 'coding', companyStyle: 'High-Growth Startup' },
    { category: 'SQL/DBMS', difficulty: 'Medium', totalQuestions: 5, targetRole: 'Database Administrator (DBA)', experienceLevel: 'mid', interviewMode: 'sql', companyStyle: 'Enterprise / FinTech' },
    { category: 'DevOps', difficulty: 'Medium', totalQuestions: 5, targetRole: 'DevOps Engineer', experienceLevel: 'junior', interviewMode: 'scenario', companyStyle: 'Enterprise / FinTech' },
    { category: 'Web Security', difficulty: 'Hard', totalQuestions: 7, targetRole: 'Penetration Tester', experienceLevel: 'mid', interviewMode: 'debugging', companyStyle: 'General Tech' },
    { category: 'JavaScript', difficulty: 'Medium', totalQuestions: 5, targetRole: 'Frontend Developer', experienceLevel: 'fresher', interviewMode: 'role_specific', companyStyle: 'High-Growth Startup' },
  ];

  const validCategoryIds = new Set(ALL_CATEGORIES.map(c => c.id));
  const validRoles = new Set(ALL_ROLES);
  const validModeIds = new Set(INTERVIEW_MODES.map(m => m.id));
  const validLevelIds = new Set(EXPERIENCE_LEVELS.map(l => l.id));
  const validStyleIds = new Set(COMPANY_STYLES.map(s => s.id));

  testPayloads.forEach((payload, i) => {
    const { category, difficulty, totalQuestions, targetRole, experienceLevel, interviewMode, companyStyle } = payload;
    const n = i + 1;
    assert(validCategoryIds.has(category), '[Payload ' + n + '] category "' + category + '" is a valid catalog ID');
    assert(DIFFICULTIES.includes(difficulty), '[Payload ' + n + '] difficulty "' + difficulty + '" is valid');
    assert(totalQuestions >= 1 && totalQuestions <= 10, '[Payload ' + n + '] totalQuestions=' + totalQuestions + ' is within range');
    assert(validRoles.has(targetRole), '[Payload ' + n + '] targetRole "' + targetRole + '" is in ALL_ROLES');
    assert(validLevelIds.has(experienceLevel), '[Payload ' + n + '] experienceLevel "' + experienceLevel + '" is a valid level ID');
    assert(validModeIds.has(interviewMode), '[Payload ' + n + '] interviewMode "' + interviewMode + '" is a valid mode ID');
    assert(validStyleIds.has(companyStyle), '[Payload ' + n + '] companyStyle "' + companyStyle + '" is a valid style ID');
  });

  // ======================================================================
  // Sub-Phase 4.7: AI Service Parameter Forwarding
  // ======================================================================
  console.log('\n--- Sub-Phase 4.7: AI Service Configuration Forwarding ---');

  const aiServicePath = path.resolve(__dirname, '../services/ai.service.js');
  assert(fs.existsSync(aiServicePath), 'ai.service.js exists');

  const aiCode = fs.readFileSync(aiServicePath, 'utf8');
  assert(aiCode.includes('experienceLevel'), 'ai.service.js accepts experienceLevel param');
  assert(aiCode.includes('interviewMode'), 'ai.service.js accepts interviewMode param');
  assert(aiCode.includes('companyStyle'), 'ai.service.js accepts companyStyle param');
  assert(aiCode.includes('targetRole'), 'ai.service.js accepts targetRole param');
  assert(aiCode.includes('Experience Level'), 'ai.service.js embeds experienceLevel into Gemini prompt');
  assert(aiCode.includes('Interview Mode'), 'ai.service.js embeds interviewMode into Gemini prompt');
  assert(aiCode.includes('Company Style'), 'ai.service.js embeds companyStyle into Gemini prompt');
  assert(aiCode.includes('Target Candidate Role'), 'ai.service.js embeds targetRole into Gemini prompt');

  // ======================================================================
  // Sub-Phase 4.8: interview.controller.js Alignment
  // ======================================================================
  console.log('\n--- Sub-Phase 4.8: Interview Controller Payload Alignment ---');

  const controllerPath = path.resolve(__dirname, '../controllers/interview.controller.js');
  assert(fs.existsSync(controllerPath), 'interview.controller.js exists');

  const ctrlCode = fs.readFileSync(controllerPath, 'utf8');
  assert(ctrlCode.includes('experienceLevel'), 'controller extracts experienceLevel from req.body');
  assert(ctrlCode.includes('interviewMode'), 'controller extracts interviewMode from req.body');
  assert(ctrlCode.includes('companyStyle'), 'controller extracts companyStyle from req.body');
  assert(ctrlCode.includes('targetRole'), 'controller extracts targetRole from req.body');
  assert(ctrlCode.includes('difficulty'), 'controller extracts difficulty from req.body');
  assert(ctrlCode.includes('totalQuestions'), 'controller extracts totalQuestions from req.body');
  assert(ctrlCode.includes('topic'), 'controller extracts topic from req.body');
  assert(ctrlCode.includes('category'), 'controller extracts category from req.body');
  assert(ctrlCode.includes('Interview.create'), 'controller calls Interview.create()');

  // ======================================================================
  // Sub-Phase 4.9: Frontend InterviewSetup.jsx Full Configuration UI
  // ======================================================================
  console.log('\n--- Sub-Phase 4.9: Frontend Configuration UI Completeness ---');

  const setupPath = path.resolve(__dirname, '../../../client/src/pages/InterviewSetup.jsx');
  assert(fs.existsSync(setupPath), 'InterviewSetup.jsx exists');

  const uiCode = fs.readFileSync(setupPath, 'utf8');
  assert(uiCode.includes('const [category, setCategory]'), 'InterviewSetup has category state');
  assert(uiCode.includes('const [difficulty, setDifficulty]'), 'InterviewSetup has difficulty state');
  assert(uiCode.includes('const [totalQuestions, setTotalQuestions]'), 'InterviewSetup has totalQuestions state');
  assert(uiCode.includes('const [targetRole, setTargetRole]'), 'InterviewSetup has targetRole state');
  assert(uiCode.includes('const [experienceLevel, setExperienceLevel]'), 'InterviewSetup has experienceLevel state');
  assert(uiCode.includes('const [interviewMode, setInterviewMode]'), 'InterviewSetup has interviewMode state');
  assert(uiCode.includes('const [companyStyle, setCompanyStyle]'), 'InterviewSetup has companyStyle state');

  assert(uiCode.includes('EXPERIENCE_LEVELS.map'), 'InterviewSetup renders Experience Level UI picker');
  assert(uiCode.includes('INTERVIEW_MODES.map'), 'InterviewSetup renders Interview Mode picker');
  assert(uiCode.includes('COMPANY_STYLES.map'), 'InterviewSetup renders Company Style picker');
  assert(uiCode.includes('DIFFICULTIES.map'), 'InterviewSetup renders Difficulty picker');
  assert(uiCode.includes('QUESTION_COUNTS.map'), 'InterviewSetup renders Question Count picker');

  assert(uiCode.includes("experienceLevel,") || uiCode.includes("experienceLevel\n"), 'experienceLevel is in POST payload');
  assert(uiCode.includes("interviewMode,") || uiCode.includes("interviewMode\n"), 'interviewMode is in POST payload');
  assert(uiCode.includes("companyStyle"), 'companyStyle is in POST payload');
  assert(uiCode.includes("targetRole,") || uiCode.includes("targetRole\n"), 'targetRole is in POST payload');
  assert(uiCode.includes('topic: effectiveTopic'), 'effectiveTopic is in POST payload');

  assert(uiCode.includes('EXPERIENCE_LEVELS.find'), 'Session summary bar displays experienceLevel');
  assert(uiCode.includes('FALLBACK_ROLE_GROUPS'), 'Phase 3 role groups intact');
  assert(uiCode.includes('suggestedSubjects'), 'Phase 3 role suggestions intact');

  // ======================================================================
  // Sub-Phase 4.10: Mode-to-QuestionType Semantic Consistency
  // ======================================================================
  console.log('\n--- Sub-Phase 4.10: Interview Mode <-> Question Type Semantic Consistency ---');

  const modeQTypePairs = [
    ['conceptual', 'conceptual'],
    ['coding', 'coding'],
    ['sql', 'sql'],
    ['debugging', 'debugging'],
    ['scenario', 'scenario'],
    ['system_design', 'system_design']
  ];

  modeQTypePairs.forEach(([modeId, qtId]) => {
    const modeExists = INTERVIEW_MODES.some(m => m.id === modeId);
    const qtExists = QUESTION_TYPES.includes(qtId);
    assert(modeExists && qtExists, "Mode '" + modeId + "' has corresponding question type '" + qtId + "' — semantically consistent");
  });

  assert(INTERVIEW_MODES.some(m => m.id === 'mixed'), "Special mode 'mixed' (covers all question types) exists");
  assert(INTERVIEW_MODES.some(m => m.id === 'role_specific'), "Special mode 'role_specific' (role-tailored) exists");

  // ======================================================================
  // Final Summary
  // ======================================================================
  console.log('\n============================================================');
  console.log('TOTAL PASSES: ' + passes);
  console.log('TOTAL FAILS : ' + fails);
  console.log('============================================================\n');

  if (fails > 0) {
    console.error('Validation Failed — ' + fails + ' assertion(s) did not pass.');
    process.exit(1);
  } else {
    console.log('SUCCESS: Phase 4 (Role-Based Interview Configuration & Payload Alignment) passed completely!');
    process.exit(0);
  }
}

runPhase4Verification().catch(err => {
  console.error('Unexpected error running Phase 4 verification:', err);
  process.exit(1);
});
