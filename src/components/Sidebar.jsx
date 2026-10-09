import { useState, useRef, useEffect } from 'react';
import { 
  FiHome, FiUser, FiCode, FiFolder, 
  FiAward, FiMail,
  FiPlay, FiPause, FiMenu, FiX, FiCpu,
  FiSkipBack, FiSkipForward,
  FiRewind, FiFastForward,
  FiVolume2, FiVolume1, FiVolumeX
} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaFacebook, FaTiktok, FaYoutube, FaTwitch, FaSteam, FaSoundcloud } from 'react-icons/fa';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('portfolio_music_vol');
    return saved !== null ? parseFloat(saved) : 0.7;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const isPlayingRef = useRef(false);
  const track = playlist[trackIndex];

  // Đồng bộ ref để effect đổi bài biết đang phát hay không
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Cập nhật âm lượng khi volume hoặc isMuted thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Khi đổi bài, nạp src mới và phát lại (nếu đang phát)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.src;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      const restored = prevVolume > 0 ? prevVolume : 0.7;
      setVolume(restored);
      setIsMuted(false);
      audio.volume = restored;
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      audio.volume = 0;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVol;
    }
    localStorage.setItem('portfolio_music_vol', newVol.toString());
  };

  const seekRelative = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    const current = audio.currentTime || 0;
    const dur = audio.duration || 0;
    const newTime = Math.max(0, dur ? Math.min(dur, current + seconds) : current + seconds);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    if (dur) setProgress(newTime / dur);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * audio.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(ratio);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
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

    // 2. Active Game (activity type 0) or Streaming (activity type 1)
    const gameActivity = lanyardData.activities?.find(act => act.type === 0 || act.type === 1);
    if (gameActivity) {
      let imageUrl = null;
      if (gameActivity.assets && gameActivity.assets.large_image) {
        const large = gameActivity.assets.large_image;
        if (large.startsWith('mp:external/')) {
          imageUrl = `https://media.discordapp.net/external/${large.replace(/^mp:external\//, '')}`;
        } else if (large.startsWith('mp:')) {
          imageUrl = `https://media.discordapp.net/${large.replace(/^mp:/, '')}`;
        } else if (gameActivity.application_id) {
          imageUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${large}.png`;
        }
      }
      
      // Tự động lấy icon game chính thức từ Discord Application ID qua dstn CDN
      if (!imageUrl && gameActivity.application_id) {
        imageUrl = `https://dcdn.dstn.to/app-icons/${gameActivity.application_id}.png`;
      }

      // Fallback matching nếu không có icon
      const lowerName = (gameActivity.name || '').toLowerCase();
      if (!imageUrl) {
        if (lowerName.includes('apex')) {
          imageUrl = 'https://dcdn.dstn.to/app-icons/542075586886107149.png';
        } else if (lowerName.includes('valorant')) {
          imageUrl = 'https://dcdn.dstn.to/app-icons/700136079562375258.png';
        } else if (lowerName.includes('counter-strike') || lowerName.includes('cs2') || lowerName.includes('cs:go')) {
          imageUrl = 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/png/counter-strike-global-offensive.png';
        } else if (lowerName.includes('genshin')) {
          imageUrl = 'https://dcdn.dstn.to/app-icons/762434991303950386.png';
        } else if (lowerName.includes('minecraft')) {
          imageUrl = 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/png/minecraft.png';
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&h=64';
        }
      }

      return {
        type: gameActivity.type === 1 ? 'stream' : 'game',
        title: gameActivity.name,
        subtitle: gameActivity.details || gameActivity.state || (gameActivity.type === 1 ? 'Streaming' : 'Playing'),
        image: imageUrl,
        badgeText: gameActivity.type === 1 ? 'STREAMING' : 'PLAYING'
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
          <img src="/pfp2.png" alt="Kazuki Delta" className="avatar-img" />
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
        <div className="widget-title flex-between" style={{ marginBottom: '8px' }}>
          <span>{activeActivity ? activeActivity.badgeText : (lang === 'vi' ? 'ĐANG PHÁT' : 'NOW PLAYING')}</span>
          {track?.soundcloudUrl && !activeActivity && (
            <a
              href={track.soundcloudUrl}
              target="_blank"
              rel="noreferrer"
              title="Nghe trên SoundCloud"
              style={{
                color: '#ff5500',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                filter: 'drop-shadow(0 0 4px rgba(255, 85, 0, 0.6))',
                fontSize: '15px'
              }}
            >
              <FaSoundcloud />
            </a>
          )}
        </div>
        {activeActivity ? (
          <div className="game-info flex-center">
            <div style={{ position: 'relative' }}>
               <img 
                 src={activeActivity.image} 
                 alt={activeActivity.title} 
                 className="game-cover" 
                 style={{ objectFit: 'cover' }} 
                 onError={(e) => {
                   e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&h=64';
                 }}
               />
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
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="game-cover"
                    loading="lazy"
                    onError={(e) => {
                      if (track.fallbackCover && e.currentTarget.src !== track.fallbackCover) {
                        e.currentTarget.src = track.fallbackCover;
                      } else {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=64&h=64';
                      }
                    }}
                  />
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

            {/* Thanh tiến trình bài hát có thể click/kéo tua */}
            <div
              className="track-progress"
              onClick={handleSeek}
              role="slider"
              tabIndex={0}
              aria-label="Track progress"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              title={lang === 'vi' ? 'Nhấn để tua bài hát' : 'Click to seek'}
            >
              <div className="track-progress-fill" style={{ width: `${progress * 100}%` }}>
                <span className="track-progress-thumb" />
              </div>
            </div>

            {/* Hiển thị thời gian phát / thời lượng */}
            <div className="track-time-row flex-between">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Nút điều khiển: Lùi bài, Tua -5s, Play/Pause, Tua +5s, Bài tiếp */}
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
                className="track-btn track-btn-seek"
                onClick={() => seekRelative(-5)}
                aria-label="-5s"
                title={lang === 'vi' ? 'Tua lùi 5 giây (-5s)' : 'Rewind 5s'}
              >
                <FiRewind />
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
                className="track-btn track-btn-seek"
                onClick={() => seekRelative(5)}
                aria-label="+5s"
                title={lang === 'vi' ? 'Tua tới 5 giây (+5s)' : 'Fast forward 5s'}
              >
                <FiFastForward />
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

            {/* Thanh điều chỉnh âm lượng */}
            <div className="track-volume-row flex-between">
              <button
                type="button"
                className="volume-btn"
                onClick={toggleMute}
                title={isMuted ? (lang === 'vi' ? 'Bật âm thanh' : 'Unmute') : (lang === 'vi' ? 'Tắt tiếng' : 'Mute')}
              >
                {isMuted || volume === 0 ? <FiVolumeX /> : volume < 0.5 ? <FiVolume1 /> : <FiVolume2 />}
              </button>
              <div className="volume-slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Volume"
                  title={`${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </div>
              <span className="volume-label">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            <audio
              ref={audioRef}
              onLoadedMetadata={(e) => {
                const el = e.currentTarget;
                if (el.duration) setDuration(el.duration);
                el.volume = isMuted ? 0 : volume;
              }}
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                setCurrentTime(el.currentTime);
                if (el.duration) {
                  setDuration(el.duration);
                  setProgress(el.currentTime / el.duration);
                }
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
        <a href="https://www.facebook.com/KazukiDelta/" target="_blank" rel="noreferrer" className="social-icon" title="Facebook"><FaFacebook /></a>
        <a href="https://youtube.com/@KazukiDelta" target="_blank" rel="noreferrer" className="social-icon" title="YouTube"><FaYoutube /></a>
        <a href="https://twitch.tv/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon" title="Twitch"><FaTwitch /></a>
        <a href="https://www.tiktok.com/@notd3lt4" target="_blank" rel="noreferrer" className="social-icon" title="TikTok"><FaTiktok /></a>
        <a href="https://discordapp.com/users/785490511526887445" target="_blank" rel="noreferrer" className="social-icon" title="Discord"><FaDiscord /></a>
        <a href="https://steamcommunity.com/id/KazukiDelta/" target="_blank" rel="noreferrer" className="social-icon" title="Steam"><FaSteam /></a>
        <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon" title="GitHub"><FaGithub /></a>
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
