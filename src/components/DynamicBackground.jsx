import React, { useEffect, useRef, useState } from 'react';

/**
 * Evaluates device hardware specs and network capability
 * Returns { isCapable: boolean, details: object, reason: string }
 */
export const evaluateSystemPerformance = async () => {
  const details = {
    cores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 8, // in GB (default to 8 if API unavailable)
    networkType: '4g',
    downlink: 10,
    saveData: false,
    webgl: false,
    renderer: '',
    reducedMotion: false,
    batteryOk: true
  };

  // 1. Check user reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    details.reducedMotion = true;
    return { isCapable: false, details, reason: 'Reduced motion preference active' };
  }

  // 2. Hardware CPU cores check (need at least 4 cores)
  if (details.cores < 4) {
    return { isCapable: false, details, reason: `Low CPU core count (${details.cores} cores)` };
  }

  // 3. Device Memory check (need at least 4 GB RAM if reported)
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return { isCapable: false, details, reason: `Low RAM detected (${navigator.deviceMemory} GB)` };
  }

  // 4. Network connection check
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    details.saveData = !!conn.saveData;
    details.networkType = conn.effectiveType || '4g';
    details.downlink = conn.downlink || 10;

    if (conn.saveData) {
      return { isCapable: false, details, reason: 'Data Saver mode active' };
    }

    const slowNetworks = ['slow-2g', '2g', '3g'];
    if (conn.effectiveType && slowNetworks.includes(conn.effectiveType)) {
      return { isCapable: false, details, reason: `Slow network detected (${conn.effectiveType})` };
    }

    if (conn.downlink !== undefined && conn.downlink < 2.0) {
      return { isCapable: false, details, reason: `Low bandwidth (${conn.downlink} Mbps)` };
    }

    if (conn.rtt !== undefined && conn.rtt > 350) {
      return { isCapable: false, details, reason: `High latency (${conn.rtt} ms)` };
    }
  }

  // 5. GPU & WebGL hardware acceleration check
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return { isCapable: false, details, reason: 'No WebGL support' };
    }
    details.webgl = true;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      details.renderer = renderer;
      if (/swiftshader|llvmpipe|software rasterizer/i.test(renderer)) {
        return { isCapable: false, details, reason: 'Software renderer fallback detected' };
      }
    }
  } catch (e) {
    // If WebGL probe errors, continue with caution
  }

  // 6. Battery conservation check (if API is available)
  if (navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      if (!battery.charging && battery.level < 0.20) {
        details.batteryOk = false;
        return { isCapable: false, details, reason: 'Low battery level (<20%)' };
      }
    } catch (e) {
      // Ignore battery check failure
    }
  }

  return { isCapable: true, details, reason: 'High performance device and fast connection' };
};

