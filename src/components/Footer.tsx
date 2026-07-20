import { Compass, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ocean-950 text-white pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2.5 rounded-full bg-white/10 text-champagne">
                  <Compass className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold tracking-widest text-xl uppercase text-sand-50">
                    Hamara
                  </span>
                  <span className="text-[10px] tracking-[0.25em] font-sans font-medium uppercase text-champagne">
                    Guest House
                  </span>
                </div>
              </div>

              <p className="font-serif text-xs text-sand-200/80 font-light leading-relaxed mb-6 max-w-sm">
                {t('footer.desc')}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <span className="block font-sans text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                {language === 'zh' ? '关注我们的度假圣地' : language === 'en' ? 'Follow Our Sanctuary' : 'Ikuti Akun Resmi Kami'}
              </span>
              <a
                href="https://www.instagram.com/kruipugungexclusive"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:text-champagne transition-colors group"
              >
                <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-sans text-xs tracking-wider">@kruipugungexclusive</span>
              </a>
            </div>
          </div>

          {/* Column 2: Direct Contact & Timing */}
          <div className="lg:col-span-4">
            <h3 className="font-sans font-bold text-sm text-champagne uppercase tracking-widest mb-6">
              {t('footer.contact')}
            </h3>

            <div className="space-y-4 text-xs font-serif text-sand-200/90 font-light">
              <a 
                href="https://www.google.com/maps/place/-5.032853,103.744054"
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 group/addr hover:text-gold-400 transition-all duration-300 cursor-pointer"
                id="footer-address-link"
              >
                <MapPin className="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5 group-hover/addr:scale-110 transition-transform duration-300" />
                <div>
                  <span className="block text-white font-sans font-semibold mb-0.5 group-hover/addr:text-gold-400 transition-colors">
                    {language === 'zh' ? '完整地址' : language === 'en' ? 'Full Address' : 'Alamat Lengkap'}
                  </span>
                  <p className="leading-relaxed hover:underline">
                    {t('footer.loc')}
                  </p>
                </div>
              </a>

              <div className="flex gap-3 pt-2">
                <Phone className="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-sans font-semibold mb-0.5">
                    {language === 'zh' ? '专属预订 WhatsApp' : language === 'en' ? 'Reservation WhatsApp' : 'Reservasi WhatsApp'}
                  </span>
                  <a href="tel:+6282177671110" className="hover:text-champagne transition-colors">
                    Tia: 0821-7767-1110
                  </a>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Clock className="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-sans font-semibold mb-0.5">Check-In / Out</span>
                  <p>
                    {language === 'zh' 
                      ? '入住: 下午 14:00 | 退房: 中午 12:00' 
                      : language === 'en' 
                      ? 'In: 14:00 | Out: 12:00 WIB' 
                      : 'In: Pukul 14:00 | Out: Pukul 12:00 WIB'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Interactive Google Maps Embed */}
          <div className="lg:col-span-4">
            <h3 className="font-sans font-bold text-sm text-champagne uppercase tracking-widest mb-6">
              {language === 'zh' ? '谷歌地图定位' : language === 'en' ? 'Google Maps Location' : 'Lokasi Google Maps'}
            </h3>
            
            {/* Real Interactive Iframe Map Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[200px] w-full shadow-lg bg-white/5 group">
              <iframe
                src="https://maps.google.com/maps?q=-5.032853,103.744054&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 group-hover:opacity-100 transition-opacity absolute inset-0 w-full h-full"
              ></iframe>
              
              {/* Clickable Overlay Link that covers the entire map container */}
              <a
                href="https://www.google.com/maps/place/-5.032853,103.744054"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-20 flex flex-col justify-end p-4 bg-ocean-950/20 group-hover:bg-transparent transition-colors cursor-pointer"
                id="footer-map-overlay-link"
              >
                {/* Floating button indicator */}
                <div className="self-end bg-ocean-950/90 text-champagne text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 shadow-lg flex items-center gap-1.5 group-hover:bg-gold-500 group-hover:text-ocean-950 transition-all duration-300">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{language === 'zh' ? '在谷歌地图中打开' : language === 'en' ? 'Open in Google Maps' : 'Buka di Google Maps'}</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/5 text-center text-slate-400 font-serif text-[10px] font-light">
          <p>© {new Date().getFullYear()} Hamara Guest House Krui. {t('footer.rights')}</p>
          <p className="mt-1 text-slate-500">
            {language === 'zh' 
              ? '精美全面翻新奢华海滨别墅 —— 为静谧与私密而生。' 
              : language === 'en' 
              ? 'Beautifully Renovated Luxury Beachfront Villa — Designed for Tranquility.' 
              : 'Villa Tepi Pantai Mewah yang Direnovasi Indah — Dirancang untuk Ketenangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
