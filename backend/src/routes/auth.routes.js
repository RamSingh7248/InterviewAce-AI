import express from 'express';
import { signup, login, logout, getMe, updateProfile } from '../controllers/auth.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
router.patch('/profile', authenticate, updateProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
