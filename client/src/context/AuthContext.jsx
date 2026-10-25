import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { setAccessToken, setLogoutHandler } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize API logout callback with Auth state
  useEffect(() => {
    setLogoutHandler(() => {
      setUser(null);
      setAccessToken(null);
    });
  }, []);

  // Check current session: restores token & user state across browser refreshes
  const checkAuth = useCallback(async () => {
    try {
      // First attempt to refresh token via httpOnly cookie to get fresh accessToken & user
      const refreshRes = await api.post('/auth/refresh');
      if (refreshRes.data?.status === 'success' && refreshRes.data?.user) {
        setAccessToken(refreshRes.data.accessToken || refreshRes.data.token);
        setUser(refreshRes.data.user);
        return;
      }
    } catch {
      // Refresh token might not exist; try getting current user if legacy cookie is present
      try {
        const meRes = await api.get('/auth/me');
        if (meRes.data?.status === 'success' && meRes.data?.user) {
          setUser(meRes.data.user);
          return;
        }
      } catch {
        // Not authenticated
      }
    } finally {
      setLoading(false);
    }
    setUser(null);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Log in with email and password
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data?.status === 'success' && response.data?.user) {
      const token = response.data.accessToken || response.data.token;
      setAccessToken(token);
      setUser(response.data.user);
    }
    return response.data;
  };

  // Sign up a new user
  const signup = async ({ name, email, password, confirmPassword }) => {
    const response = await api.post('/auth/signup', { name, email, password, confirmPassword });
    if (response.data?.status === 'success' && response.data?.user) {
      const token = response.data.accessToken || response.data.token;
      setAccessToken(token);
      setUser(response.data.user);
    }
    return response.data;
  };

  // Change password
  const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  };

  // Complete onboarding
  const completeOnboarding = async (data) => {
    const response = await api.post('/auth/onboarding', data);
    if (response.data?.status === 'success' && response.data?.user) {
      setUser(response.data.user);
    }
    return response.data;
  };

  // Update profile
  const updateProfile = async (data) => {
    const response = await api.put('/auth/profile', data);
    if (response.data?.status === 'success' && response.data?.user) {
      setUser(response.data.user);
    }
    return response.data;
  };

  // Log out current user
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API call returned error:', err.message);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : updatedFields));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    changePassword,
    completeOnboarding,
    updateProfile,
    updateUser,
    checkAuth,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
