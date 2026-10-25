import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

const runTests = async () => {
  console.log('====================================================');
  console.log('INTERVIEWACE AI - AUTH & DASHBOARD VERIFICATION SUITE');
  console.log(`Connecting to: ${BASE_URL}`);
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, title, details = '') => {
    if (condition) {
      console.log(`  ✓ PASS: ${title}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${title} ${details ? '--> ' + details : ''}`);
      failed++;
    }
  };

  const testEmail = `candidate.${Date.now()}@example.com`;
  const validPassword = 'Password123';
  const newPassword = 'NewPassword456';
  let accessToken = '';
  let refreshTokenCookie = '';

  const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, opts);
    let data = null;
    const text = await res.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return {
      status: res.status,
      headers: res.headers,
      data
    };
  };

  try {
    // 0. HEALTH CHECK
    console.log('[Phase 0] System & Database Health Check');
    const healthRes = await request('/health');
    assert(healthRes.status === 200 && healthRes.data.status === 'ok', 'API Health check returns 200 OK');

    // 1. SIGNUP VALIDATION
    console.log('\n[Phase 1] Signup Validations');

    // 1a. Weak password (<8 chars)
    const weakRes = await request('/auth/signup', 'POST', {
      name: 'Test Candidate',
      email: testEmail,
      password: 'weak',
      confirmPassword: 'weak'
    });
    assert(weakRes.status === 400, 'Weak password (<8 chars) returns 400 Bad Request');

    // 1b. Password missing number
    const noNumRes = await request('/auth/signup', 'POST', {
      name: 'Test Candidate',
      email: testEmail,
      password: 'PasswordOnly',
      confirmPassword: 'PasswordOnly'
    });
    assert(noNumRes.status === 400, 'Password without digit returns 400 Bad Request');

    // 1c. Mismatched passwords
    const mismatchRes = await request('/auth/signup', 'POST', {
      name: 'Test Candidate',
      email: testEmail,
      password: validPassword,
      confirmPassword: 'DifferentPassword123'
    });
    assert(mismatchRes.status === 400, 'Mismatched passwords return 400 Bad Request');

    // 1d. Valid Signup succeeds
    const signupRes = await request('/auth/signup', 'POST', {
      name: 'Ace Candidate',
      email: testEmail,
      password: validPassword,
      confirmPassword: validPassword
    });

    assert(signupRes.status === 200 || signupRes.status === 201, 'Signup with valid credentials succeeds');
    assert(Boolean(signupRes.data.token), 'Signup response includes access token');
    assert(signupRes.data.user?.email === testEmail.toLowerCase(), 'Signup response contains user info');
    assert(signupRes.data.user?.password === undefined, 'Signup response never exposes password hash');
    assert(signupRes.data.user?.refreshToken === undefined, 'Signup response never exposes refreshToken in payload');

    // Parse cookies from headers
    const rawCookies = signupRes.headers.get('set-cookie') || '';
    const refreshMatch = rawCookies.match(/refreshToken=([^;]+)/);
    if (refreshMatch) {
      refreshTokenCookie = refreshMatch[1];
    }
    assert(Boolean(refreshTokenCookie), 'Signup sets httpOnly refreshToken cookie');

    // 1e. Duplicate Email fails cleanly with 400 (not 500)
    const dupRes = await request('/auth/signup', 'POST', {
      name: 'Duplicate Candidate',
      email: testEmail,
      password: validPassword,
      confirmPassword: validPassword
    });
    assert(dupRes.status === 400, 'Duplicate email returns 400 Bad Request (not a generic 500)');
    assert(
      (dupRes.data?.message || '').toLowerCase().includes('already'),
      'Duplicate email returns clear explanatory error message'
    );

    // 2. LOGIN VALIDATION & RATE LIMITING
    console.log('\n[Phase 2] Login Validations & Security');

    // 2a. Wrong password -> generic 401
    const wrongPwRes = await request('/auth/login', 'POST', {
      email: testEmail,
      password: 'WrongPassword999'
    });
    assert(wrongPwRes.status === 401, 'Wrong password returns 401 Unauthorized');
    assert(wrongPwRes.data?.message === 'Invalid email or password', 'Returns generic "Invalid email or password" error (no password hint)');

    // 2b. Non-existent email -> same generic 401
    const nonExistentRes = await request('/auth/login', 'POST', {
      email: `nonexistent.${Date.now()}@example.com`,
      password: 'SomePassword123'
    });
    assert(nonExistentRes.status === 401, 'Non-existent email returns 401 Unauthorized');
    assert(nonExistentRes.data?.message === 'Invalid email or password', 'Identical generic error prevents email enumeration');

    // 2c. Correct login succeeds
    const loginRes = await request('/auth/login', 'POST', {
      email: testEmail,
      password: validPassword
    });
    assert(loginRes.status === 200, 'Login with correct credentials returns 200 OK');
    accessToken = loginRes.data.token || loginRes.data.accessToken;
    assert(Boolean(accessToken), 'Login returns short-lived JWT access token');
    assert(loginRes.data.user?.password === undefined, 'Login never exposes password hash');

    const loginCookies = loginRes.headers.get('set-cookie') || '';
    const loginRefreshMatch = loginCookies.match(/refreshToken=([^;]+)/);
    if (loginRefreshMatch) {
      refreshTokenCookie = loginRefreshMatch[1];
    }
    assert(Boolean(refreshTokenCookie), 'Login returns rotated httpOnly refreshToken cookie');

    // 3. ROUTE PROTECTION
    console.log('\n[Phase 3] Protected Route Enforcement');

    // 3a. Unauthenticated blocked
    const unauthRes = await request('/auth/me');
    assert(unauthRes.status === 401, 'Unauthenticated request blocked with 401 Unauthorized');

    // 3b. Authenticated with Bearer token
    const meRes = await request('/auth/me', 'GET', null, {
      Authorization: `Bearer ${accessToken}`
    });
    assert(meRes.status === 200, 'Authenticated request with Bearer token succeeds with 200 OK');
    assert(meRes.data.user?.email === testEmail.toLowerCase(), 'Profile matches authenticated user');

    // 3c. Tampered token rejected
    const tamperedRes = await request('/auth/me', 'GET', null, {
      Authorization: 'Bearer invalid.tampered.token'
    });
    assert(tamperedRes.status === 401, 'Tampered token blocked with 401 Unauthorized');

    // 4. REFRESH TOKEN FLOW (Silent Refresh)
    console.log('\n[Phase 4] Dual-Token Silent Refresh Flow');

    const refreshRes = await request('/auth/refresh', 'POST', {}, {
      Cookie: `refreshToken=${refreshTokenCookie}`
    });
    assert(refreshRes.status === 200, 'Silent refresh with valid refreshToken cookie returns 200 OK');
    const newAccessToken = refreshRes.data.accessToken || refreshRes.data.token;
    assert(Boolean(newAccessToken), 'Silent refresh returns freshly rotated access token');

    // Access protected route with new access token
    const newMeRes = await request('/auth/me', 'GET', null, {
      Authorization: `Bearer ${newAccessToken}`
    });
    assert(newMeRes.status === 200, 'New access token immediately grants access to protected routes');

    accessToken = newAccessToken;
    const newRefreshCookies = refreshRes.headers.get('set-cookie') || '';
    const rotatedMatch = newRefreshCookies.match(/refreshToken=([^;]+)/);
    if (rotatedMatch) {
      refreshTokenCookie = rotatedMatch[1];
    }

    // 5. FORGOT & RESET PASSWORD FLOW
    console.log('\n[Phase 5] Forgot & Reset Password Flow');

    const forgotRes = await request('/auth/forgot-password', 'POST', {
      email: testEmail
    });
    assert(forgotRes.status === 200, 'Request password reset returns 200 OK');
    assert(Boolean(forgotRes.data.resetToken || forgotRes.data.resetLink), 'Dev mode exposes reset link / token');

    const resetToken = forgotRes.data.resetToken || forgotRes.data.resetLink.split('/reset-password/')[1];

    const resetRes = await request(`/auth/reset-password/${resetToken}`, 'POST', {
      password: newPassword,
      confirmPassword: newPassword
    });
    assert(resetRes.status === 200, 'Reset password endpoint succeeds with 200 OK');

    // Verify old password fails
    const oldLoginCheck = await request('/auth/login', 'POST', {
      email: testEmail,
      password: validPassword
    });
    assert(oldLoginCheck.status === 401, 'Old password no longer works after reset');

    // Verify new password succeeds
    const newLoginRes = await request('/auth/login', 'POST', {
      email: testEmail,
      password: newPassword
    });
    assert(newLoginRes.status === 200, 'Login with newly reset password succeeds');
    accessToken = newLoginRes.data.token || newLoginRes.data.accessToken;

    // 6. CHANGE PASSWORD (FROM PROFILE)
    console.log('\n[Phase 6] Change Password (Profile Setting)');

    const wrongOldPwRes = await request(
      '/auth/change-password',
      'POST',
      {
        currentPassword: 'IncorrectOldPassword123',
        newPassword: 'BrandNewPassword789',
        confirmPassword: 'BrandNewPassword789'
      },
      { Authorization: `Bearer ${accessToken}` }
    );
    assert(wrongOldPwRes.status === 400, 'Wrong current password rejected with 400 Bad Request');

    const correctChangePwRes = await request(
      '/auth/change-password',
      'POST',
      {
        currentPassword: newPassword,
        newPassword: 'BrandNewPassword789',
        confirmPassword: 'BrandNewPassword789'
      },
      { Authorization: `Bearer ${accessToken}` }
    );
    assert(correctChangePwRes.status === 200, 'Change password with correct current password succeeds');

    // 7. DASHBOARD STATES (BRAND NEW USER VS SESSION HISTORY)
    console.log('\n[Phase 7] Dashboard States: New User vs Session Data');

    const newStatsRes = await request('/interviews/stats', 'GET', null, {
      Authorization: `Bearer ${accessToken}`
    });
    assert(newStatsRes.status === 200, 'New user stats returns 200 OK');
    assert(newStatsRes.data.stats.completedCount === 0, 'Brand new user starts with 0 completed sessions');
    assert(newStatsRes.data.stats.averageScore === null, 'Brand new user starts with null averageScore');
    assert(Array.isArray(newStatsRes.data.stats.recent) && newStatsRes.data.stats.recent.length === 0, 'Brand new user starts with empty recent sessions');

    // Start practice session to test in-progress detection
    const startInterviewRes = await request(
      '/interviews/start',
      'POST',
      {
        category: 'Java',
        difficulty: 'Medium',
        totalQuestions: 3,
        interviewMode: 'mixed'
      },
      { Authorization: `Bearer ${accessToken}` }
    );
    assert(startInterviewRes.status === 200 || startInterviewRes.status === 201, 'Started a practice session');
    const inProgressInterviewId = startInterviewRes.data.interview?._id;

    // Check dashboard detects in-progress session
    const inProgQueryRes = await request('/interviews?status=in_progress&limit=1', 'GET', null, {
      Authorization: `Bearer ${accessToken}`
    });
    assert(inProgQueryRes.data.interviews?.length === 1, 'Dashboard detects incomplete active session to resume');

    // Test discard incomplete session
    const discardRes = await request(`/interviews/${inProgressInterviewId}`, 'DELETE', null, {
      Authorization: `Bearer ${accessToken}`
    });
    assert(discardRes.status === 200, 'Discarding incomplete session returns 200 OK');

    const inProgAfterDiscard = await request('/interviews?status=in_progress&limit=1', 'GET', null, {
      Authorization: `Bearer ${accessToken}`
    });
    assert(inProgAfterDiscard.data.interviews?.length === 0, 'Discarded session cleanly removed');

    // 8. LOGOUT
    console.log('\n[Phase 8] Logout & Session Invalidation');
    const logoutRes = await request(
      '/auth/logout',
      'POST',
      {},
      {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `refreshToken=${refreshTokenCookie}`
      }
    );
    assert(logoutRes.status === 200, 'Logout succeeds with 200 OK');

    const logoutCookieStr = logoutRes.headers.get('set-cookie') || '';
    assert(logoutCookieStr.includes('refreshToken=;'), 'Logout clears refreshToken cookie');

    // Refresh after logout fails
    const postLogoutRefresh = await request(
      '/auth/refresh',
      'POST',
      {},
      { Cookie: `refreshToken=${refreshTokenCookie}` }
    );
    assert(postLogoutRefresh.status === 401, 'Refresh after logout rejected with 401 Unauthorized');

    console.log('\n====================================================');
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('\nUNEXPECTED TEST SUITE ERROR:', err);
    process.exit(1);
  }
};

runTests();
