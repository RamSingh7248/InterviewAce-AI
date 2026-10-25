import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 1000; // 1 hour in ms
const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }
  return secret;
};

export const getRefreshSecret = () => {
  return process.env.JWT_REFRESH_SECRET || `${getJwtSecret()}_refresh`;
};

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, getJwtSecret(), {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, getRefreshSecret(), {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN
  });
};

// Backward-compatible alias
export const generateToken = generateAccessToken;

export const verifyAccessToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, getRefreshSecret());
};

export const getCookieOptions = (isRefresh = false) => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: isRefresh ? REFRESH_COOKIE_MAX_AGE : ACCESS_COOKIE_MAX_AGE,
    path: '/'
  };
};

export const sendAuthResponse = async (user, statusCode, res) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store refresh token on user if model instance provided
  if (user && typeof user.save === 'function') {
    user.refreshToken = refreshToken;
    await user.save();
  }

  // Set httpOnly cookies
  res.cookie('token', accessToken, getCookieOptions(false));
  res.cookie('refreshToken', refreshToken, getCookieOptions(true));

  return res.status(statusCode).json({
    status: 'success',
    token: accessToken,
    accessToken,
    user
  });
};

export const clearAuthCookie = (res) => {
  const isProd = process.env.NODE_ENV === 'production';
  const baseOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0
  };

  res.cookie('token', '', baseOptions);
  res.cookie('accessToken', '', baseOptions);
  res.cookie('refreshToken', '', baseOptions);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
  getCookieOptions,
  sendAuthResponse,
  clearAuthCookie
};
