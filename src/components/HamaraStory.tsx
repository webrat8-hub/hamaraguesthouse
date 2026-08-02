import { useLanguage } from '../LanguageContext';
import { Heart, BookOpen } from 'lucide-react';

export default function HamaraStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-24 bg-gradient-to-b from-sand-50 to-white overflow-hidden border-t border-b border-sand-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Small Heading Accent */}
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="h-[2px] w-8 bg-gold-500" />
            <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
              {t('story.title')}
            </span>
            <div className="h-[2px] w-8 bg-gold-500" />
          </div>

          {/* Main Title */}
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-8">
            {t('story.subtitle')}
          </h2>

          {/* Paragraph Description */}
          <div className="font-serif text-slate-700 text-sm sm:text-base leading-relaxed space-y-5 font-light text-justify sm:text-left max-w-3xl">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-ocean-700 first-letter:mr-3 first-letter:float-left">
              {t('story.p1')}
            </p>
            <p>{t('story.p2')}</p>
            <p className="border-l-4 border-gold-400 pl-4 italic text-slate-600 bg-gold-50/20 py-3 rounded-r-lg text-left">
              "{t('story.p3')}"
            </p>
            <p>{t('story.p4')}</p>
            <p>{t('story.p5')}</p>
            <p>{t('story.p6')}</p>
            <p className="font-medium text-ocean-900">{t('story.p7')}</p>
          </div>

          {/* Highlights & Info Badges */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl border-t border-slate-100 pt-8">
            {/* Signature or Badge */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gold-100 border-2 border-white flex items-center justify-center text-gold-600">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </div>
              <div className="text-left">
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-ocean-950">
                  Ibu Tia & Family
                </h4>
                <p className="font-serif text-[11px] text-slate-500 italic">
                  Founders of Hamara Guest House
                </p>
              </div>
            </div>

            {/* Separator for desktop */}
            <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />

            {/* Story Timeline visual decorators */}
            <div className="p-3 px-4 rounded-xl bg-sand-100/50 border border-sand-200/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white text-gold-600 shadow-sm shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <span className="font-sans font-semibold text-ocean-950 block">Authentic Village Heritage</span>
                <span className="font-serif text-slate-500 font-light">Meticulously preserving coral walls since 1950</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
