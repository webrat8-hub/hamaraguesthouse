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
    accent: 'Plan Your Stay', heading: 'Exclusive Tariffs &', subheading: 'Tailored Promotions', intro: 'Select your guest category to see the applicable villa rates and long-stay details.', select: 'Select Guest Category', domestic: 'Indonesian (WNI)', international: 'International (WNA)', domesticRates: 'Villa Base Rates (WNI)', internationalRates: 'Villa Cost & Booking Rules', baseRate: 'Entire Villa Nightly Rate', included: 'Standard capacity included in base rate', max: 'Maximum capacity (includes up to 2 required extra beds)', extra: 'Extra bed rate (max 2)', children: 'Children aged 6 or under', childPolicy: 'Up to 2 children stay free. The 3rd and 4th child are charged the extra-bed rate. Children aged 7 or older count as adults.', promoHeading: 'Long-Stay Rates', checkin: 'Check-in', checkout: 'Check-out', adults: 'Adults', kids: 'Children aged 6 or under', requestedBeds: 'Extra beds requested', name: 'Full name', nights: 'nights', accommodation: 'Accommodation', adultBeds: 'Adult extra beds', childCharge: 'Additional children (3rd & 4th)', total: 'Estimated total', deposit: '30% non-refundable deposit', balance: 'Remaining 70% balance', invalid: 'Check-out must be after check-in.', policy: 'A 30% non-refundable deposit is required to lock the dates. The remaining 70% is due at least one week before arrival. Check-in from 14:00 WIB; check-out by 12:00 WIB.', book: 'Send booking request via WhatsApp', email: 'Email', oneNight: '1 night', twoToThirteen: '2–13 nights', fourteenToTwentyNine: '14–29 nights', thirtyPlus: '30+ nights', oneToThirteen: '1–13 nights',
  } : isChinese ? {
    accent: '规划您的入住', heading: '别墅专属价格与', subheading: '长住优惠', intro: '请选择宾客类别，以查看适用的别墅价格和长住信息。', select: '选择宾客类别', domestic: '印度尼西亚本地 (WNI)', international: '国际宾客 (WNA)', domesticRates: '别墅基础价格 (WNI)', internationalRates: '别墅费用与预订规则', baseRate: '整栋别墅每晚价格', included: '基础价格包含的标准人数', max: '最多入住人数（最多包含2张必需加床）', extra: '加床费用（最多2张）', children: '6岁及以下儿童', childPolicy: '最多两名儿童免费。第3和第4名儿童按加床费收费。7岁及以上儿童按成人计算。', promoHeading: '长住价格', checkin: '入住日期', checkout: '退房日期', adults: '成人', kids: '6岁及以下儿童', requestedBeds: '额外加床需求', name: '姓名', nights: '晚', accommodation: '住宿费用', adultBeds: '成人加床', childCharge: '额外儿童（第3和第4位）', total: '预计总额', deposit: '30%不可退还订金', balance: '剩余70%尾款', invalid: '退房日期必须晚于入住日期。', policy: '需支付30%不可退还订金以锁定日期。剩余70%须至少在抵达前一周付清。入住时间14:00 WIB起，退房时间最晚12:00 WIB。', book: '通过 WhatsApp 发送预订请求', email: '电子邮件', oneNight: '1晚', twoToThirteen: '2–13晚', fourteenToTwentyNine: '14–29晚', thirtyPlus: '30晚以上', oneToThirteen: '1–13晚',
  } : {
    accent: 'Rencanakan Kunjungan Anda', heading: 'Tarif Eksklusif Villa &', subheading: 'Keuntungan Menginap', intro: 'Pilih kategori tamu untuk melihat informasi tarif villa dan harga menginap jangka panjang.', select: 'Pilih Kategori Tamu', domestic: 'Indonesia (WNI)', international: 'Internasional (WNA)', domesticRates: 'Tarif Dasar Villa (WNI)', internationalRates: 'Tarif Villa & Aturan Booking (WNA)', baseRate: 'Tarif sewa seluruh villa per malam', included: 'Kapasitas standar termasuk dalam tarif dasar', max: 'Kapasitas maksimal (termasuk maksimal 2 extra bed wajib)', extra: 'Tarif extra bed (maksimal 2)', children: 'Anak usia 6 tahun ke bawah', childPolicy: 'Maksimal 2 anak menginap gratis. Anak ke-3 dan ke-4 dikenakan tarif extra bed. Anak usia 7 tahun ke atas dihitung sebagai dewasa.', promoHeading: 'Tarif Menginap Jangka Panjang', checkin: 'Tanggal check-in', checkout: 'Tanggal check-out', adults: 'Dewasa', kids: 'Anak usia 6 tahun ke bawah', requestedBeds: 'Permintaan extra bed', name: 'Nama lengkap', nights: 'malam', accommodation: 'Akomodasi', adultBeds: 'Extra bed dewasa', childCharge: 'Biaya anak tambahan (ke-3 & ke-4)', total: 'Total estimasi', deposit: 'Deposit 30% (tidak dapat dikembalikan)', balance: 'Sisa pelunasan 70%', invalid: 'Tanggal check-out harus setelah tanggal check-in.', policy: 'Deposit 30% yang tidak dapat dikembalikan diperlukan untuk mengunci tanggal. Sisa 70% harus dilunasi paling lambat 1 minggu sebelum kedatangan. Check-in mulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB.', book: 'Kirim permintaan booking via WhatsApp', email: 'Email', oneNight: '1 malam', twoToThirteen: '2–13 malam', fourteenToTwentyNine: '14–29 malam', thirtyPlus: '30+ malam', oneToThirteen: '1–13 malam',
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
  const emailHref = `mailto:guesthouse.hamara@gmail.com?subject=${encodeURIComponent('Booking Hamara Guest House')}&body=${encodeURIComponent(waMessage)}`;

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
              <button type="button" onClick={() => { setGuestType('domestic'); setGuests(Math.min(guests, 8)); }} className={`py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${guestType === 'domestic' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}><span>🇮🇩</span><span>{text.domestic}</span></button>
              <button type="button" onClick={() => { setGuestType('international'); setGuests(Math.min(guests, 6)); }} className={`py-3 px-3 rounded-xl text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${guestType === 'international' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}><span>🌐</span><span>{text.international}</span></button>
            </div>

            {guestType ? <>
              {renderRates(guestType)}
              {guestType === 'domestic' ? <div className="space-y-4 animate-fade-in">
                <h3 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-widest mb-3">{text.promoHeading}</h3>
                <div className="flex items-start gap-3"><div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1"><Percent className="h-3.5 w-3.5" /></div><div><h4 className="font-sans font-bold text-sm text-ocean-950">{isEnglish ? '2–13 nights: Rp 1,150,000 / night' : isChinese ? '2–13晚：Rp 1,150,000 / 晚' : '2–13 malam: Rp 1.150.000 / malam'}</h4><p className="font-serif text-xs text-slate-500">{isEnglish ? '14–29 nights: Rp 1,125,000 / night; 30+ nights: Rp 1,100,000 / night.' : isChinese ? '14–29晚：Rp 1,125,000 / 晚；30晚以上：Rp 1,100,000 / 晚。' : '14–29 malam: Rp 1.125.000 / malam; 30+ malam: Rp 1.100.000 / malam.'}</p></div></div>
                <div className="flex items-start gap-3"><div className="p-1 rounded-full bg-ocean-100 text-ocean-600 mt-1"><CheckCircle2 className="h-3.5 w-3.5" /></div><div><h4 className="font-sans font-bold text-sm text-ocean-950">{isEnglish ? 'No additional percentage or free-night discount' : isChinese ? '不再额外叠加折扣或免费晚数' : 'Tidak ada diskon persentase atau malam gratis tambahan'}</h4><p className="font-serif text-xs text-slate-500">{isEnglish ? 'The displayed long-stay rates are the final nightly base rates.' : isChinese ? '以上长住价格即为最终每晚基础房价。' : 'Tarif long-stay di atas adalah tarif dasar akhir per malam.'}</p></div></div>
              </div> : <div className="bg-gold-50/50 p-5 rounded-2xl border border-gold-100/50 space-y-2 animate-fade-in"><h3 className="font-sans font-bold text-xs text-gold-800 uppercase tracking-wider">{isEnglish ? 'International long-stay rates' : isChinese ? '国际宾客长住价格' : 'Tarif long-stay WNA'}</h3><p className="font-serif text-sm text-slate-600">{isEnglish ? '14–29 nights: Rp 1,300,000 / night. 30+ nights: Rp 1,200,000 / night.' : isChinese ? '14–29晚：Rp 1,300,000 / 晚。30晚以上：Rp 1,200,000 / 晚。' : '14–29 malam: Rp 1.300.000 / malam. 30+ malam: Rp 1.200.000 / malam.'}</p></div>}
            </> : <div className="bg-gold-50/60 p-8 rounded-3xl border border-dashed border-gold-200 text-center"><div className="p-3.5 rounded-full bg-gold-100 text-gold-600 mb-4 shadow-sm inline-flex"><Users className="h-6 w-6" /></div><h3 className="font-sans font-bold text-sm text-ocean-950 uppercase tracking-wider mb-2">{text.select}</h3><p className="font-serif text-xs text-slate-500">{text.intro}</p></div>}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-ocean-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-xl pointer-events-none" />
              <h3 className="font-sans font-bold text-lg sm:text-xl text-sand-50 mb-1 flex items-center gap-2"><Receipt className="h-5 w-5 text-champagne" /><span>{isEnglish ? 'Booking Enquiry, Pricing & Availability Calculator' : isChinese ? '预订咨询、价格与空房计算器' : 'Kalkulator Booking, Harga & Ketersediaan'}</span></h3>
              <p className="font-serif text-xs text-sand-200/80 font-light mb-6">{isEnglish ? 'Calculate your stay using the selected WNI or WNA rate.' : isChinese ? '根据所选WNI或WNA价格计算住宿费用。' : 'Hitung biaya menginap menggunakan tarif WNI atau WNA yang dipilih.'}</p>

              <div className="mb-6"><label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest mb-2">{text.select}</label><div className="grid grid-cols-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl gap-2">
                <button type="button" onClick={() => { setGuestType('domestic'); setGuests(Math.min(guests, 8)); }} className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all ${guestType === 'domestic' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md' : 'text-sand-200 hover:text-white hover:bg-white/5'}`}>{text.domestic}</button>
                <button type="button" onClick={() => { setGuestType('international'); setGuests(Math.min(guests, 6)); }} className={`py-4 px-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all ${guestType === 'international' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 shadow-md' : 'text-sand-200 hover:text-white hover:bg-white/5'}`}>{text.international}</button>
              </div></div>

              <div className="mb-6"><label className="block font-sans text-[10px] font-semibold text-sand-200 uppercase tracking-widest mb-1.5">{text.name} *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.checkin}<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><input type="date" min={todayStr} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.checkout}<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white" /></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.adults}<span className="relative mt-1.5 block"><Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full bg-ocean-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white">{Array.from({ length: maxAdults }, (_, i) => i + 1).map((count) => <option key={count} value={count}>{count} {isEnglish ? 'Adults' : isChinese ? '位成人' : 'Dewasa'}</option>)}</select></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.kids} ({childrenCount})<span className="relative mt-1.5 block"><Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><select value={childrenCount} onChange={(e) => setChildrenCount(Number(e.target.value))} className="w-full bg-ocean-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white">{[0, 1, 2, 3, 4].map((count) => <option key={count} value={count}>{count}</option>)}</select></span></label>
                <label className="block font-sans text-[10px] font-semibold text-champagne uppercase tracking-widest">{text.requestedBeds}<span className="relative mt-1.5 block"><BedDouble className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><select value={extraBedsRequested} onChange={(e) => setExtraBedsRequested(Number(e.target.value))} className="w-full bg-ocean-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white">{[0, 1, 2].map((count) => <option key={count} value={count}>{count}</option>)}</select></span></label>
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
              <div className="mt-5 grid sm:grid-cols-2 gap-3"><a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-sans font-bold text-xs tracking-wider uppercase"><MessageSquare className="h-4 w-4" />{text.book}</a><a href={emailHref} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 font-sans font-bold text-xs tracking-wider uppercase"><Mail className="h-4 w-4" />{text.email}</a></div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase text-gold-500"><Sparkles className="h-3 w-3" />{formatIDR(bedRate)} / {isEnglish ? 'extra bed per night' : isChinese ? '每张加床每晚' : 'extra bed per malam'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
