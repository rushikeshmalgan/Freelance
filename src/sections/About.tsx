import { useEffect, useRef, useState } from "react";
import { Clapperboard, Terminal, Sparkles, Zap } from "lucide-react";

interface AboutProps {
  mode: "creative" | "tech";
}

export function About({ mode }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================== REALISTIC STATS ================== */

  const creativeStats = [
    { icon: Clapperboard, label: "Projects", value: "60+" },
    { icon: Sparkles, label: "Happy Clients", value: "25+" },
    { icon: Zap, label: "Years Exp.", value: "4+" }, // since 2021
  ];

  const techStats = [
    { icon: Terminal, label: "Projects", value: "30+" },
    { icon: Zap, label: "Web Apps Built", value: "15+" },
    { icon: Sparkles, label: "Years Exp.", value: "2+" }, // since 2023
  ];

  const stats = mode === "creative" ? creativeStats : techStats;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-0 left-0 w-1/2 h-full opacity-30 ${
            mode === "creative"
              ? "bg-gradient-to-r from-[hsl(340,100%,50%)]/10 to-transparent"
              : ""
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-1/2 h-full opacity-30 ${
            mode === "tech"
              ? "bg-gradient-to-l from-[hsl(187,100%,50%)]/10 to-transparent"
              : ""
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span
            className={`inline-block px-4 py-2 rounded-full text-xs font-medium uppercase mb-4 ${
              mode === "creative"
                ? "bg-[hsl(340,100%,50%)]/10 text-[hsl(340,100%,50%)]"
                : "bg-[hsl(187,100%,50%)]/10 text-[hsl(187,100%,50%)]"
            }`}
          >
            About Me
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className={mode === "creative" ? "text-glow-creative" : "text-glow-tech"}>
              {mode === "creative" ? "The Story" : "The Logic"}
            </span>
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="glass-card p-8">

              {mode === "creative" ? (
                <>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                    <Clapperboard className="w-6 h-6 text-[hsl(340,100%,50%)]" />
                    Video Editing & Motion Design
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    I started my journey in video editing in 2021. Since then, I’ve worked on
                    short films, YouTube content, reels, ads, and social media videos.
                  </p>

                  <p className="text-muted-foreground">
                    My focus is storytelling, smooth pacing, clean transitions, and cinematic
                    color grading. I aim to make every video engaging and meaningful.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                    <Terminal className="w-6 h-6 text-[hsl(187,100%,50%)]" />
                    Full-Stack Web Development
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    I started building websites in 2023 and gradually moved into full-stack
                    development using the MERN stack.
                  </p>

                  <p className="text-muted-foreground">
                    I build responsive, fast, and scalable web applications with clean UI,
                    strong backend logic, and modern design principles.
                  </p>
                </>
              )}

            </div>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-2">
              {(mode === "creative"
                ? ["Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading", "Reels Editing", "Motion Graphics"]
                : ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Tailwind CSS"]
              ).map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    mode === "creative"
                      ? "border-[hsl(340,100%,50%)]/30 text-[hsl(340,100%,50%)]"
                      : "border-[hsl(187,100%,50%)]/30 text-[hsl(187,100%,50%)]"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT STATS */}
          <div
            className={`grid sm:grid-cols-3 gap-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-4 ${
                    mode === "creative"
                      ? "text-[hsl(340,100%,50%)]"
                      : "text-[hsl(187,100%,50%)]"
                  }`}
                />
                <div
                  className={`text-3xl font-bold mb-2 ${
                    mode === "creative" ? "text-glow-creative" : "text-glow-tech"
                  }`}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* TIMELINE */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">

          {(mode === "creative"
            ? [
                { year: "2021", title: "Started Video Editing", company: "Self Learning" },
                { year: "2022", title: "Freelance Video Editor", company: "Online Clients" },
                { year: "2023", title: "Advanced Motion Graphics", company: "Projects & Courses" },
                { year: "2024", title: "Professional Freelancing", company: "Brand & Creators" },
              ]
            : [
                { year: "2023", title: "Started Web Development", company: "MERN Stack" },
                { year: "2024", title: "Frontend Developer", company: "React Projects" },
                { year: "2024", title: "Backend Development", company: "Node & MongoDB" },
                { year: "2025", title: "Freelance Full-Stack Developer", company: "Client Projects" },
              ]
          ).map((item) => (
            <div key={item.title} className="glass-card p-6">
              <p
                className={`text-sm mb-2 ${
                  mode === "creative"
                    ? "text-[hsl(340,100%,50%)]"
                    : "text-[hsl(187,100%,50%)]"
                }`}
              >
                {item.year}
              </p>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-muted-foreground">{item.company}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
