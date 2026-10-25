import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' },
    explanation: { type: String, default: '' }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      trim: true,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    normalizedText: {
      type: String,
      default: '',
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      default: '',
      trim: true
    },
    subtopic: {
      type: String,
      default: '',
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    questionType: {
      type: String,
      enum: ['conceptual', 'coding', 'sql', 'debugging', 'scenario', 'output_prediction', 'system_design'],
      default: 'conceptual'
    },
    sequenceOrder: {
      type: Number,
      default: 1
    },
    learningStage: {
      type: String,
      default: 'Core Concepts'
    },
    interviewRelevanceLabel: {
      type: String,
      default: 'Common interview topic'
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
    expectedKeyPoints: [{
      type: String,
      trim: true
    }],
    referenceAnswer: {
      type: String,
      default: '',
      trim: true
    },
    hints: [{
      type: String,
      trim: true
    }],
    codingDetails: {
      slug: { type: String, default: '' },
      problemTitle: { type: String, default: '' },
      constraints: [{ type: String }],
      examples: [exampleSchema],
      sampleTestCases: [{ input: { type: String, default: '' }, expectedOutput: { type: String, default: '' } }],
      hiddenTestCases: [{ input: { type: String, default: '' }, expectedOutput: { type: String, default: '' } }],
      starterCode: {
        javascript: { type: String, default: '' },
        python: { type: String, default: '' },
        java: { type: String, default: '' },
        cpp: { type: String, default: '' }
      },
      hintsRevealed: { type: Number, default: 0 }
    },
    userAnswer: {
      type: String,
      default: '',
      trim: true
    },
    isAnswered: {
      type: Boolean,
      default: false
    },
    isAdaptiveFollowUp: {
      type: Boolean,
      default: false
    },
    isFollowUp: {
      type: Boolean,
      default: false
    },
    interviewerReaction: {
      type: String,
      default: '',
      trim: true
    },
    adaptiveReason: {
      type: String,
      default: '',
      trim: true
    },
    parentQuestionId: {
      type: String,
      default: null,
      trim: true
    },
    followUpStrategy: {
      type: String,
      enum: ['deepen', 'probe_gap', 'diagnostic', 'clarify', 'scaffold', 'none'],
      default: 'none'
    },
    startedAt: {
      type: Date
    },
    submittedAt: {
      type: Date
    },
    timeSpentSeconds: {
      type: Number,
      default: 0
    },
    evaluation: {
      overallScore: {
        type: Number,
        min: 0,
        max: 10
      },
      score: {
        type: Number,
        min: 0,
        max: 10
      },
      score100: {
        type: Number,
        min: 0,
        max: 100
      },
      scores: {
        technicalAccuracy: { type: Number, default: 0 },
        completeness: { type: Number, default: 0 },
        depth: { type: Number, default: 0 },
        clarity: { type: Number, default: 0 },
        communication: { type: Number, default: 0 }
      },
      evaluationStatus: {
        type: String,
        enum: ['pending', 'evaluating', 'evaluated', 'empty', 'skipped', 'too_short', 'failed'],
        default: 'evaluated'
      },
      verdict: {
        type: String,
        enum: ['correct', 'partially_correct', 'incorrect', 'unclear', 'empty'],
        default: 'partially_correct'
      },
      depthRating: {
        type: String,
        default: ''
      },
      accuracyRating: {
        type: String,
        default: ''
      },
      feedback: {
        type: String,
        trim: true
      },
      keyPointsCovered: [{
        type: String,
        trim: true
      }],
      keyPointsMissed: [{
        type: String,
        trim: true
      }],
      strengths: [{
        type: String,
        trim: true
      }],
      mistakes: [{
        type: String,
        trim: true
      }],
      improvements: [{
        type: String,
        trim: true
      }],
      betterAnswer: {
        type: String,
        trim: true,
        default: ''
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
        default: 0.85
      },
      evaluatorLabel: {
        type: String,
        default: 'AI Evaluation',
        trim: true
      },
      isFallback: {
        type: Boolean,
        default: false
      },
      missingConcepts: [{
        type: String,
        trim: true
      }],
      incorrectStatements: [{
        type: String,
        trim: true
      }],
      corrections: [{
        type: String,
        trim: true
      }],
      suggestions: [{
        type: String,
        trim: true
      }],
      idealAnswer: {
        type: String,
        trim: true
      },
      practicalExample: {
        type: String,
        trim: true
      },
      followUpQuestions: [{
        type: String,
        trim: true
      }],
      revisionTopics: [{
        type: String,
        trim: true
      }],
      dimensions: {
        technicalCorrectness: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        },
        relevance: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        },
        conceptualUnderstanding: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        },
        completeness: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        },
        explanationClarity: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        },
        practicalApplication: {
          score: { type: Number, default: 0 },
          maxScore: { type: Number, default: 10 },
          feedback: { type: String, default: '' }
        }
      },
      codeReview: {
        correctnessScore: { type: Number, default: 0 },
        timeComplexity: { type: String, default: '' },
        spaceComplexity: { type: String, default: '' },
        edgeCasesHandled: [{ type: String }],
        edgeCasesMissed: [{ type: String }],
        readabilityScore: { type: Number, default: 0 },
        reviewScore: { type: Number, default: 0 },
        strengths: [{ type: String }],
        improvements: [{ type: String }],
        betterApproach: { type: String, default: '' }
      },
      testsPassed: { type: Number, default: 0 },
      totalTests: { type: Number, default: 0 },
      hintsUsed: { type: Number, default: 0 },
      hintPenalty: { type: Number, default: 0 },
      executionOutput: { type: String, default: '' },
      executionStderr: { type: String, default: '' },
      runtimeMs: { type: Number, default: 0 },
      voiceMetrics: {
        wpm: { type: Number, default: 0 },
        wordsCount: { type: Number, default: 0 },
        durationSeconds: { type: Number, default: 0 },
        fillerWordsCount: { type: Number, default: 0 },
        fillerWords: [{ type: String }],
        pauseCount: { type: Number, default: 0 },
        paceAssessment: { type: String, default: '' },
        clarityTip: { type: String, default: '' }
      }
    },
    voiceMetrics: {
      wpm: { type: Number, default: 0 },
      wordsCount: { type: Number, default: 0 },
      durationSeconds: { type: Number, default: 0 },
      fillerWordsCount: { type: Number, default: 0 },
      fillerWords: [{ type: String }],
      pauseCount: { type: Number, default: 0 },
      paceAssessment: { type: String, default: '' },
      clarityTip: { type: String, default: '' }
    }
  },
  { _id: true }
);

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    voiceMode: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      required: [true, 'Interview category is required'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    adaptiveMode: {
      type: Boolean,
      default: true
    },
    focusWeakAreas: {
      type: Boolean,
      default: false
    },
    currentDifficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    consecutiveStrongAnswers: {
      type: Number,
      default: 0
    },
    consecutiveWeakAnswers: {
      type: Number,
      default: 0
    },
    interviewerReactions: [{
      questionIndex: { type: Number },
      reactionText: { type: String, default: '' },
      tone: { type: String, default: 'General Tech' },
      timestamp: { type: Date, default: Date.now }
    }],
    topic: {
      type: String,
      default: '',
      trim: true
    },
    targetRole: {
      type: String,
      default: 'Software Engineer',
      trim: true
    },
    interviewMode: {
      type: String,
      default: 'mixed',
      trim: true
    },
    companyStyle: {
      type: String,
      default: 'General Tech',
      trim: true
    },
    experienceLevel: {
      type: String,
      default: 'fresher',
      trim: true
    },
    language: {
      type: String,
      default: 'en-US',
      trim: true
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: [1, 'At least 1 question is required'],
      max: [10, 'Maximum 10 questions per session']
    },
    currentQuestionIndex: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      enum: ['ai', 'demo', 'hybrid', 'coding'],
      default: 'demo'
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'abandoned'],
      default: 'in_progress',
      index: true
    },
    sessionState: {
      type: String,
      enum: ['active', 'evaluating', 'awaiting_answer', 'completed', 'failed'],
      default: 'awaiting_answer',
      index: true
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    timedMode: {
      type: Boolean,
      default: false
    },
    timeLimitPerQuestion: {
      type: Number,
      default: 0 // 0 = untimed mode, >0 = seconds per question
    },
    currentQuestionStartedAt: {
      type: Date,
      default: Date.now
    },
    askedQuestionIds: [{
      type: String
    }],
    askedQuestionTexts: [{
      type: String
    }],
    historyReset: {
      type: Boolean,
      default: false
    },
    historyResetMessage: {
      type: String,
      default: '',
      trim: true
    },
    isEvaluating: {
      type: Boolean,
      default: false
    },
    conversationHistory: [{
      role: {
        type: String,
        enum: ['interviewer', 'candidate'],
        required: true
      },
      questionId: { type: String, default: '' },
      questionText: { type: String, default: '' },
      answerText: { type: String, default: '' },
      verdict: { type: String, default: '' },
      score: { type: Number, default: 0 },
      timestamp: { type: Date, default: Date.now }
    }],
    questions: [questionSchema],
    finalScore: {
      type: Number,
      default: 0
    },
    feedbackSummary: {
      type: String,
      default: ''
    },
    dimensionScores: {
      technicalAccuracy: { type: Number, default: 0 },
      completeness: { type: Number, default: 0 },
      depth: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      communication: { type: Number, default: 0 }
    },
    topStrengths: [{
      type: String,
      trim: true
    }],
    topWeaknesses: [{
      type: String,
      trim: true
    }],
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster lookups & deduplication
interviewSchema.index({ userId: 1, createdAt: -1 });
interviewSchema.index({ userId: 1, status: 1 });

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
