import { Compass, CalendarDays, ChevronDown, Award } from 'lucide-react';
import { IMAGES } from '../data';
import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToCalculator = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ocean-950 text-white">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroBeachPath}
          alt="Hamara Guest House Beautiful Garden Path leading directly to Benawang Beach"
          className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_ease-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/40 to-ocean-950/50" />
      </div>

      {/* Hero Content Block */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12 flex flex-col items-center justify-center">
        {/* Rating/Feature Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/10 backdrop-blur-md border border-champagne/20 mb-8 animate-fade-in">
          <Award className="h-4 w-4 text-champagne" />
          <span className="font-sans text-xs tracking-widest text-champagne uppercase font-medium">
            {t('hero.badge')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 max-w-4xl animate-slide-up text-sand-50">
          {t('hero.title.line1')} <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-white to-sand-100">
            {t('hero.title.line2')}
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="font-serif text-lg sm:text-xl text-sand-100/90 font-light max-w-3xl leading-relaxed mb-10 animate-fade-in-delayed">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12 animate-fade-in-delayed">
          <button
            onClick={scrollToCalculator}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-ocean-950 font-sans font-semibold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <CalendarDays className="h-4 w-4" />
            <span>{t('hero.cta.check')}</span>
          </button>
          
          <button
            onClick={scrollToCalculator}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-sans font-semibold text-sm tracking-wider uppercase hover:scale-105 transition-all duration-300"
          >
            <span>{t('hero.cta.wa')}</span>
          </button>
        </div>

        {/* Feature quick details bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl border-t border-white/10 pt-8 mt-4 text-center">
          <div>
            <span className="block font-sans text-xs tracking-widest text-champagne uppercase mb-1">{t('hero.feat.access')}</span>
            <span className="block font-serif text-sm text-sand-100/90 font-light">{t('hero.feat.access.desc')}</span>
          </div>
          <div>
            <span className="block font-sans text-xs tracking-widest text-champagne uppercase mb-1">{t('hero.feat.modern')}</span>
            <span className="block font-serif text-sm text-sand-100/90 font-light">{t('hero.feat.modern.desc')}</span>
          </div>
          <div>
            <span className="block font-sans text-xs tracking-widest text-champagne uppercase mb-1">{t('hero.feat.wifi')}</span>
            <span className="block font-serif text-sm text-sand-100/90 font-light">{t('hero.feat.wifi.desc')}</span>
          </div>
          <div>
            <span className="block font-sans text-xs tracking-widest text-champagne uppercase mb-1">{t('hero.feat.eco')}</span>
            <span className="block font-serif text-sm text-sand-100/90 font-light">{t('hero.feat.eco.desc')}</span>
          </div>
        </div>
      </div>

      {/* Floating Animated Scroll Down Icon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-sand-200/60 hover:text-white transition-colors cursor-pointer" onClick={scrollToCalculator}>
        <span className="font-sans text-[10px] uppercase tracking-widest font-medium">{t('hero.scroll')}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* CSS Animations Injector */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.03); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1.03); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 1.2s ease-out 0.4s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
