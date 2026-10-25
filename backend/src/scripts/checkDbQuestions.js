import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interviewace');
  const Question = mongoose.model('Question', new mongoose.Schema({}, { strict: false }));
  const total = await Question.countDocuments({ isActive: true });
  const counts = await Question.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  console.log(`Total active questions: ${total}`);
  console.log(`Categories with questions: ${counts.length}`);
  counts.forEach(c => console.log(`  ${c._id}: ${c.count}`));
  await mongoose.disconnect();
}

check().catch(console.error);
