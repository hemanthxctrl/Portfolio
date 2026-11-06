'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Send, 
  Code, 
  Cpu, 
  Lock, 
  Terminal, 
  Menu, 
  X,
  Compass,
  ArrowRight,
  Flame,
  Globe
} from 'lucide-react';

// Dynamic imports to prevent SSR hydration errors on canvas components
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });
const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false });
const SkillsGalaxy = dynamic(() => import('@/components/SkillsGalaxy'), { ssr: false });
const GitHubActivity = dynamic(() => import('@/components/GitHubActivity'), { ssr: false });
const BackgroundParticles = dynamic(() => import('@/components/BackgroundParticles'), { ssr: false });
const Typewriter = dynamic(() => import('@/components/Typewriter'), { ssr: false });
const Timeline = dynamic(() => import('@/components/Timeline'), { ssr: false });

const Github = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  // Interactive Project Planner State
  const [contactTab, setContactTab] = useState('message'); // 'message' or 'planner'
  const [selectedProjectType, setSelectedProjectType] = useState('web'); // 'web', 'cloud', 'devops', 'iot'
  const [projectSize, setProjectSize] = useState(3); // scale 1 to 5
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setPlannerSubmitted(true);
    }, 800);
  };

  // Compute estimate values based on selected configurator metrics
  const estimateMetrics = useMemo(() => {
    let basePrice = 0;
    let baseWeeks = 0;
    let typeName = '';

    switch (selectedProjectType) {
      case 'web':
        basePrice = 1500;
        baseWeeks = 2;
        typeName = 'Web Application';
        break;
      case 'cloud':
        basePrice = 2000;
        baseWeeks = 3;
        typeName = 'AWS Cloud Infrastructure';
        break;
      case 'devops':
        basePrice = 1200;
        baseWeeks = 1.5;
        typeName = 'CI/CD & DevOps Integration';
        break;
      case 'iot':
        basePrice = 2500;
        baseWeeks = 4;
        typeName = 'IoT Device & Data Platform';
        break;
      default:
        basePrice = 1000;
        baseWeeks = 1;
        typeName = 'Custom Project';
    }

    const estimatedBudget = basePrice + (projectSize * 800);
    const estimatedTime = Math.ceil(baseWeeks * (0.6 + projectSize * 0.4));

    return {
      budget: estimatedBudget,
      weeks: estimatedTime,
      typeName
    };
  }, [selectedProjectType, projectSize]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic Background Constellation Particles */}
      <BackgroundParticles />

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo-text">
            HS<span className="logo-dot">●</span>
          </a>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#experience" className="nav-link">Timeline</a></li>
            <li><a href="#github" className="nav-link">GitHub</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          {/* Socials & Hamburger */}
          <div className="nav-socials">
            <a href="https://github.com/hemanthxctrl" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="nav-social-icon">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/hemanth-sreenivas-uppala/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="nav-social-icon">
              <Linkedin size={20} />
            </a>
            <button 
              className="hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '85px',
            left: 0,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            borderBottom: '1px solid var(--border-color)',
            padding: '2.5rem 1.5rem',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Projects</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Timeline</a>
            <a href="#github" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>GitHub</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <Hero3D />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="hero-tagline">Cloud Architecting & Code Engineering</span>
              <h1 className="hero-title">
                Building Futures<br />
                As A <span className="gradient-text"><Typewriter words={["Cloud Engineer", "Full Stack Developer", "Automation Specialist", "IoT Architect"]} /></span>
              </h1>
              <p className="hero-description">
                Hi, I&apos;m Hemanth. I engineer high-performance systems with secure cloud backends, automated Docker workflows, and smart client interfaces.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">
                  Explore Projects <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
              </div>
              <div className="hero-code-snippet">
                <code>while(alive) &#123; create_value(); learn_daily(); deploy(); &#125;</code>
              </div>
            </div>
            <div className="hero-visual">
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                height: '320px',
                background: 'var(--grad-glow)',
                zIndex: -1,
                borderRadius: '50%',
                filter: 'blur(30px)',
                animation: 'pulse-glow 4s ease-in-out infinite'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="container">
          <h2 className="section-title">Who I Am</h2>
          <div className="about-grid">
            <div className="about-left">
              <p style={{ fontSize: '1.15rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                I am a highly motivated Computer Science & Engineering undergrad who loves combining hardware APIs, data platforms, and cloud instances. My coding journey is centered around building secure architectures and deploying highly scalable container networks.
              </p>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Based in Andhra Pradesh, India, I develop cloud booking portals using AWS, create SQL injection protection tools, and build data collection scripts for regional IoT systems.
              </p>
              
              <div className="about-metrics">
                <div className="metric-card">
                  <span className="metric-val">6+</span>
                  <span className="metric-label">Apps Built</span>
                </div>
                <div className="metric-card">
                  <span className="metric-val">10+</span>
                  <span className="metric-label">Tools Mastered</span>
                </div>
                <div className="metric-card">
                  <span className="metric-val">18</span>
                  <span className="metric-label">Max Streak</span>
                </div>
              </div>
            </div>
            
            <div className="about-right">
              <div className="glass-card code-editor-card glow-card-animated">
                <div className="editor-header">
                  <div className="editor-dots">
                    <span className="editor-dot red"></span>
                    <span className="editor-dot yellow"></span>
                    <span className="editor-dot green"></span>
                  </div>
                  <span className="editor-tab">hemanth_config.json</span>
                  <span style={{ width: '40px' }}></span>
                </div>
                <div className="editor-content">
                  <pre style={{ margin: 0, overflowX: 'auto' }}>
                    <code>
{`{
  `}
  <span className="editor-prop">&quot;name&quot;</span>: <span className="editor-string">&quot;Uppala Hemanth Sreenivas&quot;</span>,
  <span className="editor-prop">&quot;focus&quot;</span>: [<span className="editor-string">&quot;AWS Cloud Computing&quot;</span>, <span className="editor-string">&quot;Full Stack Web&quot;</span>],
  <span className="editor-prop">&quot;ide&quot;</span>: <span className="editor-string">&quot;VS Code &amp; Claude Code&quot;</span>,
  <span className="editor-prop">&quot;philosophy&quot;</span>: <span className="editor-string">&quot;Leveling up every day, one commit at a time.&quot;</span>
{`}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Expertise</h2>
          <div className="skills-grid-layout">
            <div className="skills-left">
              <div className="skills-categories">
                <div className="skill-category-box">
                  <h3>Languages</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">C</span>
                    <span className="skill-tag">HTML5/CSS3</span>
                    <span className="skill-tag">Bash Scripts</span>
                  </div>
                </div>

                <div className="skill-category-box">
                  <h3>Frameworks</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">React.js</span>
                    <span className="skill-tag">Next.js</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">Express.js</span>
                  </div>
                </div>

                <div className="skill-category-box">
                  <h3>AWS & DevOps</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">EC2 Systems</span>
                    <span className="skill-tag">S3 Storage</span>
                    <span className="skill-tag">AWS Lambda</span>
                    <span className="skill-tag">Nginx Server</span>
                    <span className="skill-tag">Docker Container</span>
                  </div>
                </div>

                <div className="skill-category-box">
                  <h3>Databases & Tools</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">MongoDB</span>
                    <span className="skill-tag">MySQL</span>
                    <span className="skill-tag">Git/GitHub</span>
                    <span className="skill-tag">Figma Design</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="skills-right">
              <SkillsGalaxy />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="container">
          <h2 className="section-title">Selected Projects</h2>
          <div className="projects-section-grid">
            {/* Card 1 */}
            <div className="glass-card project-card glow-card-animated">
              <div className="project-icon-box">
                <Cpu size={24} />
              </div>
              <h3 className="project-title-text">Cloud Bus Booking Portal</h3>
              <p className="project-desc">
                An integrated, cloud-native booking environment configured with AWS IAM controls, EC2 hosting parameters, and S3 file integrations.
              </p>
              <div className="project-tech-list">
                <span className="project-tech-tag">AWS Services</span>
                <span className="project-tech-tag">EC2 Hosting</span>
                <span className="project-tech-tag">IAM Roles</span>
              </div>
              <a href="https://github.com/hemanthxctrl" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Inspect Source <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 2 */}
            <div className="glass-card project-card glow-card-animated">
              <div className="project-icon-box">
                <Lock size={24} />
              </div>
              <h3 className="project-title-text">SQL Injection Shield</h3>
              <p className="project-desc">
                An automated secure parser designed to audit input streams and sanitize queries against malicious SQL injection vectors.
              </p>
              <div className="project-tech-list">
                <span className="project-tech-tag">JavaScript</span>
                <span className="project-tech-tag">Cybersecurity</span>
                <span className="project-tech-tag">RegEx Sanitizers</span>
              </div>
              <a href="https://github.com/hemanthxctrl" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Inspect Source <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 3 */}
            <div className="glass-card project-card glow-card-animated">
              <div className="project-icon-box">
                <Terminal size={24} />
              </div>
              <h3 className="project-title-text">AgroSense IoT Platform</h3>
              <p className="project-desc">
                A localized environmental data dashboard processing real-time agricultural telemetry from hardware sensors using Python scripts.
              </p>
              <div className="project-tech-list">
                <span className="project-tech-tag">Python CLI</span>
                <span className="project-tech-tag">IoT Hardware</span>
                <span className="project-tech-tag">Telemetry</span>
              </div>
              <a href="https://github.com/hemanthxctrl/Agrosense-Field-Project" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Inspect Source <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 4 */}
            <div className="glass-card project-card glow-card-animated">
              <div className="project-icon-box">
                <Code size={24} />
              </div>
              <h3 className="project-title-text">Node.js Gaming Server</h3>
              <p className="project-desc">
                Real-time WebSocket multiplayer game hosting backend built for fast-latency deployment during the Ludus Forge gaming hackathon.
              </p>
              <div className="project-tech-list">
                <span className="project-tech-tag">Node.js</span>
                <span className="project-tech-tag">WebSockets</span>
                <span className="project-tech-tag">Local Servers</span>
              </div>
              <a href="https://github.com/hemanthxctrl" target="_blank" rel="noopener noreferrer" className="project-link-btn">
                Inspect Source <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Timeline Section */}
      <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">My Journey</h2>
          <div className="exp-edu-layout">
            <Timeline />
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="section" id="github">
        <div className="container">
          <h2 className="section-title">GitHub dashboard</h2>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <GitHubActivity />
          </div>
        </div>
      </section>

      {/* Contact Section & Project Planner Configurator */}
      <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Location</h4>
                  <p>Tadpatri, Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Email</h4>
                  <p>uppalahemanthsrinivas@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Timezone</h4>
                  <p>IST (UTC+5:30)</p>
                </div>
              </div>

              {/* Glowing Globe Widget representation */}
              <div style={{ width: '100%', height: '280px', marginTop: '1rem', position: 'relative' }}>
                <Globe3D />
              </div>
            </div>

            {/* Redesigned Contact / Project Configurator Panel */}
            <div className="glass-card contact-form-card" style={{ padding: '2.5rem' }}>
              <div className="configurator-tabs">
                <button 
                  onClick={() => setContactTab('message')}
                  className={`configurator-tab ${contactTab === 'message' ? 'active' : ''}`}
                >
                  Send Message
                </button>
                <button 
                  onClick={() => setContactTab('planner')}
                  className={`configurator-tab ${contactTab === 'planner' ? 'active' : ''}`}
                >
                  Project Planner
                </button>
              </div>

              {/* Tab 1: Send Message Form */}
              {contactTab === 'message' && (
                formSubmitted ? (
                  <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem 1rem',
                    animation: 'fadeIn 0.5s'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 98, 255, 0.08)',
                      color: 'var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                      boxShadow: '0 0 15px rgba(0, 98, 255, 0.1)'
                    }}>
                      <Send size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message Received</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '350px', fontSize: '0.95rem' }}>
                      Thank you! Hemanth has received your request and will get back to you soon.
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group-row">
                      <div className="form-input-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                          className="form-input" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="form-input-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="form-input" 
                          placeholder="john@example.com" 
                        />
                      </div>
                    </div>
                    
                    <div className="form-input-group" style={{ marginTop: '1.25rem' }}>
                      <label htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        required 
                        className="form-input" 
                        placeholder="Collaboration proposal" 
                      />
                    </div>

                    <div className="form-input-group" style={{ marginTop: '1.25rem' }}>
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required 
                        className="form-input" 
                        placeholder="Hi Hemanth, let's discuss..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1.5rem' }}>
                      Send Message <Send size={16} />
                    </button>
                  </form>
                )
              )}

              {/* Tab 2: Project Planner Configurator (Redesign reference) */}
              {contactTab === 'planner' && (
                plannerSubmitted ? (
                  <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem 1rem',
                    animation: 'fadeIn 0.5s'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(123, 97, 255, 0.08)',
                      color: 'var(--accent-purple)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                      boxShadow: '0 0 15px rgba(123, 97, 255, 0.1)'
                    }}>
                      <Flame size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Plan Logged</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '350px', fontSize: '0.95rem' }}>
                      Your custom design configuration has been saved. Hemanth will review the project brief and get in touch with you.
                    </p>
                    <button onClick={() => setPlannerSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                      Adjust Config
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePlannerSubmit}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Project Type</h4>
                    <div className="project-type-grid">
                      <button 
                        type="button"
                        onClick={() => setSelectedProjectType('web')}
                        className={`project-type-btn ${selectedProjectType === 'web' ? 'active' : ''}`}
                      >
                        <h5>Web Application</h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>React, Next.js setups</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedProjectType('cloud')}
                        className={`project-type-btn ${selectedProjectType === 'cloud' ? 'active' : ''}`}
                      >
                        <h5>Cloud Architecture</h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>AWS deployments, IAM</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedProjectType('devops')}
                        className={`project-type-btn ${selectedProjectType === 'devops' ? 'active' : ''}`}
                      >
                        <h5>DevOps Automation</h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Docker, Bash workflow</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedProjectType('iot')}
                        className={`project-type-btn ${selectedProjectType === 'iot' ? 'active' : ''}`}
                      >
                        <h5>IoT Telemetry</h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Python sensor pipelines</p>
                      </button>
                    </div>

                    <div className="calculator-slider-group">
                      <div className="calculator-slider-header">
                        <span>Project Scope & Complexity</span>
                        <span style={{ color: 'var(--accent-blue)' }}>Level {projectSize} / 5</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={projectSize}
                        onChange={(e) => setProjectSize(Number(e.target.value))}
                        className="calculator-range"
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        <span>Basic (Script/Landing)</span>
                        <span>Enterprise (Multi-tier)</span>
                      </div>
                    </div>

                    {/* Calculated Results Block */}
                    <div className="calculator-result-box">
                      <div className="result-item">
                        <h5>Estimated Budget</h5>
                        <span>${estimateMetrics.budget}</span>
                      </div>
                      <div className="result-item">
                        <h5>Estimated Time</h5>
                        <span>~{estimateMetrics.weeks} Weeks</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Submit Project Config Brief <ArrowRight size={16} />
                    </button>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container footer-content">
          <div>
            <p>&copy; {new Date().getFullYear()} Hemanth Sreenivas Uppala. All rights reserved.</p>
          </div>
          <div>
            <p>Designed with space aesthetics, inspired by Oceanverse digital modules.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
