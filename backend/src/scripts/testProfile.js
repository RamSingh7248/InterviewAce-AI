/**
 * Profile API & Security Verification Suite
 * Tests Profile retrieval, updates, validation, privilege protection, and persistence.
 */

const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('====================================================');
  console.log('   INTERVIEWACE AI - PROFILE & USER API TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`  [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${description}`);
      failed++;
    }
  };

  try {
    // 1. Create candidate user
    const testEmail = `profile_test_${Date.now()}@example.com`;
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Rivera',
        email: testEmail,
        password: 'Password123!'
      })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201, `Candidate created (${testEmail})`);
    const token = signupData.token;

    // 2. Fetch authenticated profile
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'GET /api/auth/me returns HTTP 200');
    assert(meData.user?.name === 'Alex Rivera', 'Profile name matches');
    assert(meData.user?.email === testEmail, 'Profile email matches');
    assert(!meData.user?.password, 'Password hash is securely omitted');

    // 3. Unauthenticated update attempt must be rejected (401)
    const unauthUpdateRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Hacker' })
    });
    assert(unauthUpdateRes.status === 401, 'Unauthenticated PATCH /api/auth/profile rejected with 401');

    // 4. Invalid input validation
    const invalidYearRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ graduationYear: 'abcd' })
    });
    assert(invalidYearRes.status === 400, 'Invalid graduation year ("abcd") rejected with 400');

    const invalidNameRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: ' ' })
    });
    assert(invalidNameRes.status === 400, 'Empty name rejected with 400');

    // 5. Successful Profile Update
    const updateRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Alexandre Rivera',
        phoneNumber: '+1 555-0199',
        college: 'Massachusetts Institute of Technology',
        graduationYear: '2026',
        preferences: {
          targetRole: 'Full Stack Developer',
          preferredDifficulty: 'Hard',
          preferredCategories: ['React', 'Node.js', 'System Design'],
          preferredQuestionCount: 7
        }
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, 'PATCH /api/auth/profile updates profile with HTTP 200');
    assert(updateData.user?.name === 'Alexandre Rivera', 'Updated full name persisted');
    assert(updateData.user?.phoneNumber === '+1 555-0199', 'Phone number persisted');
    assert(updateData.user?.college === 'Massachusetts Institute of Technology', 'College persisted');
    assert(updateData.user?.graduationYear === '2026', 'Graduation year persisted');
    assert(updateData.user?.preferences?.targetRole === 'Full Stack Developer', 'Target role persisted');
    assert(updateData.user?.preferences?.preferredDifficulty === 'Hard', 'Preferred difficulty persisted');
    assert(updateData.user?.preferences?.preferredQuestionCount === 7, 'Preferred question count persisted');

    // 6. Verify changes persist on fresh GET /api/auth/me
    const verifyRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const verifyData = await verifyRes.json();
    assert(verifyData.user?.name === 'Alexandre Rivera', 'Verified saved name in database');
    assert(verifyData.user?.college === 'Massachusetts Institute of Technology', 'Verified saved college in database');
    assert(verifyData.user?.preferences?.targetRole === 'Full Stack Developer', 'Verified saved preferences in database');

    console.log('\n====================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('\n[PROFILE TEST ERROR]', err);
    process.exit(1);
  }
};

runTests();
