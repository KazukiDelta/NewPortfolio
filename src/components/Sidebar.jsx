import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiFolder, 
  FiAward, FiMail,
  FiPlay, FiPause, FiMenu, FiX, FiCpu,
  FiSkipBack, FiSkipForward
} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaFacebook, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { playlist } from '../data/playlist';
import './Sidebar.css';

const Sidebar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lanyardData, setLanyardData] = useState(null);
  const audioRef = useRef(null);

  // ===== PLAYLIST NHẠC NỀN =====
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isPlayingRef = useRef(false);
  const track = playlist[trackIndex];

  // Đồng bộ ref để effect đổi bài biết đang phát hay không
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Khi đổi bài, nạp src mới và phát lại (nếu đang phát)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.src;
    audio.load();
    setProgress(0);
    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }
  }, [trackIndex, track]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    setTrackIndex(i => (i + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    setTrackIndex(i => (i - 1 + playlist.length) % playlist.length);
  };

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
        return { text: '> ONLINE', color: '#00FFFF' };
      case 'idle':
        return { text: '> IDLE', color: '#FF9900' };
      case 'dnd':
        return { text: '> DND', color: '#FF00FF' };
      default:
        return { text: '> OFFLINE', color: 'rgba(224, 224, 224, 0.5)' };
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
        {/* Terminal Window Header Bar */}
        <div className="sidebar-terminal-bar">
          <span>&gt; KD_SYS_2088</span>
          <div className="sidebar-terminal-dots">
            <span className="sidebar-dot dot-magenta" />
            <span className="sidebar-dot dot-cyan" />
            <span className="sidebar-dot dot-orange" />
          </div>
        </div>

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
        <p className="widget-title">{activeActivity ? activeActivity.badgeText : (lang === 'vi' ? 'ĐANG PHÁT' : 'NOW PLAYING')}</p>
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
        ) : track ? (
          <>
            <div className="game-info flex-center" style={{ cursor: 'pointer' }} onClick={togglePlay}>
              <div style={{ position: 'relative' }}>
                {track.cover ? (
                  <img src={track.cover} alt={track.title} className="game-cover" loading="lazy" />
                ) : (
                  <div className="game-cover game-cover-fallback flex-center">
                    <FiPlay color="var(--neon-cyan)" size={16} />
                  </div>
                )}
                <div className="play-overlay flex-center">
                  {isPlaying ? <FiPause color="white" /> : <FiPlay color="white" />}
                </div>
              </div>
              <div className="game-details" style={{ textAlign: 'left' }}>
                <h4 title={track.title}>{track.title}</h4>
                <p title={track.artist}>{track.artist}</p>
              </div>
            </div>

            {/* Thanh tiến trình bài hát */}
            <div
              className="track-progress"
              role="progressbar"
              aria-label="Track progress"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="track-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>

            {/* Nút điều khiển */}
            <div className="track-controls">
              <button
                type="button"
                className="track-btn"
                onClick={prevTrack}
                aria-label={lang === 'vi' ? 'Bài trước' : 'Previous track'}
                title={lang === 'vi' ? 'Bài trước' : 'Previous'}
              >
                <FiSkipBack />
              </button>
              <button
                type="button"
                className="track-btn track-btn-main"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button
                type="button"
                className="track-btn"
                onClick={nextTrack}
                aria-label={lang === 'vi' ? 'Bài tiếp' : 'Next track'}
                title={lang === 'vi' ? 'Bài tiếp' : 'Next'}
              >
                <FiSkipForward />
              </button>
            </div>

            <audio
              ref={audioRef}
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                if (el.duration) setProgress(el.currentTime / el.duration);
              }}
              onEnded={nextTrack}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </>
        ) : null}

        <div className={`music-bars ${(isPlaying || activeActivity) ? 'playing' : 'paused'}`}>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="lang-switcher" style={{ margin: '14px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={toggleLanguage}
          style={{
            background: 'rgba(26, 16, 60, 0.6)',
            border: '1px solid var(--neon-cyan)',
            color: 'var(--neon-cyan)',
            padding: '7px 16px',
            borderRadius: '0px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-linear',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'var(--neon-cyan)';
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.boxShadow = '0 0 20px var(--neon-cyan)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(26, 16, 60, 0.6)';
            e.currentTarget.style.color = 'var(--neon-cyan)';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.25)';
          }}
        >
          <span>&gt; LANG: {lang === 'vi' ? 'ENGLISH' : 'TIẾNG VIỆT'}</span>
        </button>
      </div>

      {/* Social Links */}
      <div className="social-links flex-between">
        <a href="https://www.facebook.com/KazukiDeruta/" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
        <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon"><FaGithub /></a>
        <a href="https://discordapp.com/users/785490511526887445" target="_blank" rel="noreferrer" className="social-icon" title="Discord"><FaDiscord /></a>
        <a href="https://www.tiktok.com/@notd3lt4" target="_blank" rel="noreferrer" className="social-icon" title="TikTok"><FaTiktok /></a>
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
