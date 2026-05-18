import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Sidebar from './components/Sidebar';
import CursorGlow from './components/CursorGlow';
import { Home, Profile, Skills, Projects, Achievements, Photography, Blog, Contact } from './pages/Pages';

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
      <div className="app-container">
        <CursorGlow />
        <Sidebar />
        <div className="single-page-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Home />
          <Profile />
          <Skills />
          <Projects />
          <Achievements />
          <Photography />
          <Blog />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
