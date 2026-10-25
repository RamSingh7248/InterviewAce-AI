import { ROLE_GROUPS, ALL_ROLES, ROLE_SUGGESTIONS, ALL_CATEGORIES } from '../config/interviewCatalog.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPECTED_DISCIPLINES = [
  'software_development',
  'data_and_ai',
  'cloud_and_devops',
  'quality_and_security',
  'product_and_business',
  'architecture_and_leadership'
];

async function runPhase3Verification() {
  console.log('\n============================================================');
  console.log('       INTERVIEWACE AI — PHASE 3 VALIDATION SUITE           ');
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

  // 1. Verify 6 Disciplines
  console.log('--- Sub-Phase 3.1: Discipline Taxonomy ---');
  assert(Array.isArray(ROLE_GROUPS), 'ROLE_GROUPS is defined as an array');
  assert(ROLE_GROUPS.length === 6, `ROLE_GROUPS contains exactly 6 disciplines (found: ${ROLE_GROUPS.length})`);

  EXPECTED_DISCIPLINES.forEach(dId => {
    const group = ROLE_GROUPS.find(g => g.id === dId);
    assert(!!group, `Discipline '${dId}' exists in ROLE_GROUPS`);
    if (group) {
      assert(group.name && typeof group.name === 'string', `Discipline '${dId}' has a valid name ('${group.name}')`);
      assert(Array.isArray(group.roles) && group.roles.length > 0, `Discipline '${dId}' has roles array (count: ${group?.roles?.length})`);
    }
  });

  // 2. Verify All Roles List
  console.log('\n--- Sub-Phase 3.2: 70+ Job Roles Completeness ---');
  assert(Array.isArray(ALL_ROLES), 'ALL_ROLES is defined as an array');
  assert(ALL_ROLES.length >= 70, `ALL_ROLES contains at least 70 job roles (actual count: ${ALL_ROLES.length})`);

  // Spot-check key representative roles across all disciplines
  const benchmarkRoles = [
    'Software Engineer Intern',
    'Graduate Engineer Trainee',
    'Software Development Engineer (SDE-1)',
    'Software Development Engineer (SDE-2)',
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Data Engineer',
    'Data Scientist',
    'AI Engineer',
    'Generative AI Engineer',
    'LLM Application Developer',
    'DevOps Engineer',
    'Site Reliability Engineer (SRE)',
    'Cloud Engineer',
    'QA Engineer',
    'SDET (Software Dev Engineer in Test)',
    'Security Engineer',
    'Application Security Engineer',
    'Technical Product Manager',
    'Software Architect',
    'Technical Lead'
  ];

  benchmarkRoles.forEach(role => {
    assert(ALL_ROLES.includes(role), `Key benchmark role '${role}' is present in ALL_ROLES`);
  });

  // 3. Verify ROLE_SUGGESTIONS coverage and validity
  console.log('\n--- Sub-Phase 3.3: Role Category Recommendations ---');
  assert(typeof ROLE_SUGGESTIONS === 'object' && ROLE_SUGGESTIONS !== null, 'ROLE_SUGGESTIONS is an object');

  const validCategoryIds = new Set(ALL_CATEGORIES.map(c => c.id));
  const uniqueRoles = [...new Set(ALL_ROLES)];

  let missingSuggestions = 0;
  let invalidCategoryTargets = 0;

  uniqueRoles.forEach(role => {
    const suggestions = ROLE_SUGGESTIONS[role];
    if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
      console.error(`  [MISSING SUGGESTION] Role '${role}' has no category suggestions`);
      missingSuggestions++;
    } else {
      suggestions.forEach(catId => {
        if (!validCategoryIds.has(catId)) {
          console.error(`  [INVALID SUGGESTED CATEGORY] Role '${role}' suggests invalid category '${catId}'`);
          invalidCategoryTargets++;
        }
      });
    }
  });

  assert(missingSuggestions === 0, `All ${uniqueRoles.length} unique roles have defined recommendations (missing: ${missingSuggestions})`);
  assert(invalidCategoryTargets === 0, `All recommended categories in ROLE_SUGGESTIONS are valid catalog IDs (invalid: ${invalidCategoryTargets})`);

  // 4. Verify Seed Questions targetRoles field
  console.log('\n--- Sub-Phase 3.4: Question Bank Role Metadata ---');
  assert(Array.isArray(SEED_QUESTIONS) && SEED_QUESTIONS.length >= 90, `Seed question bank has 90+ curated questions (found: ${SEED_QUESTIONS.length})`);

  let questionsWithValidRoles = 0;
  const rolesFoundInQuestions = new Set();

  SEED_QUESTIONS.forEach(q => {
    if (Array.isArray(q.targetRoles) && q.targetRoles.length > 0) {
      questionsWithValidRoles++;
      q.targetRoles.forEach(r => rolesFoundInQuestions.add(r));
    }
  });

  assert(questionsWithValidRoles === SEED_QUESTIONS.length, `100% of seed questions have targetRoles defined (${questionsWithValidRoles}/${SEED_QUESTIONS.length})`);
  assert(rolesFoundInQuestions.size >= 15, `Seed questions cover at least 15 distinct job roles (found: ${rolesFoundInQuestions.size})`);

  // 5. Verify Role-Aware Filter Logic Simulation
  console.log('\n--- Sub-Phase 3.5: Role-Aware Matching Simulation ---');
  // Test simulated role search:
  function simulateRoleMatch(role, category) {
    const questionsForCat = SEED_QUESTIONS.filter(q => q.category === category);
    const roleMatches = questionsForCat.filter(q => 
      q.targetRoles && q.targetRoles.some(tr => tr.toLowerCase().includes(role.toLowerCase()))
    );
    return roleMatches;
  }

  const sde1JavaMatches = simulateRoleMatch('SDE-1', 'Java');
  assert(sde1JavaMatches.length > 0, `Role 'SDE-1' matches curated Java questions (${sde1JavaMatches.length} questions found)`);

  const internMatches = simulateRoleMatch('Intern', 'Java');
  assert(internMatches.length > 0, `Role 'Intern' matches curated Java questions (${internMatches.length} questions found)`);

  const devopsMatches = simulateRoleMatch('DevOps', 'DevOps');
  assert(devopsMatches.length > 0, `Role 'DevOps' matches curated DevOps questions (${devopsMatches.length} questions found)`);

  // 6. Verify Frontend InterviewSetup.jsx Consistency
  console.log('\n--- Sub-Phase 3.6: Frontend Client State Alignment ---');
  const setupFilePath = path.resolve(__dirname, '../../../client/src/pages/InterviewSetup.jsx');
  assert(fs.existsSync(setupFilePath), 'InterviewSetup.jsx file exists');

  const setupCode = fs.readFileSync(setupFilePath, 'utf8');
  assert(setupCode.includes('FALLBACK_ROLE_GROUPS'), 'InterviewSetup.jsx defines FALLBACK_ROLE_GROUPS');
  assert(setupCode.includes('ROLE_SUGGESTIONS'), 'InterviewSetup.jsx defines ROLE_SUGGESTIONS');
  assert(setupCode.includes('catalogRoleSuggestions'), 'InterviewSetup.jsx tracks dynamic catalogRoleSuggestions state');
  assert(setupCode.includes('suggestedSubjects'), 'InterviewSetup.jsx computes suggestedSubjects');
  assert(setupCode.includes('selectedDiscipline'), 'InterviewSetup.jsx implements selectedDiscipline filter');
  assert(setupCode.includes('roleSearchQuery'), 'InterviewSetup.jsx implements roleSearchQuery live search');

  // Final Summary
  console.log('\n============================================================');
  console.log(`TOTAL PASSES: ${passes}`);
  console.log(`TOTAL FAILS : ${fails}`);
  console.log('============================================================\n');

  if (fails > 0) {
    console.error(`Validation Failed with ${fails} errors.`);
    process.exit(1);
  } else {
    console.log('SUCCESS: Phase 3 (All Major Job Roles) validation passed completely!');
    process.exit(0);
  }
}

runPhase3Verification().catch(err => {
  console.error('Unexpected error running Phase 3 verification:', err);
  process.exit(1);
});
