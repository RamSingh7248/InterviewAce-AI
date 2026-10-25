import mongoose from 'mongoose';

const topicSkillSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  category: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  emaScore: { type: Number, default: 0 },
  lastScores: [{ type: Number }],
  trend: { 
    type: String, 
    enum: ['improving', 'declining', 'steady', 'neutral'], 
    default: 'neutral' 
  },
  masteryLabel: { 
    type: String, 
    enum: ['Beginner', 'Developing', 'Proficient', 'Strong'], 
    default: 'Beginner' 
  },
  missingConcepts: [{ type: String }],
  strengths: [{ type: String }],
  lastAttemptDate: { type: Date }
}, { _id: false });

const categorySkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  emaScore: { type: Number, default: 0 },
  trend: { 
    type: String, 
    enum: ['improving', 'declining', 'steady', 'neutral'], 
    default: 'neutral' 
  },
  masteryLabel: { 
    type: String, 
    enum: ['Beginner', 'Developing', 'Proficient', 'Strong'], 
    default: 'Beginner' 
  }
}, { _id: false });

const skillProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true, 
    index: true 
  },
  targetRole: { type: String, default: 'Software Engineer' },
  overallScore: { type: Number, default: 0 },
  readinessPercentage: { type: Number, default: 0 },
  completedSessionsCount: { type: Number, default: 0 },
  narrativeSummary: { type: String, default: '' },
  categories: [categorySkillSchema],
  topics: [topicSkillSchema],
  scoreHistory: [{
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    category: { type: String },
    score: { type: Number },
    date: { type: Date, default: Date.now }
  }],
  lastCalculatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const SkillProfile = mongoose.model('SkillProfile', skillProfileSchema);

export default SkillProfile;
