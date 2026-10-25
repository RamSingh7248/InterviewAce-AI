/**
 * InterviewAce AI - Personalized Preparation Plan Service
 * 
 * Generates deterministic study schedules (7 / 14 / 30 days) prioritized by:
 * 1. Diagnostic assessment (for new users)
 * 2. Critical skill gaps (weakest topics first from SkillProfile)
 * 3. Spaced revision of previously missed questions
 * 4. Balanced rotation of Study, Practice Mocks, Coding, and Benchmarks
 * 5. Grounded study notes extracted directly from the Question bank
 */

import PrepPlan from '../models/PrepPlan.js';
import SkillProfile from '../models/SkillProfile.js';
import Interview from '../models/Interview.js';
import Question from '../models/Question.js';
import { getRequirementsForRole } from '../data/roleRequirements.js';

// Canonical resource recommendations by name only (No invented URLs)
const CANONICAL_RESOURCES = {
  Java: ['Effective Java by Joshua Bloch', 'Java Concurrency in Practice by Brian Goetz', 'Oracle Official Java Docs'],
  Python: ['Fluent Python by Luciano Ramalho', 'Official Python 3 Documentation'],
  JavaScript: ["You Don't Know JS by Kyle Simpson", 'MDN Web Docs JavaScript Guide'],
  React: ['Official React Documentation (react.dev)', 'Learning React by Alex Banks'],
  'Node.js': ['Node.js Official Documentation', 'Node.js Design Patterns by Mario Casciaro'],
  DSA: ['Cracking the Coding Interview by Gayle Laakmann McDowell', 'Introduction to Algorithms (CLRS)', 'Grokking Algorithms by Aditya Bhargava'],
  'SQL/DBMS': ['Database System Concepts by Silberschatz & Korth', 'PostgreSQL Official Documentation', 'SQL Antipatterns by Bill Karwin'],
  'System Design': ['Designing Data-Intensive Applications by Martin Kleppmann', 'System Design Interview by Alex Xu (Vol 1 & 2)'],
  'Distributed Systems': ['Designing Data-Intensive Applications by Martin Kleppmann', 'Distributed Systems: Principles and Paradigms by Tanenbaum'],
  'Web Security': ['OWASP Top 10 Security Guide', 'Web Application Hacker\'s Handbook by Dafydd Stuttard'],
  'Docker & Kubernetes': ['Kubernetes in Action by Marko Luksa', 'Docker Deep Dive by Nigel Poulton'],
  'Operating Systems': ['Operating System Concepts (Dinosaur Book) by Silberschatz & Galvin'],
  'Computer Networks': ['Computer Networking: A Top-Down Approach by Kurose & Ross'],
  'Git & Version Control': ['Pro Git by Scott Chacon & Ben Straub', 'Official Git Documentation']
};

export const getCanonicalResources = (category) => {
  return CANONICAL_RESOURCES[category] || [
    'Official Language & Framework Reference Documentation',
    'Standard Technical Interview Guide'
  ];
};

/**
 * Fetch grounded study notes from Question Bank for a specific topic
 */
export const fetchStudyNotesForTopic = async (category, topic) => {
  const query = {};
  if (category) query.category = new RegExp(`^${category.trim()}$`, 'i');
  if (topic) query.topic = new RegExp(topic.trim(), 'i');

  const questions = await Question.find(query)
    .sort({ importance: -1 })
    .limit(3)
    .select('questionText expectedKeyPoints referenceAnswer hints')
    .lean();

  const keyPointsSet = new Set();
  let snippet = '';

  for (const q of questions) {
    if (Array.isArray(q.expectedKeyPoints)) {
      q.expectedKeyPoints.forEach(kp => kp && keyPointsSet.add(kp));
    }
    if (!snippet && q.referenceAnswer && q.referenceAnswer.length > 20) {
      snippet = q.referenceAnswer.slice(0, 320) + (q.referenceAnswer.length > 320 ? '...' : '');
    }
  }

  return {
    keyPoints: Array.from(keyPointsSet).slice(0, 6),
    idealAnswerSnippet: snippet || `Review fundamental principles, edge-case behavior, and architectural trade-offs for ${topic}.`,
    suggestedResources: getCanonicalResources(category)
  };
};

/**
 * Generate a complete, deterministic personalized prep plan
 */
