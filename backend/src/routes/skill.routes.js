/**
 * InterviewAce AI - Skill Gap Analyzer Routes
 */

import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getSkillOverview,
  getSkillGaps,
  getSkillDetails
} from '../controllers/skill.controller.js';

const router = express.Router();

// Enforce authentication on all skill analysis endpoints
router.use(authenticate);

// Skill analytics endpoints
router.get('/overview', getSkillOverview);
router.get('/gaps', getSkillGaps);
router.get('/:skillName', getSkillDetails);

export default router;
