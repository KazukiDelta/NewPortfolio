import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from '../components/MainContent';
import { FiGithub, FiMail, FiMapPin, FiTwitter, FiLinkedin, FiLayout, FiServer, FiDatabase, FiCpu, FiCamera, FiMonitor, FiZap } from 'react-icons/fi';
import { FaCamera, FaKeyboard, FaHeadphones, FaDesktop, FaMouse, FaMicrochip, FaMobileAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

// Tự động load tất cả hình ảnh từ thư mục assets/photography (hỗ trợ cả đuôi hoa và thường)
const photographyImages = import.meta.glob('../assets/photography/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF}', { eager: true });
const imageUrls = Object.values(photographyImages).map((module) => module.default);

// The Home page will render the original MainContent
export const Home = () => {
  const homeRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        } else {
          entry.target.classList.remove('reveal-active');
        }
      });
    }, { threshold: 0.1 });

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

// A reusable container for other pages to keep layout consistent
const PageContainer = ({ title, children, id }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        } else {
          entry.target.classList.remove('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main id={id} className="main-content snap-section" style={{ padding: 0, marginRight: 0 }}>
      <section ref={containerRef} className="reveal-element reveal-container">
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          <h2 className="gradient-text neon-text reveal-item" style={{ fontSize: '42px', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '3px' }}>{title}</h2>
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
        <div className="profile-image neon-glow-panel">
          <img src="https://github.com/KazukiDelta.png" alt="Kazuki Delta" loading="lazy" />
        </div>
        <div className="profile-info">
          <h3>Kazuki Delta</h3>
          <h4>{t('profile_subtitle')}</h4>
          <p>
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
      color: 'var(--primary)',
      bg: 'rgba(0, 180, 216, 0.1)',
      border: 'rgba(0, 180, 216, 0.5)',
      icon: <FiLayout style={{ fontSize: '40px', marginBottom: '15px' }} />,
      skills: ['Next.js', 'React', 'Tailwind']
    },
    {
      title: 'Backend',
      color: 'var(--accent)',
      bg: 'rgba(157, 78, 221, 0.1)',
      border: 'rgba(157, 78, 221, 0.5)',
      icon: <FiServer style={{ fontSize: '40px', marginBottom: '15px' }} />,
      skills: ['Python', 'Node.js', 'C++']
    },
    {
      title: 'Database',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.5)',
      icon: <FiDatabase style={{ fontSize: '40px', marginBottom: '15px' }} />,
      skills: ['Supabase', 'MongoDB']
    }
  ];

  return (
    <PageContainer title={t('skills_title')} id="skills">
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-item neon-hover glass-panel neon-border reveal-item" style={{
            padding: '35px 25px',
            borderRadius: '16px',
            borderTop: `3px solid ${category.border}`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ color: category.color, transition: 'all 0.3s', filter: `drop-shadow(0 0 10px ${category.color})` }} className="skill-icon">
              {category.icon}
            </div>
            <h4 style={{ color: category.color, fontSize: '22px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
              {category.title}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', zIndex: 1 }}>
              {category.skills.map((skill, i) => (
                <span key={i} style={{
                  background: category.bg,
                  color: 'var(--text-main)',
                  border: `1px solid ${category.border}`,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  boxShadow: `0 0 10px ${category.bg}`,
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 0 15px ${category.border}`;
                    e.currentTarget.style.background = category.border;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 0 10px ${category.bg}`;
                    e.currentTarget.style.background = category.bg;
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Background glowing orb */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '120px',
              background: category.color,
              filter: 'blur(50px)',
              opacity: 0.15,
              zIndex: 0,
              pointerEvents: 'none'
            }}></div>
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
        // 1. Chỉ lấy những repo không phải là fork (dự án do chính bạn tạo ra)
        // 2. Nếu muốn lọc kỹ hơn, bạn có thể thêm tag 'portfolio' vào repo trên Github, rồi dùng: data.filter(repo => repo.topics.includes('portfolio'))
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
          <p className="neon-text" style={{ fontSize: '24px', color: 'var(--primary)', letterSpacing: '2px' }}>{t('establishing_uplink')}</p>
        </div>
      ) : (
        <div className="projects-list page-grid-2col">
          {repos.map(repo => (
            <div key={repo.id} className="project-item neon-hover glass-panel neon-border" style={{ padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '28px', marginBottom: '15px', color: 'var(--text-main)', wordBreak: 'break-word', paddingRight: '20px' }}>{repo.name}</h3>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="github-link neon-icon" style={{ fontSize: '32px', color: 'var(--text-muted)' }}><FiGithub /></a>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.6', flexGrow: 1 }}>
                {repo.description || t('no_description')}
              </p>
              <div className="tech-stack" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {repo.language && (
                  <span style={{ fontSize: '14px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(0, 180, 216, 0.1)', color: 'var(--primary)', border: '1px solid rgba(0, 180, 216, 0.3)' }}>
                    {repo.language}
                  </span>
                )}
                <span style={{ fontSize: '14px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  ★ {repo.stargazers_count}
                </span>
                {repo.fork && (
                  <span style={{ fontSize: '14px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(157, 78, 221, 0.1)', color: 'var(--accent)', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
                    Forked
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
        <div className="achievement-item neon-hover glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '50px', color: '#94a3b8', textShadow: '0 0 20px rgba(148, 163, 184, 0.5)', lineHeight: '1' }}>🥈</div>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-main)' }}>{t('it_prize_title')}</h4>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{t('it_prize_desc')}</p>
          </div>
        </div>
        <div className="achievement-item neon-hover glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '50px', color: '#b45309', textShadow: '0 0 20px rgba(180, 83, 9, 0.5)', lineHeight: '1' }}>🥉</div>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-main)' }}>{t('english_prize_title')}</h4>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{t('english_prize_desc')}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export const Photography = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const handleClose = () => {
    setSelectedImage(null);
    setIsZoomed(false);
  };

  return (
    <PageContainer title="VISUAL ARCHIVE" id="photography">
      {/* Fullscreen Lightbox Modal */}
      {selectedImage && ReactDOM.createPortal(
        <div
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(5, 5, 8, 0.95)',
            backdropFilter: 'blur(10px)',
            cursor: 'zoom-out',
            overflow: 'auto'
          }}
          onClick={handleClose}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: isZoomed ? 'flex-start' : 'center',
            width: '100%',
            height: '100%',
            padding: '40px',
            boxSizing: 'border-box'
          }}>
            <img
              src={selectedImage}
              alt="Fullscreen Photography"
              style={{
                width: 'auto',
                height: isZoomed ? '150vh' : '80vh',
                maxWidth: isZoomed ? 'none' : '90vw',
                maxHeight: isZoomed ? 'none' : '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 0 30px rgba(0, 180, 216, 0.3)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            />
          </div>
          <button
            className="neon-icon"
            style={{
              position: 'absolute', top: '30px', right: '40px',
              fontSize: '40px', color: 'var(--text-main)',
              zIndex: 10000
            }}
            onClick={handleClose}
          >
            &times;
          </button>
        </div>,
        document.body
      )}

      {imageUrls.length > 0 ? (
        <div className="gallery-grid">
          {imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Archive ${i}`}
              className="gallery-img neon-border"
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                borderRadius: '8px',
                transition: 'all 0.4s ease',
                cursor: 'zoom-in'
              }}
              onClick={() => setSelectedImage(url)}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      ) : (
        <div style={{ padding: '40px', border: '1px dashed rgba(0, 180, 216, 0.4)', borderRadius: '12px', textAlign: 'center', backgroundColor: 'rgba(13, 13, 20, 0.5)' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '10px' }}>Chưa có dữ liệu hình ảnh</h3>
          <p style={{ color: 'var(--text-muted)' }}>Hãy upload các hình ảnh vào thư mục <code>src/assets/photography/</code>.</p>
          <p style={{ color: 'var(--text-muted)' }}>Hệ thống sẽ tự động hiển thị chúng ở định dạng 3:4.</p>
        </div>
      )}
    </PageContainer>
  );
};

export const Gear = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('camera');

  const tabs = [
    { id: 'camera', label: t('camera'), icon: <FiCamera />, color: '#f59e0b' },
    { id: 'Devices', label: t('devices'), icon: <FaDesktop />, color: '#00b4d8' }, // Matches --primary
    { id: 'gaming', label: t('gaming'), icon: <FiZap />, color: '#9d4edd' }, // Matches --accent
  ];

  const gearData = {
    camera: [
      {
        icon: <FaCamera />,
        name: 'Sony a6400',
        category: 'Mirrorless Body',
        color: '#f59e0b',
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
        color: '#f59e0b',
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
        color: '#f59e0b',
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
        color: 'var(--primary)',
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
        color: 'var(--primary)',
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
        color: 'var(--primary)',
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
        color: 'var(--accent)',
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
        color: 'var(--accent)',
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
        color: 'var(--accent)',
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
        color: 'var(--accent)',
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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`gear-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              border: activeTab === tab.id
                ? `1px solid ${tab.color}`
                : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === tab.id
                ? `linear-gradient(135deg, ${tab.color}22, ${tab.color}10)`
                : 'rgba(20,20,30,0.5)',
              color: activeTab === tab.id ? tab.color : 'var(--text-muted)',
              boxShadow: activeTab === tab.id
                ? `0 0 18px ${tab.color}44, inset 0 0 10px ${tab.color}10`
                : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: activeTab === tab.id ? 'translateY(-2px)' : 'none',
            }}
          >
            <span style={{ fontSize: '16px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gear Cards Grid */}
      <div className="gear-grid">
        {currentGear.map((item, i) => (
          <div
            key={i}
            className="gear-card glass-panel"
            style={{
              padding: '28px',
              borderRadius: '16px',
              border: `1px solid ${currentTab.color}22`,
              borderTop: `3px solid ${currentTab.color}`,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = currentTab.color;
              e.currentTarget.style.boxShadow = `0 0 25px ${currentTab.color}33, inset 0 0 15px ${currentTab.color}08`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = `${currentTab.color}22`;
              e.currentTarget.style.borderTopColor = currentTab.color;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Glow orb background */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '100px', height: '100px',
              background: currentTab.color,
              filter: 'blur(60px)', opacity: 0.08,
              pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{
                fontSize: '32px', color: currentTab.color,
                filter: `drop-shadow(0 0 8px ${currentTab.color})`,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px',
                padding: '4px 8px', borderRadius: '4px',
                background: `${currentTab.color}22`,
                color: currentTab.color,
                border: `1px solid ${currentTab.color}44`,
                whiteSpace: 'nowrap',
              }}>
                {item.badge}
              </span>
            </div>

            {/* Name & Category */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px', lineHeight: '1.3' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '12px', color: currentTab.color, fontWeight: '500', letterSpacing: '0.5px', opacity: 0.8 }}>
                {item.category}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${currentTab.color}33, transparent)` }} />

            {/* Specs List */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
              {item.specs.map((spec, si) => (
                <li key={si} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
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
  return (
    <PageContainer title={t('contact_title')} id="contact">
      <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
        <p style={{ fontSize: '22px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {t('contact_desc')}
        </p>

        <div className="contact-info page-flex-wrap" style={{ marginBottom: '40px' }}>
          <div className="contact-item glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '32px', color: 'var(--primary)' }}><FiMail /></div>
            <span style={{ fontSize: '18px', color: 'var(--text-main)' }}>rockykanikatm@gmail.com</span>
          </div>
          <div className="contact-item glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '32px', color: 'var(--accent)' }}><FiMapPin /></div>
            <span style={{ fontSize: '18px', color: 'var(--text-main)' }}>{t('location')}</span>
          </div>
        </div>

        <div className="social-links" style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
          <a href="https://www.facebook.com/KazukiDeruta/" target="_blank" rel="noreferrer" className="social-icon neon-icon" style={{ fontSize: '40px', color: 'var(--text-muted)' }}>FB</a>
          <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon neon-icon" style={{ fontSize: '40px', color: 'var(--text-muted)' }}><FiGithub /></a>
        </div>
      </div>
    </PageContainer>
  );
};
