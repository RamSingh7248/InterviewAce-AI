import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 5001;

// Initialize Database connection then start the HTTP server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[InterviewAce AI] Server is running on port ${PORT}`);
    console.log(`[InterviewAce AI] Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
