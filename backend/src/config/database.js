import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using MONGODB_URI environment variable.
 */
export const connectDB = async () => {
  const rawUri = process.env.MONGODB_URI;

  if (!rawUri || typeof rawUri !== 'string') {
    console.error('[Database Error] MONGODB_URI is not defined in environment variables.');
    return false;
  }

  // Sanitize: strip accidental surrounding whitespace, newlines, and single/double quotes
  const uri = rawUri.trim().replace(/^['"]|['"]$/g, '').trim();

  // Validate scheme safely without logging sensitive credentials
  const hasValidScheme = uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');

  if (!hasValidScheme) {
    const preview = uri.slice(0, 15);
    console.error(
      `[Database Error] Invalid scheme in MONGODB_URI. Expected connection string to start with "mongodb://" or "mongodb+srv://". ` +
      `Detected prefix starts with: "${preview}..." (total length: ${uri.length}). ` +
      `Please verify the MONGODB_URI environment variable in your Render dashboard and ensure there are no leading spaces or quotes.`
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[InterviewAce AI] MongoDB connected successfully: host=${conn.connection.host}, database=${conn.connection.name}`);
    return true;
  } catch (error) {
    // Log failure message safely without exposing credentials or full connection strings
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    return false;
  }
};

export default connectDB;
