import mongoose from 'mongoose';
import Interview from '../models/Interview.js';
import { generateQuestions, evaluateAnswer, generateAdaptiveFollowUpQuestion, isTooSimilar, generateCategoryFallbackQuestions } from '../services/ai.service.js';
import { executeCode as executeCodeService } from '../services/codeExecution.service.js';
import { INTERVIEW_CATALOG, normalizeCategory } from '../config/interviewCatalog.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';

const SUPPORTED_CATEGORIES = INTERVIEW_CATALOG.categories.map(c => c.id);

/**
 * Helper to sanitize interview payload so un-evaluated questions don't leak answers or keypoints
 */
const sanitizeInterviewForCandidate = (interviewDoc) => {
  if (!interviewDoc) return null;
  const interview = interviewDoc.toObject ? interviewDoc.toObject() : JSON.parse(JSON.stringify(interviewDoc));

  // If entire session is completed, reveal answers for review
  if (interview.status === 'completed') {
    return interview;
  }

  // Otherwise, only expose expectedKeyPoints & referenceAnswer & explanation on questions already evaluated
  if (Array.isArray(interview.questions)) {
    interview.questions = interview.questions.map((q) => {
      const isEvaluated = q.evaluation && q.evaluation.score !== undefined;
      if (!isEvaluated) {
        delete q.expectedKeyPoints;
        delete q.referenceAnswer;
        delete q.stepByStepExplanation;
        delete q.practicalExample;
        delete q.commonMistakes;
        delete q.suggestedFollowUps;
      }
      return q;
    });
  }

  return interview;
};

/**
 * Create a new mock interview session
 * POST /api/interviews and POST /api/interviews/start
 */
