import React from 'react';
import { FiCode, FiAward } from 'react-icons/fi';
import { 
  SiNextdotjs, SiReact, SiTailwindcss, 
  SiPython, SiNodedotjs, SiCplusplus, 
  SiSupabase, SiMongodb 
} from 'react-icons/si';
import { FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './RightSidebar.css';

const photographyImages = import.meta.glob('../assets/photography/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF}', { eager: true });
const imageUrls = Object.values(photographyImages).map((module) => module.default);

const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="right-sidebar" data-lenis-prevent="true">
      {/* Skill Tree */}
      <section className="widget">
        <div className="widget-header">
          <h3 className="widget-title">SKILL TREE</h3>
        </div>
        <div className="skill-tree">
          <div className="tree-root">
            <div className="skill-node-core glass-panel neon-border">
              <FiCode className="core-icon" />
              <span>Full-Stack<br/>Developer</span>
            </div>
            
            <div className="tree-branches">
               {/* Frontend */}
               <div className="branch">
                 <p className="branch-title">Frontend</p>
                 <div className="skill-node glass-panel"><SiNextdotjs className="node-icon" /> <br/>Next.js</div>
                 <div className="skill-node glass-panel"><SiReact className="node-icon text-blue" /> <br/>React</div>
                 <div className="skill-node glass-panel"><SiTailwindcss className="node-icon text-blue" /> <br/>Tailwind</div>
               </div>
               
               {/* Backend */}
               <div className="branch">
                 <p className="branch-title">Backend</p>
                 <div className="skill-node glass-panel"><SiPython className="node-icon text-yellow" /> <br/>Python</div>
                 <div className="skill-node glass-panel"><SiNodedotjs className="node-icon text-green" /> <br/>Node.js</div>
                 <div className="skill-node glass-panel"><SiCplusplus className="node-icon text-blue" /> <br/>C++</div>
               </div>
               
               {/* Database */}
               <div className="branch">
                 <p className="branch-title">Database</p>
                 <div className="skill-node glass-panel"><SiSupabase className="node-icon text-green" /> <br/>Supabase</div>
                 <div className="skill-node glass-panel"><SiMongodb className="node-icon text-green" /> <br/>MongoDB</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="widget">
        <div className="widget-header flex-between">
          <h3 className="widget-title">ACHIEVEMENTS</h3>
          <button className="view-all" onClick={() => document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' })}>VIEW ALL &gt;</button>
        </div>
         <div className="achievements-list glass-panel">
           <div className="achievement-item">
             <div className="ach-icon silver"><FaMedal /></div>
             <div className="ach-info">
               <h4>IT Excellence</h4>
               <p>City-level (Middle & High School)</p>
             </div>
             <span className="ach-date">Multiple</span>
           </div>
           <div className="achievement-item">
             <div className="ach-icon bronze"><FaMedal /></div>
             <div className="ach-info">
               <h4>IOE 3rd Prize</h4>
               <p>City-level (Grade 10 & 11)</p>
             </div>
             <span className="ach-date">Multiple</span>
           </div>
        </div>
      </section>

      {/* My Gear */}
      <section className="widget">
        <div className="widget-header flex-between">
          <h3 className="widget-title">MY GEAR</h3>
          <button className="view-all" onClick={() => document.getElementById('photography').scrollIntoView({ behavior: 'smooth' })}>VIEW GALLERY &gt;</button>
        </div>
        <div className="gear-widget glass-panel">
          <div className="gear-main">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=50&fm=webp" alt="Macbook Air" className="gear-img" loading="lazy" />
            <div className="gear-info">
              <h4>Macbook Air 2017</h4>
              <p>Aula F75 • Attack Shark R1 • Soundpeats T3 Pro</p>
            </div>
          </div>
          <div className="gear-gallery">
            {imageUrls.slice(0, 4).map((url, i) => (
              <img key={i} src={url} alt={`Gallery ${i}`} loading="lazy" onClick={() => document.getElementById('photography').scrollIntoView({ behavior: 'smooth' })} />
            ))}
            {imageUrls.length === 0 && (
              <>
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=100&q=50&fm=webp" alt="Placeholder" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=100&q=50&fm=webp" alt="Placeholder" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1506744626753-1fa7604d50bc?auto=format&fit=crop&w=100&q=50&fm=webp" alt="Placeholder" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=100&q=50&fm=webp" alt="Placeholder" loading="lazy" />
              </>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
