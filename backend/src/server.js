import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 5001;
const HOST = '0.0.0.0';

// Initialize Database connection then start the HTTP server
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('[Startup Warning] Initial database connection attempt failed:', err.message);
  }

  app.listen(PORT, HOST, () => {
    console.log(`[InterviewAce AI] Server is running on port ${PORT} (host: ${HOST})`);
    console.log(`[InterviewAce AI] Health check: http://${HOST}:${PORT}/api/health`);
  });
};

startServer();
