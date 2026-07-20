import { CalendarDays, Wallet, Clock, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function BookingPolicies() {
  const { t } = useLanguage();

  return (
    <section id="policies" className="py-24 bg-white border-b border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-ocean-600 uppercase font-bold block mb-3">
            {t('policies.accent')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {t('policies.title')}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 font-light text-base sm:text-lg leading-relaxed">
            {t('policies.sub')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          
          {/* Column 1: Booking Process & House Policies */}
          <div className="bg-sand-50/50 rounded-3xl p-8 border border-sand-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="h-5 w-5 text-ocean-600" />
              <h3 className="font-sans font-bold text-lg text-ocean-950 uppercase tracking-wide">
                {t('policies.col1.title')}
              </h3>
            </div>

            <div className="space-y-6">
              {/* Step 1: Booking contact */}
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm text-ocean-600 h-fit">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-wider mb-1">
                    {t('policies.step1.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-600 leading-relaxed font-light">
                    {t('policies.step1.desc')}
                  </p>
                </div>
              </div>

              {/* Step 2: Payment Deposit */}
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm text-ocean-600 h-fit">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-wider mb-1">
                    {t('policies.step2.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-600 leading-relaxed font-light">
                    {t('policies.step2.desc')}
                  </p>
                </div>
              </div>

              {/* Step 3: Check-in Check-out times */}
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm text-ocean-600 h-fit">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-wider mb-1">
                    {t('policies.step3.title')}
                  </h4>
                  <p className="font-serif text-xs text-slate-600 leading-relaxed font-light">
                    {t('policies.step3.desc')}
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
