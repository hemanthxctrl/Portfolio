'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, Calendar, Award, ExternalLink, Download, ShieldCheck, CheckCircle } from 'lucide-react';
import CertificateModal from '@/components/CertificateModal';

const EXPERIENCE_DATA = [
  {
    role: 'Cloud & Security Engineer Intern',
    org: 'ANS Oceanverse Technologies Pvt. Ltd.',
    logo: '/assets/ans-mark.svg',
    date: '15 June 2026 – 30 September 2026',
    status: 'Completed',
    workArrangement: 'Work From Home (WFH)',
    project: 'HI-HUBBLE',
    desc: 'Successfully completed an internship as a Cloud & Security Engineer at ANS Oceanverse Technologies Pvt. Ltd., contributing to the HI-HUBBLE project. Coordinated assigned project activities, collaborated with the designated Project Manager and management team, and carried out responsibilities in accordance with organizational requirements and project objectives.',
    tags: ['Cloud Security', 'HI-HUBBLE Project', 'AWS Architecture', 'Work From Home'],
    certificate: {
      image: '/certificates/ans-oceanverse-internship-certificate.jpg',
      downloadName: 'ANS_Oceanverse_Internship_Certificate_U_Hemanth_Sreenivas.jpg',
      title: 'Internship Certificate — ANS Oceanverse Technologies',
      organization: 'ANS Oceanverse Technologies Pvt. Ltd.',
      project: 'HI-HUBBLE',
      issueDate: '14 October 2026',
      employeeId: 'ANSID0006',
    },
  },
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
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={`${item.org} Logo`}
                      width={36}
                      height={36}
                      style={{
                        borderRadius: '8px',
                        marginTop: '0.15rem',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      }}
                    />
                  )}
                  <div>
                    <h4 className="timeline-title" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.role}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                      <p className="timeline-org" style={{ 
                        color: activeTab === 'exp' ? 'var(--accent-blue)' : 'var(--accent-purple)',
                        fontWeight: 600,
                        margin: 0,
                      }}>{item.org}</p>

                      {item.status && (
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.12rem 0.55rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: '#059669',
                          fontWeight: 600,
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}>
                          <CheckCircle size={12} /> {item.status}
                        </span>
                      )}

                      {item.project && (
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.12rem 0.55rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(0, 98, 255, 0.07)',
                          color: 'var(--accent-blue)',
                          fontWeight: 600,
                          border: '1px solid rgba(0, 98, 255, 0.2)',
                        }}>
                          Project: {item.project}
                        </span>
                      )}
                    </div>
                  </div>
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
                lineHeight: '1.6',
                marginTop: '0.75rem'
              }}>{item.desc}</p>

              {/* Certificate Preview Card if present */}
              {item.certificate && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(0, 98, 255, 0.15)',
                  boxShadow: '0 2px 8px rgba(0, 98, 255, 0.03)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Award size={18} style={{ color: 'var(--accent-blue)' }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Internship Certificate
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: '#059669',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}>
                        <ShieldCheck size={12} /> Verified
                      </span>
                    </div>

                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Issued: {item.certificate.issueDate}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                    alignItems: 'center',
                  }}>
                    {/* Interactive Thumbnail */}
                    <div
                      onClick={() => setSelectedCertificate(item.certificate)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedCertificate(item.certificate);
                        }
                      }}
                      aria-label="Enlarge ANS Oceanverse internship certificate"
                      className="certificate-thumb-hover"
                      style={{
                        cursor: 'pointer',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1.5px solid rgba(0, 98, 255, 0.2)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                        position: 'relative',
                        aspectRatio: '1024 / 692',
                        backgroundColor: '#0b192c',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <Image
                        src={item.certificate.image}
                        alt="ANS Oceanverse Technologies Internship Certificate Preview - U. Hemanth Sreenivas"
                        width={600}
                        height={405}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                      <div
                        className="cert-overlay"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(11, 37, 69, 0.5)',
                          backdropFilter: 'blur(2px)',
                          WebkitBackdropFilter: 'blur(2px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          color: '#ffffff',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          opacity: 0,
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        <ExternalLink size={16} /> Click to Inspect
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        backgroundColor: '#ffffff',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Organization:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>ANS Oceanverse</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Project:</span>
                          <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>HI-HUBBLE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Employee ID:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>ANSID0006</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Arrangement:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Work From Home</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(item.certificate)}
                          className="btn btn-primary"
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <ExternalLink size={15} /> View Certificate
                        </button>
                        <a
                          href={item.certificate.image}
                          download={item.certificate.downloadName}
                          className="btn btn-secondary"
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            textDecoration: 'none',
                          }}
                        >
                          <Download size={15} /> Download Certificate
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="timeline-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
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

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        key={selectedCertificate?.image}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificateData={selectedCertificate}
      />
    </div>
  );
}
