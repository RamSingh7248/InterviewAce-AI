import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  Code2, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Loader2, 
  ChevronRight, 
  Award, 
  Sparkles, 
  Lightbulb,
  Maximize2,
  HelpCircle,
  FileCode,
  Zap,
  ArrowRight
} from 'lucide-react';
import Button from '../ui/Button';
import api from '../../services/api';
import { runInWebWorker } from '../../utils/webWorkerRunner';

const STARTER_TEMPLATES = {
  java: `public class Main {
    public static void main(String[] args) {
        // Implement your solution below
        System.out.println("Solution initialized");
    }
}`,
  python: `def solution():
    # Implement your solution below
    print("Solution initialized")

if __name__ == "__main__":
    solution()
`,
  javascript: `function solution() {
    // Implement your solution below
    console.log("Solution initialized");
}

solution();
`,
  typescript: `function solution(): void {
    // Implement your solution below
    console.log("Solution initialized");
}

solution();
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Implement your solution below
    cout << "Solution initialized" << endl;
    return 0;
}
`,
  c: `#include <stdio.h>

int main() {
    // Implement your solution below
    printf("Solution initialized\\n");
    return 0;
}
`,
  go: `package main

import "fmt"

func main() {
    // Implement your solution below
    fmt.Println("Solution initialized")
}
`,
  rust: `fn main() {
    // Implement your solution below
    println!("Solution initialized");
}
`
};

const SUPPORTED_LANGUAGES = [
  { id: 'java', label: 'Java (OpenJDK 21)', monaco: 'java' },
  { id: 'python', label: 'Python (3.10)', monaco: 'python' },
  { id: 'javascript', label: 'JavaScript (Node.js)', monaco: 'javascript' },
  { id: 'typescript', label: 'TypeScript', monaco: 'typescript' },
  { id: 'cpp', label: 'C++ (GCC)', monaco: 'cpp' },
  { id: 'c', label: 'C (GCC)', monaco: 'c' },
  { id: 'go', label: 'Go (Golang)', monaco: 'go' },
  { id: 'rust', label: 'Rust', monaco: 'rust' }
];

