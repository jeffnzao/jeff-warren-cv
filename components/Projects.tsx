'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Clock, Box, Layers, Database, Settings } from 'lucide-react';
import type { Lang } from '@/app/page';

interface ProjectsProps {
  lang: Lang;
  data: any;
}

const iconMap: Record<string, React.ReactNode> = {
  clock: <Clock size={40} />,
  box: <Box size={40} />,
  layers: <Layers size={40} />,
  database: <Database size={40} />,
  settings: <Settings size={40} />,
};

export default function Projects({ lang, data }: ProjectsProps) {
  const { projects } = data;
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  // Collect unique categories
  const categories: string[] = ['all', ...Array.from(new Set(projects.map((p: any) => p.category)))];

  const filtered =
    filter === 'all' ? projects : projects.filter((p: any) => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categoryLabel = (cat: string) => {
    if (cat === 'all') return lang === 'fr' ? 'Tous' : 'All';
    if (cat === 'servicenow') return 'ServiceNow';
    if (cat === 'web') return 'Web';
    return cat;
  };

  return (
    <section id="projects" className="section-padding bg-gray-900/30" ref={sectionRef}>
      <div className="container-max">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-mono font-medium mb-4">
            {lang === 'fr' ? '# Réalisations' : '# Achievements'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {lang === 'fr' ? 'Projets ' : 'Major '}
            <span className="gradient-text">{lang === 'fr' ? 'Majeurs' : 'Projects'}</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                  : 'bg-gray-800/60 border border-gray-700/60 text-gray-400 hover:text-white hover:border-primary-500/40'
              }`}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project: any, i: number) => {
            const title =
              typeof project.title === 'string' ? project.title : project.title[lang];
            const description =
              typeof project.description === 'string'
                ? project.description
                : project.description[lang];

            return (
              <div
                key={i}
                className="animate-on-scroll glass-card overflow-hidden group hover:border-primary-500/40 transition-all duration-300"
              >
                {/* Project image/placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-primary-900/40 to-gray-900/60 flex items-center justify-center border-b border-gray-800/60">
                  <div className="text-primary-400/40 group-hover:text-primary-400/70 transition-all duration-300 group-hover:scale-110">
                    {iconMap[project.icon] ?? <Layers size={40} />}
                  </div>
                  {/* Overlay links */}
                  <div className="absolute inset-0 bg-gray-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-500 transition-all"
                      >
                        <ExternalLink size={15} />
                        Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all border border-gray-700"
                      >
                        <Github size={15} />
                        Code
                      </a>
                    )}
                    {!project.demo && !project.github && (
                      <span className="text-gray-400 text-sm font-mono">
                        {lang === 'fr' ? 'Projet confidentiel' : 'Confidential project'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2 leading-snug">{title}</h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 rounded-md text-xs font-mono text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
