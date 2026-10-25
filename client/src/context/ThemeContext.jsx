import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEME_KEY = 'interviewace_theme';

export const ThemeProvider = ({ children }) => {
  // Theme options: 'light' | 'dark' | 'system'
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'system';
    } catch (e) {
      return 'system';
    }
  });

  // Track the resolved theme ('light' or 'dark')
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY) || 'system';
      if (stored === 'system') {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      return stored === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const applyTheme = (themeOption) => {
    const isDark =
      themeOption === 'dark' ||
      (themeOption === 'system' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    const resolved = isDark ? 'dark' : 'light';
    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;
  };

  const setTheme = (newTheme) => {
    if (!['light', 'dark', 'system'].includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      console.warn('Could not persist theme to localStorage', e);
    }
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);

    // If theme is 'system', listen for OS color-scheme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          applyTheme('system');
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
