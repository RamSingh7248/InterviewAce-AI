import { allCodingProblems } from '../data/codingProblems/index.js';

function executeJavaScriptSolution(solutionCode, input) {
  // Wrap solve function and call it with input
  const runner = new Function(
    'input',
    `
    ${solutionCode}
    return solve(input);
    `
  );
  const out = runner(input);
  return String(out !== undefined ? out : '').trim();
}

async function verifyAllSolutions() {
  console.log(`=======================================================`);
  console.log(`VERIFYING ALL ${allCodingProblems.length} CODING PROBLEM REFERENCE SOLUTIONS`);
  console.log(`=======================================================\n`);

  let totalTests = 0;
  let passedTests = 0;
  let failedProblems = [];

  for (let i = 0; i < allCodingProblems.length; i++) {
    const prob = allCodingProblems[i];
    const jsSol = prob.referenceSolution?.javascript;
    if (!jsSol) {
      console.error(`❌ Problem #${i + 1} (${prob.slug}) has no JavaScript reference solution!`);
      failedProblems.push({ slug: prob.slug, reason: 'Missing JS reference solution' });
      continue;
    }

    const allTests = [
      ...(prob.sampleTestCases || []).map((t, idx) => ({ ...t, kind: `sample #${idx + 1}` })),
      ...(prob.hiddenTestCases || []).map((t, idx) => ({ ...t, kind: `hidden #${idx + 1}` }))
    ];

    let probPassed = true;

    for (const test of allTests) {
      totalTests++;
      try {
        const actual = executeJavaScriptSolution(jsSol, test.input);
        const expected = String(test.expectedOutput).trim();

        if (actual !== expected) {
          probPassed = false;
          console.error(`❌ [${prob.slug}] Test ${test.kind} failed!`);
          console.error(`   Input:    ${JSON.stringify(test.input)}`);
          console.error(`   Expected: ${JSON.stringify(expected)}`);
          console.error(`   Actual:   ${JSON.stringify(actual)}`);
          failedProblems.push({
            slug: prob.slug,
            kind: test.kind,
            expected,
            actual
          });
          break;
        } else {
          passedTests++;
        }
      } catch (err) {
        probPassed = false;
        console.error(`❌ [${prob.slug}] Exception on ${test.kind}:`, err.message);
        failedProblems.push({ slug: prob.slug, reason: err.message });
        break;
      }
    }

    if (probPassed) {
      console.log(`✓ [${i + 1}/${allCodingProblems.length}] ${prob.title} (${prob.difficulty}) - ${allTests.length} tests passed`);
    }
  }

  console.log(`\n-------------------------------------------------------`);
  console.log(`RESULTS: ${passedTests}/${totalTests} tests passed.`);
  if (failedProblems.length === 0) {
    console.log(`✅ ALL ${allCodingProblems.length} REFERENCE SOLUTIONS VERIFIED 100% CORRECT!`);
    console.log(`-------------------------------------------------------\n`);
    return true;
  } else {
    console.error(`❌ ${failedProblems.length} problems failed verification!`);
    console.log(`-------------------------------------------------------\n`);
    return false;
  }
}

const success = await verifyAllSolutions();
if (!success) {
  process.exit(1);
}
