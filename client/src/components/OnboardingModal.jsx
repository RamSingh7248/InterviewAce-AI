import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Target, 
  Briefcase, 
  Layers, 
  ArrowRight, 
  Check, 
  Loader2,
  X
} from 'lucide-react';
import Button from './ui/Button';

const TARGET_ROLE_OPTIONS = [
  'Software Engineer',
  'SDE-1',
  'Junior Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Java Developer',
  'Data/SQL Engineer',
  'DevOps Engineer'
];

const EXPERIENCE_OPTIONS = [
  { id: 'fresher', label: 'Fresher / Student (0-1 yrs)' },
  { id: 'junior', label: 'Junior (1-3 yrs)' },
  { id: 'mid', label: 'Mid-Level (3-5 yrs)' },
  { id: 'senior', label: 'Senior / Staff (5+ yrs)' }
];

const PREFERRED_LANGUAGE_OPTIONS = [
  'Java',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'DSA',
  'SQL/DBMS',
  'System Design'
];

export default function OnboardingModal({ isOpen, onClose }) {
  const { user, completeOnboarding } = useAuth();

  const [targetRole, setTargetRole] = useState(user?.preferences?.targetRole || 'Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('junior');
  const [selectedCategories, setSelectedCategories] = useState(
    user?.preferences?.preferredCategories?.length ? user.preferences.preferredCategories : ['Java', 'DSA']
  );
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await completeOnboarding({
        targetRole,
        experienceLevel,
        preferredCategories: selectedCategories.length ? selectedCategories : ['Java', 'DSA'],
      });
      onClose();
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setSubmitting(true);
    try {
      await completeOnboarding({ skip: true });
      onClose();
    } catch {
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface, #111827)',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '540px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        color: 'var(--text-primary, #f9fafb)'
      }}>
        {/* Skip button */}
        <button
          onClick={handleSkip}
          disabled={submitting}
          aria-label="Skip onboarding"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted, #9ca3af)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
              Tailor Your Interview Practice
            </h2>
          </div>
        </div>

        <p style={{
          color: 'var(--text-secondary, #9ca3af)',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          margin: '0 0 24px 0'
        }}>
          Set your career focus once so InterviewAce AI calibrates mock difficulty, question generation, and skill diagnostics to your target role.
        </p>

        {/* Field 1: Target Role */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            <Target size={15} color="var(--primary)" /> Target Job Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-input, #1f2937)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.15))',
              borderRadius: '8px',
              padding: '10px 12px',
              color: 'var(--text-primary, #fff)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            {TARGET_ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Field 2: Experience Level */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            <Briefcase size={15} color="var(--primary)" /> Experience Level
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {EXPERIENCE_OPTIONS.map((exp) => {
              const isSelected = experienceLevel === exp.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setExperienceLevel(exp.id)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid var(--primary, #3b82f6)' : '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                    backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-input, #1f2937)',
                    color: isSelected ? 'var(--primary-text, #93c5fd)' : 'var(--text-secondary, #9ca3af)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {exp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 3: Focus Topics / Language */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            <Layers size={15} color="var(--primary)" /> Preferred Languages & Subjects
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PREFERRED_LANGUAGE_OPTIONS.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: isSelected ? '1px solid var(--primary, #3b82f6)' : '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                    backgroundColor: isSelected ? 'var(--primary, #2563eb)' : 'var(--bg-input, #1f2937)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isSelected && <Check size={13} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <button
            type="button"
            onClick={handleSkip}
            disabled={submitting}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted, #9ca3af)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              padding: '8px 12px'
            }}
          >
            Skip for now
          </button>

          <Button
            type="button"
            variant="primary"
            disabled={submitting}
            onClick={handleSave}
            style={{ minWidth: '150px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save & Continue</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
