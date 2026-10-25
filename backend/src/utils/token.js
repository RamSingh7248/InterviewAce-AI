import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '7d';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }
  return jwt.sign({ id: userId }, secret, {
    expiresIn: JWT_EXPIRES_IN
  });
};

export const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  };
};

export const sendAuthResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = getCookieOptions();

  res.cookie('token', token, cookieOptions);

  return res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

export const clearAuthCookie = (res) => {
  const { maxAge, ...cookieOptions } = getCookieOptions();
  res.cookie('token', '', {
    ...cookieOptions,
    expires: new Date(0),
    maxAge: 0
  });
};
