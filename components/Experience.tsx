'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import type { Lang } from '@/app/page';

interface ExperienceProps {
  lang: Lang;
  data: any;
}

export default function Experience({ lang, data }: ExperienceProps) {
  const { experiences } = data;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-padding" ref={sectionRef}>
      <div className="container-max">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-mono font-medium mb-4">
            {lang === 'fr' ? '# Parcours Professionnel' : '# Professional Journey'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {lang === 'fr' ? 'Mes ' : 'My '}
            <span className="gradient-text">{lang === 'fr' ? 'Expériences' : 'Experience'}</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/60 via-primary-500/20 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp: any, i: number) => {
              const date =
                typeof exp.date === 'string' ? exp.date : exp.date[lang];
              const title =
                typeof exp.title === 'string' ? exp.title : exp.title[lang];
              const missions: string[] = exp.missions[lang];

              return (
                <div key={i} className="animate-on-scroll relative flex gap-6 pl-14">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      exp.current
                        ? 'bg-primary-600 border-primary-400 shadow-lg shadow-primary-900/50'
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <Briefcase size={16} className={exp.current ? 'text-white' : 'text-gray-400'} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card p-6 hover:border-primary-500/30 transition-all">
                    {/* Date + current badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                        {date}
                      </span>
                      {exp.current && (
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                          {lang === 'fr' ? '● Actuel' : '● Current'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <h4 className="text-sm font-semibold text-primary-400 mb-1">{exp.company}</h4>

                    {exp.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    )}

                    {exp.context && (
                      <p className="text-xs text-gray-400 italic bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 mb-3">
                        {typeof exp.context === 'string' ? exp.context : exp.context[lang]}
                      </p>
                    )}

                    <ul className="space-y-2 mb-5">
                      {missions.map((m: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-primary-500 mt-1.5 shrink-0">▸</span>
                          {m}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-800/80 border border-gray-700/60 rounded-lg text-xs font-mono text-gray-300"
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
      </div>
    </section>
  );
}
