import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-page)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: 'var(--bg-surface)',
            padding: '36px',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239,68,68,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#ef4444'
            }}>
              <AlertCircle size={32} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
              Something went wrong
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              An unexpected error occurred while rendering this page. You can reload the application or return to the dashboard.
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.8rem',
                color: '#ef4444',
                textAlign: 'left',
                marginBottom: '24px',
                overflowX: 'auto',
                fontFamily: 'monospace'
              }}>
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary-color)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <RefreshCw size={16} />
                <span>Reload Page</span>
              </button>

              <a
                href="/dashboard"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                <Home size={16} />
                <span>Return to Dashboard</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
