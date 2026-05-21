import React from 'react';
import { FiSearch, FiBell, FiFolder, FiGithub, FiStar, FiClock } from 'react-icons/fi';
import { FaPython, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiCplusplus } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60'
];

const MainContent = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [hasUnread, setHasUnread] = React.useState(true);
  const [featuredRepos, setFeaturedRepos] = React.useState([]);
  const [loadingRepos, setLoadingRepos] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.github.com/users/KazukiDelta/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(data => {
        // Lọc bỏ fork và lấy 4 dự án mới nhất cho phần Featured
        const projects = data.filter(repo => !repo.fork).slice(0, 4);
        setFeaturedRepos(projects);
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingRepos(false);
      });
  }, []);

  return (
    <main className="main-content main-home-container">
      {/* Top Bar */}
      <header className="top-bar flex-between">
        <div className="top-right flex-center" style={{ marginLeft: 'auto' }}>
          <div className="notification" onClick={() => {
            setShowNotifications(!showNotifications);
            setHasUnread(false);
          }}>
            <FiBell style={{ color: showNotifications ? 'var(--primary)' : 'inherit' }} />
            {hasUnread && <span className="badge"></span>}

            {showNotifications && (
              <div className="notification-dropdown glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="notification-header flex-between">
                  <span>SYSTEM NOTIFICATIONS</span>
                  <span style={{ fontSize: '9px', color: '#10b981' }}>● ONLINE</span>
                </div>
                <div className="notification-list">
                  <div className="notification-item">
                    <span className="notif-text">SYSTEM_STATUS: ONLINE _ Securing network tunnels...</span>
                    <span className="notification-time">Just now</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">DATABASE: Connection established with Neo Tokyo Sector 4.</span>
                    <span className="notification-time">10 mins ago</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">VISUAL_ARCHIVE: Synchronized with Sony a6400 camera.</span>
                    <span className="notification-time">1 hour ago</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">MISSION_LOG: Kazuki Delta reached Level 28.</span>
                    <span className="notification-time">2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="user-mini flex-center">
            <div className="user-text">
              <span className="user-name">Kazuki Delta</span>
              <span className="user-id">#2009</span>
            </div>
            <img src="https://github.com/KazukiDelta.png" alt="Avatar mini" className="avatar-mini" loading="lazy" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <p className="welcome-text gradient-text">WELCOME TO MY DIGITAL REALM _</p>
          <h1 className="hero-title">Code. Game. Capture.</h1>
          <p className="hero-desc">
            Full Stack Developer & Cyber Security enthusiast. I have a deep passion for gaming, capturing beautiful landscape photography, and admiring majestic sceneries.
          </p>
          
          <div className="tech-stack flex-center">
            <div className="tech-tag tech-next glass-panel"><SiNextdotjs /> Next.js</div>
            <div className="tech-tag tech-python glass-panel"><FaPython /> Python</div>
            <div className="tech-tag tech-node glass-panel"><FaNodeJs /> Node.js</div>
            <div className="tech-tag tech-cpp glass-panel"><SiCplusplus /> C++</div>
          </div>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('profile').scrollIntoView({ behavior: 'smooth' })}>VIEW PROFILE</button>
            <button className="btn-secondary glass-panel" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>CONTACT ME</button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="projects-section">
        <div className="section-header flex-between">
          <h3 className="section-title flex-center"><span className="icon-gamepad">🎮</span> FEATURED PROJECTS</h3>
          <button className="view-all" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>VIEW ALL &gt;</button>
        </div>
        
        <div className="projects-grid">
          {loadingRepos ? (
            <div style={{ padding: '20px', color: 'var(--primary)' }}>SYNCING WITH GITHUB...</div>
          ) : (
            featuredRepos.map((repo, index) => (
              <div key={repo.id} className="project-card glass-panel neon-border" onClick={() => window.open(repo.html_url, '_blank')} style={{ cursor: 'pointer' }}>
                <div className="project-img-wrapper">
                  {index === 0 && <span className="badge-new">NEW</span>}
                  {/* Sử dụng GitHub OpenGraph image API để lấy ảnh tự động cho repo */}
                  <img 
                    src={`https://opengraph.githubassets.com/1/${repo.full_name}`} 
                    alt={repo.name} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
                    }}
                  />
                </div>
                <div className="project-info">
                  <h4 style={{ wordBreak: 'break-word' }}>{repo.name}</h4>
                  <p>{repo.description || 'No description'}</p>
                  <div className="tags">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section glass-panel flex-between">
         <div className="stat-item">
            <FiFolder className="stat-icon" />
            <div className="stat-data">
                <p>PROJECTS</p>
                <h4>12</h4>
                <span className="trend positive">Active</span>
            </div>
         </div>
         <div className="stat-item">
            <FiGithub className="stat-icon" />
            <div className="stat-data">
                <p>COMMITS</p>
                <h4>450+</h4>
                <span className="trend positive">This year</span>
            </div>
         </div>
         <div className="stat-item rank-item">
            <div className="rank-icon-wrapper neon-border">
                <FiStar />
            </div>
            <div className="stat-data text-center">
                <p>BUGS SQUASHED</p>
                <h4>99+</h4>
                <span className="trend neutral">And counting</span>
            </div>
         </div>
         <div className="stat-item">
            <FiStar className="stat-icon" />
            <div className="stat-data">
                <p>COFFEE CUPS</p>
                <h4>312</h4>
                <span className="trend positive">Need more</span>
            </div>
         </div>
         <div className="stat-item">
            <FiClock className="stat-icon" />
            <div className="stat-data">
                <p>HOURS CODED</p>
                <h4>1,200+</h4>
                <span className="trend positive">Late nights</span>
            </div>
         </div>
      </section>
    </main>
  );
};

export default MainContent;
