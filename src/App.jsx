import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CursorGlow from './components/CursorGlow';
import DynamicBackground from './components/DynamicBackground';
import ErrorBoundary from './components/ErrorBoundary';
import { Home, Profile, Skills, Projects, Achievements, Gear, Contact } from './pages/Pages';
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
        <ErrorBoundary>
          {/* Adaptive Dynamic Background with Hardware & Network check */}
          <DynamicBackground />

          {/* Modern Cyber-Luxe Ambient Lighting & Subtle Grid Mesh */}
          <div className="ambient-glow glow-top" aria-hidden="true" />
          <div className="ambient-glow glow-bottom" aria-hidden="true" />
          <div className="ambient-grid-mesh" aria-hidden="true" />

          <div className="app-container">
            <CursorGlow />
            <Sidebar />
            <div className="single-page-wrapper">
              <Home />
              <Profile />
              <Skills />
              <Projects />
              <Achievements />
              <Gear />
              <Contact />
            </div>
          </div>
        </ErrorBoundary>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
