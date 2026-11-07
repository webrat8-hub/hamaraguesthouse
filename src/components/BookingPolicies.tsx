import { CalendarDays, Wallet, Clock, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function BookingPolicies() {
  const { language } = useLanguage();
  const text = language === 'en' ? {
    accent: 'Your Stay Guide', title: 'Booking Policies & Guidelines', subtitle: 'Important information about deposits, check-in and check-out.', heading: 'Booking & payment policies', contact: 'Booking contact', contactDesc: 'Contact Tia directly on WhatsApp at +62 821-8555-904 or email guesthouse.hamara@gmail.com to confirm availability.', deposit: '30% non-refundable deposit', depositDesc: 'A 30% non-refundable deposit of the estimated stay total is required to lock in your preferred dates. The remaining 70% balance is due at least one week before arrival.', times: 'Check-in & check-out', timesDesc: 'Check-in from 14:00 WIB. Check-out by 12:00 WIB.',
  } : language === 'zh' ? {
    accent: '入住指南', title: '预订政策与须知', subtitle: '关于订金、入住和退房的重要信息。', heading: '预订与付款政策', contact: '预订联系方式', contactDesc: '请通过 WhatsApp +62 821-8555-904 或 guesthouse.hamara@gmail.com 联系 Tia 确认房态。', deposit: '30%不可退还订金', depositDesc: '需按预估住宿总额支付30%不可退还订金以锁定日期。剩余70%须至少在抵达前一周付清。', times: '入住与退房', timesDesc: '入住时间为14:00 WIB起，退房时间为12:00 WIB前。',
  } : {
    accent: 'Panduan Menginap', title: 'Kebijakan & Ketentuan Booking', subtitle: 'Informasi penting mengenai deposit, waktu check-in dan check-out.', heading: 'Kebijakan booking & pembayaran', contact: 'Kontak pemesanan', contactDesc: 'Hubungi Tia melalui WhatsApp +62 821-8555-904 atau guesthouse.hamara@gmail.com untuk konfirmasi ketersediaan.', deposit: 'Deposit 30% tidak dapat dikembalikan', depositDesc: 'Deposit sebesar 30% dari total estimasi menginap diperlukan untuk mengunci tanggal. Sisa 70% harus dilunasi paling lambat 1 minggu sebelum kedatangan.', times: 'Waktu check-in & check-out', timesDesc: 'Check-in mulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB.',
  };

  const items = [
    { icon: CalendarDays, title: text.contact, description: text.contactDesc },
    { icon: Wallet, title: text.deposit, description: text.depositDesc },
    { icon: Clock, title: text.times, description: text.timesDesc },
  ];

  return (
    <section id="policies" className="py-24 bg-white border-b border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-ocean-600 uppercase font-bold block mb-3">{text.accent}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4">{text.title}</h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 text-base sm:text-lg">{text.subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto bg-sand-50/50 rounded-3xl p-8 border border-sand-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6"><ShieldAlert className="h-5 w-5 text-ocean-600" /><h3 className="font-sans font-bold text-lg text-ocean-950 uppercase tracking-wide">{text.heading}</h3></div>
          <div className="space-y-6">{items.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-4"><div className="p-3 rounded-xl bg-white shadow-sm text-ocean-600 h-fit"><Icon className="h-5 w-5" /></div><div><h4 className="font-sans font-bold text-sm text-ocean-950 mb-1">{title}</h4><p className="font-serif text-slate-600 text-sm leading-relaxed">{description}</p></div></div>)}</div>
        </div>
      </div>
    </section>
  );
}
