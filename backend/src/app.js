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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// CORS Configuration with Credentials support
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
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

  res.status(200).json({
    status: 'ok',
    service: 'InterviewAce AI Backend API',
    database: dbStatus,
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

// 404 handler for undefined API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Serve frontend client build in single-host mode
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // SPA fallback for all web page routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Fallback 404 handler if dist is not built yet
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: `Frontend build not found at ${clientDistPath}. Run 'npm run build' in client directory.`
    });
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

export default app;
