import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import Button from '../components/ui/Button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  HelpCircle, 
  Loader2, 
  RefreshCw, 
  BookOpen, 
  Zap, 
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import '../styles/auth.css';

// Circular Score Component
const CircularGauge = ({ score, size = 130, label = 'Readiness' }) => {
  if (score === null || score === undefined) {
    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: '3px dashed var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        backgroundColor: 'var(--bg-card-subtle)'
      }}>
        <HelpCircle size={24} style={{ color: 'var(--text-muted)', marginBottom: '4px' }} />
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>No Data</span>
      </div>
    );
  }

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '1.9rem', fontWeight: 800, color, lineHeight: 1 }}>
          {score}%
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// Trend Icon helper
const TrendBadge = ({ trend }) => {
  if (trend === 'improving') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#22c55e', fontSize: '0.75rem', fontWeight: 600 }}>
        <TrendingUp size={14} /> Improving
      </span>
    );
  }
  if (trend === 'declining') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}>
        <TrendingDown size={14} /> Declining
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>
      <Minus size={14} /> Steady
    </span>
  );
};

// Mastery Badge Helper
const MasteryBadge = ({ label }) => {
  const styles = {
    Strong: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' },
    Proficient: { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' },
    Developing: { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.3)', color: '#eab308' },
    Beginner: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }
  }[label] || { bg: 'var(--bg-subtle)', border: 'var(--border-subtle)', color: 'var(--text-muted)' };

  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.72rem',
      fontWeight: 700,
      backgroundColor: styles.bg,
      border: `1px solid ${styles.border}`,
      color: styles.color,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }}>
      {label}
    </span>
  );
};

