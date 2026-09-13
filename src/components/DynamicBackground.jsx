import React, { useEffect, useState } from 'react';

/**
 * Benchmark device hardware specs and network bandwidth
 * Returns { isCapable: boolean, details: object, reason: string }
 */
export const evaluateSystemPerformance = async () => {
  const details = {
    cores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 8,
    networkType: '4g',
    downlink: 10,
    saveData: false,
    webgl: true,
    reducedMotion: false,
    batteryOk: true
  };

  // 1. On localhost, ALWAYS enable immediately
  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '');
  if (isLocal) {
    return { isCapable: true, details, reason: 'Chạy nội bộ (Localhost) - Kích hoạt đầy đủ hiệu năng' };
  }

  // 2. Accessibility: Check user reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    details.reducedMotion = true;
    return { isCapable: false, details, reason: 'Chế độ giảm chuyển động đang bật (Reduced Motion)' };
  }

  // 3. Hardware CPU Cores Check (only disable if < 2 cores)
  if (details.cores < 2) {
    return { isCapable: false, details, reason: `CPU số nhân thấp (${details.cores} nhân)` };
  }

  // 4. Network check: only disable if Data Saver is ON or on 2G
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    details.saveData = !!conn.saveData;
    details.networkType = conn.effectiveType || '4g';

    if (conn.saveData) {
      return { isCapable: false, details, reason: 'Chế độ Tiết kiệm dữ liệu (Data Saver) đang bật' };
    }

    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
      return { isCapable: false, details, reason: `Mạng rất chậm (${conn.effectiveType.toUpperCase()})` };
    }
  }

  // 5. Battery Check (avoid draining battery if < 15% and unplugged)
  if (navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      if (!battery.charging && battery.level < 0.15) {
        details.batteryOk = false;
        return { isCapable: false, details, reason: 'Pin yếu (< 15%) và không cắm sạc' };
      }
    } catch (e) {
      // Ignore battery error
    }
  }

  return { isCapable: true, details, reason: 'Thiết bị & Mạng đạt chuẩn (Kích hoạt nền động)' };
};

const DynamicBackground = () => {
  // Default to capable so it renders immediately
  const [systemStatus, setSystemStatus] = useState({ 
    isCapable: true, 
    checked: true, 
    reason: 'Đang tải nền động...' 
  });
  
  const [blurLevel, setBlurLevel] = useState(() => {
    const saved = localStorage.getItem('outrun_bg_blur');
    if (!saved || saved === '8px' || saved === '14px' || saved === '22px' || saved === '4px' || saved === '50px') {
      localStorage.setItem('outrun_bg_blur', '2px');
      return '2px';
    }
    return saved || '2px';
  });

  useEffect(() => {
    let mounted = true;
    const storedPref = localStorage.getItem('outrun_dynamic_fx');

    evaluateSystemPerformance().then((res) => {
      if (!mounted) return;

      if (storedPref === 'force-on') {
        setSystemStatus({ isCapable: true, checked: true, reason: 'Bật thủ công (Force ON)' });
      } else if (storedPref === 'force-off') {
        setSystemStatus({ isCapable: false, checked: true, reason: 'Tắt thủ công (Force OFF)' });
      } else {
        setSystemStatus({ isCapable: res.isCapable, checked: true, reason: res.reason });
      }
    });

    // Listen for custom blur changes from telemetry panel for instant updates
    const handleBlurUpdate = (e) => {
      const val = e.detail || localStorage.getItem('outrun_bg_blur') || '2px';
      setBlurLevel(val);
    };
    window.addEventListener('dynamic-bg-blur-change', handleBlurUpdate);
    window.addEventListener('storage', handleBlurUpdate);

    return () => {
      mounted = false;
      window.removeEventListener('dynamic-bg-blur-change', handleBlurUpdate);
      window.removeEventListener('storage', handleBlurUpdate);
    };
  }, []);

  if (!systemStatus.isCapable) {
    return null;
  }

  return (
    <div className="dynamic-background-wrapper" aria-hidden="true">
      {/* Dynamic Animated WebP - Visible with crisp 2px blur */}
      <img
        src="/Adrestia_Fanart_Loop_Animation.webp"
        alt="Adrestia Dynamic Background"
        className="dynamic-webp-bg"
        style={{
          filter: `blur(${blurLevel}) saturate(1.15) brightness(0.95)`,
          opacity: 0.9,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Cyberpunk Dark Radial Overlay: Keeps text and components crystal clear */}
      <div className="dynamic-bg-overlay" />
    </div>
  );
};

export default DynamicBackground;
