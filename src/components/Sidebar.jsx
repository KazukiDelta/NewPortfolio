import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiFolder, 
  FiAward, FiCamera, FiFileText, FiMail,
  FiPlay, FiPause, FiMenu, FiX
} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaFacebook } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const audioRef = useRef(null);

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
        <p className="title">Full Stack Dev, Cyber Security</p>
        <div className="status flex-center">
          <span className="dot"></span> Online
        </div>
        
        <div className="level-bar">
          <div className="level-info flex-between">
            <span>LEVEL 23</span>
            <span>12,540 / 20,000 XP</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{width: '62%'}}></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <ul>
          {[
            { id: 'home',         icon: <FiHome />,     label: 'HOME' },
            { id: 'profile',      icon: <FiUser />,     label: 'PROFILE' },
            { id: 'skills',       icon: <FiCode />,     label: 'SKILLS' },
            { id: 'projects',     icon: <FiFolder />,   label: 'PROJECTS' },
            { id: 'achievements', icon: <FiAward />,    label: 'ACHIEVEMENTS' },
            { id: 'photography',  icon: <FiCamera />,   label: 'PHOTOGRAPHY' },
            { id: 'blog',         icon: <FiFileText />, label: 'BLOG' },
            { id: 'contact',      icon: <FiMail />,     label: 'CONTACT' },
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
        <p className="widget-title">NOW PLAYING</p>
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
        <audio ref={audioRef} src="/die-for-you.mp3" loop />
        <div className={`music-bars ${isPlaying ? 'playing' : 'paused'}`}>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
           <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-links flex-between">
        <a href="https://www.facebook.com/KazukiDeruta/" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
        <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon"><FaGithub /></a>
        <a href="https://discordapp.com/users/785490511526887445" target="_blank" rel="noreferrer" className="social-icon" title="Discord"><FaDiscord /></a>
      </div>

      <div className="copyright">
        <p>© 2024 Kazuki Delta</p>
        <p>All rights reserved.</p>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