const DynamicBackground = () => {
  const [systemStatus, setSystemStatus] = useState({ isCapable: false, checked: false, reason: '' });
  const plasmaCanvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // Check user preference in localStorage if they manually set it
    const storedPref = localStorage.getItem('outrun_dynamic_fx');

    evaluateSystemPerformance().then((res) => {
      if (!mounted) return;

      if (storedPref === 'force-on') {
        setSystemStatus({ isCapable: true, checked: true, reason: 'Manually enabled by user' });
      } else if (storedPref === 'force-off') {
        setSystemStatus({ isCapable: false, checked: true, reason: 'Manually disabled by user' });
      } else {
        setSystemStatus({ isCapable: res.isCapable, checked: true, reason: res.reason });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Animated plasma and stardust particles loop
  useEffect(() => {
    if (!systemStatus.isCapable) return;

    const plasmaCanvas = plasmaCanvasRef.current;
    const particlesCanvas = particlesCanvasRef.current;
    if (!plasmaCanvas || !particlesCanvas) return;

    const plasmaCtx = plasmaCanvas.getContext('2d');
    const particlesCtx = particlesCanvas.getContext('2d');
    if (!plasmaCtx || !particlesCtx) return;

    let animId;
    let width = (plasmaCanvas.width = particlesCanvas.width = window.innerWidth);
    let height = (plasmaCanvas.height = particlesCanvas.height = window.innerHeight);

    // Scaling down internal render resolution for plasma orbs saves 80% GPU cycles
    // since heavy blur (85px) naturally smooths everything.
    const plasmaScale = 0.5;
    plasmaCanvas.width = Math.floor(width * plasmaScale);
    plasmaCanvas.height = Math.floor(height * plasmaScale);

    // 5 multi-harmonic Neon Plasma Orbs
    const orbs = [
      {
        baseX: 0.2, baseY: 0.3,
        radius: 280 * plasmaScale,
        colorStops: ['rgba(255, 0, 255, 0.45)', 'rgba(255, 0, 255, 0.12)', 'rgba(0, 0, 0, 0)'],
        speedX: 0.0006, speedY: 0.0008,
        phaseX: 0, phaseY: Math.PI / 4,
        rangeX: 0.18, rangeY: 0.15
      },
      {
        baseX: 0.8, baseY: 0.4,
        radius: 320 * plasmaScale,
        colorStops: ['rgba(0, 255, 255, 0.40)', 'rgba(0, 255, 255, 0.10)', 'rgba(0, 0, 0, 0)'],
        speedX: 0.0007, speedY: 0.0005,
        phaseX: Math.PI / 2, phaseY: 0,
        rangeX: 0.2, rangeY: 0.18
      },
      {
        baseX: 0.5, baseY: 0.65,
        radius: 350 * plasmaScale,
        colorStops: ['rgba(255, 153, 0, 0.35)', 'rgba(255, 0, 255, 0.15)', 'rgba(0, 0, 0, 0)'],
        speedX: 0.0005, speedY: 0.0007,
        phaseX: Math.PI, phaseY: Math.PI / 3,
        rangeX: 0.22, rangeY: 0.12
      },
      {
        baseX: 0.15, baseY: 0.8,
        radius: 300 * plasmaScale,
        colorStops: ['rgba(157, 78, 221, 0.45)', 'rgba(0, 255, 255, 0.08)', 'rgba(0, 0, 0, 0)'],
        speedX: 0.0008, speedY: 0.0006,
        phaseX: Math.PI / 3, phaseY: Math.PI,
        rangeX: 0.15, rangeY: 0.16
      },
      {
        baseX: 0.85, baseY: 0.85,
        radius: 290 * plasmaScale,
        colorStops: ['rgba(255, 0, 128, 0.38)', 'rgba(255, 153, 0, 0.10)', 'rgba(0, 0, 0, 0)'],
        speedX: 0.0006, speedY: 0.0009,
        phaseX: Math.PI * 1.5, phaseY: Math.PI * 0.7,
        rangeX: 0.18, rangeY: 0.14
      }
    ];

    // Subtle drifting retro digital stardust particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF'
    }));

    const handleResize = () => {
      width = particlesCanvas.width = window.innerWidth;
      height = particlesCanvas.height = window.innerHeight;
      plasmaCanvas.width = Math.floor(width * plasmaScale);
      plasmaCanvas.height = Math.floor(height * plasmaScale);
    };

    window.addEventListener('resize', handleResize);

    let isTabVisible = !document.hidden;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastTime = performance.now();

    const render = (time) => {
      animId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      const dt = time - lastTime;
      lastTime = time;

      const pW = plasmaCanvas.width;
      const pH = plasmaCanvas.height;

      // 1. Draw Plasma Mesh
      plasmaCtx.clearRect(0, 0, pW, pH);

      orbs.forEach((orb) => {
        orb.phaseX += orb.speedX * dt;
        orb.phaseY += orb.speedY * dt;

        const currentX = (orb.baseX + Math.sin(orb.phaseX) * orb.rangeX) * pW;
        const currentY = (orb.baseY + Math.cos(orb.phaseY) * orb.rangeY) * pH;

        const gradient = plasmaCtx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, orb.radius
        );

        gradient.addColorStop(0, orb.colorStops[0]);
        gradient.addColorStop(0.5, orb.colorStops[1]);
        gradient.addColorStop(1, orb.colorStops[2]);

        plasmaCtx.fillStyle = gradient;
        plasmaCtx.beginPath();
        plasmaCtx.arc(currentX, currentY, orb.radius, 0, Math.PI * 2);
        plasmaCtx.fill();
      });

      // 2. Draw Digital Stardust Particles
      particlesCtx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        particlesCtx.fillStyle = p.color;
        particlesCtx.globalAlpha = p.opacity;
        particlesCtx.shadowBlur = 6;
        particlesCtx.shadowColor = p.color;

        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particlesCtx.fill();
      });

      particlesCtx.globalAlpha = 1.0;
      particlesCtx.shadowBlur = 0;
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [systemStatus.isCapable]);

  // If system is not capable, return null so zero resources are consumed
  if (!systemStatus.checked || !systemStatus.isCapable) {
    return null;
  }

  return (
    <div className="dynamic-background-container" aria-hidden="true">
      {/* Heavily blurred dynamic neon plasma canvas */}
      <canvas
        ref={plasmaCanvasRef}
        className="dynamic-plasma-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(85px)',
          opacity: 0.65,
          willChange: 'transform',
        }}
      />

      {/* Crisp drifting retro digital stardust particles */}
      <canvas
        ref={particlesCanvasRef}
        className="dynamic-particles-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.75,
        }}
      />
    </div>
  );
};

export default DynamicBackground;
