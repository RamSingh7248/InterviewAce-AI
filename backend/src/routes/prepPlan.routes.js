import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  createPlan,
  getCurrentPlan,
  toggleTask,
  replanPlan
} from '../controllers/prepPlan.controller.js';

const router = express.Router();

// Enforce authentication on all prep plan endpoints
router.use(authenticate);

// Personalized Preparation Plan endpoints
router.post('/generate', createPlan);
router.get('/current', getCurrentPlan);
router.put('/tasks/:taskId/toggle', toggleTask);
router.post('/replan', replanPlan);

export default router;
