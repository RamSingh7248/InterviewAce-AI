import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Question from '../models/Question.js';
import { ALL_CATEGORY_QUESTIONS, ALL_QUESTIONS } from '../data/questions/index.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';

dotenv.config();

export const seedQuestions = async () => {
  console.log('='.repeat(70));
  console.log('   INTERVIEWACE AI - QUESTION BANK SEEDER (IDEMPOTENT)');
  console.log('='.repeat(70));
  
  const connected = await connectDB();
  if (!connected) {
    console.error('[Question Bank Seeder] Database connection failed. Aborting seed.');
    return;
  }

  try {
    // Drop legacy global unique index on normalizedText if it exists in MongoDB
    try {
      await Question.collection.dropIndex('normalizedText_1');
      console.log('[Question Bank Seeder] Replaced legacy global unique index on normalizedText with (category, normalizedHash)');
    } catch (e) {
      // Index did not exist or was already dropped
    }

    // Backfill normalizedHash on any legacy documents in MongoDB before building unique index
    const legacyDocs = await Question.find({
      $or: [{ normalizedHash: null }, { normalizedHash: { $exists: false } }]
    }).lean();

    if (legacyDocs.length > 0) {
      console.log(`[Question Bank Seeder] Backfilling normalizedHash for ${legacyDocs.length} existing documents...`);
      for (const d of legacyDocs) {
        const h = d.normalizedText || normalizeQuestionText(d.questionText);
        await Question.updateOne({ _id: d._id }, { $set: { normalizedHash: h, normalizedText: h } });
      }
    }

    // Ensure index on (category, normalizedHash) is created
    await Question.collection.createIndex({ category: 1, normalizedHash: 1 }, { unique: true });

    let totalInserted = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;

    const categoryNames = Object.keys(ALL_CATEGORY_QUESTIONS);
    console.log(`Starting synchronization for ${categoryNames.length} categories (${ALL_QUESTIONS.length} questions)...\n`);

    for (let i = 0; i < categoryNames.length; i++) {
      const cat = categoryNames[i];
      const qList = ALL_CATEGORY_QUESTIONS[cat] || [];
      let catInserted = 0;
      let catUpdated = 0;
      let catSkipped = 0;

      for (const raw of qList) {
        const text = raw.question || raw.questionText;
        const norm = raw.normalizedHash || normalizeQuestionText(text);

        const questionData = {
          ...raw,
          questionText: text,
          normalizedText: norm,
          normalizedHash: norm,
          referenceAnswer: raw.idealAnswer || raw.referenceAnswer || '',
          expectedKeyPoints: raw.keyPoints || raw.expectedKeyPoints || [],
          suggestedFollowUps: raw.followUps || raw.suggestedFollowUps || [],
          experienceLevels: raw.levels || raw.experienceLevels || ['fresher', 'junior', 'mid'],
          interviewModes: raw.modes || raw.interviewModes || ['mixed-technical', 'conceptual-deep-dive'],
          questionType: raw.type || raw.questionType || 'conceptual',
          importance: raw.importance || 3,
          isActive: true,
          sourceType: 'curated'
        };

        try {
          const res = await Question.updateOne(
            { category: cat, normalizedHash: norm },
            { $set: questionData },
            { upsert: true }
          );

          if (res.upsertedCount > 0) {
            catInserted++;
          } else if (res.modifiedCount > 0) {
            catUpdated++;
          } else {
            catSkipped++;
          }
        } catch (err) {
          console.warn(`[Warning] Could not upsert question in ${cat}:`, err.message);
        }
      }

      totalInserted += catInserted;
      totalUpdated += catUpdated;
      totalSkipped += catSkipped;

      console.log(`[${(i + 1).toString().padStart(2)}/56] ${cat.padEnd(30)} -> Inserted: ${catInserted.toString().padStart(2)}, Updated: ${catUpdated.toString().padStart(2)}, Skipped: ${catSkipped.toString().padStart(2)} (Total: ${qList.length})`);
    }

    const totalInDB = await Question.countDocuments({ isActive: true });
    console.log('\n' + '='.repeat(70));
    console.log('                      SEED SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Categories Processed: ${categoryNames.length}`);
    console.log(`Total Questions In Bank:    ${ALL_QUESTIONS.length}`);
    console.log(`Newly Inserted:             ${totalInserted}`);
    console.log(`Updated:                    ${totalUpdated}`);
    console.log(`Unchanged / Skipped:        ${totalSkipped}`);
    console.log(`Total Active In Database:   ${totalInDB}`);
    console.log('='.repeat(70));

    return totalInDB;
  } catch (error) {
    console.error('[Question Bank Seeder] Error during seed:', error);
    throw error;
  }
};

// If run directly from command line
if (process.argv[1]?.includes('seedQuestions.js')) {
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
