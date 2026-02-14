import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  mode: 'creative' | 'tech';
}

export function CustomCursor({ mode }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(checkTouch);
    
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant dot movement
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };

    // Smooth cursor follow animation
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animateCursor);
    };

    // Track hoverable elements
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const animationId = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  // Re-attach hover listeners when DOM changes
  useEffect(() => {
    if (isTouchDevice) return;

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const accentColor = mode === 'creative' 
    ? 'rgba(255, 0, 85, 0.5)' 
    : 'rgba(0, 240, 255, 0.5)';

  const glowColor = mode === 'creative'
    ? 'rgba(255, 0, 85, 0.3)'
    : 'rgba(0, 240, 255, 0.3)';

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          border: `2px solid ${accentColor}`,
          borderRadius: '50%',
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`,
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: mode === 'creative' ? '#ff0055' : '#00f0ff',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s',
          boxShadow: `0 0 10px ${mode === 'creative' ? '#ff0055' : '#00f0ff'}`,
        }}
      />
    </>
  );
}
