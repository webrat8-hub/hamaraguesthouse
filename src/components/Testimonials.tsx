import { Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getLocalizedTestimonials } from '../translations';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const testimonialsList = getLocalizedTestimonials(language);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-sand-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-ocean-600 uppercase font-bold block mb-3">
            {t('test.accent')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {t('test.title')}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 font-light text-sm sm:text-base leading-relaxed">
            {t('test.sub')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsList.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Quote Mark Accent */}
              <div className="absolute top-6 right-8 text-sand-100 font-serif text-6xl pointer-events-none select-none">
                “
              </div>

              <div>
                {/* Stars Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="font-serif text-slate-600 text-sm italic font-light leading-relaxed mb-6 whitespace-pre-line">
                  "{t.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-dashed border-slate-100 mt-4">
                <h4 className="font-sans font-bold text-sm text-ocean-950">
                  {t.name}
                </h4>
                <p className="font-sans text-[10px] tracking-wide text-ocean-600 font-semibold uppercase mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
