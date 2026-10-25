/**
 * InterviewAce AI - Skill Gap Analyzer Service
 * 
 * Aggregates candidate interview evaluations deterministically:
 * - Calculates difficulty-weighted and recency-adjusted skill proficiency (0-100 scale).
 * - Distinguishes confirmed evidence (>= 3 questions) from preliminary (1-2) and insufficient (0).
 * - Classifies topics into 'strong' (>= 75), 'developing' (60-74), and 'needs_improvement' (< 60).
 * - Extracts concrete missing concepts from actual evaluations for targeted recommendations.
 * - Enforces strict user ownership; never accesses another user's interview data.
 */

import Interview from '../models/Interview.js';
import { PROGRAMMING_LANGUAGES } from '../config/interviewCatalog.js';

// Configurable thresholds for skill classification
export const SKILL_THRESHOLDS = {
  STRONG: 75,
  DEVELOPING: 60,
  CONFIRMED_EVIDENCE_MIN: 3,
  PRELIMINARY_EVIDENCE_MIN: 1
};

// Difficulty multipliers for normalized score calculation
const DIFFICULTY_MULTIPLIERS = {
  Easy: 0.95,
  Medium: 1.0,
  Hard: 1.10
};

/**
 * Calculate recency weight based on question submission date
 * Questions in last 14 days get 1.15x weight; last 30 days get 1.05x; older get 1.0x.
 */
const getRecencyWeight = (date) => {
  if (!date) return 1.0;
  const daysAgo = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
  if (daysAgo <= 14) return 1.15;
  if (daysAgo <= 30) return 1.05;
  return 1.0;
};

/**
 * Determine trend between earlier and later attempts
 */
const calculateTrend = (items) => {
  if (!items || items.length < 2) return 'neutral';
  
  // Sort chronologically
  const sorted = [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const midpoint = Math.floor(sorted.length / 2);
  const earlierSlice = sorted.slice(0, midpoint);
  const laterSlice = sorted.slice(midpoint);

  if (earlierSlice.length === 0 || laterSlice.length === 0) return 'neutral';

  const earlierAvg = earlierSlice.reduce((sum, item) => sum + item.score, 0) / earlierSlice.length;
  const laterAvg = laterSlice.reduce((sum, item) => sum + item.score, 0) / laterSlice.length;

  const diff = laterAvg - earlierAvg;
  if (diff >= 5) return 'improving';
  if (diff <= -5) return 'declining';
  return 'steady';
};

/**
 * Extract clean, deduplicated missing concepts and strengths
 */
const extractUniqueItems = (arrays) => {
  const set = new Set();
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        if (typeof item === 'string' && item.trim().length > 3) {
          set.add(item.trim());
        }
      }
    }
  }
  return Array.from(set).slice(0, 5);
};

/**
 * Aggregate all evaluated interview data for a user
 */
