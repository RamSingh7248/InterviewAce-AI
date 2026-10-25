import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import {
  Calendar,
  Award,
  ArrowRight,
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  HelpCircle,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Button from '../components/ui/Button';

export const SessionHistory = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const fetchHistory = async (pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum.toString());
      params.append('limit', '10');
      if (search.trim()) params.append('search', search.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedStatus) params.append('status', selectedStatus);

      const res = await api.get(`/interviews?${params.toString()}`);
      if (res.data && res.data.status === 'success') {
        setInterviews(res.data.interviews || []);
        setPagination(res.data.pagination || { page: pageNum, limit: 10, total: 0, pages: 1 });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load past interview sessions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get('/questions/categories');
        if (res.data?.categories) {
          setCategories(res.data.categories);
        }
      } catch (e) {
        console.warn('Failed to load categories:', e.message);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    fetchHistory(page);
  }, [page, selectedCategory, selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchHistory(1);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#eab308';
    return '#ef4444';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', paddingBottom: '80px' }}>
      {/* Top Navigation */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Session History & Past Feedback</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="primary" onClick={() => navigate('/interview/setup')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', padding: '7px 16px' }}>
            <RotateCcw size={14} /> New Mock Session
          </Button>
          <UserMenu />
        </div>
      </header>

      <main style={{ maxWidth: '1040px', margin: '32px auto 0 auto', padding: '0 20px' }}>
        {/* Header Title */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
            <Layers size={14} /> Comprehensive Track Record
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Interview Session History
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Review past scores, model answers, identified mistakes, and 5-dimensional evaluations across all your mock rounds.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 240px', minWidth: '220px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search category, topic, or target role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>
            <Button type="submit" variant="secondary" style={{ padding: '8px 14px', fontSize: '0.84rem' }}>
              Search
            </Button>
          </form>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              style={{
                padding: '8px 12px',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Categories {categories.length > 0 ? `(${categories.length})` : ''}</option>
              {categories.map(cat => (
                <option key={cat.id || cat.name} value={cat.id || cat.name}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
              style={{
                padding: '8px 12px',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
            <Loader2 size={36} className="animate-spin" color="var(--primary-color)" />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Loading past interview sessions...</p>
          </div>
        ) : error ? (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', padding: '20px', color: '#ef4444', textAlign: 'center' }}>
            {error}
          </div>
        ) : interviews.length === 0 ? (
          /* Empty State */
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '16px',
            padding: '50px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
              <Layers size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Past Interview Sessions Found</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {search || selectedCategory || selectedStatus
                ? 'No mock rounds match your active filter criteria. Try clearing filters or searching another category.'
                : 'Take your first technical mock interview now to receive deep-dive AI feedback, dimensional scoring, and skill gap telemetry.'}
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/interview/setup')}
              style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontWeight: 700 }}
            >
              <RotateCcw size={15} /> Start Your First Mock Interview
            </Button>
          </div>
        ) : (
          /* Sessions List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {interviews.map((session) => {
              const score = session.finalScore ?? 0;
              const isCompleted = session.status === 'completed';
              const scoreColor = isCompleted ? getScoreColor(score) : 'var(--text-muted)';
              const evaluatedCount = (session.questions || []).filter(q => q.isAnswered).length;

              return (
                <div
                  key={session._id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.74rem', backgroundColor: 'rgba(56,189,248,0.12)', color: 'var(--primary-color)', padding: '3px 10px', borderRadius: '14px', fontWeight: 700 }}>
                        {session.category}
                      </span>
                      {session.difficulty && (
                        <span style={{
                          fontSize: '0.72rem',
                          backgroundColor: session.difficulty === 'Hard' ? 'rgba(239,68,68,0.12)' : session.difficulty === 'Medium' ? 'rgba(168,85,247,0.12)' : 'rgba(34,197,94,0.12)',
                          color: session.difficulty === 'Hard' ? '#ef4444' : session.difficulty === 'Medium' ? '#a855f7' : '#16a34a',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 600
                        }}>
                          {session.difficulty}
                        </span>
                      )}
                      {session.targetRole && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          🎯 {session.targetRole}
                        </span>
                      )}
                      {isCompleted ? (
                        <span style={{ fontSize: '0.72rem', color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                          ✓ Completed
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: '#eab308', backgroundColor: 'rgba(234,179,8,0.1)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                          ⏳ In Progress
                        </span>
                      )}
                    </div>

                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.08rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {session.topic ? `${session.category} · ${session.topic}` : `${session.category} Comprehensive Round`}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {formatDate(session.createdAt)}
                      </span>
                      <span>
                        • {session.totalQuestions || 5} Questions ({evaluatedCount} Answered)
                      </span>
                    </div>
                  </div>

                  {/* Score & Review Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    {isCompleted ? (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                          {score}%
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Overall Score
                        </div>
                      </div>
                    ) : null}

                    {isCompleted ? (
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/interview/${session._id}/results`)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', padding: '8px 16px', fontWeight: 600 }}
                      >
                        Review Feedback <ArrowRight size={14} />
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/interview/${session._id}`)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', padding: '8px 16px', fontWeight: 600 }}
                      >
                        Resume Mock <ArrowRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
            <Button
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '0.82rem' }}
            >
              <ChevronLeft size={16} /> Previous
            </Button>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Page {pagination.page} of {pagination.pages} ({pagination.total} total sessions)
            </span>
            <Button
              variant="secondary"
              disabled={page >= pagination.pages}
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '0.82rem' }}
            >
              Next <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SessionHistory;
