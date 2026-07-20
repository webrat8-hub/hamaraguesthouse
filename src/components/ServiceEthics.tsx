import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';

export default function ServiceEthics() {
  const { language } = useLanguage();

  const content = {
    en: {
      accent: 'Our Service Ethics',
      title: 'Our Commitment to Hospitality',
      subtitle: 'Your Comfort is Our Absolute Priority',
      text1: 'At Hamara Guest House, your comfort is our absolute priority. We provide dedicated on-site staff assistance to ensure your needs are met—from providing fresh green coconuts to organizing transfers or assisting in getting you to an out of the spotlight waterfall or swimming hole. They have got you covered.',
      text2: 'Our staff are all local to the Pugung village area which we pride ourselves on supporting. All our staff are currently doing Hospitality and English training and although tourism is so new to the village they endeavor to assist their guests as their number one priority.',
      tag1: 'Warm Staff',
      tag2: 'Local Team',
      tag3: 'Authentic Care',
      quote: '“Hospitality is not just a service; it is our way of sharing the beauty of our village with you.”'
    },
    id: {
      accent: 'Etika Pelayanan Kami',
      title: 'Komitmen Kami pada Perhotelan',
      subtitle: 'Kenyamanan Anda Adalah Prioritas Mutlak',
      text1: 'Di Hamara Guest House, kenyamanan Anda adalah prioritas mutlak kami. Staf kami siap memberikan bantuan langsung di lokasi untuk memastikan semua kebutuhan Anda terpenuhi—mulai dari menyajikan kelapa muda segar, mengatur antar-jemput, hingga memandu Anda menemukan air terjun tersembunyi atau kolam renang alami yang jauh dari keramaian. Mereka selalu siap sedia membantu Anda.',
      text2: 'Seluruh staf kami adalah warga lokal dari area Desa Pugung, komunitas yang sangat kami banggakan dan dukung. Saat ini, semua staf kami sedang menjalani pelatihan perhotelan (Hospitality) dan Bahasa Inggris. Meskipun pariwisata tergolong sangat baru di desa ini, mereka selalu berusaha memberikan dedikasi terbaik bagi para tamu sebagai prioritas utama.',
      tag1: 'Staf Ramah',
      tag2: 'Warga Lokal',
      tag3: 'Kepedulian Tulus',
      quote: '“Keramahan bukan sekadar pelayanan; ini adalah cara kami membagikan keindahan desa kami kepada Anda.”'
    },
    zh: {
      accent: '我们的服务宗旨',
      title: '至诚至上的款待承诺',
      subtitle: '您的舒适是我们的至高追求',
      text1: '在哈玛拉别墅（Hamara Guest House），您的舒适是我们的首要任务。我们提供专属的在店管家与员工服务，确保满足您的每一项需求——无论是为您提供新鲜的椰青、安排车辆接送，还是协助您前往鲜为人知的隐秘瀑布或天然泳池，他们都会为您妥善安排。',
      text2: '我们的所有员工均来自别墅引以为傲并全力支持的普贡村（Pugung Village）本地。目前，所有员工都在接受专业的酒店管理与英语培训。尽管旅游业对该村落而言尚属新鲜事物，但他们始终将竭诚协助每一位宾客视为第一宗旨。',
      tag1: '热情相待',
      tag2: '本土团队',
      tag3: '真诚关怀',
      quote: '“热情款待不仅仅是一项服务；这是我们向您分享我们村庄之美的方式。”'
    }
  };

  const current = content[language] || content.en;

  return (
    <section id="service-ethics" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
                {current.accent}
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight">
              {current.title}
            </h2>
            
            <div className="h-[2px] w-12 bg-gold-500" />
            
            <h3 className="font-sans font-semibold text-base sm:text-lg text-ocean-900 tracking-wide uppercase pt-2">
              {current.subtitle}
            </h3>

            <div className="font-serif text-slate-600 font-light text-base leading-relaxed space-y-5">
              <p>{current.text1}</p>
              <p className="border-t border-dashed border-slate-100 pt-5 text-slate-500 italic">
                {current.text2}
              </p>
            </div>

            {/* Accent tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ocean-50 text-ocean-700 font-sans text-xs font-semibold uppercase">
                <Smile className="h-3.5 w-3.5 text-gold-500" />
                {current.tag1}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ocean-50 text-ocean-700 font-sans text-xs font-semibold uppercase">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
                {current.tag2}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ocean-50 text-ocean-700 font-sans text-xs font-semibold uppercase">
                <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                {current.tag3}
              </span>
            </div>
          </div>

          {/* Right Column: Creative Visual Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-ocean-950 to-ocean-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-ocean-800"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)] pointer-events-none" />
              
              {/* Quote Mark Decoration */}
              <span className="absolute -top-6 -left-2 text-[150px] font-serif text-gold-500/10 pointer-events-none select-none">“</span>

              <div className="relative z-10 space-y-8">
                <div className="p-3 bg-gold-500 text-slate-950 rounded-2xl w-fit">
                  <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
                </div>

                <blockquote className="font-serif text-lg sm:text-xl text-champagne leading-relaxed italic">
                  {current.quote}
                </blockquote>

                <div className="border-t border-ocean-800 pt-6">
                  <span className="block font-sans text-xs tracking-widest text-gold-400 uppercase font-bold">
                    {language === 'zh' ? '普贡本地团队' : language === 'en' ? 'Pugung Onsite Team' : 'Staf Lokal Pugung'}
                  </span>
                  <span className="block font-serif text-xs text-slate-400 mt-1 font-light">
                    {language === 'zh' ? '悉心接受酒店与英语培训，为您的每一次所需保驾护航' : language === 'en' ? 'Trained in Hospitality & English to cater to your every request' : 'Terlatih dalam Hospitality & Bahasa Inggris untuk melayani setiap permintaan Anda'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
