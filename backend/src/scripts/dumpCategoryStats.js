import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Question from '../models/Question.js';
import { INTERVIEW_CATALOG } from '../config/interviewCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function dumpStats() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace');
  const all = await Question.find({ isActive: true }).lean();
  
  const map = new Map();
  for (const q of all) {
    const c = (q.category || '').toLowerCase();
    if (!map.has(c)) map.set(c, []);
    map.get(c).push(q);
  }

  const results = [];
  for (let i = 0; i < INTERVIEW_CATALOG.categories.length; i++) {
    const cat = INTERVIEW_CATALOG.categories[i];
    const items = map.get(cat.id.toLowerCase()) || [];
    const easy = items.filter(q => q.difficulty === 'Easy').length;
    const med = items.filter(q => q.difficulty === 'Medium').length;
    const hard = items.filter(q => q.difficulty === 'Hard').length;
    results.push({
      index: i + 1,
      id: cat.id,
      type: cat.type,
      count: items.length,
      easy,
      med,
      hard
    });
  }

  console.log(JSON.stringify(results, null, 2));
  await mongoose.disconnect();
}

dumpStats();
