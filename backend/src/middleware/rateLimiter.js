import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Authentication Endpoints (Login & Signup)
 * Slows down brute-force credential stuffing and denial of service.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    status: 'error',
    message: 'Too many authentication attempts from this IP address. Please try again after 15 minutes.'
  }
});

/**
 * Generic Rate Limiter factory helper
 */
export const createRateLimiter = ({
  windowMs = 60 * 1000,
  max = 30,
  message = 'Too many requests. Please wait a moment.'
} = {}) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message
    }
  });
};

export default {
  authLimiter,
  createRateLimiter
};