export default function LiveCodingStudio({
  interview,
  currentQ,
  currentQuestionIndex,
  totalQuestions,
  evaluation,
  onEvaluationReceived,
  onProceed,
  advancing,
  serverClockOffset = 0,
  nowTs = Date.now(),
  user
}) {
  // Determine initial language based on interview category
  const getInitialLang = () => {
    const cat = (interview?.category || '').toLowerCase();
    if (cat.includes('python')) return 'python';
    if (cat.includes('javascript') || cat.includes('react') || cat.includes('node')) return 'javascript';
    if (cat.includes('typescript')) return 'typescript';
    if (cat.includes('c++')) return 'cpp';
    if (cat === 'c') return 'c';
    if (cat.includes('go')) return 'go';
    if (cat.includes('rust')) return 'rust';
    return 'java';
  };

  const [selectedLang, setSelectedLang] = useState(getInitialLang());
  const [code, setCode] = useState(currentQ?.userAnswer || STARTER_TEMPLATES[getInitialLang()]);
  const [stdin, setStdin] = useState('');
  const [activeConsoleTab, setActiveConsoleTab] = useState('output'); // 'output' | 'input'
  const [executing, setExecuting] = useState(false);
  const [submittingSolution, setSubmittingSolution] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showReference, setShowReference] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sync state when active question changes
  useEffect(() => {
    if (currentQ?.userAnswer) {
      setCode(currentQ.userAnswer);
    } else {
      setCode(STARTER_TEMPLATES[selectedLang] || STARTER_TEMPLATES.java);
    }
    setExecutionResult(null);
    setErrorMsg('');
    setShowReference(false);
    setShowHint(false);
  }, [currentQ?._id, currentQ?.questionId]);

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang);
    // Only reset code if untouched or empty
    const currentStarter = STARTER_TEMPLATES[selectedLang];
    if (!code.trim() || code.trim() === currentStarter?.trim()) {
      setCode(STARTER_TEMPLATES[newLang] || '');
    }
  };

  // Reset to starter template
  const handleResetCode = () => {
    if (window.confirm('Reset code editor to the starter template? Your current edits will be cleared.')) {
      setCode(STARTER_TEMPLATES[selectedLang] || '');
      setExecutionResult(null);
    }
  };

  const [hintsRevealedCount, setHintsRevealedCount] = useState(currentQ?.codingDetails?.hintsRevealed || 0);

  // Run Code: uses sandboxed Web Worker for JavaScript, or remote runner for others
  const handleRunCode = async () => {
    if (executing || submittingSolution) return;
    setErrorMsg('');
    setExecuting(true);
    setActiveConsoleTab('output');

    try {
      if (selectedLang === 'javascript') {
        const sampleIn = stdin || (currentQ?.codingDetails?.sampleTestCases?.[0]?.input || '');
        const res = await runInWebWorker({ code, stdin: sampleIn, timeoutMs: 3000 });
        setExecutionResult(res);
      } else {
        const response = await api.post(`/interviews/${interview._id}/code/execute`, {
          code,
          language: selectedLang,
          stdin
        });

        if (response.data && response.data.status === 'success' && response.data.execution) {
          setExecutionResult(response.data.execution);
        } else {
          setErrorMsg('Code execution completed without valid output.');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Execution request failed.';
      setErrorMsg(msg);
      setExecutionResult({
        status: 'error',
        stdout: '',
        stderr: msg,
        exitCode: 1,
        durationMs: 0
      });
    } finally {
      setExecuting(false);
    }
  };

  // Reveal next hint with 5% score deduction
  const handleRevealNextHint = async () => {
    try {
      const res = await api.post(`/interviews/${interview._id}/code/hint`);
      if (res.data?.status === 'success') {
        setHintsRevealedCount(res.data.hintsRevealed);
        setShowHint(true);
      }
    } catch (err) {
      setShowHint(true);
      setHintsRevealedCount(prev => prev + 1);
    }
  };

  // Submit Solution via POST /api/interviews/:id/code/submit
  const handleSubmitSolution = async () => {
    if (executing || submittingSolution) return;
    if (!code.trim()) {
      setErrorMsg('Please write your solution code before submitting.');
      return;
    }

    setErrorMsg('');
    setSubmittingSolution(true);

    try {
      const response = await api.post(`/interviews/${interview._id}/code/submit`, {
        code,
        language: selectedLang,
        questionId: currentQ?.questionId,
        hintsUsed: hintsRevealedCount
      });

      if (response.data && response.data.status === 'success') {
        if (response.data.execution) {
          setExecutionResult(response.data.execution);
        }
        if (onEvaluationReceived) {
          onEvaluationReceived(response.data.evaluation, response.data.interview);
        }
      } else {
        setErrorMsg('Failed to evaluate solution.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmittingSolution(false);
    }
  };

  // Active question timer
  const qStartTime = currentQ?.startedAt || interview?.currentQuestionStartedAt || interview?.startedAt;
  const elapsedSeconds = qStartTime
    ? Math.max(0, Math.floor((nowTs + serverClockOffset - new Date(qStartTime).getTime()) / 1000))
    : 0;

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isEvaluated = Boolean(evaluation && typeof evaluation.score === 'number');
  const isLastQuestion = (currentQuestionIndex + 1) >= totalQuestions;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 40px)',
      minHeight: '700px',
      backgroundColor: 'var(--bg-page, #0b0f19)',
      color: 'var(--text-primary, #f1f5f9)',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    }}>
      {/* 1. Header Navigation Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-surface, #111827)',
        borderBottom: '1px solid var(--border-subtle, #1e293b)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#818cf8',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 600
          }}>
            <Code2 size={16} />
            <span>Live Coding Round</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              backgroundColor: 'var(--bg-card-subtle, #1e293b)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-secondary, #94a3b8)'
            }}>
              {interview?.category || 'Technical'}
            </span>
            <span style={{
              backgroundColor: interview?.difficulty === 'Hard' ? 'rgba(239, 68, 68, 0.15)' : interview?.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
              color: interview?.difficulty === 'Hard' ? '#f87171' : interview?.difficulty === 'Medium' ? '#facc15' : '#4ade80',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600
            }}>
              {interview?.difficulty || 'Medium'}
            </span>
            {interview?.targetRole && (
              <span style={{
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                color: '#fb923c',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600
              }}>
                {interview.targetRole}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Question Counter */}
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary, #94a3b8)' }}>
            Problem <span style={{ color: 'var(--text-primary, #fff)' }}>{currentQuestionIndex + 1}</span> of <span style={{ color: 'var(--text-primary, #fff)' }}>{totalQuestions}</span>
          </div>

          {/* Session Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-card-subtle, #1e293b)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-primary, #f1f5f9)',
            border: '1px solid var(--border-subtle, #334155)'
          }}>
            <Clock size={15} color="#38bdf8" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Proceed Button if Evaluated */}
          {isEvaluated && (
            <button
              type="button"
              onClick={onProceed}
              disabled={advancing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--primary, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 16px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: advancing ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              {advancing ? <Loader2 size={16} className="animate-spin" /> : isLastQuestion ? <Award size={16} /> : <ArrowRight size={16} />}
              {isLastQuestion ? 'View Results' : 'Next Problem'}
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Split Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 42%) 1fr',
        flex: 1,
        overflow: 'hidden'
      }}>
        
        {/* LEFT COLUMN: Problem Description & Evaluation */}
        <div style={{
          borderRight: '1px solid var(--border-subtle, #1e293b)',
          backgroundColor: 'var(--bg-surface, #111827)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px'
        }}>
          {/* Problem Statement Header */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              margin: '0 0 12px 0',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary, #f1f5f9)',
              lineHeight: 1.4
            }}>
              {currentQ?.questionText || 'Loading coding problem...'}
            </h2>

            {currentQ?.topic && (
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: '#38bdf8',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '14px'
              }}>
                Topic: {currentQ.topic}
              </div>
            )}
          </div>

          {/* Constraints & Examples */}
          {currentQ?.codingDetails && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {/* Constraints */}
              {Array.isArray(currentQ.codingDetails.constraints) && currentQ.codingDetails.constraints.length > 0 && (
                <div style={{
                  backgroundColor: 'var(--bg-card-subtle, #1e293b)',
                  border: '1px solid var(--border-subtle, #334155)',
                  borderRadius: '10px',
                  padding: '14px 16px'
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                    Constraints & Complexity:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)' }}>
                    {currentQ.codingDetails.constraints.map((c, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}><code>{c}</code></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples */}
              {Array.isArray(currentQ.codingDetails.examples) && currentQ.codingDetails.examples.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                    Example Test Cases:
                  </div>
                  {currentQ.codingDetails.examples.map((ex, i) => (
                    <div key={i} style={{
                      backgroundColor: 'var(--bg-card-subtle, #1e293b)',
                      border: '1px solid var(--border-subtle, #334155)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      marginBottom: '10px',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '4px' }}>
                        <strong style={{ color: '#38bdf8' }}>Input:</strong> <code>{ex.input}</code>
                      </div>
                      <div style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '4px' }}>
                        <strong style={{ color: '#4ade80' }}>Output:</strong> <code>{ex.output}</code>
                      </div>
                      {ex.explanation && (
                        <div style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.78rem' }}>
                          <em>Explanation:</em> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hint Accordion */}
          {Array.isArray(currentQ?.hints) && currentQ.hints.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleRevealNextHint}
                  disabled={hintsRevealedCount >= currentQ.hints.length}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(251, 191, 36, 0.08)',
                    border: '1px dashed #fbbf24',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: '#fbbf24',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: hintsRevealedCount >= currentQ.hints.length ? 'default' : 'pointer',
                    flex: 1
                  }}
                >
                  <Lightbulb size={15} />
                  <span>
                    {hintsRevealedCount >= currentQ.hints.length
                      ? `All ${currentQ.hints.length} hints revealed`
                      : `Get Hint (${hintsRevealedCount}/${currentQ.hints.length} revealed)`}
                  </span>
                </button>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', whiteSpace: 'nowrap' }}>
                  (-5% score per hint)
                </span>
              </div>
              {showHint && hintsRevealedCount > 0 && (
                <div style={{
                  marginTop: '8px',
                  padding: '12px 14px',
                  backgroundColor: 'rgba(251, 191, 36, 0.08)',
                  border: '1px solid rgba(251, 191, 36, 0.25)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color: '#fde68a',
                  lineHeight: 1.5
                }}>
                  {currentQ.hints.slice(0, hintsRevealedCount).map((h, i) => (
                    <div key={i} style={{ marginBottom: i < hintsRevealedCount - 1 ? '6px' : 0 }}>
                      <strong>Hint {i + 1}:</strong> {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EVALUATION SECTION (Displays when submitted) */}
          {isEvaluated && (
            <div style={{
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle, #1e293b)'
            }}>
              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#60a5fa" />
                    <div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', display: 'block' }}>
                        Code Assessment
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {evaluation.evaluatorLabel || 'AI Evaluation'}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: (evaluation.score100 || (evaluation.score * 10)) >= 70 ? '#4ade80' : (evaluation.score100 || (evaluation.score * 10)) >= 50 ? '#facc15' : '#f87171'
                    }}>
                      {evaluation.score100 !== undefined ? `${evaluation.score100}%` : `${evaluation.score}/10`}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      60% tests + 40% review {evaluation.hintPenalty ? `(-${evaluation.hintPenalty}% hints)` : ''}
                    </div>
                  </div>
                </div>

                {/* Tests Passed Metric Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  marginBottom: '12px',
                  fontSize: '0.76rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80' }}>
                    <CheckCircle2 size={14} />
                    <span><strong>{evaluation.testsPassed ?? 0} / {evaluation.totalTests ?? 0}</strong> Test Cases Passed</span>
                  </div>
                  {evaluation.runtimeMs !== undefined && (
                    <span style={{ color: '#94a3b8' }}>{evaluation.runtimeMs} ms</span>
                  )}
                </div>

                {evaluation.feedback && (
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--text-secondary, #cbd5e1)', lineHeight: 1.5 }}>
                    {evaluation.feedback}
                  </p>
                )}

                {/* Algorithmic Complexity Pills */}
                {evaluation.codeReview && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
                    <div style={{ backgroundColor: 'var(--bg-surface, #0f172a)', padding: '8px 10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted, #94a3b8)', display: 'block' }}>Time Complexity</span>
                      <strong style={{ color: '#38bdf8' }}>{evaluation.codeReview.timeComplexity || 'O(n)'}</strong>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-surface, #0f172a)', padding: '8px 10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted, #94a3b8)', display: 'block' }}>Space Complexity</span>
                      <strong style={{ color: '#a855f7' }}>{evaluation.codeReview.spaceComplexity || 'O(1)'}</strong>
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {Array.isArray(evaluation.strengths) && evaluation.strengths.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#4ade80', marginBottom: '4px' }}>
                      Key Strengths:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.76rem', color: '#86efac' }}>
                      {evaluation.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                )}

                {/* Improvements & Better Approach */}
                {Array.isArray(evaluation.improvements) && evaluation.improvements.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#fbbf24', marginBottom: '4px' }}>
                      Areas for Improvement:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.76rem', color: '#fde68a' }}>
                      {evaluation.improvements.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                )}

                {evaluation.betterAnswer && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 10px',
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    color: '#bae6fd'
                  }}>
                    <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '2px' }}>Optimal Approach:</strong>
                    {evaluation.betterAnswer}
                  </div>
                )}

                {/* Reference Solution Toggle */}
                {evaluation.idealAnswer && (
                  <div style={{ marginTop: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setShowReference(p => !p)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#60a5fa',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                    >
                      {showReference ? 'Hide Reference Solution' : 'View Optimal Reference Solution'}
                    </button>
                    {showReference && (
                      <pre style={{
                        marginTop: '8px',
                        padding: '10px',
                        backgroundColor: '#090d16',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        color: '#93c5fd',
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {evaluation.idealAnswer}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Proceed to Next Question Button */}
              <button
                type="button"
                onClick={onProceed}
                disabled={advancing}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--primary, #2563eb)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: advancing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
                }}
              >
                {advancing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Loading Next Question...</span>
                  </>
                ) : (
                  <>
                    <span>{isLastQuestion ? 'Complete Interview & View Results' : 'Proceed to Next Problem'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Monaco Editor & Execution Console */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0d1117',
          overflow: 'hidden'
        }}>
          {/* Editor Action Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            backgroundColor: '#161b22',
            borderBottom: '1px solid #30363d',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileCode size={15} color="#8b949e" />
                <span style={{ fontSize: '0.8rem', color: '#8b949e', fontWeight: 600 }}>Language:</span>
              </div>
              <select
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                style={{
                  backgroundColor: '#21262d',
                  color: '#f0f6fc',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={handleResetCode}
                title="Reset code to starter template"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: '#21262d',
                  border: '1px solid #30363d',
                  color: '#c9d1d9',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div style={{ flex: '1 1 55%', minHeight: '260px', position: 'relative' }}>
            <Editor
              height="100%"
              language={SUPPORTED_LANGUAGES.find(l => l.id === selectedLang)?.monaco || 'java'}
              theme="vs-dark"
              value={code}
              onChange={(newVal) => setCode(newVal || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'on',
                renderLineHighlight: 'all',
                suggestOnTriggerCharacters: true
              }}
            />
          </div>

          {/* Bottom Execution & Console Drawer */}
          <div style={{
            flex: '1 1 45%',
            minHeight: '200px',
            maxHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0d14',
            borderTop: '1px solid #30363d'
          }}>
            {/* Drawer Tabs & Action Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px',
              backgroundColor: '#161b22',
              borderBottom: '1px solid #21262d',
              flexShrink: 0
            }}>
              {/* Tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('output')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeConsoleTab === 'output' ? '#238636' : 'transparent',
                    color: activeConsoleTab === 'output' ? '#fff' : '#8b949e'
                  }}
                >
                  <Terminal size={14} />
                  <span>Execution Output</span>
                  {executionResult && (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: executionResult.exitCode === 0 ? '#3fb950' : '#f85149'
                    }} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('input')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeConsoleTab === 'input' ? '#388bfd' : 'transparent',
                    color: activeConsoleTab === 'input' ? '#fff' : '#8b949e'
                  }}
                >
                  <span>Custom Stdin</span>
                </button>
              </div>

              {/* Action Buttons: Run Code & Submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={executing || submittingSolution}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#238636',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: executing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 6px rgba(35, 134, 54, 0.4)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {executing ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="#fff" />}
                  <span>{executing ? 'Executing...' : 'Run Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitSolution}
                  disabled={executing || submittingSolution || isEvaluated}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: isEvaluated ? '#30363d' : 'var(--primary, #2563eb)',
                    color: isEvaluated ? '#8b949e' : '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: isEvaluated ? 'default' : (submittingSolution ? 'not-allowed' : 'pointer'),
                    boxShadow: isEvaluated ? 'none' : '0 2px 8px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {submittingSolution ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  <span>{isEvaluated ? 'Submitted & Evaluated' : submittingSolution ? 'Evaluating...' : 'Submit Solution'}</span>
                </button>
              </div>
            </div>

            {/* Console Content Area */}
            <div style={{
              flex: 1,
              padding: '12px 16px',
              overflowY: 'auto',
              fontFamily: 'Consolas, "Fira Code", monospace',
              fontSize: '0.82rem',
              color: '#c9d1d9'
            }}>
              {errorMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(248, 81, 73, 0.15)',
                  border: '1px solid #f85149',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#ff7b72',
                  marginBottom: '10px'
                }}>
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {activeConsoleTab === 'output' ? (
                <div>
                  {executing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', padding: '16px 0' }}>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Compiling and executing code in sandbox environment...</span>
                    </div>
                  ) : executionResult ? (
                    <div>
                      {/* Status header banner */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        paddingBottom: '6px',
                        borderBottom: '1px solid #21262d'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {executionResult.exitCode === 0 ? (
                            <span style={{ color: '#3fb950', fontWeight: 600 }}>✓ Process finished with exit code 0</span>
                          ) : (
                            <span style={{ color: '#f85149', fontWeight: 600 }}>✕ Process finished with exit code {executionResult.exitCode}</span>
                          )}
                          <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>
                            ({executionResult.status})
                          </span>
                        </div>
                        <span style={{ color: '#8b949e', fontSize: '0.75rem' }}>
                          Runtime: {executionResult.durationMs}ms
                        </span>
                      </div>

                      {/* stdout output */}
                      {executionResult.stdout && (
                        <div style={{ whiteSpace: 'pre-wrap', color: '#7ee787', marginBottom: '8px' }}>
                          {executionResult.stdout}
                        </div>
                      )}

                      {/* stderr output */}
                      {executionResult.stderr && (
                        <div style={{ whiteSpace: 'pre-wrap', color: '#ff7b72' }}>
                          {executionResult.stderr}
                        </div>
                      )}

                      {!executionResult.stdout && !executionResult.stderr && (
                        <div style={{ color: '#8b949e', fontStyle: 'italic' }}>
                          (Program completed with no output printed to console)
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ color: '#8b949e', fontStyle: 'italic', padding: '16px 0' }}>
                      Click "Run Code" to compile and execute your program, or "Submit Solution" to receive an in-depth AI algorithmic assessment.
                    </div>
                  )}
                </div>
              ) : (
                /* Custom Stdin Tab */
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '0.78rem', color: '#8b949e', marginBottom: '6px', display: 'block' }}>
                    Standard Input (stdin) to pass to program:
                  </label>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter custom inputs (e.g. 5\n1 2 3 4 5)..."
                    style={{
                      flex: 1,
                      minHeight: '80px',
                      backgroundColor: '#161b22',
                      border: '1px solid #30363d',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      color: '#f0f6fc',
                      fontSize: '0.8rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
