import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Sun, 
  Moon, 
  Monitor,
  Check,
  Target
} from 'lucide-react';

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User navigation menu"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
          backgroundColor: isOpen ? 'var(--bg-subtle)' : 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          padding: '4px 10px 4px 5px',
          borderRadius: 'var(--radius-pill, 9999px)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast, 0.15s ease)',
          outline: 'none'
        }}
      >
        {/* Avatar Circle with initials */}
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.78rem',
          letterSpacing: '0.02em',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}>
          {initials}
        </div>

        <span style={{ 
          fontWeight: 500, 
          fontSize: '0.86rem', 
          color: 'var(--text-primary)', 
          maxWidth: '130px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {user?.name || 'Engineer'}
        </span>

        <ChevronDown 
          size={14} 
          style={{ 
            color: 'var(--text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '248px',
            backgroundColor: 'var(--bg-dropdown, var(--bg-surface))',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg, 12px)',
            boxShadow: 'var(--shadow-dropdown)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {/* User Quick Info Header */}
          <div style={{ 
            padding: '12px 14px', 
            borderBottom: '1px solid var(--border-subtle)', 
            backgroundColor: 'var(--bg-card-subtle)' 
          }}>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '2px', wordBreak: 'break-word' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', wordBreak: 'break-all', marginBottom: user?.preferences?.targetRole ? '6px' : '0' }}>
              {user?.email}
            </div>
            {user?.preferences?.targetRole && (
              <span style={{
                display: 'inline-block',
                backgroundColor: 'var(--primary-subtle)',
                color: 'var(--primary-text)',
                border: '1px solid var(--primary-border)',
                padding: '2px 7px',
                borderRadius: 'var(--radius-sm, 6px)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}>
                {user.preferences.targetRole}
              </span>
            )}
          </div>

          {/* Theme Selector (Light, Dark, System) */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ 
              fontSize: '0.72rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.04em',
              marginBottom: '6px' 
            }}>
              Theme
            </div>
            <div 
              role="radiogroup" 
              aria-label="Select appearance theme"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm, 6px)',
                padding: '2px',
                gap: '2px'
              }}
            >
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor }
              ].map(({ id, label, icon: Icon }) => {
                const isActive = theme === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    title={`${label} Theme`}
                    onClick={() => setTheme(id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '5px 2px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                      color: isActive ? 'var(--primary-text)' : 'var(--text-muted)',
                      boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                      fontSize: '0.74rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast, 0.15s ease)'
                    }}
                  >
                    <Icon size={13} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '4px' }}>
            <Link
              to="/skills"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm, 6px)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 500,
                transition: 'background var(--transition-fast, 0.15s ease)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Target size={15} style={{ color: 'var(--primary-text)' }} />
              <span>Skill Gap Analyzer</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm, 6px)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 500,
                transition: 'background var(--transition-fast, 0.15s ease)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <UserIcon size={15} style={{ color: 'var(--primary-text)' }} />
              <span>My Profile</span>
            </Link>

            <Link
              to="/profile?edit=true"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm, 6px)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 500,
                transition: 'background var(--transition-fast, 0.15s ease)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Settings size={15} style={{ color: 'var(--text-muted)' }} />
              <span>Edit Preferences</span>
            </Link>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '2px 0' }} />

          {/* Sign Out */}
          <div style={{ padding: '4px' }}>
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm, 6px)',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--error-text)',
                fontSize: '0.84rem',
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background var(--transition-fast, 0.15s ease)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--error-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut size={15} style={{ color: 'var(--error-text)' }} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
