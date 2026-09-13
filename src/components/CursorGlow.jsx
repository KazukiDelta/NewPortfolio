import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Butttery smooth easing interpolation (0.08 is the speed of follow)
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (glowRef.current) {
        // Adjust translation to center the 400px glow on the cursor
        glowRef.current.style.transform = `translate3d(${currentX - 200}px, ${currentY - 200}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        // A gorgeous hot magenta to electric cyan vaporwave aura
        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, rgba(0, 255, 255, 0.12) 35%, rgba(255, 153, 0, 0.04) 55%, rgba(0, 0, 0, 0) 75%)',
        pointerEvents: 'none',
        zIndex: 3, // Above background elements, behind interactive panels
        willChange: 'transform',
        transform: 'translate3d(-400px, -400px, 0)', // Starts off-screen
        filter: 'blur(10px)', // Neon synth ambiance
      }}
    />
  );
};

export default CursorGlow;
