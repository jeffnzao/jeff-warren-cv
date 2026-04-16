'use client';

import { useEffect, useRef } from 'react';
import type { Lang } from '@/app/page';

interface AboutProps {
  lang: Lang;
  data: any;
}

export default function About({ lang, data }: AboutProps) {
  const { about } = data;
  const sectionRef = useRef<HTMLElement>(null);

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

  const paragraphs: string[] = about[lang];
  const stats = about.stats;

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div className="container-max">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-mono font-medium mb-4">
            {lang === 'fr' ? '# À Propos' : '# About'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {lang === 'fr' ? 'Consultant Technique ' : 'Technical '}
            <span className="gradient-text">ServiceNow</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`animate-on-scroll text-gray-300 leading-relaxed ${
                  i === 0 ? 'text-lg font-medium text-gray-200' : ''
                } ${i === paragraphs.length - 1 ? 'font-semibold text-white' : ''}`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats + visual */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat: any, i: number) => (
                <div
                  key={i}
                  className="animate-on-scroll glass-card p-5 text-center glow-border"
                >
                  <div className="text-3xl font-black gradient-text mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-400 leading-tight">
                    {typeof stat.label === 'string' ? stat.label : stat.label[lang]}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech orbit visual */}
            <div className="animate-on-scroll glass-card p-8 flex items-center justify-center relative min-h-56">
              <div className="relative flex items-center justify-center w-48 h-48">
                {/* Center */}
                <div className="absolute z-10 w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/40 flex items-center justify-center">
                  <span className="text-primary-400 font-mono font-bold text-xs">SN</span>
                </div>

                {/* Orbit ring */}
                <div className="absolute w-40 h-40 rounded-full border border-primary-500/20 animate-spin-slow" />
                <div className="absolute w-32 h-32 rounded-full border border-blue-500/15" />

                {/* Orbit items */}
                {['ITSM', 'ITIL', 'Dev', 'Cloud'].map((item, i) => {
                  const angle = (i / 4) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 78;
                  const y = Math.sin(rad) * 78;
                  return (
                    <div
                      key={item}
                      className="absolute flex items-center justify-center w-12 h-8 rounded-lg bg-gray-800 border border-gray-700/60 text-xs font-mono font-semibold text-primary-300"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
