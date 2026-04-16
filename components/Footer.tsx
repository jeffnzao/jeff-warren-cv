'use client';

import { Github, Linkedin, Link2, Heart } from 'lucide-react';
import type { Lang } from '@/app/page';

interface FooterProps {
  lang: Lang;
  data: any;
}

export default function Footer({ lang, data }: FooterProps) {
  const { personal } = data;

  const navItems = {
    fr: [
      { label: 'Accueil', href: '#hero' },
      { label: 'À propos', href: '#about' },
      { label: 'Compétences', href: '#skills' },
      { label: 'Expériences', href: '#experience' },
      { label: 'Projets', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    en: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  return (
    <footer className="border-t border-gray-800/60 bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <div className="font-mono text-xl font-bold mb-3">
              <span className="text-primary-400">&lt;</span>
              <span className="text-white">JW</span>
              <span className="text-primary-400">.DEV/&gt;</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {lang === 'fr'
                ? 'Expert ServiceNow | Passionné par l\'innovation'
                : 'ServiceNow Expert | Passionate about innovation'}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">
              {lang === 'fr' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              {navItems[lang].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">
              {lang === 'fr' ? 'Réseaux' : 'Socials'}
            </h4>
            <div className="flex gap-3">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-primary-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-primary-400 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personal.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 hover:border-primary-500/50 text-gray-400 hover:text-primary-400 transition-all"
                aria-label="Linktree"
              >
                <Link2 size={18} />
              </a>
            </div>
            <div className="mt-4">
              <a
                href={`mailto:${personal.email}`}
                className="text-sm text-gray-500 hover:text-primary-400 transition-colors break-all"
              >
                {personal.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Jeff Warren NZAO BEDIAKO. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            {lang === 'fr' ? 'Fait avec' : 'Made with'}{' '}
            <Heart size={12} className="text-primary-500 fill-primary-500" />{' '}
            {lang === 'fr' ? 'avec Next.js & Tailwind' : 'with Next.js & Tailwind'}
          </p>
        </div>
      </div>
    </footer>
  );
}
