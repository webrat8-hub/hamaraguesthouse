import { Bike, Utensils, Car, ShoppingBag, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ExtrasDashboard() {
  const { language } = useLanguage();

  // Translations dictionary specifically for the Extras Showcase
  const translations = {
    id: {
      accent: 'Portal Informasi & Layanan Tambahan',
      title: 'Layanan Tambahan',
      desc: 'Tingkatkan kenyamanan menginap Anda di Hamara Guest House dengan layanan tambahan terkurasi kami. Semua layanan di bawah ini bersifat opsional dan dapat dikoordinasikan secara manual untuk kenyamanan Anda.',
      
      // Motorbike details
      bikeTitle: 'Sewa Sepeda Motor',
      bikePrice: 'Rp 70.000 / hari',
      bikeDesc: 'Jelajahi keindahan Krui dengan bebas. Kami menyediakan skuter otomatis (matic) yang dirawat secara berkala dan siap pakai.',
      bikeFeature1: 'Tangki bensin penuh saat serah terima',

      // Car details
      carTitle: 'Sewa Mobil Pribadi',
      carPrice: 'Tarif Tergantung Unit',
      carDesc: 'Butuh mobil keluarga yang nyaman untuk rombongan? Kami dapat mengoordinasikan penyewaan mobil bersih dari mitra terpercaya kami di Krui.',
      carFeature3: 'Memerlukan SIM Internasional untuk WNA',

      // Meals details
      mealsTitle: 'Katering Makanan Segar',
      mealsPrice: 'Rp 55.000 / porsi',
      mealsDesc: 'Nikmati kelezatan masakan rumahan segar yang disiapkan khusus untuk Anda.',
      mealsFeature1: 'Bahan segar harian langsung dari pasar lokal',
      mealsFeature3: 'Dikirim langsung dalam keadaan hangat ke vila Anda',

      // Pantry details
      pantryTitle: 'Artisanal Bakery & Pantry',
      pantryPrice: 'Sistem Buy-to-Order',
      pantryDesc: 'Dapatkan persediaan roti panggang premium dan madu hutan alami untuk menemani sarapan pagi Anda di tepi pantai.',
      pantryFeature1: 'Homemade Sourdough & Banana Bread segar',
      pantryFeature2: 'Madu Hutan Liar Sumatra 100% Organik',
      pantryFeature3: 'Mentega Selandia Baru & Granola Racikan Hamara'
    },
    en: {
      accent: 'Exclusive Services Directory',
      title: 'Premium Extras',
      desc: 'Enhance your beachfront holiday at Hamara Guest House with our curated premium add-ons. All services listed below are optional and can be coordinated manually for your absolute convenience.',
      
      // Motorbike details
      bikeTitle: 'Motorbike Rental',
      bikePrice: 'Rp 70,000 / day',
      bikeDesc: 'Explore Krui’s breathtaking coastline with complete freedom. We supply reliable, well-maintained automatic scooters.',
      bikeFeature1: 'Full tank of fuel upon hand-over',

      // Car details
      carTitle: 'Private Car Hire',
      carPrice: 'Rates vary by vehicle',
      carDesc: 'Travelling with family or a larger group? We coordinate secure car rentals through our trusted local transportation partners in Krui.',
      carFeature3: 'Requires an International Driving Permit',

      // Meals details
      mealsTitle: 'Home-Style Fresh Catering',
      mealsPrice: 'Rp 55,000 / portion',
      mealsDesc: 'Indulge in delicious, authentic home-cooked meals prepared with care.',
      mealsFeature1: 'Fresh ingredients sourced daily from local markets',
      mealsFeature3: 'Delivered warm straight to your villa dining area',

      // Pantry details
      pantryTitle: 'Artisanal Bakery & Pantry',
      pantryPrice: 'Buy-to-Order System',
      pantryDesc: 'Treat yourself to freshly-baked artisanal breads and pure local wild honey to complement your beachfront mornings.',
      pantryFeature1: 'Oven-fresh Homemade Sourdough & Banana Bread',
      pantryFeature2: '100% Organic Raw Sumatran Jungle Wild Honey',
      pantryFeature3: 'Premium NZ butter & Hamara specialty granola packs'
    },
    zh: {
      accent: '尊享增值服务目录',
      title: '专属增值服务',
      desc: '为您在 Hamara Guest House 的海滨假期锦上添花。下方列出的所有附加服务均为可选项目，可由我们的客服管家为您人工协助落实。',
      
      // Motorbike details
      bikeTitle: '自动挡摩托车租赁',
      bikePrice: 'Rp 70,000 / 天',
      bikeDesc: '自由骑行，探索克鲁伊（Krui）壮丽的海滩。我们提供车况极佳、定期保养的轻便自动挡踏板摩托车。',
      bikeFeature1: '交车时提供满油箱燃油',

      // Car details
      carTitle: '私人轿车租赁咨询',
      carPrice: '价格因车型而异',
      carDesc: '带家人或多人团体出行？我们可以通过克鲁伊当地最值得信赖的合作车队，为您协调干净舒适的专属用车。',
      carFeature3: '外国游客需持有有效的国际驾照（IDP）',

      // Meals details
      mealsTitle: '新鲜家常菜配送',
      mealsPrice: 'Rp 55,000 / 份',
      mealsDesc: '享用营养丰富、现点现做的爱心家常菜。',
      mealsFeature1: '每日清晨直采自克鲁伊本土集市的新鲜食材',
      mealsFeature3: '烹制完成后，第一时间温热配送至您的别墅',

      // Pantry details
      pantryTitle: '手工烘焙与伴手礼',
      pantryPrice: '预约采购系统 (Buy-to-Order)',
      pantryDesc: '享受松软美味的手工欧式面包与100%纯净的苏门答腊丛林野生蜂蜜，点亮您的每一个海滨清晨。',
      pantryFeature1: '每日限量新鲜手工酸面包 (Sourdough) 与香蕉蛋糕',
      pantryFeature2: '100% 纯天然苏门答腊有机深山野生蜂蜜',
      pantryFeature3: '进口新西兰黄油与 Hamara 自制格兰诺拉麦片包'
    }
  };

  const curr = translations[language] || translations.id;

  return (
    <section id="extras" className="py-24 bg-gradient-to-b from-sand-50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-6 bg-gold-500" />
            <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
              {curr.accent}
            </span>
            <div className="h-[1px] w-6 bg-gold-500" />
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
            {curr.title}
          </h2>

          <p className="font-serif text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            {curr.desc}
          </p>
        </div>

        {/* 2x2 Services Beautiful Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Motorbike Rental */}
          <div className="bg-white border border-sand-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-gold-50 text-gold-600">
                  <Bike className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-xs text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-100">
                  {curr.bikePrice}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-ocean-950 mb-3">{curr.bikeTitle}</h3>
              <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                {curr.bikeDesc}
              </p>
            </div>
            
            <div className="space-y-2 border-t border-sand-100 pt-4 mt-2">
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.bikeFeature1}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Car Hire */}
          <div className="bg-white border border-sand-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-ocean-500/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-ocean-500/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-ocean-50 text-ocean-600">
                  <Car className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-xs text-ocean-700 bg-ocean-50 px-3 py-1 rounded-full border border-ocean-100">
                  {curr.carPrice}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-ocean-950 mb-3">{curr.carTitle}</h3>
              <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                {curr.carDesc}
              </p>
            </div>
            
            <div className="space-y-2 border-t border-sand-100 pt-4 mt-2">
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.carFeature3}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Meal Catering */}
          <div className="bg-white border border-sand-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-gold-50 text-gold-600">
                  <Utensils className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-xs text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-100">
                  {curr.mealsPrice}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-ocean-950 mb-3">{curr.mealsTitle}</h3>
              <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                {curr.mealsDesc}
              </p>
            </div>
            
            <div className="space-y-2 border-t border-sand-100 pt-4 mt-2">
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.mealsFeature1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.mealsFeature3}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Bakery & Pantry */}
          <div className="bg-white border border-sand-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-ocean-500/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-ocean-500/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-ocean-50 text-ocean-600">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-xs text-ocean-700 bg-ocean-50 px-3 py-1 rounded-full border border-ocean-100">
                  {curr.pantryPrice}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-ocean-950 mb-3">{curr.pantryTitle}</h3>
              <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                {curr.pantryDesc}
              </p>
            </div>
            
            <div className="space-y-2 border-t border-sand-100 pt-4 mt-2">
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.pantryFeature1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.pantryFeature2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-serif text-slate-600">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{curr.pantryFeature3}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