export const getUserSkillAnalytics = async (userId, filterCategory = '') => {
  if (!userId) {
    throw new Error('User ID is required for skill analytics.');
  }

  // Fetch only interviews belonging to this authenticated user
  const query = {
    userId,
    status: { $in: ['completed', 'in_progress'] }
  };

  if (filterCategory && filterCategory.trim()) {
    query.category = new RegExp(`^${filterCategory.trim()}$`, 'i');
  }

  const interviews = await Interview.find(query)
    .select('category difficulty targetRole topic createdAt completedAt questions')
    .lean();

  const topicGroups = new Map();
  let totalEvaluatedCount = 0;
  const recentActivities = [];

  for (const interview of interviews) {
    const interviewCategory = interview.category || 'General';
    const interviewDate = interview.completedAt || interview.createdAt || new Date();

    if (!Array.isArray(interview.questions)) continue;

    for (const q of interview.questions) {
      // Must be answered and have a valid evaluation score
      // Skip unevaluated, skipped, or failed evaluations
      const hasEvaluation = q.evaluation && typeof q.evaluation.score === 'number' && q.evaluation.score >= 0;
      const isCandidateAnswered = q.isAnswered || (q.userAnswer && q.userAnswer.trim() && q.userAnswer.trim() !== '[Skipped]');

      if (!hasEvaluation || !isCandidateAnswered) {
        continue;
      }

      totalEvaluatedCount++;

      const category = q.category || interviewCategory;
      const topicName = (q.topic || interview.topic || 'General Concepts').trim();
      const topicKey = `${category.toLowerCase()}:::${topicName.toLowerCase()}`;
      const qDate = q.submittedAt || interviewDate;

      // Difficulty-normalized score
      const rawPct = q.evaluation.score100 !== undefined ? q.evaluation.score100 : ((q.evaluation.score / 10) * 100);
      const diffMultiplier = DIFFICULTY_MULTIPLIERS[q.difficulty] || 1.0;
      const normalizedScore = Math.min(100, Math.max(0, Math.round(rawPct * diffMultiplier)));
      const recencyWeight = getRecencyWeight(qDate);

      const questionRecord = {
        questionId: q.questionId || (q._id ? q._id.toString() : ''),
        questionText: q.questionText,
        score: normalizedScore,
        rawScore: q.evaluation.score,
        score100: q.evaluation.score100 !== undefined ? q.evaluation.score100 : Math.round(q.evaluation.score * 10),
        difficulty: q.difficulty || 'Medium',
        verdict: q.evaluation.verdict || (q.evaluation.score >= 8 ? 'correct' : q.evaluation.score >= 5 ? 'partially_correct' : 'incorrect'),
        date: qDate,
        weight: recencyWeight,
        missingConcepts: [
          ...(Array.isArray(q.evaluation.missingConcepts) ? q.evaluation.missingConcepts : []),
          ...(Array.isArray(q.evaluation.incorrectStatements) ? q.evaluation.incorrectStatements : [])
        ],
        strengths: q.evaluation.strengths || [],
        suggestions: q.evaluation.suggestions || [],
        dimensions: q.evaluation.dimensions || null
      };

      if (!topicGroups.has(topicKey)) {
        topicGroups.set(topicKey, {
          category,
          topic: topicName,
          items: []
        });
      }
      topicGroups.get(topicKey).items.push(questionRecord);

      recentActivities.push({
        ...questionRecord,
        category,
        topic: topicName
      });
    }
  }

  // Sort recent activities by date descending
  recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Aggregate metrics per topic
  const analyzedTopics = [];

  for (const [, group] of topicGroups.entries()) {
    const { category, topic, items } = group;
    const evidenceCount = items.length;

    // Weighted average score
    const totalWeightedScore = items.reduce((sum, item) => sum + (item.score * item.weight), 0);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const estimatedScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;

    // Confidence
    let confidence = 'insufficient';
    if (evidenceCount >= SKILL_THRESHOLDS.CONFIRMED_EVIDENCE_MIN) {
      confidence = 'confirmed';
    } else if (evidenceCount >= SKILL_THRESHOLDS.PRELIMINARY_EVIDENCE_MIN) {
      confidence = 'preliminary';
    }

    // Classification
    let classification = 'insufficient_evidence';
    if (confidence !== 'insufficient') {
      if (estimatedScore >= SKILL_THRESHOLDS.STRONG) {
        classification = 'strong';
      } else if (estimatedScore >= SKILL_THRESHOLDS.DEVELOPING) {
        classification = 'developing';
      } else {
        classification = 'needs_improvement';
      }
    }

    const trend = calculateTrend(items);
    const missingConcepts = extractUniqueItems(items.map(i => i.missingConcepts));
    const strengths = extractUniqueItems(items.map(i => i.strengths));

    // Grounded recommendation text
    let recommendedAction = '';
    if (classification === 'needs_improvement') {
      if (missingConcepts.length > 0) {
        recommendedAction = `Review ${missingConcepts.slice(0, 2).join(' & ')}: reinforce foundational mechanics through dedicated practice.`;
      } else {
        recommendedAction = `Strengthen foundational principles of ${topic} through structured practice questions.`;
      }
    } else if (classification === 'developing') {
      if (missingConcepts.length > 0) {
        recommendedAction = `Target ${missingConcepts.slice(0, 2).join(' & ')} to elevate performance from developing to strong.`;
      } else {
        recommendedAction = `Explore edge cases, internal trade-offs, and multi-threaded/scaling implications in ${topic}.`;
      }
    } else if (classification === 'strong') {
      recommendedAction = `Proficiency established (${estimatedScore}/100). Maintain sharpness with hard-level questions and system trade-offs.`;
    } else {
      recommendedAction = `Attempt at least 3 practice questions to establish a reliable ${topic} proficiency baseline.`;
    }

    analyzedTopics.push({
      skillName: topic,
      topic,
      category,
      estimatedScore: confidence === 'insufficient' ? null : estimatedScore,
      evidenceCount,
      confidence,
      classification,
      trend,
      missingConcepts,
      strengths,
      recommendedAction,
      practiceUrl: `/interview/setup?category=${encodeURIComponent(category)}&topic=${encodeURIComponent(topic)}`,
      lastAttemptDate: items[items.length - 1]?.date || null,
      history: items
    });
  }

  // Sort topics by score ascending within gaps, descending within strong
  const strong = analyzedTopics.filter(t => t.classification === 'strong')
    .sort((a, b) => b.estimatedScore - a.estimatedScore);

  const developing = analyzedTopics.filter(t => t.classification === 'developing')
    .sort((a, b) => b.estimatedScore - a.estimatedScore);

  const needsImprovement = analyzedTopics.filter(t => t.classification === 'needs_improvement')
    .sort((a, b) => a.estimatedScore - b.estimatedScore);

  const insufficient = analyzedTopics.filter(t => t.classification === 'insufficient_evidence');

  // Overall Technical Proficiency: computed only from eligible evaluated skills
  const evaluatedTopics = analyzedTopics.filter(t => t.estimatedScore !== null);
  const overallScore = evaluatedTopics.length > 0
    ? Math.round(evaluatedTopics.reduce((sum, t) => sum + t.estimatedScore, 0) / evaluatedTopics.length)
    : null;

  // Category-level breakdown
  const categoryMap = new Map();
  for (const topic of analyzedTopics) {
    if (!categoryMap.has(topic.category)) {
      categoryMap.set(topic.category, {
        category: topic.category,
        topicsCount: 0,
        evaluatedTopicsCount: 0,
        scoreSum: 0,
        questionsCount: 0,
        strongCount: 0,
        needsImprovementCount: 0
      });
    }
    const cat = categoryMap.get(topic.category);
    cat.topicsCount++;
    cat.questionsCount += topic.evidenceCount;
    if (topic.estimatedScore !== null) {
      cat.evaluatedTopicsCount++;
      cat.scoreSum += topic.estimatedScore;
    }
    if (topic.classification === 'strong') cat.strongCount++;
    if (topic.classification === 'needs_improvement') cat.needsImprovementCount++;
  }

  const categoryBreakdown = Array.from(categoryMap.values()).map(cat => ({
    category: cat.category,
    averageScore: cat.evaluatedTopicsCount > 0 ? Math.round(cat.scoreSum / cat.evaluatedTopicsCount) : null,
    evaluatedTopicsCount: cat.evaluatedTopicsCount,
    questionsCount: cat.questionsCount,
    strongCount: cat.strongCount,
    needsImprovementCount: cat.needsImprovementCount
  }));

  // Top recommendations: prioritzing weak topics first, then developing topics
  const topRecommendations = [
    ...needsImprovement.map(t => ({
      skillName: t.skillName,
      category: t.category,
      estimatedScore: t.estimatedScore,
      evidenceCount: t.evidenceCount,
      priority: 'high',
      missingConcepts: t.missingConcepts,
      recommendedAction: t.recommendedAction,
      practiceUrl: t.practiceUrl
    })),
    ...developing.map(t => ({
      skillName: t.skillName,
      category: t.category,
      estimatedScore: t.estimatedScore,
      evidenceCount: t.evidenceCount,
      priority: 'medium',
      missingConcepts: t.missingConcepts,
      recommendedAction: t.recommendedAction,
      practiceUrl: t.practiceUrl
    }))
  ].slice(0, 5);

  return {
    overallScore,
    totalEvaluatedQuestions: totalEvaluatedCount,
    evaluatedTopicsCount: evaluatedTopics.length,
    counts: {
      strong: strong.length,
      developing: developing.length,
      needsImprovement: needsImprovement.length,
      insufficientEvidence: insufficient.length
    },
    strong,
    developing,
    needsImprovement,
    insufficientEvidence: insufficient,
    allTopics: analyzedTopics,
    categoryBreakdown,
    topRecommendations,
    recentActivity: recentActivities.slice(0, 5)
  };
};

/**
 * Get deep-dive details for a specific skill topic
 */
export const getSingleSkillAnalytics = async (userId, skillName) => {
  if (!userId || !skillName) {
    throw new Error('User ID and skill name are required.');
  }

  const analytics = await getUserSkillAnalytics(userId);
  const normalizedTarget = skillName.trim().toLowerCase();

  const found = analytics.allTopics.find(
    t => t.skillName.toLowerCase() === normalizedTarget || t.topic.toLowerCase() === normalizedTarget
  );

  if (!found) {
    return {
      skillName,
      category: 'General',
      estimatedScore: null,
      evidenceCount: 0,
      confidence: 'insufficient',
      classification: 'insufficient_evidence',
      trend: 'neutral',
      missingConcepts: [],
      strengths: [],
      recommendedAction: `No evaluated practice data found for "${skillName}". Start a practice interview to evaluate this skill.`,
      practiceUrl: `/interview/setup?topic=${encodeURIComponent(skillName)}`,
      history: []
    };
  }

  return {
    ...found,
    history: found.history || []
  };
};
