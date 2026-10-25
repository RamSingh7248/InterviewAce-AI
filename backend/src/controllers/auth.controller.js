import crypto from 'crypto';
import User from '../models/User.js';
import { 
  sendAuthResponse, 
  clearAuthCookie, 
  verifyRefreshToken, 
  generateAccessToken, 
  generateRefreshToken, 
  getCookieOptions 
} from '../utils/token.js';

/**
 * Validate password strength:
 * Minimum 8 characters, at least one letter and at least one number
 */
export const isPasswordStrong = (password) => {
  if (!password || typeof password !== 'string') return false;
  if (password.length < 8) return false;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
};

/**
 * Register a new user
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const name = req.body.name || req.body.fullName;
    const { email, password, confirmPassword } = req.body;

    // 1. Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required'
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must be at least 2 characters long'
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

    if (!isPasswordStrong(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters long and contain at least one letter and one number'
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Passwords do not match'
      });
    }

    // 2. Check for existing user (clear 400 error, not generic 500)
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'An account with this email address already exists'
      });
    }

    // 3. Create new user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      onboardingCompleted: false
    });

    return await sendAuthResponse(user, 201, res);
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

    // Generic error message for both non-existent user and wrong password to prevent user enumeration
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

    return await sendAuthResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Silent Refresh Access Token
 * POST /api/auth/refresh
 */
export const refreshSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        code: 'NO_REFRESH_TOKEN',
        message: 'No refresh token provided. Please log in.'
      });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      clearAuthCookie(res);
      return res.status(401).json({
        status: 'error',
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Session has expired or is invalid. Please log in again.'
      });
    }

    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({
        status: 'error',
        code: 'USER_NOT_FOUND',
        message: 'User account not found.'
      });
    }

    // Verify stored refresh token is active and matches
    if (!user.refreshToken || user.refreshToken !== refreshToken) {
      clearAuthCookie(res);
      return res.status(401).json({
        status: 'error',
        code: 'REVOKED_REFRESH_TOKEN',
        message: 'Refresh token has been revoked or logged out. Please log in again.'
      });
    }

    // Rotate tokens
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('token', newAccessToken, getCookieOptions(false));
    res.cookie('refreshToken', newRefreshToken, getCookieOptions(true));

    return res.status(200).json({
      status: 'success',
      token: newAccessToken,
      accessToken: newAccessToken,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Log out current user (clear both cookies and invalidate token)
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        if (decoded?.id) {
          await User.findByIdAndUpdate(decoded.id, { refreshToken: '' });
        }
      } catch (e) {
        // Ignore token verification errors during logout
      }
    } else if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, { refreshToken: '' });
    }

    clearAuthCookie(res);

    return res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request Password Reset Token
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide an email address'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    // For security: return identical generic message even if email is not found
    if (!user) {
      return res.status(200).json({
        status: 'success',
        message: 'If an account exists with that email address, password reset instructions have been generated.'
      });
    }

    // Generate random 32-byte hex reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity
    await user.save();

    const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
    const resetUrl = `${clientOrigin}/reset-password/${resetToken}`;

    // Developer notification & production email integration hook
    console.log('\n==================================================================');
    console.log('[AUTH DEV NOTIFICATION] PASSWORD RESET REQUEST');
    console.log(`Recipient: ${user.email}`);
    console.log(`Reset Link: ${resetUrl}`);
    console.log(`Expires: 1 hour (${user.passwordResetExpires.toISOString()})`);
    console.log('------------------------------------------------------------------');
    console.log('TODO: In production, wire up a transactional email service:');
    console.log('  - Example: await resend.emails.send({ to: user.email, subject: "Reset Password", html: `<a href="${resetUrl}">Reset Password</a>` });');
    console.log('  - Or Nodemailer: await transporter.sendMail({ to: user.email, ... });');
    console.log('==================================================================\n');

    return res.status(200).json({
      status: 'success',
      message: 'If an account exists with that email address, password reset instructions have been generated.',
      // In development mode, return resetToken / resetUrl for convenience
      resetToken: process.env.NODE_ENV !== 'production' ? resetToken : undefined,
      resetUrl: process.env.NODE_ENV !== 'production' ? resetUrl : undefined
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password using Token
 * POST /api/auth/reset-password/:token
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Reset token is required'
      });
    }

    if (!isPasswordStrong(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters long and contain at least one letter and one number'
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Passwords do not match'
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Password reset token is invalid or has expired. Please request a new link.'
      });
    }

    user.password = password;
    user.passwordResetToken = '';
    user.passwordResetExpires = undefined;
    await user.save();

    return await sendAuthResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Change Password (Authenticated)
 * POST /api/auth/change-password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide your current password'
      });
    }

    if (!isPasswordStrong(newPassword)) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be at least 8 characters long and contain at least one letter and one number'
      });
    }

    if (confirmPassword !== undefined && newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'New password and confirmation do not match'
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User account not found'
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
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
 * First-Time Onboarding
 * POST /api/auth/onboarding
 */
export const completeOnboarding = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const { targetRole, experienceLevel, preferredCategories, preferredDifficulty } = req.body;

    if (!user.preferences) user.preferences = {};

    if (targetRole) user.preferences.targetRole = String(targetRole).trim();
    if (preferredDifficulty && ['Easy', 'Medium', 'Hard'].includes(preferredDifficulty)) {
      user.preferences.preferredDifficulty = preferredDifficulty;
    }
    if (Array.isArray(preferredCategories)) {
      user.preferences.preferredCategories = preferredCategories.slice(0, 10);
    }
    user.onboardingCompleted = true;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Onboarding completed successfully',
      user
    });
  } catch (error) {
    next(error);
  }
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
