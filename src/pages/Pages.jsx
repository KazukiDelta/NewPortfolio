import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';
import { FiGithub, FiMail, FiMapPin, FiTwitter, FiLinkedin, FiLayout, FiServer, FiDatabase, FiCpu } from 'react-icons/fi';

// Tự động load tất cả hình ảnh từ thư mục assets/photography (hỗ trợ cả đuôi hoa và thường)
const photographyImages = import.meta.glob('../assets/photography/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF}', { eager: true });
const imageUrls = Object.values(photographyImages).map((module) => module.default);

// The Home page will render the original MainContent and RightSidebar
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
    <div id="home" ref={homeRef} className="reveal-element snap-section" style={{ scrollSnapAlign: 'start' }}>
      <MainContent />
      <RightSidebar />
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
    <main id={id} className="main-content snap-section" style={{ padding: 0, scrollSnapAlign: 'start', marginRight: 0 }}>
      <section ref={containerRef} className="reveal-element reveal-container" style={{ 
        padding: '40px 60px', 
        minHeight: '100vh', 
        margin: 0, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
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

export const Profile = () => (
  <PageContainer title="PROFILE" id="profile">
    <div className="profile-content" style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
      <div className="profile-image neon-glow-panel" style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', flexShrink: 0 }}>
        <img src="https://github.com/KazukiDelta.png" alt="Kazuki Delta" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div>
        <h3 style={{ fontSize: '36px', marginBottom: '10px', color: 'var(--text-main)' }}>Kazuki Delta</h3>
        <h4 style={{ fontSize: '20px', color: 'var(--primary)', marginBottom: '25px', letterSpacing: '1px' }}>Full Stack Dev & Cyber Security</h4>
        <p style={{ lineHeight: '1.8', fontSize: '18px', color: 'var(--text-muted)' }}>
          Welcome to my digital realm. I am a passionate developer specializing in building immersive web applications and exploring the deep fields of cyber security. Outside of code, I love gaming, capturing breathtaking landscape photography, and admiring majestic sceneries.
        </p>
      </div>
    </div>
  </PageContainer>
);

export const Skills = () => {
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
    <PageContainer title="SKILL MATRIX" id="skills">
      <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
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
    <PageContainer title="NEURAL PROJECTS" id="projects">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p className="neon-text" style={{ fontSize: '24px', color: 'var(--primary)', letterSpacing: '2px' }}>_ ESTABLISHING GITHUB UPLINK...</p>
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
                {repo.description || 'No description provided in database.'}
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

export const Achievements = () => (
  <PageContainer title="HALL OF FAME" id="achievements">
    <div className="achievement-list page-grid-2col">
      <div className="achievement-item neon-hover glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '50px', color: '#94a3b8', textShadow: '0 0 20px rgba(148, 163, 184, 0.5)', lineHeight: '1' }}>🥈</div>
        <div>
          <h4 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-main)' }}>IT Excellence Prize</h4>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>City-level Excellence Student in IT (Middle School & High School)</p>
        </div>
      </div>
      <div className="achievement-item neon-hover glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '50px', color: '#b45309', textShadow: '0 0 20px rgba(180, 83, 9, 0.5)', lineHeight: '1' }}>🥉</div>
        <div>
          <h4 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-main)' }}>IOE 3rd Prize</h4>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>City-level IOE English Contest 3rd Prize (Grade 10 & 11)</p>
        </div>
      </div>
    </div>
  </PageContainer>
);

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
        <div className="gallery-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '25px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 280px)', /* Cho phép cuộn nội bộ nếu có quá nhiều ảnh */
          paddingRight: '15px'
        }}>
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

export const Blog = () => (
  <PageContainer title="DATA LOGS" id="blog">
    <div className="blog-list page-grid-2col">
      <div className="blog-post neon-hover" style={{ paddingLeft: '25px', borderLeft: '4px solid var(--primary)' }}>
        <h3 style={{ color: 'var(--text-main)', fontSize: '30px', marginBottom: '15px' }}>Building a Cyberpunk Portfolio</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '20px', lineHeight: '1.6' }}>A deep dive into using neon styles, glassmorphism, and React to build an immersive personal website.</p>
        <span style={{ fontSize: '16px', color: 'var(--primary)', letterSpacing: '1px', fontWeight: '600' }}>MAY 17, 2026 // 5 MIN READ</span>
      </div>
      <div className="blog-post neon-hover" style={{ paddingLeft: '25px', borderLeft: '4px solid var(--accent)' }}>
        <h3 style={{ color: 'var(--text-main)', fontSize: '30px', marginBottom: '15px' }}>The Future of WebGL</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '20px', lineHeight: '1.6' }}>Exploring the possibilities of 3D rendering in the browser with Three.js and WebGPU.</p>
        <span style={{ fontSize: '16px', color: 'var(--accent)', letterSpacing: '1px', fontWeight: '600' }}>APRIL 22, 2026 // 8 MIN READ</span>
      </div>
    </div>
  </PageContainer>
);

export const Contact = () => (
  <PageContainer title="TRANSMISSION" id="contact">
    <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
      <p style={{ fontSize: '22px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
        Open for opportunities and collaborations. Establish a secure connection through the channels below.
      </p>
      
      <div className="contact-info page-flex-wrap" style={{ marginBottom: '40px' }}>
          <div className="contact-item glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '32px', color: 'var(--primary)' }}><FiMail /></div>
            <span style={{ fontSize: '18px', color: 'var(--text-main)' }}>rockykanikatm@gmail.com</span>
          </div>
          <div className="contact-item glass-panel neon-border" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '32px', color: 'var(--accent)' }}><FiMapPin /></div>
            <span style={{ fontSize: '18px', color: 'var(--text-main)' }}>Vietnam</span>
          </div>
      </div>
      
      <div className="social-links" style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
        <a href="https://www.facebook.com/KazukiDeruta/" target="_blank" rel="noreferrer" className="social-icon neon-icon" style={{ fontSize: '40px', color: 'var(--text-muted)' }}>FB</a>
        <a href="https://github.com/KazukiDelta" target="_blank" rel="noreferrer" className="social-icon neon-icon" style={{ fontSize: '40px', color: 'var(--text-muted)' }}><FiGithub /></a>
      </div>
    </div>
  </PageContainer>
);
