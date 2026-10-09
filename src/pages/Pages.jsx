import React from 'react';
import MainContent from '../components/MainContent';
import { FiGithub, FiMail, FiMapPin, FiLayout, FiServer, FiDatabase, FiCamera, FiZap } from 'react-icons/fi';
import { FaCamera, FaKeyboard, FaHeadphones, FaDesktop, FaMouse, FaMicrochip, FaMobileAlt, FaDiscord, FaTiktok, FaFacebook, FaGithub, FaYoutube, FaTwitch, FaSteam, FaTwitter } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

// The Home page renders the MainContent
export const Home = () => {
  const homeRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="home" ref={homeRef} className="reveal-element snap-section">
      <MainContent />
    </div>
  );
};

// Reusable Vaporwave Terminal Container for all pages
const PageContainer = ({ title, children, id, showChrome = true }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main id={id} className="main-content snap-section" style={{ padding: 0, marginRight: 0 }}>
      <section ref={containerRef} className="reveal-element reveal-container">
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {/* Terminal Window Chrome */}
          {showChrome && (
            <div className="terminal-window-bar reveal-item" style={{ marginBottom: 'clamp(8px, 1.4vh, 18px)' }}>
              <span>&gt; MODULE_{id.toUpperCase()} // 2088</span>
              <div className="window-dots">
                <span className="window-dot dot-magenta" />
                <span className="window-dot dot-cyan" />
                <span className="window-dot dot-orange" />
              </div>
            </div>
          )}
          {title && (
            <h2 className="sunset-text reveal-item" style={{ fontSize: 'clamp(20px, 3.2vh, 36px)', marginBottom: 'clamp(10px, 1.8vh, 22px)', textTransform: 'uppercase', letterSpacing: '2.5px' }}>
              &gt; {title}
            </h2>
          )}
          <div className="reveal-item">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};

