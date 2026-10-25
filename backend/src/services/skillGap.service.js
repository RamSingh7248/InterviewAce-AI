/**
 * InterviewAce AI - Skill Gap Analyzer Service
 * 
 * Phase 3: Deterministic Skill Profiling, Exponential Moving Average (EMA),
 * Role Requirements Matching, and Target Role Readiness Analytics.
 */

import Interview from '../models/Interview.js';
import SkillProfile from '../models/SkillProfile.js';
import User from '../models/User.js';
import { getRequirementsForRole } from '../data/roleRequirements.js';
import { callGemini } from './ai.service.js';

// Mastery classification thresholds (deterministic)
export const MASTERY_THRESHOLDS = {
  STRONG: 85,
  PROFICIENT: 70,
  DEVELOPING: 50
};

export const getMasteryLabel = (score) => {
  if (score === null || score === undefined || score < 50) return 'Beginner';
  if (score < 70) return 'Developing';
  if (score < 85) return 'Proficient';
  return 'Strong';
};

// EMA smoothing factor: 0.3 gives high responsiveness while smoothing noise
const EMA_ALPHA = 0.3;

/**
 * Compute Exponential Moving Average for a series of chronological scores
 */
export const calculateEMA = (scores) => {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  let ema = scores[0];
  for (let i = 1; i < scores.length; i++) {
    ema = (EMA_ALPHA * scores[i]) + ((1 - EMA_ALPHA) * ema);
  }
  return Math.round(ema * 10) / 10;
};

/**
 * Compute last-5 trend: compare recent 2 attempts vs prior attempts
 */
export const calculateLast5Trend = (scores) => {
  if (!Array.isArray(scores) || scores.length < 2) return 'neutral';
  const recentSlice = scores.slice(-5);
  if (recentSlice.length < 2) return 'neutral';

  if (recentSlice.length === 2) {
    const diff = recentSlice[1] - recentSlice[0];
    if (diff >= 5) return 'improving';
    if (diff <= -5) return 'declining';
    return 'steady';
  }

  const latestTwo = recentSlice.slice(-2);
  const prior = recentSlice.slice(0, -2);

  const avgLatest = latestTwo.reduce((a, b) => a + b, 0) / latestTwo.length;
  const avgPrior = prior.reduce((a, b) => a + b, 0) / prior.length;

  const diff = avgLatest - avgPrior;
  if (diff >= 4) return 'improving';
  if (diff <= -4) return 'declining';
  return 'steady';
};

/**
 * Deterministically compute Role Readiness Percentage
 */
export const calculateRoleReadiness = (targetRole, topicProfiles, categoryProfiles) => {
  const roleConfig = getRequirementsForRole(targetRole);
  if (!roleConfig || !Array.isArray(roleConfig.skills) || roleConfig.skills.length === 0) {
    return { readinessPercentage: 0, requiredSkills: [] };
  }

  let totalWeight = 0;
  let weightedScoreSum = 0;

  const requiredSkills = roleConfig.skills.map(req => {
    totalWeight += req.weight;

    // First try finding matching topic in same category
    const topicMatch = topicProfiles.find(t => 
      t.category.toLowerCase() === req.category.toLowerCase() &&
      (t.topic.toLowerCase().includes(req.topic.toLowerCase()) || req.topic.toLowerCase().includes(t.topic.toLowerCase()))
    );

    // Second try finding any topic in category
    const catMatch = categoryProfiles.find(c => c.category.toLowerCase() === req.category.toLowerCase());

    const candidateScore = topicMatch 
      ? topicMatch.emaScore 
      : (catMatch ? catMatch.emaScore : 0);

    const attempts = topicMatch ? topicMatch.attempts : (catMatch ? catMatch.attempts : 0);
    const masteryLabel = getMasteryLabel(candidateScore);

    weightedScoreSum += (req.weight * candidateScore);

    return {
      category: req.category,
      topic: req.topic,
      importanceWeight: req.weight,
      candidateScore: Math.round(candidateScore),
      attempts,
      masteryLabel,
      isCovered: attempts > 0
    };
  });

  const readinessPercentage = totalWeight > 0 
    ? Math.min(100, Math.max(0, Math.round(weightedScoreSum / totalWeight))) 
    : 0;

  return {
    targetRole: roleConfig.name || targetRole,
    readinessPercentage,
    requiredSkills
  };
};

