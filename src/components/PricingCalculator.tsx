import { useMemo, useState } from 'react';
import { CalendarDays, Users, Receipt, MessageSquare, Mail, BedDouble, Percent, CheckCircle2, Gift, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type GuestType = 'domestic' | 'international';

const formatIDR = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;

export default function PricingCalculator() {
  const { language } = useLanguage();
  const today = new Date();
  const todayStr = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState(4);
  const [childrenCount, setChildrenCount] = useState(0);
  const [extraBedsRequested, setExtraBedsRequested] = useState(0);
  const [guestType, setGuestType] = useState<GuestType | null>(null);
  const [name, setName] = useState('');

  const isEnglish = language === 'en';
  const isChinese = language === 'zh';
  const text = isEnglish ? {
    accent: 'Plan Your Stay', heading: 'Exclusive Tariffs &', subheading: 'Tailored Promotions', intro: 'Select your guest category to see the applicable villa rates and long-stay details.', select: 'Category', name: 'Guest Name', checkin: 'Check-in', checkout: 'Check-out', adults: 'Adults', kids: 'Children', requestedBeds: 'Extra Beds', nights: 'Nights', accommodation: 'Accommodation', adultBeds: 'Adult extra bed', childCharge: 'Additional child charge', total: 'Estimated Total', deposit: 'Deposit (30%)', balance: 'Remaining Balance', baseRate: 'Base rate', included: 'Included', max: 'Max capacity', extra: 'Extra bed', children: 'Children', childPolicy: 'Children up to 6 years stay free; older children are charged as adults.', invalid: 'Please select valid dates to calculate your estimate.', promoHeading: 'Special Domestic Offers', domesticRates: 'Domestic Rates', internationalRates: 'International Rates', oneNight: '1 night', twoToThirteen: '2 to 13 nights', fourteenToTwentyNine: '14 to 29 nights', thirtyPlus: '30+ nights', oneToThirteen: '1 to 13 nights', policy: 'Terms apply — rates may vary by season and availability.'
  } : isChinese ? {
    accent: '规划您的入住', heading: '别墅专属价格与', subheading: '长住优惠', intro: '请选择宾客类别，以查看适用的别墅价格和长住信息。', select: '类别', name: '姓名', checkin: '入住日期', checkout: '退房日期', adults: '成人', kids: '儿童', requestedBeds: '加床', nights: '晚数', accommodation: '住宿费', adultBeds: '成人加床', childCharge: '额外儿童费用', total: '预计总价', deposit: '订金（30%）', balance: '剩余尾款', baseRate: '基础房价', included: '含', max: '最多', extra: '加床', children: '儿童', childPolicy: '6岁以下儿童免费；较大儿童按成人收费。', invalid: '请选择有效日期以计算估算价。', promoHeading: '国内客专属优惠', domesticRates: '本地客价格', internationalRates: '国际客价格', oneNight: '1晚', twoToThirteen: '2至13晚', fourteenToTwentyNine: '14至29晚', thirtyPlus: '30晚以上', oneToThirteen: '1至13晚', policy: '价格与季节及房态有关，具体以确认为准。'
  } : {
    accent: 'Rencanakan Kunjungan Anda', heading: 'Tarif Eksklusif Villa &', subheading: 'Keuntungan Menginap', intro: 'Pilih kategori tamu untuk melihat informasi tarif villa dan harga menginap jangka panjang.', select: 'Kategori', name: 'Nama Tamu', checkin: 'Check-in', checkout: 'Check-out', adults: 'Dewasa', kids: 'Anak', requestedBeds: 'Extra Bed', nights: 'Malam', accommodation: 'Akomodasi', adultBeds: 'Extra bed dewasa', childCharge: 'Biaya anak tambahan', total: 'Estimasi Total', deposit: 'Deposit (30%)', balance: 'Sisa Pembayaran', baseRate: 'Tarif dasar', included: 'Termasuk', max: 'Maksimal', extra: 'Extra bed', children: 'Anak', childPolicy: 'Anak usia ≤6 tahun gratis; anak yang lebih besar dihitung sebagai dewasa.', invalid: 'Pilih tanggal yang valid untuk menghitung estimasi.', promoHeading: 'Penawaran Khusus Domestik', domesticRates: 'Tarif Domestik', internationalRates: 'Tarif Internasional', oneNight: '1 malam', twoToThirteen: '2 sampai 13 malam', fourteenToTwentyNine: '14 sampai 29 malam', thirtyPlus: '30+ malam', oneToThirteen: '1 sampai 13 malam', policy: 'Syarat berlaku — tarif dapat berubah tergantung musim dan ketersediaan.'
  };

  const nightCount = useMemo(() => {
    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
    return Number.isFinite(diff) && diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const category: GuestType = guestType ?? 'domestic';
  const standardAdults = category === 'international' ? 4 : 6;
  const maxAdults = standardAdults + 2;
  const bedRate = category === 'international' ? 250000 : 200000;
  const nightlyRate = category === 'international'
    ? nightCount >= 30 ? 1200000 : nightCount >= 14 ? 1300000 : 1350000
    : nightCount >= 30 ? 1100000 : nightCount >= 14 ? 1125000 : nightCount >= 2 ? 1150000 : 1200000;
  const adultExtraBeds = Math.min(2, Math.max(guests - standardAdults, extraBedsRequested));
  const extraChildren = Math.max(0, childrenCount - 2);
  const baseTotal = nightlyRate * nightCount;
  const adultBedTotal = adultExtraBeds * bedRate * nightCount;
  const childTotal = extraChildren * bedRate * nightCount;
  const total = baseTotal + adultBedTotal + childTotal;
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;
  const selectedBase = category === 'international' ? 1350000 : 1200000;
  const formatRate = (rate: number) => `${formatIDR(rate)} / ${isEnglish ? 'night' : isChinese ? '晚' : 'malam'}`;
  const waMessage = `Halo Tia, saya ingin memesan Hamara Guest House.\nNama: ${name}\nKategori: ${category === 'domestic' ? 'Indonesia (WNI)' : 'International (WNA)'}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nDurasi: ${nightCount} malam\nDewasa: ${guests}\nAnak usia ≤6 tahun: ${childrenCount}\nExtra bed dewasa: ${adultExtraBeds}\nTotal estimasi: ${formatIDR(total)}\nDeposit 30%: ${formatIDR(deposit)}\nSisa 70%: ${formatIDR(balance)}`;
  const waHref = `https://wa.me/628218555904?text=${encodeURIComponent(waMessage)}`;
  const emailHref = `mailto:Kruipugungexclusive@gmail.com?subject=${encodeURIComponent('Booking Hamara Guest House')}&body=${encodeURIComponent(waMessage)}`;

  const renderRates = (type: GuestType) => {
    const isDomestic = type === 'domestic';
    const extraRate = isDomestic ? 200000 : 250000;
    const tiers = isDomestic
      ? [[text.oneNight, 1200000], [text.twoToThirteen, 1150000], [text.fourteenToTwentyNine, 1125000], [text.thirtyPlus, 1100000]] as const
      : [[text.oneToThirteen, 1350000], [text.fourteenToTwentyNine, 1300000], [text.thirtyPlus, 1200000]] as const;
    return (
      <div className="space-y-4 mb-8 bg-white p-6 rounded-2xl border border-sand-100 shadow-sm animate-fade-in">
        <h3 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-widest border-b border-slate-100 pb-3 mb-3">
          {isDomestic ? text.domesticRates : text.internationalRates}
        </h3>
        <div className="flex justify-between items-start text-sm">
          <div className="flex flex-col">
            <span className="font-serif text-slate-600 font-light">{text.baseRate}</span>
            <span className="text-[11px] font-sans text-gold-600 font-semibold mt-0.5">{isDomestic ? '✓ ' + (isEnglish ? 'Indonesian WNI rate' : isChinese ? '印度尼西亚本地价格' : 'Tarif khusus WNI') : isEnglish ? 'International WNA rate' : isChinese ? '国际宾客价格' : 'Tarif khusus WNA'}</span>
          </div>
          <span className="font-sans font-bold text-ocean-950 bg-ocean-50 text-ocean-600 px-3 py-1 rounded-full text-xs whitespace-nowrap">{formatRate(selectedBase)}</span>
        </div>
        <div className="space-y-1 border-t border-slate-100 pt-3 text-sm">
          {tiers.map(([label, rate]) => <div key={label} className="flex justify-between gap-3 text-slate-600"><span className="font-serif">{label}</span><span className="font-sans font-semibold text-slate-700">{formatRate(rate)}</span></div>)}
        </div>
        <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
          <div className="font-sans font-semibold text-slate-800">{text.included}: {standardAdults} {isEnglish ? 'adults' : isChinese ? '位成人' : 'dewasa'}</div>
          <div className="font-sans font-semibold text-slate-800">{text.max}: {maxAdults} {isEnglish ? 'adults' : isChinese ? '位成人' : 'dewasa'}</div>
          <div className="font-serif text-slate-600">{text.extra}: <strong className="font-sans text-slate-700">{formatIDR(extraRate)} / {isEnglish ? 'bed / night' : isChinese ? '张床 / 晚' : 'kasur / malam'}</strong></div>
        </div>
        <div className="text-[11px] font-sans text-green-600 font-semibold border-t border-slate-100 pt-3 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-800"><span className="text-sm">👶</span><span>{text.children}:</span></div>
          <p className="pl-5 font-normal text-slate-500 leading-relaxed">{text.childPolicy}</p>
          <p className="pl-5 font-normal text-amber-700">{isDomestic ? formatIDR(200000) : formatIDR(250000)} / {isEnglish ? 'night per additional child' : isChinese ? '每名额外儿童/晚' : 'malam per anak tambahan'}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4"><div className="h-[2px] w-8 bg-gold-500" /><span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">{text.accent}</span></div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-2">{text.heading}<br /><span className="font-serif font-light text-slate-700 italic">{text.subheading}</span></h2>
            <p className="font-serif text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">{text.intro}</p>

            <div className="grid grid-cols-2 p-1.5 bg-sand-100/80 border border-sand-200/60 rounded-2xl gap-2 mb-6 max-w-md shadow-inner">
              <button type="button" onClick={() => { setGuestType('domestic'); setGuests(Math.min(guests, 8)); }} className={`py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wide transition-all ${guestType === 'domestic' ? 'bg-white text-ocean-950 shadow-sm' : 'text-slate-500 hover:text-ocean-800'}`}>
                {isEnglish ? 'Domestic (WNI)' : isChinese ? '本地客 (WNI)' : 'Domestik (WNI)'}
              </button>
              <button type="button" onClick={() => { setGuestType('international'); setGuests(Math.min(guests, 6)); }} className={`py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wide transition-all ${guestType === 'international' ? 'bg-white text-ocean-950 shadow-sm' : 'text-slate-500 hover:text-ocean-800'}`}>
                {isEnglish ? 'International (WNA)' : isChinese ? '国际客 (WNA)' : 'Internasional (WNA)'}
              </button>
            </div>

            {guestType ? <>
              {renderRates(guestType)}
              {guestType === 'domestic' ? <div className="space-y-4 animate-fade-in">
                <h3 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-widest mb-3">{text.promoHeading}</h3>
                <div className="flex items-start gap-3"><div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1"><Percent className="h-3.5 w-3.5" /></div><div><h4 className="font-sans font-semibold text-sm text-slate-800">Stay 6 nights or more</h4><p className="font-serif text-slate-600 text-sm leading-relaxed">Enjoy a preferred rate and a more flexible room allocation for longer stays.</p></div></div>
                <div className="flex items-start gap-3"><div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1"><CheckCircle2 className="h-3.5 w-3.5" /></div><div><h4 className="font-sans font-semibold text-sm text-slate-800">Free child policy</h4><p className="font-serif text-slate-600 text-sm leading-relaxed">Children under 6 years old stay free when sharing the room with adults.</p></div></div>
              </div> : <div className="bg-gold-50/50 p-5 rounded-2xl border border-gold-100/50 space-y-2 animate-fade-in"><h3 className="font-sans font-bold text-xs text-gold-800 uppercase tracking-widest">International perks</h3><p className="font-serif text-slate-600 text-sm leading-relaxed">Complimentary local recommendations and airport transfer assistance can be arranged upon request.</p></div>}
            </> : <div className="bg-gold-50/60 p-8 rounded-3xl border border-dashed border-gold-200 text-center"><div className="p-3.5 rounded-full bg-gold-100 text-gold-600 mb-4 shadow-sm inline-block"><Gift className="h-5 w-5" /></div><p className="font-serif text-slate-600 text-sm">Select a guest category to unlock premium villa rates and stay benefits.</p></div>}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-ocean-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-xl pointer-events-none" />
              <h3 className="font-sans font-bold text-lg sm:text-xl text-sand-50 mb-1 flex items-center gap-2"><Receipt className="h-5 w-5 text-champagne" /><span>{isEnglish ? 'Booking Enquiry, Pricing & Stay Summary' : isChinese ? '预订咨询、价格与入住概览' : 'Permintaan Booking, Harga & Ringkasan Menginap'}</span></h3>
              <p className="font-serif text-xs text-sand-200/80 font-light mb-6">{isEnglish ? 'Calculate your stay using the selected WNI or WNA rate.' : isChinese ? '根据所选WNI或WNA价格计算您的住宿费用。' : 'Hitung estimasi menginap berdasarkan tarif WNI atau WNA yang dipilih.'}</p>

              <div className="mb-6"><label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-2">{text.select}</label><div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setGuestType('domestic'); setGuests(Math.min(guests, 8)); }} className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all ${guestType === 'domestic' ? 'bg-white text-ocean-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'}`}>
                  {isEnglish ? 'WNI' : isChinese ? '本地客' : 'WNI'}
                </button>
                <button type="button" onClick={() => { setGuestType('international'); setGuests(Math.min(guests, 6)); }} className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all ${guestType === 'international' ? 'bg-white text-ocean-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'}`}>
                  {isEnglish ? 'WNA' : isChinese ? '国际客' : 'WNA'}
                </button>
              </div></div>

              <div className="mb-6"><label className="block font-sans text-[10px] font-semibold text-sand-200 uppercase tracking-widest mb-1.5">{text.name} *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder={isEnglish ? 'Your name' : isChinese ? '您的姓名' : 'Nama Anda'} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.checkin}<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-300" /><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.checkout}<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-300" /><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.adults}<span className="relative mt-1.5 block"><Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-300" /><input type="number" min={1} value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.kids} ({childrenCount})<span className="relative mt-1.5 block"><Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-300" /><input type="number" min={0} value={childrenCount} onChange={(e) => setChildrenCount(Math.max(0, Number(e.target.value) || 0))} className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.requestedBeds}<span className="relative mt-1.5 block"><BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-300" /><input type="number" min={0} max={2} value={extraBedsRequested} onChange={(e) => setExtraBedsRequested(Math.min(2, Math.max(0, Number(e.target.value) || 0)))} className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400" /></span></label>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-2.5 text-sm font-serif">
                {nightCount > 0 ? <>
                  <div className="flex justify-between text-sand-100"><span>{text.nights}</span><span>{nightCount}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{text.accommodation} ({formatIDR(nightlyRate)} × {nightCount})</span><span>{formatIDR(baseTotal)}</span></div>
                  {adultExtraBeds > 0 && <div className="flex justify-between text-sand-100"><span>{text.adultBeds} ({adultExtraBeds})</span><span>{formatIDR(adultBedTotal)}</span></div>}
                  {extraChildren > 0 && <div className="flex justify-between text-sand-100"><span>{text.childCharge} ({extraChildren})</span><span>{formatIDR(childTotal)}</span></div>}
                  <div className="flex justify-between border-t border-white/10 pt-3 font-bold text-gold-400"><span>{text.total}</span><span>{formatIDR(total)}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{text.deposit}</span><span>{formatIDR(deposit)}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{text.balance}</span><span>{formatIDR(balance)}</span></div>
                  <p className="text-xs text-sand-200/80">{formatIDR(bedRate)} / {isEnglish ? 'bed / night' : isChinese ? '张床 / 晚' : 'kasur / malam'} · {text.childPolicy}</p>
                </> : <p className="text-amber-200">{text.invalid}</p>}
              </div>
              <p className="text-center font-serif text-[10px] text-slate-400 mt-3">{text.policy}</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"><MessageSquare className="h-4 w-4" />{isEnglish ? 'WhatsApp' : isChinese ? 'WhatsApp' : 'WhatsApp'}</a>
                <a href={emailHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-400 text-ocean-950 font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all"><Mail className="h-4 w-4" />{isEnglish ? 'Email' : isChinese ? '邮箱' : 'Email'}</a>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase text-gold-500"><Sparkles className="h-3 w-3" />{formatIDR(bedRate)} / {isEnglish ? 'bed / night' : isChinese ? '张床 / 晚' : 'kasur / malam'} </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