export const generatePrepPlan = async ({
  userId,
  targetRole = 'Software Engineer',
  level = 'fresher',
  durationDays = 14,
  dailyMinutes = 60
}) => {
  if (!userId) throw new Error('User ID is required to generate preparation plan.');

  const parsedDuration = [7, 14, 30].includes(Number(durationDays)) ? Number(durationDays) : 14;
  const parsedDailyMins = Math.max(30, Math.min(180, parseInt(dailyMinutes, 10) || 60));

  // 1. Fetch user's SkillProfile and past interviews
  const [skillProfile, pastInterviews] = await Promise.all([
    SkillProfile.findOne({ userId }).lean(),
    Interview.find({ userId, status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('category finalScore questions.topic questions.evaluation questions.questionText questions.difficulty')
      .lean()
  ]);

  const completedSessionsCount = pastInterviews.length || skillProfile?.completedSessionsCount || 0;
  const isDiagnosticNeeded = completedSessionsCount === 0;

  // 2. Fetch role requirement skills
  const roleReqs = getRequirementsForRole(targetRole);
  const requiredSkills = roleReqs.skills || [];

  // 3. Determine topic order:
  // If user has skill profile with gaps, prioritize weakest topics first
  let prioritizedTopics = [];
  if (!isDiagnosticNeeded && skillProfile?.topics?.length > 0) {
    // Sort topics by lowest EMA score first
    const sortedGaps = [...skillProfile.topics].sort((a, b) => a.emaScore - b.emaScore);
    prioritizedTopics = sortedGaps.map(g => ({ category: g.category, topic: g.topic, emaScore: g.emaScore }));
  }

  // Backfill with role required skills that haven't been practiced yet
  for (const req of requiredSkills) {
    if (!prioritizedTopics.some(t => t.category.toLowerCase() === req.category.toLowerCase() && t.topic.toLowerCase() === req.topic.toLowerCase())) {
      prioritizedTopics.push({ category: req.category, topic: req.topic, emaScore: 0 });
    }
  }

  if (prioritizedTopics.length === 0) {
    prioritizedTopics = [
      { category: 'DSA', topic: 'Arrays, Strings & Two Pointers', emaScore: 0 },
      { category: 'Java', topic: 'Core Java & JVM Internals', emaScore: 0 },
      { category: 'SQL/DBMS', topic: 'JOINs & Query Optimization', emaScore: 0 },
      { category: 'System Design', topic: 'High-Level Architecture & Scaling', emaScore: 0 }
    ];
  }

  // 4. Gather previously missed questions for Spaced Revision
  const missedQuestions = [];
  for (const session of pastInterviews) {
    if (Array.isArray(session.questions)) {
      for (const q of session.questions) {
        if (q.evaluation && typeof q.evaluation.score === 'number' && q.evaluation.score < 6) {
          missedQuestions.push({
            questionText: q.questionText,
            category: q.category || session.category,
            topic: q.topic || 'General'
          });
        }
      }
    }
  }

  // 5. Build Days schedule deterministically
  const days = [];
  const now = new Date();
  let topicCursor = 0;

  for (let dayNum = 1; dayNum <= parsedDuration; dayNum++) {
    const dayDate = new Date(now.getTime() + (dayNum - 1) * 24 * 60 * 60 * 1000);
    const tasks = [];

    // Day 1 special handling if new candidate
    if (dayNum === 1 && isDiagnosticNeeded) {
      const diagCategory = requiredSkills[0]?.category || 'Java';
      tasks.push({
        taskId: `task_d${dayNum}_1`,
        title: `Initial Technical Diagnostic Assessment (${diagCategory})`,
        type: 'diagnostic',
        category: diagCategory,
        topic: requiredSkills[0]?.topic || 'Core Engineering Baseline',
        estimatedMinutes: Math.min(parsedDailyMins, 45),
        isCompleted: false,
        targetScore: 60,
        deepLink: `/interview/setup?category=${encodeURIComponent(diagCategory)}&mode=diagnostic`,
        studyNotes: {
          keyPoints: ['Establishes initial evidence-based proficiency score', 'Calibrates subsequent daily topics to your exact level'],
          idealAnswerSnippet: 'Take this initial assessment under timed interview conditions without external notes.',
          suggestedResources: getCanonicalResources(diagCategory)
        }
      });

      days.push({
        dayNumber: dayNum,
        date: dayDate,
        theme: `Diagnostic Kickoff (${diagCategory})`,
        tasks
      });
      continue;
    }

    // Schedule Spaced Revision on Day 4, Day 8, Day 16, Day 24
    if ((dayNum === 4 || dayNum === 8 || dayNum === 16 || dayNum === 24) && missedQuestions.length > 0) {
      const revCategory = missedQuestions[0].category;
      tasks.push({
        taskId: `task_d${dayNum}_1`,
        title: `Spaced Revision: Target Missed Concepts in ${revCategory}`,
        type: 'revision',
        category: revCategory,
        topic: missedQuestions[0].topic,
        estimatedMinutes: Math.round(parsedDailyMins * 0.45),
        isCompleted: false,
        targetScore: 75,
        deepLink: `/interview/setup?category=${encodeURIComponent(revCategory)}&isRevision=true`,
        studyNotes: {
          keyPoints: ['Re-visit questions where previous scores fell below threshold', 'Reinforce memory retention and correct misconceptions'],
          idealAnswerSnippet: 'Focus on explaining the trade-offs and edge cases you missed during earlier sessions.',
          suggestedResources: getCanonicalResources(revCategory)
        }
      });

      // Pair with a short mock practice
      tasks.push({
        taskId: `task_d${dayNum}_2`,
        title: `Rapid Practice Mock: ${revCategory} Review`,
        type: 'practice_mock',
        category: revCategory,
        topic: missedQuestions[0].topic,
        estimatedMinutes: Math.round(parsedDailyMins * 0.55),
        isCompleted: false,
        targetScore: 75,
        deepLink: `/interview/setup?category=${encodeURIComponent(revCategory)}&topic=${encodeURIComponent(missedQuestions[0].topic)}`
      });

      days.push({
        dayNumber: dayNum,
        date: dayDate,
        theme: `Spaced Revision & Reinforcement (${revCategory})`,
        tasks
      });
      continue;
    }

    // Schedule Coding Practice on Days 3, 7, 11, 15, 19, 23, 27
    if (dayNum % 4 === 3) {
      const codingCategory = 'DSA';
      const codingTopic = 'Algorithms & Problem Solving';
      tasks.push({
        taskId: `task_d${dayNum}_1`,
        title: `Live Coding Studio: Algorithmic Problem Solving`,
        type: 'coding',
        category: codingCategory,
        topic: codingTopic,
        estimatedMinutes: parsedDailyMins,
        isCompleted: false,
        targetScore: 70,
        deepLink: `/interview/setup?category=DSA&interviewMode=live_coding`,
        studyNotes: {
          keyPoints: ['Time complexity analysis', 'Space complexity constraints', 'Handling empty arrays, null inputs, and single element edge cases'],
          idealAnswerSnippet: 'First state your brute force approach, then optimize with two pointers, sliding window, or hash maps.',
          suggestedResources: CANONICAL_RESOURCES['DSA']
        }
      });

      days.push({
        dayNumber: dayNum,
        date: dayDate,
        theme: 'Live Coding & Data Structures Round',
        tasks
      });
      continue;
    }

    // Standard Study + Practice Rotation
    const currentTopicObj = prioritizedTopics[topicCursor % prioritizedTopics.length];
    topicCursor++;

    const studyNotes = await fetchStudyNotesForTopic(currentTopicObj.category, currentTopicObj.topic);

    // Split daily time into 40% Study Notes + 60% Practice Mock
    const studyTime = Math.max(15, Math.round(parsedDailyMins * 0.4));
    const practiceTime = Math.max(20, parsedDailyMins - studyTime);

    tasks.push({
      taskId: `task_d${dayNum}_1`,
      title: `Concept Deep-Dive: ${currentTopicObj.topic}`,
      type: 'study',
      category: currentTopicObj.category,
      topic: currentTopicObj.topic,
      estimatedMinutes: studyTime,
      isCompleted: false,
      deepLink: `/skills`,
      studyNotes
    });

    tasks.push({
      taskId: `task_d${dayNum}_2`,
      title: `Adaptive Practice Interview: ${currentTopicObj.topic}`,
      type: 'practice_mock',
      category: currentTopicObj.category,
      topic: currentTopicObj.topic,
      estimatedMinutes: practiceTime,
      isCompleted: false,
      targetScore: 70,
      deepLink: `/interview/setup?category=${encodeURIComponent(currentTopicObj.category)}&topic=${encodeURIComponent(currentTopicObj.topic)}`
    });

    days.push({
      dayNumber: dayNum,
      date: dayDate,
      theme: `${currentTopicObj.category}: ${currentTopicObj.topic}`,
      tasks
    });
  }

  // Deactivate any existing active plan
  await PrepPlan.updateMany({ userId, status: 'active' }, { status: 'abandoned' });

  // Create and persist new PrepPlan
  const plan = await PrepPlan.create({
    userId,
    targetRole,
    level,
    durationDays: parsedDuration,
    dailyMinutes: parsedDailyMins,
    status: 'active',
    startDate: now,
    days,
    streakCount: 0,
    progressPercentage: 0,
    replanCount: 0
  });

  return plan;
};

/**
 * Get the current active plan for a user
 */
export const getActivePrepPlan = async (userId) => {
  if (!userId) throw new Error('User ID is required.');
  
  const plan = await PrepPlan.findOne({ userId, status: 'active' });
  if (!plan) return null;

  // Determine current day relative to startDate
  const now = new Date();
  const start = new Date(plan.startDate);
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const currentDayIndex = Math.min(plan.durationDays - 1, Math.max(0, diffDays));
  const currentDay = plan.days[currentDayIndex] || plan.days[0];

  return {
    plan,
    currentDayNumber: currentDayIndex + 1,
    todayTasks: currentDay ? currentDay.tasks : [],
    todayTheme: currentDay ? currentDay.theme : '',
    progressPercentage: plan.progressPercentage,
    streakCount: plan.streakCount
  };
};

/**
 * Toggle task completion status
 */
export const toggleTaskCompletion = async (userId, taskId) => {
  if (!userId || !taskId) throw new Error('User ID and Task ID are required.');

  const plan = await PrepPlan.findOne({ userId, status: 'active' });
  if (!plan) throw new Error('No active preparation plan found.');

  let found = false;
  for (const day of plan.days) {
    for (const t of day.tasks) {
      if (t.taskId === taskId) {
        t.isCompleted = !t.isCompleted;
        t.completedAt = t.isCompleted ? new Date() : null;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) throw new Error(`Task ${taskId} not found in active plan.`);

  // Update streak and progress
  plan.calculateProgress();
  plan.lastActivityDate = new Date();
  await plan.save();

  return plan;
};

/**
 * Auto-complete practice task when candidate completes matching session
 */
export const autoCompleteMatchingTask = async (userId, sessionData) => {
  if (!userId || !sessionData) return;

  try {
    const plan = await PrepPlan.findOne({ userId, status: 'active' });
    if (!plan) return;

    const { category, topic, finalScore } = sessionData;
    let modified = false;

    for (const day of plan.days) {
      for (const t of day.tasks) {
        if (!t.isCompleted && (t.type === 'practice_mock' || t.type === 'diagnostic' || t.type === 'coding')) {
          const catMatches = !t.category || t.category.toLowerCase() === (category || '').toLowerCase();
          const topicMatches = !t.topic || (topic && t.topic.toLowerCase().includes(topic.toLowerCase()));
          const scoreMatches = (finalScore || 0) >= (t.targetScore || 60);

          if (catMatches && (topicMatches || !topic) && scoreMatches) {
            t.isCompleted = true;
            t.completedAt = new Date();
            t.actualScore = finalScore;
            modified = true;
            break;
          }
        }
      }
      if (modified) break;
    }

    if (modified) {
      plan.calculateProgress();
      plan.streakCount = (plan.streakCount || 0) + 1;
      plan.lastActivityDate = new Date();
      await plan.save();
    }
  } catch (err) {
    console.warn('[PrepPlan Service] Auto-complete matching task notice:', err.message);
  }
};

/**
 * Re-plan: adjusts remaining days based on updated skill gap analytics
 */
export const replanRemainingDays = async (userId) => {
  if (!userId) throw new Error('User ID is required.');

  const plan = await PrepPlan.findOne({ userId, status: 'active' });
  if (!plan) throw new Error('No active plan found to re-plan.');

  // Preserve completed tasks
  const completedTaskIds = new Set();
  for (const day of plan.days) {
    for (const t of day.tasks) {
      if (t.isCompleted) completedTaskIds.add(t.taskId);
    }
  }

  // Generate fresh plan structure
  const freshPlan = await generatePrepPlan({
    userId,
    targetRole: plan.targetRole,
    level: plan.level,
    durationDays: plan.durationDays,
    dailyMinutes: plan.dailyMinutes
  });

  freshPlan.replanCount = (plan.replanCount || 0) + 1;
  freshPlan.streakCount = plan.streakCount || 0;

  // Restore completed status where applicable
  for (const day of freshPlan.days) {
    for (const t of day.tasks) {
      if (completedTaskIds.has(t.taskId)) {
        t.isCompleted = true;
        t.completedAt = new Date();
      }
    }
  }
  freshPlan.calculateProgress();
  await freshPlan.save();

  return freshPlan;
};
