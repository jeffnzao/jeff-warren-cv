'use client';

import { useEffect, useRef } from 'react';
import { Layers, Code, Box, Database, Settings, Wrench } from 'lucide-react';
import type { Lang } from '@/app/page';

interface SkillsProps {
  lang: Lang;
  data: any;
}

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers size={28} />,
  code: <Code size={28} />,
  box: <Box size={28} />,
  database: <Database size={28} />,
  settings: <Settings size={28} />,
  tool: <Wrench size={28} />,
};

export default function Skills({ lang, data }: SkillsProps) {
  const { skills } = data;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-padding bg-gray-900/30" ref={sectionRef}>
      <div className="container-max">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-mono font-medium mb-4">
            {lang === 'fr' ? '# Mes Compétences' : '# My Skills'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Technologies &amp;{' '}
            <span className="gradient-text">{lang === 'fr' ? 'Expertise' : 'Expertise'}</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill: any, i: number) => {
            const title =
              typeof skill.title === 'string' ? skill.title : skill.title[lang];
            const description =
              typeof skill.description === 'string'
                ? skill.description
                : skill.description[lang];
            return (
              <div
                key={i}
                className="animate-on-scroll glass-card p-6 group hover:border-primary-500/40 hover:glow-border transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-5 group-hover:bg-primary-500/20 transition-all">
                  {iconMap[skill.icon] ?? <Code size={28} />}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-800/80 border border-gray-700/60 rounded-lg text-xs font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