const SkillGapAnalyzer = () => {
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [gaps, setGaps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState('weakest'); // 'weakest' | 'strongest' | 'all'

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const categoryParam = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
      const [overviewRes, gapsRes] = await Promise.all([
        api.get(`/skills/overview${categoryParam}`),
        api.get(`/skills/gaps${categoryParam}`)
      ]);

      if (overviewRes.data && overviewRes.data.status === 'success') {
        setOverview(overviewRes.data.data);
      }
      if (gapsRes.data && gapsRes.data.status === 'success') {
        setGaps(gapsRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load skill analytics:', err);
      setError(err.response?.data?.message || 'Failed to load skill analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const completedSessionsCount = overview?.completedSessionsCount || 0;
  const isEarlyStage = completedSessionsCount < 2;
  const targetRole = overview?.targetRole || 'Software Engineer';
  const readinessPercentage = overview?.readinessPercentage || 0;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      color: 'var(--text-primary)',
      transition: 'background-color var(--transition-fast), color var(--transition-fast)'
    }}>
      {/* Top Application Header */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              padding: '6px 10px',
              borderRadius: '6px',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            <ArrowLeft size={16} /> <span>Dashboard</span>
          </Link>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Target size={16} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              Skill Gap Analyzer
            </span>
          </div>
        </div>

        <UserMenu />
      </header>

      {/* Main Content Workspace */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px 64px 20px' }}>
        
        {/* Banner Section */}
        <section style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary-text)',
              backgroundColor: 'var(--primary-subtle)',
              border: '1px solid var(--primary-border)',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.74rem',
              fontWeight: 600,
              marginBottom: '10px'
            }}>
              <Target size={13} />
              <span>Deterministic EMA &amp; Role Requirements Engine</span>
            </div>

            <h1 style={{
              fontSize: '1.55rem',
              fontWeight: 700,
              lineHeight: 1.3,
              margin: '0 0 8px 0',
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em'
            }}>
              Personalized Technical Skill Gap Report
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              margin: 0,
              fontSize: '0.9rem',
              lineHeight: 1.55
            }}>
              Target Role: <strong style={{ color: 'var(--text-primary)' }}>{targetRole}</strong>.
              All proficiencies calculated via Exponential Moving Averages (EMA) with strict objective thresholds.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Button
              variant="outline"
              onClick={fetchAnalytics}
              disabled={loading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/interview/setup')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Practice New Mock</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 16px auto', color: 'var(--primary)' }} />
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
              Calculating Exponential Moving Averages and target role readiness...
            </p>
          </div>
        )}

        {/* Error State with Retry Button */}
        {!loading && error && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--error, #ef4444)',
            borderRadius: '12px',
            padding: '32px 24px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <AlertTriangle size={32} style={{ color: 'var(--error, #ef4444)', margin: '0 auto 12px auto' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Could Not Retrieve Skill Analytics
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0 0 16px 0' }}>
              {error}
            </p>
            <Button variant="primary" onClick={fetchAnalytics}>
              <RefreshCw size={14} /> Retry Loading
            </Button>
          </div>
        )}

        {/* Informative Early Stage / Empty State (Need at least 2 sessions for reliable readiness) */}
        {!loading && !error && isEarlyStage && (
          <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '14px',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eab308', fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>
                  <Lock size={18} /> Preliminary Baseline Stage ({completedSessionsCount}/2 Sessions Completed)
                </div>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5, maxWidth: '650px' }}>
                  A reliable role readiness profile requires at least <strong>2 completed interview sessions</strong>. 
                  {completedSessionsCount === 0 
                    ? ' You have not completed any sessions yet. Take your first interview to establish your technical baseline.'
                    : ' You have completed 1 session. Complete 1 more mock interview to unlock full target role readiness ratings and topic mastery trends.'}
                </p>
                {/* Visual Progress Bar */}
                <div style={{ width: '220px', height: '8px', backgroundColor: 'rgba(234, 179, 8, 0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ width: `${(completedSessionsCount / 2) * 100}%`, height: '100%', backgroundColor: '#eab308', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate('/interview/setup')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>{completedSessionsCount === 0 ? 'Start Diagnostic Session' : 'Complete 2nd Session'}</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        )}

        {/* Populated Analytics View */}
        {!loading && !error && (
          <>
            {/* Top Grid: Role Readiness & Narrative Summary */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {/* Card 1: Role Readiness % */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <CircularGauge score={readinessPercentage} size={110} label="Readiness" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Target Role Readiness
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px 0' }}>
                    {targetRole}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {readinessPercentage >= 75 ? 'Qualified for interview rounds' : readinessPercentage >= 50 ? 'Developing core competency' : 'Foundational skills in progress'}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Based on {overview?.totalEvaluatedQuestions || 0} evaluated questions
                  </div>
                </div>
              </div>

              {/* Card 2: Executive AI Narrative Summary */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '24px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Sparkles size={16} color="#818cf8" />
                    <span style={{ fontSize: '0.78rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Executive Summary &amp; Priority Guidance
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{overview?.narrativeSummary || 'Complete 2 mock interview sessions to unlock tailored executive insights and topic recommendations.'}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Overall EMA Score: <strong>{overview?.overallScore || 0}%</strong></span>
                  <span>Evaluated Topics: <strong>{overview?.evaluatedTopicsCount || 0}</strong></span>
                </div>
              </div>
            </div>

            {/* Category Breakdown Bar Chart */}
            {overview?.categoryBreakdown && overview.categoryBreakdown.length > 0 && (
              <section style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart3 size={18} color="var(--primary-text)" />
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Category Proficiency Breakdown (EMA)
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Weighted by recency &amp; difficulty
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {overview.categoryBreakdown.map((cat, idx) => {
                    const score = cat.averageScore || cat.emaScore || 0;
                    const color = score >= 85 ? '#22c55e' : score >= 70 ? '#38bdf8' : score >= 50 ? '#eab308' : '#ef4444';
                    return (
                      <div key={idx} style={{
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '14px 18px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            {cat.category}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MasteryBadge label={cat.masteryLabel || 'Beginner'} />
                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color }}>
                              {score}%
                            </span>
                          </div>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(100, Math.max(5, score))}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span>{cat.attempts || cat.questionsCount || 0} questions attempted</span>
                          <TrendBadge trend={cat.trend || 'neutral'} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Ranked Weakest & Strongest Topics Tabs */}
            <section style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('weakest')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: activeTab === 'weakest' ? '2px solid #ef4444' : '1px solid var(--border-subtle)',
                      backgroundColor: activeTab === 'weakest' ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-subtle)',
                      color: activeTab === 'weakest' ? '#ef4444' : 'var(--text-secondary)'
                    }}
                  >
                    Critical Skill Gaps ({overview?.weakestTopics?.length || 0})
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('strongest')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: activeTab === 'strongest' ? '2px solid #22c55e' : '1px solid var(--border-subtle)',
                      backgroundColor: activeTab === 'strongest' ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-subtle)',
                      color: activeTab === 'strongest' ? '#22c55e' : 'var(--text-secondary)'
                    }}
                  >
                    Demonstrated Strengths ({overview?.strongestTopics?.length || 0})
                  </button>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Ranked by Exponential Moving Average (EMA)
                </span>
              </div>

              {/* Weakest Topics List */}
              {activeTab === 'weakest' && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {overview?.weakestTopics && overview.weakestTopics.length > 0 ? (
                    overview.weakestTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '14px'
                        }}
                      >
                        <div style={{ flex: '1 1 300px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--primary-text)', fontWeight: 600, backgroundColor: 'var(--primary-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                              {topic.category}
                            </span>
                            <MasteryBadge label={topic.masteryLabel || 'Beginner'} />
                            <TrendBadge trend={topic.trend || 'neutral'} />
                          </div>
                          <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {topic.topic}
                          </h4>
                          {topic.missingConcepts && topic.missingConcepts.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>Missing:</span>
                              {topic.missingConcepts.slice(0, 3).map((mis, mIdx) => (
                                <span key={mIdx} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', backgroundColor: 'rgba(239, 68, 68, 0.08)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                  {mis}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: topic.emaScore >= 50 ? '#eab308' : '#ef4444' }}>
                              {topic.emaScore}%
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {topic.attempts} attempts
                            </div>
                          </div>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate(`/interview/setup?category=${encodeURIComponent(topic.category)}&topic=${encodeURIComponent(topic.topic)}`)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            <span>Practice this now</span>
                            <ArrowRight size={13} />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No critical gaps recorded. Keep up the consistent practice!
                    </div>
                  )}
                </div>
              )}

              {/* Strongest Topics List */}
              {activeTab === 'strongest' && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {overview?.strongestTopics && overview.strongestTopics.length > 0 ? (
                    overview.strongestTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '14px'
                        }}
                      >
                        <div style={{ flex: '1 1 300px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--primary-text)', fontWeight: 600, backgroundColor: 'var(--primary-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                              {topic.category}
                            </span>
                            <MasteryBadge label={topic.masteryLabel || 'Proficient'} />
                            <TrendBadge trend={topic.trend || 'neutral'} />
                          </div>
                          <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {topic.topic}
                          </h4>
                          {topic.strengths && topic.strengths.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#22c55e', fontWeight: 600 }}>Strengths:</span>
                              {topic.strengths.slice(0, 3).map((str, sIdx) => (
                                <span key={sIdx} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', backgroundColor: 'rgba(34, 197, 94, 0.08)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                  {str}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22c55e' }}>
                              {topic.emaScore}%
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {topic.attempts} attempts
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/interview/setup?category=${encodeURIComponent(topic.category)}&topic=${encodeURIComponent(topic.topic)}`)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            <span>Reinforce Hard</span>
                            <ArrowRight size={13} />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No strong skills recorded yet. Complete more practice questions!
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Score History Timeline */}
            {overview?.scoreHistory && overview.scoreHistory.length > 0 && (
              <section style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '24px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Clock size={18} color="var(--primary-text)" />
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Performance Trend Over Time (Last Sessions)
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                  {overview.scoreHistory.map((item, idx) => {
                    const score = item.score || 0;
                    const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';
                    return (
                      <div
                        key={idx}
                        style={{
                          minWidth: '130px',
                          backgroundColor: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '12px',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          Session #{idx + 1}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color, margin: '2px 0' }}>
                          {score}%
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.category}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {item.date ? new Date(item.date).toLocaleDateString() : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default SkillGapAnalyzer;
