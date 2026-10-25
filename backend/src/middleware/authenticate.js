import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getJwtSecret } from '../utils/token.js';

export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization header (Bearer token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Check HttpOnly cookies (accessToken or legacy token)
    else if (req.cookies && (req.cookies.accessToken || req.cookies.token)) {
      token = req.cookies.accessToken || req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        code: 'UNAUTHENTICATED',
        message: 'Authentication required. Please log in.'
      });
    }

    // Verify token using centralized secret helper
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);

    // Find authenticated user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 'USER_NOT_FOUND',
        message: 'User belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        code: 'TOKEN_EXPIRED',
        message: 'Access token expired. Please refresh your session.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        code: 'INVALID_TOKEN',
        message: 'Invalid access token. Please log in again.'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Authentication check failed.'
    });
  }
};

export default authenticate;
