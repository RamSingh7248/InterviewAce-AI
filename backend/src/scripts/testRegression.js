/**
 * InterviewAce AI - Complete Regression Test Suite
 * Tests Question Bank APIs, Filters, Protection, Seeding, Deduplication, and Session Flows.
 */

import http from 'http';
import mongoose from 'mongoose';
import app from '../app.js';
import { connectDB } from '../config/database.js';

const runTests = async () => {
  console.log('====================================================');
  console.log('   INTERVIEWACE AI - REGRESSION TEST SUITE');
  console.log('====================================================\n');

  // Attempt DB connection if configured
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.log('[INFO] Database offline or skipped:', err.message);
  }

  // Start Express on ephemeral port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const BASE_URL = `http://127.0.0.1:${port}/api`;
  console.log(`Ephemeral test server active on ${BASE_URL}\n`);

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
    // 1. Health Endpoint
    console.log('[Test Group 1] Health & System Status:');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health endpoint responds with HTTP 200');
    assert(healthData.status === 'ok', 'Health status is "ok"');

    // 2. Categories Endpoint
    console.log('\n[Test Group 2] Categories & Languages Catalog:');
    const catRes = await fetch(`${BASE_URL}/questions/categories`);
    const catData = await catRes.json();
    assert(catRes.status === 200, 'GET /api/questions/categories returns HTTP 200');
    
    // Core categories check
    const core11 = ['Java', 'DSA', 'SQL/DBMS', 'JavaScript', 'React', 'Node.js', 'Full Stack', 'OOP', 'Computer Networks', 'Operating Systems', 'System Design'];
    const returnedCatIds = (catData.data?.categories || []).map(c => c.id);
    const hasAllCore11 = core11.every(id => returnedCatIds.includes(id));
    assert(hasAllCore11, 'All 11 original core technical categories are preserved');
    
    // 18 Programming languages check
    const languages = catData.data?.languages || [];
    assert(Array.isArray(languages) && languages.length === 18, `All 18 core programming languages are present (found ${languages.length})`);
    const langIds = languages.map(l => l.id);
    const requiredLangs = ['Java', 'Python', 'C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Go', 'Ruby', 'PHP', 'Kotlin', 'Swift', 'Rust', 'Dart', 'R', 'Scala', 'Perl', 'Bash'];
    const hasAll18Langs = requiredLangs.every(id => langIds.includes(id));
    assert(hasAll18Langs, 'All 18 required languages (Java, Python, C, C++, C#, JS, TS, Go, Ruby, PHP, Kotlin, Swift, Rust, Dart, R, Scala, Perl, Bash) exist');

    // Phase 3: All Major Job Roles Check
    const targetRoles = catData.data?.targetRoles || [];
    assert(Array.isArray(targetRoles) && targetRoles.length >= 60, `Target roles catalog contains 60+ roles (found ${targetRoles.length})`);
    
    const roleGroups = catData.data?.roleGroups || [];
    assert(Array.isArray(roleGroups) && roleGroups.length === 6, `Role groups contain 6 engineering disciplines (found ${roleGroups.length})`);
    const groupIds = roleGroups.map(g => g.id);
    const expectedDisciplines = [
      'software_development',
      'data_and_ai',
      'cloud_and_devops',
      'quality_and_security',
      'product_and_business',
      'architecture_and_leadership'
    ];
    const hasAllDisciplines = expectedDisciplines.every(id => groupIds.includes(id));
    assert(hasAllDisciplines, 'All 6 job role disciplines are present');

    // Representative cross-discipline role verification
    const sampleRoles = [
      'Software Development Engineer (SDE-1)',
      'Data Analyst',
      'Machine Learning Engineer',
      'Site Reliability Engineer (SRE)',
      'Security Engineer',
      'Technical Product Manager',
      'Software Architect'
    ];
    const hasSampleRoles = sampleRoles.every(role => targetRoles.includes(role));
    assert(hasSampleRoles, 'Representative cross-discipline roles (SDE, Data Analyst, ML, SRE, Security, PM, Architect) are verified');

    assert(Array.isArray(catData.data?.interviewModes) && catData.data.interviewModes.length >= 6, 'Interview modes are present');

    // Phase 2: Major Technical Subjects check
    const subjects = catData.data?.subjects || [];
    assert(Array.isArray(subjects) && subjects.length >= 35, `Major technical subjects catalog contains 35+ disciplines (found ${subjects.length})`);
    const subjectIds = subjects.map(s => s.id);
    const keyPhase2Subjects = [
      'DSA', 'OOP', 'SQL/DBMS', 'Operating Systems', 'Computer Networks',
      'Software Engineering', 'System Design', 'Design Patterns', 'REST APIs',
      'Competitive Programming', 'Git & Version Control', 'Testing & QA',
      'Software Architecture', 'Distributed Systems', 'Microservices',
      'Web Security', 'Performance & Optimization', 'Cloud Computing',
      'DevOps', 'Docker & Kubernetes', 'Linux & Shell Scripting',
      'Networking & Infrastructure', 'Data Engineering', 'Data Analytics',
      'AI & Machine Learning', 'Deep Learning', 'Generative AI & LLMs',
      'Prompt Engineering', 'Vector DB & RAG', 'MLOps', 'Big Data',
      'Cybersecurity', 'Blockchain', 'Mobile Development', 'Accessibility & Performance'
    ];
    const hasAllKeySubjects = keyPhase2Subjects.every(id => subjectIds.includes(id));
    assert(hasAllKeySubjects, 'All major Phase 2 technical subjects are registered in catalog');

    // 3. Topics Endpoint for Languages and Subjects
    console.log('\n[Test Group 3] Topics Filtering by Category & Language:');
    const topicsRes = await fetch(`${BASE_URL}/questions/topics?category=React`);
    const topicsData = await topicsRes.json();
    assert(topicsRes.status === 200, 'GET /api/questions/topics?category=React returns HTTP 200');
    assert(Array.isArray(topicsData.topics) && topicsData.topics.length > 0, 'React topics list is populated');

    // Test Python topics from Language Catalog
    const pythonTopicsRes = await fetch(`${BASE_URL}/questions/topics?category=Python`);
    const pythonTopicsData = await pythonTopicsRes.json();
    assert(pythonTopicsRes.status === 200, 'GET /api/questions/topics?category=Python returns HTTP 200');
    assert(Array.isArray(pythonTopicsData.topics) && pythonTopicsData.topics.length >= 8, 'Python language-specific topics list is populated');
    const hasGil = pythonTopicsData.topics.some(t => t.includes('GIL') || t.includes('Interpreter Lock'));
    assert(hasGil, 'Python catalog includes GIL & concurrency topics');

    // Test Vector DB & RAG topics
    const ragTopicsRes = await fetch(`${BASE_URL}/questions/topics?category=${encodeURIComponent('Vector DB & RAG')}`);
    const ragTopicsData = await ragTopicsRes.json();
    assert(ragTopicsRes.status === 200, 'GET /api/questions/topics?category=Vector DB & RAG returns HTTP 200');
    assert(Array.isArray(ragTopicsData.topics) && ragTopicsData.topics.length >= 5, 'Vector DB & RAG topics list is populated');
    const hasHnsw = ragTopicsData.topics.some(t => t.includes('HNSW') || t.includes('Vector Search'));
    assert(hasHnsw, 'Vector DB & RAG catalog includes HNSW & vector search topics');

    // Test DevOps topics
    const devopsTopicsRes = await fetch(`${BASE_URL}/questions/topics?category=DevOps`);
    const devopsTopicsData = await devopsTopicsRes.json();
    assert(devopsTopicsRes.status === 200, 'GET /api/questions/topics?category=DevOps returns HTTP 200');
    assert(Array.isArray(devopsTopicsData.topics) && devopsTopicsData.topics.length >= 5, 'DevOps topics list is populated');

    // 4. Questions Filtering & Search
    console.log('\n[Test Group 4] Question Filtering, Search & Reference Answer Protection:');
    const qListRes = await fetch(`${BASE_URL}/questions?category=Java&difficulty=Medium`);
    const qListData = await qListRes.json();
    assert(qListRes.status === 200, 'GET /api/questions?category=Java&difficulty=Medium returns HTTP 200');
    const questions = qListData.data?.questions || [];
    assert(questions.length > 0, `Retrieved ${questions.length} Java Medium questions`);
    // Verify answer protection
    const hasLeakedAnswer = questions.some(q => q.referenceAnswer || q.expectedKeyPoints);
    assert(!hasLeakedAnswer, 'Reference answers and expectedKeyPoints are securely stripped from candidate list');

    // Text search
    const searchRes = await fetch(`${BASE_URL}/questions?category=Computer Networks&topic=TCP`);
    const searchData = await searchRes.json();
    assert(searchRes.status === 200, 'Topic search on "TCP" returns HTTP 200');
    assert(searchData.data?.questions?.length > 0, 'Search matches relevant Computer Networks question');

    // 5. Question Generation / Curated Fallback
    console.log('\n[Test Group 5] Question Generation & Deduplication:');
    const genRes = await fetch(`${BASE_URL}/questions/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: 'DSA',
        difficulty: 'Easy',
        totalQuestions: 2
      })
    });
    const genData = await genRes.json();
    assert(genRes.status === 200, 'POST /api/questions/generate returns HTTP 200');
    assert(Array.isArray(genData.data?.questions) && genData.data.questions.length === 2, 'Generated/retrieved exact requested count (2 questions)');
    assert(genData.data?.questions[0]?.questionText !== genData.data?.questions[1]?.questionText, 'Returned questions are distinct (no duplicate questions)');

    // 6. User Auth & Session Flow (Live DB if available, otherwise API security check)
    console.log('\n[Test Group 6] Authentication & Session API Security:');
    if (mongoose.connection.readyState === 1) {
      const testEmail = `tester_${Date.now()}@example.com`;
      const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Interview Candidate',
          email: testEmail,
          password: 'Password123!'
        })
      });
      const signupData = await signupRes.json();
      assert(signupRes.status === 201, `Candidate signup succeeded (email: ${testEmail})`);

      const token = signupData.token;
      assert(!!token, 'Auth token received from registration');

      // Start an interview session via POST /api/interviews/start
      const startRes = await fetch(`${BASE_URL}/interviews/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: 'Java',
          difficulty: 'Easy',
          totalQuestions: 2,
          targetRole: 'Junior Software Engineer',
          interviewMode: 'conceptual',
          companyStyle: 'General Tech'
        })
      });

      const startData = await startRes.json();
      assert(startRes.status === 201, 'POST /api/interviews/start initializes session with HTTP 201');
      const interview = startData.interview;
      assert(!!interview?._id, 'Interview session ID was created');
      assert(interview?.questions?.length === 2, 'Session contains exactly 2 questions');
      assert(!interview?.questions[0]?.referenceAnswer, 'Active question 1 does NOT leak reference answer prior to submission');

      // Fetch session by ID
      const getSessionRes = await fetch(`${BASE_URL}/interviews/${interview._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const getSessionData = await getSessionRes.json();
      assert(getSessionRes.status === 200, 'GET /api/interviews/:id returns session with HTTP 200');
      assert(getSessionData.interview?.status === 'in_progress', 'Interview status is "in_progress"');

      // Submit answer to Question 1
      const answerRes = await fetch(`${BASE_URL}/interviews/${interview._id}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answer: 'The javac compiler translates source code (.java) into platform-neutral bytecode (.class), which the JVM ClassLoader subsystem loads into memory. The execution engine uses an interpreter for immediate startup and the JIT compiler to compile hot code into native machine code. Platform independence is achieved because standard bytecode runs on any OS having a platform-specific JVM implementation. Additionally, the == operator checks reference identity while .equals() compares semantic equality.'
        })
      });
      const answerData = await answerRes.json();
      assert(answerRes.status === 200, 'POST /api/interviews/:id/answer evaluates candidate answer with HTTP 200');
      assert(typeof answerData.evaluation?.score === 'number' && answerData.evaluation?.score > 0, `Evaluation scored candidate response (${answerData.evaluation?.score}/10)`);
      assert(Array.isArray(answerData.evaluation?.strengths) && answerData.evaluation.strengths.length > 0, 'Evaluation returned specific strengths');
      assert(!!answerData.evaluation?.idealAnswer, 'Evaluation returned model answer after submission');
    } else {
      // Offline auth security assertions
      const unauthPost = await fetch(`${BASE_URL}/interviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'Java' })
      });
      assert(unauthPost.status === 401, 'POST /api/interviews rejects unauthenticated access (HTTP 401)');

      const unauthGet = await fetch(`${BASE_URL}/interviews`);
      assert(unauthGet.status === 401, 'GET /api/interviews rejects unauthenticated access (HTTP 401)');
      console.log('  [INFO] Live MongoDB session write skipped (DB offline); API route security verified.');
    }

    console.log('\n====================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('\n[REGRESSION TEST ERROR]', err);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    await new Promise((resolve) => server.close(resolve));
    console.log('Regression test server closed cleanly.');
    process.exit(failed > 0 ? 1 : 0);
  }
};

runTests();
