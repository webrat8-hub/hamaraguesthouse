import { useMemo, useState } from 'react';
import { CalendarDays, Users, Receipt, MessageSquare, Mail, BedDouble } from 'lucide-react';
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
  const [guestType, setGuestType] = useState<GuestType>('domestic');
  const [name, setName] = useState('');

  const isEnglish = language === 'en';
  const isChinese = language === 'zh';
  const copy = isEnglish ? {
    accent: 'Plan Your Stay', title: 'Hamara Guest House Rates', subtitle: 'Estimate your stay at our entire 3-bedroom villa. Rates depend on guest category and length of stay.', domestic: 'Indonesian (WNI)', international: 'International (WNA)', checkin: 'Check-in', checkout: 'Check-out', adults: 'Adults', children: 'Children aged 6 or under', extraBeds: 'Extra beds requested', name: 'Full name', nights: 'nights', base: 'Accommodation', adultBeds: 'Adult extra beds', childCharge: 'Additional children (3rd & 4th)', total: 'Estimated total', deposit: '30% deposit (non-refundable)', balance: 'Remaining 70% balance', childrenNote: 'Up to 2 children aged 6 or under stay free. Children aged 7 or older count as adults; the estimator accepts up to 4 young children.', domesticCapacity: 'Included: 6 adults. Maximum: 8 adults; guests 7 and 8 require 1 and 2 extra beds respectively.', internationalCapacity: 'Included: 4 adults. Maximum: 6 adults; guests 5 and 6 require 1 and 2 extra beds respectively.', childRateNote: 'The 3rd and 4th child (aged 6 or under) are charged the applicable extra-bed rate per night.', perBed: 'per bed / night', book: 'Send booking request via WhatsApp', email: 'Email', policy: 'A 30% non-refundable deposit is required to lock dates. Remaining balance is due at least 1 week before arrival. Check-in from 14:00 WIB; check-out by 12:00 WIB.', invalid: 'Check-out date must be after check-in.',
  } : isChinese ? {
    accent: '规划您的入住', title: 'Hamara Guest House 住宿价格', subtitle: '估算整栋三卧别墅的住宿费用。价格根据宾客类别和入住天数计算。', domestic: '印度尼西亚本地 (WNI)', international: '国际宾客 (WNA)', checkin: '入住日期', checkout: '退房日期', adults: '成人', children: '6岁及以下儿童', extraBeds: '额外加床需求', name: '姓名', nights: '晚', base: '住宿费用', adultBeds: '成人加床', childCharge: '额外儿童（第3和第4位）', total: '预计总额', deposit: '30%订金（不可退还）', balance: '剩余70%尾款', childrenNote: '最多两名6岁及以下儿童免费入住。7岁及以上儿童按成人计算；计算器最多可填写4名幼儿。', domesticCapacity: '标准包含6名成人；最多8名成人。第7和第8位成人分别需要1张和2张加床。', internationalCapacity: '标准包含4名成人；最多6名成人。第5和第6位成人分别需要1张和2张加床。', childRateNote: '第3和第4名6岁及以下儿童按相应加床费逐晚收费。', perBed: '每张床/每晚', book: '通过 WhatsApp 发送预订请求', email: '电子邮件', policy: '需支付30%不可退还订金以锁定日期。剩余款项须至少在抵达前一周付清。入住时间14:00 WIB起，退房时间最晚12:00 WIB。', invalid: '退房日期必须晚于入住日期。',
  } : {
    accent: 'Rencanakan Penginapan', title: 'Harga Hamara Guest House', subtitle: 'Estimasi biaya menginap di seluruh vila 3 kamar tidur. Tarif mengikuti kategori tamu dan lama menginap.', domestic: 'Indonesia (WNI)', international: 'Internasional (WNA)', checkin: 'Tanggal check-in', checkout: 'Tanggal check-out', adults: 'Dewasa', children: 'Anak usia 6 tahun ke bawah', extraBeds: 'Permintaan kasur tambahan', name: 'Nama lengkap', nights: 'malam', base: 'Akomodasi', adultBeds: 'Extra bed dewasa', childCharge: 'Biaya anak tambahan (ke-3 & ke-4)', total: 'Total estimasi', deposit: 'Deposit 30% (tidak dapat dikembalikan)', balance: 'Sisa pelunasan 70%', childrenNote: 'Maksimal 2 anak usia 6 tahun ke bawah menginap gratis. Anak usia 7 tahun ke atas dihitung sebagai dewasa; estimator menerima maksimal 4 anak kecil.', domesticCapacity: 'Termasuk 6 dewasa; kapasitas maksimal 8 dewasa. Tamu ke-7 dan ke-8 masing-masing memerlukan 1 dan 2 extra bed.', internationalCapacity: 'Termasuk 4 dewasa; kapasitas maksimal 6 dewasa. Tamu ke-5 dan ke-6 masing-masing memerlukan 1 dan 2 extra bed.', childRateNote: 'Anak ke-3 dan ke-4 (usia ≤6 tahun) dikenakan tarif extra bed yang berlaku per malam.', perBed: 'per kasur / malam', book: 'Kirim permintaan booking via WhatsApp', email: 'Email', policy: 'Deposit 30% yang tidak dapat dikembalikan diperlukan untuk mengunci tanggal. Sisa pembayaran harus dilunasi paling lambat 1 minggu sebelum kedatangan. Check-in mulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB.', invalid: 'Tanggal check-out harus setelah tanggal check-in.',
  };

  const nightCount = useMemo(() => {
    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
    return Number.isFinite(diff) && diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const standardAdults = guestType === 'international' ? 4 : 6;
  const maxAdults = standardAdults + 2;
  const bedRate = guestType === 'international' ? 250000 : 200000;
  const nightlyRate = guestType === 'international'
    ? nightCount >= 30 ? 1200000 : nightCount >= 14 ? 1300000 : 1350000
    : nightCount >= 30 ? 1100000 : nightCount >= 14 ? 1125000 : nightCount >= 2 ? 1150000 : 1200000;
  const autoExtraBeds = Math.max(0, guests - standardAdults);
  const adultExtraBeds = Math.min(2, Math.max(autoExtraBeds, extraBedsRequested));
  const extraChildren = Math.max(0, childrenCount - 2);
  const baseTotal = nightlyRate * nightCount;
  const adultBedTotal = adultExtraBeds * bedRate * nightCount;
  const childTotal = extraChildren * bedRate * nightCount;
  const total = baseTotal + adultBedTotal + childTotal;
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;

  const bookingMessage = `Halo Tia, saya ingin memesan Hamara Guest House.\nNama: ${name}\nKategori: ${guestType === 'domestic' ? 'Indonesia (WNI)' : 'International (WNA)'}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nDurasi: ${nightCount} malam\nDewasa: ${guests}\nAnak usia ≤6 tahun: ${childrenCount}\nExtra bed dewasa: ${adultExtraBeds}\nTotal estimasi: ${formatIDR(total)}\nDeposit 30%: ${formatIDR(deposit)}\nSisa 70%: ${formatIDR(balance)}`;
  const waHref = `https://wa.me/6282177671110?text=${encodeURIComponent(bookingMessage)}`;
  const emailHref = `mailto:guesthouse.hamara@gmail.com?subject=${encodeURIComponent('Booking Hamara Guest House')}&body=${encodeURIComponent(bookingMessage)}`;
  const rateLine = (label: string, rate: number) => `${label}: ${formatIDR(rate)} / ${isEnglish ? 'night' : isChinese ? '晚' : 'malam'}`;

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4"><div className="h-[2px] w-8 bg-gold-500" /><span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">{copy.accent}</span></div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4">{copy.title}</h2>
            <p className="font-serif text-slate-600 leading-relaxed mb-7">{copy.subtitle}</p>

            <div className="space-y-5">
              <div className="bg-white p-6 rounded-2xl border border-sand-100 shadow-sm">
                <h3 className="font-sans font-bold text-ocean-950 mb-3">{copy.domestic}</h3>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '1 night' : isChinese ? '1晚' : '1 malam', 1200000)}</p>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '2–13 nights' : isChinese ? '2–13晚' : '2–13 malam', 1150000)}</p>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '14–29 nights' : isChinese ? '14–29晚' : '14–29 malam', 1125000)}</p>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '30+ nights' : isChinese ? '30晚以上' : '30+ malam', 1100000)}</p>
                <p className="font-serif text-sm text-slate-500 mt-3">{copy.domesticCapacity} {formatIDR(200000)} {copy.perBed}</p>
                <p className="font-serif text-sm text-slate-500 mt-2">{copy.childRateNote}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-sand-100 shadow-sm">
                <h3 className="font-sans font-bold text-ocean-950 mb-3">{copy.international}</h3>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '1–13 nights' : isChinese ? '1–13晚' : '1–13 malam', 1350000)}</p>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '14–29 nights' : isChinese ? '14–29晚' : '14–29 malam', 1300000)}</p>
                <p className="font-serif text-slate-600">{rateLine(isEnglish ? '30+ nights' : isChinese ? '30晚以上' : '30+ malam', 1200000)}</p>
                <p className="font-serif text-sm text-slate-500 mt-3">{copy.internationalCapacity} {formatIDR(250000)} {copy.perBed}</p>
                <p className="font-serif text-sm text-slate-500 mt-2">{copy.childRateNote}</p>
              </div>
              <p className="font-serif text-sm text-slate-600 bg-gold-50 p-4 rounded-xl border border-gold-100">{copy.childrenNote}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-ocean-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-sans font-bold text-lg text-sand-50 mb-6 flex items-center gap-2"><Receipt className="h-5 w-5 text-champagne" />{copy.title}</h3>
              <div className="mb-5">
                <label className="block text-xs font-sans font-semibold text-champagne uppercase tracking-widest mb-2">{isEnglish ? 'Guest category' : isChinese ? '宾客类别' : 'Kategori tamu'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['domestic', 'international'] as const).map((type) => <button key={type} type="button" onClick={() => { setGuestType(type); setGuests(Math.min(guests, type === 'domestic' ? 8 : 6)); }} className={`p-3 rounded-xl text-sm font-sans font-bold ${guestType === type ? 'bg-gold-500 text-ocean-950' : 'bg-white/10 text-white'}`}>{type === 'domestic' ? copy.domestic : copy.international}</button>)}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-sans text-sand-200">{copy.checkin}<span className="relative mt-2 block"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="date" min={todayStr} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-xl bg-white/10 border border-white/10 p-3 pl-10 text-white" /></span></label>
                <label className="text-xs font-sans text-sand-200">{copy.checkout}<span className="relative mt-2 block"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-xl bg-white/10 border border-white/10 p-3 pl-10 text-white" /></span></label>
                <label className="text-xs font-sans text-sand-200">{copy.adults}<span className="relative mt-2 block"><Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full rounded-xl bg-ocean-900 border border-white/10 p-3 pl-10 text-white">{Array.from({ length: maxAdults }, (_, i) => i + 1).map((num) => <option key={num} value={num}>{num}</option>)}</select></span></label>
                <label className="text-xs font-sans text-sand-200">{copy.children} ({childrenCount})<span className="relative mt-2 block"><Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><select value={childrenCount} onChange={(e) => setChildrenCount(Number(e.target.value))} className="w-full rounded-xl bg-ocean-900 border border-white/10 p-3 pl-10 text-white">{[0, 1, 2, 3, 4].map((num) => <option key={num} value={num}>{num}</option>)}</select></span></label>
                <label className="text-xs font-sans text-sand-200">{copy.extraBeds}<span className="relative mt-2 block"><BedDouble className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><select value={extraBedsRequested} onChange={(e) => setExtraBedsRequested(Number(e.target.value))} className="w-full rounded-xl bg-ocean-900 border border-white/10 p-3 pl-10 text-white">{[0, 1, 2].map((num) => <option key={num} value={num}>{num}</option>)}</select></span></label>
                <label className="text-xs font-sans text-sand-200">{copy.name}<input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 p-3 text-white" /></label>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3 font-serif text-sm">
                {nightCount > 0 ? <>
                  <div className="flex justify-between text-sand-100"><span>{copy.nights}</span><span>{nightCount}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{copy.base} ({formatIDR(nightlyRate)} × {nightCount})</span><span>{formatIDR(baseTotal)}</span></div>
                  {adultExtraBeds > 0 && <div className="flex justify-between text-sand-100"><span>{copy.adultBeds} ({adultExtraBeds})</span><span>{formatIDR(adultBedTotal)}</span></div>}
                  {extraChildren > 0 && <div className="flex justify-between text-sand-100"><span>{copy.childCharge} ({extraChildren})</span><span>{formatIDR(childTotal)}</span></div>}
                  <div className="flex justify-between border-t border-white/10 pt-3 font-bold text-gold-400"><span>{copy.total}</span><span>{formatIDR(total)}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{copy.deposit}</span><span>{formatIDR(deposit)}</span></div>
                  <div className="flex justify-between text-sand-100"><span>{copy.balance}</span><span>{formatIDR(balance)}</span></div>
                  <p className="text-xs text-sand-200/80">{formatIDR(bedRate)} {copy.perBed} · {copy.childrenNote}</p>
                </> : <p className="text-amber-200">{copy.invalid}</p>}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-sand-200/80">{copy.policy}</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-center text-sm font-bold text-white"><MessageSquare className="h-4 w-4" />{copy.book}</a>
                <a href={emailHref} className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-3 text-center text-sm font-bold text-ocean-950"><Mail className="h-4 w-4" />{copy.email}</a>
              </div>
              <p className="mt-3 text-center text-xs text-sand-200/70">guesthouse.hamara@gmail.com · WhatsApp 0821-7767-1110</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
