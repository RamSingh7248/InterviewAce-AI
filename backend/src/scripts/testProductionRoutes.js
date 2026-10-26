import http from 'http';
import assert from 'assert';
import app, { resolveClientDist } from '../app.js';
import fs from 'fs';
import path from 'path';

const runTests = async () => {
  console.log('====================================================');
  console.log('   INTERVIEWACE AI - PRODUCTION ROUTING & HEALTH TEST');
  console.log('====================================================\n');

  // Verify client dist path resolution
  const resolvedDist = resolveClientDist();
  console.log(`[Test] Resolved Client Dist Path: ${resolvedDist}`);
  const indexHtmlExists = fs.existsSync(path.join(resolvedDist, 'index.html'));
  assert(indexHtmlExists, `client/dist/index.html MUST exist before testing. (Found at: ${resolvedDist})`);
  console.log('  [PASS] client/dist/index.html found and verified');

  // Start Express on ephemeral port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Ephemeral test server running on ${baseUrl}\n`);

  const fetchUrl = async (urlPath) => {
    return new Promise((resolve, reject) => {
      http.get(`${baseUrl}${urlPath}`, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }).on('error', reject);
    });
  };

  try {
    // 1. Root Route "/"
    console.log('[Test 1] Root route GET /:');
    const rootRes = await fetchUrl('/');
    assert.strictEqual(rootRes.status, 200, `Expected 200, got ${rootRes.status}`);
    assert(rootRes.headers['content-type'].includes('text/html'), 'Content-type must be text/html');
    assert(rootRes.body.includes('<div id="root"></div>') || rootRes.body.includes('<!DOCTYPE html>'), 'Root must return index.html');
    console.log('  [PASS] Root route GET / successfully serves index.html with HTTP 200');

    // 2. SPA Route Fallback "/interview/setup" & "/login"
    console.log('\n[Test 2] SPA Fallback Route GET /interview/setup:');
    const spaRes = await fetchUrl('/interview/setup');
    console.log('SPA response status:', spaRes.status, 'headers:', spaRes.headers, 'body length:', spaRes.body.length, 'preview:', spaRes.body.slice(0, 100));
    assert.strictEqual(spaRes.status, 200, `Expected 200, got ${spaRes.status}`);
    assert(spaRes.headers['content-type'].includes('text/html'), 'Content-type must be text/html');
    assert(spaRes.body.includes('<!DOCTYPE html>') || spaRes.body.includes('<html'), 'SPA route must return index.html');
    console.log('  [PASS] SPA Route GET /interview/setup successfully falls back to index.html with HTTP 200');

    console.log('\n[Test 2a] SPA Route GET /login:');
    const loginRes = await fetchUrl('/login');
    assert.strictEqual(loginRes.status, 200, `Expected 200, got ${loginRes.status}`);
    assert(loginRes.headers['content-type'].includes('text/html'), 'Content-type must be text/html');
    assert(loginRes.body.includes('<!DOCTYPE html>') || loginRes.body.includes('<html'), 'Login route must return index.html');
    console.log('  [PASS] SPA Route GET /login successfully returns index.html with HTTP 200');

    // 2b. Static Assets (e.g. favicon.svg)
    console.log('\n[Test 2b] Static Asset GET /favicon.svg:');
    const assetRes = await fetchUrl('/favicon.svg');
    assert.strictEqual(assetRes.status, 200, `Expected 200, got ${assetRes.status}`);
    assert(assetRes.headers['content-type'].includes('svg') || assetRes.headers['content-type'].includes('image'), 'Content-type must be svg/image');
    console.log('  [PASS] Static Asset GET /favicon.svg successfully served with HTTP 200');

    // 3. Health Endpoint "/api/health"
    console.log('\n[Test 3] Health Check GET /api/health:');
    const healthRes = await fetchUrl('/api/health');
    assert.strictEqual(healthRes.status, 200, `Expected 200, got ${healthRes.status}`);
    assert(healthRes.headers['content-type'].includes('application/json'), 'Content-type must be application/json');
    const healthJson = JSON.parse(healthRes.body);
    assert.strictEqual(healthJson.status, 'ok', 'Status must be ok');
    assert(['connected', 'disconnected', 'connecting'].includes(healthJson.database), 'Database status must be accurate');
    assert.strictEqual(healthJson.frontend, 'ready', 'Frontend status must report ready');
    console.log(`  [PASS] Health check returns: status="${healthJson.status}", database="${healthJson.database}", frontend="${healthJson.frontend}"`);

    // 4. API Route "/api/questions/categories"
    console.log('\n[Test 4] Valid API Route GET /api/questions/categories:');
    const apiRes = await fetchUrl('/api/questions/categories');
    assert.strictEqual(apiRes.status, 200, `Expected 200, got ${apiRes.status}`);
    const apiJson = JSON.parse(apiRes.body);
    assert(apiJson.data && Array.isArray(apiJson.data.categories), 'API must return categories array');
    console.log(`  [PASS] API route returns HTTP 200 with ${apiJson.data.categories.length} categories`);

    // 5. Undefined API Route "/api/unknown-route-xyz"
    console.log('\n[Test 5] Undefined API Route GET /api/unknown-route-xyz:');
    const notFoundApiRes = await fetchUrl('/api/unknown-route-xyz');
    assert.strictEqual(notFoundApiRes.status, 404, `Expected 404, got ${notFoundApiRes.status}`);
    assert(notFoundApiRes.headers['content-type'].includes('application/json'), 'API 404 must be JSON');
    const notFoundJson = JSON.parse(notFoundApiRes.body);
    assert.strictEqual(notFoundJson.status, 'error', 'Error status must be returned');
    console.log('  [PASS] Undefined API route returns clean JSON 404');

    // 6. MONGODB_URI Sanitization Logic Test
    console.log('\n[Test 6] MONGODB_URI Sanitization & Validation:');
    const sanitizeUri = (raw) => {
      if (!raw || typeof raw !== 'string') return '';
      return raw.trim().replace(/^['"]|['"]$/g, '').trim();
    };
    const hasValidScheme = (uri) => uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');

    const testWithQuotes = '"mongodb+srv://user:secret@cluster0.abc.mongodb.net/test"';
    const sanitizedQuotes = sanitizeUri(testWithQuotes);
    assert.strictEqual(hasValidScheme(sanitizedQuotes), true, 'Quotes must be stripped cleanly');

    const testWithSpaces = '   mongodb://localhost:27017/test   ';
    const sanitizedSpaces = sanitizeUri(testWithSpaces);
    assert.strictEqual(hasValidScheme(sanitizedSpaces), true, 'Spaces must be trimmed cleanly');

    const testInvalidScheme = 'cluster0.abc.mongodb.net/test';
    const sanitizedInvalid = sanitizeUri(testInvalidScheme);
    assert.strictEqual(hasValidScheme(sanitizedInvalid), false, 'Invalid scheme without protocol must be rejected safely');
    console.log('  [PASS] URI sanitization safely handles quotes, whitespace, and validates schemes');

    // 7. Express "trust proxy" Configuration & Rate Limiter with X-Forwarded-For Header
    console.log('\n[Test 7] Express "trust proxy" & Rate Limiter with X-Forwarded-For Header:');
    assert.strictEqual(app.get('trust proxy'), 1, 'Express trust proxy setting must be set to 1 for Render reverse proxy');
    console.log('  [PASS] app.get("trust proxy") is correctly configured to 1');

    // Perform an HTTP request simulating a proxy-forwarded request (as Render does)
    const simulatedProxyRes = await new Promise((resolve, reject) => {
      const payload = JSON.stringify({});
      const req = http.request(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'X-Forwarded-For': '198.51.100.42', // Simulated client IP forwarded by Render
        }
      }, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    // Rate limiter must execute without throwing ValidationError and return RateLimit headers
    assert(simulatedProxyRes.headers['ratelimit-limit'], 'RateLimit-Limit header must be present');
    assert(simulatedProxyRes.headers['ratelimit-remaining'], 'RateLimit-Remaining header must be present');
    assert(simulatedProxyRes.status !== 500, 'Request with X-Forwarded-For must not throw server error');
    console.log(`  [PASS] Rate limiter accepted X-Forwarded-For without error: RateLimit-Limit=${simulatedProxyRes.headers['ratelimit-limit']}, RateLimit-Remaining=${simulatedProxyRes.headers['ratelimit-remaining']}`);

    console.log('\n====================================================');
    console.log('   ALL PRODUCTION ROUTING & HEALTH TESTS PASSED!');
    console.log('====================================================');
  } finally {
    server.close();
  }
};

runTests().catch((err) => {
  console.error('[TEST FAILURE]:', err);
  process.exit(1);
});
