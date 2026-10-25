import mongoose from 'mongoose';
import { normalizeQuestionText } from '../utils/textNormalize.js';

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' },
    explanation: { type: String, default: '' }
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true
    },
    normalizedText: {
      type: String,
      required: true,
      trim: true
    },
    normalizedHash: {
      type: String,
      trim: true,
      index: true
    },
    importance: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      index: true
    },
    experienceLevels: [{
      type: String,
      enum: ['internship', 'fresher', 'junior', 'mid', 'senior'],
      trim: true
    }],
    interviewModes: [{
      type: String,
      trim: true
    }],
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      index: true
    },
    subtopic: {
      type: String,
      default: '',
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
      default: 'Medium',
      index: true
    },
    questionType: {
      type: String,
      enum: ['conceptual', 'coding', 'sql', 'debugging', 'scenario', 'output_prediction'],
      default: 'conceptual',
      index: true
    },
    targetRoles: [{
      type: String,
      trim: true
    }],
    interviewMode: {
      type: String,
      enum: ['mixed', 'conceptual', 'coding', 'sql', 'debugging', 'scenario', 'system_design'],
      default: 'mixed',
      index: true
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    sourceType: {
      type: String,
      enum: ['curated', 'ai_generated'],
      default: 'curated',
      index: true
    },
    companyStyleLabel: {
      type: String,
      default: 'General Tech',
      trim: true
    },
    referenceAnswer: {
      type: String,
      default: '',
      trim: true
    },
    expectedKeyPoints: [{
      type: String,
      trim: true
    }],
    evaluationRubric: {
      scoringCriteria: [{
        type: String,
        trim: true
      }],
      minimumPassingScore: {
        type: Number,
        default: 6,
        min: 0,
        max: 10
      }
    },
    questionId: {
      type: String,
      trim: true,
      index: true
    },
    sequenceOrder: {
      type: Number,
      default: 1,
      min: 1,
      index: true
    },
    learningStage: {
      type: String,
      enum: [
        'Fundamentals',
        'Core Concepts',
        'Common Interview Questions',
        'Implementation & Coding',
        'Practical Applications',
        'Debugging & Edge Cases',
        'Performance & Optimization',
        'Advanced Concepts',
        'Real-World Scenarios'
      ],
      default: 'Core Concepts',
      index: true
    },
    interviewRelevanceLabel: {
      type: String,
      enum: [
        'Core interview question',
        'Common interview topic',
        'Practical scenario',
        'Advanced concept',
        'Coding exercise',
        'Debugging scenario'
      ],
      default: 'Common interview topic',
      index: true
    },
    stepByStepExplanation: {
      type: String,
      default: '',
      trim: true
    },
    practicalExample: {
      type: String,
      default: '',
      trim: true
    },
    commonMistakes: [{
      type: String,
      trim: true
    }],
    timeComplexity: {
      type: String,
      default: '',
      trim: true
    },
    spaceComplexity: {
      type: String,
      default: '',
      trim: true
    },
    suggestedFollowUps: [{
      type: String,
      trim: true
    }],
    followUpQuestionIds: [{
      type: String,
      trim: true
    }],
    hints: [{
      type: String,
      trim: true
    }],
    codingDetails: {
      constraints: [{ type: String, trim: true }],
      examples: [exampleSchema],
      testCases: [testCaseSchema]
    },
    generationMetadata: {
      model: { type: String, default: '' },
      promptFocus: { type: String, default: '' },
      generatedAt: { type: Date }
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Pre-validate hook to calculate normalizedText & normalizedHash and apply defaults before validation runs
questionSchema.pre('validate', function () {
  if (this.questionText) {
    const norm = normalizeQuestionText(this.questionText);
    this.normalizedText = norm;
    this.normalizedHash = norm;
  }
  if (!this.experienceLevels || this.experienceLevels.length === 0) {
    this.experienceLevels = ['internship', 'fresher', 'junior', 'mid', 'senior'];
  }
  if (!this.interviewModes || this.interviewModes.length === 0) {
    this.interviewModes = ['mixed-technical', 'conceptual-deep-dive'];
  }
  if (!this.importance) {
    this.importance = 3;
  }
});

// Compound indexes for high-frequency queries and sequential learning
questionSchema.index({ category: 1, difficulty: 1, topic: 1 });
questionSchema.index({ category: 1, sequenceOrder: 1 });
questionSchema.index({ category: 1, topic: 1, sequenceOrder: 1 });
questionSchema.index({ category: 1, learningStage: 1 });
questionSchema.index({ category: 1, questionType: 1 });
questionSchema.index({ category: 1, interviewMode: 1 });
questionSchema.index({ category: 1, isActive: 1 });
questionSchema.index({ category: 1, normalizedHash: 1 }, { unique: true });
questionSchema.index({ category: 1, importance: -1 });
questionSchema.index({ category: 1, experienceLevels: 1 });
questionSchema.index({ category: 1, interviewModes: 1 });

// Text search index for keyword lookups
questionSchema.index(
  { questionText: 'text', topic: 'text', subtopic: 'text', tags: 'text' },
  { weights: { questionText: 5, topic: 3, tags: 2, subtopic: 1 } }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