export const createInterview = async (req, res, next) => {
  try {
    const rawCategory = req.body.category;
    const category = normalizeCategory(rawCategory) || rawCategory;

    const {
      difficulty: rawDifficulty = 'Medium',
      totalQuestions = 5,
      topic = '',
      targetRole = 'Junior Software Engineer',
      interviewMode = 'mixed',
      companyStyle = 'General Tech',
      experienceLevel = 'fresher',
      language = 'en-US',
      timedMode = false,
      timeLimitPerQuestion = 0,
      isRevision = false
    } = req.body;

    if (!category || !SUPPORTED_CATEGORIES.includes(category)) {
      return res.status(400).json({
        status: 'error',
        message: `Please select a valid interview category. Supported categories include: Java, Python, JavaScript, DSA, System Design, SQL/DBMS, etc.`
      });
    }

    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    const difficulty = validDifficulties.find(d => d.toLowerCase() === (rawDifficulty || '').toLowerCase()) || 'Medium';

    const questionCount = Math.min(10, Math.max(1, parseInt(totalQuestions, 10) || 5));
    const isRevisionMode = Boolean(isRevision);

    // Gather previously asked question IDs and normalized texts strictly from past sessions OF THE SAME CATEGORY (last 10 sessions)
    const pastSessions = await Interview.find({ userId: req.user._id, category })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('category askedQuestionTexts askedQuestionIds questions.normalizedText questions.questionId questions.evaluation.score questions.questionText questions.topic questions.subtopic questions.difficulty questions.sequenceOrder questions.learningStage questions.stepByStepExplanation questions.practicalExample questions.commonMistakes questions.expectedKeyPoints questions.referenceAnswer')
      .lean();

    const userAskedNormalized = new Set();
    const userAskedIds = new Set();
    const revisionPool = [];
    const seenRevisionNorm = new Set();

    for (const session of pastSessions) {
      if (Array.isArray(session.questions)) {
        session.questions.forEach(q => {
          const score = q.evaluation?.score;
          const norm = q.normalizedText;
          if (isRevisionMode && score !== undefined && score < 7) {
            if (norm && !seenRevisionNorm.has(norm)) {
              seenRevisionNorm.add(norm);
              revisionPool.push({
                ...q,
                _id: q._id || q.questionId,
                isRevisionQuestion: true
              });
            }
          } else {
            if (q.normalizedText) userAskedNormalized.add(q.normalizedText);
            if (q.questionId) userAskedIds.add(q.questionId);
          }
        });
      }
      if (!isRevisionMode) {
        if (Array.isArray(session.askedQuestionTexts)) {
          session.askedQuestionTexts.forEach(t => t && userAskedNormalized.add(t));
        }
        if (Array.isArray(session.askedQuestionIds)) {
          session.askedQuestionIds.forEach(id => id && userAskedIds.add(id));
        }
      }
    }

    let selectedQuestions = [];
    let sessionMode = 'demo';
    let historyReset = false;
    let historyResetMessage = '';

    // Strictly track questions already added to this session
    // Rule: NO question is ever repeated during an interview session
    const sessionSeenNorm = new Set();
    const sessionSeenIds = new Set();

    if (isRevisionMode && revisionPool.length > 0) {
      for (const q of revisionPool) {
        const norm = q.normalizedText || normalizeQuestionText(q.questionText);
        const id = (q.questionId || q._id || '').toString();
        if (!sessionSeenNorm.has(norm)) {
          sessionSeenNorm.add(norm);
          if (id) sessionSeenIds.add(id);
          selectedQuestions.push(q);
          if (selectedQuestions.length >= questionCount) break;
        }
      }
      sessionMode = 'revision';
    }

    // Relaxation Order: company style -> mode -> level -> difficulty -> topic
    const relaxationStages = [
      {
        name: 'Stage 0 (Full Filters)',
        companyStyle: companyStyle || 'General Tech',
        interviewMode: interviewMode || 'mixed',
        experienceLevel: experienceLevel || '',
        difficulty,
        topic: topic ? topic.trim() : ''
      },
      {
        name: 'Stage 1 (Relax Company Style)',
        companyStyle: '',
        interviewMode: interviewMode || 'mixed',
        experienceLevel: experienceLevel || '',
        difficulty,
        topic: topic ? topic.trim() : ''
      },
      {
        name: 'Stage 2 (Relax Mode)',
        companyStyle: '',
        interviewMode: 'mixed',
        experienceLevel: experienceLevel || '',
        difficulty,
        topic: topic ? topic.trim() : ''
      },
      {
        name: 'Stage 3 (Relax Experience Level)',
        companyStyle: '',
        interviewMode: 'mixed',
        experienceLevel: '',
        difficulty,
        topic: topic ? topic.trim() : ''
      },
      {
        name: 'Stage 4 (Relax Difficulty)',
        companyStyle: '',
        interviewMode: 'mixed',
        experienceLevel: '',
        difficulty: '',
        topic: topic ? topic.trim() : ''
      },
      {
        name: 'Stage 5 (Relax Topic)',
        companyStyle: '',
        interviewMode: 'mixed',
        experienceLevel: '',
        difficulty: '',
        topic: ''
      }
    ];

    const runStages = async (excludePastUserHistory) => {
      for (const stage of relaxationStages) {
        if (selectedQuestions.length >= questionCount) break;
        const needed = questionCount - selectedQuestions.length;

        const excludeNormList = excludePastUserHistory
          ? Array.from(new Set([...sessionSeenNorm, ...userAskedNormalized]))
          : Array.from(sessionSeenNorm);
        const excludeIdList = excludePastUserHistory
          ? Array.from(new Set([...sessionSeenIds, ...userAskedIds]))
          : Array.from(sessionSeenIds);

        try {
          const { questions, mode } = await generateQuestions({
            category,
            difficulty: stage.difficulty || 'Medium',
            totalQuestions: needed,
            topic: stage.topic,
            targetRole,
            interviewMode: stage.interviewMode || 'mixed',
            companyStyle: stage.companyStyle || '',
            experienceLevel: stage.experienceLevel || '',
            language: language || 'en-US',
            excludeNormalized: excludeNormList,
            excludeIds: excludeIdList
          });

          if (questions && questions.length > 0) {
            for (const q of questions) {
              const norm = q.normalizedHash || q.normalizedText || normalizeQuestionText(q.questionText);
              const id = (q.questionId || q._id || '').toString();

              // Zero-repeat guarantee within the current session:
              if (sessionSeenNorm.has(norm)) continue;
              if (id && sessionSeenIds.has(id)) continue;
              if (selectedQuestions.some(prev => isTooSimilar(prev.normalizedHash || prev.normalizedText, norm, 0.65))) {
                continue;
              }

              sessionSeenNorm.add(norm);
              if (id) sessionSeenIds.add(id);
              selectedQuestions.push(q);

              if (sessionMode !== 'revision' && selectedQuestions.length === 1) {
                sessionMode = mode;
              }
              if (selectedQuestions.length >= questionCount) break;
            }
          }
        } catch (err) {
          console.warn(`[Interview Controller] ${stage.name} warning for ${category}:`, err.message);
        }
      }
    };

    // Attempt 1: Run progressive relaxation stages while excluding questions user has already seen in past sessions
    await runStages(true);

    // If user has seen all matching questions in this category, reset user history for this category and notify user
    if (selectedQuestions.length < questionCount && (userAskedNormalized.size > 0 || userAskedIds.size > 0)) {
      historyReset = true;
      historyResetMessage = `You've practiced all available questions matching these filters in ${category}! Your question history for this category has been refreshed.`;
      userAskedNormalized.clear();
      userAskedIds.clear();

      // Attempt 2: Re-run progressive relaxation excluding ONLY questions already in this session (NEVER relax sessionSeenNorm)
      await runStages(false);
    }

    // Safety fallback: if question bank was exhausted, dynamically generate category-specific fallback questions
    if (selectedQuestions.length < questionCount) {
      const needed = questionCount - selectedQuestions.length;
      const dynamicFallbacks = generateCategoryFallbackQuestions(category, needed, sessionSeenNorm, difficulty);
      for (const fb of dynamicFallbacks) {
        const norm = fb.normalizedText;
        if (!sessionSeenNorm.has(norm)) {
          sessionSeenNorm.add(norm);
          selectedQuestions.push(fb);
          if (selectedQuestions.length >= questionCount) break;
        }
      }
    }

    if (!selectedQuestions || selectedQuestions.length === 0) {
      return res.status(500).json({
        status: 'error',
        message: `Unable to prepare interview questions for ${category}. Please check your connection or select another category.`
      });
    }

    const questions = selectedQuestions.slice(0, questionCount);
    const mode = sessionMode;

    const now = new Date();

    // Map questions ensuring expected fields, order, and stable question IDs
    const formattedQuestions = questions.map((q, idx) => ({
      questionId: q.questionId || (q._id ? q._id.toString() : null) || `q_${Date.now()}_${idx}`,
      questionText: q.questionText,
      normalizedText: q.normalizedText || '',
      order: idx,
      category: category,
      difficulty: q.difficulty || difficulty,
      topic: q.topic || topic || 'General',
      subtopic: q.subtopic || '',
      questionType: q.questionType || 'conceptual',
      sequenceOrder: q.sequenceOrder || (idx + 1),
      learningStage: q.learningStage || 'Core Concepts',
      interviewRelevanceLabel: q.interviewRelevanceLabel || 'Common interview topic',
      stepByStepExplanation: q.stepByStepExplanation || '',
      practicalExample: q.practicalExample || '',
      commonMistakes: q.commonMistakes || [],
      timeComplexity: q.timeComplexity || '',
      spaceComplexity: q.spaceComplexity || '',
      suggestedFollowUps: q.suggestedFollowUps || [],
      followUpQuestionIds: q.followUpQuestionIds || [],
      expectedKeyPoints: q.expectedKeyPoints || [],
      referenceAnswer: q.referenceAnswer || '',
      hints: q.hints || [],
      codingDetails: q.codingDetails || { constraints: [], examples: [] },
      isAnswered: false,
      startedAt: idx === 0 ? now : null,
      timeSpentSeconds: 0
    }));

    const sessionTimedMode = Boolean(timedMode);
    const parsedTimeLimit = sessionTimedMode
      ? Math.max(30, parseInt(timeLimitPerQuestion, 10) || 120)
      : 0;

    const interview = await Interview.create({
      userId: req.user._id,
      category,
      difficulty,
      topic: topic ? topic.trim() : '',
      targetRole,
      interviewMode,
      companyStyle,
      experienceLevel,
      language: language || 'en-US',
      totalQuestions: formattedQuestions.length,
      currentQuestionIndex: 0,
      mode,
      status: 'in_progress',
      sessionState: 'awaiting_answer',
      startedAt: now,
      currentQuestionStartedAt: now,
      timedMode: sessionTimedMode,
      timeLimitPerQuestion: parsedTimeLimit,
      askedQuestionIds: formattedQuestions.map(q => q.questionId),
      askedQuestionTexts: formattedQuestions.map(q => q.normalizedText).filter(Boolean),
      historyReset: Boolean(historyReset),
      historyResetMessage: historyResetMessage || '',
      conversationHistory: [],
      questions: formattedQuestions
    });

    return res.status(201).json({
      status: 'success',
      serverTime: now.toISOString(),
      historyReset: Boolean(historyReset),
      historyResetMessage: historyResetMessage || '',
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get an interview session by ID
 * GET /api/interviews/:id
 */
export const getInterview = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found. It may have expired or does not exist.'
      });
    }

    // Ownership check
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to view this interview session.'
      });
    }

    // Ensure active question has a valid startedAt if in progress
    if (interview.status === 'in_progress' && interview.questions[interview.currentQuestionIndex]) {
      const activeQ = interview.questions[interview.currentQuestionIndex];
      if (!activeQ.startedAt) {
        activeQ.startedAt = interview.currentQuestionStartedAt || new Date();
        await interview.save();
      }
    }

    return res.status(200).json({
      status: 'success',
      serverTime: new Date().toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit candidate answer for current question
 * POST /api/interviews/:id/answer
 */
export const submitAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answer, questionId } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found. It may have expired or does not exist.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to interact with this interview.'
      });
    }

    if (interview.status === 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'This interview session has already been completed.'
      });
    }

    // Prevent concurrent duplicate evaluations for the same session
    if (interview.isEvaluating || interview.sessionState === 'evaluating') {
      return res.status(409).json({
        status: 'error',
        message: 'An evaluation is already in progress for this session. Please wait.'
      });
    }

    const currentIndex = interview.currentQuestionIndex;
    const currentQuestion = interview.questions[currentIndex];

    if (!currentQuestion) {
      return res.status(400).json({
        status: 'error',
        message: 'No active question found at this index.'
      });
    }

    // Question ID sanity check if provided by client
    if (questionId && currentQuestion.questionId && currentQuestion.questionId !== questionId) {
      return res.status(409).json({
        status: 'error',
        message: 'The submitted question does not match the active question.'
      });
    }

    // Idempotency: if already answered and evaluated, return current evaluation without duplicating
    if (currentQuestion.isAnswered || (currentQuestion.evaluation && currentQuestion.evaluation.score !== undefined)) {
      return res.status(200).json({
        status: 'success',
        alreadyEvaluated: true,
        evaluation: currentQuestion.evaluation,
        serverTime: new Date().toISOString(),
        interview: sanitizeInterviewForCandidate(interview)
      });
    }

    // Save candidate answer first so answer is never lost even if evaluation fails
    currentQuestion.userAnswer = answer ? answer.trim() : '';
    interview.isEvaluating = true;
    interview.sessionState = 'evaluating';
    await interview.save();

    let evaluation = null;
    const qStartTime = currentQuestion.startedAt || interview.currentQuestionStartedAt || interview.startedAt || new Date();
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - new Date(qStartTime).getTime()) / 1000));

    try {
      evaluation = await evaluateAnswer({
        question: currentQuestion,
        questionText: currentQuestion.questionText,
        expectedKeyPoints: currentQuestion.expectedKeyPoints,
        referenceAnswer: currentQuestion.referenceAnswer,
        userAnswer: currentQuestion.userAnswer,
        category: interview.category,
        topic: currentQuestion.topic || interview.topic,
        subtopic: currentQuestion.subtopic,
        difficulty: currentQuestion.difficulty || interview.difficulty,
        targetRole: interview.targetRole || 'Software Engineer',
        experienceLevel: interview.experienceLevel || 'mid',
        interviewMode: interview.interviewMode || 'mixed',
        companyStyle: interview.companyStyle || 'General Tech',
        conversationHistory: interview.conversationHistory || [],
        language: interview.language || 'en-US',
        questionType: currentQuestion.questionType,
        stepByStepExplanation: currentQuestion.stepByStepExplanation,
        practicalExample: currentQuestion.practicalExample,
        commonMistakes: currentQuestion.commonMistakes,
        suggestedFollowUps: currentQuestion.suggestedFollowUps
      });
    } catch (evalErr) {
      interview.isEvaluating = false;
      interview.sessionState = 'failed';
      await interview.save();
      return res.status(500).json({
        status: 'error',
        canRetry: true,
        message: `Evaluation encountered an error: ${evalErr.message}. Your answer was saved. You can retry safely.`,
        interview: sanitizeInterviewForCandidate(interview)
      });
    } finally {
      interview.isEvaluating = false;
    }

    // Save candidate answer, evaluation, and timestamps
    currentQuestion.evaluation = evaluation;
    currentQuestion.submittedAt = new Date();
    currentQuestion.isAnswered = true;
    currentQuestion.timeSpentSeconds = timeSpentSeconds;

    // Record exchange in conversation history
    if (!Array.isArray(interview.conversationHistory)) {
      interview.conversationHistory = [];
    }
    interview.conversationHistory.push({
      role: 'candidate',
      questionId: currentQuestion.questionId,
      questionText: currentQuestion.questionText,
      answerText: currentQuestion.userAnswer,
      verdict: evaluation.verdict || 'partially_correct',
      score: evaluation.score || 0,
      timestamp: new Date()
    });

    // Check if this was the final question in session
    if (currentIndex >= interview.totalQuestions - 1) {
      interview.status = 'completed';
      interview.sessionState = 'completed';
      interview.completedAt = new Date();

      // Calculate final aggregate score (scaled to 100) using question score100
      const evaluatedQuestions = interview.questions.filter(
        q => q.evaluation && typeof q.evaluation.score === 'number'
      );
      if (evaluatedQuestions.length > 0) {
        const totalScore100 = evaluatedQuestions.reduce((acc, q) => {
          const s100 = q.evaluation.score100 !== undefined ? q.evaluation.score100 : Math.round(q.evaluation.score * 10);
          return acc + s100;
        }, 0);
        interview.finalScore = Math.round(totalScore100 / interview.totalQuestions);
      } else {
        interview.finalScore = 0;
      }
      const roleStr = interview.targetRole ? ` for ${interview.targetRole}` : '';
      const levelStr = interview.experienceLevel ? ` (${interview.experienceLevel.toUpperCase()})` : '';
      interview.feedbackSummary = `Completed ${interview.category} (${interview.difficulty})${roleStr}${levelStr} mock interview with an overall score of ${interview.finalScore}%.`;
    } else {
      interview.sessionState = 'awaiting_answer';
      // ADAPTIVE FOLLOW-UP: Dynamically generate tailored next question based on current answer & evaluation
      const nextIndex = currentIndex + 1;
      try {
        const pastSessions = await Interview.find({ userId: req.user._id, category: interview.category })
          .sort({ createdAt: -1 })
          .limit(10)
          .select('askedQuestionTexts askedQuestionIds')
          .lean();

        const userAskedNormalized = new Set(interview.askedQuestionTexts || []);
        const userAskedIds = new Set(interview.askedQuestionIds || []);
        // Ensure all questions currently in session are excluded to avoid duplication
        if (Array.isArray(interview.questions)) {
          interview.questions.forEach(q => {
            if (q.normalizedText) userAskedNormalized.add(q.normalizedText);
            if (q.questionId) userAskedIds.add(q.questionId);
          });
        }
        if (currentQuestion?.normalizedText) userAskedNormalized.add(currentQuestion.normalizedText);
        if (currentQuestion?.questionId) userAskedIds.add(currentQuestion.questionId);
        for (const session of pastSessions) {
          if (Array.isArray(session.askedQuestionTexts)) {
            session.askedQuestionTexts.forEach(t => t && userAskedNormalized.add(t));
          }
          if (Array.isArray(session.askedQuestionIds)) {
            session.askedQuestionIds.forEach(id => id && userAskedIds.add(id));
          }
        }
        // Generate adaptive follow-up
        const adaptiveQuestion = await generateAdaptiveFollowUpQuestion({
          category: interview.category,
          difficulty: interview.difficulty,
          targetRole: interview.targetRole,
          experienceLevel: interview.experienceLevel,
          interviewMode: interview.interviewMode,
          companyStyle: interview.companyStyle,
          previousQuestion: currentQuestion,
          userAnswer: currentQuestion.userAnswer,
          evaluation,
          excludeNormalized: Array.from(userAskedNormalized),
          excludeIds: Array.from(userAskedIds),
          conversationHistory: interview.conversationHistory || [],
          parentQuestionId: currentQuestion.questionId,
          language: interview.language || 'en-US'
        });

        if (adaptiveQuestion) {
          const norm = adaptiveQuestion.normalizedText || normalizeQuestionText(adaptiveQuestion.questionText);
          const isDuplicateInSession = interview.questions.some((q, idx) => {
            if (idx === nextIndex) return false;
            const qNorm = q.normalizedText || normalizeQuestionText(q.questionText);
            return qNorm === norm || isTooSimilar(qNorm, norm, 0.65);
          });

          if (!isDuplicateInSession) {
            adaptiveQuestion.order = nextIndex;
            adaptiveQuestion.isAnswered = false;
            adaptiveQuestion.parentQuestionId = currentQuestion.questionId;
            interview.questions[nextIndex] = adaptiveQuestion;
            if (adaptiveQuestion.questionId) {
              interview.askedQuestionIds.push(adaptiveQuestion.questionId);
            }
            if (norm) {
              interview.askedQuestionTexts.push(norm);
            }
            interview.markModified('questions');
            interview.markModified('askedQuestionIds');
            interview.markModified('askedQuestionTexts');
          }
        }
      } catch (adaptErr) {
        console.warn('[Interview Controller] Failed to generate adaptive follow-up, keeping baseline question:', adaptErr.message);
      }
    }

    interview.markModified('conversationHistory');
    await interview.save();

    return res.status(200).json({
      status: 'success',
      evaluation,
      serverTime: new Date().toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Explicitly advance to next question in interview session
 * POST /api/interviews/:id/next
 */
export const nextQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found. It may have expired or does not exist.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to interact with this interview.'
      });
    }

    if (interview.status === 'completed') {
      return res.status(200).json({
        status: 'success',
        serverTime: new Date().toISOString(),
        interview: sanitizeInterviewForCandidate(interview)
      });
    }

    const currentIndex = interview.currentQuestionIndex;
    const currentQuestion = interview.questions[currentIndex];

    // Must have evaluated or answered before proceeding
    if (!currentQuestion || !currentQuestion.isAnswered) {
      return res.status(400).json({
        status: 'error',
        message: 'Current question has not been evaluated yet.'
      });
    }

    const now = new Date();

    if (currentIndex + 1 < interview.totalQuestions) {
      interview.currentQuestionIndex = currentIndex + 1;
      interview.currentQuestionStartedAt = now;
      interview.sessionState = 'awaiting_answer';
      if (interview.questions[currentIndex + 1]) {
        interview.questions[currentIndex + 1].startedAt = now;
      }
    } else {
      interview.status = 'completed';
      interview.sessionState = 'completed';
      interview.completedAt = now;
    }

    await interview.save();

    return res.status(200).json({
      status: 'success',
      serverTime: now.toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retry evaluation for the current active question if previous attempt failed
 * POST /api/interviews/:id/retry
 */
export const retryEvaluation = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to interact with this interview.'
      });
    }

    const currentQuestion = interview.questions[interview.currentQuestionIndex];
    if (!currentQuestion) {
      return res.status(400).json({
        status: 'error',
        message: 'No active question found.'
      });
    }

    // Reset failed state and question evaluation so retry executes cleanly without short-circuiting
    interview.isEvaluating = false;
    interview.sessionState = 'awaiting_answer';
    currentQuestion.isAnswered = false;
    currentQuestion.evaluation = undefined;
    await interview.save();

    req.body.answer = req.body.answer || currentQuestion.userAnswer || '';
    req.body.questionId = currentQuestion.questionId;
    return submitAnswer(req, res, next);
  } catch (error) {
    next(error);
  }
};

