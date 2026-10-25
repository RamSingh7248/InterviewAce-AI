import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedCodingProblems } from '../data/codingProblems/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function run() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';
  console.log('Connecting to MongoDB:', mongoUri);
  await mongoose.connect(mongoUri);

  try {
    const res = await seedCodingProblems();
    console.log(`Seeding complete:`, res);
  } catch (err) {
    console.error('Error seeding coding problems:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
