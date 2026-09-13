import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Sidebar from './components/Sidebar';
import CursorGlow from './components/CursorGlow';
import { Home, Profile, Skills, Projects, Achievements, Photography, Gear, Contact } from './pages/Pages';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  useEffect(() => {
    // Tắt tính năng tự động khôi phục vị trí cuộn của trình duyệt khi reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Cuộn về đầu trang (Homepage) ngay khi tải lại trang
    window.scrollTo(0, 0);

    // Xóa hash trên URL (ví dụ: #profile, #skills) để không bị nhảy trang
    if (window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        {/* Global Vaporwave / Outrun Atmospheric Elements */}
        <div className="crt-scanlines" aria-hidden="true" />
        <div className="vaporwave-sun" aria-hidden="true" />
        <div className="perspective-grid-floor" aria-hidden="true">
          <div className="perspective-grid-floor-inner" />
        </div>

        <div className="app-container">
          <CursorGlow />
          <Sidebar />
          <div className="single-page-wrapper">
            <Home />
            <Profile />
            <Skills />
            <Projects />
            <Achievements />
            <Photography />
            <Gear />
            <Contact />
          </div>
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
