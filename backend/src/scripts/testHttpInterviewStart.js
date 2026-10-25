async function testHttpStart() {
  console.log('Testing HTTP POST http://localhost:5001/api/interviews/start ...');

  // 1. Login to get token
  const loginRes = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'Password123!'
    })
  });

  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken;
  if (!token) {
    throw new Error('Failed to obtain auth token: ' + JSON.stringify(loginData));
  }
  console.log('Login successful, token acquired');

  // 2. Start Java Interview (The exact Bug 1 config)
  console.log('\nTesting Bug 1 Java Configuration...');
  const javaRes = await fetch('http://localhost:5001/api/interviews/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      category: 'Java',
      difficulty: 'Medium',
      totalQuestions: 5,
      topic: '',
      targetRole: 'Software Engineer',
      experienceLevel: 'fresher',
      interviewMode: 'mixed',
      companyStyle: 'General Tech',
      language: 'en-US'
    })
  });

  const javaData = await javaRes.json();
  console.log('Java Start Status:', javaData.status);
  console.log('Interview ID:', javaData.interview?._id);
  console.log('Total Questions in Session:', javaData.interview?.questions?.length);
  if (javaData.interview?.questions?.length !== 5) {
    throw new Error(`Expected 5 questions, got ${javaData.interview?.questions?.length}: ${JSON.stringify(javaData)}`);
  }

  // 3. Start a second interview with another category (e.g. Docker & Kubernetes)
  console.log('\nTesting Docker & Kubernetes Configuration...');
  const dockerRes = await fetch('http://localhost:5001/api/interviews/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      category: 'Docker & Kubernetes',
      difficulty: 'Hard',
      totalQuestions: 3,
      topic: '',
      targetRole: 'DevOps Engineer',
      experienceLevel: 'mid',
      interviewMode: 'mixed',
      companyStyle: 'Startup',
      language: 'en-US'
    })
  });

  const dockerData = await dockerRes.json();
  console.log('Docker Start Status:', dockerData.status);
  console.log('Interview ID:', dockerData.interview?._id);
  console.log('Total Questions in Session:', dockerData.interview?.questions?.length);
  if (dockerData.interview?.questions?.length !== 3) {
    throw new Error(`Expected 3 questions, got ${dockerData.interview?.questions?.length}`);
  }

  // 4. Start a third interview with alias / casing variation (e.g. 'c++')
  console.log('\nTesting C++ alias / lowercase Configuration...');
  const cppRes = await fetch('http://localhost:5001/api/interviews/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      category: 'cpp',
      difficulty: 'Easy',
      totalQuestions: 5,
      topic: '',
      targetRole: 'Embedded Engineer',
      experienceLevel: 'fresher',
      interviewMode: 'mixed',
      companyStyle: 'General Tech',
      language: 'hi-IN'
    })
  });

  const cppData = await cppRes.json();
  console.log('C++ Start Status:', cppData.status);
  console.log('Category Normalized To:', cppData.interview?.category);
  console.log('Interview ID:', cppData.interview?._id);
  console.log('Total Questions in Session:', cppData.interview?.questions?.length);
  if (cppData.interview?.questions?.length !== 5) {
    throw new Error(`Expected 5 questions, got ${cppData.interview?.questions?.length}`);
  }

  console.log('\n>>> ALL HTTP INTERVIEW START TESTS PASSED SUCCESSFULLY! <<<');
}

testHttpStart().catch(err => {
  console.error('HTTP Test Failed:', err.message);
  process.exit(1);
});
