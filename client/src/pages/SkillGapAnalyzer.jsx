import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../services/api';
import UserMenu from '../components/UserMenu';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight, Target, Award, AlertTriangle, TrendingUp, TrendingDown, Minus, HelpCircle, Loader2, RefreshCw, BookOpen, Zap, Clock } from 'lucide-react';
import '../styles/auth.css';

// Circular Score Component for overall score
const CircularScore = ({ score, size = 150 }) => {
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
        <HelpCircle size={28} style={{ color: 'var(--text-muted)', marginBottom: '4px' }} />
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'center', padding: '0 8px' }}>
          No Data
        </span>
      </div>
    );
  }

  const radius = (size - 18) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 75 ? 'var(--success-text, #22c55e)' : score >= 60 ? 'var(--warning-text, #eab308)' : 'var(--error-text, #ef4444)';

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
        <span style={{ fontSize: '2.1rem', fontWeight: 800, color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          Overall / 100
        </span>
      </div>
    </div>
  );
};

// Horizontal Score Bar
const ScoreBar = ({ score, classification }) => {
  if (score === null || score === undefined) {
    return (
      <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px' }} />
    );
  }

  const color = score >= 75 ? 'var(--success-text, #22c55e)' : score >= 60 ? 'var(--warning-text, #eab308)' : 'var(--error-text, #ef4444)';

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          width: `${Math.min(100, Math.max(5, score))}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '4px',
          transition: 'width 0.6s ease'
        }} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: 700, color, minWidth: '45px', textAlign: 'right' }}>
        {score}%
      </span>
    </div>
  );
};

const SkillGapAnalyzer = () => {
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [gaps, setGaps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'gaps' | 'developing' | 'strong'

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

  // Derive categories list from breakdown
  const availableCategories = overview?.categoryBreakdown?.map(c => c.category) || [];

  // Filter topics by selected tab
  const getFilteredTopics = () => {
    if (!gaps) return [];
    if (filterTab === 'gaps') return gaps.needsImprovement || [];
    if (filterTab === 'developing') return gaps.developing || [];
    if (filterTab === 'strong') return gaps.strong || [];
    return gaps.allTopics || [];
  };

  const filteredTopics = getFilteredTopics();
  const hasEvaluatedData = (overview?.totalEvaluatedQuestions || 0) > 0;

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
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
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
      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '28px 20px 64px 20px' }}>
        
        {/* Banner Section */}
        <section style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg, 12px)',
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-card)',
          transition: 'all var(--transition-fast)'
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
              <span>Evidence-Based Proficiency Engine</span>
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
              Analyzed directly from your evaluated mock interview history. Scores reflect difficulty weighting, technical accuracy, and specific missing concepts.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Button
              variant="outline"
              onClick={fetchAnalytics}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '40px',
                padding: '0 14px',
                fontSize: '0.85rem'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Analysis</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/interview/setup')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '40px',
                padding: '0 18px',
                fontSize: '0.85rem'
              }}
            >
              <span>Practice New Mock</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </section>

        {/* Category Filter Pills (if multiple categories available) */}
        {availableCategories.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginRight: '4px' }}>
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: !selectedCategory ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                backgroundColor: !selectedCategory ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                color: !selectedCategory ? 'var(--primary-text)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All Subjects ({overview?.totalEvaluatedQuestions || 0} Qs)
            </button>
            {overview?.categoryBreakdown?.map(cat => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategory(cat.category)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: selectedCategory === cat.category ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedCategory === cat.category ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                  color: selectedCategory === cat.category ? 'var(--primary-text)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.category} ({cat.questionsCount} Qs)
              </button>
            ))}
          </div>
        )}

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
              Synthesizing evaluated interview responses and skill proficiency...
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

        {/* Empty State: No Practice History */}
        {!loading && !error && !hasEvaluatedData && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-subtle)',
              color: 'var(--primary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <BookOpen size={28} />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              No Practice Evidence Recorded Yet
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 auto 24px auto',
              fontSize: '0.92rem',
              lineHeight: 1.6
            }}>
              The Skill Gap Analyzer requires at least one evaluated interview to generate proficiency estimates, identify your critical weaknesses, and recommend targeted practice.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/interview/setup')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 24px',
                height: '44px',
                fontSize: '0.92rem'
              }}
            >
              <span>Start Your First Practice Mock</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {/* Populated Analytics View */}
        {!loading && !error && hasEvaluatedData && (
          <>
            {/* Top Metric Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              
              {/* Overall Proficiency Card */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <CircularScore score={overview?.overallScore} size={90} />
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Proficiency Index
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 2px 0' }}>
                    {overview?.overallScore !== null ? `${overview?.overallScore}%` : 'Not enough data'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Calculated from {overview?.evaluatedTopicsCount || 0} evaluated topics
                  </div>
                </div>
              </div>

              {/* Strong Skills Card */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Strong Skills (75%+)
                  </span>
                  <Award size={18} style={{ color: 'var(--success-text)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success-text)', lineHeight: 1.2 }}>
                  {overview?.counts?.strong || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Topics demonstrated with consistent accuracy
                </div>
              </div>

              {/* Critical Gaps Card */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Critical Gaps (&lt;60%)
                  </span>
                  <AlertTriangle size={18} style={{ color: 'var(--error-text)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--error-text)', lineHeight: 1.2 }}>
                  {overview?.counts?.needsImprovement || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  High priority areas needing focused practice
                </div>
              </div>

              {/* Developing Skills Card */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Developing (60–74%)
                  </span>
                  <TrendingUp size={18} style={{ color: 'var(--warning-text)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning-text)', lineHeight: 1.2 }}>
                  {overview?.counts?.developing || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Skills requiring refinement of edge cases
                </div>
              </div>

            </div>

            {/* Targeted Practice Recommendations (Grounded in Real Missing Concepts) */}
            {overview?.topRecommendations?.length > 0 && (
              <section style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Zap size={18} style={{ color: 'var(--warning-text)' }} />
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Priority Practice Recommendations
                  </h2>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  {overview.topRecommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {rec.skillName}
                          </span>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bg-subtle)',
                            color: 'var(--text-muted)',
                            fontWeight: 600
                          }}>
                            {rec.category}
                          </span>
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            backgroundColor: rec.priority === 'high' ? 'var(--error-subtle)' : 'var(--warning-subtle)',
                            color: rec.priority === 'high' ? 'var(--error-text)' : 'var(--warning-text)'
                          }}>
                            {rec.priority === 'high' ? 'Critical Gap' : 'Target Area'}
                          </span>
                        </div>

                        <p style={{ margin: '4px 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          {rec.recommendedAction}
                        </p>

                        {rec.missingConcepts?.length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Missed Concepts:</span>
                            {rec.missingConcepts.slice(0, 3).map((mc, mci) => (
                              <span
                                key={mci}
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '1px 6px',
                                  borderRadius: '3px',
                                  backgroundColor: 'var(--error-subtle)',
                                  color: 'var(--error-text)'
                                }}
                              >
                                {mc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        onClick={() => navigate(rec.practiceUrl)}
                        style={{
                          height: '36px',
                          padding: '0 14px',
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Practice This Topic</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Topic-Wise Proficiency Breakdown */}
            <section style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '16px',
                marginBottom: '18px'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                    Topic-Wise Skill Proficiency Breakdown
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Evaluated answers weighted by question difficulty and recency
                  </p>
                </div>

                {/* Filter Tabs */}
                <div style={{
                  display: 'flex',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '2px',
                  gap: '2px'
                }}>
                  {[
                    { id: 'all', label: `All (${gaps?.allTopics?.length || 0})` },
                    { id: 'gaps', label: `Gaps (${gaps?.needsImprovement?.length || 0})` },
                    { id: 'developing', label: `Developing (${gaps?.developing?.length || 0})` },
                    { id: 'strong', label: `Strong (${gaps?.strong?.length || 0})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilterTab(tab.id)}
                      style={{
                        padding: '4px 10px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: filterTab === tab.id ? 700 : 500,
                        backgroundColor: filterTab === tab.id ? 'var(--bg-surface)' : 'transparent',
                        color: filterTab === tab.id ? 'var(--primary-text)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredTopics.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  No skills match the selected filter.
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {filteredTopics.map((item, idx) => {
                    const isConfirmed = item.confidence === 'confirmed';

                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '8px',
                          padding: '16px 20px',
                          transition: 'border-color var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                                {item.skillName}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '1px 6px', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px' }}>
                                {item.category}
                              </span>

                              {/* Confidence Badge */}
                              <span
                                title={isConfirmed ? 'Evidence confirmed from 3 or more evaluations' : 'Preliminary baseline from 1-2 evaluations'}
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '1px 7px',
                                  borderRadius: '9999px',
                                  fontWeight: 600,
                                  backgroundColor: isConfirmed ? 'var(--success-subtle)' : 'var(--warning-subtle)',
                                  color: isConfirmed ? 'var(--success-text)' : 'var(--warning-text)'
                                }}
                              >
                                {isConfirmed ? `✦ Confirmed (${item.evidenceCount} Qs)` : `Preliminary (${item.evidenceCount} Qs)`}
                              </span>

                              {/* Trend Indicator */}
                              {item.trend === 'improving' && (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: 'var(--success-text)', fontWeight: 600 }}>
                                  <TrendingUp size={13} /> Improving
                                </span>
                              )}
                              {item.trend === 'declining' && (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: 'var(--error-text)', fontWeight: 600 }}>
                                  <TrendingDown size={13} /> Declining
                                </span>
                              )}
                              {item.trend === 'steady' && (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                  <Minus size={13} /> Steady
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            onClick={() => navigate(item.practiceUrl)}
                            style={{
                              padding: '4px 10px',
                              height: '30px',
                              fontSize: '0.75rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>Practice</span>
                            <ArrowRight size={12} />
                          </Button>
                        </div>

                        {/* Proficiency Bar */}
                        <div style={{ marginBottom: '8px' }}>
                          <ScoreBar score={item.estimatedScore} classification={item.classification} />
                        </div>

                        {/* Missing Concepts or Strengths Chips */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <div>
                            {item.missingConcepts?.length > 0 ? (
                              <span>
                                <strong style={{ color: 'var(--error-text)' }}>Focus:</strong> {item.missingConcepts.join(', ')}
                              </span>
                            ) : item.strengths?.length > 0 ? (
                              <span>
                                <strong style={{ color: 'var(--success-text)' }}>Mastered:</strong> {item.strengths.join(', ')}
                              </span>
                            ) : (
                              <span>{item.recommendedAction}</span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Based on {item.evidenceCount} evaluated {item.evidenceCount === 1 ? 'question' : 'questions'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Recent Evaluated Responses Feed */}
            {overview?.recentActivity?.length > 0 && (
              <section style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '22px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Clock size={16} style={{ color: 'var(--text-muted)' }} />
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                    Recent Evaluated Answers
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {overview.recentActivity.map((act, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                          {act.questionText}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {act.category} • {act.topic} • {act.difficulty}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: act.verdict === 'correct' ? 'var(--success-subtle)' : act.verdict === 'partially_correct' ? 'var(--warning-subtle)' : 'var(--error-subtle)',
                          color: act.verdict === 'correct' ? 'var(--success-text)' : act.verdict === 'partially_correct' ? 'var(--warning-text)' : 'var(--error-text)'
                        }}>
                          {act.verdict === 'correct' ? 'Correct' : act.verdict === 'partially_correct' ? 'Partial' : 'Incorrect'} ({act.rawScore}/10)
                        </span>
                      </div>
                    </div>
                  ))}
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
