import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>InterviewAce AI</div>
        {/* Desktop links */}
        <ul style={styles.links} className="nav-links">
          <li><a href="/" style={styles.link}>Home</a></li>
          <li><a href="/dashboard" style={styles.link}>Dashboard</a></li>
          <li><a href="/plan" style={styles.link}>Prep Plan</a></li>
          <li><a href="/interview/setup" style={styles.link}>Start Mock</a></li>
          <li><a href="/profile" style={styles.link}>Profile</a></li>
        </ul>
        {/* Mobile menu button */}
        <button onClick={toggleMenu} style={styles.menuBtn} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Mobile links */}
      {open && (
        <ul style={styles.mobileLinks} className="mobile-nav-links">
          <li><a href="/" style={styles.link}>Home</a></li>
          <li><a href="/dashboard" style={styles.link}>Dashboard</a></li>
          <li><a href="/plan" style={styles.link}>Prep Plan</a></li>
          <li><a href="/interview/setup" style={styles.link}>Start Mock</a></li>
          <li><a href="/profile" style={styles.link}>Profile</a></li>
        </ul>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    padding: '0.85rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all var(--transition-fast)'
  },
  container: {
    maxWidth: '1080px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.25rem',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '-0.01em'
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color var(--transition-fast)',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    display: 'none',
    cursor: 'pointer',
  },
  mobileLinks: {
    listStyle: 'none',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'var(--bg-surface)',
    borderTop: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
};

export default Navbar;
