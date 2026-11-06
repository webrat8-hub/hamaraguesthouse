import { useMemo, useState } from 'react';
import { Calendar, Users, Receipt, MessageSquare, Mail, User } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type GuestType = 'domestic' | 'international';

const formatIDR = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;

export default function PricingCalculator() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const isChinese = language === 'zh';
  const [guestType, setGuestType] = useState<GuestType | null>(null);
  const [checkIn, setCheckIn] = useState(() => new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [adults, setAdults] = useState(4);
  const [childrenUnder6, setChildrenUnder6] = useState(0);
  const [name, setName] = useState('');

  const nights = useMemo(() => {
    const start = Date.parse(`${checkIn}T00:00:00Z`);
    const end = Date.parse(`${checkOut}T00:00:00Z`);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 1;
    return Math.max(1, Math.round((end - start) / 86_400_000));
  }, [checkIn, checkOut]);

  const standardAdults = guestType === 'international' ? 4 : 6;
  const maxAdults = standardAdults + 2;
  const extraBedRate = guestType === 'international' ? 250_000 : 200_000;
  const nightlyRate = useMemo(() => {
    if (guestType === 'international') {
      return nights >= 30 ? 1_200_000 : nights >= 14 ? 1_300_000 : 1_350_000;
    }
    return nights >= 30 ? 1_100_000 : nights >= 14 ? 1_125_000 : nights >= 2 ? 1_150_000 : 1_200_000;
  }, [guestType, nights]);
  const adultExtraBeds = Math.min(2, Math.max(0, adults - standardAdults));
  const extraChildren = Math.max(0, childrenUnder6 - 2);
  const baseTotal = nightlyRate * nights;
  const adultExtraBedTotal = adultExtraBeds * extraBedRate * nights;
  const childChargeTotal = extraChildren * extraBedRate * nights;
  const total = baseTotal + adultExtraBedTotal + childChargeTotal;
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;

  const text = (id: string, en: string, zh: string) => isEnglish ? en : isChinese ? zh : id;
  const chooseGuestType = (type: GuestType) => {
    setGuestType(type);
    setAdults(type === 'international' ? 4 : 6);
  };
  const message = guestType ? [
    `Hello Tia, booking enquiry for Hamara Guest House`,
    `Name: ${name || '-'}`,
    `Guest type: ${guestType === 'domestic' ? 'Indonesia (WNI)' : 'International (WNA)'}`,
    `Check-in: ${checkIn} | Check-out: ${checkOut} | Nights: ${nights}`,
    `Adults: ${adults} | Children age 6 or under: ${childrenUnder6}`,
    `Adult extra beds: ${adultExtraBeds} | Additional child charges: ${extraChildren}`,
    `Estimated total: ${formatIDR(total)}`,
    `30% deposit: ${formatIDR(deposit)} | Remaining balance: ${formatIDR(balance)}`,
  ].join('\n') : '';

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-sand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-600 mb-3">{text('Rencanakan Kunjungan Anda', 'Plan Your Stay', '规划您的假期')}</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950">{text('Harga & Kalkulator Booking', 'Villa Rates & Booking Calculator', '别墅价格与预订计算器')}</h2>
          <p className="mt-3 text-slate-600">{text('Seluruh vila 3 kamar tidur • Harga sesuai kategori tamu dan lama menginap', 'Entire 3-bedroom villa • Rates depend on guest category and stay length', '整栋三卧室别墅 • 价格根据宾客类别和住宿时长计算')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-100 shadow-sm">
            <h3 className="font-bold text-xl text-ocean-950 mb-5">{text('Tarif Menginap', 'Nightly rates', '每晚价格')}</h3>
            <div className="space-y-5 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-ocean-800">International (WNA)</h4>
                <p>1–13 {text('malam', 'nights', '晚')}: {formatIDR(1_350_000)} / {text('malam', 'night', '晚')}</p>
                <p>14–29 {text('malam', 'nights', '晚')}: {formatIDR(1_300_000)} / {text('malam', 'night', '晚')}</p>
                <p>30+ {text('malam', 'nights', '晚')}: {formatIDR(1_200_000)} / {text('malam', 'night', '晚')}</p>
                <p className="mt-1">{text('Kapasitas standar 4 dewasa; maksimal 6. Extra bed', '4 adults included; max 6. Extra bed', '标准含4位成人，最多6位。加床')} {formatIDR(250_000)} / {text('malam', 'night', '晚')}.</p>
              </div>
              <div>
                <h4 className="font-bold text-ocean-800">Indonesian (WNI)</h4>
                <p>1 {text('malam', 'night', '晚')}: {formatIDR(1_200_000)} / {text('malam', 'night', '晚')}</p>
                <p>2–13 {text('malam', 'nights', '晚')}: {formatIDR(1_150_000)} / {text('malam', 'night', '晚')}</p>
                <p>14–29 {text('malam', 'nights', '晚')}: {formatIDR(1_125_000)} / {text('malam', 'night', '晚')}</p>
                <p>30+ {text('malam', 'nights', '晚')}: {formatIDR(1_100_000)} / {text('malam', 'night', '晚')}</p>
                <p className="mt-1">{text('Kapasitas standar 6 dewasa; maksimal 8. Extra bed', '6 adults included; max 8. Extra bed', '标准含6位成人，最多8位。加床')} {formatIDR(200_000)} / {text('malam', 'night', '晚')}.</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-bold text-ocean-800">{text('Kebijakan Anak', 'Children policy', '儿童政策')}</h4>
                <p>{text('Maksimal 2 anak usia 6 tahun ke bawah gratis. Anak ke-3 dan ke-4 dikenakan tarif extra bed. Usia 7 tahun ke atas dihitung sebagai dewasa.', 'Up to 2 children aged 6 or under stay free. Children 3 and 4 are charged the extra-bed rate. Ages 7+ count as adults.', '最多2名6岁及以下儿童免费。第3、4名儿童按加床费收费。7岁及以上按成人计算。')}</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-bold text-ocean-800">{text('Pembayaran & Waktu', 'Payment & check-in/out', '付款与入住时间')}</h4>
                <p>{text('DP non-refundable 30% untuk mengunci tanggal; sisa 70% dibayar paling lambat 1 minggu sebelum kedatangan. Check-in 14:00 WIB, check-out 12:00 WIB.', 'A non-refundable 30% deposit locks the dates; the remaining 70% is due at least 1 week before arrival. Check-in 14:00 WIB; check-out by 12:00 WIB.', '支付不可退款的30%定金以锁定日期；余款70%须在抵达至少一周前支付。入住14:00，退房12:00（印尼西部时间）。')}</p>
              </div>
            </div>
          </div>

          <div className="bg-ocean-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Receipt className="h-5 w-5 text-champagne" />{text('Kalkulator Harga', 'Price estimator', '价格计算器')}</h3>
            <p className="text-sm text-sand-200 mb-5">{text('Pilih kategori tamu untuk menghitung estimasi biaya.', 'Choose a guest category to estimate your stay.', '选择宾客类别以估算住宿费用。')}</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button type="button" onClick={() => chooseGuestType('domestic')} className={`rounded-xl py-3 px-2 font-semibold text-sm ${guestType === 'domestic' ? 'bg-gold-500 text-ocean-950' : 'bg-white/10 hover:bg-white/20'}`}>🇮🇩 Indonesia (WNI)</button>
              <button type="button" onClick={() => chooseGuestType('international')} className={`rounded-xl py-3 px-2 font-semibold text-sm ${guestType === 'international' ? 'bg-gold-500 text-ocean-950' : 'bg-white/10 hover:bg-white/20'}`}>🌐 International (WNA)</button>
            </div>
            {guestType && <>
              <label className="block text-xs text-sand-200 mb-1"> <User className="inline h-3 w-3" /> {text('Nama pemesan', 'Name', '姓名')}</label>
              <input value={name} onChange={(event) => setName(event.target.value)} className="w-full mb-4 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white" placeholder={text('Nama lengkap', 'Full name', '全名')} />
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <label className="text-xs text-sand-200">{text('Check-in', 'Check-in', '入住')}
                  <span className="relative block mt-1"><Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="date" min={new Date().toISOString().slice(0, 10)} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-9 pr-2 text-white" /></span>
                </label>
                <label className="text-xs text-sand-200">{text('Check-out', 'Check-out', '退房')}
                  <span className="relative block mt-1"><Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-9 pr-2 text-white" /></span>
                </label>
                <label className="text-xs text-sand-200"> <Users className="inline h-3 w-3" /> {text('Jumlah dewasa', 'Adults', '成人')}
                  <select value={adults} onChange={(event) => setAdults(Number(event.target.value))} className="w-full mt-1 rounded-lg bg-ocean-900 border border-white/20 px-3 py-2 text-white">{Array.from({ length: maxAdults }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}</option>)}</select>
                </label>
                <label className="text-xs text-sand-200">{text('Anak usia ≤ 6 tahun', 'Children age 6 or under', '6岁及以下儿童')} (0–4)
                  <select value={childrenUnder6} onChange={(event) => setChildrenUnder6(Number(event.target.value))} className="w-full mt-1 rounded-lg bg-ocean-900 border border-white/20 px-3 py-2 text-white">{[0, 1, 2, 3, 4].map((count) => <option key={count} value={count}>{count}</option>)}</select>
                </label>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>{text('Jumlah malam', 'Nights', '晚数')}</span><span>{nights}</span></div>
                <div className="flex justify-between"><span>{text('Tarif dasar per malam', 'Base nightly rate', '每晚基础价格')}</span><span>{formatIDR(nightlyRate)}</span></div>
                <div className="flex justify-between"><span>{text('Biaya extra bed dewasa', 'Adult extra-bed charge', '成人加床费')} ({adultExtraBeds})</span><span>{formatIDR(adultExtraBedTotal)}</span></div>
                <div className="flex justify-between"><span>{text('Biaya anak tambahan', 'Additional child charge', '额外儿童费用')} ({extraChildren})</span><span>{formatIDR(childChargeTotal)}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-gold-400"><span>{text('Total estimasi', 'Estimated total', '预估总额')}</span><span>{formatIDR(total)}</span></div>
                <div className="flex justify-between text-sand-200"><span>{text('DP 30%', '30% deposit', '30%定金')}</span><span>{formatIDR(deposit)}</span></div>
                <div className="flex justify-between text-sand-200"><span>{text('Sisa 70%', 'Remaining 70%', '剩余70%')}</span><span>{formatIDR(balance)}</span></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <a href={`https://wa.me/6282177671110?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 px-3 text-center text-sm font-bold"><MessageSquare className="inline h-4 w-4 mr-2" />WhatsApp 0821-7767-1110</a>
                <a href={`mailto:guesthouse.hamara@gmail.com?subject=${encodeURIComponent('Booking Request - Hamara Guest House')}&body=${encodeURIComponent(message)}`} className="rounded-xl bg-gold-500 hover:bg-gold-600 text-ocean-950 py-3 px-3 text-center text-sm font-bold"><Mail className="inline h-4 w-4 mr-2" />guesthouse.hamara@gmail.com</a>
              </div>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}
