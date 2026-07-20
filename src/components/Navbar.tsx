import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Compass, Heart, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../translations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.story'), href: '#story' },
    { name: t('nav.facilities'), href: '#facilities' },
    { name: t('nav.pricing'), href: '#pricing' },
    { name: t('nav.extras'), href: '#extras' },
    { name: t('nav.policies'), href: '#policies' },
    { name: t('nav.ethics'), href: '#service-ethics' },
    { name: t('nav.community'), href: '#community' },
    { name: t('nav.todo'), href: '#todo' },
    { name: t('nav.gallery'), href: '#gallery' },
  ];

  const languagesList = [
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-sand-100'
          : 'bg-gradient-to-b from-ocean-950/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Branding */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-2 rounded-full bg-ocean-500/10 text-ocean-500 group-hover:scale-105 transition-transform">
              <Compass className={`h-6 w-6 ${scrolled ? 'text-ocean-500' : 'text-champagne'}`} />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-sans font-bold tracking-widest text-lg sm:text-xl uppercase transition-colors ${
                  scrolled ? 'text-ocean-950' : 'text-white'
                }`}
              >
                Hamara
              </span>
              <span
                className={`text-[10px] tracking-[0.25em] font-sans font-medium uppercase transition-colors ${
                  scrolled ? 'text-ocean-600' : 'text-champagne'
                }`}
              >
                Guest House
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-sans font-medium text-sm tracking-wider uppercase transition-colors ${
                  scrolled ? 'text-slate-700 hover:text-ocean-500' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop/Mobile Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Call to Action Buttons (Desktop only, hidden on small screens) */}
            <div className="hidden sm:flex items-center">
              <a
                href="https://wa.me/6282177671110?text=Halo%20Tia%2C%20saya%20tertarik%20untuk%20booking%20Hamara%20Guest%20House%20Krui."
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-sm ${
                  scrolled
                    ? 'bg-ocean-500 hover:bg-ocean-600 text-white hover:shadow-md'
                    : 'bg-white hover:bg-sand-100 text-ocean-950 hover:scale-105'
                }`}
              >
                <PhoneCall className="h-3 w-3 animate-pulse" />
                <span>{t('nav.whatsapp')}</span>
              </a>
            </div>

            {/* Language Selector Dropdown (Visible on both desktop and mobile, next to hamburger button on mobile) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none ${
                  scrolled
                    ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                aria-label="Change Language"
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="hidden xs:inline">{currentLangObj.name}</span>
                <span className="xs:hidden font-mono">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 origin-top-right">
                    {languagesList.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left font-sans text-xs font-semibold hover:bg-ocean-50 text-slate-700 hover:text-ocean-600 transition-colors ${
                          language === lang.code ? 'bg-ocean-50 text-ocean-600 font-bold' : ''
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors focus:outline-none ${
                  scrolled ? 'text-ocean-950 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide text-slate-800 hover:bg-ocean-50 hover:text-ocean-600 transition-all uppercase"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 px-4">
              <a
                href="https://wa.me/6282177671110?text=Halo%20Tia%2C%20saya%20tertarik%20untuk%20booking%20Hamara%20Guest%20House%20Krui."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-sans font-semibold text-xs tracking-widest uppercase transition-all shadow"
              >
                <PhoneCall className="h-4 w-4" />
                <span>{t('nav.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
