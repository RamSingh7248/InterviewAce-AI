import express from 'express';
import {
  getCategories,
  getTopics,
  getQuestions,
  getQuestionById,
  generateQuestionsHandler
} from '../controllers/question.controller.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public / Candidate accessible question catalog endpoints
router.get('/categories', getCategories);
router.get('/topics', getTopics);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);

// Question generation endpoint protected by sliding-window rate limiter
router.post(
  '/generate',
  createRateLimiter({
    windowMs: 60 * 1000,
    max: 15,
    message: 'Rate limit exceeded: You can generate up to 15 question batches per minute. Please wait a moment.'
  }),
  generateQuestionsHandler
);

export default router;
