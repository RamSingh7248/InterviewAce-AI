import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function dumpExisting() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interviewace');
  const Question = mongoose.model('Question', new mongoose.Schema({}, { strict: false }));
  const docs = await Question.find({ isActive: true }).lean();
  console.log(`Total questions in DB: ${docs.length}`);

  const sample = docs[0];
  console.log('Sample question keys:', Object.keys(sample));
  console.log('Sample question category:', sample.category, 'topic:', sample.topic);
  console.log('Sample text:', sample.questionText?.slice(0, 60));

  await mongoose.disconnect();
}

dumpExisting().catch(console.error);
