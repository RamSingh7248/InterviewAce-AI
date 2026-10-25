import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using MONGODB_URI environment variable.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[Database Error] MONGODB_URI is not defined in environment variables.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[InterviewAce AI] MongoDB connected successfully: host=${conn.connection.host}, database=${conn.connection.name}`);
    return true;
  } catch (error) {
    // Log failure message safely without exposing credentials or full connection strings
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    return false;
  }
};

export default connectDB;
