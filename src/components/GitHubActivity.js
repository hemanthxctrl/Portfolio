'use client';

import { useState, useMemo } from 'react';
import { Star, GitFork, Award, Zap, Flame } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
function pseudoRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function GitHubActivity() {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate simulated activity for the last 20 weeks (140 days)
  const activityData = useMemo(() => {
    const data = [];
    const now = new Date();
    // Start 140 days ago
    const startDate = new Date();
    startDate.setDate(now.getDate() - 139);

    for (let i = 0; i < 140; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Generate realistic looking contribution patterns (weekends lower, some hot streaks)
      const dayOfWeek = currentDate.getDay();
      let intensity = 0;
      
      const rand = pseudoRandom(i + 1);
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekends: 80% nothing, 20% light/medium activity
        intensity = rand > 0.8 ? (rand > 0.95 ? 2 : 1) : 0;
      } else {
        // Weekdays: 40% nothing, 60% variable activity
        intensity = rand > 0.4 ? (rand > 0.9 ? 4 : rand > 0.75 ? 3 : rand > 0.55 ? 2 : 1) : 0;
      }

      // Add special streak periods
      const dayOfMonth = currentDate.getDate();
      const month = currentDate.getMonth();
      // October/November streak
      if ((month === 9 && dayOfMonth > 10) || (month === 10 && dayOfMonth < 15)) {
        if (pseudoRandom(i + 50) > 0.15) {
          intensity = Math.floor(pseudoRandom(i + 100) * 3) + 2; // 2, 3, or 4
        }
      }

      data.push({
        date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count: intensity === 0 ? 0 : intensity * 2 + Math.floor(pseudoRandom(i + 200) * 3),
        level: intensity, // 0 to 4
      });
    }
    return data;
  }, []);

  const totalContributions = useMemo(() => {
    return activityData.reduce((acc, curr) => acc + curr.count, 0);
  }, [activityData]);

  // Level color mapping
  const levelColors = {
    0: 'rgba(0, 0, 0, 0.05)',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39',
  };

  const topRepos = [
    { name: 'Agrosense-Field-Project', description: 'IoT environmental monitoring and data analytics system for smart farming.', lang: 'Python', stars: 12, forks: 4 },
    { name: 'SQL-Injection-Prevention', description: 'Secure software system to detect and isolate SQL injection exploits.', lang: 'JavaScript', stars: 8, forks: 2 },
    { name: 'Ludus-Forge-Server', description: 'Real-time local game servers for testing, hosting, and prototyping.', lang: 'Python', stars: 6, forks: 1 },
  ];

  return (
    <div className="glass-card github-dashboard-card" style={{ padding: '2.5rem' }}>
      <div className="github-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="github-avatar-glow" style={{ position: 'relative' }}>
            <div className="github-avatar-placeholder" style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.25rem',
              color: '#000'
            }}>
              HS
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#39d353',
              border: '2.5px solid var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              hemanthxctrl <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(123, 97, 255, 0.1)', color: 'var(--accent-blue)' }}>Active</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Aspiring Cloud Engineer | CSE Undergrad</p>
          </div>
        </div>
        <a href="https://github.com/hemanthxctrl" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
          <GithubIcon size={16} /> Visit Profile
        </a>
      </div>

      {/* GitHub Statistics Overview Grid */}
      <div className="github-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="stat-card" style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Award size={16} /> Total Contributions
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{totalContributions}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 140 days</span>
        </div>
        <div className="stat-card" style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Flame size={16} /> Max Commit Streak
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-pink)' }}>18 Days</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oct 12 - Oct 30</span>
        </div>
        <div className="stat-card" style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Zap size={16} /> Active PRs
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)' }}>42 Merged</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloud & IoT code</span>
        </div>
      </div>

      {/* Activity Contribution Grid */}
      <div className="github-activity-grid-wrapper" style={{ position: 'relative', overflowX: 'auto', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Contribution History</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '550px' }}>
          {/* Days Grid - 7 rows, 20 columns */}
          <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7, 10px)', gridTemplateColumns: 'repeat(20, 10px)', gap: '4px', justifyContent: 'center' }}>
            {activityData.map((day, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: levelColors[day.level],
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'transform 0.1s ease',
                  transform: hoveredDay === day ? 'scale(1.3)' : 'scale(1)'
                }}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0 0.5rem' }}>
            <span>140 days ago</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Less</span>
              <div style={{ width: '10px', height: '10px', backgroundColor: levelColors[0], borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: levelColors[1], borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: levelColors[2], borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: levelColors[3], borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: levelColors[4], borderRadius: '2px' }} />
              <span>More</span>
            </div>
            
            <span>Today</span>
          </div>
        </div>

        {/* Dynamic Tooltip Info Display */}
        <div style={{ height: '24px', marginTop: '0.5rem', textAlign: 'center' }}>
          {hoveredDay ? (
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 500, animation: 'fadeIn 0.2s' }}>
              {hoveredDay.count} contributions on {hoveredDay.date}
            </span>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hover over grid blocks to see details</span>
          )}
        </div>
      </div>

      {/* GitHub Top Repositories Display */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Featured Repositories</h4>
        <div className="github-repos-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topRepos.map((repo, idx) => (
            <div key={idx} className="repo-item" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1.2rem',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 98, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={`https://github.com/hemanthxctrl/${repo.name}`} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--accent-blue)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {repo.name}
                </a>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={12} /> {repo.stars}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><GitFork size={12} /> {repo.forks}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>{repo.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: repo.lang === 'Python' ? '#3776AB' : '#F7DF1E'
                }} />
                {repo.lang}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
