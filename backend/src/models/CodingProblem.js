import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: { type: String, default: '' },
  expectedOutput: { type: String, required: true }
}, { _id: false });

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String, default: '' }
}, { _id: false });

const codingProblemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true 
  },
  slug: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true, 
    index: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Medium', 
    index: true 
  },
  category: { 
    type: String, 
    default: 'dsa', 
    index: true 
  },
  topics: [{ 
    type: String, 
    trim: true 
  }],
  description: { 
    type: String, 
    required: true 
  },
  examples: [exampleSchema],
  constraints: [{ 
    type: String 
  }],
  hints: [{ 
    type: String 
  }],
  starterCode: {
    javascript: { type: String, default: '' },
    python: { type: String, default: '' },
    java: { type: String, default: '' },
    cpp: { type: String, default: '' }
  },
  sampleTestCases: [testCaseSchema],
  hiddenTestCases: [testCaseSchema],
  referenceSolution: {
    javascript: { type: String, default: '' },
    python: { type: String, default: '' },
    java: { type: String, default: '' },
    cpp: { type: String, default: '' }
  },
  timeLimitMs: { 
    type: Number, 
    default: 2000 
  },
  memoryLimitMb: { 
    type: Number, 
    default: 128 
  },
  importance: { 
    type: Number, 
    default: 80 
  },
  normalizedHash: { 
    type: String, 
    index: true 
  }
}, { 
  timestamps: true 
});

// Index for query performance
codingProblemSchema.index({ difficulty: 1, category: 1 });
codingProblemSchema.index({ topics: 1 });

const CodingProblem = mongoose.model('CodingProblem', codingProblemSchema);

export default CodingProblem;