/**
 * Get past interviews for the authenticated user
 * GET /api/interviews
 */
export const getUserInterviews = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      Interview.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Interview.countDocuments({ userId: req.user._id })
    ]);

    return res.status(200).json({
      status: 'success',
      interviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get dashboard statistics for the authenticated user
 * GET /api/interviews/stats
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const completedInterviews = await Interview.find({
      userId,
      status: 'completed'
    })
      .sort({ createdAt: -1 })
      .select('category difficulty finalScore createdAt')
      .lean();

    const completedCount = completedInterviews.length;
    let averageScore = 0;

    if (completedCount > 0) {
      const sum = completedInterviews.reduce((acc, curr) => acc + (curr.finalScore || 0), 0);
      averageScore = Math.round(sum / completedCount);
    }

    const recent = completedInterviews.slice(0, 5);

    return res.status(200).json({
      status: 'success',
      stats: {
        completedCount,
        averageScore: completedCount > 0 ? averageScore : null,
        recent
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update interview settings (e.g. language) mid-session
 * PATCH /api/interviews/:id/settings
 */
export const updateInterviewSettings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID.'
      });
    }

    const interview = await Interview.findOne({ _id: id, userId: req.user._id });
    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found or unauthorized.'
      });
    }

    if (language && typeof language === 'string') {
      interview.language = language.trim();
      await interview.save();
    }

    return res.status(200).json({
      status: 'success',
      language: interview.language
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add more practice questions to an existing interview session
 * POST /api/interviews/:id/more-questions
 */
export const addMorePracticeQuestions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { count = 3 } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to modify this interview.'
      });
    }

    const requestedCount = Math.min(5, Math.max(1, parseInt(count, 10) || 3));

    // Gather all question IDs and normalized texts from current interview and user's past sessions
    const pastSessions = await Interview.find({ userId: req.user._id })
      .select('askedQuestionTexts askedQuestionIds questions.normalizedText questions.questionId')
      .lean();

    const seenNormalized = new Set();
    const seenIds = new Set();

    // Add current interview questions first
    if (Array.isArray(interview.questions)) {
      interview.questions.forEach(q => {
        if (q.normalizedText) seenNormalized.add(q.normalizedText);
        if (q.questionId) seenIds.add(q.questionId);
      });
    }
    if (Array.isArray(interview.askedQuestionIds)) {
      interview.askedQuestionIds.forEach(id => id && seenIds.add(id));
    }
    if (Array.isArray(interview.askedQuestionTexts)) {
      interview.askedQuestionTexts.forEach(t => t && seenNormalized.add(t));
    }

    // Add past sessions
    for (const session of pastSessions) {
      if (Array.isArray(session.askedQuestionTexts)) {
        session.askedQuestionTexts.forEach(t => t && seenNormalized.add(t));
      }
      if (Array.isArray(session.askedQuestionIds)) {
        session.askedQuestionIds.forEach(id => id && seenIds.add(id));
      }
      if (Array.isArray(session.questions)) {
        session.questions.forEach(q => {
          if (q.normalizedText) seenNormalized.add(q.normalizedText);
          if (q.questionId) seenIds.add(q.questionId);
        });
      }
    }

    // Determine current highest sequenceOrder in this interview
    const currentMaxSeq = Array.isArray(interview.questions)
      ? interview.questions.reduce((max, q) => Math.max(max, q.sequenceOrder || 0), 0)
      : 0;

    // Retrieve next sequenced questions
    const { questions: newQuestions } = await generateQuestions({
      category: interview.category,
      difficulty: interview.difficulty,
      totalQuestions: requestedCount,
      topic: interview.topic || '',
      targetRole: interview.targetRole || 'Software Engineer',
      interviewMode: interview.interviewMode || 'mixed',
      companyStyle: interview.companyStyle || 'General Tech',
      experienceLevel: interview.experienceLevel || 'fresher',
      language: interview.language || 'en-US',
      excludeNormalized: Array.from(seenNormalized),
      excludeIds: Array.from(seenIds),
      minSequenceOrder: currentMaxSeq + 1
    });

    if (!newQuestions || newQuestions.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No additional unique questions available for this topic in the question bank.',
        interview: sanitizeInterviewForCandidate(interview)
      });
    }

    const currentLength = interview.questions.length;
    const now = new Date();

    const formattedNewQuestions = newQuestions.map((q, idx) => ({
      questionId: q.questionId || (q._id ? q._id.toString() : null) || `q_${Date.now()}_${currentLength + idx}`,
      questionText: q.questionText,
      normalizedText: q.normalizedText || '',
      order: currentLength + idx,
      category: interview.category,
      difficulty: q.difficulty || interview.difficulty,
      topic: q.topic || interview.topic || 'General',
      subtopic: q.subtopic || '',
      questionType: q.questionType || 'conceptual',
      sequenceOrder: q.sequenceOrder || (currentMaxSeq + idx + 1),
      learningStage: q.learningStage || 'Core Concepts',
      interviewRelevanceLabel: q.interviewRelevanceLabel || 'Common interview topic',
      stepByStepExplanation: q.stepByStepExplanation || '',
      practicalExample: q.practicalExample || '',
      commonMistakes: q.commonMistakes || [],
      timeComplexity: q.timeComplexity || '',
      spaceComplexity: q.spaceComplexity || '',
      suggestedFollowUps: q.suggestedFollowUps || [],
      followUpQuestionIds: q.followUpQuestionIds || [],
      expectedKeyPoints: q.expectedKeyPoints || [],
      referenceAnswer: q.referenceAnswer || '',
      hints: q.hints || [],
      codingDetails: q.codingDetails || { constraints: [], examples: [] },
      isAnswered: false,
      startedAt: null,
      timeSpentSeconds: 0
    }));

    // Append to existing interview questions
    interview.questions.push(...formattedNewQuestions);
    interview.totalQuestions = interview.questions.length;

    formattedNewQuestions.forEach(q => {
      if (q.questionId) interview.askedQuestionIds.push(q.questionId);
      if (q.normalizedText) interview.askedQuestionTexts.push(q.normalizedText);
    });

    // If session was completed, resume it seamlessly for practice continuation
    if (interview.status === 'completed') {
      interview.status = 'in_progress';
      interview.sessionState = 'awaiting_answer';
      interview.currentQuestionIndex = currentLength;
      interview.currentQuestionStartedAt = now;
      if (interview.questions[currentLength]) {
        interview.questions[currentLength].startedAt = now;
      }
      interview.completedAt = null;
    }

    interview.markModified('questions');
    interview.markModified('askedQuestionIds');
    interview.markModified('askedQuestionTexts');
    await interview.save();

    return res.status(200).json({
      status: 'success',
      message: `Successfully added ${formattedNewQuestions.length} practice questions.`,
      addedCount: formattedNewQuestions.length,
      serverTime: now.toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Execute candidate code in sandbox
 * POST /api/interviews/:id/code/execute
 */
export const executeInterviewCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, language = 'java', stdin = '' } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to interact with this interview.'
      });
    }

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Code string is required for execution.'
      });
    }

    const execution = await executeCodeService({
      code,
      language,
      stdin,
      timeout: 10000
    });

    return res.status(200).json({
      status: 'success',
      execution
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit candidate code solution for current question
 * POST /api/interviews/:id/code/submit
 */
export const submitCodeSolution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, language = 'java', questionId } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID format.'
      });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found.'
      });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to interact with this interview.'
      });
    }

    if (interview.status === 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'This interview session has already been completed.'
      });
    }

    const currentIndex = interview.currentQuestionIndex;
    const currentQuestion = interview.questions[currentIndex];

    if (!currentQuestion) {
      return res.status(400).json({
        status: 'error',
        message: 'No active question found at this index.'
      });
    }

    if (questionId && currentQuestion.questionId && currentQuestion.questionId !== questionId) {
      return res.status(409).json({
        status: 'error',
        message: 'The submitted question does not match the active question.'
      });
    }

    // Save candidate solution code
    currentQuestion.userAnswer = code ? code.trim() : '';
    interview.isEvaluating = true;
    interview.sessionState = 'evaluating';
    await interview.save();

    // Run code to verify compiler / execution outcome
    let executionResult = null;
    try {
      executionResult = await executeCodeService({
        code: currentQuestion.userAnswer,
        language,
        timeout: 8000
      });
    } catch (execErr) {
      executionResult = { status: 'error', stdout: '', stderr: execErr.message };
    }

    let evaluation = null;
    const qStartTime = currentQuestion.startedAt || interview.currentQuestionStartedAt || interview.startedAt || new Date();
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - new Date(qStartTime).getTime()) / 1000));

    try {
      evaluation = await evaluateAnswer({
        question: currentQuestion,
        questionText: currentQuestion.questionText,
        expectedKeyPoints: currentQuestion.expectedKeyPoints,
        referenceAnswer: currentQuestion.referenceAnswer,
        userAnswer: currentQuestion.userAnswer,
        category: interview.category,
        topic: currentQuestion.topic || interview.topic,
        subtopic: currentQuestion.subtopic,
        difficulty: currentQuestion.difficulty || interview.difficulty,
        targetRole: interview.targetRole || 'Software Engineer',
        experienceLevel: interview.experienceLevel || 'mid',
        interviewMode: 'coding',
        companyStyle: interview.companyStyle || 'General Tech',
        conversationHistory: interview.conversationHistory || [],
        language: interview.language || 'en-US',
        questionType: 'coding',
        stepByStepExplanation: currentQuestion.stepByStepExplanation,
        practicalExample: currentQuestion.practicalExample,
        commonMistakes: currentQuestion.commonMistakes,
        suggestedFollowUps: currentQuestion.suggestedFollowUps
      });
    } catch (evalErr) {
      interview.isEvaluating = false;
      interview.sessionState = 'failed';
      await interview.save();
      return res.status(500).json({
        status: 'error',
        canRetry: true,
        message: `Evaluation encountered an error: ${evalErr.message}. Your solution was saved. You can retry safely.`,
        interview: sanitizeInterviewForCandidate(interview)
      });
    } finally {
      interview.isEvaluating = false;
    }

    if (executionResult) {
      evaluation.executionOutput = executionResult.stdout || '';
      evaluation.executionStderr = executionResult.stderr || '';
      evaluation.executionStatus = executionResult.status || 'success';
    }

    currentQuestion.evaluation = evaluation;
    currentQuestion.submittedAt = new Date();
    currentQuestion.isAnswered = true;
    currentQuestion.timeSpentSeconds = timeSpentSeconds;

    if (!Array.isArray(interview.conversationHistory)) {
      interview.conversationHistory = [];
    }
    interview.conversationHistory.push({
      role: 'candidate',
      questionId: currentQuestion.questionId,
      questionText: currentQuestion.questionText,
      answerText: currentQuestion.userAnswer,
      verdict: evaluation.verdict || 'partially_correct',
      score: evaluation.score || 0,
      timestamp: new Date()
    });

    if (currentIndex >= interview.totalQuestions - 1) {
      interview.status = 'completed';
      interview.sessionState = 'completed';
      interview.completedAt = new Date();

      const evaluatedQuestions = interview.questions.filter(
        q => q.evaluation && typeof q.evaluation.score === 'number'
      );
      if (evaluatedQuestions.length > 0) {
        const totalScore100 = evaluatedQuestions.reduce((acc, q) => {
          const s100 = q.evaluation.score100 !== undefined ? q.evaluation.score100 : Math.round(q.evaluation.score * 10);
          return acc + s100;
        }, 0);
        interview.finalScore = Math.round(totalScore100 / interview.totalQuestions);
      } else {
        interview.finalScore = 0;
      }
      interview.feedbackSummary = `Completed ${interview.category} (${interview.difficulty}) live coding interview with an overall score of ${interview.finalScore}%.`;
    } else {
      interview.sessionState = 'awaiting_answer';
    }

    await interview.save();

    return res.status(200).json({
      status: 'success',
      evaluation,
      execution: executionResult,
      serverTime: new Date().toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};


