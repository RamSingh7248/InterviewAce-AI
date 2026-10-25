/**
 * InterviewAce AI - Skill Gap Analyzer Controller
 * 
 * Handles authenticated skill queries:
 * - GET /api/skills/overview
 * - GET /api/skills/gaps
 * - GET /api/skills/:skillName
 */

import { getUserSkillAnalytics, getSingleSkillAnalytics } from '../services/skillGap.service.js';

/**
 * Get high-level skill proficiency overview
 * GET /api/skills/overview
 */
export const getSkillOverview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const filterCategory = req.query.category || '';

    const analytics = await getUserSkillAnalytics(userId, filterCategory);

    return res.status(200).json({
      status: 'success',
      data: {
        overallScore: analytics.overallScore,
        totalEvaluatedQuestions: analytics.totalEvaluatedQuestions,
        evaluatedTopicsCount: analytics.evaluatedTopicsCount,
        counts: analytics.counts,
        categoryBreakdown: analytics.categoryBreakdown,
        topRecommendations: analytics.topRecommendations,
        recentActivity: analytics.recentActivity
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get detailed topic-wise proficiency, strengths, and weaknesses
 * GET /api/skills/gaps
 */
export const getSkillGaps = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const filterCategory = req.query.category || '';

    const analytics = await getUserSkillAnalytics(userId, filterCategory);

    return res.status(200).json({
      status: 'success',
      data: {
        overallScore: analytics.overallScore,
        totalEvaluatedQuestions: analytics.totalEvaluatedQuestions,
        strong: analytics.strong,
        developing: analytics.developing,
        needsImprovement: analytics.needsImprovement,
        insufficientEvidence: analytics.insufficientEvidence,
        allTopics: analytics.allTopics,
        categoryBreakdown: analytics.categoryBreakdown,
        topRecommendations: analytics.topRecommendations
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get specific skill topic breakdown and attempt history
 * GET /api/skills/:skillName
 */
export const getSkillDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { skillName } = req.params;

    if (!skillName || !skillName.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'A valid skill name is required.'
      });
    }

    const details = await getSingleSkillAnalytics(userId, decodeURIComponent(skillName));

    return res.status(200).json({
      status: 'success',
      data: details
    });
  } catch (error) {
    next(error);
  }
};
