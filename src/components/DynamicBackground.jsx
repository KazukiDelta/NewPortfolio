import React, { useEffect, useState } from 'react';

/**
 * Benchmark device hardware specs and network bandwidth
 * Returns { isCapable: boolean, details: object, reason: string }
 */
export const evaluateSystemPerformance = async () => {
  const details = {
    cores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 8, // in GB (defaults to 8 on modern desktop)
    networkType: '4g',
    downlink: 10,
    saveData: false,
    webgl: false,
    reducedMotion: false,
    batteryOk: true
  };

  // 1. Accessibility: Check user reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    details.reducedMotion = true;
    return { isCapable: false, details, reason: 'Chế độ giảm chuyển động đang bật (Reduced Motion)' };
  }

  // 2. Hardware CPU Cores Check (requires at least 4 logical cores)
  if (details.cores < 4) {
    return { isCapable: false, details, reason: `CPU số nhân thấp (${details.cores} nhân)` };
  }

  // 3. Hardware RAM Check (requires at least 4GB RAM if reported)
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return { isCapable: false, details, reason: `RAM thiết bị thấp (${navigator.deviceMemory} GB)` };
  }

  // 4. Network Bandwidth & Quality Check
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    details.saveData = !!conn.saveData;
    details.networkType = conn.effectiveType || '4g';
    details.downlink = conn.downlink || 10;

    // Do NOT load 41MB file if Data Saver is turned on
    if (conn.saveData) {
      return { isCapable: false, details, reason: 'Chế độ Tiết kiệm dữ liệu (Data Saver) đang bật' };
    }

    // Do NOT load on 2G, 3G or slow networks
    const slowNetworks = ['slow-2g', '2g', '3g'];
    if (conn.effectiveType && slowNetworks.includes(conn.effectiveType)) {
      return { isCapable: false, details, reason: `Mạng chậm (${conn.effectiveType.toUpperCase()})` };
    }

    // Bandwidth must be >= 2.5 Mbps to stream 41MB smoothly
    if (conn.downlink !== undefined && conn.downlink < 2.5) {
      return { isCapable: false, details, reason: `Tốc độ mạng thấp (${conn.downlink} Mbps)` };
    }

    // Latency RTT must be reasonable (<= 350ms)
    if (conn.rtt !== undefined && conn.rtt > 350) {
      return { isCapable: false, details, reason: `Độ trễ mạng cao (${conn.rtt} ms)` };
    }
  }

  // 5. GPU & WebGL Hardware Acceleration Check
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return { isCapable: false, details, reason: 'Không có hỗ trợ tăng tốc WebGL' };
    }
    details.webgl = true;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      if (/swiftshader|llvmpipe|software/i.test(renderer)) {
        return { isCapable: false, details, reason: 'Đang dùng bộ dựng hình phần mềm (Software Renderer)' };
      }
    }
  } catch (e) {
    // Continue if WebGL probe fails
  }

  // 6. Battery Check (avoid draining battery if < 20% and unplugged)
  if (navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      if (!battery.charging && battery.level < 0.20) {
        details.batteryOk = false;
        return { isCapable: false, details, reason: 'Pin yếu (< 20%) và không cắm sạc' };
      }
    } catch (e) {
      // Ignore battery check failure
    }
  }

  return { isCapable: true, details, reason: 'Thiết bị & Mạng mạnh (Đủ điều kiện tải nền động 41MB)' };
};

const DynamicBackground = () => {
  const [systemStatus, setSystemStatus] = useState({ isCapable: false, checked: false, reason: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const storedPref = localStorage.getItem('outrun_dynamic_fx');

    evaluateSystemPerformance().then((res) => {
      if (!mounted) return;

      if (storedPref === 'force-on') {
        setSystemStatus({ isCapable: true, checked: true, reason: 'Người dùng bật thủ công (Force ON)' });
      } else if (storedPref === 'force-off') {
        setSystemStatus({ isCapable: false, checked: true, reason: 'Người dùng tắt thủ công (Force OFF)' });
      } else {
        setSystemStatus({ isCapable: res.isCapable, checked: true, reason: res.reason });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // If system is not capable or check is pending, DO NOT load the 41MB file!
  if (!systemStatus.checked || !systemStatus.isCapable) {
    return null;
  }

  return (
    <div className="dynamic-background-wrapper" aria-hidden="true">
      {/* Dynamic Animated WebP with Heavy Blur */}
      <img
        src="/Adrestia_Fanart_Loop_Animation.webp"
        alt="Adrestia Dynamic Loop Background"
        className="dynamic-webp-bg"
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 0.75 : 0,
        }}
      />

      {/* Cyberpunk Dark Radial Overlay: Keeps text and components crystal clear */}
      <div className="dynamic-bg-overlay" />
    </div>
  );
};

export default DynamicBackground;
