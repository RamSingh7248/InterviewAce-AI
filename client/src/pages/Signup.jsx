import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms & conditions';
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
      await signup({
        name: fullName.trim(),
        email: email.trim(),
        password
      });

      navigate('/login', {
        state: {
          registeredMessage: 'Account created successfully! Please sign in with your credentials.'
        }
      });
    } catch (err) {
      const msg = err.response?.data?.message || (err.message === 'Network Error' ? 'Unable to connect to backend server. Please verify backend is running.' : 'Registration failed. Please try again.');
      if (msg.toLowerCase().includes('already exists') || msg.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: msg }));
      }
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
                Start Practicing in <br />
                <span>Under 2 Minutes.</span>
              </h1>
              <p className="brand-tagline">
                Join thousands of candidates who transformed their interview preparation with realistic AI mock sessions and instant scoring.
              </p>
            </div>

            <ul className="brand-features">
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Curated Industry Questions</div>
                  <div className="feature-subtext">Comprehensive bank with modern frameworks and algorithms</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Personalized Feedback & Tips</div>
                  <div className="feature-subtext">Pinpoints exact areas for improvement and model answers</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Zero Setup Friction</div>
                  <div className="feature-subtext">Instant practice sessions with customizable difficulty</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="brand-footer">
            <div className="proof-avatars">
              <div className="proof-avatar">JD</div>
              <div className="proof-avatar">SK</div>
              <div className="proof-avatar">AM</div>
            </div>
            <span className="proof-text">
              Trusted by 10,000+ developers actively preparing
            </span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-right">
          <div className="auth-card">
            
            <div className="card-header">
              <h2 className="card-title">Create Account</h2>
              <p className="card-subtitle">
                Get started with your free mock interview practice
              </p>
            </div>

            {serverError && (
              <div className="auth-alert-error">
                <AlertCircle size={18} />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <div className="input-container">
                  <User className="input-icon-left" size={19} />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="error-text">
                    <AlertCircle size={14} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
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
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="error-text">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <Lock className="input-icon-left" size={19} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
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

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <div className="input-container">
                  <Lock className="input-icon-left" size={19} />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
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

              {/* Terms Checkbox */}
              <div className="form-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                    }}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-label-text">
                    I agree to the <a href="#terms" onClick={e => e.preventDefault()} style={{ color: '#3b82f6', textDecoration: 'underline' }}>Terms of Service</a> & <a href="#privacy" onClick={e => e.preventDefault()} style={{ color: '#3b82f6', textDecoration: 'underline' }}>Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && (
                  <p className="error-text">
                    <AlertCircle size={14} />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitting}
                variant="primary"
                fullWidth
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </Button>

              {/* Footer Switch Prompt */}
              <div className="auth-card-footer">
                <p className="footer-prompt">
                  Already have an account?{' '}
                  <Link to="/login" className="auth-switch-link">
                    Sign In
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
