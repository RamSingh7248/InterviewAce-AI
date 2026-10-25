/**
 * evaluationQueue.js
 * Asynchronous evaluation queue with concurrency control, exponential backoff retries,
 * rate-limit handling, and MongoDB session persistence.
 */

import Interview from '../models/Interview.js';
import { evaluateAnswer } from './ai.service.js';

class EvaluationQueue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
    this.runningCount = 0;
    this.queue = [];
    this.activeSessionTasks = new Map(); // interviewId -> Set of pending task IDs
  }

  /**
   * Enqueue a question evaluation task
   */
  enqueue({ interviewId, questionIndex, questionId, evalArgs }) {
    const taskId = `${interviewId}_q${questionIndex}_${Date.now()}`;
    const task = {
      taskId,
      interviewId,
      questionIndex,
      questionId,
      evalArgs,
      retries: 0,
      maxRetries: 2,
      enqueuedAt: Date.now()
    };

    if (!this.activeSessionTasks.has(interviewId.toString())) {
      this.activeSessionTasks.set(interviewId.toString(), new Set());
    }
    this.activeSessionTasks.get(interviewId.toString()).add(taskId);

    this.queue.push(task);
    this.processNext();
    return taskId;
  }

  /**
   * Check if a specific interview session has pending background evaluations
   */
  hasPending(interviewId) {
    const set = this.activeSessionTasks.get(interviewId.toString());
    return Boolean(set && set.size > 0);
  }

  /**
   * Get pending count for an interview session
   */
  getPendingCount(interviewId) {
    const set = this.activeSessionTasks.get(interviewId.toString());
    return set ? set.size : 0;
  }

  /**
   * Worker loop
   */
  async processNext() {
    if (this.runningCount >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const task = this.queue.shift();
    this.runningCount++;

    try {
      await this.executeTask(task);
    } catch (err) {
      console.warn(`[EvaluationQueue] Task ${task.taskId} error:`, err.message);
      if (task.retries < task.maxRetries) {
        task.retries++;
        const backoffMs = Math.pow(2, task.retries) * 1000;
        console.log(`[EvaluationQueue] Retrying task ${task.taskId} (attempt ${task.retries}/${task.maxRetries}) in ${backoffMs}ms...`);
        setTimeout(() => {
          this.queue.push(task);
          this.processNext();
        }, backoffMs);
      } else {
        console.warn(`[EvaluationQueue] Task ${task.taskId} exceeded max retries. Keeping heuristic evaluation.`);
        this.cleanupTask(task);
      }
    } finally {
      this.runningCount--;
      this.processNext();
    }
  }

  cleanupTask(task) {
    const idStr = task.interviewId.toString();
    const set = this.activeSessionTasks.get(idStr);
    if (set) {
      set.delete(task.taskId);
      if (set.size === 0) {
        this.activeSessionTasks.delete(idStr);
        // Mark session as not evaluating in DB
        Interview.findByIdAndUpdate(task.interviewId, {
          isEvaluating: false,
          sessionState: 'awaiting_answer'
        }).catch(() => {});
      }
    }
  }

  /**
   * Execute evaluation with Gemini and update MongoDB document
   */
  async executeTask(task) {
    const { interviewId, questionIndex, evalArgs } = task;

    // Call full AI evaluation
    const aiEvaluation = await evaluateAnswer(evalArgs, { forceAI: true });

    if (!aiEvaluation) {
      this.cleanupTask(task);
      return;
    }

    // Persist to MongoDB
    const interview = await Interview.findById(interviewId);
    if (!interview || !interview.questions || !interview.questions[questionIndex]) {
      this.cleanupTask(task);
      return;
    }

    const q = interview.questions[questionIndex];

    // Merge AI evaluation into question while keeping existing timestamps
    q.evaluation = {
      ...(q.evaluation ? (q.evaluation.toObject ? q.evaluation.toObject() : q.evaluation) : {}),
      ...aiEvaluation,
      overallScore: aiEvaluation.overallScore ?? aiEvaluation.score ?? 5,
      score: aiEvaluation.score ?? 5,
      score100: aiEvaluation.score100 ?? Math.round((aiEvaluation.score ?? 5) * 10),
      scores: aiEvaluation.scores || {
        technicalAccuracy: aiEvaluation.score ?? 5,
        completeness: aiEvaluation.score ?? 5,
        depth: aiEvaluation.score ?? 5,
        clarity: aiEvaluation.score ?? 5,
        communication: aiEvaluation.score ?? 5
      },
      keyPointsCovered: aiEvaluation.keyPointsCovered || [],
      keyPointsMissed: aiEvaluation.keyPointsMissed || [],
      mistakes: aiEvaluation.mistakes || aiEvaluation.incorrectStatements || [],
      strengths: aiEvaluation.strengths || [],
      improvements: aiEvaluation.improvements || aiEvaluation.suggestions || [],
      betterAnswer: aiEvaluation.betterAnswer || aiEvaluation.idealAnswer || '',
      confidence: aiEvaluation.confidence || 0.9,
      evaluatorLabel: aiEvaluation.evaluatorLabel || (aiEvaluation.isFallback ? 'Basic evaluation (AI unavailable)' : 'AI Evaluation'),
      isFallback: Boolean(aiEvaluation.isFallback),
      evaluationStatus: 'evaluated'
    };

    // Update session conversation history entry if present
    if (Array.isArray(interview.conversationHistory)) {
      const histItem = interview.conversationHistory.find(h => h.questionId === q.questionId);
      if (histItem) {
        histItem.verdict = aiEvaluation.verdict || histItem.verdict;
        histItem.score = aiEvaluation.score ?? histItem.score;
      }
    }

    // Recalculate session final score & aggregate dimension scores
    const evaluatedQuestions = interview.questions.filter(
      item => item.evaluation && typeof item.evaluation.score === 'number'
    );

    if (evaluatedQuestions.length > 0) {
      const sumScore100 = evaluatedQuestions.reduce((acc, item) => {
        const s = item.evaluation.score100 !== undefined ? item.evaluation.score100 : Math.round(item.evaluation.score * 10);
        return acc + s;
      }, 0);
      interview.finalScore = Math.round(sumScore100 / interview.totalQuestions);

      // Compute aggregate dimension scores
      const avgDim = (key) => {
        const vals = evaluatedQuestions.map(item => item.evaluation?.scores?.[key]).filter(v => typeof v === 'number');
        if (vals.length === 0) return 0;
        return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
      };

      interview.dimensionScores = {
        technicalAccuracy: avgDim('technicalAccuracy'),
        completeness: avgDim('completeness'),
        depth: avgDim('depth'),
        clarity: avgDim('clarity'),
        communication: avgDim('communication')
      };

      // Aggregate top strengths & weaknesses
      const allStrengths = [];
      const allWeaknesses = [];
      evaluatedQuestions.forEach(item => {
        if (Array.isArray(item.evaluation.strengths)) allStrengths.push(...item.evaluation.strengths);
        if (Array.isArray(item.evaluation.improvements)) allWeaknesses.push(...item.evaluation.improvements);
        if (Array.isArray(item.evaluation.keyPointsMissed)) allWeaknesses.push(...item.evaluation.keyPointsMissed);
      });
      interview.topStrengths = Array.from(new Set(allStrengths)).slice(0, 5);
      interview.topWeaknesses = Array.from(new Set(allWeaknesses)).slice(0, 5);
    }

    this.cleanupTask(task);
    interview.isEvaluating = this.hasPending(interviewId);
    interview.markModified('questions');
    interview.markModified('dimensionScores');
    await interview.save();

    console.log(`[EvaluationQueue] Refined AI evaluation completed for interview ${interviewId} Q${questionIndex + 1} (${q.evaluation.evaluatorLabel}).`);
  }
}

export const evaluationQueue = new EvaluationQueue(2);
