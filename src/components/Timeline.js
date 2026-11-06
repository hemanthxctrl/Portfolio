'use client';

import { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, Star } from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    role: 'Python & Cloud Intern',
    org: 'CodeAlpha',
    date: 'June 2025 - Present',
    desc: 'Deploying secure hosting platforms on AWS. Automating storage replication using S3 buckets and configuring custom server routing structures.',
    tags: ['AWS EC2', 'S3 Storage', 'Python CLI', 'IAM Security'],
  },
  {
    role: 'Ludus Forge Hackathon Competitor',
    org: 'Ludus Forge Gaming Hackathon',
    date: 'October 2025',
    desc: 'Designed and deployed a local gaming prototype server for browser hosting. Orchestrated real-time WebSocket messaging under a tight 48-hour development cycle.',
    tags: ['Node.js', 'WebSockets', 'Python Server', 'Real-time UI'],
  }
];

const EDUCATION_DATA = [
  {
    role: "B.Tech - Computer Science & Engineering",
    org: "Vignan's Foundation for Science, Technology & Research",
    date: '2024 - 2028 (Pursuing)',
    desc: 'Focusing on core engineering principles: cloud architectures, database structures, algorithms, and secure software development.',
    tags: ['Algorithms', 'Data Structures', 'Cloud Systems', 'OOP'],
  },
  {
    role: 'Intermediate (M.P.C)',
    org: 'JCNRM Junior College - Tadipatri',
    date: '2022 - 2024',
    desc: 'Completed secondary education with honors in Mathematics, Physics, and Chemistry (M.P.C).',
    tags: ['Advanced Maths', 'Physics', 'Analytics'],
  },
  {
    role: 'SSC (10th Standard)',
    org: 'Sri Chaitanya Techno School - Tadipatri',
    date: '2021 - 2022',
    desc: 'Achieved outstanding academic score with strong foundational skills in logical problem-solving.',
    tags: ['General Science', 'Analytical Skills'],
  }
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState('exp'); // 'exp' or 'edu'

  const currentData = activeTab === 'exp' ? EXPERIENCE_DATA : EDUCATION_DATA;

  return (
    <div>
      {/* Interactive Tabs Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={() => setActiveTab('exp')}
          className={`btn ${activeTab === 'exp' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.6rem 1.8rem', fontSize: '0.9rem' }}
        >
          <Briefcase size={16} /> Work Experience
        </button>
        <button
          onClick={() => setActiveTab('edu')}
          className={`btn ${activeTab === 'edu' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.6rem 1.8rem', fontSize: '0.9rem' }}
        >
          <GraduationCap size={16} /> Education Path
        </button>
      </div>

      {/* Timeline List */}
      <div className="timeline-list">
        {currentData.map((item, idx) => (
          <div key={idx} className="timeline-item" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <span 
              className="timeline-dot" 
              style={{ 
                borderColor: activeTab === 'exp' ? 'var(--accent-blue)' : 'var(--accent-purple)',
                boxShadow: activeTab === 'exp' ? '0 0 10px rgba(0, 98, 255, 0.3)' : '0 0 10px rgba(123, 97, 255, 0.3)'
              }}
            />
            <div className="glass-card" style={{ padding: '1.8rem', background: '#ffffff' }}>
              <div className="timeline-header">
                <div>
                  <h4 className="timeline-title" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.role}</h4>
                  <p className="timeline-org" style={{ 
                    color: activeTab === 'exp' ? 'var(--accent-blue)' : 'var(--accent-purple)',
                    fontWeight: 600,
                    marginTop: '0.2rem'
                  }}>{item.org}</p>
                </div>
                <span className="timeline-date" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>
                  <Calendar size={14} /> {item.date}
                </span>
              </div>
              <p className="timeline-desc" style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginTop: '0.75rem'
              }}>{item.desc}</p>
              
              <div className="timeline-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {item.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="timeline-tag" style={{
                    fontSize: '0.75rem',
                    color: activeTab === 'exp' ? 'var(--accent-blue)' : 'var(--accent-purple)',
                    background: activeTab === 'exp' ? 'rgba(0, 98, 255, 0.06)' : 'rgba(123, 97, 255, 0.06)',
                    border: '1.5px solid transparent',
                    borderColor: activeTab === 'exp' ? 'rgba(0, 98, 255, 0.15)' : 'rgba(123, 97, 255, 0.15)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    fontWeight: 500
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
