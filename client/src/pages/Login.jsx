import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.registeredMessage || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validate()) return;
    setSubmitting(true);
    
    try {
      await login(email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err.response?.status === 429) {
        setServerError('Too many login attempts. Please wait a few minutes before trying again.');
      } else {
        setServerError('Invalid email or password');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        
        {/* Left Branding Panel (Desktop) */}
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
                Master Your Next <br />
                <span className="brand-headline-accent">Technical Interview.</span>
              </h1>
              <p className="brand-tagline">
                Practice technical questions with interactive AI feedback, test your knowledge across key topics, and improve before real interviews.
              </p>
            </div>

            <ul className="brand-features">
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Topic-Focused Practice</div>
                  <div className="feature-subtext">Java, React, Node.js, DSA, SQL, and Full Stack questions</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Structured Feedback</div>
                  <div className="feature-subtext">Scoring on correctness, relevance, and missing concepts</div>
                </div>
              </li>
              <li className="brand-feature-item">
                <div className="feature-check-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="feature-text">Interview History & Progress</div>
                  <div className="feature-subtext">Review past mock sessions and monitor your improvements</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="brand-footer">
            <span className="proof-text">
              A personal project built for technical interview practice
            </span>
          </div>
        </div>

        {/* Right Authentication Panel */}
        <div className="auth-right">
          <div className="auth-card">
            
            <div className="card-header">
              <h2 className="card-title">Welcome back</h2>
              <p className="card-subtitle">
                Enter your credentials to access your interview workspace
              </p>
            </div>

            {successMessage && (
              <div className="auth-alert-success">
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {serverError && (
              <div className="auth-alert-error">
                <AlertCircle size={18} />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              
              {/* Email Field */}
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

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <Lock className="input-icon-left" size={19} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password Row */}
              <div className="form-options-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-label-text">Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Primary Action */}
              <Button
                type="submit"
                disabled={submitting}
                variant="primary"
                fullWidth
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </Button>

              {/* Social Login Options */}
              <div className="social-divider">
                <div className="divider-line"></div>
                <span className="divider-text">Or continue with</span>
                <div className="divider-line"></div>
              </div>

              <div className="social-buttons-grid">
                <button 
                  type="button" 
                  className="social-btn" 
                  onClick={() => alert('Social OAuth is disabled in frontend-only preview mode.')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.55 0 2.94.57 4.04 1.51l3.03-3.03C17.26 1.81 14.8 1 12 1 7.42 1 3.51 3.58 1.57 7.34l3.65 2.83C6.1 7.21 8.81 5 12 5z"/>
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.87c2.16-1.99 3.71-4.92 3.71-8.69z"/>
                    <path fill="#FBBC05" d="M5.22 14.66c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.57 7.34C.57 9.34 0 11.6 0 14s.57 4.66 1.57 6.66l3.65-2.83z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.87c-1.04.7-2.38 1.11-4.22 1.11-3.19 0-5.9-2.21-6.78-5.17L1.57 15.99C3.51 19.75 7.42 23 12 23z"/>
                  </svg>
                  <span>Google</span>
                  <span className="social-btn-badge">Demo</span>
                </button>

                <button 
                  type="button" 
                  className="social-btn"
                  onClick={() => alert('GitHub OAuth is disabled in frontend-only preview mode.')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                  <span className="social-btn-badge">Demo</span>
                </button>
              </div>

              {/* Footer Switch Prompt */}
              <div className="auth-card-footer">
                <p className="footer-prompt">
                  Don't have an account?{' '}
                  <Link to="/signup" className="auth-switch-link">
                    Create an account
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

export default Login;
