import { useEffect, useRef, useState } from 'react';
import { 
  Film, Video, Palette, Music, Camera, Sparkles,
  Code2, Database, Server, Cloud, Terminal, GitBranch,
  Layers, Box, Cpu, Globe, Shield, Zap
} from 'lucide-react';

interface SkillsProps {
  mode: 'creative' | 'tech';
}

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
}

const creativeSkills: Skill[] = [
  { name: 'DaVinci Resolve', level: 95, icon: Film },
  { name: 'Premiere Pro', level: 90, icon: Video },
  { name: 'After Effects', level: 85, icon: Sparkles },
  { name: 'Color Grading', level: 92, icon: Palette },
  { name: 'Motion Graphics', level: 88, icon: Zap },
  { name: 'Cinematography', level: 80, icon: Camera },
  { name: 'Sound Design', level: 75, icon: Music },
  { name: '3D Animation', level: 70, icon: Box },
];

const techSkills: Skill[] = [
  { name: 'React / Next.js', level: 95, icon: Code2 },
  { name: 'TypeScript', level: 92, icon: Terminal },
  { name: 'Node.js', level: 88, icon: Server },
  { name: 'MongoDB', level: 85, icon: Database },
  { name: 'PostgreSQL', level: 82, icon: Layers },
  { name: 'AWS / Cloud', level: 78, icon: Cloud },
  { name: 'Docker', level: 75, icon: Box },
  { name: 'GraphQL', level: 80, icon: GitBranch },
];

export function Skills({ mode }: SkillsProps) {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = mode === 'creative' ? creativeSkills : techSkills;
  const accentColor = mode === 'creative' ? 'hsl(340,100%,50%)' : 'hsl(187,100%,50%)';

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-1000 ${
            mode === 'creative' ? 'bg-[hsl(340,100%,50%)]/10' : 'bg-[hsl(187,100%,50%)]/10'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span 
            className={`inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase mb-4 transition-colors duration-500 ${
              mode === 'creative' 
                ? 'bg-[hsl(340,100%,50%)]/10 text-[hsl(340,100%,50%)]' 
                : 'bg-[hsl(187,100%,50%)]/10 text-[hsl(187,100%,50%)]'
            }`}
          >
            Expertise
          </span>
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
              mode === 'creative' ? 'text-glow-creative' : 'text-glow-tech'
            }`}
          >
            Skills & Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {mode === 'creative'
              ? 'Mastering the art of visual storytelling through industry-leading tools and techniques.'
              : 'Building robust applications with modern technologies and best practices.'}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="glass-card p-6 h-full hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                      mode === 'creative' 
                        ? 'bg-[hsl(340,100%,50%)]/10 group-hover:bg-[hsl(340,100%,50%)]/20' 
                        : 'bg-[hsl(187,100%,50%)]/10 group-hover:bg-[hsl(187,100%,50%)]/20'
                    }`}
                  >
                    <Icon 
                      className="w-6 h-6 transition-colors duration-500" 
                      style={{ color: accentColor }}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? 'w-full' : 'w-0'
                      }`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        backgroundColor: accentColor,
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </div>

                  {/* Level */}
                  <div className="mt-2 text-right">
                    <span 
                      className="text-sm font-medium transition-colors duration-500"
                      style={{ color: accentColor }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div 
          className={`grid md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Card 1 */}
          <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                mode === 'creative' 
                  ? 'bg-[hsl(340,100%,50%)]/10 group-hover:glow-creative' 
                  : 'bg-[hsl(187,100%,50%)]/10 group-hover:glow-tech'
              }`}
            >
              <Globe className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h4 className="text-lg font-semibold mb-2">
              {mode === 'creative' ? 'Global Clients' : 'Remote First'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {mode === 'creative' 
                ? 'Worked with clients from 15+ countries worldwide.' 
                : 'Experienced in distributed teams and async workflows.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                mode === 'creative' 
                  ? 'bg-[hsl(340,100%,50%)]/10 group-hover:glow-creative' 
                  : 'bg-[hsl(187,100%,50%)]/10 group-hover:glow-tech'
              }`}
            >
              <Cpu className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h4 className="text-lg font-semibold mb-2">
              {mode === 'creative' ? '4K Workflow' : 'Performance'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {mode === 'creative' 
                ? 'Optimized for high-resolution footage and fast turnaround.' 
                : 'Building lightning-fast apps with optimized code.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                mode === 'creative' 
                  ? 'bg-[hsl(340,100%,50%)]/10 group-hover:glow-creative' 
                  : 'bg-[hsl(187,100%,50%)]/10 group-hover:glow-tech'
              }`}
            >
              <Shield className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h4 className="text-lg font-semibold mb-2">
              {mode === 'creative' ? 'Quality First' : 'Security'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {mode === 'creative' 
                ? 'Every frame crafted with attention to detail.' 
                : 'Best practices for secure and reliable applications.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
