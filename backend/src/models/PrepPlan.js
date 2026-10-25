import mongoose from 'mongoose';

const studyNotesSchema = new mongoose.Schema({
  keyPoints: [{ type: String }],
  idealAnswerSnippet: { type: String, default: '' },
  suggestedResources: [{ type: String }] // Resource names only, e.g. "Effective Java by Joshua Bloch"
}, { _id: false });

const planTaskSchema = new mongoose.Schema({
  taskId: { type: String, required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['diagnostic', 'study', 'practice_mock', 'coding', 'revision'], 
    required: true 
  },
  category: { type: String, default: '' },
  topic: { type: String, default: '' },
  estimatedMinutes: { type: Number, default: 30 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  targetScore: { type: Number, default: 70 },
  actualScore: { type: Number },
  deepLink: { type: String, default: '' },
  studyNotes: studyNotesSchema
}, { _id: false });

const planDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  theme: { type: String, default: '' },
  tasks: [planTaskSchema]
}, { _id: false });

const prepPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  targetRole: { type: String, required: true },
  level: { type: String, default: 'fresher' },
  durationDays: { type: Number, enum: [7, 14, 30], default: 14 },
  dailyMinutes: { type: Number, default: 60 },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'abandoned'], 
    default: 'active' 
  },
  startDate: { type: Date, default: Date.now },
  days: [planDaySchema],
  streakCount: { type: Number, default: 0 },
  lastActivityDate: { type: Date },
  progressPercentage: { type: Number, default: 0 },
  replanCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Calculate progress percentage helper
prepPlanSchema.methods.calculateProgress = function() {
  let total = 0;
  let done = 0;
  for (const day of this.days) {
    for (const t of day.tasks) {
      total++;
      if (t.isCompleted) done++;
    }
  }
  this.progressPercentage = total > 0 ? Math.round((done / total) * 100) : 0;
  return this.progressPercentage;
};

const PrepPlan = mongoose.model('PrepPlan', prepPlanSchema);

export default PrepPlan;
