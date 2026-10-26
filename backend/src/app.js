import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import questionRoutes from './routes/question.routes.js';
import skillRoutes from './routes/skill.routes.js';
import prepPlanRoutes from './routes/prepPlan.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateDistPaths = [
  process.env.CLIENT_DIST_PATH,
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), '../client/dist'),
  path.resolve(process.cwd(), 'dist')
].filter(Boolean);

export const resolveClientDist = () => {
  for (const candidate of candidateDistPaths) {
    if (fs.existsSync(path.join(candidate, 'index.html'))) {
      return candidate;
    }
  }
  return path.resolve(__dirname, '../../client/dist');
};

const app = express();

// Trust the immediate front-facing reverse proxy (1 hop on Render / load balancers)
// This safely extracts client IP from X-Forwarded-For without blindly trusting client-forged headers,
// satisfying express-rate-limit validation requirements and correctly keying rate limits by client IP.
app.set('trust proxy', 1);

// CORS Configuration with Credentials support
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.RENDER_EXTERNAL_URL,
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost:5001',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5001',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV === 'production') {
      return callback(new Error('Blocked by CORS policy: Origin not allowed'));
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Body and Cookie Parsers
app.use(express.json());
app.use(cookieParser());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const dbStatus = dbStates[mongoose.connection.readyState] || 'unknown';
  const activeDist = resolveClientDist();
  const frontendReady = fs.existsSync(path.join(activeDist, 'index.html'));

  res.status(200).json({
    status: 'ok',
    service: 'InterviewAce AI Backend API',
    database: dbStatus,
    frontend: frontendReady ? 'ready' : 'missing',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Mock Interview Session Routes
app.use('/api/interviews', interviewRoutes);

// Question Bank Routes
app.use('/api/questions', questionRoutes);

// Skill Gap Analyzer Routes
app.use('/api/skills', skillRoutes);

// Personalized Preparation Plan Routes
app.use('/api/prep-plan', prepPlanRoutes);

// 404 handler for undefined API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Serve static assets from the resolved client build folder dynamically
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const activeDist = resolveClientDist();
  return express.static(activeDist, { index: false })(req, res, next);
});

// Serve root route "/" directly with index.html
app.get('/', (req, res) => {
  const activeDist = resolveClientDist();
  const activeIndex = path.join(activeDist, 'index.html');
  if (fs.existsSync(activeIndex)) {
    return res.sendFile(activeIndex);
  }
  return res.status(404).json({
    status: 'error',
    message: `Frontend build not found at ${activeDist}. Ensure 'npm run build' was executed in client directory.`,
    searchedPaths: candidateDistPaths
  });
});

// SPA fallback for all web page routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  const activeDist = resolveClientDist();
  const activeIndex = path.join(activeDist, 'index.html');
  if (fs.existsSync(activeIndex)) {
    return res.sendFile(activeIndex);
  }
  return res.status(404).json({
    status: 'error',
    message: `Frontend build not found at ${activeDist}. Ensure 'npm run build' was executed in client directory.`,
    searchedPaths: candidateDistPaths
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

export default app;
