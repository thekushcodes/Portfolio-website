import React from 'react';
import { 
  Code, 
  Database, 
  Layers, 
  Terminal, 
  Cpu, 
  GitBranch,
  CheckCircle
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'C++', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'TypeScript', level: 70 }
      ]
    },
    {
      icon: Layers,
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Redux', level: 75 },
        { name: 'Next.js', level: 70 }
      ]
    },
    {
      icon: Database,
      title: 'Backend & Databases',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'FastAPI', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'REST APIs', level: 90 }
      ]
    },
    {
      icon: Cpu,
      title: 'DSA & Problem Solving',
      skills: [
        { name: 'Data Structures', level: 90 },
        { name: 'Algorithms', level: 85 },
        { name: 'Dynamic Programming', level: 80 },
        { name: 'System Design', level: 75 },
        { name: 'Competitive Programming', level: 70 }
      ]
    },
    {
      icon: GitBranch,
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'Linux', level: 80 }
      ]
    },
    {
      icon: Terminal,
      title: 'Other Skills',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Team Collaboration', level: 85 },
        { name: 'Agile/Scrum', level: 75 },
        { name: 'Technical Writing', level: 80 },
        { name: 'Code Review', level: 85 }
      ]
    }
  ];

  return (
    <div className="page-container" data-testid="skills-page">
      <div className="page-header">
        <h1 className="page-title" data-testid="skills-page-title">Skills & Expertise</h1>
        <p className="page-description">
          A comprehensive overview of my technical skills and competencies.
          I'm always learning and expanding my skillset.
        </p>
      </div>

      <div className="skills-container">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="skill-category" data-testid={`skill-category-${index}`}>
              <div className="skill-category-header">
                <div className="skill-category-icon">
                  <Icon size={28} />
                </div>
                <h2 className="skill-category-title">{category.title}</h2>
              </div>
              
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item" data-testid={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications Section */}
      <section className="certifications-section">
        <h2 className="section-title" data-testid="certifications-title">Certifications & Achievements</h2>
        <div className="certifications-grid">
          <div className="certification-card" data-testid="certification-card-0">
            <CheckCircle className="cert-icon" size={24} />
            <h3 className="cert-title">AWS Certified Developer</h3>
            <p className="cert-issuer">Amazon Web Services</p>
          </div>
          <div className="certification-card" data-testid="certification-card-1">
            <CheckCircle className="cert-icon" size={24} />
            <h3 className="cert-title">Google Code Jam Finalist</h3>
            <p className="cert-issuer">Google</p>
          </div>
          <div className="certification-card" data-testid="certification-card-2">
            <CheckCircle className="cert-icon" size={24} />
            <h3 className="cert-title">Meta React Developer</h3>
            <p className="cert-issuer">Meta (Facebook)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;