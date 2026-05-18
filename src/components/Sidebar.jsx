import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiFolder, 
  FiAward, FiCamera, FiFileText, FiMail,
  FiPlay, FiPause
} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaFacebook } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <aside className="sidebar" data-lenis-prevent="true">
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
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiHome className="nav-icon" /> <span>HOME</span>
            </a>
          </li>
          <li>
            <a href="#profile" onClick={(e) => { e.preventDefault(); document.getElementById('profile').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiUser className="nav-icon" /> <span>PROFILE</span>
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => { e.preventDefault(); document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiCode className="nav-icon" /> <span>SKILLS</span>
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiFolder className="nav-icon" /> <span>PROJECTS</span>
            </a>
          </li>
          <li>
            <a href="#achievements" onClick={(e) => { e.preventDefault(); document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiAward className="nav-icon" /> <span>ACHIEVEMENTS</span>
            </a>
          </li>
          <li>
            <a href="#photography" onClick={(e) => { e.preventDefault(); document.getElementById('photography').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiCamera className="nav-icon" /> <span>PHOTOGRAPHY</span>
            </a>
          </li>
          <li>
            <a href="#blog" onClick={(e) => { e.preventDefault(); document.getElementById('blog').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiFileText className="nav-icon" /> <span>BLOG</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="nav-item">
              <FiMail className="nav-icon" /> <span>CONTACT</span>
            </a>
          </li>
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
  );
};

export default Sidebar;