export const Profile = () => {
  const { t } = useLanguage();
  return (
    <PageContainer title={t('profile_title')} id="profile">
      <div className="profile-content">
        <div className="profile-image">
          <img src="/pfp2.png" alt="Kazuki Delta" loading="lazy" />
        </div>
        <div className="profile-info laser-card" style={{ padding: '32px 36px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--neon-magenta)', letterSpacing: '2px', fontWeight: 'bold' }}>
              &gt; OPERATOR_PROFILE // #2009
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', padding: '2px 8px' }}>
              ACCESS_GRANTED
            </span>
          </div>
          <h3 className="cyan-glow-text" style={{ fontSize: '32px', marginBottom: '8px' }}>Kazuki Delta</h3>
          <h4 style={{ fontSize: '16px', color: 'var(--neon-magenta)', marginBottom: '20px', letterSpacing: '1.5px', textShadow: '0 0 8px var(--neon-magenta)' }}>
            &gt; {t('profile_subtitle')}
          </h4>
          <p style={{ lineHeight: 1.8, fontSize: '16px', color: 'var(--text-chrome)' }}>
            {t('profile_bio')}
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'var(--neon-cyan)',
      icon: <FiLayout style={{ fontSize: '24px' }} />,
      skills: ['Next.js', 'React', 'Tailwind', 'CSS3', 'Vite']
    },
    {
      title: 'Backend',
      color: 'var(--neon-magenta)',
      icon: <FiServer style={{ fontSize: '24px' }} />,
      skills: ['Python', 'Node.js', 'C++', 'Express', 'API Rest']
    },
    {
      title: 'Database & Cloud',
      color: 'var(--sunset-orange)',
      icon: <FiDatabase style={{ fontSize: '24px' }} />,
      skills: ['Supabase', 'MongoDB', 'PostgreSQL', 'Firebase']
    }
  ];

  return (
    <PageContainer title={t('skills_title')} id="skills">
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-item laser-card reveal-item" style={{
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            borderTop: `3px solid ${category.color} !important`,
          }}>
            {/* Rotating Diamond Icon Container */}
            <div className="diamond-icon-frame" style={{ borderColor: category.color, marginBottom: '28px' }}>
              <span style={{ color: category.color }}>{category.icon}</span>
            </div>
            <h4 style={{ color: category.color, fontSize: '20px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-heading)' }}>
              {category.title}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', zIndex: 1 }}>
              {category.skills.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(9, 0, 20, 0.7)',
                  color: 'var(--text-chrome)',
                  border: `1px solid ${category.color}`,
                  padding: '5px 12px',
                  borderRadius: '0px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  boxShadow: `0 0 8px ${category.color}44`,
                  transition: 'all 0.2s ease-linear',
                  cursor: 'default'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 0 15px ${category.color}`;
                    e.currentTarget.style.background = category.color;
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 0 8px ${category.color}44`;
                    e.currentTarget.style.background = 'rgba(9, 0, 20, 0.7)';
                    e.currentTarget.style.color = 'var(--text-chrome)';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export const Projects = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.github.com/users/KazukiDelta/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(data => {
        const myProjects = data.filter(repo => !repo.fork).slice(0, 4);
        setRepos(myProjects);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer title={t('projects_title')} id="projects">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p className="cyan-glow-text" style={{ fontSize: '20px', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>
            &gt; {t('establishing_uplink')}...
          </p>
        </div>
      ) : (
        <div className="projects-list page-grid-2col">
          {repos.map(repo => (
            <div key={repo.id} className="project-item laser-card" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px', display: 'block', marginBottom: '4px' }}>
                    &gt; REPOSITORY // GITHUB
                  </span>
                  <h3 className="cyan-glow-text" style={{ fontSize: '24px', wordBreak: 'break-word', letterSpacing: '1px' }}>
                    {repo.name}
                  </h3>
                </div>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '28px', color: 'var(--neon-cyan)', transition: 'all 0.2s ease-linear' }} title="View Source">
                  <FiGithub />
                </a>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-chrome)', marginBottom: '22px', lineHeight: '1.6', flexGrow: 1, fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
                {repo.description || t('no_description')}
              </p>
              <div className="tech-stack" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {repo.language && (
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '0px', background: 'rgba(0, 255, 255, 0.08)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                    {repo.language}
                  </span>
                )}
                <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '0px', background: 'rgba(255, 153, 0, 0.08)', color: 'var(--sunset-orange)', border: '1px solid var(--sunset-orange)', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  ★ {repo.stargazers_count}
                </span>
                {repo.fork && (
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '0px', background: 'rgba(255, 0, 255, 0.08)', color: 'var(--neon-magenta)', border: '1px solid var(--neon-magenta)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                    FORKED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export const Achievements = () => {
  const { t } = useLanguage();
  return (
    <PageContainer title={t('achievements_title')} id="achievements">
      <div className="achievement-list page-grid-2col">
        <div className="achievement-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '28px', padding: '24px 28px', borderTopColor: 'var(--neon-cyan) !important' }}>
          <div className="diamond-icon-frame" style={{ width: '60px', height: '60px', fontSize: '28px', borderColor: 'var(--neon-cyan)' }}>
            <span>🥈</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              &gt; RANK_02 // SILVER_TIER
            </span>
            <h4 style={{ fontSize: '22px', marginTop: '4px', marginBottom: '6px', color: '#fff', letterSpacing: '1px' }}>
              {t('it_prize_title')}
            </h4>
            <p style={{ fontSize: '15px', color: 'var(--text-chrome)', lineHeight: '1.6', fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
              {t('it_prize_desc')}
            </p>
          </div>
        </div>
        <div className="achievement-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '28px', padding: '24px 28px', borderTopColor: 'var(--sunset-orange) !important' }}>
          <div className="diamond-icon-frame" style={{ width: '60px', height: '60px', fontSize: '28px', borderColor: 'var(--sunset-orange)' }}>
            <span>🥉</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--sunset-orange)', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              &gt; RANK_03 // BRONZE_TIER
            </span>
            <h4 style={{ fontSize: '22px', marginTop: '4px', marginBottom: '6px', color: '#fff', letterSpacing: '1px' }}>
              {t('english_prize_title')}
            </h4>
            <p style={{ fontSize: '15px', color: 'var(--text-chrome)', lineHeight: '1.6', fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
              {t('english_prize_desc')}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export const Gear = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('camera');

  const tabs = [
    { id: 'camera', label: t('camera'), icon: <FiCamera />, color: 'var(--sunset-orange)' },
    { id: 'Devices', label: t('devices'), icon: <FaDesktop />, color: 'var(--neon-cyan)' },
    { id: 'gaming', label: t('gaming'), icon: <FiZap />, color: 'var(--neon-magenta)' },
  ];

  const gearData = {
    camera: [
      {
        icon: <FaCamera />,
        name: 'Sony a6400',
        category: 'Mirrorless Body',
        specs: [
          '24.2MP APS-C CMOS Sensor',
          '4K30p / 1080p120 Video',
          '425-point Phase-detect AF',
          'Real-time Eye AF & Tracking',
          '11 fps Continuous Shooting',
        ],
        badge: 'MAIN BODY',
      },
      {
        icon: <FiCamera />,
        name: 'Sony E 16-50mm f/3.5-5.6 OSS',
        category: 'Kit Zoom Lens',
        specs: [
          'Focal Length: 16–50mm (APS-C)',
          'Max Aperture: f/3.5–5.6',
          'Retractable Power Zoom',
          'Optical SteadyShot (OSS)',
          'Weight: 116g',
        ],
        badge: 'KIT LENS',
      },
      {
        icon: <FiCamera />,
        name: 'Tripod 180cm',
        category: 'Stabilization',
        specs: [
          'Max Height: 180cm',
          'Sturdy Build',
          'Adjustable Legs',
          'Pan/Tilt Head',
          'Portable Design',
        ],
        badge: 'TRIPOD',
      },
    ],
    Devices: [
      {
        icon: <FaDesktop />,
        name: 'Macbook Air 2017',
        category: 'Laptop',
        specs: [
          '13.3-inch LED-backlit display',
          '1.8GHz dual-core Intel Core i5',
          '8GB of 1600MHz LPDDR3 memory',
          'Intel HD Graphics 6000',
          '128GB PCIe-based SSD',
        ],
        badge: 'MAIN LAPTOP',
      },
      {
        icon: <FaMicrochip />,
        name: 'Custom Desktop PC',
        category: 'Desktop Workstation',
        specs: [
          'CPU: AMD Ryzen 5 5500',
          'RAM: 16GB RAM',
          'GPU: AMD Radeon RX 6600 XT',
        ],
        badge: 'MAIN PC',
      },
      {
        icon: <FaMobileAlt />,
        name: 'Redmi K70',
        category: 'Smartphone',
        specs: [
          'Snapdragon 8 Gen 2',
          '6.67" 2K OLED 120Hz',
          '5000mAh Battery',
          '120W HyperCharge',
        ],
        badge: 'PHONE',
      },
    ],
    gaming: [
      {
        icon: <FaMouse />,
        name: 'Attack Shark R1',
        category: 'Gaming Mouse',
        specs: [
          'Ultra-lightweight Design',
          'High Precision Sensor',
          'Tri-mode Wireless Connectivity',
          'Ergonomic Shape',
          'Customizable DPI',
        ],
        badge: 'MOUSE',
      },
      {
        icon: <FaKeyboard />,
        name: 'AULA F75',
        category: 'Mechanical Keyboard',
        specs: [
          '75% Compact Layout',
          'Hot-swappable Switches',
          'Gasket Mount Structure',
          'Tri-mode Connection',
          'RGB Backlight',
        ],
        badge: 'KEYBOARD',
      },
      {
        icon: <FaHeadphones />,
        name: 'Soundpeats T1 Pro',
        category: 'Wireless Earbuds',
        specs: [
          'Active Noise Cancellation',
          'Bluetooth Connectivity',
          'Long Battery Life',
          'Clear Mic Quality',
          'Comfortable In-ear Fit',
        ],
        badge: 'AUDIO',
      },
      {
        icon: <FaHeadphones />,
        name: 'KZ Castor',
        category: 'In-Ear Monitors',
        specs: [
          'Harman Target / Improved Bass Tuning',
          'Dual Dynamic Drivers (10mm + 8mm)',
          '4-Level Tuning Switches',
          'Hi-Res Audio Performance',
        ],
        badge: 'IEM',
      },
    ],
  };

  const currentGear = gearData[activeTab];
  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <PageContainer title={t('gear_title')} id="gear">
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`gear-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '0px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              border: activeTab === tab.id
                ? `2px solid ${tab.color}`
                : '1px solid var(--border-muted)',
              background: activeTab === tab.id
                ? 'rgba(26, 16, 60, 0.9)'
                : 'rgba(10, 5, 20, 0.6)',
              color: activeTab === tab.id ? tab.color : 'var(--text-chrome)',
              boxShadow: activeTab === tab.id
                ? `0 0 20px ${tab.color}`
                : 'none',
              transition: 'all 0.2s ease-linear',
              transform: activeTab === tab.id ? 'translateY(-2px)' : 'none',
            }}
          >
            <span>{tab.icon}</span>
            &gt; {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Gear Cards Grid */}
      <div className="gear-grid">
        {currentGear.map((item, i) => (
          <div
            key={i}
            className="gear-card laser-card"
            style={{
              padding: '24px',
              borderRadius: '0px',
              borderTop: `3px solid ${currentTab.color} !important`,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{
                fontSize: '28px', color: currentTab.color,
                filter: `drop-shadow(0 0 8px ${currentTab.color})`,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px',
                padding: '3px 8px', borderRadius: '0px',
                background: 'rgba(9, 0, 20, 0.8)',
                color: currentTab.color,
                border: `1px solid ${currentTab.color}`,
                whiteSpace: 'nowrap',
              }}>
                {item.badge}
              </span>
            </div>

            {/* Name & Category */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px', letterSpacing: '1px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '11px', color: currentTab.color, fontFamily: 'var(--font-mono)', fontWeight: '700', letterSpacing: '1px' }}>
                &gt; {item.category}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${currentTab.color}, transparent)` }} />

            {/* Specs List */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
              {item.specs.map((spec, si) => (
                <li key={si} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-chrome)', fontFamily: 'var(--font-mono)' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '0px', flexShrink: 0,
                    background: currentTab.color,
                    boxShadow: `0 0 6px ${currentTab.color}`,
                  }} />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export const Contact = () => {
  const { t } = useLanguage();

  // Các kênh liên hệ trực tiếp (mạng xã hội + gaming creator channels)
  const channels = [
    {
      id: 'youtube',
      label: 'YOUTUBE',
      handle: '@KazukiDelta',
      href: 'https://youtube.com/@KazukiDelta',
      color: '#ff2a2a',
      icon: <FaYoutube />,
    },
    {
      id: 'twitch',
      label: 'TWITCH',
      handle: 'KazukiDelta',
      href: 'https://twitch.tv/KazukiDelta',
      color: '#a970ff',
      icon: <FaTwitch />,
    },
    {
      id: 'tiktok',
      label: 'TIKTOK',
      handle: '@notd3lt4',
      href: 'https://www.tiktok.com/@notd3lt4',
      color: 'var(--neon-magenta)',
      icon: <FaTiktok />,
    },
    {
      id: 'facebook',
      label: 'FACEBOOK',
      handle: 'KazukiDelta',
      href: 'https://www.facebook.com/KazukiDelta/',
      color: '#1877f2',
      icon: <FaFacebook />,
    },
    {
      id: 'discord',
      label: 'DISCORD',
      handle: 'Direct message / Comms',
      href: 'https://discordapp.com/users/785490511526887445',
      color: '#5865f2',
      icon: <FaDiscord />,
    },
    {
      id: 'steam',
      label: 'STEAM',
      handle: 'KazukiDelta',
      href: 'https://steamcommunity.com/id/KazukiDelta/',
      color: '#66c0f4',
      icon: <FaSteam />,
    },
    {
      id: 'twitter',
      label: 'TWITTER / X',
      handle: '@KazukiDelta',
      href: 'https://twitter.com/KazukiDelta',
      color: '#1da1f2',
      icon: <FaTwitter />,
    },
    {
      id: 'github',
      label: 'GITHUB',
      handle: '@KazukiDelta',
      href: 'https://github.com/KazukiDelta',
      color: 'var(--neon-cyan)',
      icon: <FaGithub />,
    },
  ];

  return (
    <PageContainer title={t('contact_title')} id="contact">
      <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '850px' }}>
        <p style={{ fontSize: '18px', color: 'var(--text-chrome)', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
          &gt; {t('contact_desc')}
        </p>

        <div className="contact-info page-flex-wrap">
          <a
            href="mailto:rockykanikatm@gmail.com"
            className="contact-item laser-card"
            style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', flex: 1, borderTopColor: 'var(--neon-cyan) !important', textDecoration: 'none' }}
          >
            <div style={{ fontSize: '32px', color: 'var(--neon-cyan)', filter: 'drop-shadow(0 0 8px var(--neon-cyan))' }}><FiMail /></div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', display: 'block', letterSpacing: '1.5px', fontWeight: 'bold' }}>&gt; DIRECT_FREQUENCY</span>
              <span style={{ fontSize: '17px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>rockykanikatm@gmail.com</span>
            </div>
          </a>
          <div className="contact-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', flex: 1, borderTopColor: 'var(--neon-magenta) !important' }}>
            <div style={{ fontSize: '32px', color: 'var(--neon-magenta)', filter: 'drop-shadow(0 0 8px var(--neon-magenta))' }}><FiMapPin /></div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)', display: 'block', letterSpacing: '1.5px', fontWeight: 'bold' }}>&gt; GRID_COORDINATES</span>
              <span style={{ fontSize: '17px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{t('location')}</span>
            </div>
          </div>
        </div>

        {/* Social Channels */}
        <div className="contact-channels">
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '14px' }}>
            &gt; {t('channels')}
          </p>
          <div className="page-grid-2col" style={{ display: 'grid', gap: '16px' }}>
            {channels.map(channel => (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="channel-card laser-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px',
                  textDecoration: 'none', borderTop: `3px solid ${channel.color} !important`,
                }}
              >
                <span style={{
                  fontSize: '26px', color: channel.color, flexShrink: 0,
                  filter: `drop-shadow(0 0 8px ${channel.color})`,
                }}>{channel.icon}</span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{
                    fontSize: '10px', color: channel.color, fontFamily: 'var(--font-mono)',
                    letterSpacing: '1.5px', fontWeight: 'bold',
                  }}>&gt; {channel.label}</span>
                  <span style={{
                    fontSize: '15px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 'bold',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{channel.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Retro CTA */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
          <a
            href="https://discordapp.com/users/785490511526887445"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <span>DISCORD // COMMS</span>
          </a>
          <a
            href="https://youtube.com/@KazukiDelta"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>YOUTUBE // CHANNEL</span>
          </a>
          <a
            href="https://github.com/KazukiDelta"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>GITHUB // ARCHIVE</span>
          </a>
        </div>
      </div>
    </PageContainer>
  );
};
