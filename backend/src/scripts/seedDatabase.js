import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Question from '../models/Question.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';

dotenv.config();

export const seedQuestions = async () => {
  console.log('[Question Bank Seeder] Starting question bank synchronization...');
  
  const connected = await connectDB();
  if (!connected) {
    console.error('[Question Bank Seeder] Database connection failed. Aborting seed.');
    return;
  }

  try {
    let createdCount = 0;
    let updatedCount = 0;

    for (const q of SEED_QUESTIONS) {
      const normalized = normalizeQuestionText(q.questionText);
      const questionData = {
        ...q,
        normalizedText: normalized,
        isActive: true,
        sourceType: 'curated'
      };

      const result = await Question.findOneAndUpdate(
        { normalizedText: normalized },
        { $set: questionData },
        { upsert: true, returnDocument: 'after', runValidators: true }
      );

      if (result.createdAt && result.updatedAt && result.createdAt.getTime() === result.updatedAt.getTime()) {
        createdCount++;
      } else {
        updatedCount++;
      }
    }

    // Ensure any legacy questions in MongoDB have valid sequenceOrder and learningStage
    await Question.updateMany(
      { $or: [{ sequenceOrder: { $exists: false } }, { sequenceOrder: null }] },
      { $set: { sequenceOrder: 10, learningStage: 'Core Concepts', interviewRelevanceLabel: 'Common interview topic' } }
    );

    const totalInDB = await Question.countDocuments({ isActive: true });
    console.log(`[Question Bank Seeder] Synchronization complete. Upserted ${SEED_QUESTIONS.length} questions (Total active in DB: ${totalInDB}).`);
    return totalInDB;
  } catch (error) {
    console.error('[Question Bank Seeder] Error during seed:', error);
    throw error;
  }
};

// If run directly from command line
if (process.argv[1]?.endsWith('seedDatabase.js')) {
  seedQuestions().then(() => {
    mongoose.connection.close();
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
  });
}

export default seedQuestions;
