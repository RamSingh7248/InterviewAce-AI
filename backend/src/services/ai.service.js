/**
 * AI Service for Technical Question Generation & Automated Answer Evaluation
 * Supports live Google Gemini API with automated fallback to the persistent MongoDB Question Bank.
 */

import mongoose from 'mongoose';
import Question from '../models/Question.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import { INTERVIEW_CATALOG, normalizeCategory } from '../config/interviewCatalog.js';
import { getSubjectIsolationDirectives, validateQuestionSubject } from '../utils/subjectValidator.js';
import { localizeQuestionToHindi, localizeEvaluationToHindi } from '../utils/hindiTranslator.js';

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

/**
 * Strips markdown code fences, leading text, and unwraps JSON objects
 */
export const robustParseJson = (rawText) => {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('AI response text is empty.');
  }

  let text = rawText.trim();
  // Strip code fences: ```json ... ``` or ``` ... ```
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // 1. Try direct parse first
  try {
    const parsed = JSON.parse(text);
    return unwrapJsonQuestions(parsed);
  } catch (e1) {
    // 2. Try extracting bracketed JSON array [...]
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        const sub = text.slice(firstBracket, lastBracket + 1);
        return unwrapJsonQuestions(JSON.parse(sub));
      } catch (e2) {
        // continue
      }
    }

    // 3. Try extracting braced JSON object {...}
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        const sub = text.slice(firstBrace, lastBrace + 1);
        return unwrapJsonQuestions(JSON.parse(sub));
      } catch (e3) {
        // continue
      }
    }

    throw new Error(`Failed to parse AI JSON response: ${e1.message}`);
  }
};

const unwrapJsonQuestions = (data) => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    if (Array.isArray(data.questions)) return data.questions;
    if (Array.isArray(data.interviewQuestions)) return data.interviewQuestions;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;
  }
  return data;
};

/**
 * Helper to call Gemini API with multi-model fallback, timeout, and retries
 */
