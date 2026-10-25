import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import OnboardingModal from '../components/OnboardingModal';
import Button from '../components/ui/Button';
import { 
  Sparkles, 
  Award, 
  CheckCircle2,
  ArrowRight, 
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
  Target,
  Calendar,
  CheckSquare,
  Square,
  Flame,
  BookOpen,
  Code2,
  Play,
  RotateCcw,
  Trash2,
  AlertCircle,
  BarChart3,
  Compass,
  Zap,
  Menu,
  X
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({ completedCount: 0, averageScore: null, recent: [] });
  const [skillOverview, setSkillOverview] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [togglingTaskId, setTogglingTaskId] = useState(null);
  const [discardingSession, setDiscardingSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if onboarding is needed
  useEffect(() => {
    if (user && user.onboardingCompleted === false) {
      setShowOnboarding(true);
    }
  }, [user]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, skillsRes, planRes, inProgressRes] = await Promise.allSettled([
        api.get('/interviews/stats'),
        api.get('/skills/overview'),
        api.get('/prep-plan/current'),
        api.get('/interviews?status=in_progress&limit=1')
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.data?.status === 'success') {
        setStats(statsRes.value.data.stats || { completedCount: 0, averageScore: null, recent: [] });
      }

      if (skillsRes.status === 'fulfilled' && skillsRes.value?.data?.status === 'success') {
        setSkillOverview(skillsRes.value.data.data || null);
      }

      if (planRes.status === 'fulfilled' && planRes.value?.data?.status === 'success') {
        setCurrentPlan(planRes.value.data.plan || null);
      }

      if (inProgressRes.status === 'fulfilled' && inProgressRes.value?.data?.status === 'success') {
        const inProg = inProgressRes.value.data.interviews?.[0];
        setActiveSession(inProg || null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle Prep Plan task toggling
  const handleTogglePlanTask = async (taskId, currentStatus) => {
    if (!currentPlan) return;
    const targetDayNumber = currentPlan.currentDay || 1;
    setTogglingTaskId(taskId);
    try {
      const res = await api.put(`/prep-plan/tasks/${taskId}/toggle`, {
        dayNumber: targetDayNumber,
        completed: !currentStatus
      });
      if (res.data?.status === 'success') {
        setCurrentPlan(res.data.plan);
      }
    } catch (err) {
      console.warn('Failed to toggle prep task:', err.message);
    } finally {
      setTogglingTaskId(null);
    }
  };

  // Discard incomplete session
  const handleDiscardSession = async (sessionId) => {
    if (!sessionId) return;
    setDiscardingSession(true);
    try {
      await api.delete(`/interviews/${sessionId}`);
      setActiveSession(null);
    } catch (err) {
      console.warn('Failed to discard session:', err.message);
    } finally {
      setDiscardingSession(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreBadgeBg = (score) => {
    if (score >= 70) return 'rgba(16, 185, 129, 0.12)';
    if (score >= 50) return 'rgba(245, 158, 11, 0.12)';
    return 'rgba(239, 68, 68, 0.12)';
  };

  // Generate dynamic motivational message based on performance
  const getMotivationalStatus = () => {
    const count = stats.completedCount || 0;
    const avg = stats.averageScore;
    if (count === 0) {
      return "🚀 Welcome! Complete your first diagnostic mock to benchmark readiness for your target role.";
    }
    if (avg >= 80) {
      return "🔥 Outstanding work! You are performing in the top tier with consistent 80%+ scores.";
    }
    if (avg >= 65) {
      return "📈 Great momentum! Your practice sessions show steady improvement across core topics.";
    }
    return "💡 Keep pushing! Targeted revision of missed concepts will quickly boost your scores.";
  };

  const streakDays = currentPlan?.streakDays || (stats.completedCount > 0 ? Math.min(stats.completedCount, 3) : 0);
  const readinessPercent = skillOverview?.overallScore ?? (stats.averageScore ? Math.round(stats.averageScore * 0.95) : null);

  // Score trend data
  const trendHistory = skillOverview?.scoreHistory?.length 
    ? skillOverview.scoreHistory 
    : (stats.recent?.length ? stats.recent.map(r => ({ score: r.finalScore, category: r.category, date: r.createdAt })).reverse() : []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page, #0b0f19)',
      color: 'var(--text-primary, #f9fafb)',
      transition: 'background-color 0.15s ease, color 0.15s ease'
    }}>
      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Main Top Header */}
      <header style={{
        backgroundColor: 'var(--bg-surface, #111827)',
        borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
              borderRadius: '8px',
              backgroundColor: 'var(--primary, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)'
            }}>
              <Sparkles size={17} />
            </div>
            <span style={{ 
              fontSize: '1.15rem', 
              fontWeight: 700, 
              color: 'var(--text-primary, #ffffff)', 
              letterSpacing: '-0.01em' 
            }}>
              InterviewAce AI
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {[
              { label: 'Dashboard', path: '/dashboard', active: location.pathname === '/dashboard' },
              { label: 'New Interview', path: '/interview/setup', active: location.pathname === '/interview/setup' && !location.search.includes('live_coding') },
              { label: 'History', path: '/history', active: location.pathname === '/history' },
              { label: 'Skill Gap', path: '/skills', active: location.pathname === '/skills' },
              { label: 'Prep Plan', path: '/plan', active: location.pathname === '/plan' },
              { label: 'Coding Practice', path: '/interview/setup?mode=live_coding', active: location.search.includes('live_coding') }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: item.active ? 600 : 500,
                  color: item.active ? 'var(--primary, #3b82f6)' : 'var(--text-secondary, #9ca3af)',
                  backgroundColor: item.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: User Menu & Mobile Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserMenu />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary, #fff)',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface, #111827)',
          borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
          padding: '12px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'New Interview', path: '/interview/setup' },
            { label: 'History', path: '/history' },
            { label: 'Skill Gap', path: '/skills' },
            { label: 'Prep Plan', path: '/plan' },
            { label: 'Coding Practice', path: '/interview/setup?mode=live_coding' }
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                color: 'var(--text-primary, #fff)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Container */}
      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '28px 20px 60px 20px' }}>
        
        {/* Real Error State */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            color: '#ef4444'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '0.9rem' }}>{error}</span>
            </div>
            <Button size="sm" variant="outline" onClick={fetchDashboardData}>
              <RotateCcw size={14} /> Retry
            </Button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Banner Skeleton */}
            <div style={{
              height: '140px',
              backgroundColor: 'var(--bg-surface, #111827)',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
              animation: 'pulse 1.5s infinite ease-in-out'
            }} />
            {/* Stats Cards Skeleton */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  height: '105px',
                  backgroundColor: 'var(--bg-surface, #111827)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Section 1: Welcome & Motivational Section */}
            <section style={{
              backgroundColor: 'var(--bg-surface, #111827)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              borderRadius: '16px',
              padding: '24px 28px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    <Flame size={14} />
                    <span>{streakDays} Day Streak</span>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9ca3af)' }}>
                    • Role Target: <strong style={{ color: 'var(--text-primary, #fff)' }}>{user?.preferences?.targetRole || 'Software Engineer'}</strong>
                  </span>
                </div>

                <h1 style={{
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                  color: 'var(--text-primary, #fff)',
                  letterSpacing: '-0.02em'
                }}>
                  Welcome back, {user?.name || 'Engineer'}
                </h1>

                <p style={{
                  color: 'var(--text-secondary, #9ca3af)',
                  margin: 0,
                  fontSize: '0.92rem',
                  lineHeight: '1.5'
                }}>
                  {getMotivationalStatus()}
                </p>
              </div>

              {/* Quick Actions Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
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
                  <Play size={15} fill="currentColor" />
                  <span>Start New Interview</span>
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => navigate('/interview/setup?mode=live_coding')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 16px',
                    height: '42px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  <Code2 size={16} />
                  <span>Practice Coding</span>
                </Button>
              </div>
            </section>

            {/* Section 2: Key Stats Cards (4 Metrics) */}
            <section style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Total Interviews */}
              <div style={{
                backgroundColor: 'var(--bg-surface, #111827)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(37, 99, 235, 0.12)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.1 }}>
                    {stats.completedCount}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', marginTop: '4px' }}>
                    Total Interviews Taken
                  </div>
                </div>
              </div>

              {/* Average Score */}
              <div style={{
                backgroundColor: 'var(--bg-surface, #111827)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    lineHeight: 1.1,
                    color: stats.averageScore !== null ? getScoreColor(stats.averageScore) : 'var(--text-muted)'
                  }}>
                    {stats.averageScore !== null ? `${stats.averageScore}%` : '—'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', marginTop: '4px' }}>
                    Average Mock Score
                  </div>
                </div>
              </div>

              {/* Current Streak */}
              <div style={{
                backgroundColor: 'var(--bg-surface, #111827)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Flame size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.1, color: '#f59e0b' }}>
                    {streakDays} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>days</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', marginTop: '4px' }}>
                    Active Daily Streak
                  </div>
                </div>
              </div>

              {/* Target Role Readiness */}
              <div style={{
                backgroundColor: 'var(--bg-surface, #111827)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  color: '#a855f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.1, color: '#a855f7' }}>
                    {readinessPercent !== null ? `${readinessPercent}%` : 'Calibrating'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', marginTop: '4px' }}>
                    {readinessPercent !== null ? 'Target Role Readiness' : 'Take diagnostic mock'}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: "Continue where you left off" */}
            {(activeSession || currentPlan) && (
              <section style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: activeSession && currentPlan ? '1fr 1fr' : '1fr', gap: '20px' }}>
                  
                  {/* Incomplete Interview Resume Card */}
                  {activeSession && (
                    <div style={{
                      backgroundColor: 'rgba(37, 99, 235, 0.07)',
                      border: '1px solid rgba(37, 99, 235, 0.25)',
                      borderRadius: '14px',
                      padding: '20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: '#60a5fa',
                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            <Play size={11} fill="currentColor" /> Session In Progress
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #9ca3af)' }}>
                            Question {(activeSession.currentQuestionIndex || 0) + 1} of {activeSession.totalQuestions}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px 0', color: '#fff' }}>
                          {activeSession.category} • {activeSession.difficulty}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #9ca3af)' }}>
                          {activeSession.topic ? `Focus: ${activeSession.topic}` : `Target Role: ${activeSession.targetRole || 'Software Engineer'}`}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => navigate(`/interview/${activeSession._id}`)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <span>Resume Interview</span>
                          <ArrowRight size={14} />
                        </Button>

                        <button
                          type="button"
                          disabled={discardingSession}
                          onClick={() => handleDiscardSession(activeSession._id)}
                          style={{
                            background: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: 'var(--text-muted, #9ca3af)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Discard</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active Prep Plan Today's Tasks */}
                  {currentPlan && (() => {
                    const todayDay = currentPlan.schedule?.find(d => d.dayNumber === (currentPlan.currentDay || 1)) || currentPlan.schedule?.[0];
                    const dayTasks = todayDay?.tasks || [];
                    return (
                      <div style={{
                        backgroundColor: 'var(--bg-surface, #111827)',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                        borderRadius: '14px',
                        padding: '20px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Calendar size={16} color="var(--primary, #3b82f6)" />
                              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>
                                Today's Prep Plan: Day {todayDay?.dayNumber || 1} of {currentPlan.totalDays}
                              </h3>
                            </div>
                            <Link to="/plan" style={{ color: 'var(--primary, #3b82f6)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>
                              Full Roadmap →
                            </Link>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                            {dayTasks.slice(0, 3).map((task) => (
                              <div
                                key={task.taskId}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                                  borderRadius: '6px',
                                  padding: '7px 10px'
                                }}
                              >
                                <div 
                                  onClick={() => handleTogglePlanTask(task.taskId, task.completed)}
                                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1, minWidth: 0 }}
                                >
                                  <button
                                    type="button"
                                    disabled={togglingTaskId === task.taskId}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      padding: 0,
                                      cursor: 'pointer',
                                      color: task.completed ? '#10b981' : 'var(--text-muted, #9ca3af)',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {task.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                                  </button>
                                  <span style={{
                                    fontSize: '0.82rem',
                                    color: task.completed ? 'var(--text-muted, #9ca3af)' : 'var(--text-primary, #fff)',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {task.title}
                                  </span>
                                </div>
                                {task.deepLinkConfig?.category && !task.completed && (
                                  <Link
                                    to={`/interview/setup?category=${encodeURIComponent(task.deepLinkConfig.category)}`}
                                    style={{
                                      fontSize: '0.72rem',
                                      color: '#38bdf8',
                                      textDecoration: 'none',
                                      fontWeight: 600,
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      backgroundColor: 'rgba(56, 189, 248, 0.1)'
                                    }}
                                  >
                                    Launch
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted, #9ca3af)' }}>
                          <span>Roadmap Progress: {currentPlan.progressPercentage || 0}%</span>
                          <div style={{ width: '120px', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${currentPlan.progressPercentage || 0}%`, height: '100%', backgroundColor: '#2563eb' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </section>
            )}

            {/* Empty State for Brand-New User (0 Completed Sessions) */}
            {stats.completedCount === 0 ? (
              <section style={{
                backgroundColor: 'var(--bg-surface, #111827)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                borderRadius: '16px',
                padding: '48px 32px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(37, 99, 235, 0.15)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <Compass size={32} />
                </div>

                <h2 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff' }}>
                  Ready for your first AI Mock Interview?
                </h2>

                <p style={{
                  maxWidth: '560px',
                  margin: '0 auto 32px auto',
                  color: 'var(--text-secondary, #9ca3af)',
                  fontSize: '0.94rem',
                  lineHeight: '1.6'
                }}>
                  Practice realistic behavioral and system architecture questions tailored to top tech company standards. Answer verbally or with text, run live code, and receive instantaneous granular evaluation reports.
                </p>

                {/* 3 Step Breakdown */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  maxWidth: '800px',
                  margin: '0 auto 36px auto',
                  textAlign: 'left'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ color: '#3b82f6', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px' }}>
                      STEP 01
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px', color: '#fff' }}>
                      Pick Category & Mode
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9ca3af)', lineHeight: '1.4' }}>
                      Select from Java, Python, React, SQL, DSA, or Live Coding Studio.
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px' }}>
                      STEP 02
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px', color: '#fff' }}>
                      Realistic AI Questions
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9ca3af)', lineHeight: '1.4' }}>
                      Experience adaptive follow-ups that challenge and probe your answers in depth.
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px' }}>
                      STEP 03
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px', color: '#fff' }}>
                      Diagnostic Scorecard
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9ca3af)', lineHeight: '1.4' }}>
                      Unlock role readiness metrics, skill gap insights, and a daily revision roadmap.
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => navigate('/interview/setup')}
                  style={{
                    padding: '0 28px',
                    height: '46px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Take Your First Interview</span>
                </Button>
              </section>
            ) : (
              /* User With Session History: Score Trend Chart & Recent Sessions Grid */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '24px',
                marginBottom: '28px'
              }}>
                {/* Score Trend Chart Section */}
                <section style={{
                  backgroundColor: 'var(--bg-surface, #111827)',
                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BarChart3 size={18} color="var(--primary, #3b82f6)" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                          Score Trend (Recent Sessions)
                        </h2>
                      </div>
                      <Link to="/skills" style={{ fontSize: '0.78rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
                        Skill Diagnostics →
                      </Link>
                    </div>

                    {/* Trend Visualization */}
                    {trendHistory.length > 0 ? (
                      <div>
                        {/* SVG Visual Graph */}
                        <div style={{
                          height: '140px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: '10px',
                          padding: '16px 8px 8px 8px',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          marginBottom: '16px',
                          overflowX: 'auto'
                        }}>
                          {trendHistory.slice(-8).map((session, idx) => {
                            const score = Math.max(session.score || 0, 5);
                            const heightPct = Math.min(Math.round((score / 100) * 100), 100);
                            const color = getScoreColor(score);
                            return (
                              <div
                                key={idx}
                                style={{
                                  flex: 1,
                                  minWidth: '38px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '6px',
                                  height: '100%',
                                  justifyContent: 'flex-end'
                                }}
                              >
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color }}>
                                  {session.score}%
                                </span>
                                <div style={{
                                  width: '100%',
                                  maxWidth: '28px',
                                  height: `${heightPct}%`,
                                  backgroundColor: color,
                                  borderRadius: '4px 4px 0 0',
                                  transition: 'height 0.4s ease',
                                  opacity: 0.85
                                }} />
                                <span style={{
                                  fontSize: '0.66rem',
                                  color: 'var(--text-muted, #9ca3af)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '46px'
                                }}>
                                  #{idx + 1}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #9ca3af)' }}>
                          Tracking score progression over your latest mock interview assessments.
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        padding: '30px',
                        textAlign: 'center',
                        color: 'var(--text-muted, #9ca3af)',
                        fontSize: '0.85rem'
                      }}>
                        Complete multiple sessions to visualize score progression over time.
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))', paddingTop: '14px', marginTop: '16px' }}>
                    <Link
                      to="/skills"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.84rem',
                        fontWeight: 600
                      }}
                    >
                      <span>Analyze Skill Gaps & Weak Areas</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </section>

                {/* Recent Sessions List (Last 5) */}
                <section style={{
                  backgroundColor: 'var(--bg-surface, #111827)',
                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={18} color="var(--primary, #3b82f6)" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                          Recent Mock Sessions
                        </h2>
                      </div>
                      <Link to="/history" style={{ fontSize: '0.78rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
                        All History →
                      </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(stats.recent || []).slice(0, 5).map((session, idx) => (
                        <Link
                          key={session._id || idx}
                          to={`/interview/${session._id}/results`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.borderColor = 'var(--border-subtle, rgba(255, 255, 255, 0.06))';
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>
                                {session.category}
                              </span>
                              <span style={{
                                fontSize: '0.7rem',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                color: 'var(--text-muted, #9ca3af)'
                              }}>
                                {session.difficulty}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted, #9ca3af)', marginTop: '2px' }}>
                              {session.createdAt ? new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently completed'}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: getScoreColor(session.finalScore),
                              backgroundColor: getScoreBadgeBg(session.finalScore),
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              {session.finalScore}%
                            </span>
                            <ChevronRight size={14} color="var(--text-muted, #9ca3af)" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))', paddingTop: '14px', marginTop: '16px' }}>
                    <Link
                      to="/history"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.84rem',
                        fontWeight: 600
                      }}
                    >
                      <span>Review All Past Feedback Reports</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </section>
              </div>
            )}

            {/* Quick Actions Footer Bar */}
            <section style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: 'var(--bg-surface, #111827)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              borderRadius: '12px',
              padding: '16px 20px'
            }}>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-muted, #9ca3af)' }}>
                Target Role: <strong style={{ color: '#fff' }}>{user?.preferences?.targetRole || 'Software Engineer'}</strong> ({user?.preferences?.preferredDifficulty || 'Medium'})
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Button size="sm" variant="outline" onClick={() => navigate('/skills')}>
                  <Target size={14} /> View Skill Gaps
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/plan')}>
                  <Calendar size={14} /> View Prep Plan
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/interview/setup?mode=live_coding')}>
                  <Code2 size={14} /> Practice Coding
                </Button>
                <Button size="sm" variant="primary" onClick={() => navigate('/interview/setup')}>
                  <Play size={14} fill="currentColor" /> Start Interview
                </Button>
              </div>
            </section>
          </>
        )}

      </main>
    </div>
  );
}
