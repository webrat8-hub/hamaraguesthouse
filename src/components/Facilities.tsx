import { Bed, ShowerHead, Utensils, Wifi, Tv, Trees, ChefHat, Sun } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getLocalizedFacilities } from '../translations';

const iconMap: Record<string, any> = {
  Bed,
  ShowerHead,
  Utensils,
  Wifi,
  Tv,
  Trees,
  ChefHat,
  Sun,
};

export default function Facilities() {
  const { t, language } = useLanguage();
  const facilitiesList = getLocalizedFacilities(language);

  return (
    <section id="facilities" className="py-24 bg-sand-50 border-y border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-sans text-xs tracking-[0.2em] text-ocean-600 uppercase font-bold">
              {t('facilities.accent')}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {t('facilities.title')}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 font-light text-base sm:text-lg leading-relaxed">
            {t('facilities.sub')}
          </p>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilitiesList.map((facility) => {
            const IconComponent = iconMap[facility.icon] || Bed;
            return (
              <div
                key={facility.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="p-3.5 rounded-xl bg-ocean-50 text-ocean-600 w-fit mb-5">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-sans font-bold text-base text-ocean-950 tracking-wide mb-2">
                    {facility.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-serif text-xs text-slate-500 leading-relaxed font-light">
                    {facility.description}
                  </p>
                </div>
                
                {/* Visual marker */}
                <div className="w-6 h-[2px] bg-sand-200 mt-6 group-hover:bg-ocean-500 transition-colors" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
