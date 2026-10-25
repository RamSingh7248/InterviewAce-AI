import User from '../models/User.js';
import { sendAuthResponse, clearAuthCookie } from '../utils/token.js';

/**
 * Register a new user
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const name = req.body.name || req.body.fullName;
    const { email, password } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required'
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email address is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address'
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check for existing user
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'An account with this email address already exists'
      });
    }

    // Create new user (pre-save hook hashes password)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password
    });

    return sendAuthResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Log in an existing user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim() || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user with password hash explicitly selected
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    return sendAuthResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Log out current user (clear cookie)
 * POST /api/auth/logout
 */
export const logout = (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

/**
 * Get current authenticated user profile
 * GET /api/auth/me
 */
export const getMe = (req, res) => {
  return res.status(200).json({
    status: 'success',
    user: req.user
  });
};

/**
 * Update authenticated user profile
 * PATCH /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User account not found'
      });
    }

    const {
      name,
      phoneNumber,
      college,
      graduationYear,
      resumeSkillsText,
      preferences = {}
    } = req.body;

    // Optional resume skills / project text for interview personalization
    if (resumeSkillsText !== undefined) {
      user.resumeSkillsText = String(resumeSkillsText).trim().slice(0, 10000);
    }

    // Validate and update name if provided
    if (name !== undefined) {
      const trimmedName = String(name).trim();
      if (!trimmedName || trimmedName.length < 2) {
        return res.status(400).json({
          status: 'error',
          message: 'Full Name must be at least 2 characters long'
        });
      }
      if (trimmedName.length > 60) {
        return res.status(400).json({
          status: 'error',
          message: 'Full Name cannot exceed 60 characters'
        });
      }
      user.name = trimmedName;
    }

    // Optional phone number
    if (phoneNumber !== undefined) {
      user.phoneNumber = String(phoneNumber).trim().slice(0, 25);
    }

    // Optional college / university
    if (college !== undefined) {
      user.college = String(college).trim().slice(0, 120);
    }

    // Optional graduation year
    if (graduationYear !== undefined) {
      const trimmedYear = String(graduationYear).trim();
      if (trimmedYear && !/^\d{4}$/.test(trimmedYear)) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide a valid 4-digit graduation year'
        });
      }
      user.graduationYear = trimmedYear;
    }

    // Update career preferences
    if (preferences && typeof preferences === 'object') {
      if (preferences.targetRole !== undefined) {
        user.preferences.targetRole = String(preferences.targetRole).trim().slice(0, 80) || 'Software Engineer';
      }

      if (preferences.preferredDifficulty !== undefined) {
        if (['Easy', 'Medium', 'Hard'].includes(preferences.preferredDifficulty)) {
          user.preferences.preferredDifficulty = preferences.preferredDifficulty;
        }
      }

      if (Array.isArray(preferences.preferredCategories)) {
        user.preferences.preferredCategories = preferences.preferredCategories
          .map(c => String(c).trim())
          .filter(Boolean)
          .slice(0, 15);
      }

      if (preferences.preferredQuestionCount !== undefined) {
        const count = parseInt(preferences.preferredQuestionCount, 10);
        if (!isNaN(count) && count >= 1 && count <= 10) {
          user.preferences.preferredQuestionCount = count;
        }
      }
    }

    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};
