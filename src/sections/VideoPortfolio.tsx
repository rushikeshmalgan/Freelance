import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink, Clock, Calendar, X } from "lucide-react";

interface VideoPortfolioProps {
  mode: "creative" | "tech";
}

interface VideoProject {
  id: number;
  title: string;
  category: "Instagram Reel" | "YT Shorts";
  thumbnail: string;
  video: string;
  duration: string;
  year: string;
  description: string;
  orientation?: "landscape" | "portrait";
}

const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "Teasers for creating hype",
    category: "Instagram Reel",
    thumbnail: "/teaser.png",
    video: "/0120(1).mp4",
    duration: "0:15",
    year: "2025",
    description: "Fast-paced urban reel with custom sound design.",
    orientation: "landscape",
  },
  {
    id: 2,
    title: "Tech Showcase",
    category: "YT Shorts",
    thumbnail: "/workshop.png",
    video: "/git.mp4",
    duration: "0:58",
    year: "2025",
    description: "A deep dive into modern software aesthetics.",
    orientation: "portrait",
  },
  {
    id: 3,
    title: "Viral Reel",
    category: "Instagram Reel",
    thumbnail: "/rohit_pre.png",
    video: "/Rohit.mp4",
    duration: "1:05",
    year: "2024",
    description: "Capturing some special moments.",
    orientation: "portrait",
  },
];

export function VideoPortfolio({ mode: _mode }: VideoPortfolioProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [filter, setFilter] = useState("All");

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    filter === "All"
      ? videoProjects
      : videoProjects.filter((p) => p.category === filter);

  return (
    <>
      {/* ================= MODAL PLAYER ================= */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setActiveProject(null)} 
          />

          <div
            className={`relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10
            ${
              activeProject.orientation === "portrait"
                ? "h-full max-h-[85vh] aspect-[9/16]"
                : "w-full max-w-5xl aspect-video"
            }`}
          >
            {/* CLOSE BUTTON - Lowered and Left-Sided */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 left-6 bg-black/50 hover:bg-pink-500 backdrop-blur-md 
                         text-white p-2 rounded-full z-[1001] transition-all border border-white/20"
            >
              <X size={20} />
            </button>

            <video
              src={activeProject.video}
              autoPlay
              controls
              controlsList="nodownload"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ================= PORTFOLIO SECTION ================= */}
      <section
        id="video"
        ref={sectionRef}
        className={`relative min-h-screen py-24 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="mb-10 text-center">
            <span className="px-4 py-2 rounded-full text-xs bg-pink-500/10 text-pink-500 font-bold tracking-widest uppercase">
              Video Works
            </span>
            <h2 className="text-5xl font-bold mt-4 tracking-tight">Selected Clips</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Short-form storytelling for Instagram Reels & YouTube Shorts.
            </p>
          </div>

          {/* FILTER TABS */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {["All", "Instagram Reel", "YT Shorts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium border
                  ${filter === cat 
                    ? "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20" 
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-500"
                onClick={() => setActiveProject(project)}
              >
                {/* THUMBNAIL AREA */}
                <div className="relative aspect-[9/16] md:aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <Play className="text-white fill-current ml-1" size={24} />
                    </div>
                  </div>
                </div>

                {/* INFO AREA */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={14} />
                      {project.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-pink-500 transition-colors">
                    {project.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </div>
                    <span>Click to watch</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
            <h3 className="text-3xl font-bold">Ready to make an impact?</h3>
            <p className="text-muted-foreground mt-4 mb-8">
              Let's create high-retention content for your brand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold transition-all shadow-lg shadow-pink-500/25 active:scale-95"
              >
                Work With Me
              </button>
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}