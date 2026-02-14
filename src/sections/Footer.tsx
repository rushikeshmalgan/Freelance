import { ArrowUp, Heart, Film, Code2 } from 'lucide-react';

interface FooterProps {
  mode: 'creative' | 'tech';
}

export function Footer({ mode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentColor = mode === 'creative' ? 'hsl(340,100%,50%)' : 'hsl(187,100%,50%)';

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Top Border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <span 
                className="text-2xl font-bold"
                style={{ 
                  textShadow: `0 0 20px ${accentColor}50`,
                }}
              >
                RM
              </span>
              <div 
                className="w-px h-6 bg-white/20"
              />
              <span className="text-sm text-muted-foreground">
                Rushikesh Malgan
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500" fill="currentColor" /> using
              <span className="flex items-center gap-1 ml-1">
                {mode === 'creative' ? (
                  <>
                    <Film className="w-3 h-3" style={{ color: accentColor }} />
                    Creative Vision
                  </>
                ) : (
                  <>
                    <Code2 className="w-3 h-3" style={{ color: accentColor }} />
                    Clean Code
                  </>
                )}
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {['About', 'Video', 'Development', 'Skills', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(`#${link.toLowerCase()}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: accentColor }}
                />
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-[${accentColor}] transition-all duration-300 group"
            style={{
              '--accent': accentColor,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Back to Top
            </span>
            <ArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Rushikesh Malgan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
