import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import UserMenu from '../components/UserMenu';
import Button from '../components/ui/Button';
import { 
  Sparkles, 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Target, 
  Sliders, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Save,
  Lock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import '../styles/auth.css';

const ALL_CATEGORIES = [
  'Java',
  'DSA',
  'SQL/DBMS',
  'JavaScript',
  'React',
  'Node.js',
  'Full Stack',
  'OOP',
  'Computer Networks',
  'Operating Systems',
  'System Design'
];

const TARGET_ROLES = [
  'Software Engineer',
  'SDE-1',
  'Junior Software Engineer',
  'Software Engineer Intern',
  'Graduate Engineer Trainee',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Java Developer',
  'Data/SQL Engineer'
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const QUESTION_COUNTS = [3, 5, 7, 10];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    college: '',
    graduationYear: '',
    targetRole: 'Software Engineer',
    preferredDifficulty: 'Medium',
    preferredCategories: ['Java', 'DSA', 'React', 'SQL/DBMS'],
    preferredQuestionCount: 5,
    resumeSkillsText: ''
  });

  // Change Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  // Populate form with current user values
  const syncFormDataWithUser = (u) => {
    if (!u) return;
    setFormData({
      name: u.name || '',
      phoneNumber: u.phoneNumber || '',
      college: u.college || '',
      graduationYear: u.graduationYear || '',
      targetRole: u.preferences?.targetRole || 'Software Engineer',
      preferredDifficulty: u.preferences?.preferredDifficulty || 'Medium',
      preferredCategories: u.preferences?.preferredCategories?.length > 0 
        ? u.preferences.preferredCategories 
        : ['Java', 'DSA', 'React'],
      preferredQuestionCount: u.preferences?.preferredQuestionCount || 5,
      resumeSkillsText: u.resumeSkillsText || ''
    });
  };

  useEffect(() => {
    if (user) {
      syncFormDataWithUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [searchParams]);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Cancel edit - restore original values
      syncFormDataWithUser(user);
      setError('');
      setIsEditing(false);
      setSearchParams({});
    } else {
      setError('');
      setSuccessMsg('');
      setIsEditing(true);
      setSearchParams({ edit: 'true' });
    }
  };

  const handleCategoryToggle = (cat) => {
    setFormData(prev => {
      const exists = prev.preferredCategories.includes(cat);
      if (exists) {
        if (prev.preferredCategories.length <= 1) return prev; // Keep at least 1
        return {
          ...prev,
          preferredCategories: prev.preferredCategories.filter(c => c !== cat)
        };
      } else {
        return {
          ...prev,
          preferredCategories: [...prev.preferredCategories, cat]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Full Name must be at least 2 characters long.');
      return;
    }

    if (formData.graduationYear && !/^\d{4}$/.test(formData.graduationYear.trim())) {
      setError('Graduation year must be a 4-digit year (e.g. 2026).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        college: formData.college.trim(),
        graduationYear: formData.graduationYear.trim(),
        resumeSkillsText: formData.resumeSkillsText ? formData.resumeSkillsText.trim() : '',
        preferences: {
          targetRole: formData.targetRole,
          preferredDifficulty: formData.preferredDifficulty,
          preferredCategories: formData.preferredCategories,
          preferredQuestionCount: formData.preferredQuestionCount
        }
      };

      const response = await api.patch('/auth/profile', payload);

      if (response.data && response.data.status === 'success' && response.data.user) {
        updateUser(response.data.user);
        setSuccessMsg('Your profile and interview preferences have been updated successfully.');
        setIsEditing(false);
        setSearchParams({});
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save profile changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (!passwordData.currentPassword) {
      setPwError('Current password is required');
      return;
    }
    if (!passwordData.newPassword) {
      setPwError('New password is required');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPwError('New password must be at least 8 characters');
      return;
    }
    if (!/[A-Za-z]/.test(passwordData.newPassword) || !/\d/.test(passwordData.newPassword)) {
      setPwError('New password must contain at least one letter and one number');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPwError('New passwords do not match');
      return;
    }

    setPwLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      });
      setPwSuccess('Your password has been changed successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPwError(err.response?.data?.message || 'Failed to change password. Please check your current password.');
    } finally {
      setPwLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Active Candidate';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', paddingBottom: '80px', transition: 'background-color var(--transition-fast), color var(--transition-fast)' }}>
      
      {/* Header Bar */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
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
              fontSize: '0.88rem',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: 'var(--radius-md, 8px)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>InterviewAce AI</span>
          </div>
        </div>

        {/* User Navigation Dropdown */}
        <UserMenu />
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '960px', margin: '36px auto 0 auto', padding: '0 20px' }}>
        
        {/* Alerts */}
        {error && (
          <div className="auth-alert-error" style={{ marginBottom: '24px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--success-subtle)',
            border: '1px solid var(--success)',
            borderRadius: '10px',
            padding: '14px 18px',
            color: 'var(--success-text)',
            fontSize: '0.9rem',
            marginBottom: '24px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Section A: Profile Header Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg, 12px)',
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-card)',
          transition: 'all var(--transition-fast)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Avatar Circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
            }}>
              {getInitials(user?.name)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {user?.name || 'Engineer'}
                </h1>
                <span style={{
                  backgroundColor: 'var(--success-subtle)',
                  color: 'var(--success-text)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                  Active Account
                </span>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                {user?.email}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: 'var(--primary-subtle)',
                  color: 'var(--primary-text)',
                  border: '1px solid var(--primary-border)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  {user?.preferences?.targetRole || 'Software Engineer'}
                </span>

                <span style={{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem'
                }}>
                  Level: <strong style={{ color: 'var(--text-primary)' }}>{user?.preferences?.preferredDifficulty || 'Medium'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Edit / Cancel Toggle Button */}
          <button
            type="button"
            onClick={handleToggleEdit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isEditing ? 'var(--bg-subtle)' : 'var(--primary-subtle)',
              border: isEditing ? '1px solid var(--border-subtle)' : '1px solid var(--primary-border)',
              color: isEditing ? 'var(--text-secondary)' : 'var(--primary-text)',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {isEditing ? (
              <>
                <X size={16} />
                <span>Cancel Editing</span>
              </>
            ) : (
              <>
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* View Mode vs Edit Mode */}
        {!isEditing ? (
          /* ========================================================
             READ-ONLY PROFILE VIEW
             ======================================================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Section B: Personal Information */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserIcon size={18} color="var(--primary-text)" /> Personal Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{user?.name}</span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Registered Email</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{user?.email}</span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Phone Number</span>
                  <span style={{ fontSize: '0.95rem', color: user?.phoneNumber ? 'var(--text-primary)' : 'var(--text-muted)', fontStyle: user?.phoneNumber ? 'normal' : 'italic' }}>
                    {user?.phoneNumber || 'Not added'}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>College / University</span>
                  <span style={{ fontSize: '0.95rem', color: user?.college ? 'var(--text-primary)' : 'var(--text-muted)', fontStyle: user?.college ? 'normal' : 'italic' }}>
                    {user?.college || 'Not added'}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Graduation Year</span>
                  <span style={{ fontSize: '0.95rem', color: user?.graduationYear ? 'var(--text-primary)' : 'var(--text-muted)', fontStyle: user?.graduationYear ? 'normal' : 'italic' }}>
                    {user?.graduationYear || 'Not added'}
                  </span>
                </div>
              </div>
            </div>

            {/* Section C: Career & Interview Preferences */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="var(--warning-text)" /> Career & Interview Preferences
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Job Role</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--warning-text)' }}>
                    {user?.preferences?.targetRole || 'Software Engineer'}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Default Difficulty</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent, #a855f7)' }}>
                    {user?.preferences?.preferredDifficulty || 'Medium'}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Session Question Count</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-text)' }}>
                    {user?.preferences?.preferredQuestionCount || 5} Questions
                  </span>
                </div>
              </div>

              {/* Preferred Technical Subjects */}
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                  Preferred Technical Subjects:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {user?.preferences?.preferredCategories && user.preferences.preferredCategories.length > 0 ? (
                    user.preferences.preferredCategories.map(cat => (
                      <span
                        key={cat}
                        style={{
                          backgroundColor: 'var(--primary-subtle)',
                          border: '1px solid var(--primary-border)',
                          color: 'var(--primary-text)',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.82rem',
                          fontWeight: 500
                        }}
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      No subjects selected (defaults to Java, DSA, React)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section D: Account Information */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--success-text)" /> Account Details & Security
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Member Since</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{memberSince}</span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Authentication Status</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--success-text)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Verified & Active
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Credential Protection</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Salted bcrypt (Never exposed)</span>
                </div>
              </div>
            </div>

            {/* Section: Change Password & Security */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 6px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={18} color="var(--primary)" /> Change Password
              </h2>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Keep your account secure by using a strong password. Current password verification is required.
              </p>

              {pwError && (
                <div className="auth-alert-error" style={{ marginBottom: '16px' }}>
                  <AlertCircle size={16} />
                  <span>{pwError}</span>
                </div>
              )}

              {pwSuccess && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--success-subtle)',
                  border: '1px solid var(--success)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: 'var(--success-text)',
                  fontSize: '0.88rem',
                  marginBottom: '16px'
                }}>
                  <CheckCircle2 size={16} />
                  <span>{pwSuccess}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPasswordInput" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Current Password <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="currentPasswordInput"
                      type={showCurrentPw ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 40px 10px 12px',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      aria-label="Toggle password visibility"
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPasswordInput" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    New Password <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="newPasswordInput"
                      type={showNewPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Min 8 chars, 1 letter & 1 digit"
                      value={passwordData.newPassword}
                      onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 40px 10px 12px',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      aria-label="Toggle password visibility"
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label htmlFor="confirmPasswordInput" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Confirm New Password <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <input
                    id="confirmPasswordInput"
                    type={showNewPw ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Re-enter new password"
                    value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Submit Change */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={pwLoading}
                    style={{ minWidth: '160px', height: '42px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {pwLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>Update Password</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Section E: Resume Skills & Projects Context */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#818cf8" /> Resume Skills &amp; Projects (AI Interview Context)
                </h2>
                <Button variant="ghost" size="sm" onClick={() => { setIsEditing(true); setSearchParams({ edit: 'true' }); }}>
                  <Edit3 size={14} /> Edit Context
                </Button>
              </div>
              <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Paste skills, frameworks, and project descriptions from your resume. The AI interviewer uses this as interview context to personalize questions and follow-ups. You can edit or delete this anytime.
              </p>
              {user?.resumeSkillsText ? (
                <pre style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '16px',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'inherit',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {user.resumeSkillsText}
                </pre>
              ) : (
                <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: 'var(--bg-card-subtle)', border: '1px dashed var(--border-subtle)', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    No resume context added yet. Add your tech stack and project highlights to give the AI interviewer tailored context.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => { setIsEditing(true); setSearchParams({ edit: 'true' }); }}>
                    Add Resume Context
                  </Button>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* ========================================================
             EDIT PROFILE FORM
             ======================================================== */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Edit Section 1: Personal Info */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserIcon size={18} color="var(--primary-text)" /> Edit Personal Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label htmlFor="nameInput" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Full Name <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <input
                    id="nameInput"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="emailInput" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Email Address (Login Identifier)
                  </label>
                  <input
                    id="emailInput"
                    type="email"
                    disabled
                    value={user?.email || ''}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="phoneInput" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phoneInput"
                    type="tel"
                    placeholder="e.g. +1 555-0199 or 9876543210"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="collegeInput" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    College / University (Optional)
                  </label>
                  <input
                    id="collegeInput"
                    type="text"
                    placeholder="e.g. Stanford University or IIT Bombay"
                    value={formData.college}
                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="gradYearInput" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Graduation Year (Optional)
                  </label>
                  <input
                    id="gradYearInput"
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 2026"
                    value={formData.graduationYear}
                    onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Edit Section 2: Career Preferences */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="var(--warning-text)" /> Edit Career & Mock Interview Preferences
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="targetRoleSelect" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Target Job Role
                  </label>
                  <select
                    id="targetRoleSelect"
                    value={formData.targetRole}
                    onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {TARGET_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Default Difficulty Level
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {DIFFICULTIES.map(diff => {
                      const isSelected = formData.preferredDifficulty === diff;
                      return (
                        <button
                          type="button"
                          key={diff}
                          onClick={() => setFormData({ ...formData, preferredDifficulty: diff })}
                          style={{
                            flex: 1,
                            padding: '9px 0',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            border: isSelected ? '2px solid var(--accent, #a855f7)' : '1px solid var(--border-subtle)',
                            backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-card-subtle)',
                            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {diff}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Default Question Count
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {QUESTION_COUNTS.map(count => {
                      const isSelected = formData.preferredQuestionCount === count;
                      return (
                        <button
                          type="button"
                          key={count}
                          onClick={() => setFormData({ ...formData, preferredQuestionCount: count })}
                          style={{
                            flex: 1,
                            padding: '9px 0',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                            backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                            color: isSelected ? 'var(--primary-text)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Multi-select Category Chips */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Preferred Technical Subjects (Click to toggle):
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ALL_CATEGORIES.map(cat => {
                    const isSelected = formData.preferredCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                          color: isSelected ? 'var(--primary-text)' : 'var(--text-muted)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected && '✓ '}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Edit Section: Resume Skills & Projects */}
              <div style={{ marginTop: '20px' }}>
                <label htmlFor="resumeSkillsInput" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <Sparkles size={15} color="#818cf8" /> Resume Skills &amp; Key Projects (AI Context):
                </label>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Paste your resume skills, tech stack, and key projects as plain text. The AI interviewer uses this solely as interview context to ask relevant architectural and trade-off questions.
                </p>
                <textarea
                  id="resumeSkillsInput"
                  rows={6}
                  value={formData.resumeSkillsText}
                  onChange={e => setFormData({ ...formData, resumeSkillsText: e.target.value })}
                  placeholder="e.g. Languages: Java, Python, TypeScript. Frameworks: Spring Boot, React, Node.js, Express. Projects: Built an event-driven payment processing pipeline using Kafka, Redis caching, and PostgreSQL with 99.99% uptime..."
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '16px 24px',
              boxShadow: 'var(--shadow-card)',
              transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
            }}>
              <Button
                type="button"
                variant="secondary"
                disabled={loading}
                onClick={handleToggleEdit}
                style={{ cursor: 'pointer' }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                style={{ minWidth: '160px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>

          </form>
        )}

      </main>
    </div>
  );
};

export default Profile;
