import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Layers,
  // Server,
  Brain,
  Layout,
  X,
  // Code2,
  Hammer, // Added for Work in Progress icon
} from "lucide-react";

interface DevPortfolioProps {
  mode: "creative" | "tech";
}

interface DevProject {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  icon: React.ElementType;
  featured?: boolean;
}

const devProjects: DevProject[] = [
  {
    id: 1,
    title: "3D Portfolio Website",
    description: "Fascinating 3D Portfolio website that stands out with immersive interactions.",
    thumbnail: "/portfolio.png",
    tags: ["React", "TypeScript", "Three.js", "Tailwind"],
    category: "Web App",
    demoUrl: "https://rushikesh-portfolio-virid.vercel.app/",
    githubUrl: "https://github.com/rushikeshmalgan/3D-Portfolio-Website.git",
    icon: Layers,
    featured: true,
  },
  {
    id: 2,
    title: "AI Resume Builder",
    description: "Build Smarter. Get Hired Faster.",
    thumbnail: "/dev-thumb-2.jpg",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind"],
    category: "Full Stack",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/rushikeshmalgan/ai-resume---portfolio-builder.git",
    icon: Layout,
  },
  {
    id: 3,
    title: "AI Room Designer",
    description: "Conversational AI utilizing LLMs with real-time data to generate impressive results.",
    thumbnail: "/ard.png",
    tags: ["React", "OpenAI", "LLMS"],
    category: "AI",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/rushikeshmalgan/AI-ROOM-DESIGNER.git",
    icon: Brain,
  },
];

export function DevPortfolio({ mode: _mode }: DevPortfolioProps) {
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<DevProject | null>(null);
  const [filter, setFilter] = useState("All");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    filter === "All"
      ? devProjects
      : devProjects.filter((p) => p.category === filter);

  // Helper to check if URL is a placeholder
  const isLive = (url: string) => !url.includes("demo.com");

  return (
    <>
      {/* ================= MODAL PLAYER ================= */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveProject(null)} />

          <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            
            {/* MODAL HEADER */}
            <div className="absolute top-4 left-4 z-[1001] flex items-center gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="bg-black/50 hover:bg-cyan-500 backdrop-blur-md text-white p-2 rounded-full transition-all border border-white/20 shadow-xl"
              >
                <X size={20} />
              </button>
              <div className="hidden md:flex px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive(activeProject.demoUrl) ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                <span className="text-xs font-mono text-white/70">
                  {isLive(activeProject.demoUrl) ? activeProject.demoUrl : "dev.local/work-in-progress"}
                </span>
              </div>
            </div>

            {/* CONTENT LOGIC */}
            {isLive(activeProject.demoUrl) ? (
              <iframe
                src={activeProject.demoUrl}
                className="w-full h-full border-none bg-white"
                title={activeProject.title}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-center p-6">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                  <Hammer size={80} className="text-cyan-500 relative animate-bounce" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Work In Progress</h3>
                <p className="text-muted-foreground max-w-md">
                  I'm currently polishing the final features of <strong>{activeProject.title}</strong>. 
                  The live demo will be available shortly!
                </p>
                <div className="mt-8 flex gap-4">
                  <a 
                    href={activeProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-colors flex items-center gap-2"
                  >
                    <Github size={16} /> Monitor Progress
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SECTION ================= */}
      <section id="dev" ref={ref} className="relative min-h-screen py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Engineering
            </span>
            <h2 className="text-5xl font-extrabold mt-6 tracking-tight">Building the Web</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
              Scalable full-stack applications & AI-powered systems.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {["All", "Web App", "Full Stack", "AI"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium border text-sm
                  ${filter === cat 
                    ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                    : "bg-white/5 border-white/10 hover:border-cyan-500/30 text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              const Icon = project.icon;
              const hasLiveDemo = isLive(project.demoUrl);

              return (
                <div
                  key={project.id}
                  className={`group relative bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${project.id * 100}ms` }}
                >
                  {/* THUMB */}
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setActiveProject(project)}>
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-cyan-500 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <ExternalLink className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4 text-cyan-400">
                      <Icon size={18} strokeWidth={2.5} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{project.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] font-medium bg-white/5 border border-white/10 text-white/70 rounded-md">{tag}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} /> Code
                      </a>
                      <button 
                        onClick={() => setActiveProject(project)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-95
                          ${hasLiveDemo 
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/20" 
                            : "bg-white/10 hover:bg-white/20 text-white/80"}`}
                      >
                        {hasLiveDemo ? "Live Demo" : "View Status"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}