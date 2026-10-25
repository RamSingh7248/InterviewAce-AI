import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  createInterview,
  getInterview,
  submitAnswer,
  nextQuestion,
  retryEvaluation,
  getUserInterviews,
  getEvaluationStatus,
  getDashboardStats,
  updateInterviewSettings,
  addMorePracticeQuestions,
  executeInterviewCode,
  submitCodeSolution,
  revealCodeHint
} from '../controllers/interview.controller.js';

const router = express.Router();

// All interview routes require authentication
router.use(authenticate);

router.post('/', createInterview);
router.post('/start', createInterview);
router.get('/stats', getDashboardStats);
router.get('/history', getUserInterviews);
router.get('/', getUserInterviews);
router.get('/:id/evaluation-status', getEvaluationStatus);
router.get('/:id', getInterview);
router.patch('/:id/settings', updateInterviewSettings);
router.post('/:id/answer', submitAnswer);
router.post('/:id/retry', retryEvaluation);
router.post('/:id/next', nextQuestion);
router.post('/:id/more-questions', addMorePracticeQuestions);
router.post('/:id/code/execute', executeInterviewCode);
router.post('/:id/code/submit', submitCodeSolution);
router.post('/:id/code/hint', revealCodeHint);

export default router;
