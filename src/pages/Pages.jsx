import React from 'react';
import MainContent from '../components/MainContent';
import { FiMail, FiMapPin, FiLayout, FiServer, FiDatabase, FiCamera, FiZap, FiExternalLink } from 'react-icons/fi';
import { FaCamera, FaKeyboard, FaHeadphones, FaDesktop, FaMouse, FaMicrochip, FaMobileAlt, FaDiscord, FaTiktok, FaFacebook, FaYoutube, FaTwitch, FaSteam, FaTwitter, FaGithub } from 'react-icons/fa';
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

// Reusable Modern Bento Container for all pages
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
        <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto' }}>
          {/* Subtle Section Tag */}
          {showChrome && (
            <div className="terminal-window-bar reveal-item" style={{ marginBottom: 'clamp(10px, 1.6vh, 18px)' }}>
              <span>DELTA.HQ // {id.toUpperCase()}</span>
              <div className="window-dots">
                <span className="window-dot dot-magenta" />
                <span className="window-dot dot-cyan" />
                <span className="window-dot dot-orange" />
              </div>
            </div>
          )}
          {title && (
            <h2 className="sunset-text reveal-item" style={{ fontSize: 'clamp(26px, 3.8vh, 42px)', marginBottom: 'clamp(14px, 2.2vh, 28px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {title}
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
        <div className="profile-info laser-card" style={{ padding: 'clamp(24px, 3.5vh, 40px)', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--primary-light)', letterSpacing: '0.08em', fontWeight: 600 }}>
              FULL-STACK DEVELOPER &amp; CREATOR
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 10px', borderRadius: '20px' }}>
              ● ACTIVE // ONLINE
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(24px, 3.2vh, 34px)', marginBottom: '8px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Kazuki Delta
          </h3>
          <h4 style={{ fontSize: '15px', color: 'var(--primary-light)', marginBottom: '18px', fontWeight: 600 }}>
            {t('profile_subtitle')}
          </h4>
          <p style={{ lineHeight: 1.8, fontSize: '15px', color: 'var(--text-muted)' }}>
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
      title: 'Frontend Architecture',
      color: 'var(--neon-cyan)',
      icon: <FiLayout />,
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
    },
    {
      title: 'Backend & Systems',
      color: 'var(--primary-light)',
      icon: <FiServer />,
      skills: ['Node.js', 'Python', 'C++', 'Express.js', 'RESTful APIs', 'WebSockets']
    },
    {
      title: 'Cloud & Database',
      color: 'var(--neon-magenta)',
      icon: <FiDatabase />,
      skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'Firebase', 'Docker', 'Git']
    }
  ];

  return (
    <PageContainer title={t('skills_title')} id="skills">
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-item laser-card reveal-item">
            <div className="diamond-icon-frame" style={{ background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <span style={{ color: category.color }}>{category.icon}</span>
            </div>
            <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
              {category.title}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', zIndex: 1 }}>
              {category.skills.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-chrome)',
                  border: '1px solid var(--border-subtle)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  cursor: 'default'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-light)';
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
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
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '16px', color: 'var(--primary-light)', fontFamily: 'var(--font-mono)' }}>
            Loading repositories from GitHub...
          </p>
        </div>
      ) : (
        <div className="projects-list page-grid-2col">
          {repos.map(repo => (
            <div key={repo.id} className="project-item laser-card" style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--primary-light)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    OPEN SOURCE REPOSITORY
                  </span>
                  <h3 style={{ fontSize: '19px', wordBreak: 'break-word', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                    {repo.name}
                  </h3>
                </div>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="social-icon" style={{ width: '34px', height: '34px', fontSize: '17px' }} title="View on GitHub">
                  <FiExternalLink />
                </a>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6', flexGrow: 1 }}>
                {repo.description || t('no_description')}
              </p>
              <div className="tech-stack" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: 0 }}>
                {repo.language && (
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-light)', border: '1px solid rgba(99, 102, 241, 0.25)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                    {repo.language}
                  </span>
                )}
                <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                  ★ {repo.stargazers_count}
                </span>
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
        <div className="achievement-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '26px 28px' }}>
          <div className="diamond-icon-frame" style={{ width: '54px', height: '54px', fontSize: '24px', background: 'rgba(129, 140, 248, 0.12)', borderColor: 'rgba(129, 140, 248, 0.3)' }}>
            <span>🥈</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--primary-light)', letterSpacing: '0.08em', fontWeight: 600 }}>
              AWARD &amp; HONORS // IT COMPETITION
            </span>
            <h4 style={{ fontSize: '19px', marginTop: '4px', marginBottom: '6px', color: '#fff', fontWeight: 700 }}>
              {t('it_prize_title')}
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('it_prize_desc')}
            </p>
          </div>
        </div>
        <div className="achievement-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '26px 28px' }}>
          <div className="diamond-icon-frame" style={{ width: '54px', height: '54px', fontSize: '24px', background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <span>🥉</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#F59E0B', letterSpacing: '0.08em', fontWeight: 600 }}>
              ACADEMIC EXCELLENCE // ENGLISH
            </span>
            <h4 style={{ fontSize: '19px', marginTop: '4px', marginBottom: '6px', color: '#fff', fontWeight: 700 }}>
              {t('english_prize_title')}
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
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
    { id: 'camera', label: t('camera'), icon: <FiCamera />, color: 'var(--primary-light)' },
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
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`gear-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              border: activeTab === tab.id
                ? '1px solid rgba(99, 102, 241, 0.4)'
                : '1px solid var(--border-subtle)',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)'
                : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
              boxShadow: activeTab === tab.id
                ? '0 4px 16px rgba(99, 102, 241, 0.25)'
                : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
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
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{
                fontSize: '24px', color: currentTab.color,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px', fontWeight: '600',
                padding: '3px 8px', borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}>
                {item.badge}
              </span>
            </div>

            {/* Name & Category */}
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '3px', letterSpacing: '-0.01em' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '12px', color: currentTab.color, fontFamily: 'var(--font-mono)', fontWeight: '500' }}>
                {item.category}
              </p>
            </div>

            {/* Specs List */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              {item.specs.map((spec, si) => (
                <li key={si} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                    background: currentTab.color,
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

  const channels = [
    {
      id: 'youtube',
      label: 'YouTube',
      handle: '@KazukiDelta',
      href: 'https://youtube.com/@KazukiDelta',
      color: '#ff3b3b',
      icon: <FaYoutube />,
    },
    {
      id: 'twitch',
      label: 'Twitch',
      handle: 'KazukiDelta',
      href: 'https://twitch.tv/KazukiDelta',
      color: '#a855f7',
      icon: <FaTwitch />,
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@notd3lt4',
      href: 'https://www.tiktok.com/@notd3lt4',
      color: '#ec4899',
      icon: <FaTiktok />,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'KazukiDelta',
      href: 'https://www.facebook.com/KazukiDelta/',
      color: '#3b82f6',
      icon: <FaFacebook />,
    },
    {
      id: 'discord',
      label: 'Discord',
      handle: 'Direct message',
      href: 'https://discordapp.com/users/785490511526887445',
      color: '#6366f1',
      icon: <FaDiscord />,
    },
    {
      id: 'steam',
      label: 'Steam',
      handle: 'KazukiDelta',
      href: 'https://steamcommunity.com/id/KazukiDelta/',
      color: '#38bdf8',
      icon: <FaSteam />,
    },
    {
      id: 'twitter',
      label: 'Twitter / X',
      handle: '@KazukiDelta',
      href: 'https://twitter.com/KazukiDelta',
      color: '#0ea5e9',
      icon: <FaTwitter />,
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: '@KazukiDelta',
      href: 'https://github.com/KazukiDelta',
      color: '#f8fafc',
      icon: <FaGithub />,
    },
  ];

  return (
    <PageContainer title={t('contact_title')} id="contact">
      <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          {t('contact_desc')}
        </p>

        <div className="contact-info page-flex-wrap">
          <a
            href="mailto:rockykanikatm@gmail.com"
            className="contact-item laser-card"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '22px 24px', flex: 1, textDecoration: 'none' }}
          >
            <div style={{ fontSize: '26px', color: 'var(--primary-light)' }}><FiMail /></div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block', letterSpacing: '0.08em', fontWeight: 600 }}>DIRECT EMAIL</span>
              <span style={{ fontSize: '15px', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600 }}>rockykanikatm@gmail.com</span>
            </div>
          </a>
          <div className="contact-item laser-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '22px 24px', flex: 1 }}>
            <div style={{ fontSize: '26px', color: '#EC4899' }}><FiMapPin /></div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block', letterSpacing: '0.08em', fontWeight: 600 }}>COORDINATES</span>
              <span style={{ fontSize: '15px', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{t('location')}</span>
            </div>
          </div>
        </div>

        {/* Social Channels Bento Grid */}
        <div className="contact-channels">
          <p style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '14px' }}>
            CONNECT ACROSS PLATFORMS
          </p>
          <div className="page-grid-2col" style={{ display: 'grid', gap: '12px' }}>
            {channels.map(channel => (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="channel-card laser-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  fontSize: '22px', color: channel.color, flexShrink: 0,
                }}>{channel.icon}</span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{
                    fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                  }}>{channel.label}</span>
                  <span style={{
                    fontSize: '14px', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{channel.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
          <a
            href="https://discordapp.com/users/785490511526887445"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <span>Discord Community</span>
          </a>
          <a
            href="https://youtube.com/@KazukiDelta"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>YouTube Channel</span>
          </a>
          <a
            href="https://github.com/KazukiDelta"
            target="_blank"
            rel="noreferrer"
            className="skew-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>GitHub Profile</span>
          </a>
        </div>
      </div>
    </PageContainer>
  );
};
