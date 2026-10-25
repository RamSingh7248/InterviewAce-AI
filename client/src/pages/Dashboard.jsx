import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import { 
  Sparkles, 
  Award, 
  CheckCircle2,
  ArrowRight, 
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ completedCount: 0, averageScore: null, recent: [] });
  const [skillOverview, setSkillOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const [statsRes, skillsRes] = await Promise.allSettled([
          api.get('/interviews/stats'),
          api.get('/skills/overview')
        ]);
        if (isMounted && statsRes.status === 'fulfilled' && statsRes.value?.data?.status === 'success') {
          setStats(statsRes.value.data.stats);
        }
        if (isMounted && skillsRes.status === 'fulfilled' && skillsRes.value?.data?.status === 'success') {
          setSkillOverview(skillsRes.value.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch dashboard stats:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  const getScoreColor = (score) => {
    if (score >= 70) return 'var(--success-text)';
    if (score >= 50) return 'var(--warning-text)';
    return 'var(--error-text)';
  };

  const getScoreBadgeBg = (score) => {
    if (score >= 70) return 'var(--success-subtle)';
    if (score >= 50) return 'var(--warning-subtle)';
    return 'var(--error-subtle)';
  };

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
        {/* Brand Logo & Title */}
        <Link 
          to="/dashboard" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            textDecoration: 'none' 
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm, 6px)',
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
          }}>
            <Sparkles size={17} />
          </div>
          <span style={{ 
            fontSize: '1.15rem', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            letterSpacing: '-0.01em' 
          }}>
            InterviewAce AI
          </span>
        </Link>

        {/* User Navigation & Theme Menu */}
        <UserMenu />
      </header>

      {/* Main Workspace Content */}
      <main style={{ 
        maxWidth: '1080px', 
        margin: '0 auto', 
        padding: '28px 20px 48px 20px' 
      }}>
        
        {/* Welcome Banner */}
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
              color: 'var(--success-text)', 
              backgroundColor: 'var(--success-subtle)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill, 9999px)',
              fontSize: '0.75rem', 
              fontWeight: 600, 
              marginBottom: '10px' 
            }}>
              <CheckCircle2 size={13} />
              <span>Workspace Ready</span>
            </div>
            
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              lineHeight: 1.3,
              margin: '0 0 6px 0', 
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em'
            }}>
              Welcome back, {user?.name || 'Engineer'}
            </h1>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              margin: 0, 
              fontSize: '0.92rem', 
              lineHeight: 1.5 
            }}>
              Your technical mock interview workspace is prepared. Practice questions, review detailed scoring, and track role progression.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button 
              variant="primary" 
              onClick={() => navigate('/interview/setup')}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '0 20px',
                height: '42px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer' 
              }}
            >
              <span>Start Practice Mock</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </section>

        {/* Dashboard Grid: Practice Overview & Recent Activity */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px' 
        }}>
          
          {/* Card 1: Practice Overview */}
          <section style={{ 
            backgroundColor: 'var(--bg-surface)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-lg, 12px)', 
            padding: '22px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all var(--transition-fast)'
          }}>
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <h2 style={{ 
                  fontSize: '0.98rem', 
                  fontWeight: 600, 
                  margin: 0, 
                  color: 'var(--text-primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  <Award size={17} style={{ color: 'var(--primary-text)' }} />
                  <span>Practice Overview</span>
                </h2>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-muted)',
                  fontWeight: 500
                }}>
                  Aggregate Stats
                </span>
              </div>

              {/* Compact Stat Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px', 
                marginBottom: '16px' 
              }}>
                <div style={{ 
                  backgroundColor: 'var(--bg-card-subtle)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: 'var(--radius-md, 8px)', 
                  padding: '14px 16px' 
                }}>
                  <div style={{ 
                    fontSize: '1.65rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    lineHeight: 1.2
                  }}>
                    {stats.completedCount}
                  </div>
                  <div style={{ 
                    fontSize: '0.78rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '4px',
                    fontWeight: 500
                  }}>
                    Mocks Completed
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: 'var(--bg-card-subtle)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: 'var(--radius-md, 8px)', 
                  padding: '14px 16px' 
                }}>
                  <div style={{ 
                    fontSize: '1.65rem', 
                    fontWeight: 700, 
                    color: stats.averageScore !== null ? getScoreColor(stats.averageScore) : 'var(--text-muted)',
                    lineHeight: 1.2
                  }}>
                    {stats.averageScore !== null ? `${stats.averageScore}%` : '—'}
                  </div>
                  <div style={{ 
                    fontSize: '0.78rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '4px',
                    fontWeight: 500
                  }}>
                    Average Score
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Target Role & Preferences Bar */}
            <div style={{ 
              backgroundColor: 'var(--bg-card-subtle)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-md, 8px)', 
              padding: '12px 14px', 
              fontSize: '0.84rem', 
              color: 'var(--text-secondary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
                <Target size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span style={{ 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap' 
                }}>
                  Target Role: <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user?.preferences?.targetRole || 'Software Engineer'}</strong>
                </span>
              </div>
              <Link 
                to="/profile?edit=true" 
                style={{ 
                  color: 'var(--primary-text)', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  fontSize: '0.78rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <span>Edit Preferences</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </section>

          {/* Card 2: Recent Completed Mocks */}
          <section style={{ 
            backgroundColor: 'var(--bg-surface)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-lg, 12px)', 
            padding: '22px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all var(--transition-fast)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '16px' 
            }}>
              <h2 style={{ 
                fontSize: '0.98rem', 
                fontWeight: 600, 
                margin: 0, 
                color: 'var(--text-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <TrendingUp size={17} style={{ color: 'var(--primary-text)' }} />
                <span>Recent Completed Mocks</span>
              </h2>
              <Link
                to="/history"
                style={{ 
                  fontSize: '0.78rem', 
                  color: 'var(--primary-text)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                View Full History →
              </Link>
            </div>

            {/* List of Recent Completed Mocks */}
            {stats.recent && stats.recent.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {stats.recent.map((rec, i) => (
                  <Link
                    key={rec._id || i}
                    to={rec._id ? `/interview/${rec._id}/results` : '#'}
                    title="Click to review detailed interview assessment report"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md, 8px)',
                      padding: '10px 14px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    {/* Left: Subject / Category & Difficulty */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <span style={{ 
                        fontWeight: 600, 
                        fontSize: '0.86rem', 
                        color: 'var(--text-primary)' 
                      }}>
                        {rec.category}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-xs, 4px)',
                        backgroundColor: 'var(--bg-tag)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        fontWeight: 500
                      }}>
                        {rec.difficulty}
                      </span>
                    </div>

                    {/* Right: Score, Date, and Review Arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: getScoreColor(rec.finalScore),
                        backgroundColor: getScoreBadgeBg(rec.finalScore),
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-sm, 6px)',
                        letterSpacing: '0.01em'
                      }}>
                        {rec.finalScore}%
                      </span>
                      {rec.createdAt && (
                        <span style={{ 
                          fontSize: '0.74rem', 
                          color: 'var(--text-muted)',
                          minWidth: '42px',
                          textAlign: 'right'
                        }}>
                          {new Date(rec.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Clean Empty State */
              <div style={{
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-md, 8px)',
                padding: '32px 20px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  color: 'var(--text-muted)'
                }}>
                  <Layers size={18} />
                </div>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 600, 
                  fontSize: '0.88rem', 
                  marginBottom: '4px' 
                }}>
                  No mock interviews completed yet
                </div>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 16px 0',
                  maxWidth: '280px',
                  lineHeight: 1.4
                }}>
                  Start a practice session to simulate an AI technical interview and receive detailed feedback.
                </p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/interview/setup')}
                  style={{ 
                    fontSize: '0.8rem', 
                    padding: '0 14px',
                    height: '34px'
                  }}
                >
                  Start First Mock
                </Button>
              </div>
            )}
          </section>

          {/* Card 3: Skill Gap Snapshot */}
          <section style={{ 
            backgroundColor: 'var(--bg-surface)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-lg, 12px)', 
            padding: '22px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all var(--transition-fast)'
          }}>
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <h2 style={{ 
                  fontSize: '0.98rem', 
                  fontWeight: 600, 
                  margin: 0, 
                  color: 'var(--text-primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  <Target size={17} style={{ color: 'var(--primary-text)' }} />
                  <span>Skill Gap Snapshot</span>
                </h2>
                <Link
                  to="/skills"
                  style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--primary-text)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <span>Full Report</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

              {skillOverview && skillOverview.totalEvaluatedQuestions > 0 ? (
                <div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '12px', 
                    marginBottom: '14px' 
                  }}>
                    <div style={{ 
                      backgroundColor: 'var(--bg-card-subtle)', 
                      border: '1px solid var(--border-subtle)', 
                      borderRadius: 'var(--radius-md, 8px)', 
                      padding: '12px 14px' 
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 700, 
                        color: skillOverview.overallScore >= 70 ? 'var(--success-text)' : skillOverview.overallScore >= 50 ? 'var(--warning-text)' : 'var(--error-text)',
                        lineHeight: 1.2
                      }}>
                        {skillOverview.overallScore !== null ? `${skillOverview.overallScore}%` : '—'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Proficiency Index
                      </div>
                    </div>

                    <div style={{ 
                      backgroundColor: 'var(--bg-card-subtle)', 
                      border: '1px solid var(--border-subtle)', 
                      borderRadius: 'var(--radius-md, 8px)', 
                      padding: '12px 14px' 
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 700, 
                        color: 'var(--error-text)',
                        lineHeight: 1.2
                      }}>
                        {skillOverview.counts?.needsImprovement || 0}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Critical Gaps (&lt;60%)
                      </div>
                    </div>
                  </div>

                  {skillOverview.topRecommendations?.[0] && (
                    <div style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <strong style={{ color: 'var(--primary-text)' }}>Top Gap: </strong>
                      {skillOverview.topRecommendations[0].skillName} — {skillOverview.topRecommendations[0].recommendedAction}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  padding: '20px 14px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem'
                }}>
                  No evaluated interview answers yet. Complete a mock session to unlock your skill gap analysis.
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', marginTop: '16px' }}>
              <Link
                to="/skills"
                style={{
                  color: 'var(--primary-text)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Explore Skill Breakdown & Recommendations</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;
