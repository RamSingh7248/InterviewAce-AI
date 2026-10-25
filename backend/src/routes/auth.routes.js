import express from 'express';
import {
  signup,
  login,
  refreshSession,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
  completeOnboarding
} from '../controllers/auth.controller.js';
import authenticate from '../middleware/authenticate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public auth routes with rate limiting
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Session management
router.post('/refresh', refreshSession);
router.post('/logout', logout);

// Protected user routes
router.get('/me', authenticate, getMe);
router.post('/change-password', authenticate, changePassword);
router.post('/onboarding', authenticate, completeOnboarding);
router.patch('/profile', authenticate, updateProfile);
router.put('/profile', authenticate, updateProfile);

export default router;

