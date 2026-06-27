import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiFolder, 
  FiAward, FiCamera, FiMail,
  FiPlay, FiPause, FiMenu, FiX, FiCpu
} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaFacebook } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './Sidebar.css';

const Sidebar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lanyardData, setLanyardData] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initial status fetch
    fetch('https://api.lanyard.rest/v1/users/785490511526887445')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setLanyardData(resData.data);
        }
      })
      .catch(err => console.error(err));

    // Connect WebSocket
    const ws = new WebSocket('wss://api.lanyard.rest/websocket');
    let heartbeat;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === 1) {
        heartbeat = setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, data.d.heartbeat_interval);

        ws.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: '785490511526887445' }
        }));
      } else if (data.op === 0) {
        if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
          if (data.d) {
            setLanyardData(data.d);
          }
        }
      }
    };

    return () => {
      if (heartbeat) clearInterval(heartbeat);
      ws.close();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const getLevelAndXP = () => {
    const birthDate = new Date('2009-07-28');
    const today = new Date();
    
    // Calculate level (age in years)
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    
    // Calculate start and end dates of the current level year
    const lastBirthday = new Date(birthDate);
    lastBirthday.setFullYear(birthDate.getFullYear() + age);
    
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(birthDate.getFullYear() + age + 1);
    
    const oneDayMs = 24 * 60 * 60 * 1000;
    const totalDays = Math.round((nextBirthday.getTime() - lastBirthday.getTime()) / oneDayMs);
    const elapsedDays = Math.round((today.getTime() - lastBirthday.getTime()) / oneDayMs);
    
    const percentage = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
    
    return {
      level: age,
      xp: elapsedDays,
      nextLevelXp: totalDays,
      percentage: Math.round(percentage)
    };
  };

  const { level, xp, nextLevelXp, percentage } = getLevelAndXP();

  const discordStatus = lanyardData?.discord_status || 'offline';

  const getStatusDetails = (status) => {
    switch (status) {
      case 'online':
        return { text: 'Online', color: '#10b981' };
      case 'idle':
        return { text: 'Idle', color: '#f59e0b' };
      case 'dnd':
        return { text: 'Do Not Disturb', color: '#ef4444' };
      default:
        return { text: 'Offline', color: '#6b7280' };
    }
  };

  const { text: statusText, color: statusColor } = getStatusDetails(discordStatus);

  const getActiveActivity = () => {
    if (!lanyardData) return null;

    // 1. Spotify
    if (lanyardData.listening_to_spotify && lanyardData.spotify) {
      return {
        type: 'spotify',
        title: lanyardData.spotify.song,
        subtitle: lanyardData.spotify.artist,
        image: lanyardData.spotify.album_art_url,
        badgeText: 'LISTENING TO SPOTIFY'
      };
    }

    // 2. Active Game (activity type 0)
    const gameActivity = lanyardData.activities?.find(act => act.type === 0);
    if (gameActivity) {
      let imageUrl = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=64&h=64';
      if (gameActivity.assets && gameActivity.assets.large_image) {
        if (gameActivity.assets.large_image.startsWith('mp:external/')) {
          imageUrl = `https://media.discordapp.net/${gameActivity.assets.large_image.replace('mp:', '')}`;
        } else if (gameActivity.application_id) {
          imageUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`;
        }
      }
      return {
        type: 'game',
        title: gameActivity.name,
        subtitle: gameActivity.details || gameActivity.state || 'Playing',
        image: imageUrl,
        badgeText: 'PLAYING'
      };
    }

    return null;
  };

  const activeActivity = getActiveActivity();

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar${mobileOpen ? ' sidebar-open' : ''}`} data-lenis-prevent="true">
      {/* Brand */}
      <div className="brand flex-center">
        <div className="brand-logo">KD</div>
      </div>
      
      {/* Profile Info */}
      <div className="profile-widget flex-center flex-col">
        <div className="avatar">
          <img src="https://github.com/KazukiDelta.png" alt="Avatar" className="avatar-img" />
        </div>
        <h2 className="name">Kazuki Delta</h2>
        <div className="status flex-center" style={{ color: statusColor }}>
          <span className="dot" style={{ backgroundColor: statusColor, boxShadow: `0 0 7px ${statusColor}` }}></span> {statusText}
        </div>
        
        <div className="level-bar">
          <div className="level-info flex-between">
            <span>LEVEL {level}</span>
            <span>{xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{width: `${percentage}%`}}></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <ul>
          {[
            { id: 'home',         icon: <FiHome />,     label: t('home') },
            { id: 'profile',      icon: <FiUser />,     label: t('profile') },
            { id: 'skills',       icon: <FiCode />,     label: t('skills') },
            { id: 'projects',     icon: <FiFolder />,   label: t('projects') },
            { id: 'achievements', icon: <FiAward />,    label: t('achievements') },
            { id: 'photography',  icon: <FiCamera />,   label: t('photography') },
            { id: 'gear',         icon: <FiCpu />,      label: t('gear') },
            { id: 'contact',      icon: <FiMail />,     label: t('contact') },
          ].map(({ id, icon, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); handleNavClick(id); }} className="nav-item">
                <span className="nav-icon">{icon}</span> <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Now Playing Widget */}
      <div className="now-playing glass-panel">
        <p className="widget-title">{activeActivity ? activeActivity.badgeText : (lang === 'vi' ? 'ĐANG CHƠI' : 'NOW PLAYING')}</p>
        {activeActivity ? (
          <div className="game-info flex-center">
            <div style={{ position: 'relative' }}>
               <img src={activeActivity.image} alt={activeActivity.title} className="game-cover" style={{ objectFit: 'cover' }} />
            </div>
            <div className="game-details" style={{ textAlign: 'left' }}>
              <h4 style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px'
              }} title={activeActivity.title}>{activeActivity.title}</h4>
              <p style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px'
              }} title={activeActivity.subtitle}>{activeActivity.subtitle}</p>
            </div>
          </div>
        ) : (
          <div className="game-info flex-center" style={{ cursor: 'pointer' }} onClick={togglePlay}>
            <div style={{ position: 'relative' }}>
               <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=64&h=64" alt="Die For You" className="game-cover" />
               <div className="play-overlay flex-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '4px' }}>
                  {isPlaying ? <FiPause color="white" /> : <FiPlay color="white" />}
               </div>
            </div>
            <div className="game-details" style={{ textAlign: 'left' }}>
              <h4>Die For You</h4>
              <p>VALORANT</p>
            </div>
          </div>
        )}
        <audio ref={audioRef} src="/die-for-you.mp3" loop />
        <div className={`music-bars ${(isPlaying || activeActivity) ? 'playing' : 'paused'}`}>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="lang-switcher" style={{ margin: '15px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={toggleLanguage}
          className="neon-border"
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--primary)',
            color: 'var(--text-main)',
            padding: '6px 16px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 5px rgba(0, 180, 216, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.boxShadow = '0 0 10px var(--primary)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
            e.currentTarget.style.color = 'var(--text-main)';
            e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 180, 216, 0.2)';
          }}
        >
          <span>🌐 {lang === 'vi' ? 'ENGLISH' : 'TIẾNG VIỆT'}</span>
        </button>
      </div>

      {/* Social Links */}
      <div className="social-links flex-between">
        <a href="https://www.facebook.com/KazukiDeruta/" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
        <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon"><FaGithub /></a>
        <a href="https://discordapp.com/users/785490511526887445" target="_blank" rel="noreferrer" className="social-icon" title="Discord"><FaDiscord /></a>
      </div>

      <div className="copyright">
        <p>© 2024 Kazuki Delta</p>
        <p>{t('copyright')}</p>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
