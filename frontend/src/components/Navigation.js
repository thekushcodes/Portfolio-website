import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/freelancing', label: 'Freelancing' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav-container" data-testid="navigation">
      <div className="nav-content">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <span className="logo-text">AR</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            data-testid="theme-toggle-button"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="nav-links-mobile" data-testid="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-mobile ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;