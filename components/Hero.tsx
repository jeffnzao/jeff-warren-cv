'use client';

import { ArrowRight, ChevronDown, Github, Linkedin, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Lang } from '@/app/page';

interface HeroProps {
  lang: Lang;
  data: any;
}

export default function Hero({ lang, data }: HeroProps) {
  const { personal } = data;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const title = typeof personal.title === 'string' ? personal.title : personal.title[lang];
  const tagline =
    typeof personal.tagline === 'string' ? personal.tagline : personal.tagline[lang];
  const availability =
    typeof personal.availability === 'string'
      ? personal.availability
      : personal.availability[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          {availability}
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4">
          <span className="text-white block">Jeff Warren</span>
          <span className="gradient-text block mt-1">{title}</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#experience"
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-primary-900/30"
          >
            {lang === 'fr' ? 'Mes Expériences' : 'My Experience'}
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/60 hover:border-primary-500/50 text-white font-semibold rounded-xl transition-all duration-200"
          >
            {lang === 'fr' ? 'Me Contacter' : 'Contact Me'}
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-white transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-white transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={personal.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-white transition-all"
            aria-label="Linktree"
          >
            <Link2 size={20} />
          </a>
        </div>

        {/* Code snippet */}
        <div className="inline-block text-left bg-gray-900/80 border border-gray-800/60 rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/60 bg-gray-900/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-gray-500">profile.ts</span>
          </div>
          <pre className="p-5 text-sm font-mono leading-relaxed text-left overflow-auto">
            <code>
              <span className="text-primary-400">const</span>{' '}
              <span className="text-blue-300">jeff</span>{' '}
              <span className="text-gray-400">=</span>{' '}
              <span className="text-yellow-300">{'{'}</span>
              {'\n'}
              {'  '}
              <span className="text-green-300">expertise</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-orange-300">&apos;ITSM&apos;</span>
              <span className="text-gray-400">,</span>
              {'\n'}
              {'  '}
              <span className="text-green-300">sectors</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-yellow-300">[</span>
              <span className="text-orange-300">
                &apos;{lang === 'fr' ? 'Banque' : 'Banking'}&apos;
              </span>
              <span className="text-gray-400">,</span>{' '}
              <span className="text-orange-300">
                &apos;{lang === 'fr' ? 'Santé' : 'Healthcare'}&apos;
              </span>
              <span className="text-gray-400">,</span>{' '}
              <span className="text-orange-300">
                &apos;{lang === 'fr' ? 'Énergie' : 'Energy'}&apos;
              </span>
              <span className="text-yellow-300">]</span>
              <span className="text-gray-400">,</span>
              {'\n'}
              {'  '}
              <span className="text-green-300">available</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-primary-400">true</span>
              {'\n'}
              <span className="text-yellow-300">{'}'}</span>
              <span className="text-gray-400">;</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors"
      >
        <span className="text-xs font-mono">{lang === 'fr' ? 'Défiler' : 'Scroll'}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
