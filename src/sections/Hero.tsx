import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Code2, Film, X } from 'lucide-react';

interface HeroProps {
  mode: 'creative' | 'tech';
  setMode: (mode: 'creative' | 'tech') => void;
}

export function Hero({ mode, setMode }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ESC key close for modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Animated Orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-1000 ${
          mode === 'creative'
            ? 'bg-[hsl(340,100%,50%)]/20'
            : 'bg-[hsl(187,100%,50%)]/20'
        }`}
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />

      <div
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] transition-all duration-1000 ${
          mode === 'tech'
            ? 'bg-[hsl(187,100%,50%)]/20'
            : 'bg-[hsl(340,100%,50%)]/20'
        }`}
        style={{ animation: 'float 10s ease-in-out infinite reverse' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Profile Image */}
          <div
            className={`relative mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              {/* Rotating Gradient Ring */}
              <div
                className={`absolute inset-0 rounded-full blur-sm opacity-80 ${
                  mode === 'creative'
                    ? 'bg-[conic-gradient(from_0deg,hsl(340,100%,50%),transparent,hsl(340,100%,50%))]'
                    : 'bg-[conic-gradient(from_0deg,hsl(187,100%,50%),transparent,hsl(187,100%,50%))]'
                } animate-spin-slow`}
              />

              <div className="absolute inset-[3px] rounded-full bg-background" />

              {/* Clickable Image */}
              <div
                onClick={() => setIsZoomed(true)}
                className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-xl group cursor-pointer"
              >
                <img
                  src="/pfp.png"
                  alt="Rushikesh Malgan"
                  className="w-full h-full object-cover object-center scale-[1.05] group-hover:scale-[1.1] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Status Dot */}
              <div
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background shadow-lg ${
                  mode === 'creative'
                    ? 'bg-[hsl(340,100%,50%)]'
                    : 'bg-[hsl(187,100%,50%)]'
                }`}
              />
            </div>
          </div>

          {/* Name */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className={mode === 'creative' ? 'text-glow-creative' : 'text-glow-tech'}>
              Rushikesh Malgan
            </span>
          </h1>

          {/* Title */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Creative Technologist
          </p>

          {/* Mode Switcher - Redirects and color changes on click */}
          <div
            className={`flex items-center gap-2 p-1.5 rounded-full glass-card mb-10 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              onClick={() => {
                setMode('creative');
                setTimeout(() => scrollToSection('#video'), 150);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'creative'
                  ? 'bg-[hsl(340,100%,50%)] text-white glow-creative'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Film className="w-4 h-4" />
              VISUALS
            </button>

            <button
              onClick={() => {
                setMode('tech');
                setTimeout(() => scrollToSection('#dev'), 150);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'tech'
                  ? 'bg-[hsl(187,100%,50%)] text-black glow-tech'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-4 h-4" />
              CODE
            </button>
          </div>

          {/* Description */}
          <p
            className={`max-w-2xl text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {mode === 'creative'
              ? 'Crafting cinematic stories through video editing. From color grading to motion graphics, I transform raw footage into visual masterpieces that captivate and inspire.'
              : 'Building scalable digital experiences with the MERN stack. Clean architecture, efficient code, and pixel-perfect implementations for modern web applications.'}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              onClick={() => scrollToSection(mode === 'creative' ? '#video' : '#dev')}
              className={`group relative px-8 py-4 font-semibold text-sm tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300 ${
                mode === 'creative'
                  ? 'bg-[hsl(340,100%,50%)] text-white glow-creative-hover'
                  : 'bg-[hsl(187,100%,50%)] text-black glow-tech-hover'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Explore My Work
              </span>
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-glass text-foreground"
            >
              <span className="flex items-center gap-2">
                Start a Project
                <ArrowDown className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md transition-all p-4"
          onClick={() => setIsZoomed(false)}
        >
          {/* Modal Close Button */}
          <button 
            className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/pfp.png"
              alt="Rushikesh Malgan"
              className="w-full h-auto rounded-2xl shadow-2xl object-contain border border-white/10"
            />
          </div>
        </div>
      )}

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}