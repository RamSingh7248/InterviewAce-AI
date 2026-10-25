import mongoose from 'mongoose';
import Question from '../models/Question.js';
import { INTERVIEW_CATALOG } from '../config/interviewCatalog.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';

/**
 * Get all supported interview categories with metadata and question counts
 * GET /api/questions/categories
 */
export const getCategories = async (req, res, next) => {
  try {
    // Aggregate active question counts per category in DB if connected
    let countMap = {};
    if (mongoose.connection.readyState === 1) {
      try {
        const counts = await Question.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        countMap = counts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
      } catch (err) {
        console.warn('[Question Controller] DB aggregate skipped:', err.message);
      }
    }

    const categoriesWithCounts = INTERVIEW_CATALOG.categories.map(cat => ({
      ...cat,
      questionCount: countMap[cat.id] || 0
    }));

    const languagesWithCounts = INTERVIEW_CATALOG.languages.map(lang => ({
      ...lang,
      questionCount: countMap[lang.id] || 0
    }));

    const subjectsWithCounts = INTERVIEW_CATALOG.subjects.map(subj => ({
      ...subj,
      questionCount: countMap[subj.id] || 0
    }));

    return res.status(200).json({
      status: 'success',
      data: {
        languages: languagesWithCounts,
        subjects: subjectsWithCounts,
        categories: categoriesWithCounts,
        difficulties: INTERVIEW_CATALOG.difficulties,
        questionTypes: INTERVIEW_CATALOG.questionTypes,
        roleGroups: INTERVIEW_CATALOG.roleGroups,
        targetRoles: INTERVIEW_CATALOG.targetRoles,
        roleSuggestions: INTERVIEW_CATALOG.roleSuggestions,
        experienceLevels: INTERVIEW_CATALOG.experienceLevels,
        interviewModes: INTERVIEW_CATALOG.interviewModes,
        companyStyles: INTERVIEW_CATALOG.companyStyles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get topics and subtopics for a category
 * GET /api/questions/topics?category=Java
 */
export const getTopics = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameter "category" is required.'
      });
    }

    const catalogEntry = INTERVIEW_CATALOG.categories.find(
      c => c.id.toLowerCase() === category.trim().toLowerCase()
    );

    // Also get distinct topics recorded in MongoDB for this category if connected
    let dbTopics = [];
    if (mongoose.connection.readyState === 1) {
      try {
        dbTopics = await Question.distinct('topic', {
          category: catalogEntry ? catalogEntry.id : category,
          isActive: true
        });
      } catch (err) {
        console.warn('[Question Controller] DB distinct skipped:', err.message);
      }
    }

    const catalogTopics = catalogEntry ? catalogEntry.topics : [];
    const mergedTopics = Array.from(new Set([...catalogTopics, ...dbTopics])).filter(Boolean);

    return res.status(200).json({
      status: 'success',
      category: catalogEntry ? catalogEntry.id : category,
      topics: mergedTopics
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get questions with filtering, search, and pagination
 * GET /api/questions
 */
export const getQuestions = async (req, res, next) => {
  try {
    const {
      category,
      topic,
      difficulty,
      questionType,
      role,
      interviewMode,
      companyStyle,
      sourceType,
      search,
      includeAnswers = 'false',
      excludeIds = '', // comma-separated list of already asked questionId values
      page = 1,
      limit = 10
    } = req.query;

    const excludeIdArray = excludeIds ? excludeIds.split(',').map(id => id.trim()).filter(Boolean) : [];

    const filter = { isActive: true, ...(excludeIdArray.length ? { _id: { $nin: excludeIdArray } } : {}) };

    if (category) {
      // Find matching standard category name
      const matched = INTERVIEW_CATALOG.categories.find(
        c => c.id.toLowerCase() === category.trim().toLowerCase()
      );
      filter.category = matched ? matched.id : category.trim();
    }

    if (topic && topic.trim()) {
      filter.topic = new RegExp(topic.trim(), 'i');
    }

    if (difficulty && ['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      filter.difficulty = difficulty;
    }

    if (questionType) {
      filter.questionType = questionType;
    }

    if (role) {
      filter.targetRoles = { $in: [new RegExp(role.trim(), 'i')] };
    }

    if (interviewMode) {
      filter.interviewMode = { $in: [interviewMode, 'mixed'] };
    }

    if (companyStyle) {
      filter.companyStyleLabel = companyStyle;
    }

    if (sourceType && ['curated', 'ai_generated'].includes(sourceType)) {
      filter.sourceType = sourceType;
    }

    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Field projection: Protect reference answers unless explicitly requested by authenticated admin
    const projection = {
      normalizedText: 0,
      __v: 0
    };

    if (includeAnswers !== 'true') {
      projection.referenceAnswer = 0;
      projection.expectedKeyPoints = 0;
      projection.evaluationRubric = 0;
    }

    if (mongoose.connection.readyState !== 1) {
      // Offline fallback: filter from SEED_QUESTIONS
      let filtered = SEED_QUESTIONS.filter(q => {
        if (filter.category && q.category.toLowerCase() !== filter.category.toLowerCase()) return false;
        if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
        if (topic && !q.topic?.toLowerCase().includes(topic.trim().toLowerCase())) return false;
        if (role && !q.targetRoles?.some(r => r.toLowerCase().includes(role.trim().toLowerCase()))) return false;
        return true;
      });

      const total = filtered.length;
      const sliced = filtered.slice(skip, skip + limitNum).map(q => {
        const copy = { ...q, _id: q._id || `seed_${Math.random().toString(36).substring(7)}` };
        if (includeAnswers !== 'true') {
          delete copy.referenceAnswer;
          delete copy.expectedKeyPoints;
          delete copy.evaluationRubric;
        }
        return copy;
      });

      return res.status(200).json({
        status: 'success',
        data: {
          questions: sliced,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum) || 1
          }
        }
      });
    }

    const [questions, total] = await Promise.all([
      Question.find(filter, projection)
        .sort(filter.$text ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Question.countDocuments(filter)
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        questions,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get question by ID
 * GET /api/questions/:id
 */
export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includeAnswers = 'false' } = req.query;

    const projection = {
      normalizedText: 0,
      __v: 0
    };

    // Candidate protection: omit reference answers by default
    if (includeAnswers !== 'true') {
      projection.referenceAnswer = 0;
      projection.expectedKeyPoints = 0;
      projection.evaluationRubric = 0;
    }

    const question = await Question.findById(id, projection);

    if (!question || !question.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Question not found.'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate interview questions via AI service with automatic curated fallback
 * POST /api/questions/generate
 */
export const generateQuestionsHandler = async (req, res, next) => {
  try {
    const {
      category,
      topic = '',
      difficulty = 'Medium',
      targetRole = 'Junior Software Engineer',
      interviewMode = 'mixed',
      companyStyle = 'General Tech',
      totalQuestions = 5,
      excludeNormalized = []
    } = req.body;

    if (!category) {
      return res.status(400).json({
        status: 'error',
        message: 'Field "category" is required.'
      });
    }

    const { generateQuestions } = await import('../services/ai.service.js');

    const result = await generateQuestions({
      category,
      topic,
      difficulty,
      targetRole,
      interviewMode,
      companyStyle,
      totalQuestions: Math.min(10, Math.max(1, parseInt(totalQuestions, 10) || 5)),
      excludeNormalized
    });

    return res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
