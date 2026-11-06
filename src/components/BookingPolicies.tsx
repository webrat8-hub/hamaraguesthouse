import { CalendarDays, Clock, ShieldAlert, Wallet } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function BookingPolicies() {
  const { language } = useLanguage();
  const copy = language === 'en'
    ? { accent: 'Your Stay Guide', title: 'Booking Policies & Guidelines', intro: 'Important information about reservations, payments, and your stay at Hamara Guest House.', contact: '1. Contact us on WhatsApp', contactText: 'Contact Tia at 0821-7767-1110 or guesthouse.hamara@gmail.com to confirm availability.', deposit: '2. 30% non-refundable deposit', depositText: 'A 30% non-refundable deposit of the estimated total is required to lock in your dates. The remaining 70% is due at least one week before arrival.', times: '3. Check-in & check-out', timesText: 'Check-in from 14:00 WIB. Check-out by 12:00 WIB.' }
    : language === 'zh'
      ? { accent: '入住指南', title: '预订政策与须知', intro: '关于预订、付款以及在 Hamara Guest House 入住的重要信息。', contact: '1. WhatsApp 联系我们', contactText: '请通过 WhatsApp 0821-7767-1110 或 guesthouse.hamara@gmail.com 联系 Tia 确认空房。', deposit: '2. 30%不可退款定金', depositText: '需支付预估总额的30%不可退款定金以锁定日期。剩余70%须在抵达至少一周前付清。', times: '3. 入住与退房', timesText: '入住时间为14:00起，退房时间为12:00前（印尼西部时间）。' }
      : { accent: 'Panduan Menginap Anda', title: 'Kebijakan & Ketentuan Menginap', intro: 'Informasi penting mengenai pemesanan, pembayaran, dan masa tinggal di Hamara Guest House.', contact: '1. Hubungi kami melalui WhatsApp', contactText: 'Hubungi Tia di WhatsApp 0821-7767-1110 atau guesthouse.hamara@gmail.com untuk konfirmasi ketersediaan.', deposit: '2. Deposit non-refundable 30%', depositText: 'Deposit non-refundable sebesar 30% dari total estimasi diperlukan untuk mengunci tanggal. Sisa 70% dibayar paling lambat satu minggu sebelum kedatangan.', times: '3. Waktu check-in & check-out', timesText: 'Check-in mulai pukul 14:00 WIB dan check-out maksimal pukul 12:00 WIB.' };

  const policies = [
    { icon: CalendarDays, title: copy.contact, body: copy.contactText },
    { icon: Wallet, title: copy.deposit, body: copy.depositText },
    { icon: Clock, title: copy.times, body: copy.timesText },
  ];

  return (
    <section id="policies" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <ShieldAlert className="h-7 w-7 text-ocean-600 mx-auto mb-3" />
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-ocean-600 mb-2">{copy.accent}</p>
          <h2 className="font-display font-bold text-3xl text-ocean-950 mb-3">{copy.title}</h2>
          <p className="text-slate-600">{copy.intro}</p>
        </div>
        <div className="bg-sand-50 rounded-3xl p-6 sm:p-8 border border-sand-100 space-y-6">
          {policies.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="p-3 rounded-xl bg-white text-ocean-600 h-fit shadow-sm"><Icon className="h-5 w-5" /></div>
              <div><h3 className="font-bold text-ocean-950 mb-1">{title}</h3><p className="text-sm text-slate-600 leading-relaxed">{body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
