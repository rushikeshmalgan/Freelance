import { useEffect, useState } from "react";
import { Film, Code2, Menu, X } from "lucide-react";

interface NavigationProps {
  mode: "creative" | "tech";
  setMode: (mode: "creative" | "tech") => void;
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#video", label: "Video" },
  { href: "#dev", label: "Development" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navigation({ mode, setMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (!section) return;

        const top = section.getBoundingClientRect().top;
        if (top <= 120 && top >= -300) {
          setActiveSection(link.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LINK CLICK ================= */

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  /* ================= LOGO CLICK ================= */

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= MAIN ================= */

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ===== LOGO ===== */}
            <a
              href="#"
              onClick={handleLogoClick}
              className="text-2xl font-extrabold tracking-wide select-none"
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r 
                ${
                  mode === "creative"
                    ? "from-pink-500 to-purple-500 animate-pulse"
                    : "from-cyan-400 to-blue-500 animate-pulse"
                }`}
              >
                RM
              </span>
            </a>

            {/* ===== DESKTOP LINKS ===== */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative text-sm font-medium transition-colors
                    ${
                      activeSection === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-current transition-all duration-300
                    ${
                      activeSection === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* ===== MODE TOGGLE ===== */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setMode("creative")}
                className={`p-2 rounded-lg transition-all
                ${
                  mode === "creative"
                    ? "bg-pink-500/20 text-pink-500 shadow-lg shadow-pink-500/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Film size={18} />
              </button>

              <button
                onClick={() => setMode("tech")}
                className={`p-2 rounded-lg transition-all
                ${
                  mode === "tech"
                    ? "bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code2 size={18} />
              </button>
            </div>

            {/* ===== MOBILE BUTTON ===== */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500
        ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-10">

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-semibold hover:scale-110 transition-transform"
            >
              {link.label}
            </a>
          ))}

          {/* MOBILE MODE */}
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => setMode("creative")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg
              ${
                mode === "creative"
                  ? "bg-pink-500/20 text-pink-500"
                  : "text-muted-foreground"
              }`}
            >
              <Film />
              Video
            </button>

            <button
              onClick={() => setMode("tech")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg
              ${
                mode === "tech"
                  ? "bg-cyan-400/20 text-cyan-400"
                  : "text-muted-foreground"
              }`}
            >
              <Code2 />
              Code
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
