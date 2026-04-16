'use client';

import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import type { Lang } from '@/app/page';

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

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  data: any;
}

export default function Navbar({ lang, onToggleLang, data }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = navItems[lang];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-lg font-bold">
          <span className="text-primary-400">&lt;</span>
          <span className="text-white">JW</span>
          <span className="text-primary-400">.DEV/&gt;</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {items.map((item) => {
            const sectionId = item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    activeSection === sectionId
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 text-sm font-mono font-medium bg-gray-800/60 border border-gray-700/60 rounded-lg hover:border-primary-500/50 transition-all text-gray-300 hover:text-white"
          >
            {lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
          <a
            href="/cv-jeff-warren.pdf"
            download
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all"
          >
            <Download size={15} />
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-gray-800/60 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800/60">
            <button
              onClick={onToggleLang}
              className="flex-1 py-2 text-sm font-mono bg-gray-800/60 border border-gray-700/60 rounded-lg text-gray-300"
            >
              {lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
            </button>
            <a
              href="/cv-jeff-warren.pdf"
              download
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm bg-primary-600 text-white rounded-lg"
            >
              <Download size={15} />
              CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
