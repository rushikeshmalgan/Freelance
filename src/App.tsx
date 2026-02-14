import { useEffect, useRef, useState } from "react";

import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { VideoPortfolio } from "./sections/VideoPortfolio";
import { DevPortfolio } from "./sections/DevPortfolio";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

import { CustomCursor } from "./components/CustomCursor";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navigation } from "./components/Navigation";

function App() {

  /* ================= STATES ================= */

  const [mode, setMode] = useState<"creative" | "tech">(() => {
    return (localStorage.getItem("site-mode") as "creative" | "tech") || "creative";
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ================= INITIAL LOADER ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  /* ================= SAVE MODE ================= */

  useEffect(() => {
    localStorage.setItem("site-mode", mode);

    const root = document.documentElement;
    if (mode === "creative") {
      root.style.setProperty("--ring", "340 100% 50%");
    } else {
      root.style.setProperty("--ring", "187 100% 50%");
    }
  }, [mode]);

  /* ================= KEYBOARD SHORTCUT (M) ================= */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        setMode((prev) => (prev === "creative" ? "tech" : "creative"));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ================= LOADER UI ================= */

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="relative">

          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-pink-500 border-r-cyan-400 animate-spin" />

          <p className="mt-6 text-sm tracking-widest text-muted-foreground text-center">
            Loading Experience...
          </p>

        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-background overflow-x-hidden transition-opacity duration-700 opacity-100"
      data-mode={mode}
    >

      {/* Custom Cursor */}
      <CustomCursor mode={mode} />

      {/* Particle Background */}
      <ParticleBackground mode={mode} />

      {/* Navigation */}
      <Navigation mode={mode} setMode={setMode} />

      {/* MAIN CONTENT */}
      <main className="relative z-10">

        <Hero mode={mode} setMode={setMode} />

        <About mode={mode} />

        <VideoPortfolio mode={mode} />

        <DevPortfolio mode={mode} />

        <Skills mode={mode} />

        <Contact mode={mode} />

        <Footer mode={mode} />

      </main>

      {/* Film Grain / Noise */}
      <div className="fixed inset-0 pointer-events-none z-40 noise-overlay opacity-40" />

    </div>
  );
}

export default App;
