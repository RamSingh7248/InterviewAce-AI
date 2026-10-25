import { normalizeQuestionText } from '../../utils/textNormalize.js';

export function makeQuestion({
  category,
  topic,
  question,
  idealAnswer,
  keyPoints = [],
  followUps = [],
  difficulty = 'Medium',
  levels = ['fresher', 'junior', 'mid'],
  modes = ['mixed-technical', 'conceptual-deep-dive'],
  type = 'conceptual',
  importance = 4,
  tags = [],
  codingDetails = null,
  subtopic = ''
}) {
  const norm = normalizeQuestionText(question);
  
  const formattedCodingDetails = codingDetails || (type === 'coding' ? {
    constraints: ['Time Complexity: O(N) or O(N log N)', 'Space Complexity: O(1) or O(N) auxiliary space'],
    examples: [
      { input: 'Standard valid input', output: 'Expected result', explanation: 'Optimal boundary execution' }
    ]
  } : { constraints: [], examples: [] });

  const finalKeyPoints = Array.isArray(keyPoints) && keyPoints.length > 0 
    ? keyPoints 
    : [
        'Explains core underlying mechanisms and architectural rationale',
        'Considers memory bounds, concurrency implications, or time complexity',
        'Identifies real-world production trade-offs and edge cases'
      ];

  const finalFollowUps = Array.isArray(followUps) && followUps.length > 0
    ? followUps
    : [
        `How would you test and validate this behavior under extreme concurrency or scale?`,
        `What alternative design or pattern could be used to optimize latency?`
      ];

  const finalTags = Array.isArray(tags) && tags.length > 0
    ? Array.from(new Set([...tags, category.toLowerCase()]))
    : [category.toLowerCase(), topic.toLowerCase().replace(/[^\w\s]/g, '').trim()];

  return {
    category,
    topic,
    subtopic: subtopic || topic,
    question,
    questionText: question,
    idealAnswer,
    referenceAnswer: idealAnswer,
    keyPoints: finalKeyPoints,
    expectedKeyPoints: finalKeyPoints,
    followUps: finalFollowUps,
    suggestedFollowUps: finalFollowUps,
    difficulty,
    levels,
    experienceLevels: levels,
    modes,
    interviewModes: modes,
    type,
    questionType: type,
    importance,
    tags: finalTags,
    codingDetails: formattedCodingDetails,
    isActive: true,
    normalizedHash: norm,
    normalizedText: norm,
    sequenceOrder: difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 5 : 9,
    learningStage: difficulty === 'Easy' ? 'Fundamentals' : difficulty === 'Medium' ? 'Core Concepts' : 'Advanced Concepts',
    interviewRelevanceLabel: importance >= 4 ? 'Core interview question' : 'Common interview topic'
  };
}
