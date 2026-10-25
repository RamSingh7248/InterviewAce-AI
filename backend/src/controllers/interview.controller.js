import mongoose from 'mongoose';
import Interview from '../models/Interview.js';
import CodingProblem from '../models/CodingProblem.js';
import { generateQuestions, evaluateAnswer, reviewCodeSubmission, generateAdaptiveFollowUpQuestion, generateInterviewerReaction, isTooSimilar, generateCategoryFallbackQuestions } from '../services/ai.service.js';
import { executeCode as executeCodeService } from '../services/codeExecution.service.js';
import { INTERVIEW_CATALOG, normalizeCategory } from '../config/interviewCatalog.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import { evaluationQueue } from '../services/evaluationQueue.js';
import { updateUserSkillProfile } from '../services/skillGap.service.js';
import { autoCompleteMatchingTask } from '../services/prepPlan.service.js';
import { computeVoiceMetrics } from '../utils/voiceMetrics.js';

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
        if (q.codingDetails && q.codingDetails.hiddenTestCases) {
          delete q.codingDetails.hiddenTestCases;
        }
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
      isRevision = false,
      adaptiveMode = true,
      focusWeakAreas = false,
      voiceMode = false,
      voiceInterview = false
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

    if (interviewMode === 'coding') {
      const codingFilter = {};
      if (difficulty && difficulty !== 'Mixed') {
        codingFilter.difficulty = difficulty;
      }
      const excludeIds = Array.from(new Set([...sessionSeenIds, ...userAskedIds]));
      if (excludeIds.length > 0) {
        codingFilter.$and = [
          { slug: { $nin: excludeIds } },
          { _id: { $nin: excludeIds.filter(id => mongoose.Types.ObjectId.isValid(id)) } }
        ];
      }

      let problems = await CodingProblem.find(codingFilter).limit(questionCount).lean();

      if (problems.length < questionCount && codingFilter.difficulty) {
        delete codingFilter.difficulty;
        problems = await CodingProblem.find(codingFilter).limit(questionCount).lean();
      }

      if (problems.length < questionCount) {
        historyReset = true;
        historyResetMessage = `You've practiced all available coding problems! Your history has been refreshed.`;
        problems = await CodingProblem.find({}).limit(questionCount).lean();
      }

      for (const prob of problems) {
        const norm = prob.normalizedHash || normalizeQuestionText(prob.title);
        const id = (prob._id || prob.slug).toString();
        if (sessionSeenNorm.has(norm) || sessionSeenIds.has(id)) continue;

        sessionSeenNorm.add(norm);
        sessionSeenIds.add(id);

        selectedQuestions.push({
          questionId: id,
          questionText: `${prob.title}\n\n${prob.description}`,
          normalizedText: norm,
          category: category || 'dsa',
          topic: prob.topics?.[0] || 'Algorithm',
          subtopic: prob.topics?.slice(1).join(', ') || 'Coding Challenge',
          difficulty: prob.difficulty,
          questionType: 'coding',
          sequenceOrder: selectedQuestions.length + 1,
          learningStage: prob.difficulty === 'Easy' ? 'Fundamentals' : prob.difficulty === 'Hard' ? 'Advanced Mastery' : 'Core Algorithms',
          interviewRelevanceLabel: 'Coding Assessment',
          hints: prob.hints || [],
          codingDetails: {
            slug: prob.slug,
            problemTitle: prob.title,
            constraints: prob.constraints || [],
            examples: prob.examples || [],
            sampleTestCases: prob.sampleTestCases || [],
            hiddenTestCases: prob.hiddenTestCases || [],
            starterCode: prob.starterCode || {},
            hintsRevealed: 0
          },
          expectedKeyPoints: [
            'Produces correct output for sample and hidden test cases',
            'Optimal time and space complexity',
            'Handles edge cases (empty inputs, bounds, negative numbers)',
            'Clean and readable implementation'
          ],
          referenceAnswer: prob.referenceSolution?.javascript || '',
          stepByStepExplanation: `Analyze problem constraints, write correct logic passing test cases, and consider edge cases.`,
          practicalExample: prob.examples?.[0]?.explanation || 'Solve edge conditions and optimize asymptotic complexity.',
          commonMistakes: [
            'Off-by-one errors in loop boundaries',
            'Unintended mutability or memory overhead',
            'Failing on boundary constraints'
          ]
        });

        if (selectedQuestions.length >= questionCount) break;
      }
      sessionMode = 'coding';
    } else {
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
      voiceMode: Boolean(voiceMode || voiceInterview || interviewMode === 'voice'),
      companyStyle,
      experienceLevel,
      language: language || 'en-US',
      totalQuestions: formattedQuestions.length,
      currentQuestionIndex: 0,
      mode: sessionMode || 'demo',
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
      adaptiveMode: adaptiveMode !== undefined ? Boolean(adaptiveMode) : true,
      focusWeakAreas: Boolean(focusWeakAreas),
      currentDifficulty: difficulty,
      consecutiveStrongAnswers: 0,
      consecutiveWeakAnswers: 0,
      interviewerReactions: [],
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
    const { answer, questionId, voiceMetrics } = req.body;

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

    const currentIndex = interview.currentQuestionIndex;
    let currentQuestion = interview.questions[currentIndex];

    if (!currentQuestion) {
      return res.status(400).json({
        status: 'error',
        message: 'No active question found at this index.'
      });
    }

    if (questionId && currentQuestion.questionId && currentQuestion.questionId !== questionId) {
      const matchingQ = interview.questions.find(q => q.questionId === questionId);
      if (matchingQ) currentQuestion = matchingQ;
    }

    // Prevent duplicate evaluation on the exact same question if already answered
    if (currentQuestion.isAnswered && currentQuestion.evaluation && currentQuestion.evaluation.score !== undefined && currentQuestion.evaluation.evaluationStatus === 'evaluated') {
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

    const qStartTime = currentQuestion.startedAt || interview.currentQuestionStartedAt || interview.startedAt || new Date();
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - new Date(qStartTime).getTime()) / 1000));

    // Run fast evaluation immediately so candidate receives instant baseline feedback and is not blocked
    let evaluation = null;
    const evalPayload = {
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
    };

    try {
      evaluation = await evaluateAnswer(evalPayload, { forceHeuristic: false });
    } catch (evalErr) {
      console.warn('[Interview Controller] Initial evaluation failed, falling back to heuristic:', evalErr.message);
      evaluation = await evaluateAnswer(evalPayload, { forceHeuristic: true });
    }

    // If Gemini was unavailable or skipped in synchronous pass, mark for background refinement
    const isAiEvaluated = evaluation && !evaluation.isFallback && evaluation.evaluatorLabel !== 'Basic evaluation (AI unavailable)';
    evaluation.evaluationStatus = isAiEvaluated ? 'evaluated' : 'evaluating';

    // Compute or enrich voiceMetrics if voice session or voiceMetrics provided
    let processedVoiceMetrics = null;
    if (voiceMetrics || interview.voiceMode) {
      processedVoiceMetrics = computeVoiceMetrics(currentQuestion.userAnswer, voiceMetrics || {});
      currentQuestion.voiceMetrics = processedVoiceMetrics;
      if (evaluation) {
        evaluation.voiceMetrics = processedVoiceMetrics;
        if (!evaluation.scores) {
          evaluation.scores = { technicalAccuracy: 7, completeness: 7, depth: 7, clarity: 7, communication: 7 };
        }
        let commScore = evaluation.scores.communication || 7;
        if (processedVoiceMetrics.fillerWordsCount > 4) {
          commScore = Math.max(3, commScore - 1);
        } else if (processedVoiceMetrics.fillerWordsCount === 0 && processedVoiceMetrics.wpm >= 110 && processedVoiceMetrics.wpm <= 165) {
          commScore = Math.min(10, Math.max(commScore + 1, 8));
        }
        evaluation.scores.communication = commScore;
      }
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

    // 1. Generate Interviewer Persona Reaction
    let reaction = '';
    try {
      reaction = await generateInterviewerReaction({
        companyStyle: interview.companyStyle,
        verdict: evaluation.verdict,
        score: evaluation.score,
        language: interview.language,
        topic: currentQuestion.topic || interview.category
      });
    } catch (rErr) {
      reaction = evaluation.verdict === 'correct' ? 'Solid explanation, let us continue.' : 'Got it. Moving on to the next concept.';
    }
    currentQuestion.interviewerReaction = reaction;
    if (!Array.isArray(interview.interviewerReactions)) {
      interview.interviewerReactions = [];
    }
    interview.interviewerReactions.push({
      questionIndex: currentIndex,
      reactionText: reaction,
      tone: interview.companyStyle || 'General Tech',
      timestamp: new Date()
    });

    // 2. Track Running Adaptive Difficulty
    const qScore = evaluation.score || (evaluation.overallScore !== undefined ? evaluation.overallScore : 0);
    const difficulties = ['Easy', 'Medium', 'Hard'];
    let curDiffIdx = difficulties.indexOf(interview.currentDifficulty || interview.difficulty || 'Medium');
    if (curDiffIdx === -1) curDiffIdx = 1;

    if (interview.adaptiveMode !== false) {
      if (qScore >= 7.5) {
        interview.consecutiveStrongAnswers = (interview.consecutiveStrongAnswers || 0) + 1;
        interview.consecutiveWeakAnswers = 0;
        if (interview.consecutiveStrongAnswers >= 2) {
          if (curDiffIdx < 2) {
            curDiffIdx += 1;
            interview.currentDifficulty = difficulties[curDiffIdx];
          }
          interview.consecutiveStrongAnswers = 0;
        }
      } else if (qScore < 5.0) {
        interview.consecutiveWeakAnswers = (interview.consecutiveWeakAnswers || 0) + 1;
        interview.consecutiveStrongAnswers = 0;
        if (interview.consecutiveWeakAnswers >= 1) {
          if (curDiffIdx > 0) {
            curDiffIdx -= 1;
            interview.currentDifficulty = difficulties[curDiffIdx];
          }
          interview.consecutiveWeakAnswers = 0;
        }
      } else {
        interview.consecutiveStrongAnswers = 0;
        interview.consecutiveWeakAnswers = 0;
      }
    }

    // 3. Smart Follow-Up Generation (for vague/partial/wrong answers on non-follow-up questions)
    let followUpAdded = false;
    const isPartialOrWrong = evaluation.verdict === 'partially_correct' || 
                             evaluation.verdict === 'incorrect' || 
                             (qScore < 6.5 && qScore > 0);

    if (interview.adaptiveMode !== false && !currentQuestion.isFollowUp && isPartialOrWrong) {
      try {
        const pastSessions = await Interview.find({ userId: req.user._id, category: interview.category })
          .sort({ createdAt: -1 })
          .limit(10)
          .select('askedQuestionTexts askedQuestionIds')
          .lean();

        const userAskedNormalized = new Set(interview.askedQuestionTexts || []);
        const userAskedIds = new Set(interview.askedQuestionIds || []);
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

        const adaptiveQuestion = await generateAdaptiveFollowUpQuestion({
          category: interview.category,
          difficulty: interview.currentDifficulty || interview.difficulty,
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
          const isDuplicateInSession = interview.questions.some(q => {
            const qNorm = q.normalizedText || normalizeQuestionText(q.questionText);
            return qNorm === norm || isTooSimilar(qNorm, norm, 0.65);
          });

          if (!isDuplicateInSession) {
            adaptiveQuestion.isFollowUp = true;
            adaptiveQuestion.order = currentIndex + 1;
            adaptiveQuestion.parentQuestionId = currentQuestion.questionId;
            adaptiveQuestion.category = interview.category;
            adaptiveQuestion.isAnswered = false;

            // Splice follow-up into questions array immediately after current question
            interview.questions.splice(currentIndex + 1, 0, adaptiveQuestion);
            interview.totalQuestions = interview.questions.length;

            // Re-index remaining questions
            for (let i = currentIndex + 1; i < interview.questions.length; i++) {
              interview.questions[i].order = i;
            }

            if (adaptiveQuestion.questionId) {
              interview.askedQuestionIds.push(adaptiveQuestion.questionId);
            }
            if (norm) {
              interview.askedQuestionTexts.push(norm);
            }
            interview.markModified('questions');
            interview.markModified('askedQuestionIds');
            interview.markModified('askedQuestionTexts');
            followUpAdded = true;
          }
        }
      } catch (adaptErr) {
        console.warn('[Interview Controller] Failed to generate adaptive follow-up:', adaptErr.message);
      }
    }

    // 4. Session Completion or Advance State
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

        // Aggregate dimensional scores
        const avgDim = (key) => {
          const vals = evaluatedQuestions.map(item => item.evaluation?.scores?.[key]).filter(v => typeof v === 'number');
          if (vals.length === 0) return 0;
          return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
        };

        interview.dimensionScores = {
          technicalAccuracy: avgDim('technicalAccuracy'),
          completeness: avgDim('completeness'),
          depth: avgDim('depth'),
          clarity: avgDim('clarity'),
          communication: avgDim('communication')
        };

        const allStrengths = [];
        const allWeaknesses = [];
        evaluatedQuestions.forEach(item => {
          if (Array.isArray(item.evaluation?.strengths)) allStrengths.push(...item.evaluation.strengths);
          if (Array.isArray(item.evaluation?.improvements)) allWeaknesses.push(...item.evaluation.improvements);
          if (Array.isArray(item.evaluation?.keyPointsMissed)) allWeaknesses.push(...item.evaluation.keyPointsMissed);
        });
        interview.topStrengths = Array.from(new Set(allStrengths)).slice(0, 5);
        interview.topWeaknesses = Array.from(new Set(allWeaknesses)).slice(0, 5);
      } else {
        interview.finalScore = 0;
      }
      const roleStr = interview.targetRole ? ` for ${interview.targetRole}` : '';
      const levelStr = interview.experienceLevel ? ` (${interview.experienceLevel.toUpperCase()})` : '';
      interview.feedbackSummary = `Completed ${interview.category} (${interview.difficulty})${roleStr}${levelStr} mock interview with an overall score of ${interview.finalScore}%.`;

      // Trigger deterministic SkillProfile update in background
      updateUserSkillProfile(interview.userId, interview.targetRole).catch(err => {
        console.warn('[Interview Controller] SkillProfile update notice:', err.message);
      });

      // Auto-complete any matching prep plan tasks
      autoCompleteMatchingTask(interview.userId, {
        category: interview.category,
        topic: interview.topic,
        finalScore: interview.finalScore
      }).catch(err => {
        console.warn('[Interview Controller] PrepPlan auto-complete notice:', err.message);
      });
    } else {
      interview.sessionState = 'awaiting_answer';
      // If adaptive difficulty changed, update difficulty for next question if un-answered
      if (interview.questions[currentIndex + 1] && !interview.questions[currentIndex + 1].isAnswered) {
        interview.questions[currentIndex + 1].difficulty = interview.currentDifficulty;
      }
    }

    interview.markModified('conversationHistory');
    await interview.save();

    if (!isAiEvaluated && currentQuestion.userAnswer && currentQuestion.userAnswer !== '[Skipped]') {
      evaluationQueue.enqueue({
        interviewId: interview._id,
        questionIndex: currentIndex,
        questionId: currentQuestion.questionId,
        evalArgs: evalPayload
      });
    }

    return res.status(200).json({
      status: 'success',
      evaluation,
      interviewerReaction: reaction,
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
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;
    const { category, status, search } = req.query;

    const filter = { userId: req.user._id };
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search && search.trim()) {
      filter.$or = [
        { category: { $regex: search.trim(), $options: 'i' } },
        { targetRole: { $regex: search.trim(), $options: 'i' } },
        { topic: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const [interviews, total] = await Promise.all([
      Interview.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('category topic difficulty targetRole experienceLevel status finalScore totalQuestions questions.isAnswered questions.evaluation.overallScore questions.evaluation.evaluatorLabel dimensionScores topStrengths topWeaknesses createdAt completedAt')
        .lean(),
      Interview.countDocuments(filter)
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
 * Check asynchronous evaluation status for an interview session
 * GET /api/interviews/:id/evaluation-status
 */
export const getEvaluationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ status: 'error', message: 'Invalid session ID' });
    }

    const interview = await Interview.findById(id)
      .select('userId status finalScore dimensionScores topStrengths topWeaknesses questions.evaluation questions.isAnswered isEvaluating')
      .lean();

    if (!interview) {
      return res.status(404).json({ status: 'error', message: 'Interview session not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized to view this interview.' });
    }

    const hasPendingInQueue = evaluationQueue.hasPending(id);
    const pendingQuestions = (interview.questions || []).filter(
      q => q.isAnswered && q.evaluation?.evaluationStatus && ['pending', 'evaluating'].includes(q.evaluation.evaluationStatus)
    );
    const isPending = hasPendingInQueue || pendingQuestions.length > 0;
    const evaluatedCount = (interview.questions || []).filter(
      q => q.evaluation?.evaluationStatus === 'evaluated' || (q.isAnswered && !isPending)
    ).length;
    const totalAnswered = (interview.questions || []).filter(q => q.isAnswered).length;

    return res.status(200).json({
      status: 'success',
      isPending,
      pendingCount: evaluationQueue.getPendingCount(id) || pendingQuestions.length,
      evaluatedCount,
      totalAnswered,
      isCompleted: interview.status === 'completed',
      finalScore: interview.finalScore,
      dimensionScores: interview.dimensionScores,
      topStrengths: interview.topStrengths,
      topWeaknesses: interview.topWeaknesses
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

    // 1. Gather all test cases for current coding problem
    const sampleTests = currentQuestion.codingDetails?.sampleTestCases || [];
    const hiddenTests = currentQuestion.codingDetails?.hiddenTestCases || [];
    const allTests = [...sampleTests, ...hiddenTests];
    const totalTests = Math.max(1, allTests.length);

    let testsPassed = 0;
    const testResults = [];
    const qStartTime = currentQuestion.startedAt || interview.currentQuestionStartedAt || interview.startedAt || new Date();
    const startTimeMs = Date.now();

    // 2. Run Test Cases
    if (language === 'javascript' && allTests.length > 0) {
      // Direct in-process sandbox evaluation for JavaScript
      for (const t of allTests) {
        try {
          const runner = new Function('input', `${currentQuestion.userAnswer}\nreturn solve(input);`);
          const res = runner(t.input);
          const actual = String(res !== undefined ? res : '').trim();
          const expected = String(t.expectedOutput || '').trim();
          const passed = actual === expected;
          if (passed) testsPassed++;
          testResults.push({ input: t.input, expected, actual, passed });
        } catch (err) {
          testResults.push({ input: t.input, expected: t.expectedOutput, actual: err.message, passed: false });
        }
      }
    } else if (allTests.length > 0) {
      // Remote runner (Judge0 / Mock) execution
      try {
        const firstTest = allTests[0];
        const execOut = await executeCodeService({
          code: currentQuestion.userAnswer,
          language,
          stdin: firstTest.input || '',
          timeout: 5000
        });

        if (execOut && execOut.status === 'success') {
          const actual = (execOut.stdout || '').trim();
          const expected = (firstTest.expectedOutput || '').trim();
          if (actual === expected || execOut.provider === 'mock') {
            testsPassed = totalTests; // Reference or mock match
          } else {
            testsPassed = Math.max(1, Math.floor(totalTests / 2));
          }
        } else {
          testsPassed = 0;
        }
      } catch (e) {
        testsPassed = Math.max(1, Math.floor(totalTests / 2));
      }
    } else {
      testsPassed = 1;
    }

    const runtimeMs = Date.now() - startTimeMs;
    const testScore = Math.round((testsPassed / totalTests) * 100);

    // 3. AI Code Review (with fallback)
    let codeReview = null;
    try {
      codeReview = await reviewCodeSubmission({
        problemTitle: currentQuestion.codingDetails?.problemTitle || currentQuestion.topic || 'Coding Challenge',
        description: currentQuestion.questionText,
        code: currentQuestion.userAnswer,
        language,
        constraints: currentQuestion.codingDetails?.constraints || [],
        testsPassed,
        totalTests,
        referenceAnswer: currentQuestion.referenceAnswer
      });
    } catch (reviewErr) {
      console.warn('[Interview Controller] Review code exception:', reviewErr.message);
      codeReview = {
        correctnessScore: Math.round((testsPassed / totalTests) * 10),
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        edgeCasesHandled: ['Standard boundaries'],
        edgeCasesMissed: testsPassed < totalTests ? ['Failing test case constraints'] : [],
        readabilityScore: 7,
        reviewScore: Math.round((testsPassed / totalTests) * 10),
        strengths: ['Valid syntax structure', 'Addresses primary task'],
        improvements: ['Profile edge-case bounds'],
        betterApproach: currentQuestion.referenceAnswer ? 'Optimal algorithm provided in model answer.' : 'Consider optimized linear scan.',
        feedback: `Automated test evaluation: ${testsPassed}/${totalTests} tests passed.`,
        isFallback: true,
        evaluatorLabel: 'Basic evaluation (AI unavailable)'
      };
    }

    // 4. Calculate Final Hybrid Score: 60% Tests + 40% Review - Hint Deductions (5% each)
    const hintsUsed = Number(req.body.hintsUsed) || currentQuestion.codingDetails?.hintsRevealed || 0;
    const hintPenalty = hintsUsed * 5;
    const reviewScore100 = Math.min(100, (codeReview.reviewScore || 7) * 10);
    const calculatedScore100 = Math.max(0, Math.min(100, Math.round(0.6 * testScore + 0.4 * reviewScore100 - hintPenalty)));
    const overallScore10 = Math.round((calculatedScore100 / 10) * 10) / 10;

    const evaluation = {
      overallScore: overallScore10,
      score: overallScore10,
      score100: calculatedScore100,
      evaluationStatus: 'evaluated',
      verdict: calculatedScore100 >= 70 ? 'correct' : (calculatedScore100 >= 40 ? 'partially_correct' : 'incorrect'),
      feedback: codeReview.feedback || `Solution evaluated: ${testsPassed}/${totalTests} tests passed.`,
      scores: {
        technicalAccuracy: codeReview.correctnessScore || Math.round(testScore / 10),
        completeness: Math.round(testScore / 10),
        depth: Math.round(codeReview.reviewScore || 7),
        clarity: codeReview.readabilityScore || 7,
        communication: 8
      },
      codeReview,
      testsPassed,
      totalTests,
      hintsUsed,
      hintPenalty,
      runtimeMs,
      keyPointsCovered: codeReview.edgeCasesHandled || ['Primary algorithmic logic'],
      keyPointsMissed: codeReview.edgeCasesMissed || [],
      strengths: codeReview.strengths || [],
      improvements: codeReview.improvements || [],
      mistakes: codeReview.edgeCasesMissed || [],
      betterAnswer: codeReview.betterApproach || currentQuestion.referenceAnswer,
      isFallback: codeReview.isFallback || false,
      evaluatorLabel: codeReview.evaluatorLabel || 'AI Code Evaluation',
      confidence: 0.9
    };

    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - new Date(qStartTime).getTime()) / 1000));
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
      verdict: evaluation.verdict,
      score: evaluation.score,
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
      interview.feedbackSummary = `Completed ${interview.category} live coding interview with an overall score of ${interview.finalScore}%.`;

      // Phase 3 & 4 hooks on interview completion
      updateUserSkillProfile(interview.userId, interview._id).catch(e => console.warn('[SkillGap] Hook warning:', e.message));
      autoCompleteMatchingTask(interview.userId, {
        category: interview.category,
        topic: currentQuestion.topic,
        finalScore: interview.finalScore
      }).catch(e => console.warn('[PrepPlan] Hook warning:', e.message));
    } else {
      interview.sessionState = 'awaiting_answer';
    }

    interview.isEvaluating = false;
    await interview.save();

    return res.status(200).json({
      status: 'success',
      evaluation,
      testsPassed,
      totalTests,
      runtimeMs,
      testResults: testResults.slice(0, 3), // return sample test outcomes
      serverTime: new Date().toISOString(),
      interview: sanitizeInterviewForCandidate(interview)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reveal the next available hint for a live coding problem
 * POST /api/interviews/:id/code/hint
 */
export const revealCodeHint = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ status: 'error', message: 'Invalid interview session ID format.' });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ status: 'error', message: 'Interview session not found.' });
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized.' });
    }

    const currentIndex = interview.currentQuestionIndex;
    const currentQuestion = interview.questions[currentIndex];
    if (!currentQuestion) return res.status(400).json({ status: 'error', message: 'No active question.' });

    const hints = currentQuestion.hints || [];
    if (!currentQuestion.codingDetails) currentQuestion.codingDetails = {};
    const revealedSoFar = currentQuestion.codingDetails.hintsRevealed || 0;

    if (revealedSoFar >= hints.length) {
      return res.status(200).json({
        status: 'success',
        hint: null,
        message: 'All available hints have already been revealed for this problem.',
        hintsRevealed: revealedSoFar,
        totalHints: hints.length
      });
    }

    const nextHint = hints[revealedSoFar];
    currentQuestion.codingDetails.hintsRevealed = revealedSoFar + 1;
    await interview.save();

    return res.status(200).json({
      status: 'success',
      hint: nextHint,
      hintsRevealed: revealedSoFar + 1,
      totalHints: hints.length,
      penaltyNotice: '5% score deduction applied for viewing this hint.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Discard / delete an incomplete or unwanted interview session
 * DELETE /api/interviews/:id
 */
export const discardInterview = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid interview session ID.'
      });
    }

    const interview = await Interview.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!interview) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview session not found or unauthorized.'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Interview session discarded successfully.'
    });
  } catch (error) {
    next(error);
  }
};



