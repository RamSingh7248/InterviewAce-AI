import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import InterviewSetup from './pages/InterviewSetup';
import InterviewSession from './pages/InterviewSession';
import InterviewResults from './pages/InterviewResults';
import SkillGapAnalyzer from './pages/SkillGapAnalyzer';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-page, #0b0f19)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary, #2563eb)'
      }}>
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Root index redirector based on auth
const IndexRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-page, #0b0f19)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary, #2563eb)'
      }}>
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
          <Routes>
          <Route path="/" element={<IndexRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview/setup" 
            element={
              <ProtectedRoute>
                <InterviewSetup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview/:id" 
            element={
              <ProtectedRoute>
                <InterviewSession />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview/:id/results" 
            element={
              <ProtectedRoute>
                <InterviewResults />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/skills" 
            element={
              <ProtectedRoute>
                <SkillGapAnalyzer />
              </ProtectedRoute>
            } 
          />
          {/* Fallback to index */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
