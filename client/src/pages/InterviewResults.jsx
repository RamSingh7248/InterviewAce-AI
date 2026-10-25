import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Home, 
  Loader2, 
  HelpCircle,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Brain,
  BarChart2,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  BookOpen,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/auth.css';

const MODE_LABELS = {
  mixed: 'Mixed Technical',
  conceptual: 'Conceptual Deep-Dive',
  coding: 'Coding Round',
  sql: 'SQL & Database',
  debugging: 'Debugging Round',
  system_design: 'System Design (LLD & HLD)',
  scenario: 'Scenario-Based',
  role_specific: 'Role-Specific Deep Dive'
};

const LEVEL_LABELS = {
  internship: 'Internship / Campus',
  fresher: 'Fresher (0–1 yrs)',
  junior: 'Junior (1–3 yrs)',
  mid: 'Mid-Level (3–5 yrs)',
  senior: 'Senior / Staff (5+ yrs)'
};

const LEARNING_STAGE_COLORS = {
  'Core Concepts': { bg: 'rgba(56,189,248,0.12)', text: '#0284c7', border: 'rgba(56,189,248,0.25)' },
  'Practical Mechanics': { bg: 'rgba(168,85,247,0.12)', text: '#9333ea', border: 'rgba(168,85,247,0.25)' },
  'Architecture & Scale': { bg: 'rgba(234,179,8,0.12)', text: '#b45309', border: 'rgba(234,179,8,0.25)' }
};

// Circular progress SVG for overall score
const CircularScore = ({ percent, size = 180 }) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;
  const color = percent >= 75 ? '#22c55e' : percent >= 50 ? '#eab308' : '#ef4444';
  const gradientId = `scoreGrad-${percent}`;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-subtle, #1e293b)" strokeWidth="14" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="14"
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="2.4rem" fontWeight="800"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: 'inherit' }}>
        {percent}%
      </text>
      <text x="50%" y="62%" textAnchor="middle" dominantBaseline="central"
        fill="var(--text-secondary, #64748b)" fontSize="0.65rem"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Overall
      </text>
    </svg>
  );
};

// Horizontal score bar for individual questions
const ScoreBar = ({ score, maxScore = 10 }) => {
  const pct = (score / maxScore) * 100;
  const color = score >= 7 ? '#22c55e' : score >= 5 ? '#eab308' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '7px', backgroundColor: 'var(--border-subtle, #1e293b)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.8s ease' }} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: 700, color, minWidth: '36px', textAlign: 'right' }}>
        {score}/{maxScore}
      </span>
    </div>
  );
};

