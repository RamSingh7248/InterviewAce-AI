import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import api from '../services/api';
import '../styles/auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'New password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = 'Password must contain at least one letter and one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);

    try {
      await api.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword
      });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Password reset token is invalid or has expired.';
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        
        {/* Left Branding Panel */}
        <div className="auth-left">
          <div>
            <div className="brand-badge">
              <div className="brand-icon-box">
                <Sparkles size={22} />
              </div>
              <h2 className="brand-title">InterviewAce AI</h2>
            </div>

            <div className="brand-hero-text">
              <h1 className="brand-headline">
                Secure Account <br />
                <span>Password Reset.</span>
              </h1>
              <p className="brand-tagline">
                Set a strong, new password to protect your interview progress, mock transcripts, and performance analytics.
              </p>
            </div>

            <ul className="brand-features">
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="feature-text">Strict Password Standards</div>
                  <div className="feature-subtext">Minimum 8 characters with at least one letter and one digit</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Instant Session Activation</div>
                  <div className="feature-subtext">All active tokens are refreshed and secured upon reset</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="brand-footer">
            <span className="proof-text">
              Antigravity-engineered for reliable mock interview evaluations.
            </span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-right">
          <div className="auth-card">
            
            <div className="card-header">
              <h2 className="card-title">Set New Password</h2>
              <p className="card-subtitle">
                Create a new password for your InterviewAce AI account
              </p>
            </div>

            {serverError && (
              <div className="auth-alert-error" style={{ marginBottom: '16px' }}>
                <AlertCircle size={18} />
                <span>{serverError}</span>
              </div>
            )}

            {success ? (
              <div style={{ textAlign: 'left', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '24px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', marginBottom: '10px', fontWeight: 600 }}>
                  <CheckCircle2 size={20} />
                  <span>Password Reset Complete</span>
                </div>
                <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  Your password has been successfully updated. You can now log in with your new credentials.
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/login')}
                >
                  <span>Sign In with New Password</span>
                  <ArrowRight size={17} />
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {/* New Password */}
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <div className="input-container">
                    <Lock className="input-icon-left" size={19} />
                    <input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Min 8 chars, 1 letter & 1 number"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                      }}
                      className={`form-input ${errors.password ? 'input-error' : ''}`}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-text">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="form-group">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <div className="input-container">
                    <Lock className="input-icon-left" size={19} />
                    <input
                      id="confirmNewPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }}
                      className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-text">
                      <AlertCircle size={14} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  fullWidth
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Updating password...</span>
                    </>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </Button>

                <div className="auth-card-footer">
                  <p className="footer-prompt">
                    <Link to="/login" className="auth-switch-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <ArrowLeft size={15} /> Back to Sign In
                    </Link>
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
