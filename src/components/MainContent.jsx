import React from 'react';
import { FiSearch, FiBell, FiFolder, FiGithub, FiStar, FiClock } from 'react-icons/fi';
import { FaPython, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiCplusplus } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { evaluateSystemPerformance } from './DynamicBackground';
import './MainContent.css';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60'
];

const MainContent = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [hasUnread, setHasUnread] = React.useState(true);
  const [featuredRepos, setFeaturedRepos] = React.useState([]);
  const [loadingRepos, setLoadingRepos] = React.useState(true);
  const [sysPerf, setSysPerf] = React.useState(null);
  const [fxMode, setFxMode] = React.useState(() => localStorage.getItem('outrun_dynamic_fx') || 'auto');

  React.useEffect(() => {
    evaluateSystemPerformance().then(setSysPerf);
  }, []);

  const handleToggleFx = (mode) => {
    setFxMode(mode);
    if (mode === 'auto') {
      localStorage.removeItem('outrun_dynamic_fx');
    } else {
      localStorage.setItem('outrun_dynamic_fx', mode);
    }
    window.location.reload();
  };

  const age = React.useMemo(() => {
    const birthDate = new Date('2009-07-28');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  }, []);

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
          <div 
            className="notification" 
            onMouseEnter={() => {
              setShowNotifications(true);
              setHasUnread(false);
            }}
            onMouseLeave={() => {
              setShowNotifications(false);
            }}
            onClick={() => {
              setShowNotifications(prev => !prev);
              setHasUnread(false);
            }}
          >
            <FiBell style={{ color: showNotifications ? 'var(--primary)' : 'inherit' }} />
            {hasUnread && <span className="badge"></span>}

            {showNotifications && (
              <div className="notification-dropdown glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="notification-header flex-between">
                  <span>{lang === 'vi' ? 'THÔNG BÁO HỆ THỐNG' : 'SYSTEM NOTIFICATIONS'}</span>
                  <span style={{ fontSize: '9px', color: '#10b981' }}>● ONLINE</span>
                </div>
                <div className="notification-list">
                  <div className="notification-item">
                    <span className="notif-text">{t('system_status')}</span>
                    <span className="notification-time">{t('just_now')}</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">{t('db_connection')}</span>
                    <span className="notification-time">{t('mins_ago')}</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">{t('visual_archive')}</span>
                    <span className="notification-time">{t('hour_ago')}</span>
                  </div>
                  <div className="notification-item">
                    <span className="notif-text">{t('reached_level', { level: age })}</span>
                    <span className="notification-time">{t('hours_ago')}</span>
                  </div>
                </div>

                {/* System Telemetry & Dynamic FX Status */}
                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(0, 255, 255, 0.2)' }}>
                  <div className="flex-between" style={{ marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--neon-magenta)', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>
                      &gt; NỀN ĐỘNG BLUR (DYNAMIC FX):
                    </span>
                    <span style={{ 
                      fontSize: '9px', 
                      padding: '2px 6px', 
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 'bold',
                      background: sysPerf?.isCapable ? 'rgba(0, 255, 255, 0.15)' : 'rgba(255, 153, 0, 0.15)',
                      color: sysPerf?.isCapable ? 'var(--neon-cyan)' : 'var(--sunset-orange)',
                      border: `1px solid ${sysPerf?.isCapable ? 'var(--neon-cyan)' : 'var(--sunset-orange)'}`
                    }}>
                      {sysPerf?.isCapable ? 'ĐÃ TẢI (HIGH-FI)' : 'KHÔNG TẢI (TIẾT KIỆM)'}
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--text-chrome)', opacity: 0.8, lineHeight: '1.4', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    &gt; {sysPerf?.reason || 'Đang kiểm tra phần cứng & mạng...'}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['auto', 'force-on', 'force-off'].map(mode => (
                      <button
                        key={mode}
                        onClick={() => handleToggleFx(mode)}
                        style={{
                          flex: 1,
                          padding: '4px 6px',
                          fontSize: '9px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          background: fxMode === mode ? 'var(--neon-cyan)' : 'rgba(26, 16, 60, 0.6)',
                          color: fxMode === mode ? '#000' : 'var(--text-chrome)',
                          border: `1px solid ${fxMode === mode ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.2)'}`,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {mode === 'auto' ? 'TỰ ĐỘNG' : mode === 'force-on' ? 'BẬT HẲN' : 'TẮT HẲN'}
                      </button>
                    ))}
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
        <div className="hero-terminal-header">
          <span>&gt; MISSION_OBJECTIVE // 2088</span>
          <div className="window-dots">
            <span className="window-dot dot-magenta" />
            <span className="window-dot dot-cyan" />
            <span className="window-dot dot-orange" />
          </div>
        </div>
        <div className="hero-content">
          <p className="welcome-text sunset-text">{lang === 'vi' ? '> CHÀO MỪNG ĐẾN VỚI THẾ GIỚI KỸ THUẬT SỐ CỦA TÔI _' : '> WELCOME TO MY DIGITAL REALM _'}</p>
          <h1 className="hero-title">
            <span className="sunset-text">Code. Game. Capture.</span>
          </h1>
          <p className="hero-desc">
            {lang === 'vi' 
              ? 'Lập trình viên Full Stack & đam mê An ninh mạng. Tôi có sở thích chơi game, chụp ảnh phong cảnh thiên nhiên và chiêm ngưỡng những cảnh đẹp hùng vĩ.' 
              : 'Full Stack Developer & Cyber Security enthusiast. I have a deep passion for gaming, capturing beautiful landscape photography, and admiring majestic sceneries.'}
          </p>
          
          <div className="tech-stack flex-center">
            <div className="tech-tag tech-next"><SiNextdotjs /> Next.js</div>
            <div className="tech-tag tech-python"><FaPython /> Python</div>
            <div className="tech-tag tech-node"><FaNodeJs /> Node.js</div>
            <div className="tech-tag tech-cpp"><SiCplusplus /> C++</div>
          </div>
          
          <div className="hero-actions">
            <button className="skew-btn-primary" onClick={() => document.getElementById('profile').scrollIntoView({ behavior: 'smooth' })}>
              <span>{lang === 'vi' ? 'XEM HỒ SƠ' : 'VIEW PROFILE'} &gt;</span>
            </button>
            <button className="skew-btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <span>{lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT ME'} &gt;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="projects-section">
        <div className="section-header flex-between">
          <h3 className="section-title flex-center"><span className="icon-gamepad">🎮</span> {t('featured_projects')}</h3>
          <button className="view-all" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>{lang === 'vi' ? 'XEM TẤT CẢ >' : 'VIEW ALL >'}</button>
        </div>
        
        <div className="projects-grid">
          {loadingRepos ? (
            <div style={{ padding: '20px', color: 'var(--primary)' }}>{lang === 'vi' ? 'ĐANG ĐỒNG BỘ GITHUB...' : 'SYNCING WITH GITHUB...'}</div>
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
                      if (!e.target.src.includes('weserv.nl')) {
                        // Nếu ảnh gốc bị lỗi, thử tải qua proxy CDN Cloudflare (weserv.nl) để tăng tốc và tăng độ ổn định
                        e.target.src = `https://images.weserv.nl/?url=https://opengraph.githubassets.com/1/${repo.full_name}`;
                      } else {
                        // Nếu qua cả proxy CDN vẫn lỗi, dùng ảnh gradient cyberpunk mặc định làm fallback cuối cùng
                        e.target.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
                      }
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
