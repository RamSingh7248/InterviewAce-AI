import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session from backend cookie
  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data && response.data.status === 'success' && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Log in with email and password
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.status === 'success' && response.data.user) {
      setUser(response.data.user);
    }
    return response.data;
  };

  // Sign up a new user
  const signup = async ({ name, email, password }) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  };

  // Log out current user
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    checkAuth,
    updateUser,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
