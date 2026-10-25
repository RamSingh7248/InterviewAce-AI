import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import Button from '../components/ui/Button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Loader2, 
  RefreshCw, 
  BookOpen, 
  Code, 
  Sparkles, 
  Target, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  BookMarked,
  X,
  Play
} from 'lucide-react';
import '../styles/auth.css';

const TASK_TYPE_CONFIG = {
  diagnostic: { label: 'Diagnostic Assessment', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  study: { label: 'Concept Deep-Dive', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)' },
  practice_mock: { label: 'Adaptive Mock', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)' },
  coding: { label: 'Live Coding Studio', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  revision: { label: 'Spaced Revision', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' }
};

const PrepPlanPage = () => {
  const navigate = useNavigate();

  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedStudyNotes, setSelectedStudyNotes] = useState(null);
  const [replanning, setReplanning] = useState(false);

  // New plan creation form state
  const [isCreating, setIsCreating] = useState(false);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [level, setLevel] = useState('fresher');
  const [durationDays, setDurationDays] = useState(14);
  const [dailyMinutes, setDailyMinutes] = useState(60);

  const fetchCurrentPlan = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/prep-plan/current');
      if (res.data && res.data.status === 'success' && res.data.data?.plan) {
        setPlanData(res.data.data);
        setActiveDayIndex((res.data.data.currentDayNumber || 1) - 1);
        setIsCreating(false);
      } else {
        setPlanData(null);
        setIsCreating(true);
      }
    } catch (err) {
      console.error('Failed to load plan:', err);
      setError(err.response?.data?.message || 'Failed to load preparation plan.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentPlan();
  }, [fetchCurrentPlan]);

  const handleGeneratePlan = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/prep-plan/generate', {
        targetRole,
        level,
        durationDays,
        dailyMinutes
      });
      if (res.data && res.data.status === 'success') {
        setPlanData(res.data.data);
        setActiveDayIndex((res.data.data.currentDayNumber || 1) - 1);
        setIsCreating(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate prep plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await api.put(`/prep-plan/tasks/${taskId}/toggle`);
      if (res.data && res.data.status === 'success') {
        setPlanData(res.data.data);
      }
    } catch (err) {
      console.warn('Task toggle failed:', err.message);
    }
  };

  const handleReplan = async () => {
    if (replanning) return;
    try {
      setReplanning(true);
      const res = await api.post('/prep-plan/replan');
      if (res.data && res.data.status === 'success') {
        setPlanData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to adjust schedule.');
    } finally {
      setReplanning(false);
    }
  };

  const plan = planData?.plan;
  const days = plan?.days || [];
  const activeDay = days[activeDayIndex] || days[0];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      color: 'var(--text-primary)',
      transition: 'background-color var(--transition-fast), color var(--transition-fast)'
    }}>
      {/* Header */}
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
        zIndex: 100
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
              borderRadius: '6px'
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
              <Calendar size={16} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              Personalized Prep Plan
            </span>
          </div>
        </div>

        <UserMenu />
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px 80px 20px' }}>
        
        {/* Loading Spinner */}
        {loading && (
          <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 16px auto', color: 'var(--primary)' }} />
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
              Calibrating your customized daily interview curriculum...
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#f87171',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Create New Plan Form (When no active plan or user wants a new plan) */}
        {!loading && (isCreating || !plan) && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '700px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                color: '#818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto'
              }}>
                <Sparkles size={26} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                Generate Your Personalized Preparation Plan
              </h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                A structured daily schedule balancing study notes, adaptive mock interviews, and live coding calibrated to your skill gaps.
              </p>
            </div>

            <form onSubmit={handleGeneratePlan} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Target Role */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target Role:
                </label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
                  <option value="Software Development Engineer (SDE-2)">Software Development Engineer (SDE-2)</option>
                  <option value="Junior Software Engineer">Junior Software Engineer</option>
                  <option value="Senior Software Engineer">Senior Software Engineer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="AI Engineer">AI Engineer / GenAI Developer</option>
                </select>
              </div>

              {/* Seniority Level */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Experience Level:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { id: 'fresher', label: 'Fresher (0-1 yr)' },
                    { id: 'mid', label: 'Mid-Level (1-4 yrs)' },
                    { id: 'senior', label: 'Senior (5+ yrs)' }
                  ].map(l => (
                    <button
                      type="button"
                      key={l.id}
                      onClick={() => setLevel(l.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: level === l.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: level === l.id ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                        color: level === l.id ? 'var(--primary-text)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Plan Duration:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { days: 7, label: '7 Days', desc: 'Sprint / Rapid Prep' },
                    { days: 14, label: '14 Days', desc: 'Standard (Recommended)' },
                    { days: 30, label: '30 Days', desc: 'Comprehensive Mastery' }
                  ].map(d => (
                    <button
                      type="button"
                      key={d.days}
                      onClick={() => setDurationDays(d.days)}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: durationDays === d.days ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: durationDays === d.days ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                        color: durationDays === d.days ? 'var(--primary-text)' : 'var(--text-secondary)',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{d.label}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Time Available */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Daily Time Available:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[30, 45, 60, 90].map(mins => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setDailyMinutes(mins)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: dailyMinutes === mins ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                        backgroundColor: dailyMinutes === mins ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-subtle)',
                        color: dailyMinutes === mins ? '#38bdf8' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                style={{
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '10px',
                  fontSize: '0.95rem'
                }}
              >
                <span>Generate Plan</span>
                <ArrowRight size={16} />
              </Button>
            </form>
          </div>
        )}

        {/* Active Plan Dashboard */}
        {!loading && !isCreating && plan && (
          <div>
            {/* Header Card with Progress & Streak */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '24px 28px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-text)', backgroundColor: 'var(--primary-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                    {plan.durationDays}-DAY CURRICULUM
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f97316', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Flame size={15} />
                    <span>{plan.streakCount || 0}-Day Streak</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                  {plan.targetRole}
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {plan.dailyMinutes} mins/day • Focus on weakest skills first &amp; spaced repetition
                </div>
              </div>

              {/* Progress Bar & Re-plan Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '160px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    <span>Plan Progress</span>
                    <span style={{ color: 'var(--text-primary)' }}>{plan.progressPercentage || 0}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${plan.progressPercentage || 0}%`, height: '100%', backgroundColor: '#22c55e', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReplan}
                  disabled={replanning}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <RefreshCw size={13} className={replanning ? 'animate-spin' : ''} />
                  <span>{replanning ? 'Re-planning...' : 'Re-plan Remaining'}</span>
                </Button>
              </div>
            </div>

            {/* Day Selector Ribbon */}
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '20px'
            }}>
              {days.map((day, idx) => {
                const isSelected = idx === activeDayIndex;
                const isAllDone = day.tasks.every(t => t.isCompleted);
                return (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    style={{
                      flex: '0 0 auto',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--primary-text)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      minWidth: '85px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Day {day.dayNumber}</span>
                      {isAllDone && <CheckCircle2 size={13} color="#22c55e" />}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: isSelected ? 'var(--primary-text)' : 'var(--text-muted)' }}>
                      {day.tasks.filter(t => t.isCompleted).length}/{day.tasks.length} Done
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Day Card & Tasks */}
            {activeDay && (
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px 28px',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-text)', textTransform: 'uppercase' }}>
                      Day {activeDay.dayNumber} Focus
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
                      {activeDay.theme}
                    </h3>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>Est. {activeDay.tasks.reduce((a, b) => a + (b.estimatedMinutes || 0), 0)} mins</span>
                  </div>
                </div>

                {/* Tasks List */}
                <div style={{ display: 'grid', gap: '14px' }}>
                  {activeDay.tasks.map((task) => {
                    const cfg = TASK_TYPE_CONFIG[task.type] || TASK_TYPE_CONFIG.study;
                    return (
                      <div
                        key={task.taskId}
                        style={{
                          backgroundColor: task.isCompleted ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-card-subtle)',
                          border: task.isCompleted ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '14px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {/* Checkbox and Title */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: '1 1 300px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleTask(task.taskId)}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              color: task.isCompleted ? '#22c55e' : 'var(--text-muted)',
                              marginTop: '2px'
                            }}
                          >
                            {task.isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                          </button>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                backgroundColor: cfg.bg,
                                color: cfg.color
                              }}>
                                {cfg.label}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                {task.estimatedMinutes} mins
                              </span>
                              {task.actualScore !== undefined && (
                                <span style={{ fontSize: '0.72rem', color: '#22c55e', fontWeight: 700 }}>
                                  Score: {task.actualScore}%
                                </span>
                              )}
                            </div>

                            <div style={{
                              fontSize: '0.94rem',
                              fontWeight: 600,
                              color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                              textDecoration: task.isCompleted ? 'line-through' : 'none'
                            }}>
                              {task.title}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {task.studyNotes && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedStudyNotes(task.studyNotes)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <BookOpen size={14} />
                              <span>Study Notes</span>
                            </Button>
                          )}

                          {task.deepLink && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => navigate(task.deepLink)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <Play size={13} />
                              <span>Start Task</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Study Notes Modal */}
      {selectedStudyNotes && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            maxWidth: '620px',
            width: '100%',
            padding: '28px',
            boxShadow: 'var(--shadow-card)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookMarked size={20} color="#818cf8" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Curated Study Notes &amp; Key Concepts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudyNotes(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Key Points */}
            {selectedStudyNotes.keyPoints && selectedStudyNotes.keyPoints.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Core Principles to Articulate in Interviews:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {selectedStudyNotes.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
                </ul>
              </div>
            )}

            {/* Model Snippet */}
            {selectedStudyNotes.idealAnswerSnippet && (
              <div style={{ marginBottom: '16px', backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '0.82rem', color: 'var(--primary-text)', display: 'block', marginBottom: '6px' }}>
                  Model Explanation Mechanics:
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                  {selectedStudyNotes.idealAnswerSnippet}
                </p>
              </div>
            )}

            {/* Suggested Books / Docs by Name Only */}
            {selectedStudyNotes.suggestedResources && selectedStudyNotes.suggestedResources.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Recommended Authoritative Resources:
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedStudyNotes.suggestedResources.map((res, i) => (
                    <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#818cf8' }}>•</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="primary"
              onClick={() => setSelectedStudyNotes(null)}
              style={{ width: '100%' }}
            >
              Close Notes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepPlanPage;
