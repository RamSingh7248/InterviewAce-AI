import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(res => setTimeout(res, 900));
    setSubmitting(false);
    setSent(true);
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
                Account Recovery <br />
                <span>Made Simple.</span>
              </h1>
              <p className="brand-tagline">
                Don't worry, we'll help you get back to your interview preparation and practice history in no time.
              </p>
            </div>

            <ul className="brand-features">
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Secure Password Reset</div>
                  <div className="feature-subtext">Direct verification link to your registered inbox</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Preserve Your Practice Data</div>
                  <div className="feature-subtext">All your completed mocks and scores stay intact</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="brand-footer">
            <span className="proof-text">
              Need assistance? Support team is available 24/7.
            </span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-right">
          <div className="auth-card">
            
            <div className="card-header">
              <h2 className="card-title">Reset Password</h2>
              <p className="card-subtitle">
                Enter your email address to receive password reset instructions
              </p>
            </div>

            {sent ? (
              <div style={{ textAlign: 'left', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '24px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#60a5fa', marginBottom: '8px', fontWeight: 600 }}>
                  <CheckCircle2 size={20} />
                  <span>Reset link simulated</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  In a production environment with backend connected, a password reset link would be sent to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
                </p>
                <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                  <ArrowLeft size={16} /> Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="input-container">
                    <Mail className="input-icon-left" size={19} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className={`form-input ${error ? 'input-error' : ''}`}
                    />
                  </div>
                  {error && (
                    <p className="error-text">
                      <AlertCircle size={14} />
                      {error}
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
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
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

export default ForgotPassword;
