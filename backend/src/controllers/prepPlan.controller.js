import { 
  generatePrepPlan, 
  getActivePrepPlan, 
  toggleTaskCompletion, 
  replanRemainingDays 
} from '../services/prepPlan.service.js';

/**
 * Generate a new personalized preparation plan
 * POST /api/prep-plan/generate
 */
export const createPlan = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { targetRole, level, durationDays, dailyMinutes } = req.body;

    const plan = await generatePrepPlan({
      userId,
      targetRole: targetRole || req.user.preferences?.targetRole || 'Software Engineer',
      level: level || 'fresher',
      durationDays: durationDays || 14,
      dailyMinutes: dailyMinutes || 60
    });

    const activeDetails = await getActivePrepPlan(userId);

    return res.status(201).json({
      status: 'success',
      data: activeDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get active preparation plan, current day tasks, and streak
 * GET /api/prep-plan/current
 */
export const getCurrentPlan = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const planDetails = await getActivePrepPlan(userId);

    return res.status(200).json({
      status: 'success',
      data: planDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle completion of a specific task
 * PUT /api/prep-plan/tasks/:taskId/toggle
 */
export const toggleTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        status: 'error',
        message: 'Task ID is required.'
      });
    }

    const updatedPlan = await toggleTaskCompletion(userId, taskId);
    const activeDetails = await getActivePrepPlan(userId);

    return res.status(200).json({
      status: 'success',
      data: activeDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Re-plan remaining days based on updated skill gap analytics
 * POST /api/prep-plan/replan
 */
export const replanPlan = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const replanned = await replanRemainingDays(userId);
    const activeDetails = await getActivePrepPlan(userId);

    return res.status(200).json({
      status: 'success',
      data: activeDetails
    });
  } catch (error) {
    next(error);
  }
};