// Dimensional Score Pill for detailed rubric breakdown
const DimensionPill = ({ label, score, maxScore = 10, feedback }) => {
  const pct = Math.round(((score || 0) / maxScore) * 100);
  const color = (score || 0) >= 7.5 ? '#22c55e' : (score || 0) >= 5 ? '#eab308' : '#ef4444';
  return (
    <div style={{
      backgroundColor: 'var(--bg-card-subtle)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '8px',
      padding: '10px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{score ?? 0}/{maxScore}</span>
      </div>
      <div style={{ height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
      </div>
      {feedback && (
        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
          {feedback}
        </span>
      )}
    </div>
  );
};

const InterviewResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedQSet, setExpandedQSet] = useState(new Set([0])); // set of expanded question indices
  const [addingQuestions, setAddingQuestions] = useState(false);
  const [continuationError, setContinuationError] = useState('');
  const [evalProgress, setEvalProgress] = useState({ isPending: false, evaluatedCount: 0, totalAnswered: 0 });

  const toggleExpand = (idx) => {
    setExpandedQSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleExpandAll = () => {
    if (!interview?.questions) return;
    setExpandedQSet(new Set(interview.questions.map((_, i) => i)));
  };

  const handleCollapseAll = () => {
    setExpandedQSet(new Set());
  };

  useEffect(() => {
    let intervalId = null;

    const fetchResults = async () => {
      try {
        const response = await api.get(`/interviews/${id}`);
        if (response.data && response.data.status === 'success') {
          const doc = response.data.interview;
          setInterview(doc);

          // Check if any answers have pending background AI evaluations
          const hasPending = (doc.questions || []).some(
            q => q.isAnswered && q.evaluation?.evaluationStatus && ['pending', 'evaluating'].includes(q.evaluation.evaluationStatus)
          ) || doc.isEvaluating;

          if (hasPending) {
            setEvalProgress({
              isPending: true,
              evaluatedCount: (doc.questions || []).filter(q => q.evaluation?.evaluationStatus === 'evaluated').length,
              totalAnswered: (doc.questions || []).filter(q => q.isAnswered).length
            });

            // Poll evaluation status every 2.5s until complete
            intervalId = setInterval(async () => {
              try {
                const statusRes = await api.get(`/interviews/${id}/evaluation-status`);
                if (statusRes.data && statusRes.data.status === 'success') {
                  const s = statusRes.data;
                  setEvalProgress({
                    isPending: s.isPending,
                    evaluatedCount: s.evaluatedCount,
                    totalAnswered: s.totalAnswered
                  });

                  if (!s.isPending) {
                    clearInterval(intervalId);
                    // Re-fetch interview with refined evaluations
                    const refreshed = await api.get(`/interviews/${id}`);
                    if (refreshed.data?.interview) {
                      setInterview(refreshed.data.interview);
                    }
                  }
                }
              } catch (e) {
                console.warn('[InterviewResults] Error checking evaluation status:', e.message);
              }
            }, 2500);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load interview results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [id]);

  const handleContinuePractice = async () => {
    setAddingQuestions(true);
    setContinuationError('');
    try {
      const response = await api.post(`/interviews/${id}/more-questions`, { count: 3 });
      if (response.data && response.data.status === 'success') {
        // Navigate candidate right into the active interview room
        navigate(`/interview/${id}`);
      } else {
        setContinuationError(response.data?.message || 'Failed to add more questions.');
      }
    } catch (err) {
      setContinuationError(err.response?.data?.message || 'Failed to add more practice questions.');
    } finally {
      setAddingQuestions(false);
    }
  };

  const handleStartRevision = () => {
    if (!interview) return;
    navigate(`/interview/setup?category=${encodeURIComponent(interview.category)}&isRevision=true`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexDirection: 'column', gap: '16px' }}>
        <Loader2 size={40} className="animate-spin" />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Compiling your assessment report...</p>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', padding: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '40px auto', backgroundColor: 'var(--bg-surface)', padding: '32px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', marginBottom: '16px' }}>
            <AlertCircle size={24} />
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Unable to Load Results</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>{error || 'Interview not found.'}</p>
          <Link to="/dashboard" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>← Return to Dashboard</Link>
        </div>
      </div>
    );
  }

  const finalScore = interview.finalScore || 0;
  const scoreColor = finalScore >= 75 ? '#22c55e' : finalScore >= 50 ? '#eab308' : '#ef4444';
  const scoreRating = finalScore >= 75 ? 'Strong Candidate Performance ✦' : finalScore >= 50 ? 'Competent with Gaps to Refine' : 'Needs Practice & Conceptual Focus';

  // Stats
  const evaluated = interview.questions?.filter(q => q.evaluation && q.evaluation.score !== undefined) || [];
  const avgScore = evaluated.length > 0 ? Math.round((evaluated.reduce((a, q) => a + q.evaluation.score, 0) / evaluated.length) * 10) / 10 : 0;
  const highScores = evaluated.filter(q => q.evaluation.score >= 7).length;
  const lowScores = evaluated.filter(q => q.evaluation.score < 5).length;

  // 5-Dimension Competency Scores (0-10)
  const rawDims = interview.dimensionScores || {};
  const dimTechnicalAccuracy = rawDims.technicalAccuracy ?? (
    evaluated.length > 0
      ? Math.round((evaluated.reduce((acc, q) => acc + (q.evaluation?.scores?.technicalAccuracy ?? q.evaluation?.dimensions?.technicalCorrectness?.score ?? q.evaluation?.score ?? 5), 0) / evaluated.length) * 10) / 10
      : 0
  );
  const dimCompleteness = rawDims.completeness ?? (
    evaluated.length > 0
      ? Math.round((evaluated.reduce((acc, q) => acc + (q.evaluation?.scores?.completeness ?? q.evaluation?.dimensions?.completeness?.score ?? q.evaluation?.score ?? 5), 0) / evaluated.length) * 10) / 10
      : 0
  );
  const dimDepth = rawDims.depth ?? (
    evaluated.length > 0
      ? Math.round((evaluated.reduce((acc, q) => acc + (q.evaluation?.scores?.depth ?? q.evaluation?.dimensions?.conceptualUnderstanding?.score ?? q.evaluation?.score ?? 5), 0) / evaluated.length) * 10) / 10
      : 0
  );
  const dimClarity = rawDims.clarity ?? (
    evaluated.length > 0
      ? Math.round((evaluated.reduce((acc, q) => acc + (q.evaluation?.scores?.clarity ?? q.evaluation?.dimensions?.explanationClarity?.score ?? q.evaluation?.score ?? 5), 0) / evaluated.length) * 10) / 10
      : 0
  );
  const dimCommunication = rawDims.communication ?? (
    evaluated.length > 0
      ? Math.round((evaluated.reduce((acc, q) => acc + (q.evaluation?.scores?.communication ?? q.evaluation?.dimensions?.relevance?.score ?? q.evaluation?.score ?? 5), 0) / evaluated.length) * 10) / 10
      : 0
  );

  const dimensionList = [
    { name: 'Technical Accuracy', score: dimTechnicalAccuracy, desc: 'Factual correctness, algorithms, API contracts & runtime models', color: '#38bdf8' },
    { name: 'Completeness', score: dimCompleteness, desc: 'Rubric coverage, boundary conditions & missed edge cases', color: '#a855f7' },
    { name: 'Depth', score: dimDepth, desc: 'Internal mechanics, memory trade-offs & scale implications', color: '#22c55e' },
    { name: 'Clarity', score: dimClarity, desc: 'Concise, structured delivery without ambiguity or hesitation', color: '#eab308' },
    { name: 'Communication', score: dimCommunication, desc: 'Professional vocabulary, rationale articulation & trade-off defense', color: '#f97316' }
  ];

  // Top Strengths & Top Weaknesses
  const sessionStrengths = Array.isArray(interview.topStrengths) && interview.topStrengths.length > 0
    ? interview.topStrengths
    : [...new Set(evaluated.flatMap(q => q.evaluation?.strengths || []))].slice(0, 4);

  const sessionWeaknesses = Array.isArray(interview.topWeaknesses) && interview.topWeaknesses.length > 0
    ? interview.topWeaknesses
    : [...new Set(evaluated.flatMap(q => [...(q.evaluation?.improvements || q.evaluation?.suggestions || []), ...(q.evaluation?.keyPointsMissed || [])]))].slice(0, 4);

  // Weak topics for revision recommendation
  const weakTopics = [...new Set(
    evaluated.filter(q => q.evaluation.score < 6 && q.topic).map(q => q.topic)
  )].slice(0, 4);

  // Duration: if completedAt and createdAt available
  const sessionDuration = interview.completedAt && interview.createdAt
    ? Math.round((new Date(interview.completedAt) - new Date(interview.createdAt)) / 60000)
    : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', paddingBottom: '80px', transition: 'all var(--transition-fast)' }}>

      {/* Header */}
      <header style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, transition: 'all var(--transition-fast)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Assessment Report</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="primary"
            onClick={handleContinuePractice}
            disabled={addingQuestions}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '7px 14px', fontWeight: 700 }}
          >
            {addingQuestions ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
            Continue Practice (+3)
          </Button>
          <Button variant="outline" onClick={() => navigate('/skills')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '7px 12px' }}>
            <Target size={14} style={{ color: 'var(--primary-text)' }} /> Skill Gaps
          </Button>
          <Button variant="secondary" onClick={() => navigate('/interview/setup')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '7px 14px' }}>
            <RotateCcw size={14} /> New Mock
          </Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '7px 14px' }}>
            <Home size={14} /> Dashboard
          </Button>
        </div>
      </header>

      <div style={{ maxWidth: '980px', margin: '32px auto 0 auto', padding: '0 20px' }}>

        {/* Continuation Feedback Banner */}
        {continuationError && (
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={16} />
            <span>{continuationError}</span>
          </div>
        )}

        {/* Async AI Evaluation In-Progress Banner */}
        {evalProgress.isPending && (
          <div style={{
            backgroundColor: 'rgba(56,189,248,0.1)',
            border: '1px solid rgba(56,189,248,0.35)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Loader2 size={20} className="animate-spin" color="var(--primary-color)" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  Refining Detailed AI Assessment...
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Evaluation queue in progress: {evalProgress.evaluatedCount} of {evalProgress.totalAnswered || interview.questions?.length || 0} questions fully analyzed. Page auto-refreshes.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                {Math.round(((evalProgress.evaluatedCount || 0) / Math.max(1, evalProgress.totalAnswered || 1)) * 100)}%
              </span>
              <div style={{ width: '120px', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.round(((evalProgress.evaluatedCount || 0) / Math.max(1, evalProgress.totalAnswered || 1)) * 100)}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Hero Score Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: `1px solid ${scoreColor}33`,
          borderRadius: '18px',
          padding: '36px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '28px',
          background: `linear-gradient(135deg, var(--bg-surface) 0%, ${scoreColor}10 100%)`,
          boxShadow: `0 4px 24px ${scoreColor}15`
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px' }}>
              <Award size={15} /> Official Mock Session Report
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 10px 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {interview.category} Technical Assessment
            </h1>

            {/* Session Meta Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              {interview.difficulty && (
                <span style={{ fontSize: '0.78rem', backgroundColor: interview.difficulty === 'Hard' ? 'rgba(239,68,68,0.15)' : interview.difficulty === 'Medium' ? 'rgba(168,85,247,0.15)' : 'rgba(34,197,94,0.15)', color: interview.difficulty === 'Hard' ? '#ef4444' : interview.difficulty === 'Medium' ? '#a855f7' : '#16a34a', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>
                  {interview.difficulty}
                </span>
              )}
              {interview.targetRole && (
                <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(234,179,8,0.12)', color: '#ca8a04', padding: '3px 10px', borderRadius: '20px', fontWeight: 500 }}>
                  🎯 {interview.targetRole}
                </span>
              )}
              {interview.interviewMode && (
                <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(168,85,247,0.12)', color: '#9333ea', padding: '3px 10px', borderRadius: '20px' }}>
                  <Zap size={11} style={{ display: 'inline', marginRight: '3px' }} />{MODE_LABELS[interview.interviewMode] || interview.interviewMode}
                </span>
              )}
              {interview.experienceLevel && (
                <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(249,115,22,0.12)', color: '#ea580c', padding: '3px 10px', borderRadius: '20px' }}>
                  <Target size={11} style={{ display: 'inline', marginRight: '3px' }} />{LEVEL_LABELS[interview.experienceLevel] || interview.experienceLevel}
                </span>
              )}
              {interview.companyStyle && (
                <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(56,189,248,0.12)', color: 'var(--primary-color)', padding: '3px 10px', borderRadius: '20px' }}>
                  <Shield size={11} style={{ display: 'inline', marginRight: '3px' }} />{interview.companyStyle}
                </span>
              )}
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 700, color: scoreColor, marginBottom: '6px' }}>{scoreRating}</div>

            {sessionDuration && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Clock size={13} /> Session Duration: ~{sessionDuration} min
              </div>
            )}

            {/* Quick Continuation Action Button inside Hero */}
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="primary"
                onClick={handleContinuePractice}
                disabled={addingQuestions}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  padding: '9px 18px',
                  fontWeight: 700,
                  boxShadow: '0 2px 10px rgba(56,189,248,0.25)'
                }}
              >
                {addingQuestions ? <Loader2 size={15} className="animate-spin" /> : <PlusCircle size={15} />}
                Add More Practice Questions to this Session
              </Button>
            </div>
          </div>

          {/* Circular Score Badge */}
          <CircularScore percent={finalScore} size={180} />
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Questions Evaluated', value: evaluated.length + '/' + interview.totalQuestions, icon: <HelpCircle size={18} />, color: '#0ea5e9' },
            { label: 'Average Score', value: avgScore + '/10', icon: <BarChart2 size={18} />, color: '#a855f7' },
            { label: 'Strong Answers', value: highScores, sub: '(score ≥ 7)', icon: <CheckCircle2 size={18} />, color: '#16a34a' },
            { label: 'Needs Focus', value: lowScores, sub: '(score < 5)', icon: <XCircle size={18} />, color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: stat.color }}>{stat.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{stat.label}</div>
              {stat.sub && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* 5-Dimensional Competency Breakdown Chart */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              <BarChart2 size={18} color="var(--primary-color)" /> 5-Dimensional Competency Profile
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Evaluation across technical accuracy, completeness, depth, clarity & communication
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {dimensionList.map((dim, i) => {
              const pct = Math.round((dim.score / 10) * 100);
              return (
                <div key={i} style={{ backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{dim.name}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: dim.color }}>{dim.score} / 10</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: dim.color, borderRadius: '4px', transition: 'width 0.8s ease' }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{dim.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary of Top Strengths & Top Weaknesses */}
        {(sessionStrengths.length > 0 || sessionWeaknesses.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {/* Top Strengths */}
            <div style={{ backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                <CheckCircle2 size={18} /> Top Candidate Strengths
              </div>
              {sessionStrengths.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                  {sessionStrengths.map((str, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{str}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>Complete more questions to surface top strengths.</p>
              )}
            </div>

            {/* Top Weaknesses */}
            <div style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                <AlertTriangle size={18} /> Key Focus Areas & Identified Gaps
              </div>
              {sessionWeaknesses.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                  {sessionWeaknesses.map((w, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{w}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#22c55e', fontWeight: 600 }}>No major technical gaps detected in this session!</p>
              )}
            </div>
          </div>
        )}

        {/* Score Distribution Bar Chart */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
              <BarChart2 size={18} color="#0ea5e9" /> Pedagogical Question Sequence & Scores
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Sequence Order 1 → {interview.questions?.length || 0}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {interview.questions?.map((q, idx) => {
              const score = q.evaluation?.score ?? 0;
              const answered = q.evaluation && q.evaluation.score !== undefined;
              return (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>Seq #{q.sequenceOrder || (idx + 1)}</span>
                    {q.topic ? ` · ${q.topic}` : ''}
                  </div>
                  {answered ? (
                    <ScoreBar score={score} />
                  ) : (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontStyle: 'italic' }}>Pending answer</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Topics & Revision Recommendation */}
        {weakTopics.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: '14px', padding: '22px', marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
              <TrendingUp size={18} /> Recommended Focus & Targeted Revision
            </div>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              You encountered challenging edge cases or partial answers on these topics. Strengthen them before your live interview:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {weakTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(`/interview/setup?category=${encodeURIComponent(interview.category)}&topic=${encodeURIComponent(topic)}`)}
                  title={`Start targeted practice mock on ${topic}`}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(37,99,235,0.12)',
                    color: 'var(--text-primary)',
                    border: '1px solid rgba(37,99,235,0.3)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{topic}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-text)' }}>→</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                onClick={handleStartRevision}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <RotateCcw size={14} /> Start Targeted Revision Session
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/skills')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <Target size={14} /> View Updated Skill Gap Report
              </Button>
            </div>
          </div>
        )}

        {/* Senior Engineer Methodology Note */}
        <div style={{
          backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)',
          borderRadius: '10px', padding: '14px 18px', marginBottom: '28px',
          fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5
        }}>
          💡 <strong>Technical Interviewer Guide:</strong> Below are the complete educational explanations, practical production trade-offs, common anti-patterns, and gold-standard reference answers for each question. Study the underlying mechanics to build lasting intuition.
        </div>

        {/* Detailed Question Breakdown Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={22} color="#0ea5e9" /> Detailed Question Breakdown & Evaluations
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Dimensional assessment, identified gaps, model answers, and practical engineering trade-offs
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleExpandAll}
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--primary-color)',
                backgroundColor: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.25)',
                borderRadius: '6px',
                padding: '5px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '5px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {interview.questions?.map((q, idx) => {
            const evalData = q.evaluation || {};
            const qScore = evalData.score !== undefined ? evalData.score : 0;
            const qScore100 = evalData.score100 !== undefined ? evalData.score100 : Math.round(qScore * 10);
            const isExpanded = expandedQSet.has(idx);
            const isSkipped = evalData.evaluationStatus === 'skipped' || q.userAnswer === '[Skipped]';
            const isEmpty = evalData.evaluationStatus === 'empty' || (!q.userAnswer && !q.isAnswered);
            const isTooShort = evalData.evaluationStatus === 'too_short';
            const scoreClr = isSkipped || isEmpty ? 'var(--text-muted)' : qScore >= 7 ? '#22c55e' : qScore >= 5 ? '#eab308' : '#ef4444';
            const stageStyle = LEARNING_STAGE_COLORS[q.learningStage] || { bg: 'rgba(56,189,248,0.1)', text: '#0284c7', border: 'rgba(56,189,248,0.2)' };

            return (
              <div
                key={q._id || q.questionId || idx}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: `1px solid ${isExpanded ? 'var(--primary-color)' : 'var(--border-subtle)'}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                {/* Question Row Header — always visible, click to expand */}
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {/* Meta Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#fff', backgroundColor: 'var(--primary-color)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        Seq #{q.sequenceOrder || (idx + 1)}
                      </span>
                      {q.learningStage && (
                        <span style={{ fontSize: '0.72rem', backgroundColor: stageStyle.bg, color: stageStyle.text, border: `1px solid ${stageStyle.border}`, padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {q.learningStage}
                        </span>
                      )}
                      {q.interviewRelevanceLabel && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card-subtle)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                          ★ {q.interviewRelevanceLabel}
                        </span>
                      )}
                      {q.questionType && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(56,189,248,0.12)', color: 'var(--primary-color)', padding: '2px 7px', borderRadius: '4px', textTransform: 'capitalize' }}>
                          {q.questionType.replace(/_/g, ' ')}
                        </span>
                      )}
                      {q.timeComplexity && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>
                          Time: {q.timeComplexity}
                        </span>
                      )}
                      {q.spaceComplexity && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(168,85,247,0.12)', color: '#9333ea', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>
                          Space: {q.spaceComplexity}
                        </span>
                      )}
                      {q.isAdaptiveFollowUp && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(56,189,248,0.3)', fontWeight: 600 }}>
                          🎯 Adaptive Follow-Up
                        </span>
                      )}
                      {evalData.evaluatorLabel && (
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: evalData.isFallback || evalData.evaluatorLabel.includes('Basic') ? 'rgba(234,179,8,0.12)' : 'rgba(56,189,248,0.12)',
                          color: evalData.isFallback || evalData.evaluatorLabel.includes('Basic') ? '#ca8a04' : '#38bdf8',
                          border: `1px solid ${evalData.isFallback || evalData.evaluatorLabel.includes('Basic') ? 'rgba(234,179,8,0.3)' : 'rgba(56,189,248,0.25)'}`
                        }}>
                          {evalData.evaluatorLabel}
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <p style={{ margin: 0, fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                      {q.questionText}
                    </p>
                  </div>

                  {/* Score badge & Toggle arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    {isSkipped ? (
                      <div style={{ backgroundColor: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', padding: '6px 12px', borderRadius: '8px', color: '#ca8a04', fontSize: '0.78rem', fontWeight: 700 }}>
                        Skipped (0/10)
                      </div>
                    ) : isEmpty ? (
                      <div style={{ backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>
                        Not Answered (0/10)
                      </div>
                    ) : isTooShort ? (
                      <div style={{ backgroundColor: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', padding: '6px 12px', borderRadius: '8px', color: '#ea580c', fontSize: '0.78rem', fontWeight: 700 }}>
                        Too Brief (0/10)
                      </div>
                    ) : evalData.score !== undefined ? (
                      <div style={{ backgroundColor: 'var(--bg-card-subtle)', border: `1px solid ${scoreClr}55`, padding: '6px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: scoreClr }}>{qScore}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/10</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: scoreClr, marginLeft: '2px' }}>({qScore100}%)</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Pending evaluation</span>
                    )}
                    {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </div>
                </button>

                {/* Expanded Detail View */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Status Notice Banners for Empty/Skipped/Too-Short */}
                    {isSkipped && (
                      <div style={{ marginTop: '16px', backgroundColor: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '10px', padding: '12px 16px', color: '#ca8a04', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} />
                        <span><strong>Question Skipped:</strong> Candidate skipped this question. No score was awarded. Review the ideal model response, key concepts, and practical example below to master this topic.</span>
                      </div>
                    )}
                    {isEmpty && !isSkipped && (
                      <div style={{ marginTop: '16px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 16px', color: '#ef4444', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} />
                        <span><strong>No Answer Submitted:</strong> No response was provided. A complete answer requires explaining definition, internal mechanics, and practical trade-offs.</span>
                      </div>
                    )}
                    {isTooShort && (
                      <div style={{ marginTop: '16px', backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '10px', padding: '12px 16px', color: '#ea580c', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} />
                        <span><strong>Insufficient Response:</strong> The answer was too brief or non-committal to reliably evaluate technical depth. In technical interviews, explaining your thought process demonstrates problem-solving ability.</span>
                      </div>
                    )}

                    {/* Evaluation Summary & Overall Score Bar */}
                    {evalData.score !== undefined && !isSkipped && !isEmpty && (
                      <div style={{ paddingTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {evalData.feedback || 'Overall Technical Evaluation'}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: scoreClr, fontWeight: 700, textTransform: 'capitalize' }}>
                            Verdict: {(evalData.verdict || 'evaluated').replace(/_/g, ' ')}
                          </span>
                        </div>
                        <ScoreBar score={qScore} />
                      </div>
                    )}

                    {/* Evaluation Dimensions Grid */}
                    {evalData.dimensions && typeof evalData.dimensions === 'object' && !isSkipped && !isEmpty && (
                      <div style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                          <BarChart2 size={15} /> 6-Dimensional Evaluation Rubric
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                          <DimensionPill
                            label="Technical Correctness (25%)"
                            score={evalData.dimensions.technicalCorrectness?.score}
                            maxScore={evalData.dimensions.technicalCorrectness?.maxScore || 10}
                            feedback={evalData.dimensions.technicalCorrectness?.feedback}
                          />
                          <DimensionPill
                            label="Question Relevance (15%)"
                            score={evalData.dimensions.relevance?.score}
                            maxScore={evalData.dimensions.relevance?.maxScore || 10}
                            feedback={evalData.dimensions.relevance?.feedback}
                          />
                          <DimensionPill
                            label="Conceptual Depth (20%)"
                            score={evalData.dimensions.conceptualUnderstanding?.score}
                            maxScore={evalData.dimensions.conceptualUnderstanding?.maxScore || 10}
                            feedback={evalData.dimensions.conceptualUnderstanding?.feedback}
                          />
                          <DimensionPill
                            label="Completeness & Edge Cases (15%)"
                            score={evalData.dimensions.completeness?.score}
                            maxScore={evalData.dimensions.completeness?.maxScore || 10}
                            feedback={evalData.dimensions.completeness?.feedback}
                          />
                          <DimensionPill
                            label="Explanation Clarity (10%)"
                            score={evalData.dimensions.explanationClarity?.score}
                            maxScore={evalData.dimensions.explanationClarity?.maxScore || 10}
                            feedback={evalData.dimensions.explanationClarity?.feedback}
                          />
                          <DimensionPill
                            label="Practical Application & Scale (15%)"
                            score={evalData.dimensions.practicalApplication?.score}
                            maxScore={evalData.dimensions.practicalApplication?.maxScore || 10}
                            feedback={evalData.dimensions.practicalApplication?.feedback}
                          />
                        </div>
                      </div>
                    )}

                    {/* Side-by-Side Comparison: Candidate Answer vs Ideal Model Answer */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
                      {/* Candidate Answer */}
                      <div style={{ backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '8px' }}>
                          Candidate's Submitted Answer
                        </div>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: q.userAnswer && q.userAnswer !== '[Skipped]' ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: 1.55, fontStyle: (!q.userAnswer || q.userAnswer === '[Skipped]') ? 'italic' : 'normal' }}>
                          {q.userAnswer === '[Skipped]' ? 'Question was skipped by candidate.' : (q.userAnswer || 'No answer submitted.')}
                        </p>
                      </div>

                      {/* Ideal Interview Answer */}
                      <div style={{ backgroundColor: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: '10px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ca8a04', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                            <Lightbulb size={14} /> Ideal Interview Answer (Model Response)
                          </div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontStyle: 'italic', backgroundColor: 'var(--bg-card-subtle)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                            *AI Reference Example (Illustrative sample)
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                          {evalData.betterAnswer || evalData.idealAnswer || q.referenceAnswer || 'Comprehensive architectural response demonstrating internal state and trade-offs.'}
                        </p>

                        {/* Expected Key Points Checklist */}
                        {Array.isArray(q.expectedKeyPoints) && q.expectedKeyPoints.length > 0 && (
                          <div style={{ marginTop: '12px', borderTop: '1px dashed rgba(234,179,8,0.2)', paddingTop: '10px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#ca8a04', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                              Core Rubric Points:
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {q.expectedKeyPoints.map((kp, kpi) => (
                                <li key={kpi} style={{ marginBottom: '2px' }}>{kp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Covered vs Missed Points Detailed Grid */}
                    {((Array.isArray(evalData.keyPointsCovered) && evalData.keyPointsCovered.length > 0) ||
                      (Array.isArray(evalData.keyPointsMissed) && evalData.keyPointsMissed.length > 0)) && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                        <div style={{ backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px' }}>
                            <CheckCircle2 size={16} /> Covered Key Points ({evalData.keyPointsCovered?.length || 0})
                          </div>
                          {Array.isArray(evalData.keyPointsCovered) && evalData.keyPointsCovered.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                              {evalData.keyPointsCovered.map((pt, i) => (
                                <li key={i} style={{ color: '#22c55e', marginBottom: '2px' }}>
                                  <span style={{ color: 'var(--text-primary)' }}>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No core key points clearly articulated.</p>
                          )}
                        </div>

                        <div style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px' }}>
                            <XCircle size={16} /> Missed Key Points ({evalData.keyPointsMissed?.length || 0})
                          </div>
                          {Array.isArray(evalData.keyPointsMissed) && evalData.keyPointsMissed.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                              {evalData.keyPointsMissed.map((pt, i) => (
                                <li key={i} style={{ color: '#ef4444', marginBottom: '2px' }}>
                                  <span style={{ color: 'var(--text-primary)' }}>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>All core key points successfully covered!</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Mistakes & Misconceptions Detected */}
                    {((Array.isArray(evalData.mistakes) && evalData.mistakes.length > 0) ||
                      (Array.isArray(evalData.incorrectStatements) && evalData.incorrectStatements.length > 0)) && (
                      <div style={{
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.84rem', fontWeight: 700, marginBottom: '10px' }}>
                          <AlertTriangle size={16} /> Mistakes & Misconceptions Detected
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(evalData.mistakes || evalData.incorrectStatements).map((stmt, i) => {
                            const corr = evalData.corrections?.[i];
                            return (
                              <div key={i} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                                <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>
                                  ⚠️ Incorrect Statement: {stmt}
                                </div>
                                {corr && (
                                  <div style={{ color: '#22c55e', fontWeight: 500 }}>
                                    ✓ Technical Correction: {corr}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Strengths & Missing Concepts Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                      {evalData.strengths && evalData.strengths.length > 0 && (
                        <div style={{ backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                            <CheckCircle2 size={14} /> What You Did Well (Strengths)
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                            {evalData.strengths.map((str, i) => <li key={i}>{str}</li>)}
                          </ul>
                        </div>
                      )}
                      {evalData.missingConcepts && evalData.missingConcepts.length > 0 && (
                        <div style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                            <XCircle size={14} /> What Is Missing (Concepts & Gaps)
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                            {evalData.missingConcepts.map((mis, i) => <li key={i}>{mis}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* How to Improve / Suggestions */}
                    {Array.isArray(evalData.suggestions) && evalData.suggestions.length > 0 && (
                      <div style={{
                        backgroundColor: 'rgba(14,165,233,0.06)',
                        border: '1px solid rgba(14,165,233,0.25)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px' }}>
                          <Target size={16} /> How to Improve & Elevate Your Response
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.83rem', lineHeight: 1.65 }}>
                          {evalData.suggestions.map((sug, i) => (
                            <li key={i}>{sug}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Step-by-Step Educational Explanation */}
                    {q.stepByStepExplanation && (
                      <div style={{
                        backgroundColor: 'rgba(56,189,248,0.05)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <BookOpen size={14} /> Step-by-Step Technical Explanation
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                          {q.stepByStepExplanation}
                        </div>
                      </div>
                    )}

                    {/* Practical Production Scenario & Example */}
                    {(evalData.practicalExample || q.practicalExample) && (
                      <div style={{
                        backgroundColor: 'rgba(168,85,247,0.05)',
                        border: '1px solid rgba(168,85,247,0.2)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9333ea', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <Cpu size={14} /> Real-World Production Scenario & Practical Application
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.65 }}>
                          {evalData.practicalExample || q.practicalExample}
                        </p>
                      </div>
                    )}

                    {/* Common Traps & Edge Case Mistakes */}
                    {Array.isArray(q.commonMistakes) && q.commonMistakes.length > 0 && (
                      <div style={{
                        backgroundColor: 'rgba(249,115,22,0.05)',
                        border: '1px solid rgba(249,115,22,0.2)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ea580c', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <AlertTriangle size={14} /> Common Pitfalls & Interview Anti-Patterns
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                          {q.commonMistakes.map((mistake, mi) => (
                            <li key={mi} style={{ marginBottom: '4px' }}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggested Next Follow-Up Questions */}
                    {((Array.isArray(evalData.followUpQuestions) && evalData.followUpQuestions.length > 0) || (Array.isArray(q.suggestedFollowUps) && q.suggestedFollowUps.length > 0)) && (
                      <div style={{
                        backgroundColor: 'rgba(14,165,233,0.05)',
                        border: '1px solid rgba(14,165,233,0.2)',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <Zap size={14} /> Follow-Up Interview Questions (Deep Dive)
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                          {(Array.isArray(evalData.followUpQuestions) && evalData.followUpQuestions.length > 0 ? evalData.followUpQuestions : q.suggestedFollowUps).map((followUp, fi) => (
                            <li key={fi} style={{ marginBottom: '4px' }}>{followUp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommended Revision Topics */}
                    {((Array.isArray(evalData.revisionTopics) && evalData.revisionTopics.length > 0) || q.topic) && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                        padding: '12px 16px',
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                          Recommended Revision Topics:
                        </span>
                        {(Array.isArray(evalData.revisionTopics) && evalData.revisionTopics.length > 0 ? evalData.revisionTopics : [q.topic]).filter(Boolean).map((revTopic, rti) => (
                          <button
                            key={rti}
                            type="button"
                            onClick={() => navigate(`/interview/setup?category=${encodeURIComponent(interview.category)}&topic=${encodeURIComponent(revTopic)}`)}
                            style={{
                              padding: '3px 10px',
                              borderRadius: '16px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: 'rgba(56,189,248,0.12)',
                              color: 'var(--primary-color)',
                              border: '1px solid rgba(56,189,248,0.25)',
                              cursor: 'pointer'
                            }}
                            title={`Practice mock on ${revTopic}`}
                          >
                            {revTopic} →
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => navigate('/skills')}
                          style={{
                            padding: '3px 10px',
                            borderRadius: '16px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: 'rgba(168,85,247,0.12)',
                            color: '#9333ea',
                            border: '1px solid rgba(168,85,247,0.25)',
                            cursor: 'pointer',
                            marginLeft: 'auto'
                          }}
                        >
                          View in Skill Gap Analyzer 🎯
                        </button>
                      </div>
                    )}

                    {/* Direct Topic Practice Action */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '4px' }}>
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/interview/setup?category=${encodeURIComponent(interview.category)}&topic=${encodeURIComponent(q.topic || interview.category)}`);
                        }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '7px 16px' }}
                      >
                        <RotateCcw size={13} /> Practice this topic again ({q.topic || interview.category})
                      </Button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            onClick={handleContinuePractice}
            disabled={addingQuestions}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontWeight: 700 }}
          >
            {addingQuestions ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
            Continue Practice (+3 Questions)
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/interview/setup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}
          >
            <RotateCcw size={16} /> Practice Another Session
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}
          >
            <Home size={16} /> Return to Dashboard
          </Button>
        </div>

      </div>
    </div>
  );
};

export default InterviewResults;