const callGemini = async (prompt, systemInstruction = '', timeoutMs = 15000) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length < 10) {
    throw new Error('GEMINI_API_KEY is not configured or invalid.');
  }

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json'
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    // Attempt up to 2 times per model for transient network failures
    for (let attempt = 1; attempt <= 2; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.text();
          // If 404 model not found, try next model immediately
          if (response.status === 404) {
            lastError = new Error(`Model ${model} returned 404: ${errorBody}`);
            break;
          }
          throw new Error(`Gemini API error (${model}, HTTP ${response.status}): ${errorBody}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) {
          throw new Error(`Gemini response candidate text is empty for ${model}.`);
        }

        console.log(`[AI Service] Raw Gemini Response (${model}, attempt ${attempt}, length: ${rawText.length}):`, rawText.slice(0, 180) + '...');
        const parsed = robustParseJson(rawText);
        return parsed;
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 600));
        }
      }
    }
  }

  throw lastError || new Error('Gemini API call failed across all configured models.');
};

/**
 * Format question object to standard interview schema with stable questionId
 */
const formatQuestionCandidate = (q, fallbackCategory, fallbackDifficulty) => {
  const qText = (q.questionText || '').trim();
  const normalized = q.normalizedText || normalizeQuestionText(qText);
  const stableId = (q._id ? q._id.toString() : null) || q.questionId || `q_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  return {
    questionId: stableId,
    questionText: qText,
    normalizedText: normalized,
    normalizedHash: q.normalizedHash || normalized,
    importance: q.importance || 3,
    experienceLevels: Array.isArray(q.experienceLevels) ? q.experienceLevels : (Array.isArray(q.levels) ? q.levels : []),
    interviewModes: Array.isArray(q.interviewModes) ? q.interviewModes : (Array.isArray(q.modes) ? q.modes : []),
    tags: Array.isArray(q.tags) ? q.tags : [],
    category: fallbackCategory || q.category,
    topic: q.topic || 'General Technical',
    subtopic: q.subtopic || '',
    difficulty: ['Easy', 'Medium', 'Hard'].includes(q.difficulty) ? q.difficulty : fallbackDifficulty,
    questionType: q.questionType || q.type || 'conceptual',
    targetRoles: Array.isArray(q.targetRoles) ? q.targetRoles : [],
    interviewMode: q.interviewMode || 'mixed',
    companyStyleLabel: q.companyStyleLabel || 'General Tech',
    expectedKeyPoints: Array.isArray(q.expectedKeyPoints) ? q.expectedKeyPoints : (Array.isArray(q.keyPoints) ? q.keyPoints : []),
    referenceAnswer: q.referenceAnswer || q.idealAnswer || '',
    sequenceOrder: q.sequenceOrder || 1,
    learningStage: q.learningStage || 'Core Concepts',
    interviewRelevanceLabel: q.interviewRelevanceLabel || 'Common interview topic',
    stepByStepExplanation: q.stepByStepExplanation || `1. Understand the core principles of ${q.topic || 'the topic'} in ${q.category || fallbackCategory}.\n2. Analyze internal mechanics and runtime characteristics.\n3. Consider production implications, memory bounds, and edge cases.\n4. Apply industry-standard best practices.`,
    practicalExample: q.practicalExample || `In production ${q.category || fallbackCategory} services, properly understanding ${q.topic || 'this pattern'} ensures system stability, optimal resource utilization, and predictable latency.`,
    commonMistakes: Array.isArray(q.commonMistakes) && q.commonMistakes.length > 0 ? q.commonMistakes : [
      `Misunderstanding the underlying runtime behavior or memory model in ${q.category || fallbackCategory}`,
      'Failing to handle boundary conditions and edge cases in high-throughput paths'
    ],
    timeComplexity: q.timeComplexity || '',
    spaceComplexity: q.spaceComplexity || '',
    suggestedFollowUps: Array.isArray(q.suggestedFollowUps) && q.suggestedFollowUps.length > 0 ? q.suggestedFollowUps : (Array.isArray(q.followUps) && q.followUps.length > 0 ? q.followUps : [
      `How would you test and validate ${q.topic || 'this concept'} under high concurrency or extreme load?`
    ]),
    followUpQuestionIds: Array.isArray(q.followUpQuestionIds) ? q.followUpQuestionIds : [],
    evaluationRubric: q.evaluationRubric || { scoringCriteria: [], minimumPassingScore: 6 },
    hints: Array.isArray(q.hints) ? q.hints : [],
    codingDetails: q.codingDetails || { constraints: [], examples: [] },
    isAdaptiveFollowUp: Boolean(q.isAdaptiveFollowUp),
    adaptiveReason: q.adaptiveReason || '',
    parentQuestionId: q.parentQuestionId || null,
    followUpStrategy: q.followUpStrategy || 'none'
  };
};

/**
 * Generate high-caliber fallback questions strictly scoped to category catalog topics
 * Used ONLY when database and seed bank have exhausted unique questions for this exact category
 */
export const generateCategoryFallbackQuestions = (category, countNeeded, seenNormalized, difficulty = 'Medium', startSeq = 10) => {
  const catalogEntry = INTERVIEW_CATALOG.categories.find(
    c => c.id.toLowerCase() === category.toLowerCase()
  );
  const topics = (catalogEntry && Array.isArray(catalogEntry.topics) && catalogEntry.topics.length > 0)
    ? catalogEntry.topics
    : ['Core Principles & Architecture', 'Practical Mechanics & Internal State', 'Performance & Edge Cases', 'Concurrency & Memory', 'Best Practices & Design'];

  const templates = [
    (top) => ({
      text: `In a production system using ${category}, explain how ${top} is implemented internally and what architectural principles govern its behavior. What real-world trade-offs should an engineer consider?`,
      subtopic: 'Internal Mechanics & Architecture',
      type: 'conceptual'
    }),
    (top) => ({
      text: `Suppose a high-traffic ${category} service experiences performance regressions related to ${top}. How would you diagnose, profile, and resolve the root cause?`,
      subtopic: 'Diagnostics & Troubleshooting',
      type: 'scenario'
    }),
    (top) => ({
      text: `Compare modern idioms and best practices for ${top} in ${category} with traditional alternatives. When would you favor one approach over another?`,
      subtopic: 'Modern Idioms & Trade-offs',
      type: 'conceptual'
    }),
    (top) => ({
      text: `Explain how memory management, state consistency, and thread-safety interact with ${top} when developing scalable services in ${category}.`,
      subtopic: 'Memory & Concurrency',
      type: 'conceptual'
    })
  ];

  const results = [];
  let topicIdx = 0;
  let templateIdx = 0;
  let cycles = 0;

  while (results.length < countNeeded && cycles < 10) {
    const curTopic = topics[topicIdx % topics.length];
    const tmpl = templates[templateIdx % templates.length];
    const { text, subtopic, type } = tmpl(curTopic);
    const norm = normalizeQuestionText(text);

    if (!seenNormalized.has(norm) && !results.some(r => r.normalizedText === norm)) {
      seenNormalized.add(norm);
      const seq = startSeq + results.length;
      results.push(formatQuestionCandidate({
        questionId: `fallback_${category.toLowerCase()}_${Date.now()}_${results.length}`,
        questionText: text,
        normalizedText: norm,
        category: category,
        topic: curTopic,
        subtopic,
        difficulty,
        questionType: type,
        sequenceOrder: seq,
        learningStage: difficulty === 'Easy' ? 'Fundamentals' : difficulty === 'Hard' ? 'Advanced Concepts' : 'Core Concepts',
        interviewRelevanceLabel: `Common interview topic`,
        targetRoles: ['Software Engineer', 'Backend Developer', `${category} Developer`],
        interviewMode: 'mixed',
        companyStyleLabel: 'General Tech',
        expectedKeyPoints: [
          `Articulates core architecture and internal mechanisms of ${curTopic} in ${category}`,
          `Identifies real-world performance implications, boundary conditions, or edge cases`,
          `Demonstrates production-ready best practices and idiomatic patterns`
        ],
        referenceAnswer: `A thorough explanation of ${curTopic} in ${category} should cover internal mechanisms, runtime execution models, common concurrency/memory trade-offs, and production diagnostic techniques.`,
        stepByStepExplanation: `1. Define the core role of ${curTopic} in ${category}.\n2. Explain internal state management, memory bounds, or concurrency guarantees.\n3. Analyze edge cases, failure scenarios, and performance implications under load.\n4. Recommend idiomatic patterns and diagnostic tools used in modern production engineering.`,
        practicalExample: `In a production ${category} service under high load, properly tuning or implementing ${curTopic} avoids critical performance regressions and maintains SLA compliance.`,
        commonMistakes: [
          `Assuming default settings for ${curTopic} scale linearly without benchmarking`,
          'Failing to account for concurrency or memory leaks in long-running processes',
          'Neglecting observability and error handling in high-throughput paths'
        ],
        suggestedFollowUps: [
          `How would you monitor and alert on ${curTopic} performance metrics in real time?`,
          `What architectural trade-offs exist between throughput and latency for ${curTopic}?`
        ],
        evaluationRubric: {
          scoringCriteria: [
            `Detailed explanation of ${curTopic} mechanics in ${category}`,
            'Discussion of production trade-offs and performance',
            'Clear communication and accurate technical terminology'
          ],
          minimumPassingScore: 6
        },
        hints: [`Focus on how ${category} handles ${curTopic} under load.`]
      }, category, difficulty));
    }
    topicIdx++;
    templateIdx++;
    if (topicIdx % topics.length === 0) {
      cycles++;
    }
  }

  return results;
};

export const isTooSimilar = (textA, textB, threshold = 0.65) => {
  if (!textA || !textB) return false;
  const wordsA = new Set(textA.toLowerCase().split(/[^\w]+/).filter(w => w.length > 2));
  const wordsB = new Set(textB.toLowerCase().split(/[^\w]+/).filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return false;
  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  const union = new Set([...wordsA, ...wordsB]).size;
  return (intersection / union) >= threshold;
};

export const weightedShuffle = (items) => {
  if (!Array.isArray(items) || items.length <= 1) return items || [];
  return [...items]
    .map(item => ({
      item,
      key: Math.pow(Math.random(), 1 / Math.max(1, item.importance || 3))
    }))
    .sort((a, b) => b.key - a.key)
    .map(w => w.item);
};

/**
 * Retrieve curated questions from MongoDB with strict subject isolation, importance-weighted selection, and category fallback
 */
export const retrieveCuratedQuestions = async ({
  category,
  topic = '',
  difficulty = 'Medium',
  targetRole = '',
  interviewMode = 'mixed',
  companyStyle = 'General Tech',
  experienceLevel = '',
  count = 5,
  excludeNormalized = [],
  excludeIds = [],
  minSequenceOrder = 1
}) => {
  const seenNormalized = new Set(excludeNormalized.map(t => normalizeQuestionText(t)).filter(Boolean));
  const seenIds = new Set((excludeIds || []).map(id => id.toString()));
  const candidates = [];

  const addCandidates = (items) => {
    if (!Array.isArray(items)) return;
    const shuffled = weightedShuffle(items);
    for (const item of shuffled) {
      if (!item || (!item.questionText && !item.question)) continue;
      const qText = item.questionText || item.question;

      // STRICT SUBJECT FILTERING:
      if (item.category && item.category.trim().toLowerCase() !== category.trim().toLowerCase()) {
        continue;
      }

      // Content Heuristic Check: reject cross-subject telltales
      const subjectValidation = validateQuestionSubject(item, category);
      if (!subjectValidation.isValid) {
        continue;
      }

      const norm = item.normalizedHash || item.normalizedText || normalizeQuestionText(qText);
      const idStr = (item._id || item.questionId || '').toString();

      if (!norm || seenNormalized.has(norm)) continue;
      if (idStr && seenIds.has(idStr)) continue;

      // Near-duplicate check against already-selected candidates in this session
      if (candidates.some(c => isTooSimilar(c.normalizedHash || c.normalizedText, norm))) continue;

      seenNormalized.add(norm);
      if (idStr) seenIds.add(idStr);

      candidates.push(formatQuestionCandidate(item, category, difficulty));
      if (candidates.length >= count) break;
    }
  };

  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;

  if (isDbConnected) {
    try {
      const escapedCategory = category.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const getBaseFilter = (withMinSeq = true) => {
        const seenList = Array.from(seenNormalized);
        const filter = {
          category: new RegExp(`^${escapedCategory}$`, 'i'),
          isActive: true
        };
        if (seenList.length > 0) {
          filter.$and = [
            { normalizedText: { $nin: seenList } },
            { normalizedHash: { $nin: seenList } }
          ];
        }
        if (seenIds.size > 0) {
          const validIds = Array.from(seenIds).filter(id => mongoose.Types.ObjectId.isValid(id));
          if (validIds.length > 0) {
            filter._id = { $nin: validIds };
          }
        }
        if (withMinSeq && minSequenceOrder && minSequenceOrder > 1) {
          filter.sequenceOrder = { $gte: minSequenceOrder };
        }
        return filter;
      };

      // 1. Exact topic + targetRole + difficulty match (sorted by sequenceOrder)
      if (topic && topic.trim() && targetRole && targetRole.trim()) {
        const found = await Question.find({
          ...getBaseFilter(true),
          difficulty,
          topic: new RegExp(topic.trim(), 'i'),
          targetRoles: new RegExp(targetRole.trim(), 'i')
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(found);
      }

      // 1b. Exact topic + difficulty match
      if (candidates.length < count && topic && topic.trim()) {
        const found = await Question.find({
          ...getBaseFilter(true),
          difficulty,
          topic: new RegExp(topic.trim(), 'i')
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(found);
      }

      // 1c. Category + targetRole + difficulty match
      if (candidates.length < count && targetRole && targetRole.trim()) {
        const found = await Question.find({
          ...getBaseFilter(true),
          difficulty,
          targetRoles: new RegExp(targetRole.trim(), 'i')
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(found);
      }

      // 2. Same category + difficulty
      if (candidates.length < count) {
        const found = await Question.find({
          ...getBaseFilter(true),
          difficulty
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(found);
      }

      // 3. Same category across any difficulty / topics
      if (candidates.length < count) {
        const found = await Question.find({
          ...getBaseFilter(true)
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(found);
      }

      // 4. If minSequenceOrder filtered out remaining candidates, query unasked without minSequenceOrder
      if (candidates.length < count && minSequenceOrder > 1) {
        const foundWrap = await Question.find({
          ...getBaseFilter(false)
        }).sort({ sequenceOrder: 1, _id: 1 }).limit(count - candidates.length).lean();
        addCandidates(foundWrap);
      }
    } catch (err) {
      console.warn('[AI Service] DB query in retrieveCuratedQuestions encountered error, falling back to seed questions:', err.message);
    }
  }

  // 5. Fallback to SEED_QUESTIONS strictly filtered by category and sorted by sequenceOrder
  if (candidates.length < count) {
    // 5a. Match same category and difficulty
    const seedCatDiff = SEED_QUESTIONS
      .filter(q =>
        q.category.toLowerCase() === category.toLowerCase() &&
        q.difficulty === difficulty &&
        (!minSequenceOrder || minSequenceOrder <= 1 || (q.sequenceOrder || 1) >= minSequenceOrder)
      )
      .sort((a, b) => (a.sequenceOrder || 1) - (b.sequenceOrder || 1));
    addCandidates(seedCatDiff);

    // 5b. Match same category any difficulty
    if (candidates.length < count) {
      const seedCatAny = SEED_QUESTIONS
        .filter(q =>
          q.category.toLowerCase() === category.toLowerCase() &&
          (!minSequenceOrder || minSequenceOrder <= 1 || (q.sequenceOrder || 1) >= minSequenceOrder)
        )
        .sort((a, b) => (a.sequenceOrder || 1) - (b.sequenceOrder || 1));
      addCandidates(seedCatAny);
    }

    // 5c. Wrap-around in SEED_QUESTIONS if minSequenceOrder exhausted higher questions
    if (candidates.length < count && minSequenceOrder > 1) {
      const seedCatWrap = SEED_QUESTIONS
        .filter(q => q.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => (a.sequenceOrder || 1) - (b.sequenceOrder || 1));
      addCandidates(seedCatWrap);
    }

    // 5d. PROGRESSIVE RELAXATION: If unasked questions were exhausted by past user sessions,
    // recycle questions from the curated bank for this category (ensuring no duplicates in current session)
    if (candidates.length < count) {
      const seedCatReuse = weightedShuffle(
        SEED_QUESTIONS.filter(q => q.category.toLowerCase() === category.toLowerCase())
      );

      for (const item of seedCatReuse) {
        const norm = item.normalizedHash || item.normalizedText || normalizeQuestionText(item.questionText || item.question);
        if (candidates.some(c => (c.normalizedHash || c.normalizedText) === norm)) continue;
        if (candidates.some(c => isTooSimilar(c.normalizedHash || c.normalizedText, norm))) continue;
        candidates.push(formatQuestionCandidate(item, category, difficulty));
        if (candidates.length >= count) break;
      }
    }
  }

  // 6. If bank is exhausted, generate category-specific fallback questions
  if (candidates.length < count) {
    const needed = count - candidates.length;
    const maxExistingSeq = candidates.reduce((max, c) => Math.max(max, c.sequenceOrder || 0), minSequenceOrder || 1);
    const dynamicFallbacks = generateCategoryFallbackQuestions(category, needed, seenNormalized, difficulty, maxExistingSeq + 1);
    candidates.push(...dynamicFallbacks);
  }

  // Final Fisher-Yates shuffle weighted by importance (so sessions feel different while prioritizing higher importance)
  const finalShuffled = weightedShuffle(candidates);
  return finalShuffled.slice(0, count);
};

/**
 * Generate questions via live Gemini AI or fallback to MongoDB Curated Bank
 */
export const generateQuestions = async ({
  category,
  topic = '',
  difficulty = 'Medium',
  targetRole = 'Junior Software Engineer',
  interviewMode = 'mixed',
  companyStyle = 'General Tech',
  experienceLevel = 'fresher',
  totalQuestions = 5,
  excludeNormalized = [],
  excludeIds = [],
  minSequenceOrder = 1,
  language = 'en-US'
}) => {
  const isHindi = Boolean(language && (language.startsWith('hi') || language.toLowerCase().includes('hindi')));
  const requestedCount = Math.min(10, Math.max(1, parseInt(totalQuestions, 10) || 5));
  const canonicalCategory = normalizeCategory(category) || category;

  console.log('[AI Question Generation] Config in:', {
    category: canonicalCategory,
    difficulty,
    totalQuestions: requestedCount,
    topic: topic || '(All Topics)',
    targetRole,
    interviewMode,
    companyStyle,
    experienceLevel,
    language
  });

  let questions = [];
  let mode = 'demo';
  let message = '';
  let fallbackUsed = false;

  const seenInBatch = new Set(excludeNormalized.map(t => normalizeQuestionText(t)).filter(Boolean));
  const seenIds = new Set((excludeIds || []).map(id => id.toString()));

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const directives = getSubjectIsolationDirectives(canonicalCategory);
      const systemInstruction = `You are an elite Senior Staff Engineer, hiring manager, and technical interviewer.
Generate realistic, high-caliber technical interview questions tailored strictly to the candidate's target role, seniority level, category, difficulty, and interview mode.
${directives}
Do not generate vague, trivial, or out-of-subject questions.
Return ONLY valid JSON matching the specified schema.`;

      const askedList = (excludeNormalized || []).slice(0, 15);
      const deduplicationDirectives = askedList.length > 0
        ? `\nCRITICAL DEDUPLICATION RULE:\nThe candidate has ALREADY seen the following questions in this session or recently. You must NOT generate these questions or any near-duplicates:\n- ${askedList.join('\n- ')}\n`
        : '';

      const prompt = `Generate ${requestedCount} distinct interview questions with these exact parameters:
Category / Subject: ${canonicalCategory}
${directives}
Topic / Focus: ${topic ? topic.trim() : 'Core industry standards and practical mechanics'}
Difficulty: ${difficulty}
Target Candidate Role: ${targetRole || 'Software Engineer'}
Experience Level: ${experienceLevel || 'fresher'}
Interview Mode: ${interviewMode || 'mixed'}
Company Style: ${companyStyle || 'General Tech'}
Interview Language: ${isHindi ? 'Hindi (हिंदी - Devanagari script for dialogue/questions, technical terms in Latin/Devanagari)' : language || 'English (en-US)'}
${deduplicationDirectives}
STRICT ISOLATION REQUIREMENT:
All questions must belong exclusively to '${canonicalCategory}'. Never include or mention concepts from other languages (e.g. for Java, under NO circumstances generate JavaScript, DOM, or SQL questions).

Schema requirements:
Return a JSON array of objects, where each object has:
- "questionText": (string, detailed and specific technical question strictly in ${canonicalCategory})
- "category": "${category}"
- "topic": (string, specific technical topic in ${category})
- "subtopic": (string, specific subtopic)
- "difficulty": "${difficulty}"
- "questionType": (one of: "conceptual", "coding", "sql", "debugging", "scenario", "output_prediction")
- "targetRoles": ["${targetRole || 'Software Engineer'}"]
- "interviewMode": "${interviewMode || 'mixed'}"
- "companyStyleLabel": "${companyStyle || 'General Tech'}"
- "tags": (array of 3-5 lowercase technical tags)
- "referenceAnswer": (comprehensive 2-4 sentence model answer explaining core mechanism and trade-offs)
- "expectedKeyPoints": (array of 3-4 concise key evaluation criteria)
- "evaluationRubric": { "scoringCriteria": ["criterion 1", "criterion 2"], "minimumPassingScore": 6 }
- "hints": ["1 helpful hint"]
- "codingDetails": { "constraints": ["e.g. O(n) time"], "examples": [{"input": "sample", "output": "sample", "explanation": "why"}] }

Ensure output is valid JSON array [ ... ].`;

      const generatedArray = await callGemini(prompt, systemInstruction, 18000);

      if (Array.isArray(generatedArray) && generatedArray.length > 0) {
        const validatedQuestions = [];

        for (const item of generatedArray) {
          if (!item.questionText || typeof item.questionText !== 'string' || item.questionText.trim().length < 15) {
            continue;
          }

          // Strict Subject Validation: Reject cross-subject contamination
          const subjectValidation = validateQuestionSubject(item, category);
          if (!subjectValidation.isValid) {
            console.warn(`[AI Service] Rejected out-of-subject generated question for ${category}: ${subjectValidation.reason} | "${item.questionText.slice(0, 60)}"`);
            continue;
          }

          const normalized = normalizeQuestionText(item.questionText);
          if (!normalized || seenInBatch.has(normalized)) {
            continue;
          }

          // Near-duplicate check against already seen or batch items
          const isNearDup = Array.from(seenInBatch).some(prev => isTooSimilar(prev, normalized, 0.65));
          if (isNearDup) {
            continue;
          }

          seenInBatch.add(normalized);

          // Enforce session category on item
          item.category = category;

          // Check if already in MongoDB
          let stableId = null;
          if (mongoose.connection && mongoose.connection.readyState === 1) {
            try {
              const exists = await Question.findOne({ normalizedText: normalized }).lean();
              if (exists) {
                if (exists.category.toLowerCase() === category.toLowerCase()) {
                  stableId = exists._id.toString();
                  if (seenIds.has(stableId)) continue;
                  seenIds.add(stableId);
                  validatedQuestions.push(formatQuestionCandidate(exists, category, difficulty));
                  if (validatedQuestions.length >= requestedCount) break;
                  continue;
                }
              }

              // Create new ai_generated question in DB for future reuse
              const newQ = new Question({
                questionText: item.questionText.trim(),
                normalizedText: normalized,
                category: category,
                topic: item.topic || topic || 'General Technical',
                subtopic: item.subtopic || '',
                difficulty: ['Easy', 'Medium', 'Hard'].includes(item.difficulty) ? item.difficulty : difficulty,
                questionType: item.questionType || 'conceptual',
                targetRoles: Array.isArray(item.targetRoles) ? item.targetRoles : [targetRole],
                interviewMode: item.interviewMode || interviewMode,
                tags: Array.isArray(item.tags) ? item.tags : [category.toLowerCase()],
                sourceType: 'ai_generated',
                companyStyleLabel: item.companyStyleLabel || companyStyle,
                referenceAnswer: item.referenceAnswer || '',
                expectedKeyPoints: Array.isArray(item.expectedKeyPoints) ? item.expectedKeyPoints : [],
                evaluationRubric: item.evaluationRubric || { scoringCriteria: [], minimumPassingScore: 6 },
                hints: Array.isArray(item.hints) ? item.hints : [],
                codingDetails: item.codingDetails || { constraints: [], examples: [] },
                generationMetadata: {
                  model: 'gemini-1.5-flash',
                  promptFocus: topic || category,
                  generatedAt: new Date()
                },
                isActive: true
              });

              await newQ.save();
              stableId = newQ._id.toString();
            } catch (saveErr) {
              console.warn('[AI Service] Failed to save AI question to MongoDB:', saveErr.message);
            }
          }

          if (!stableId) {
            stableId = `ai_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          }

          seenIds.add(stableId);
          validatedQuestions.push(formatQuestionCandidate({ ...item, questionId: stableId, normalizedText: normalized }, category, difficulty));

          if (validatedQuestions.length >= requestedCount) break;
        }

        if (validatedQuestions.length > 0) {
          questions = validatedQuestions;
          mode = 'ai';
          message = `Generated ${questions.length} dynamic interview questions using Gemini AI.`;
        }
      }
    } catch (error) {
      console.warn('[AI Service Warning] Live Gemini generation failed or skipped, falling back to Curated Question Bank:', error.message);
      fallbackUsed = true;
    }
  } else {
    fallbackUsed = true;
  }

  // Fallback to MongoDB Curated Bank or Seed Bank if AI was skipped, failed, or produced fewer questions
  if (questions.length < requestedCount) {
    const needed = requestedCount - questions.length;
    const currentNormalized = Array.from(seenInBatch);
    const currentIds = Array.from(seenIds);

    const curated = await retrieveCuratedQuestions({
      category: canonicalCategory,
      topic,
      difficulty,
      targetRole,
      interviewMode,
      companyStyle,
      count: needed,
      excludeNormalized: currentNormalized,
      excludeIds: currentIds,
      minSequenceOrder
    });

    questions = [...questions, ...curated];
    mode = mode === 'ai' ? 'hybrid' : 'demo';
    message = fallbackUsed
      ? `Retrieved ${questions.length} questions from curated technical question bank (Live AI generation offline).`
      : `Retrieved ${questions.length} interview questions.`;
  }

  // Final safety deduplication check: ensure zero duplicate normalized texts
  const finalUnique = [];
  const finalSeenNorm = new Set();
  for (const q of questions) {
    const localizedQ = isHindi ? localizeQuestionToHindi(q, canonicalCategory) : q;
    const n = localizedQ.normalizedText || normalizeQuestionText(localizedQ.questionText);
    if (!finalSeenNorm.has(n)) {
      finalSeenNorm.add(n);
      finalUnique.push(localizedQ);
    }
  }

  // Safety Progressive Fallback: If deduplication or strict filtering left finalUnique with fewer questions than requested
  if (finalUnique.length < requestedCount) {
    const remainingNeeded = requestedCount - finalUnique.length;
    // Step A: Relax topic and past history exclusions
    const relaxed = await retrieveCuratedQuestions({
      category: canonicalCategory,
      topic: '',
      difficulty,
      targetRole,
      interviewMode,
      companyStyle,
      count: remainingNeeded,
      excludeNormalized: Array.from(finalSeenNorm),
      excludeIds: finalUnique.map(q => q.questionId || q._id),
      minSequenceOrder: 1
    });

    for (const q of relaxed) {
      const localizedQ = isHindi ? localizeQuestionToHindi(q, canonicalCategory) : q;
      const n = localizedQ.normalizedText || normalizeQuestionText(localizedQ.questionText);
      if (!finalSeenNorm.has(n)) {
        finalSeenNorm.add(n);
        finalUnique.push(localizedQ);
      }
      if (finalUnique.length >= requestedCount) break;
    }
  }

  // Step B: If still fewer than requested, relax difficulty filter
  if (finalUnique.length < requestedCount) {
    const remainingNeeded = requestedCount - finalUnique.length;
    const allDiff = await retrieveCuratedQuestions({
      category: canonicalCategory,
      topic: '',
      difficulty: 'Medium',
      targetRole: '',
      interviewMode: 'mixed',
      companyStyle: '',
      count: remainingNeeded,
      excludeNormalized: Array.from(finalSeenNorm),
      excludeIds: finalUnique.map(q => q.questionId || q._id),
      minSequenceOrder: 1
    });

    for (const q of allDiff) {
      const localizedQ = isHindi ? localizeQuestionToHindi(q, canonicalCategory) : q;
      const n = localizedQ.normalizedText || normalizeQuestionText(localizedQ.questionText);
      if (!finalSeenNorm.has(n)) {
        finalSeenNorm.add(n);
        finalUnique.push(localizedQ);
      }
      if (finalUnique.length >= requestedCount) break;
    }
  }

  // Sort by sequenceOrder ascending to enforce structured pedagogical learning path
  finalUnique.sort((a, b) => (a.sequenceOrder || 1) - (b.sequenceOrder || 1));

  console.log('[AI Question Generation] Parsed Output:', {
    category: canonicalCategory,
    total: finalUnique.length,
    requested: requestedCount,
    mode,
    fallbackUsed,
    firstQuestionText: finalUnique[0]?.questionText?.slice(0, 80)
  });

  return {
    mode,
    fallbackUsed,
    message,
    total: finalUnique.length,
    questions: finalUnique.slice(0, requestedCount)
  };
};

// In-memory evaluation cache to avoid duplicate LLM calls on identical answers
const evaluationCache = new Map();

/**
 * Evaluate Candidate Answer via Gemini AI or Heuristic Rubric
 */
export const evaluateAnswer = async (args = {}, options = {}) => {
  const { forceHeuristic = false, forceAI = false } = options;
  const startTime = Date.now();
  const question = args.question || {};
  const questionText = args.questionText || question.questionText || '';
  const expectedKeyPoints = args.expectedKeyPoints || question.expectedKeyPoints || [];
  const referenceAnswer = args.referenceAnswer || question.referenceAnswer || '';
  const userAnswer = args.userAnswer || args.answer || '';
  const category = args.category || question.category || 'General';
  const topic = args.topic || question.topic || '';
  const subtopic = args.subtopic || question.subtopic || '';
  const difficulty = args.difficulty || question.difficulty || 'Medium';
  const targetRole = args.targetRole || 'Software Engineer';
  const experienceLevel = args.experienceLevel || 'mid';
  const interviewMode = args.interviewMode || 'mixed';
  const companyStyle = args.companyStyle || 'General Tech';
  const conversationHistory = args.conversationHistory || [];
  const language = args.language || 'en-US';
  const isHindi = Boolean(language && (language.startsWith('hi') || language.toLowerCase().includes('hindi')));
  const stepByStepExplanation = args.stepByStepExplanation || question.stepByStepExplanation || '';
  const practicalExample = args.practicalExample || question.practicalExample || '';
  const commonMistakes = Array.isArray(args.commonMistakes) ? args.commonMistakes : (Array.isArray(question.commonMistakes) ? question.commonMistakes : []);
  const suggestedFollowUps = Array.isArray(args.suggestedFollowUps) ? args.suggestedFollowUps : (Array.isArray(question.suggestedFollowUps) ? question.suggestedFollowUps : []);

  const defaultFollowUps = Array.isArray(suggestedFollowUps) && suggestedFollowUps.length > 0
    ? suggestedFollowUps.slice(0, 2)
    : [
        `How would you diagnose and benchmark performance issues related to ${topic || category} under high concurrency?`,
        `What architectural trade-offs should an engineer consider when implementing ${topic || category} in production?`
      ];

  const defaultPracticalExample = practicalExample ||
    `In high-throughput ${category} production systems, correctly applying ${topic || 'these architectural patterns'} prevents memory leaks, ensures thread safety, and maintains consistent p99 latency SLAs.`;

  const defaultRevisionTopics = [topic || category].filter(Boolean);

  // 1. Honest handling of Empty Answers
  const trimmed = (userAnswer || '').trim();
  if (!trimmed) {
    const emptyResult = {
      score: 0,
      score100: 0,
      evaluationStatus: 'empty',
      verdict: 'empty',
      depthRating: 'superficial',
      accuracyRating: 'inaccurate',
      feedback: 'No answer submitted. Provide a technical response covering core mechanisms and production trade-offs to receive dimensional scoring.',
      strengths: [],
      missingConcepts: expectedKeyPoints.length > 0 ? expectedKeyPoints : [`Core architectural principles and internal mechanics of ${topic || category}`],
      incorrectStatements: [],
      corrections: [],
      suggestions: [
        `Review fundamental concepts of ${topic || category} for ${targetRole} interviews.`,
        'Structure your responses into: 1) Core definition, 2) Internal state/mechanisms, 3) Real-world trade-offs.'
      ],
      idealAnswer: referenceAnswer || (expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') : `A complete ${targetRole} answer covers the internal implementation, execution complexity, and operational trade-offs of ${topic || category}.`),
      practicalExample: defaultPracticalExample,
      followUpQuestions: defaultFollowUps,
      revisionTopics: defaultRevisionTopics,
      dimensions: {
        technicalCorrectness: { score: 0, maxScore: 10, feedback: 'No answer submitted.' },
        relevance: { score: 0, maxScore: 10, feedback: 'No answer submitted.' },
        conceptualUnderstanding: { score: 0, maxScore: 10, feedback: 'No answer submitted.' },
        completeness: { score: 0, maxScore: 10, feedback: 'No answer submitted.' },
        explanationClarity: { score: 0, maxScore: 10, feedback: 'No answer submitted.' },
        practicalApplication: { score: 0, maxScore: 10, feedback: 'No answer submitted.' }
      }
    };
    return isHindi ? localizeEvaluationToHindi(emptyResult) : emptyResult;
  }

  // 2. Honest handling of Skipped Answers
  if (trimmed === '[Skipped]') {
    const skippedResult = {
      score: 0,
      score100: 0,
      evaluationStatus: 'skipped',
      verdict: 'empty',
      depthRating: 'superficial',
      accuracyRating: 'inaccurate',
      feedback: 'Question was skipped by candidate. Review the model answer and key rubric points below to prepare for similar questions.',
      strengths: [],
      missingConcepts: expectedKeyPoints.length > 0 ? expectedKeyPoints : [`Core architectural principles of ${topic || category}`],
      incorrectStatements: [],
      corrections: [],
      suggestions: [
        `Prepare key topics in ${category} to build confidence answering live technical questions.`,
        'Even if uncertain during an interview, stating your thought process or clarifying assumptions demonstrates problem-solving ability.'
      ],
      idealAnswer: referenceAnswer || (expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') : `A complete ${targetRole} answer covers the internal implementation, execution complexity, and operational trade-offs of ${topic || category}.`),
      practicalExample: defaultPracticalExample,
      followUpQuestions: defaultFollowUps,
      revisionTopics: defaultRevisionTopics,
      dimensions: {
        technicalCorrectness: { score: 0, maxScore: 10, feedback: 'Question was skipped.' },
        relevance: { score: 0, maxScore: 10, feedback: 'Question was skipped.' },
        conceptualUnderstanding: { score: 0, maxScore: 10, feedback: 'Question was skipped.' },
        completeness: { score: 0, maxScore: 10, feedback: 'Question was skipped.' },
        explanationClarity: { score: 0, maxScore: 10, feedback: 'Question was skipped.' },
        practicalApplication: { score: 0, maxScore: 10, feedback: 'Question was skipped.' }
      }
    };
    return isHindi ? localizeEvaluationToHindi(skippedResult) : skippedResult;
  }

  // 3. Honest handling of Answers Too Short / Non-Committal to Evaluate Reliably
  const words = trimmed.split(/\s+/).filter(Boolean);
  const lowerAnswer = trimmed.toLowerCase();
  const nonAnswerPatterns = ['idk', "don't know", 'dont know', 'no idea', 'not sure', 'dunno', 'skip', 'pass', 'something with', 'maybe', 'not aware'];
  const isNonAnswer = nonAnswerPatterns.some(p => lowerAnswer.includes(p));
  const isTooShort = words.length < 4 || (words.length < 8 && isNonAnswer);

  if (isTooShort) {
    const tooShortResult = {
      score: 0,
      score100: 0,
      evaluationStatus: 'too_short',
      verdict: 'unclear',
      depthRating: 'superficial',
      accuracyRating: 'inaccurate',
      feedback: 'The submitted response is too brief or ambiguous to reliably evaluate technical depth and correctness. A substantive technical explanation requires stating the core mechanism, runtime behavior, and context.',
      strengths: words.length >= 2 && !isNonAnswer ? ['Attempted an initial keyword response.'] : [],
      missingConcepts: expectedKeyPoints.length > 0 ? expectedKeyPoints : [`Core architectural principles and mechanics of ${topic || category}`],
      incorrectStatements: [],
      corrections: [],
      suggestions: [
        `Avoid single-phrase or non-committal answers. In live interviews, walk through what you know about ${topic || category}.`,
        'Formulate your answer with: 1) Technical definition, 2) How it functions internally, 3) Real-world usage or trade-offs.'
      ],
      idealAnswer: referenceAnswer || (expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') : `A complete ${targetRole} answer covers the internal implementation, execution complexity, and operational trade-offs of ${topic || category}.`),
      practicalExample: defaultPracticalExample,
      followUpQuestions: defaultFollowUps,
      revisionTopics: defaultRevisionTopics,
      dimensions: {
        technicalCorrectness: { score: 1, maxScore: 10, feedback: 'Insufficient technical detail to verify correctness.' },
        relevance: { score: 2, maxScore: 10, feedback: 'Brief mention without meaningful technical substance.' },
        conceptualUnderstanding: { score: 0, maxScore: 10, feedback: 'No conceptual mechanics or definitions demonstrated.' },
        completeness: { score: 0, maxScore: 10, feedback: 'Core concepts omitted entirely.' },
        explanationClarity: { score: 1, maxScore: 10, feedback: 'Too brief to evaluate communication structure.' },
        practicalApplication: { score: 0, maxScore: 10, feedback: 'No practical or production context provided.' }
      }
    };
    return isHindi ? localizeEvaluationToHindi(tooShortResult) : tooShortResult;
  }

  // 4. Level-specific evaluation guidelines
  const levelGuidelines = {
    junior: 'Candidate is targeting an Entry-Level / Junior role. Focus on fundamental correctness, core syntax and terminology understanding, and fundamental problem-solving intuition. Be constructive and encouraging in tone.',
    mid: 'Candidate is targeting a Mid-Level role. Expect practical working knowledge, edge case handling, clean idiomatic patterns, and proper separation of concerns.',
    senior: 'Candidate is targeting a Senior role. Expect deep architectural clarity, operational trade-offs, performance implications (time/space complexity, I/O bottlenecks), and maintainability.',
    lead: 'Candidate is targeting a Lead / Architect role. Expect system-level perspective, scalability, failure recovery, security, trade-offs between architectural patterns, and business impact.'
  };

  // 5. Mode-specific evaluation guidelines
  const modeGuidelines = {
    coding: 'Evaluation must focus on algorithmic correctness, data structure choices, time/space complexity (Big-O), code readability, and boundary/edge cases.',
    live_coding: 'Evaluation must focus on algorithmic correctness, data structure choices, time/space complexity (Big-O), code readability, and boundary/edge cases.',
    sql: 'Evaluation must focus on SQL query syntax, join types and cardinalities, indexing strategy, execution efficiency, and transaction/ACID guarantees.',
    system_design: 'Evaluation must focus on scalability, bottleneck identification, distributed data storage, caching strategies, latency, fault tolerance, and security.',
    behavioral: 'Evaluation must focus on structured communication (e.g. STAR framework), ownership, collaboration, handling ambiguity, and measurable impact.',
    conceptual: 'Evaluation must focus on core internal mechanics, conceptual precision, memory model, and pros/cons.',
    mixed: 'Evaluation must balance conceptual foundation with practical engineering considerations.'
  };

  // 6. Company-style evaluation guidelines
  const companyGuidelines = {
    faang: 'Apply rigorous FAANG-bar evaluation: strong emphasis on optimal time/space complexity, high scalability, and edge case resilience.',
    startup: 'Evaluate with High-Growth Startup mindset: focus on practical delivery, pragmatic trade-offs, developer velocity, and adaptability.',
    enterprise: 'Evaluate with Enterprise / FinTech mindset: focus on robustness, compliance, security, backwards compatibility, and testability.',
    general: 'Evaluate with well-rounded general engineering standards.'
  };

  const levelGuide = levelGuidelines[experienceLevel] || levelGuidelines.mid;
  const modeGuide = modeGuidelines[interviewMode] || modeGuidelines.mixed;
  const compKey = companyStyle?.toLowerCase()?.includes('faang') ? 'faang' :
                  companyStyle?.toLowerCase()?.includes('startup') ? 'startup' :
                  companyStyle?.toLowerCase()?.includes('enterprise') ? 'enterprise' : 'general';
  const companyGuide = companyGuidelines[compKey] || companyGuidelines.general;

  // Cache lookup for duplicate queries
  const cacheKey = `${question.questionId || questionText}_${trimmed.toLowerCase()}`;
  if (!forceHeuristic && evaluationCache.has(cacheKey)) {
    const cached = evaluationCache.get(cacheKey);
    console.log(`[AI Evaluation Cache Hit] Returning cached evaluation in ${Date.now() - startTime}ms`);
    return JSON.parse(JSON.stringify(cached));
  }

  // 7. Live Gemini AI Evaluation
  const apiKey = process.env.GEMINI_API_KEY;

  if (!forceHeuristic && apiKey && apiKey.trim().length > 10) {
    try {
      const historyContextText = Array.isArray(conversationHistory) && conversationHistory.length > 0
        ? `\nPREVIOUS INTERVIEW CONTEXT (Conversation History so far):
${conversationHistory.map((h, i) => `[Exchange ${i + 1}] Q: "${h.questionText}" | Candidate Answer: "${h.answerText}" (Verdict: ${h.verdict || 'N/A'}, Score: ${h.score ?? 'N/A'})`).join('\n')}\n`
        : '';

      const prompt = `You are a Principal Software Architect, Senior Technical Hiring Bar Raiser, and Interview Evaluator.
Evaluate the candidate's actual submitted answer against the question, category, topic, difficulty, and target role.

Role Evaluated: ${targetRole}
Experience Level: ${experienceLevel.toUpperCase()}
Interview Mode: ${interviewMode.toUpperCase()}
Company Style: ${companyStyle}
Category/Subject: ${category}
Topic: ${topic}
Difficulty: ${difficulty}
${historyContextText}

EVALUATION RUBRIC GUIDELINES:
- Level Expectations: ${levelGuide}
- Mode Focus: ${modeGuide}
- Style Standard: ${companyGuide}
${interviewMode === 'coding' || interviewMode === 'live_coding' ? '- Coding specifics: Evaluate algorithm correctness and Big-O time and space complexity.' : ''}
${interviewMode === 'sql' || category.toLowerCase().includes('sql') ? '- SQL specifics: Evaluate query correctness, indexing considerations, and execution efficiency.' : ''}
${interviewMode === 'system_design' || category.toLowerCase().includes('system') ? '- System Design specifics: Evaluate trade-offs, scalability, reliability, caching, and security.' : ''}

CRITICAL RULES:
- Ground your evaluation strictly in what the candidate actually wrote or spoke.
- Do NOT give a high score merely because the answer is long.
- Do NOT penalize a correct answer simply because it uses different wording from the reference answer.
- Identify covered expected key points in "keyPointsCovered", missed expected key points in "keyPointsMissed".
- If incorrect claims or misconceptions are made, identify each one under "mistakes" (and "incorrectStatements").
- Provide a concise model answer in simple words under "betterAnswer".
- Score dimensions on a scale from 0 to 10 (technicalAccuracy, completeness, depth, clarity, communication).

Question Asked: ${questionText}
Expected Key Points: ${JSON.stringify(expectedKeyPoints)}
Reference Model Answer: "${referenceAnswer}"
Candidate's Submitted Answer: "${userAnswer}"

Return ONLY valid JSON matching this schema:
{
  "overallScore": 8.5,
  "scores": {
    "technicalAccuracy": 8.5,
    "completeness": 8.0,
    "depth": 8.0,
    "clarity": 9.0,
    "communication": 8.5
  },
  "keyPointsCovered": ["1-3 key points successfully addressed by candidate"],
  "keyPointsMissed": ["1-3 expected key points missed or incomplete"],
  "mistakes": ["exact false statements or misconceptions made by candidate, or empty array"],
  "strengths": ["1-3 specific strengths grounded in candidate response"],
  "improvements": ["1-2 actionable improvement recommendations"],
  "betterAnswer": "Concise model answer in simple words explaining core mechanism and trade-offs",
  "confidence": 0.92,
  "feedback": "Concise 1-2 sentence executive summary of candidate answer quality",
  "verdict": "correct",
  "depthRating": "adequate",
  "accuracyRating": "mostly_accurate",
  "practicalExample": "Practical production scenario demonstrating the concept in ${category}",
  "followUpQuestions": ["2 deep-dive follow-up questions testing deeper understanding"],
  "revisionTopics": ["1-3 topic names linked to ${category} catalog"],
  "dimensions": {
    "technicalCorrectness": { "score": 8, "feedback": "Evaluation of factual and architectural correctness" },
    "relevance": { "score": 9, "feedback": "Evaluation of direct relevance to the question asked" },
    "conceptualUnderstanding": { "score": 8, "feedback": "Evaluation of underlying principles vs syntax" },
    "completeness": { "score": 7, "feedback": "Coverage of expected key points and boundary cases" },
    "explanationClarity": { "score": 8, "feedback": "Clarity of communication and engineering terminology" },
    "practicalApplication": { "score": 8, "feedback": "Application to real-world production and scale" }
  }
}`;

      const evalResult = await callGemini(prompt, 'You are a rigorous technical interviewer who outputs strictly valid JSON.', 18000);

      if (evalResult && typeof evalResult === 'object') {
        const validVerdicts = ['correct', 'partially_correct', 'incorrect', 'unclear', 'empty'];
        
        const clampScore = (v, defaultVal = 5) => {
          const num = Number(v);
          return isNaN(num) ? defaultVal : Math.min(10, Math.max(0, Math.round(num * 10) / 10));
        };

        const rawDims = evalResult.dimensions || {};
        const dimensions = {
          technicalCorrectness: {
            score: clampScore(rawDims.technicalCorrectness?.score ?? evalResult.scores?.technicalAccuracy, 6),
            maxScore: 10,
            feedback: rawDims.technicalCorrectness?.feedback || 'Accurate technical terminology and core principles.'
          },
          relevance: {
            score: clampScore(rawDims.relevance?.score ?? evalResult.scores?.communication, 7),
            maxScore: 10,
            feedback: rawDims.relevance?.feedback || 'Directly addresses the prompt.'
          },
          conceptualUnderstanding: {
            score: clampScore(rawDims.conceptualUnderstanding?.score ?? evalResult.scores?.depth, 6),
            maxScore: 10,
            feedback: rawDims.conceptualUnderstanding?.feedback || 'Demonstrates understanding of underlying mechanics.'
          },
          completeness: {
            score: clampScore(rawDims.completeness?.score ?? evalResult.scores?.completeness, 5),
            maxScore: 10,
            feedback: rawDims.completeness?.feedback || 'Addresses key conceptual areas.'
          },
          explanationClarity: {
            score: clampScore(rawDims.explanationClarity?.score ?? evalResult.scores?.clarity, 7),
            maxScore: 10,
            feedback: rawDims.explanationClarity?.feedback || 'Structured technical communication.'
          },
          practicalApplication: {
            score: clampScore(rawDims.practicalApplication?.score ?? evalResult.scores?.depth, 6),
            maxScore: 10,
            feedback: rawDims.practicalApplication?.feedback || 'Relevant production considerations.'
          }
        };

        // Weighted dimensional score calculation
        const calculatedScore = clampScore(evalResult.overallScore ?? (
          dimensions.technicalCorrectness.score * 0.25 +
          dimensions.relevance.score * 0.15 +
          dimensions.conceptualUnderstanding.score * 0.20 +
          dimensions.completeness.score * 0.15 +
          dimensions.explanationClarity.score * 0.10 +
          dimensions.practicalApplication.score * 0.15
        ), 5);

        const score100 = Math.round(calculatedScore * 10);

        const derivedVerdict = validVerdicts.includes(evalResult.verdict)
          ? evalResult.verdict
          : (calculatedScore >= 7.5 ? 'correct' : calculatedScore >= 4.5 ? 'partially_correct' : 'incorrect');

        const scores = {
          technicalAccuracy: clampScore(evalResult.scores?.technicalAccuracy ?? dimensions.technicalCorrectness.score, 6),
          completeness: clampScore(evalResult.scores?.completeness ?? dimensions.completeness.score, 6),
          depth: clampScore(evalResult.scores?.depth ?? dimensions.conceptualUnderstanding.score, 6),
          clarity: clampScore(evalResult.scores?.clarity ?? dimensions.explanationClarity.score, 6),
          communication: clampScore(evalResult.scores?.communication ?? dimensions.relevance.score, 6)
        };

        const keyPointsCovered = Array.isArray(evalResult.keyPointsCovered) ? evalResult.keyPointsCovered : [];
        const keyPointsMissed = Array.isArray(evalResult.keyPointsMissed)
          ? evalResult.keyPointsMissed
          : (Array.isArray(evalResult.missingConcepts) ? evalResult.missingConcepts : []);

        const mistakes = Array.isArray(evalResult.mistakes)
          ? evalResult.mistakes
          : (Array.isArray(evalResult.incorrectStatements) ? evalResult.incorrectStatements : []);

        const strengths = Array.isArray(evalResult.strengths) && evalResult.strengths.length > 0
          ? evalResult.strengths
          : ['Demonstrated valid technical intent and relevant terminology.'];

        const improvements = Array.isArray(evalResult.improvements) && evalResult.improvements.length > 0
          ? evalResult.improvements
          : (Array.isArray(evalResult.suggestions) && evalResult.suggestions.length > 0 ? evalResult.suggestions : [`Continue refining production trade-offs in ${category}.`]);

        const betterAnswer = evalResult.betterAnswer || evalResult.idealAnswer || referenceAnswer || (expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') : '');
        const confidence = typeof evalResult.confidence === 'number' ? Math.min(1, Math.max(0, evalResult.confidence)) : 0.92;

        const geminiOutput = {
          overallScore: calculatedScore,
          score: calculatedScore,
          score100,
          scores,
          keyPointsCovered,
          keyPointsMissed,
          mistakes,
          strengths,
          improvements,
          betterAnswer,
          confidence,
          evaluatorLabel: 'AI Evaluation',
          isFallback: false,
          evaluationStatus: 'evaluated',
          verdict: derivedVerdict,
          depthRating: evalResult.depthRating || (calculatedScore >= 7 ? 'in-depth' : calculatedScore >= 4 ? 'adequate' : 'superficial'),
          accuracyRating: evalResult.accuracyRating || (calculatedScore >= 7 ? 'accurate' : calculatedScore >= 4 ? 'mostly_accurate' : 'misconceptions'),
          feedback: evalResult.feedback || `Answer evaluated for ${targetRole} (${experienceLevel}).`,
          missingConcepts: keyPointsMissed,
          incorrectStatements: mistakes,
          corrections: Array.isArray(evalResult.corrections) ? evalResult.corrections : [],
          suggestions: improvements,
          idealAnswer: betterAnswer,
          practicalExample: evalResult.practicalExample || defaultPracticalExample,
          followUpQuestions: Array.isArray(evalResult.followUpQuestions) && evalResult.followUpQuestions.length > 0
            ? evalResult.followUpQuestions.slice(0, 2)
            : defaultFollowUps,
          revisionTopics: Array.isArray(evalResult.revisionTopics) && evalResult.revisionTopics.length > 0
            ? evalResult.revisionTopics
            : defaultRevisionTopics,
          dimensions
        };

        const finalRes = isHindi ? localizeEvaluationToHindi(geminiOutput) : geminiOutput;
        evaluationCache.set(cacheKey, finalRes);
        console.log(`[AI Evaluation] Finished in ${Date.now() - startTime}ms | Evaluator: AI Evaluation | Score: ${calculatedScore}/10`);
        return finalRes;
      }
    } catch (err) {
      console.warn('[AI Evaluation Warning] Live Gemini evaluation failed, falling back to rubric evaluation:', err.message);
    }
  }

  // 8. Heuristic Rubric Evaluation for Demo / Offline Mode
  const keyPointsCovered = [];
  const keyPointsMissed = [];
  const strengths = [];
  const suggestions = [];

  for (const kp of expectedKeyPoints) {
    const cleanedKp = kp.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const keywords = cleanedKp.split(/\s+/).filter(w => w.length > 2);
    const matches = keywords.filter(k => lowerAnswer.includes(k));
    if (keywords.length > 0 && matches.length >= Math.ceil(keywords.length * 0.25)) {
      keyPointsCovered.push(kp);
    } else {
      keyPointsMissed.push(kp);
    }
  }

  // Comprehensive Misconception & Inverted Claim Detection
  const misconceptionPatterns = [
    {
      pattern: /\bstring\b.*?\b(?:can be modified|is mutable|modified freely)\b/i,
      concept: 'Claimed String is mutable in Java',
      correction: 'Java String objects are immutable; any modification creates a new String instance.'
    },
    {
      pattern: /\bstringbuilder\b.*?\b(?:is immutable|cannot be modified|is thread-?safe|synchronized)\b/i,
      concept: 'Claimed StringBuilder is thread-safe or synchronized',
      correction: 'StringBuilder is unsynchronized for single-thread efficiency; use StringBuffer or concurrent collections for thread-safe mutations.'
    },
    {
      pattern: /\bstringbuffer\b.*?\b(?:never synchronized|not thread-?safe|unsynchronized)\b/i,
      concept: 'Claimed StringBuffer is unsynchronized',
      correction: 'StringBuffer methods are synchronized to provide thread safety.'
    },
    {
      pattern: /\bvolatile\b.*?\b(?:provides atomicity|is atomic|locks the thread)\b/i,
      concept: 'Claimed volatile guarantees atomic operations',
      correction: 'volatile guarantees memory visibility and prevents instruction reordering, but does NOT guarantee atomicity for compound operations (e.g. i++).'
    },
    {
      pattern: /\bhashmap\b.*?\b(?:is synchronized|thread-?safe)\b/i,
      concept: 'Claimed HashMap is synchronized',
      correction: 'Standard HashMap is unsynchronized; use ConcurrentHashMap in multi-threaded contexts.'
    },
    {
      pattern: /\btcp\b.*?\b(?:connectionless|unreliable)\b/i,
      concept: 'Claimed TCP is connectionless or unreliable',
      correction: 'TCP is connection-oriented, full-duplex, and guarantees reliable, ordered packet delivery.'
    },
    {
      pattern: /\budp\b.*?\b(?:guarantees delivery|handshake)\b/i,
      concept: 'Claimed UDP performs handshakes or guarantees delivery',
      correction: 'UDP is a connectionless, best-effort datagram protocol with no three-way handshake or packet acknowledgments.'
    },
    {
      pattern: /\bwhere\b.*?\b(?:filters aggregates|after group by|aggregates in where)\b/i,
      concept: 'Claimed WHERE filters aggregate function outputs',
      correction: 'The WHERE clause filters rows before aggregation; the HAVING clause filters grouped results after aggregation.'
    },
    {
      pattern: /\bprimary key\b.*?\b(?:allows null|can be null|contains null)\b/i,
      concept: 'Claimed PRIMARY KEY allows NULL values',
      correction: 'A PRIMARY KEY constraint inherently enforces both UNIQUE and NOT NULL constraints.'
    },
    {
      pattern: /\bbinary search\b.*?\b(?:unsorted array|without sorting|on any array)\b/i,
      concept: 'Claimed Binary Search operates on unsorted data',
      correction: 'Binary Search strictly requires the data to be ordered/sorted to achieve O(log n) time complexity.'
    },
    {
      pattern: /\bconst\b.*?\b(?:makes object immutable|freezes object|properties cannot change)\b/i,
      concept: 'Claimed const makes object properties immutable in JavaScript',
      correction: 'const prevents variable reassignment, but does not prevent property mutation on the underlying object (Object.freeze is required).'
    }
  ];

  const detectedIncorrect = [];
  const detectedCorrections = [];

  for (const item of misconceptionPatterns) {
    if (item.pattern.test(lowerAnswer)) {
      detectedIncorrect.push(item.concept);
      detectedCorrections.push(item.correction);
    }
  }

  // Base score calibrated by experience level and keypoint match ratio
  const normExp = (experienceLevel || '').toLowerCase();
  const isJuniorOrFresher = normExp === 'junior' || normExp === 'fresher' || normExp === 'entry' || (targetRole && targetRole.toLowerCase().includes('junior'));
  const isSeniorOrLead = normExp === 'senior' || normExp === 'lead' || normExp === 'principal' || (targetRole && (targetRole.toLowerCase().includes('senior') || targetRole.toLowerCase().includes('lead')));

  const matchedPoints = keyPointsCovered.length;
  const answerMatchRatio = expectedKeyPoints.length > 0
    ? (matchedPoints / expectedKeyPoints.length)
    : (words.length >= 35 ? 0.8 : words.length >= 15 ? 0.6 : 0.4);

  let baseScore = 5;
  if (isJuniorOrFresher) {
    if (answerMatchRatio >= 0.75) {
      baseScore = words.length >= 35 ? 9 : 8;
    } else if (answerMatchRatio >= 0.4) {
      baseScore = 6;
    } else if (words.length >= 15 && matchedPoints >= 1) {
      baseScore = 5;
    } else if (words.length < 10) {
      baseScore = 3;
    }
    suggestions.push(`Focus on foundational syntax, core terminology, and basic mechanics for ${targetRole} interviews.`);
  } else if (isSeniorOrLead) {
    if (words.length < 25) {
      baseScore = 3;
      suggestions.push(`As a ${experienceLevel} candidate, expand on trade-offs, scalability, and operational reliability.`);
    } else if (answerMatchRatio >= 0.75 && words.length >= 40) {
      baseScore = 9;
      strengths.push('Demonstrated technical depth with structured elaboration.');
    } else if (answerMatchRatio >= 0.5) {
      baseScore = 6;
    } else {
      baseScore = 4;
      suggestions.push(`Discuss architecture trade-offs, failure recovery, or real-world production scale appropriate for ${experienceLevel} roles.`);
    }
  } else {
    // Mid-level standard
    if (words.length < 15) {
      baseScore = Math.max(2, Math.round(answerMatchRatio * 5));
      suggestions.push('Provide a more thorough explanation with concrete technical details and real-world context.');
    } else if (answerMatchRatio >= 0.75 && words.length >= 35) {
      baseScore = 9;
      strengths.push('Good detail provided and structured response.');
    } else if (answerMatchRatio >= 0.4) {
      baseScore = 6;
    } else {
      baseScore = 5;
    }
  }

  // Mode-specific checks
  if (interviewMode === 'coding' || interviewMode === 'live_coding' || category.toLowerCase().includes('dsa')) {
    if (!lowerAnswer.includes('o(') && !lowerAnswer.includes('time') && !lowerAnswer.includes('complexity')) {
      keyPointsMissed.push('Time and space complexity analysis (Big-O)');
      suggestions.push('Always state the time and space complexity (Big-O) of your approach.');
    } else {
      strengths.push('Addressed algorithmic complexity (Big-O).');
    }
  } else if (interviewMode === 'sql' || category.toLowerCase().includes('sql') || category.toLowerCase().includes('dbms')) {
    if (!lowerAnswer.includes('index') && !lowerAnswer.includes('join') && !lowerAnswer.includes('table') && !lowerAnswer.includes('query')) {
      keyPointsMissed.push('SQL query logic, table joins, and indexing considerations');
      suggestions.push('Discuss indexing, query execution efficiency, and join mechanics for relational databases.');
    } else {
      strengths.push('Included database query and indexing context.');
    }
  } else if (interviewMode === 'system_design' || category.toLowerCase().includes('system')) {
    if (!lowerAnswer.includes('cache') && !lowerAnswer.includes('scale') && !lowerAnswer.includes('database')) {
      keyPointsMissed.push('Scalability, caching, and storage architecture considerations');
      suggestions.push('Address scalability bottlenecks, caching layer, and data consistency models.');
    } else {
      strengths.push('Incorporated distributed architecture and scalability factors.');
    }
  }

  if (matchedPoints > 0) {
    strengths.push(`Addressed core concepts relevant to ${category} (${targetRole}).`);
  }
  if (keyPointsMissed.length === 0 && expectedKeyPoints.length > 0) {
    strengths.push('Covered all key expected conceptual points.');
  }

  // Factor in detected misconceptions
  if (detectedIncorrect.length > 0) {
    if (detectedIncorrect.length >= 2 || (detectedIncorrect.length >= 1 && words.length < 40)) {
      baseScore = Math.min(baseScore, 2);
    } else {
      baseScore = Math.min(baseScore, 4);
    }
    suggestions.push(`Review core definitions: ${detectedIncorrect.join('; ')}.`);
  }

  // Verdict and Ratings
  let verdict = 'partially_correct';
  let depthRating = words.length >= 35 ? 'in-depth' : words.length >= 15 ? 'adequate' : 'superficial';
  let accuracyRating = detectedIncorrect.length > 0
    ? 'misconceptions'
    : (matchedPoints >= 2 ? 'accurate' : matchedPoints === 1 ? 'mostly_accurate' : 'inaccurate');

  if (detectedIncorrect.length >= 2) {
    verdict = 'incorrect';
    accuracyRating = 'inaccurate';
  } else if (detectedIncorrect.length === 1) {
    verdict = 'partially_correct';
    accuracyRating = 'misconceptions';
  } else if (baseScore >= 8 && keyPointsMissed.length === 0) {
    verdict = 'correct';
    depthRating = 'in-depth';
    accuracyRating = 'accurate';
  } else if (baseScore >= 7 && keyPointsMissed.length <= 1) {
    verdict = 'correct';
    accuracyRating = 'accurate';
  } else if (baseScore < 4) {
    verdict = 'incorrect';
  } else {
    verdict = 'partially_correct';
  }

  // Build granular dimensions for rubric fallback
  const techScore = detectedIncorrect.length > 0 ? Math.max(1, baseScore - 3) : baseScore;
  let relevanceScore = Math.min(10, Math.max(4, Math.round(4 + answerMatchRatio * 6)));
  let conceptScore = Math.min(10, Math.max(3, baseScore));
  let completeScore = expectedKeyPoints.length > 0
    ? Math.min(10, Math.max(2, Math.round(2 + answerMatchRatio * 8)))
    : baseScore;
  let clarityScore = words.length >= 30 ? 8 : words.length >= 15 ? 6 : 4;
  let practicalScore = (lowerAnswer.includes('production') || lowerAnswer.includes('trade-off') || lowerAnswer.includes('scale') || lowerAnswer.includes('o(') || lowerAnswer.includes('fail') || lowerAnswer.includes('bucket') || lowerAnswer.includes('hashmap') || lowerAnswer.includes('gc') || lowerAnswer.includes('heap') || lowerAnswer.includes('generation') || lowerAnswer.includes('memory')) ? 8 : 5;

  if (detectedIncorrect.length > 0) {
    const penaltyCap = detectedIncorrect.length >= 2 ? 3 : 5;
    relevanceScore = Math.min(relevanceScore, penaltyCap);
    conceptScore = Math.min(conceptScore, penaltyCap);
    completeScore = Math.min(completeScore, penaltyCap);
    clarityScore = Math.min(clarityScore, 5);
    practicalScore = Math.min(practicalScore, 3);
  }

  const scores = {
    technicalAccuracy: techScore,
    completeness: completeScore,
    depth: conceptScore,
    clarity: clarityScore,
    communication: relevanceScore
  };

  const calculatedScore = Math.min(10, Math.max(1, Math.round((
    scores.technicalAccuracy * 0.30 +
    scores.completeness * 0.25 +
    scores.depth * 0.20 +
    scores.clarity * 0.15 +
    scores.communication * 0.10
  ) * 10) / 10));

  const score100 = Math.round(calculatedScore * 10);

  const betterAnswer = referenceAnswer || (expectedKeyPoints.length > 0 ? expectedKeyPoints.join('. ') : `A solid response in ${category} clearly defines the mechanism, trade-offs, and boundary conditions.`);

  const evalResult = {
    overallScore: calculatedScore,
    score: calculatedScore,
    score100,
    scores,
    keyPointsCovered,
    keyPointsMissed,
    mistakes: detectedIncorrect,
    strengths: strengths.length > 0 ? strengths : ['Attempted response with valid technical direction.'],
    improvements: suggestions.length > 0 ? suggestions : [`Include concrete code or architectural patterns relevant to ${targetRole}.`],
    betterAnswer,
    confidence: 0.75,
    evaluatorLabel: 'Basic evaluation (AI unavailable)',
    isFallback: true,
    evaluationStatus: 'evaluated',
    verdict,
    depthRating,
    accuracyRating,
    feedback: `Technical answer evaluated against ${experienceLevel.toUpperCase()} ${targetRole} standards (Basic evaluation - AI unavailable).`,
    missingConcepts: keyPointsMissed,
    incorrectStatements: detectedIncorrect,
    corrections: detectedCorrections,
    suggestions,
    idealAnswer: betterAnswer,
    practicalExample: defaultPracticalExample,
    followUpQuestions: defaultFollowUps,
    revisionTopics: defaultRevisionTopics,
    dimensions: {
      technicalCorrectness: { score: techScore, maxScore: 10, feedback: detectedIncorrect.length > 0 ? `Contains misconceptions: ${detectedIncorrect.join(', ')}` : 'Demonstrates solid technical terminology.' },
      relevance: { score: relevanceScore, maxScore: 10, feedback: 'Addressed the core aspects of the interview question.' },
      conceptualUnderstanding: { score: conceptScore, maxScore: 10, feedback: 'Reflects understanding of mechanical and structural principles.' },
      completeness: { score: completeScore, maxScore: 10, feedback: `Addressed ${matchedPoints} of ${Math.max(1, expectedKeyPoints.length)} expected key evaluation points.` },
      explanationClarity: { score: clarityScore, maxScore: 10, feedback: 'Cohesive technical explanation.' },
      practicalApplication: { score: practicalScore, maxScore: 10, feedback: 'Consideration of real-world mechanics and production trade-offs.' }
    }
  };

  const finalRes = isHindi ? localizeEvaluationToHindi(evalResult) : evalResult;
  console.log(`[AI Evaluation] Finished in ${Date.now() - startTime}ms | Evaluator: Basic evaluation (AI unavailable) | Score: ${calculatedScore}/10`);
  return finalRes;
};

/**
 * Generate an adaptive follow-up question based on the candidate's actual answer and evaluation.
 * 
 * Adaptive Strategy Calibration:
 * - High Score (>= 8): Deepen challenge (edge cases, concurrency, internals, scale, performance trade-offs).
 * - Medium Score (5-7): Target gaps directly (probe missingConcepts identified during evaluation).
 * - Low Score (< 5 or skipped): Scaffold / foundational pivot (test core primitives or conceptual basics).
 * 
 * Strictly preserves category boundaries using validateQuestionSubject and subject isolation directives.
 */
export const generateAdaptiveFollowUpQuestion = async ({
  category,
  difficulty = 'Medium',
  targetRole = 'Software Engineer',
  experienceLevel = 'mid',
  interviewMode = 'mixed',
  companyStyle = 'General Tech',
  previousQuestion,
  userAnswer = '',
  evaluation = null,
  excludeNormalized = [],
  excludeIds = [],
  conversationHistory = [],
  parentQuestionId = null,
  language = 'en-US'
}) => {
  const isHindi = Boolean(language && (language.startsWith('hi') || language.toLowerCase().includes('hindi')));
  const seenNormalized = new Set(excludeNormalized.map(t => normalizeQuestionText(t)).filter(Boolean));
  const seenIds = new Set((excludeIds || []).map(id => id.toString()));

  const score = evaluation?.score ?? 5;
  const verdict = evaluation?.verdict || (score >= 8 ? 'correct' : score >= 5 ? 'partially_correct' : score >= 3 ? 'incorrect' : 'empty');
  const missingConcepts = Array.isArray(evaluation?.missingConcepts) ? evaluation.missingConcepts : [];
  const strengths = Array.isArray(evaluation?.strengths) ? evaluation.strengths : [];
  const prevTopic = previousQuestion?.topic || 'Core Mechanics';
  const prevText = previousQuestion?.questionText || '';
  const resolvedParentId = parentQuestionId || previousQuestion?.questionId || (previousQuestion?._id ? previousQuestion._id.toString() : null);

  let strategy = 'probe_gap';
  let adaptiveReason = '';
  let targetDifficulty = difficulty;

  const wrapAdaptiveResult = (candidate) => {
    const formatted = formatQuestionCandidate(candidate, category, targetDifficulty);
    return isHindi ? localizeQuestionToHindi(formatted, category) : formatted;
  };

  if (verdict === 'correct' || score >= 8) {
    strategy = 'deepen';
    targetDifficulty = difficulty === 'Easy' ? 'Medium' : 'Hard';
    adaptiveReason = `Deep-dive on ${prevTopic}: probing advanced mechanics & production trade-offs.`;
  } else if (verdict === 'partially_correct' || (score >= 5 && score < 8)) {
    strategy = 'probe_gap';
    targetDifficulty = difficulty;
    const gap = missingConcepts[0] ? `"${missingConcepts[0].slice(0, 45)}..."` : 'edge cases';
    adaptiveReason = `Follow-up on previous answer: clarifying ${gap}.`;
  } else if (verdict === 'incorrect') {
    strategy = 'diagnostic';
    targetDifficulty = difficulty === 'Hard' ? 'Medium' : difficulty;
    adaptiveReason = `Diagnostic follow-up on ${prevTopic}: clarifying common misconception and actual behavior.`;
  } else if (verdict === 'unclear') {
    strategy = 'clarify';
    targetDifficulty = difficulty;
    adaptiveReason = `Clarification follow-up on ${prevTopic}: seeking precise technical clarification.`;
  } else {
    // empty / skipped
    strategy = 'scaffold';
    targetDifficulty = difficulty === 'Hard' ? 'Medium' : 'Easy';
    adaptiveReason = `Foundational exploration: verifying core ${category} fundamentals.`;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const directives = getSubjectIsolationDirectives(category);
      const systemInstruction = `You are a Senior Technical Interviewer and Hiring Bar Raiser conducting an adaptive mock interview for a ${experienceLevel} ${targetRole} in '${category}'.
Your task is to generate a dynamic, highly targeted follow-up question that directly reacts to the candidate's previous answer and evaluation.
${directives}
ADAPTIVE STRATEGY: "${strategy.toUpperCase()}"
- If DEEPEN: Ask a deeper conceptual, architectural, or edge-case question advancing beyond their strong answer.
- If PROBE_GAP: Ask a question directly investigating the missing concepts or unaddressed areas (${missingConcepts.join(', ')}).
- If DIAGNOSTIC: Candidate had an incorrect misconception. Ask a diagnostic question exploring why their assumption causes issues or ask how ${category} actually behaves.
- If CLARIFY: Candidate was ambiguous or excessively brief. Ask candidate to clarify their exact meaning, reasoning, or step-by-step logic.
- If SCAFFOLD: Candidate skipped or had empty answer. Ask a foundational question within '${category}' to evaluate core basics without penalizing.

Return ONLY a single valid JSON object matching the question schema.`;

      const historyContextText = Array.isArray(conversationHistory) && conversationHistory.length > 0
        ? `\nPREVIOUS INTERVIEW CONTEXT (Conversation History so far):
${conversationHistory.map((h, i) => `[Exchange ${i + 1}] Q: "${h.questionText}" | Candidate Answer: "${h.answerText}" (Verdict: ${h.verdict || 'N/A'})`).join('\n')}\n`
        : '';

      const prompt = `Candidate Interview Context:
- Subject / Category: ${category}
- Target Role: ${targetRole}
- Seniority: ${experienceLevel}
- Mode: ${interviewMode}
- Style: ${companyStyle}
- Target Difficulty: ${targetDifficulty}
- Adaptive Strategy: ${strategy}
${historyContextText}
Previous Question Asked:
"${prevText}"

Candidate's Answer:
"${userAnswer || '[Candidate skipped question]'}"

Evaluation Results:
- Verdict: ${verdict}
- Score: ${score}/10
- Strengths: ${JSON.stringify(strengths)}
- Missing Concepts: ${JSON.stringify(missingConcepts)}
- Evaluation Feedback: "${evaluation?.feedback || ''}"

TASK:
Generate a single follow-up question strictly within '${category}' following the "${strategy}" strategy.
The question must feel like a natural, intelligent conversational follow-up to their answer while remaining 100% focused on '${category}'.

Return a JSON object with this exact schema:
{
  "questionText": "Follow-up question text here...",
  "category": "${category}",
  "topic": "${prevTopic}",
  "subtopic": "Adaptive Follow-Up",
  "difficulty": "${targetDifficulty}",
  "questionType": "${previousQuestion?.questionType || 'conceptual'}",
  "targetRoles": ["${targetRole}"],
  "interviewMode": "${interviewMode}",
  "companyStyleLabel": "${companyStyle}",
  "tags": ["${category.toLowerCase()}", "adaptive", "follow-up"],
  "referenceAnswer": "Clear 2-3 sentence reference model answer...",
  "expectedKeyPoints": ["Key point 1", "Key point 2"],
  "evaluationRubric": { "scoringCriteria": ["Criterion 1", "Criterion 2"], "minimumPassingScore": 6 },
  "hints": ["Helpful hint related to the follow-up"],
  "codingDetails": { "constraints": [], "examples": [] },
  "adaptiveReason": "${adaptiveReason}"
}`;

      const generated = await callGemini(prompt, systemInstruction, 16000);

      if (generated && typeof generated === 'object' && generated.questionText) {
        const subjectValidation = validateQuestionSubject(generated, category);
        if (subjectValidation.isValid) {
          const norm = normalizeQuestionText(generated.questionText);
          if (norm && !seenNormalized.has(norm)) {
            generated.category = category;
            generated.isAdaptiveFollowUp = true;
            generated.adaptiveReason = generated.adaptiveReason || adaptiveReason;
            generated.parentQuestionId = resolvedParentId;
            generated.followUpStrategy = strategy;

            let stableId = null;
            if (mongoose.connection && mongoose.connection.readyState === 1) {
              try {
                const newQ = new Question({
                  questionText: generated.questionText.trim(),
                  normalizedText: norm,
                  category,
                  topic: generated.topic || prevTopic,
                  subtopic: generated.subtopic || 'Adaptive Follow-Up',
                  difficulty: targetDifficulty,
                  questionType: generated.questionType || 'conceptual',
                  targetRoles: [targetRole],
                  interviewMode,
                  tags: [category.toLowerCase(), 'adaptive', 'follow-up'],
                  sourceType: 'ai_generated',
                  companyStyleLabel: companyStyle,
                  referenceAnswer: generated.referenceAnswer || '',
                  expectedKeyPoints: Array.isArray(generated.expectedKeyPoints) ? generated.expectedKeyPoints : [],
                  evaluationRubric: generated.evaluationRubric || { scoringCriteria: [], minimumPassingScore: 6 },
                  hints: Array.isArray(generated.hints) ? generated.hints : [],
                  codingDetails: generated.codingDetails || { constraints: [], examples: [] },
                  generationMetadata: {
                    model: 'gemini-1.5-flash',
                    promptFocus: `Adaptive Follow-Up (${strategy})`,
                    generatedAt: new Date()
                  },
                  isActive: true
                });
                await newQ.save();
                stableId = newQ._id.toString();
              } catch (saveErr) {
                // If collision or error, fallback to memory id
              }
            }

            if (!stableId) {
              stableId = `adaptive_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            }

            return wrapAdaptiveResult({
              ...generated,
              questionId: stableId,
              normalizedText: norm,
              isAdaptiveFollowUp: true,
              adaptiveReason: generated.adaptiveReason || adaptiveReason,
              parentQuestionId: resolvedParentId,
              followUpStrategy: strategy
            });
          }
        } else {
          console.warn(`[AI Service] Adaptive follow-up rejected by subject validator for ${category}: ${subjectValidation.reason}`);
        }
      }
    } catch (err) {
      console.warn('[AI Service] Gemini adaptive generation failed, falling back to curated adaptive selector:', err.message);
    }
  }

  // Fallback 1: Prioritize using the previous question's followUps[] or suggestedFollowUps[]
  const availableFollowUps = [
    ...(Array.isArray(previousQuestion?.suggestedFollowUps) ? previousQuestion.suggestedFollowUps : []),
    ...(Array.isArray(previousQuestion?.followUps) ? previousQuestion.followUps : [])
  ].filter(Boolean);

  for (const followUpText of availableFollowUps) {
    const norm = normalizeQuestionText(followUpText);
    if (norm && !seenNormalized.has(norm)) {
      return wrapAdaptiveResult({
        questionId: `followup_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        questionText: followUpText.trim(),
        normalizedText: norm,
        category,
        topic: prevTopic,
        subtopic: 'Adaptive Follow-Up',
        difficulty: targetDifficulty,
        questionType: 'conceptual',
        targetRoles: [targetRole],
        interviewMode,
        companyStyleLabel: companyStyle,
        isAdaptiveFollowUp: true,
        isFollowUp: true,
        parentQuestionId: resolvedParentId,
        followUpStrategy: strategy,
        adaptiveReason: `Targeted follow-up on ${prevTopic}: probing technical rationale and edge cases.`,
        referenceAnswer: `A thorough answer directly analyzes ${followUpText} by detailing internal mechanics, performance bounds, and production considerations in ${category}.`,
        expectedKeyPoints: [
          `Clear architectural and practical understanding of ${prevTopic}`,
          `Evaluation of production trade-offs and edge-case behavior in ${category}`
        ]
      });
    }
  }

  // Fallback 2: Dynamic Curated Engine from MongoDB matching strategy & category
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      const escapedCategory = category.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const baseFilter = {
        category: new RegExp(`^${escapedCategory}$`, 'i'),
        isActive: true,
        normalizedText: { $nin: Array.from(seenNormalized) }
      };

      let candidatesFromDb = [];

      if ((strategy === 'probe_gap' || strategy === 'diagnostic') && missingConcepts.length > 0) {
        const firstMissing = missingConcepts[0].replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3);
        if (firstMissing.length > 0) {
          const keywordRegex = new RegExp(firstMissing.slice(0, 3).join('|'), 'i');
          candidatesFromDb = await Question.find({
            ...baseFilter,
            $or: [
              { questionText: keywordRegex },
              { topic: keywordRegex },
              { subtopic: keywordRegex }
            ]
          }).limit(3).lean();
        }
      } else if (strategy === 'deepen') {
        candidatesFromDb = await Question.find({
          ...baseFilter,
          difficulty: targetDifficulty
        }).limit(3).lean();
      } else {
        candidatesFromDb = await Question.find({
          ...baseFilter,
          difficulty: 'Easy'
        }).limit(3).lean();
      }

      for (const item of candidatesFromDb) {
        if (!validateQuestionSubject(item, category).isValid) continue;
        const norm = item.normalizedText || normalizeQuestionText(item.questionText);
        if (seenNormalized.has(norm)) continue;
        const idStr = (item._id || item.questionId || '').toString();
        if (idStr && seenIds.has(idStr)) continue;

        return wrapAdaptiveResult({
          ...item,
          isAdaptiveFollowUp: true,
          adaptiveReason,
          parentQuestionId: resolvedParentId,
          followUpStrategy: strategy
        });
      }
    } catch (dbErr) {
      console.warn('[AI Service] DB search in adaptive fallback encountered error:', dbErr.message);
    }
  }

  // 2. Check SEED_QUESTIONS for matching category
  const seedCandidates = SEED_QUESTIONS.filter(q => {
    if (q.category.toLowerCase() !== category.toLowerCase()) return false;
    const norm = normalizeQuestionText(q.questionText);
    return !seenNormalized.has(norm);
  });

  if (seedCandidates.length > 0) {
    let chosen = seedCandidates.find(q => q.difficulty === targetDifficulty) || seedCandidates[0];
    if (validateQuestionSubject(chosen, category).isValid) {
      return wrapAdaptiveResult({
        ...chosen,
        isAdaptiveFollowUp: true,
        adaptiveReason,
        parentQuestionId: resolvedParentId,
        followUpStrategy: strategy
      });
    }
  }

  // 3. Dynamic Template Construction Scoped to Category & Previous Question Context
  let templateText = '';
  if (strategy === 'deepen') {
    templateText = `You covered the fundamental mechanics of ${prevTopic} in ${category}. When scaling this pattern in a high-throughput production environment, what specific concurrency bottlenecks or resource constraints typically arise, and what architectural trade-offs would you make to mitigate them?`;
  } else if (strategy === 'probe_gap') {
    const gapKeyword = missingConcepts[0] || 'edge-case failure modes and memory bounds';
    templateText = `In your answer on ${prevTopic}, let's drill deeper into ${gapKeyword}. How does ${category} handle this under production load, and what safeguards or best practices should an engineer put in place?`;
  } else if (strategy === 'diagnostic') {
    templateText = `If a production service running ${category} experienced intermittent latency spikes or state corruption related to ${prevTopic}, walk me through your diagnostic workflow: what metrics would you inspect, and how would you isolate the root cause?`;
  } else if (strategy === 'clarify') {
    templateText = `Could you walk me through a concrete scenario involving ${prevTopic} in ${category} where boundary conditions or unexpected inputs occur? Step through the execution sequence from start to finish.`;
  } else {
    templateText = `Let's focus on the core foundational principles of ${prevTopic} in ${category}. What primary problem does this solve, and what invariant rules or conventions must every developer adhere to when implementing it?`;
  }

  const norm = normalizeQuestionText(templateText);
  return wrapAdaptiveResult({
    questionId: `adaptive_fallback_${category.toLowerCase()}_${Date.now()}`,
    questionText: templateText,
    normalizedText: norm,
    category,
    topic: prevTopic,
    subtopic: 'Adaptive Follow-Up',
    difficulty: targetDifficulty,
    questionType: 'conceptual',
    targetRoles: [targetRole],
    interviewMode,
    companyStyleLabel: companyStyle,
    expectedKeyPoints: [
      `Directly addresses the ${strategy} dimension in ${category}`,
      `Articulates core architecture and internal mechanisms of ${prevTopic}`,
      `Demonstrates idiomatic best practices in ${category}`
    ],
    referenceAnswer: `A comprehensive ${targetRole} answer in ${category} should cover the architectural principles, trade-offs, and practical edge cases of ${prevTopic}.`,
    stepByStepExplanation: `1. Revisit the core implementation of ${prevTopic}.\n2. Address the specific ${strategy} angle: analyze trade-offs, failure modes, or performance metrics.\n3. Formulate production-tested mitigation strategies.`,
    practicalExample: `In a production ${category} environment, diagnosing and handling ${prevTopic} nuances prevents catastrophic downtime or latency degradation.`,
    commonMistakes: [
      `Failing to analyze memory and thread-safety implications of ${prevTopic}`,
      'Ignoring platform-specific runtime behaviors or garbage collection pauses'
    ],
    suggestedFollowUps: [
      `How would you write automated regression tests for this ${prevTopic} scenario?`
    ],
    evaluationRubric: {
      scoringCriteria: [
        `Accuracy regarding ${category} ${prevTopic} mechanics`,
        'Clarity of reasoning and technical depth',
        'Discussion of practical trade-offs'
      ],
      minimumPassingScore: 6
    },
    hints: [`Consider how ${category} handles ${prevTopic} internally under production load.`],
    isAdaptiveFollowUp: true,
    adaptiveReason,
    parentQuestionId: resolvedParentId,
    followUpStrategy: strategy
  });
};

/**
 * Generate short human reaction between questions based on persona and company style
 * Rules: Never reveals the ideal answer; tone depends on company style (Startup, FAANG, Enterprise)
 */
export const generateInterviewerReaction = ({
  score = 5,
  verdict = 'partially_correct',
  companyStyle = 'General Tech',
  language = 'en-US',
  isFollowUp = false
}) => {
  const isHindi = Boolean(language && (language.startsWith('hi') || language.toLowerCase().includes('hindi')));
  const style = (companyStyle || 'General Tech').toLowerCase();
  const isStrong = score >= 7.5;
  const isWeak = score < 5;

  if (isHindi) {
    if (isFollowUp) {
      return isStrong
        ? 'Bohot badiya! Aapne follow-up ko achhe se explain kiya. Chaliye agle question par chalte hain.'
        : 'Theek hai, got it. Chaliye ab next question par move karte hain.';
    }
    if (isStrong) {
      return 'Bohot achha! Aapka explanation kafi clear tha. Chaliye aage badhte hain.';
    }
    if (isWeak) {
      return 'Theek hai, koi baat nahi. Chaliye agle question ko dekhte hain.';
    }
    return 'Theek hai, samajh gaya. Let\'s move on to the next question.';
  }

  // Startup Persona (Casual, fast-paced, pragmatic)
  if (style.includes('startup')) {
    if (isFollowUp) {
      return isStrong
        ? 'Great follow-up defense! Really like that angle. Let\'s keep the momentum going.'
        : 'Got it. Makes sense for now. Let\'s pivot to the next problem.';
    }
    if (isStrong) {
      const reactions = [
        'Awesome, great breakdown! Let\'s keep moving.',
        'Love the practical mindset there. Let\'s dive into the next one.',
        'Spot on. Let\'s see how you tackle this next challenge.'
      ];
      return reactions[Math.floor(Math.random() * reactions.length)];
    }
    if (isWeak) {
      const reactions = [
        'No worries, let\'s pivot and tackle the next question.',
        'Got it. Let\'s move on to the next one and see how you do there.'
      ];
      return reactions[Math.floor(Math.random() * reactions.length)];
    }
    return 'Okay, got it. Let\'s move on.';
  }

  // FAANG Persona (Rigorous, analytical, calm, objective)
  if (style.includes('faang') || style.includes('big tech') || style.includes('maang')) {
    if (isFollowUp) {
      return isStrong
        ? 'Understood. That addresses the edge case constraints. Let us proceed.'
        : 'Acknowledged. Let us move forward to the next problem in the sequence.';
    }
    if (isStrong) {
      const reactions = [
        'Understood. That covers the primary operational characteristics. Moving on.',
        'Clear explanation. Let us examine the next problem scenario.',
        'Noted. Your rationale addresses the key constraints. Moving forward.'
      ];
      return reactions[Math.floor(Math.random() * reactions.length)];
    }
    if (isWeak) {
      const reactions = [
        'Understood. Let us transition to the next topic area.',
        'Acknowledged. Moving on to the next evaluation question.'
      ];
      return reactions[Math.floor(Math.random() * reactions.length)];
    }
    return 'Understood. Let us proceed to the next question.';
  }

  // Enterprise / General Tech Persona (Professional, structured, courteous)
  if (isFollowUp) {
    return isStrong
      ? 'Thank you for clarifying that point thoroughly. Let us proceed.'
      : 'Thank you for your answer. Let us now move on to the next topic.';
  }
  if (isStrong) {
    const reactions = [
      'Thank you, that was a very thorough and structured answer. Let\'s proceed.',
      'Well articulated. Let us move forward to the next question in this round.',
      'Thank you. That aligns well with standard engineering practices. Moving on.'
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }
  if (isWeak) {
    const reactions = [
      'Thank you. Let us move on to our next area of discussion.',
      'Understood. Let us proceed to the next question in the evaluation.'
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }
  return 'Okay, got it. Let\'s move on.';
};

export default {
  generateQuestions,
  generateAdaptiveFollowUpQuestion,
  generateInterviewerReaction,
  evaluateAnswer,
  retrieveCuratedQuestions,
  generateCategoryFallbackQuestions,
  validateQuestionSubject
};