/**
 * Optional Gemini narrative summary with timeout and strict fallback
 */
export const generateSkillNarrativeSummary = async ({
  targetRole,
  readinessPercentage,
  completedSessionsCount,
  topStrengths,
  topGaps
}) => {
  // Deterministic template fallback
  const strName = topStrengths[0]?.topic || topStrengths[0]?.category || 'technical fundamentals';
  const gapName = topGaps[0]?.topic || topGaps[0]?.category || 'advanced system concepts';

  if (completedSessionsCount === 0) {
    return `Complete your first mock interview to generate an evidence-backed skill gap analysis for ${targetRole}.`;
  }
  if (completedSessionsCount === 1) {
    return `Preliminary data shows baseline knowledge in ${strName}. Complete 1 more interview session to solidify your ${targetRole} readiness profile.`;
  }

  const defaultTemplate = `You show established competency in ${strName}, reaching ${readinessPercentage}% readiness for ${targetRole}. Focus your next practice session on ${gapName} to accelerate your promotion readiness.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith('mock_')) {
    return defaultTemplate;
  }

  try {
    const prompt = `Write a 2-sentence executive summary for an engineer targeting the "${targetRole}" position.
Their deterministic readiness score is ${readinessPercentage}%.
Top technical strengths: ${topStrengths.map(s => s.topic || s.category).join(', ') || 'Core concepts'}.
Top technical gaps to improve: ${topGaps.map(g => g.topic || g.category).join(', ') || 'System trade-offs'}.
Tone: Professional, encouraging, and focused directly on their highest-ROI action. Do NOT use markdown asterisks. Maximum 40 words. Respond in JSON format: {"summary": "your text here"}`;

    const rawResponse = await callGemini(prompt, 'You are an executive engineering mentor.', 5000);
    if (rawResponse) {
      try {
        const parsed = JSON.parse(rawResponse.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim());
        if (parsed.summary && parsed.summary.trim().length > 15) {
          return parsed.summary.trim();
        }
      } catch (parseErr) {
        if (typeof rawResponse === 'string' && rawResponse.trim().length > 15) {
          return rawResponse.trim().replace(/^["']|["']$/g, '');
        }
      }
    }
    return defaultTemplate;
  } catch (err) {
    return defaultTemplate;
  }
};

/**
 * Update and persist a candidate's complete Skill Profile
 * Run after session completion or explicitly requested
 */
export const updateUserSkillProfile = async (userId, customRole = '') => {
  if (!userId) throw new Error('User ID is required to update skill profile.');

  const user = await User.findById(userId).select('preferences targetRole').lean();
  const targetRole = customRole || user?.preferences?.targetRole || user?.targetRole || 'Software Engineer';

  // Gather all past completed or answered interview sessions for this user
  const interviews = await Interview.find({
    userId,
    status: { $in: ['completed', 'in_progress'] }
  })
    .sort({ createdAt: 1 }) // Chronological order for accurate EMA
    .select('category difficulty targetRole topic createdAt completedAt status finalScore questions')
    .lean();

  const completedSessions = interviews.filter(i => i.status === 'completed');
  const completedSessionsCount = completedSessions.length;

  // Track raw scores chronologically per topic and per category
  const topicDataMap = new Map();
  const categoryDataMap = new Map();
  const scoreHistory = [];

  for (const session of interviews) {
    const sessionCategory = session.category || 'General';
    const sessionDate = session.completedAt || session.createdAt || new Date();

    if (session.finalScore !== undefined && session.status === 'completed') {
      scoreHistory.push({
        interviewId: session._id,
        category: sessionCategory,
        score: session.finalScore,
        date: sessionDate
      });
    }

    if (!Array.isArray(session.questions)) continue;

    for (const q of session.questions) {
      const hasEvaluation = q.evaluation && typeof q.evaluation.score === 'number' && q.evaluation.score >= 0;
      const isAnswered = q.isAnswered || (q.userAnswer && q.userAnswer.trim() && q.userAnswer.trim() !== '[Skipped]');

      if (!hasEvaluation || !isAnswered) continue;

      const category = q.category || sessionCategory;
      const topic = (q.topic || session.topic || 'General Concepts').trim();
      const topicKey = `${category.toLowerCase()}:::${topic.toLowerCase()}`;
      const qScore100 = q.evaluation.score100 !== undefined 
        ? q.evaluation.score100 
        : Math.min(100, Math.max(0, Math.round(q.evaluation.score * 10)));
      const qDate = q.submittedAt || sessionDate;

      // Update topic data
      if (!topicDataMap.has(topicKey)) {
        topicDataMap.set(topicKey, {
          topic,
          category,
          scores: [],
          missingConcepts: [],
          strengths: [],
          lastAttemptDate: qDate
        });
      }
      const tRecord = topicDataMap.get(topicKey);
      tRecord.scores.push(qScore100);
      tRecord.lastAttemptDate = qDate;
      if (Array.isArray(q.evaluation.missingConcepts)) {
        tRecord.missingConcepts.push(...q.evaluation.missingConcepts);
      }
      if (Array.isArray(q.evaluation.strengths)) {
        tRecord.strengths.push(...q.evaluation.strengths);
      }

      // Update category data
      const catKey = category.toLowerCase();
      if (!categoryDataMap.has(catKey)) {
        categoryDataMap.set(catKey, {
          category,
          scores: []
        });
      }
      categoryDataMap.get(catKey).scores.push(qScore100);
    }
  }

  // Calculate deterministic metrics per topic
  const topicProfiles = [];
  for (const [, t] of topicDataMap.entries()) {
    const attempts = t.scores.length;
    const avgScore = Math.round(t.scores.reduce((a, b) => a + b, 0) / attempts);
    const emaScore = calculateEMA(t.scores);
    const trend = calculateLast5Trend(t.scores);
    const masteryLabel = getMasteryLabel(emaScore);

    const uniqueMissing = Array.from(new Set(t.missingConcepts)).filter(Boolean).slice(0, 5);
    const uniqueStrengths = Array.from(new Set(t.strengths)).filter(Boolean).slice(0, 5);

    topicProfiles.push({
      topic: t.topic,
      category: t.category,
      attempts,
      averageScore: avgScore,
      emaScore,
      lastScores: t.scores.slice(-5),
      trend,
      masteryLabel,
      missingConcepts: uniqueMissing,
      strengths: uniqueStrengths,
      lastAttemptDate: t.lastAttemptDate
    });
  }

  // Calculate deterministic metrics per category
  const categoryProfiles = [];
  for (const [, c] of categoryDataMap.entries()) {
    const attempts = c.scores.length;
    const avgScore = Math.round(c.scores.reduce((a, b) => a + b, 0) / attempts);
    const emaScore = calculateEMA(c.scores);
    const trend = calculateLast5Trend(c.scores);
    const masteryLabel = getMasteryLabel(emaScore);

    categoryProfiles.push({
      category: c.category,
      attempts,
      averageScore: avgScore,
      emaScore,
      trend,
      masteryLabel
    });
  }

  // Rank weakest and strongest topics
  const weakestTopics = [...topicProfiles].sort((a, b) => a.emaScore - b.emaScore);
  const strongestTopics = [...topicProfiles].sort((a, b) => b.emaScore - a.emaScore);

  // Compute Role Readiness %
  const { readinessPercentage, requiredSkills } = calculateRoleReadiness(
    targetRole, 
    topicProfiles, 
    categoryProfiles
  );

  const overallScore = topicProfiles.length > 0
    ? Math.round(topicProfiles.reduce((acc, t) => acc + t.emaScore, 0) / topicProfiles.length)
    : 0;

  // Generate short narrative summary
  const narrativeSummary = await generateSkillNarrativeSummary({
    targetRole,
    readinessPercentage,
    completedSessionsCount,
    topStrengths: strongestTopics.slice(0, 3),
    topGaps: weakestTopics.slice(0, 3)
  });

  // Save or update SkillProfile in database
  const profileDoc = await SkillProfile.findOneAndUpdate(
    { userId },
    {
      userId,
      targetRole,
      overallScore,
      readinessPercentage,
      completedSessionsCount,
      narrativeSummary,
      categories: categoryProfiles,
      topics: topicProfiles,
      scoreHistory: scoreHistory.slice(-20),
      lastCalculatedAt: new Date()
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    profile: profileDoc,
    targetRole,
    overallScore,
    readinessPercentage,
    completedSessionsCount,
    narrativeSummary,
    categories: categoryProfiles,
    topics: topicProfiles,
    weakestTopics: weakestTopics.slice(0, 6),
    strongestTopics: strongestTopics.slice(0, 6),
    requiredSkills,
    scoreHistory: scoreHistory.slice(-10)
  };
};

/**
 * Backward compatible accessor for existing controllers
 */
export const getUserSkillAnalytics = async (userId, filterCategory = '') => {
  const data = await updateUserSkillProfile(userId);

  let filteredTopics = data.topics;
  if (filterCategory && filterCategory.trim()) {
    filteredTopics = data.topics.filter(t => t.category.toLowerCase() === filterCategory.toLowerCase().trim());
  }

  const strong = filteredTopics.filter(t => t.masteryLabel === 'Strong' || t.masteryLabel === 'Proficient');
  const developing = filteredTopics.filter(t => t.masteryLabel === 'Developing');
  const needsImprovement = filteredTopics.filter(t => t.masteryLabel === 'Beginner');

  const topRecommendations = needsImprovement.concat(developing).slice(0, 5).map(t => ({
    skillName: t.topic,
    category: t.category,
    estimatedScore: t.emaScore,
    evidenceCount: t.attempts,
    priority: t.masteryLabel === 'Beginner' ? 'high' : 'medium',
    missingConcepts: t.missingConcepts,
    recommendedAction: `Focus on ${t.missingConcepts[0] || t.topic} to advance from ${t.masteryLabel} to next tier.`,
    practiceUrl: `/interview/setup?category=${encodeURIComponent(t.category)}&topic=${encodeURIComponent(t.topic)}`
  }));

  return {
    overallScore: data.overallScore,
    readinessPercentage: data.readinessPercentage,
    targetRole: data.targetRole,
    completedSessionsCount: data.completedSessionsCount,
    narrativeSummary: data.narrativeSummary,
    totalEvaluatedQuestions: data.topics.reduce((acc, t) => acc + t.attempts, 0),
    evaluatedTopicsCount: filteredTopics.length,
    counts: {
      strong: strong.length,
      developing: developing.length,
      needsImprovement: needsImprovement.length,
      insufficientEvidence: data.completedSessionsCount < 2 ? 1 : 0
    },
    strong,
    developing,
    needsImprovement,
    insufficientEvidence: [],
    allTopics: filteredTopics.map(t => ({
      skillName: t.topic,
      topic: t.topic,
      category: t.category,
      estimatedScore: t.emaScore,
      evidenceCount: t.attempts,
      classification: t.masteryLabel === 'Strong' ? 'strong' : (t.masteryLabel === 'Proficient' ? 'strong' : (t.masteryLabel === 'Developing' ? 'developing' : 'needs_improvement')),
      masteryLabel: t.masteryLabel,
      trend: t.trend,
      missingConcepts: t.missingConcepts,
      strengths: t.strengths,
      recommendedAction: `Practice ${t.topic} to solidify core technical accuracy.`,
      practiceUrl: `/interview/setup?category=${encodeURIComponent(t.category)}&topic=${encodeURIComponent(t.topic)}`
    })),
    weakestTopics: data.weakestTopics,
    strongestTopics: data.strongestTopics,
    categoryBreakdown: data.categories,
    requiredSkills: data.requiredSkills,
    scoreHistory: data.scoreHistory,
    topRecommendations,
    recentActivity: data.scoreHistory
  };
};

export const getSingleSkillAnalytics = async (userId, skillName) => {
  const analytics = await getUserSkillAnalytics(userId);
  const found = analytics.allTopics.find(
    t => t.skillName.toLowerCase() === skillName.toLowerCase() || t.topic.toLowerCase() === skillName.toLowerCase()
  );

  if (!found) {
    return {
      skillName,
      category: 'General',
      estimatedScore: null,
      evidenceCount: 0,
      classification: 'insufficient_evidence',
      masteryLabel: 'Beginner',
      trend: 'neutral',
      missingConcepts: [],
      strengths: [],
      recommendedAction: `No evaluated practice data found for "${skillName}". Start a practice interview to evaluate this skill.`,
      practiceUrl: `/interview/setup?topic=${encodeURIComponent(skillName)}`,
      history: []
    };
  }

  return found;
};
