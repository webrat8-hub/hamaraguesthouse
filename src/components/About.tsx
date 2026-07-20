import { MapPin, Compass, Landmark, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../data';
import { useLanguage } from '../LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual: Image Grid */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-sand-100">
              <img
                src={IMAGES.villaExterior}
                alt="Hamara Guest House Beautiful Renovated Premium Villa Exterior"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Sandy Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-sand-200">
                <span className="block font-sans text-xs tracking-widest text-ocean-600 uppercase font-semibold mb-1">{t('about.badge.title')}</span>
                <p className="font-serif text-xs text-slate-600 leading-relaxed font-light">
                  {t('about.badge.desc')}
                </p>
              </div>
            </div>
            
            {/* Background design accents */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-sand-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-0" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-ocean-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 -z-0" />
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Small Heading Accent */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-8 bg-gold-500" />
              <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
                {t('about.heading.accent')}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
              {t('about.title')} <br />
              <span className="font-serif font-light text-slate-700 italic text-xl sm:text-2xl mt-1 block">{t('about.title.italic')}</span>
            </h2>

            {/* Paragraph Description */}
            <div className="font-serif text-slate-600 text-base sm:text-lg leading-relaxed space-y-4 mb-8 font-light">
              <p>
                {t('about.desc.p1')}
              </p>
              <p>
                {t('about.desc.p2')}
              </p>
            </div>

            {/* Core Selling Points (Mini Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="flex gap-3">
                <div className="p-2.5 h-fit rounded-lg bg-sand-100 text-ocean-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ocean-950 uppercase tracking-wide mb-1">
                    {t('about.point.location.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-500 leading-relaxed font-light">
                    {t('about.point.location.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 h-fit rounded-lg bg-sand-100 text-ocean-700">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ocean-950 uppercase tracking-wide mb-1">
                    {t('about.point.beach.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-500 leading-relaxed font-light">
                    {t('about.point.beach.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 h-fit rounded-lg bg-sand-100 text-ocean-700">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ocean-950 uppercase tracking-wide mb-1">
                    {t('about.point.quality.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-500 leading-relaxed font-light">
                    {t('about.point.quality.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 h-fit rounded-lg bg-sand-100 text-ocean-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ocean-950 uppercase tracking-wide mb-1">
                    {t('about.point.privacy.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-500 leading-relaxed font-light">
                    {t('about.point.privacy.desc')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
