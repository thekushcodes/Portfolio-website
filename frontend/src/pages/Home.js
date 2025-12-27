import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Rocket, Award } from 'lucide-react';

const Home = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable solutions'
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Meeting deadlines without compromising quality'
    },
    {
      icon: Award,
      title: 'Best Practices',
      description: 'Following industry standards and patterns'
    }
  ];

  return (
    <div className="page-container" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-content">
          <div className="hero-badge" data-testid="hero-badge">
            <span className="badge-dot"></span>
            Available for Freelance
          </div>
          
          <h1 className="hero-title" data-testid="hero-title">
            Hi, I'm <span className="highlight">Alex Rodriguez</span>
          </h1>
          
          <h2 className="hero-subtitle" data-testid="hero-subtitle">
            Full Stack Developer & DSA Enthusiast
          </h2>
          
          <p className="hero-description" data-testid="hero-description">
            Passionate engineering student specializing in web development and algorithm design.
            I build scalable applications and solve complex problems with elegant solutions.
          </p>
          
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary" data-testid="contact-cta-button">
              Get In Touch
              <ArrowRight size={20} />
            </Link>
            <Link to="/projects" className="btn btn-secondary" data-testid="view-work-button">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" data-testid="about-section">
        <div className="section-content">
          <h2 className="section-title" data-testid="about-title">About Me</h2>
          <p className="about-text">
            I'm a Computer Science Engineering student at XYZ University (2021-2025) with a passion 
            for creating innovative solutions. My expertise spans from building responsive web applications 
            to solving complex algorithmic challenges. I believe in continuous learning and staying updated 
            with the latest technologies.
          </p>
          <p className="about-text">
            When I'm not coding, you'll find me contributing to open-source projects, participating in 
            coding competitions, or mentoring fellow students in Data Structures and Algorithms.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section" data-testid="highlights-section">
        <div className="section-content">
          <h2 className="section-title">Why Work With Me</h2>
          <div className="highlights-grid">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="highlight-card" data-testid={`highlight-card-${index}`}>
                  <div className="highlight-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-testid="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Let's Build Something Amazing Together</h2>
          <p className="cta-description">
            I'm currently available for freelance projects and collaborations.
            Let's discuss how I can help bring your ideas to life.
          </p>
          <Link to="/contact" className="btn btn-primary" data-testid="cta-contact-button">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;