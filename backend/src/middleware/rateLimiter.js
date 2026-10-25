/**
 * In-memory sliding-window rate limiter for AI generation and sensitive API endpoints.
 * Protects against quota exhaustion, automated spam, and server overloading.
 */

const requestBuckets = new Map();

/**
 * Creates an Express rate limiting middleware.
 * 
 * @param {Object} options
 * @param {number} options.windowMs - Time window in milliseconds (default 60s)
 * @param {number} options.max - Max requests per window per identifier (default 10)
 * @param {string} options.message - Error message when rate limit exceeded
 */
export const createRateLimiter = ({
  windowMs = 60 * 1000,
  max = 10,
  message = 'Too many requests. Please wait before generating more questions.'
} = {}) => {
  return (req, res, next) => {
    // Identify by authenticated user ID if available, otherwise by IP
    const key = req.user?._id ? `user_${req.user._id}` : `ip_${req.ip || req.connection.remoteAddress}`;
    const now = Date.now();

    let bucket = requestBuckets.get(key);
    if (!bucket) {
      bucket = [];
      requestBuckets.set(key, bucket);
    }

    // Filter out timestamps outside the active window
    const windowStart = now - windowMs;
    const recentRequests = bucket.filter(timestamp => timestamp > windowStart);

    if (recentRequests.length >= max) {
      const oldestRequest = recentRequests[0];
      const retryAfterSeconds = Math.ceil((oldestRequest + windowMs - now) / 1000);

      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        status: 'error',
        message,
        retryAfterSeconds
      });
    }

    recentRequests.push(now);
    requestBuckets.set(key, recentRequests);

    // Periodically clean up stale keys to prevent memory leaks
    if (requestBuckets.size > 5000) {
      for (const [k, timestamps] of requestBuckets.entries()) {
        const valid = timestamps.filter(t => t > windowStart);
        if (valid.length === 0) {
          requestBuckets.delete(k);
        } else {
          requestBuckets.set(k, valid);
        }
      }
    }

    next();
  };
};

export default createRateLimiter;
