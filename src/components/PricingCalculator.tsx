import { useState, useEffect, MouseEvent } from 'react';
import { Calendar, Users, HelpCircle, Receipt, ArrowRight, Percent, CheckCircle2, Gift, Bed, Sparkles, Check, User, Mail, MessageSquare, Copy } from 'lucide-react';
import { StayCalculation } from '../types';
import { useLanguage } from '../LanguageContext';
import { UI_TRANSLATIONS } from '../translations';

export default function PricingCalculator() {
  const { t, language } = useLanguage();

  // Input states
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState(4); // Adults count
  const [childrenCount, setChildrenCount] = useState(0); // Children count
  const [extraBeds, setExtraBeds] = useState(0);
  const [guestType, setGuestType] = useState<'domestic' | 'international' | null>(null);
  const [name, setName] = useState('');

  // Computed state
  const [calculation, setCalculation] = useState<StayCalculation | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!calculation) return;
    
    // Copy booking message to clipboard as an absolute foolproof fallback
    navigator.clipboard.writeText(calculation.whatsappMessage).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 8000);
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  };

  // Sync extra beds & capacity boundaries automatically
  useEffect(() => {
    if (!guestType) return;
    if (guestType === 'domestic') {
      if (guests > 8) setGuests(8);
      const extraAdults = guests > 6 ? guests - 6 : 0;
      const extraChildren = (guests >= 6 && childrenCount > 2) ? childrenCount - 2 : 0;
      setExtraBeds(extraAdults + extraChildren);
    } else {
      if (guests > 6) setGuests(6);
      const extraAdults = guests > 4 ? guests - 4 : 0;
      const extraChildren = childrenCount > 2 ? childrenCount - 2 : 0;
      setExtraBeds(extraAdults + extraChildren);
    }
  }, [guestType, guests, childrenCount]);

  // Handle guest changes manually
  const handleGuestsChange = (val: number) => {
    setGuests(val);
  };

  useEffect(() => {
    if (!guestType) {
      setCalculation(null);
      return;
    }
    // Calculate nights
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    let nights = 1;

    if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
      const diffTime = date2.getTime() - date1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nights = diffDays > 0 ? diffDays : 1;
    }

    // Rates config & calculation
    let baseRate = 1200000;
    let extraBedPrice = 0;
    let isSoloCouplePromo = false;
    let discountPercent = 0;
    let discountAmount = 0;
    let freeNightsApplied = 0;
    let freeNightsDiscountAmount = 0;
    let appliedPromoTitle = '';

    // Helper to get translation for WhatsApp message specifically
    const waLang = guestType === 'domestic' ? 'id' : 'en';
    const getWaTranslation = (key: string) => {
      const langDict = UI_TRANSLATIONS[waLang] || UI_TRANSLATIONS['en'];
      return (langDict as Record<string, string>)[key] || key;
    };

    if (guestType === 'domestic') {
      // DOMESTIC (WNI) RATES:
      // Base Rate: 1,200,000 IDR (Max 6 Guests)
      // Solo/Couple Promo: 1,000,000 IDR (Max 2 Guests, stays >= 2 nights, no children)
      isSoloCouplePromo = guests <= 2 && childrenCount === 0 && nights >= 2;
      baseRate = isSoloCouplePromo ? 1000000 : 1200000;
      
      // Extra beds required if guests > 6
      extraBedPrice = extraBeds * 150000 * nights;
      
      const basePrice = baseRate * nights;

      // Progressive rewards for domestic:
      // 7+ nights: stay 7 pay 6 (free nights)
      // 4-6 nights: 10% off
      // 2-3 nights: 5% off
      if (nights >= 7) {
        freeNightsApplied = Math.floor(nights / 7);
        freeNightsDiscountAmount = freeNightsApplied * baseRate;
      } else if (nights >= 4) {
        discountPercent = 10;
        discountAmount = Math.round(basePrice * 0.1);
      } else if (nights >= 2) {
        discountPercent = 5;
        discountAmount = Math.round(basePrice * 0.05);
      }

      appliedPromoTitle = isSoloCouplePromo 
        ? getWaTranslation('calc.promo.couple') 
        : nights >= 7 
        ? getWaTranslation('calc.promo.seven') 
        : nights >= 4 
        ? getWaTranslation('calc.promo.four') 
        : nights >= 2 
        ? getWaTranslation('calc.promo.two') 
        : getWaTranslation('calc.promo.none');

    } else {
      // INTERNATIONAL (WNA) RATES:
      // Base Rate: 1,350,000 IDR (Max 4 Adults, kids under 12 stay free)
      // Solo/Couple Promo: 1,000,000 IDR (Max 2 Guests, stays >= 4 nights, no children)
      isSoloCouplePromo = guests <= 2 && childrenCount === 0 && nights >= 4;
      baseRate = isSoloCouplePromo ? 1000000 : 1350000;

      // Extra persons/beds: charged at 300,000 IDR per person/bed per night
      // Includes extra adults (> 4) and extra children (> 2)
      extraBedPrice = extraBeds * 300000 * nights;

      const basePrice = baseRate * nights;

      // Promo for International:
      // - Stays of 14 nights or more: 5% discount + luxury pool access from 15:00
      if (nights >= 14) {
        discountPercent = 5;
        discountAmount = Math.round(basePrice * 0.05);
        appliedPromoTitle = language === 'en' ? '14-Night Stay Promo (5% Off + Sumatra Luxury Pool Access)' : language === 'zh' ? '14晚长住特惠 (九五折 + 楠榜豪华泳池)' : 'Promo 14 Malam (Diskon 5% + Akses Kolam Renang Sumatra)';
      } else if (isSoloCouplePromo) {
        appliedPromoTitle = language === 'en' ? 'Solo/Couple Promo (Entire Villa for Rp 1,000,000 / night)' : language === 'zh' ? '专属双人特惠 (整栋别墅 1,000,000 / 晚)' : 'Promo Solo/Couple (Seluruh Villa Rp 1,000,000 / malam)';
      } else {
        appliedPromoTitle = getWaTranslation('calc.promo.none');
      }
    }

    const basePrice = baseRate * nights;
    const subtotal = basePrice + extraBedPrice;
    const totalPrice = subtotal - discountAmount - freeNightsDiscountAmount;

    // Format dates for display
    const formatDateByLang = (dateStr: string, lang: string) => {
      try {
        const d = new Date(dateStr);
        const locale = lang === 'en' ? 'en-US' : 'id-ID';
        return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
        return dateStr;
      }
    };

    // 4. Draft WhatsApp message
    const waCheckIn = formatDateByLang(checkIn, waLang);
    const waCheckOut = formatDateByLang(checkOut, waLang);
    const formattedTotal = totalPrice.toLocaleString(waLang === 'en' ? 'en-US' : 'id-ID');
    const waGuestType = guestType === 'domestic' ? 'Indonesia (WNI)' : 'International (WNA)';

    let whatsappMessage = '';
    if (waLang === 'id') {
      const coupleText = isSoloCouplePromo ? ' (Promo Solo/Couple Aktif)' : '';
      let bonusText = '';
      if (nights >= 7) {
        bonusText = '\n🎁 BONUS: Gratis 1 Malam + Housekeeping + Akses Kolam Renang Mewah Sumatra';
      } else if (nights >= 4) {
        bonusText = '\n🎁 BONUS: Housekeeping tiap 2 hari + Akses Kolam Renang Mewah Sumatra (15:00)';
      } else if (discountPercent > 0) {
        bonusText = `\n🎁 BONUS: Diskon ${discountPercent}% Aktif`;
      }

      let childrenText = '';
      if (childrenCount > 0) {
        if (guests >= 6 && childrenCount > 2) {
          childrenText = `\n• Anak-Anak (di bawah 12 tahun): ${childrenCount} Anak (2 Gratis, ${childrenCount - 2} dikenakan biaya Kasur Tambahan)`;
        } else {
          childrenText = `\n• Anak-Anak (di bawah 12 tahun): ${childrenCount} Anak (GRATIS)`;
        }
      }

      let guestInfo = '';
      if (name) {
        guestInfo = `\n• Rincian Kontak:\n  - Nama: ${name}`;
      }

      whatsappMessage = `Halo Tia, saya ingin pesan villa Hamara Guest House di Krui. Berikut rincian rencana tinggal kami:${guestInfo}
• Kategori Tamu: ${waGuestType}
• Check-In: ${waCheckIn}
• Check-Out: ${waCheckOut}
• Durasi: ${nights} Malam
• Jumlah Tamu: ${guests} Dewasa${childrenText}${coupleText}
• Kasur Tambahan (Extra Bed): ${extraBeds} Kasur (Rp ${extraBedPrice.toLocaleString('id-ID')})
• Promo Aktif: ${appliedPromoTitle}${bonusText}
• Total Estimasi Biaya: Rp ${formattedTotal}

Mohon info ketersediaan tanggalnya ya. Terima kasih!`;
    } else {
      // English for International Guest
      const coupleText = isSoloCouplePromo ? ' (Solo/Couple Promo Active)' : '';
      let bonusText = '';
      if (nights >= 14) {
        bonusText = '\n🎁 BONUS: 5% Long-Stay Discount + Sumatra\'s best luxury pool access (15:00)';
      } else if (isSoloCouplePromo) {
        bonusText = '\n🎁 BONUS: Special Solo/Couple Rate of Rp 1,000,000/night applied';
      }

      let childrenText = '';
      if (childrenCount > 0) {
        if (childrenCount <= 2) {
          childrenText = `\n• Children (under 12): ${childrenCount} (Stay Free)`;
        } else {
          childrenText = `\n• Children (under 12): ${childrenCount} (2 Stay Free, ${childrenCount - 2} Charged as Extra Person)`;
        }
      }

      let guestInfo = '';
      if (name) {
        guestInfo = `\n• Contact Details:\n  - Name: ${name}`;
      }

      whatsappMessage = `Hello Tia, I would like to book Hamara Guest House in Krui. Here are our stay details:${guestInfo}
• Guest Category: ${waGuestType}
• Check-In: ${waCheckIn}
• Check-Out: ${waCheckOut}
• Duration: ${nights} Nights
• Number of Guests: ${guests} Adults${childrenText}${coupleText}
• Extra Bed(s) / Person(s): ${extraBeds} Bed(s) (Rp ${extraBedPrice.toLocaleString('en-US')})
• Active Promo: ${appliedPromoTitle}${bonusText}
• Total Estimated Cost: Rp ${formattedTotal}

Please let me know if these dates are available. Thank you!`;
    }

    setCalculation({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      guests,
      extraBeds,
      basePrice,
      extraBedPrice,
      subtotal,
      discountPercent,
      discountAmount,
      freeNightsApplied,
      freeNightsDiscountAmount,
      totalPrice,
      appliedPromoTitle,
      whatsappMessage,
      guestType,
      isSoloCouplePromo,
    });
  }, [checkIn, checkOut, guests, extraBeds, language, guestType, childrenCount, name]);

  const formatIDR = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const isFormValid = name.trim().length > 0;

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Tariffs, Promotions, Progressive Perks info */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-8 bg-gold-500" />
              <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
                {t('calc.accent')}
              </span>
            </div>

            {guestType === null ? (
              <>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
                  {language === 'zh' ? (
                    <>
                      专属别墅价格 &<br />
                      <span className="font-serif font-light text-slate-700 italic">定制尊享特惠</span>
                    </>
                  ) : language === 'en' ? (
                    <>
                      Exclusive Tariffs &<br />
                      <span className="font-serif font-light text-slate-700 italic">Tailored Promotions</span>
                    </>
                  ) : (
                    <>
                      Tarif Eksklusif Villa &<br />
                      <span className="font-serif font-light text-slate-700 italic">Promo & Keuntungan</span>
                    </>
                  )}
                </h2>

                <p className="font-serif text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                  {language === 'zh' 
                    ? '为了给您提供最合适的价格与专属长住礼遇，请在右侧选择您的来源地区。' 
                    : language === 'en' 
                    ? 'To provide you with the most accurate pricing, custom promotions, and tailored long-stay rewards, please select your country of origin.' 
                    : 'Untuk memberikan harga paling akurat, promo khusus, dan keuntungan menginap yang disesuaikan, silakan pilih negara asal Anda.'}
                </p>

                {/* A beautiful call-to-action placeholder prompting them to click */}
                <div className="bg-gold-50/60 p-8 rounded-3xl border border-dashed border-gold-200 text-center flex flex-col items-center justify-center py-10">
                  <div className="p-3.5 rounded-full bg-gold-100 text-gold-600 mb-4 shadow-sm">
                    <Users className="h-6 w-6 animate-pulse" />
                  </div>
                  <h4 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-wider mb-2">
                    {language === 'zh' ? '请选择来源地' : language === 'en' ? 'Select Country of Origin' : 'Pilih Negara Asal'}
                  </h4>
                  <p className="font-serif text-xs text-slate-500 leading-relaxed max-w-xs mb-6">
                    {language === 'zh' 
                      ? '点击下方按钮或右侧计算器顶部的选项卡，解锁您的专属别墅报价。' 
                      : language === 'en' 
                      ? 'Click the tabs below or at the top of the calculator on the right to view custom tariffs.' 
                      : 'Klik tab di bawah ini atau di bagian atas kalkulator sebelah kanan untuk melihat tarif khusus.'}
                  </p>

                  {/* Two beautiful big buttons (synchronized with the right column selector) */}
                  <div className="grid grid-cols-2 w-full gap-3 max-w-md mb-6">
                    <button
                      type="button"
                      id="left-select-domestic"
                      onClick={() => setGuestType('domestic')}
                      className="py-4 px-3 rounded-2xl text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 border border-gold-300/60 bg-white text-ocean-950 hover:bg-gold-50 hover:border-gold-400 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer group active:scale-95"
                    >
                      <span className="text-gold-600 text-lg mb-1 group-hover:scale-110 transition-transform">🇮🇩</span>
                      <span>{language === 'zh' ? '印尼本地居民 (WNI)' : language === 'en' ? 'Indonesian (WNI)' : 'Indonesia (WNI)'}</span>
                    </button>
                    <button
                      type="button"
                      id="left-select-international"
                      onClick={() => setGuestType('international')}
                      className="py-4 px-3 rounded-2xl text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 border border-gold-300/60 bg-white text-ocean-950 hover:bg-gold-50 hover:border-gold-400 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer group active:scale-95"
                    >
                      <span className="text-gold-600 text-lg mb-1 group-hover:scale-110 transition-transform">🌐</span>
                      <span>{language === 'zh' ? '国际游客 (WNA)' : language === 'en' ? 'International (WNA)' : 'Internasional (WNA)'}</span>
                    </button>
                  </div>
                  
                  {/* Subtle small help indicator */}
                  <div className="flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase text-gold-600">
                    <Sparkles className="h-3 w-3" />
                    <span>{language === 'zh' ? '两边将同步更新' : language === 'en' ? 'Synchronized View' : 'Tampilan Sinkron'}</span>
                  </div>
                </div>
              </>
            ) : guestType === 'domestic' ? (
              <>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
                  Tarif Eksklusif &<br />
                  <span className="font-serif font-light text-slate-700 italic">Progressive Rewards</span>
                </h2>

                <p className="font-serif text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                  {language === 'zh' 
                    ? '我们欢迎印尼本土旅客来到我们的海滨天堂。以下是我们在 Hamara Guest House 提供的具体价格、长住优惠 and 尊享预订服务。' 
                    : language === 'en' 
                    ? 'We welcome indonesian travelers to our beachfront paradise. Below are our specific tariffs, long-stay promotions, and premium booking services available at Hamara Guest House.' 
                    : 'Kami menyambut wisatawan Indonesia ke surga tepi pantai kami. Di bawah ini adalah tarif khusus kami, promosi masa inap jangka panjang, dan layanan pemesanan premium yang tersedia di Hamara Guest House.'}
                </p>

                {/* Highly Polished Left Column Category Toggle */}
                <div className="grid grid-cols-2 p-1.5 bg-sand-100/80 border border-sand-200/60 rounded-2xl gap-2 mb-8 max-w-md shadow-inner animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setGuestType('domestic')}
                    className="py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-sm"
                  >
                    <span>🇮🇩</span>
                    <span>{language === 'zh' ? '印尼本地居民 (WNI)' : language === 'en' ? 'Indonesian (WNI)' : 'Indonesia (WNI)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestType('international')}
                    className="py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  >
                    <span>🌐</span>
                    <span>{language === 'zh' ? '国际游客 (WNA)' : language === 'en' ? 'International (WNA)' : 'Internasional (WNA)'}</span>
                  </button>
                </div>

                {/* Standard Domestic Rates Breakdown */}
                <div className="space-y-4 mb-8 bg-white p-6 rounded-2xl border border-sand-100 shadow-sm animate-fade-in">
                  <h3 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-widest border-b border-slate-100 pb-3 mb-3">
                    {language === 'zh' ? '别墅基础价格 (WNI)' : language === 'en' ? 'Villa Base Rates (Domestic)' : 'Tarif Dasar Villa (WNI)'}
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="font-serif text-slate-600 font-light">
                        {language === 'zh' ? '整栋别墅租用 (限 6 人)' : language === 'en' ? 'Entire Villa Rent (Max 6 Guests)' : 'Sewa 1 Villa (Max 6 Orang)'}
                      </span>
                      <span className="text-[11px] font-sans text-gold-600 font-semibold mt-0.5">
                        ✓ {language === 'zh' ? '已应用印尼本地特惠' : language === 'en' ? 'Indonesian WNI Special Rate' : 'Tarif Khusus WNI Diterapkan'}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-ocean-950 bg-ocean-50 text-ocean-600 px-3 py-1 rounded-full text-xs">
                      {formatIDR(1200000)} / {language === 'zh' ? '晚' : language === 'en' ? 'Night' : 'Malam'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="font-serif text-slate-600 font-light">{language === 'zh' ? '额外加床费 (最多 2 张)' : language === 'en' ? 'Extra Bed (Max 2 Beds)' : 'Kasur Tambahan (Max 2 Extra Bed)'}</span>
                    <span className="font-sans font-semibold text-slate-700">
                      {formatIDR(150000)} / {language === 'zh' ? '张床 / 晚' : language === 'en' ? 'Bed / Night' : 'Kasur / Malam'}
                    </span>
                  </div>

                  <div className="text-[11px] font-sans text-green-600 font-semibold mt-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <span className="text-sm">👶</span> 
                      <span>
                        {language === 'zh' ? '儿童入住政策 (12岁以下):' : language === 'en' ? 'Children Policy (under 12 yrs):' : 'Aturan Anak-Anak (di bawah 12 tahun):'}
                      </span>
                    </div>
                    <div className="pl-5 font-normal text-slate-500 space-y-0.5 text-[10.5px]">
                      <div>
                        {language === 'zh' ? '• 若成人少于 6 人:' : language === 'en' ? '• With fewer than 6 adults:' : '• Jika dewasa kurang dari 6 orang:'}{' '}
                        <strong className="text-green-600 font-bold">{language === 'zh' ? '儿童免费' : language === 'en' ? 'Children stay FREE' : 'Anak-anak GRATIS'}</strong>
                      </div>
                      <div>
                        {language === 'zh' ? '• 达到 6 名成人时:' : language === 'en' ? '• Once there are 6 adults:' : '• Jika ada 6 dewasa:'}{' '}
                        <span className="text-slate-500">
                          {language === 'zh' ? '前 2 名儿童免费，超出的人数按加床费收取' : language === 'en' ? 'Up to 2 children stay FREE, any extra child is an extra bed charge' : '2 anak pertama GRATIS, anak berikutnya dikenakan biaya kasur tambahan'}
                        </span>{' '}
                        <strong className="text-amber-600 font-semibold">({formatIDR(150000)}/{language === 'zh' ? '晚' : language === 'en' ? 'night' : 'malam'})</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start text-sm pt-3 border-t border-dashed border-slate-100">
                    <div>
                      <span className="block font-sans font-bold text-xs text-gold-600 uppercase">{t('calc.couple') || 'Promo Solo/Couple'}</span>
                      <span className="font-serif text-xs text-slate-500 font-light">{language === 'zh' ? '入住 ≥ 2 晚 (最多限 2 人，无儿童)' : language === 'en' ? 'Stay ≥ 2 nights (Max 2 Guests, no children)' : 'Tinggal ≥ 2 malam (Max 2 Orang, tanpa anak-anak)'}</span>
                    </div>
                    <span className="font-sans font-bold text-gold-700 bg-gold-50 px-3 py-1 rounded-full text-xs">
                      {language === 'zh' ? '专属特惠' : language === 'en' ? 'Special Discount' : 'Diskon Khusus'}: {formatIDR(1000000)} / {language === 'zh' ? '晚' : language === 'en' ? 'Night' : 'Malam'}
                    </span>
                  </div>
                </div>

                {/* Progressive Rewards Checklist for Domestic */}
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-widest mb-3">
                    {language === 'zh' ? '多住多惠专享特权' : language === 'en' ? 'Long-Stay Benefits' : 'Keuntungan Menginap Lebih Lama'}
                  </h3>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1">
                      <Percent className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-ocean-950">
                        {language === 'zh' ? '入住 2 晚：享九五折优惠' : language === 'en' ? 'Stay 2 Nights: 5% Discount' : 'Menginap 2 Malam: Diskon 5%'}
                      </h4>
                      <p className="font-serif text-xs text-slate-500 font-light leading-relaxed">
                        {language === 'zh' ? '系统自动为您的整栋别墅基础房费提供 5% 的折扣减免。' : language === 'en' ? 'Automatic 5% off the base villa rental price.' : 'Potongan harga otomatis 5% untuk seluruh tagihan sewa dasar villa Anda.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-ocean-950">
                        {language === 'zh' ? '入住 4 晚：九折优惠 + 星级泳池体验' : language === 'en' ? 'Stay 4 Nights: 10% Off + Luxury Pool Access' : 'Menginap 4 Malam: Diskon 10% + Kolam Renang Sumatra'}
                      </h4>
                      <p className="font-serif text-xs text-slate-500 font-light leading-relaxed">
                        {language === 'zh' ? '享受 10% 房价减免、每 2 天一次的免费客房清洁，以及下午 3 点后免费享用附近仅数步之遥的楠榜地区顶级星级奢华泳池。' : language === 'en' ? 'Enjoy 10% off, free housekeeping every 2 days, and exclusive 3 PM access to Sumatra\'s finest luxury swimming pool located just steps away.' : 'Potongan 10%, layanan housekeeping gratis setiap 2 hari sekali, serta akses eksklusif mulai pukul 15:00 ke kolam renang termewah se-Sumatra yang berlokasi sangat dekat.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-gold-100 text-gold-600 mt-1">
                      <Gift className="h-3.5 w-3.5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-gold-700">
                        {language === 'zh' ? '入住 7 晚：住 6 付 1，免首晚房费！' : language === 'en' ? 'Stay 7 Nights: Pay 6, Get 1 Night FREE!' : 'Menginap 7 Malam: Bayar 6, Gratis 1 Malam!'}
                      </h4>
                      <p className="font-serif text-xs text-slate-500 font-light leading-relaxed">
                        {language === 'zh' ? '赠送一整晚免费入住。包含每 2 天一次的免费客房清洁，以及每日尊享楠榜星级奢华泳池特权。' : language === 'en' ? 'Get one completely FREE night, complimentary housekeeping every 2 days, and daily free access to the luxury pool.' : 'Bonus 1 malam sepenuhnya GRATIS. Lengkap dengan housekeeping 2 hari sekali dan akses harian gratis ke Sumatra Luxury Pool.'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
                  International Tariffs &<br />
                  <span className="font-serif font-light text-slate-700 italic">Exclusive Promos</span>
                </h2>

                <p className="font-serif text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                  We welcome international travelers to our beachfront paradise. Below are our specific international tariffs, long-stay promotions, and premium booking services available at Hamara Guest House.
                </p>

                {/* Highly Polished Left Column Category Toggle */}
                <div className="grid grid-cols-2 p-1.5 bg-sand-100/80 border border-sand-200/60 rounded-2xl gap-2 mb-8 max-w-md shadow-inner animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setGuestType('domestic')}
                    className="py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  >
                    <span>🇮🇩</span>
                    <span>{language === 'zh' ? '印尼本地居民 (WNI)' : language === 'en' ? 'Indonesian (WNI)' : 'Indonesia (WNI)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestType('international')}
                    className="py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-sm"
                  >
                    <span>🌐</span>
                    <span>{language === 'zh' ? '国际游客 (WNA)' : language === 'en' ? 'International (WNA)' : 'Internasional (WNA)'}</span>
                  </button>
                </div>

                {/* Standard International Rates Breakdown */}
                <div className="space-y-4 mb-8 bg-white p-6 rounded-2xl border border-sand-100 shadow-sm animate-fade-in">
                  <h3 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-widest border-b border-slate-100 pb-3 mb-3">
                    Villa Cost & Booking Rules
                  </h3>
                  
                  <div className="flex justify-between items-start text-sm">
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-slate-800">
                        Entire Villa Base Rate
                      </span>
                      <span className="text-xs font-serif text-slate-500 font-light mt-0.5">
                        Covers up to 4 Adults.
                      </span>
                      <div className="text-[11px] font-sans text-green-600 font-semibold mt-2.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-800">
                          <span className="text-sm">👶</span> 
                          <span>
                            {language === 'zh' ? '儿童入住政策 (12岁以下):' : language === 'en' ? 'Children Policy (under 12 yrs):' : 'Aturan Anak-Anak (di bawah 12 tahun):'}
                          </span>
                        </div>
                        <div className="pl-5 font-normal text-slate-500 space-y-0.5 text-[10.5px]">
                          <div>
                            {language === 'zh' ? '• 第 1 位儿童:' : language === 'en' ? '• Child 1:' : '• Anak ke-1:'}{' '}
                            <strong className="text-green-600 font-bold">{language === 'zh' ? '免费' : language === 'en' ? 'FREE' : 'GRATIS'}</strong>
                          </div>
                          <div>
                            {language === 'zh' ? '• 第 2 位儿童:' : language === 'en' ? '• Child 2:' : '• Anak ke-2:'}{' '}
                            <strong className="text-green-600 font-bold">{language === 'zh' ? '免费' : language === 'en' ? 'FREE' : 'GRATIS'}</strong>
                          </div>
                          <div>
                            {language === 'zh' ? '• 第 3 位儿童:' : language === 'en' ? '• Child 3:' : '• Anak ke-3:'}{' '}
                            <strong className="text-amber-600 font-semibold">{formatIDR(300000)}/{language === 'zh' ? '晚' : language === 'en' ? 'night' : 'malam'}</strong>{' '}
                            <span className="text-slate-400">({language === 'zh' ? '加床费' : language === 'en' ? 'extra bed charge' : 'biaya kasur tambahan'})</span>
                          </div>
                          <div>
                            {language === 'zh' ? '• 第 4 位儿童:' : language === 'en' ? '• Child 4:' : '• Anak ke-4:'}{' '}
                            <strong className="text-amber-600 font-semibold">{formatIDR(300000)}/{language === 'zh' ? '晚' : language === 'en' ? 'night' : 'malam'}</strong>{' '}
                            <span className="text-slate-400">({language === 'zh' ? '加床费' : language === 'en' ? 'extra bed charge' : 'biaya kasur tambahan'})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-ocean-950 bg-ocean-50 text-ocean-600 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                      {formatIDR(1350000)} / Night
                    </span>
                  </div>

                  <div className="flex justify-between items-start text-sm pt-3 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="font-sans font-semibold text-slate-800">Extra Persons or Beds</span>
                      <span className="text-xs font-serif text-slate-500 font-light mt-0.5">Max 2 extra beds/persons allowed.</span>
                    </div>
                    <span className="font-sans font-bold text-slate-700 whitespace-nowrap">
                      {formatIDR(300000)} / Guest / Night
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gold-50/50 border border-gold-100/50 space-y-3">
                    <h4 className="font-sans font-bold text-xs text-gold-800 uppercase tracking-wider">
                      Exclusive International Promos
                    </h4>
                    
                    <div className="flex gap-2 text-xs">
                      <div className="text-gold-600 font-bold">1.</div>
                      <div>
                        <strong className="text-slate-800">Solo / Couple Rate:</strong> Stay <strong className="text-gold-700">4 nights or longer</strong> with 1-2 guests and <strong className="text-gold-700">no children</strong>, and rent the entire villa for just <strong className="text-gold-700">{formatIDR(1000000)}/night</strong>.
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs border-t border-gold-100/50 pt-2">
                      <div className="text-gold-600 font-bold">2.</div>
                      <div>
                        <strong className="text-slate-800">14-Night Stay Promo:</strong> Enjoy an automatic <strong className="text-gold-700">5% discount</strong> and exclusive access to Sumatra's finest luxury swimming pool just steps away (from 15:00).
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info block for Extras (Redirects to dashboard below) */}
                <div className="bg-sand-50/50 p-6 rounded-2xl border border-sand-100 text-xs text-slate-600 animate-fade-in">
                  <h4 className="font-sans font-bold uppercase text-slate-800 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-gold-500" />
                    <span>Layanan Tambahan / Extras</span>
                  </h4>
                  <p className="font-serif leading-relaxed mb-3">
                    Looking to order private transport, home-cooked fresh meals, or premium local bakery/provisions?
                  </p>
                  <a
                    href="#extras"
                    className="inline-flex items-center gap-1 text-gold-600 font-sans font-bold hover:text-gold-700 transition-colors"
                  >
                    <span>Go to Extras Booking Dashboard</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Live Interactive Booking Calculator */}
          <div className="lg:col-span-7">
            <div className="bg-ocean-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-xl pointer-events-none" />

              <h3 className="font-sans font-bold text-lg sm:text-xl text-sand-50 mb-1 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-champagne" />
                <span>{t('calc.title')}</span>
              </h3>
              <p className="font-serif text-xs text-sand-200/80 font-light mb-6">
                {t('calc.sub')}
              </p>

              {/* GUEST CATEGORY SELECTOR (DOMESTIC VS INTERNATIONAL) */}
              <div className="mb-6">
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-2">
                  {language === 'zh' ? '宾客类别 (专属价格选单)' : language === 'en' ? 'Guest Category (Special Rate Menu)' : 'Kategori Tamu (Menu Harga Khusus)'}
                </label>
                <div className="grid grid-cols-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestType('domestic')}
                    className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center ${
                      guestType === 'domestic'
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md scale-[1.01]'
                        : 'text-sand-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{language === 'zh' ? '印尼本地居民 (WNI)' : language === 'en' ? 'Indonesian (WNI)' : 'Indonesia (WNI)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestType('international')}
                    className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center ${
                      guestType === 'international'
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md scale-[1.01]'
                        : 'text-sand-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{language === 'zh' ? '国际游客 (WNA)' : language === 'en' ? 'International (WNA)' : 'Internasional (WNA)'}</span>
                  </button>
                </div>
              </div>

              {/* BOOKING CONTACT DETAILS (NAME) - PLACED ABOVE DATE SETTINGS */}
              {guestType && (
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4 animate-fade-in">
                  <div className="text-xs font-sans font-bold text-champagne uppercase tracking-wider border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{language === 'zh' ? '联系信息' : language === 'en' ? 'Contact Information' : 'Informasi Kontak'}</span>
                  </div>
                  <div className="grid grid-cols-1">
                    <div>
                      <label className="block font-sans text-[10px] font-semibold text-sand-200 uppercase tracking-widest mb-1.5">
                        {language === 'zh' ? '全名 *' : language === 'en' ? 'Full Name *' : 'Nama Lengkap *'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={language === 'zh' ? '请输入您的全名' : language === 'en' ? 'Your full name' : 'Nama lengkap Anda'}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-500 text-white placeholder-slate-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Check In Date */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-1.5">
                    {t('calc.checkin')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-500 text-white animate-fade-in"
                    />
                  </div>
                </div>

                {/* Check Out Date */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-1.5">
                    {t('calc.checkout')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-500 text-white animate-fade-in"
                    />
                  </div>
                </div>

                {/* Adults / Guests Selection */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-1.5">
                    {guestType === 'domestic' ? 'Jumlah Tamu (Dewasa)' : guestType === 'international' ? 'Number of Adults' : (language === 'zh' ? '成人人数' : language === 'en' ? 'Number of Adults' : 'Jumlah Tamu (Dewasa)')} ({guests})
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={guests}
                      onChange={(e) => handleGuestsChange(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-500 text-white appearance-none text-left"
                    >
                      {guestType === 'domestic' ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num} className="bg-ocean-950 text-white">
                            {num} Dewasa {num > 6 ? `(Butuh ${num - 6} Kasur Tambahan)` : ''}
                          </option>
                        ))
                      ) : guestType === 'international' ? (
                        [1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-ocean-950 text-white">
                            {num} Adults {num > 4 ? `(Requires Extra Bed)` : ''}
                          </option>
                        ))
                      ) : (
                        [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num} className="bg-ocean-950 text-white">
                            {num} {language === 'zh' ? '位成人' : language === 'en' ? 'Adults' : 'Dewasa'}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                {/* Children Count (Free for International, optional informational for Domestic) */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-1.5">
                    {guestType === 'domestic' ? 'Anak-Anak (< 12 tahun)' : 'Children (< 12 yrs)'} ({childrenCount})
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-500 text-white appearance-none"
                    >
                      {[0, 1, 2, 3, 4].map((num) => {
                        let label = '';
                        if (guestType === 'domestic') {
                          if (guests >= 6) {
                            if (num === 0) {
                              label = language === 'zh' ? '无儿童' : language === 'en' ? 'No Children' : 'Tanpa Anak-Anak';
                            } else if (num === 1) {
                              label = language === 'zh' ? '1 名儿童 (免费)' : language === 'en' ? 'Child 1 (FREE)' : '1 Anak (GRATIS)';
                            } else if (num === 2) {
                              label = language === 'zh' ? '2 名儿童 (免费)' : language === 'en' ? 'Child 2 (FREE)' : '2 Anak (GRATIS)';
                            } else if (num === 3) {
                              label = language === 'zh' ? '3 名儿童 (第3位需加床费)' : language === 'en' ? 'Child 3 (Extra Bed Charge)' : '3 Anak (Anak ke-3 kena biaya kasur tambahan)';
                            } else if (num === 4) {
                              label = language === 'zh' ? '4 名儿童 (第3和第4位需加床费)' : language === 'en' ? 'Child 4 (Extra Bed Charge)' : '4 Anak (Anak ke-3 & ke-4 kena biaya kasur tambahan)';
                            }
                          } else {
                            label = `${num} ${language === 'zh' ? '名儿童' : language === 'en' ? 'Children' : 'Anak-Anak'}`;
                          }
                        } else {
                          if (num === 0) {
                            label = language === 'zh' ? '无儿童' : language === 'en' ? 'No Children' : 'Tanpa Anak-Anak';
                          } else if (num === 1) {
                            label = language === 'zh' ? '1 名儿童 (免费)' : language === 'en' ? 'Child 1 (FREE)' : '1 Anak (GRATIS)';
                          } else if (num === 2) {
                            label = language === 'zh' ? '2 名儿童 (免费)' : language === 'en' ? 'Child 2 (FREE)' : '2 Anak (GRATIS)';
                          } else if (num === 3) {
                            label = language === 'zh' ? '3 名儿童 (第3位需加床费)' : language === 'en' ? 'Child 3 (Extra Bed Charge)' : '3 Anak (Anak ke-3 kena biaya kasur tambahan)';
                          } else if (num === 4) {
                            label = language === 'zh' ? '4 名儿童 (第3和第4位需加床费)' : language === 'en' ? 'Child 4 (Extra Bed Charge)' : '4 Anak (Anak ke-3 & ke-4 kena biaya kasur tambahan)';
                          }
                        }
                        return (
                          <option key={num} value={num} className="bg-ocean-950 text-white">
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* LIVE BILLING BREAKDOWN */}
              {calculation ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                  <h4 className="font-sans font-bold text-xs tracking-wider text-champagne uppercase mb-4 border-b border-white/5 pb-2">
                    {language === 'zh' ? '计费明细' : language === 'en' ? 'Billing Breakdown' : 'Rincian Biaya'} ({calculation.nights} {t('calc.nights')})
                  </h4>

                  <div className="space-y-2.5 text-sm font-serif">
                    {/* Base Rate */}
                    <div className="flex justify-between font-light text-sand-100">
                      <span>
                        {language === 'zh' ? '别墅基础房费' : language === 'en' ? 'Villa Base Rate' : 'Sewa Dasar Villa'} ({calculation.isSoloCouplePromo ? t('calc.promo.couple') : (language === 'zh' ? '标准价格' : language === 'en' ? 'Standard Rate' : 'Tarif Standar')})
                      </span>
                      <span className="font-sans">
                        {formatIDR(calculation.basePrice / calculation.nights)} x {calculation.nights}{language === 'zh' ? '晚' : language === 'en' ? 'n' : 'm'}
                      </span>
                    </div>

                    {guests <= 2 && childrenCount > 0 && ((guestType === 'domestic' && calculation.nights >= 2) || (guestType === 'international' && calculation.nights >= 4)) && (
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/90 rounded-xl p-3 text-xs font-sans mt-2 leading-relaxed animate-fade-in">
                        {language === 'zh' 
                          ? '⚠️ 独享/双人特惠不适用，因为您带了儿童入住。价格已恢复至标准房价（120万/晚），并且所有长住折扣都基于标准价格计算。' 
                          : language === 'en' 
                          ? '⚠️ Solo/Couple Promo is not active because children are staying. The price is reverted to standard (Rp 1.2M/night), and any stay discounts are calculated from the standard rate.' 
                          : '⚠️ Promo Solo/Couple tidak berlaku karena Anda membawa anak-anak. Harga dikembalikan ke tarif standar (Rp 1,2 Juta/malam), dan diskon menginap didasarkan pada tarif standar.'}
                      </div>
                    )}

                    {/* Extra Bed Cost if any */}
                    {calculation.extraBeds > 0 && (
                      <div className="flex justify-between font-light text-sand-100">
                        <span>
                          {guestType === 'domestic' ? 'Kasur Tambahan' : 'Extra Person(s) / Bed(s)'} ({calculation.extraBeds})
                        </span>
                        <span className="font-sans">
                          {formatIDR(calculation.extraBedPrice)}
                        </span>
                      </div>
                    )}

                    {/* Subtotal */}
                    <div className="flex justify-between text-xs text-slate-400 font-sans border-t border-white/5 pt-2 mt-1">
                      <span>{t('calc.summary.subtotal').toUpperCase()}</span>
                      <span>{formatIDR(calculation.subtotal)}</span>
                    </div>

                    {/* Active Promo Rewards */}
                    {calculation.discountAmount > 0 && (
                      <div className="flex justify-between text-green-400 font-medium">
                        <span>{t('calc.summary.discount')} ({calculation.discountPercent}%)</span>
                        <span className="font-sans">-{formatIDR(calculation.discountAmount)}</span>
                      </div>
                    )}

                    {calculation.freeNightsApplied > 0 && (
                      <div className="flex justify-between text-green-400 font-medium">
                        <span>{t('calc.summary.free')} ({calculation.freeNightsApplied} {t('calc.nights')})</span>
                        <span className="font-sans">-{formatIDR(calculation.freeNightsDiscountAmount)}</span>
                      </div>
                    )}

                    {/* Final Price Block */}
                    <div className="flex justify-between items-center text-white font-bold border-t border-white/10 pt-3 mt-3">
                      <span className="font-sans text-sm tracking-wide">{t('calc.summary.total').toUpperCase()}</span>
                      <span className="font-sans text-xl text-gold-500">
                        {formatIDR(calculation.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Banner / Benefits alert */}
                  <div className="mt-4 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs flex items-center gap-2.5">
                    <span className="text-lg">🌴</span>
                    <div className="font-serif text-sand-100 font-light">
                      <span className="font-sans font-bold text-gold-500 block">
                        {calculation.appliedPromoTitle}
                      </span>
                      {guestType === 'international' ? (
                        calculation.nights >= 14 ? (
                          <span>Includes 5% Long-Stay discount + Sumatra's finest luxury swimming pool access (15:00)</span>
                        ) : (
                          <span>Enjoy pure luxury and breathtaking surf scenery at Benawang Beach, Krui.</span>
                        )
                      ) : (
                        calculation.nights >= 4 ? (
                          <span>
                            {language === 'zh' 
                              ? '含免费客房清洁 + 楠榜最顶级星级奢华泳池入场特权 (15:00)' 
                              : language === 'en' 
                              ? 'Includes complimentary housekeeping + Access to Sumatra\'s best luxury pool (15:00)' 
                              : 'Termasuk Housekeeping gratis + Akses Kolam Renang Mewah Sumatra (15:00)'}
                          </span>
                        ) : (
                          <span>
                            {language === 'zh'
                              ? '在克鲁伊的 Benawang 沙滩尽享纯粹的奢华与自然之美。'
                              : language === 'en'
                              ? 'Enjoy pure luxury and breathtaking scenery at Benawang Beach, Krui.'
                              : 'Nikmati kemewahan dan keindahan murni di Pantai Benawang Krui.'}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 mb-6 text-center">
                  <p className="font-serif text-xs text-sand-200/60 leading-relaxed font-light">
                    {language === 'zh' 
                      ? '请在上方选择您的来源地区（宾客类别），以查看对应的专属价格明细。' 
                      : language === 'en' 
                      ? 'Please select your origin above (Indonesian WNI or International WNA) to view your custom pricing breakdown.' 
                      : 'Silakan pilih kategori tamu di atas (Indonesia WNI atau Internasional WNA) untuk melihat rincian biaya khusus Anda.'}
                  </p>
                </div>
              )}

              {/* BOOK BUTTON */}
              {calculation ? (
                <div className="space-y-4">
                  {!isFormValid ? (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/90 rounded-xl p-3.5 text-center text-xs font-sans">
                      <span>
                        ⚠️ {language === 'zh' ? '请在上方输入您的姓名以解锁预订选项。' : language === 'en' ? 'Please enter your Full Name above to unlock the booking options.' : 'Silakan masukkan Nama Lengkap Anda di atas untuk membuka pilihan pemesanan.'}
                      </span>
                    </div>
                  ) : null}

                  {/* WhatsApp send button */}
                  <div className={`transition-opacity duration-300 ${!isFormValid ? 'opacity-50 pointer-events-none' : ''}`}>
                    <a
                      href={`https://wa.me/6282177671110?text=${encodeURIComponent(calculation.whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-sans font-bold text-[11px] tracking-wider uppercase shadow-md hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>
                        {language === 'zh' 
                          ? '在 WHATSAPP 上向 TIA 发送预订申请' 
                          : language === 'en' 
                          ? 'PLEASE SEND BOOKING REQUEST TO TIA ON WHATSAPP' 
                          : 'KIRIM PERMINTAAN PEMESANAN KE TIA LEWAT WHATSAPP'}
                      </span>
                    </a>
                  </div>

                  {/* Email send button */}
                  <div className={`transition-opacity duration-300 ${!isFormValid ? 'opacity-50 pointer-events-none' : ''}`}>
                    <a
                      href={`mailto:kruipugung.guesthouse@gmail.com?subject=${encodeURIComponent('Booking Request - Hamara Guest House')}&body=${encodeURIComponent(calculation.whatsappMessage)}`}
                      onClick={handleEmailClick}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-ocean-950 font-sans font-bold text-[11px] tracking-wider uppercase shadow-md hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                    >
                      <Mail className="h-4 w-4" />
                      <span>
                        {language === 'zh' 
                          ? '通过电子邮件向 TIA 发送预订申请' 
                          : language === 'en' 
                          ? 'PLEASE SEND BOOKING REQUEST TO TIA VIA EMAIL' 
                          : 'KIRIM PERMINTAAN PEMESANAN KE TIA LEWAT EMAIL'}
                      </span>
                    </a>

                    {/* Copy notification & manual backup helper */}
                    {copiedEmail && (
                      <div className="mt-3 p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs rounded-xl animate-fade-in font-sans leading-relaxed text-center shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-1.5 font-bold text-emerald-300">
                          <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
                          <span>
                            {language === 'zh' ? '预订详情已复制！' : language === 'en' ? 'Booking details copied!' : 'Detail booking disalin!'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {language === 'zh' 
                            ? '如果您设备上的邮件客户端没有自动打开，请直接给 kruipugung.guesthouse@gmail.com 发送邮件并将刚才复制的详情粘贴在正文里。' 
                            : language === 'en' 
                            ? 'If your email app did not open automatically, please send a message directly to kruipugung.guesthouse@gmail.com and paste the copied details.' 
                            : 'Jika aplikasi email Anda tidak terbuka otomatis, silakan kirim email langsung ke kruipugung.guesthouse@gmail.com dan tempel (paste) rincian booking.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-sans font-bold text-sm tracking-widest uppercase cursor-not-allowed transition-all duration-300"
                >
                  <span>{t('calc.button.reserve') || 'RESERVE VIA WHATSAPP'}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </button>
              )}

              <p className="text-center font-serif text-[10px] text-slate-400 mt-3 font-light">
                {language === 'zh' 
                  ? '*预订流程将直接发送并安全联络别墅经理 Tia 电话：0821-7767-1110。' 
                  : language === 'en' 
                  ? '*Bookings are guaranteed to connect directly with Tia (Hamara Guest House Manager) at 0821-7767-1110.' 
                  : '*Booking dijamin langsung terhubung dengan Tia (Pengelola Hamara Guest House) di 0821-7767-1110.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
    }
