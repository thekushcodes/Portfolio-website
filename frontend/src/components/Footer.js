import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/alexrodriguez', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/alexrodriguez', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/alexrodriguez', label: 'Twitter' },
    { icon: Mail, href: 'mailto:alex.rodriguez@email.com', label: 'Email' }
  ];

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Alex Rodriguez</h3>
          <p className="footer-text">Full Stack Developer & DSA Enthusiast</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <div className="footer-links">
            <a href="/" className="footer-link">Home</a>
            <a href="/skills" className="footer-link">Skills</a>
            <a href="/projects" className="footer-link">Projects</a>
            <a href="/freelancing" className="footer-link">Freelancing</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <div className="footer-social">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Alex Rodriguez. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;