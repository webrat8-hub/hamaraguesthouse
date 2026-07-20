import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Waves, Anchor, ShoppingBag, Compass, Trees, Palmtree, MapPin, ChevronRight, Info } from 'lucide-react';

interface ActivityItem {
  id: string;
  category: {
    id: string;
    en: string;
    zh: string;
  };
  title: {
    id: string;
    en: string;
    zh: string;
  };
  desc: {
    id: string;
    en: string;
    zh: string;
  };
  badge: {
    id: string;
    en: string;
    zh: string;
  };
  distance: {
    id: string;
    en: string;
    zh: string;
  };
  icon: any;
}

export default function ThingsToDo() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showWaterfalls, setShowWaterfalls] = useState<boolean>(false);
  const [showMarkets, setShowMarkets] = useState<boolean>(false);

  const activities: ActivityItem[] = [
    {
      id: 'surfing',
      category: {
        id: 'Petualangan Laut',
        en: 'Ocean Adventure',
        zh: '海洋探险'
      },
      title: {
        id: 'Selancar (Surfing)',
        en: 'Surfing',
        zh: '冲浪'
      },
      desc: {
        id: 'Ada ombak legendaris bernama Honeysmacks tepat di depan Villa. Berjarak hanya 5 menit berkendara, Anda juga dapat berselancar di Jenny\'s, Jimmy\'s Right, dan Jimmy\'s Left. Bagi yang berjiwa petualang, masih banyak ombak spektakuler lainnya untuk dijelajahi di sebelah utara maupun selatan Villa.',
        en: 'There is a wave called Honeysmacks directly in front of the Villa. There are also other waves within 5 mins drive called Jenny’s, Jimmy’s right and Jimmy’s left. For the more adventurous there are other waves to explore both north and south of the Villa.',
        zh: '别墅正前方即是著名的 Honeysmacks 浪点。驱车 5 分钟内即可到达 Jenny’s、Jimmy’s right 和 Jimmy’s left 等极佳浪点。对于更具冒险精神的冲浪客，别墅南北两侧还有更多优质浪点等待您去发掘。'
      },
      badge: {
        id: 'Rekomendasi Utama',
        en: 'Top Highlight',
        zh: '重磅推荐'
      },
      distance: {
        id: 'Tepat di Depan Villa',
        en: 'Directly in Front',
        zh: '别墅正前方'
      },
      icon: Waves
    },
    {
      id: 'fishing_diving',
      category: {
        id: 'Eksplorasi Air',
        en: 'Water Exploration',
        zh: '水上探索'
      },
      title: {
        id: 'Memancing & Menyelam',
        en: 'Fishing & Diving',
        zh: '海钓与潜水'
      },
      desc: {
        id: 'Kanal alami Pantai Benawang menyajikan kekayaan terumbu karang serta ekosistem memancing dan menyelam yang melimpah tepat di depan mata Anda. Untuk kunjungan jangka panjang, kami dengan senang hati membantu Anda menyewa perahu charter dan pemandu pancing lokal berpengalaman.',
        en: 'There are plenty of fishing and diving options right out front in the Benawang beach channel. For those staying for extended periods we can also help you arrange charter boats with fishing guides.',
        zh: '贝内湾（Benawang）海滩通道的正前方拥有丰富的海钓和潜水资源，水下生态繁茂。对于长期入住的贵宾，我们可协助您租用带有专业指导的当地包船。'
      },
      badge: {
        id: 'Aktivitas Populer',
        en: 'Popular Choice',
        zh: '热门活动'
      },
      distance: {
        id: 'Kanal Pantai Benawang',
        en: 'Benawang Beach Channel',
        zh: '贝内湾海滩通道'
      },
      icon: Anchor
    },
    {
      id: 'markets',
      category: {
        id: 'Budaya Lokal',
        en: 'Local Culture',
        zh: '本土文化'
      },
      title: {
        id: 'Pasar Tradisional Lokal',
        en: 'Traditional Local Markets',
        zh: '当地传统集市'
      },
      desc: {
        id: 'Pasar tradisional hari Kamis dan Jumat berjarak hanya 10 menit dari Villa. Nikmati petualangan kuliner dengan buah segar organik lokal, sayuran, dan tangkapan ikan segar hari itu. Pasar ini juga menjual aneka camilan tradisional khas, pakaian, serta kerajinan tangan untuk oleh-oleh.',
        en: 'The local Thursday and Friday markets are 10 mins from the Villa and have amazing locally grown produce and also fish. The markets also serve different snacks and food as well as clothing and gifts for the family.',
        zh: '当地逢周四和周五开放的传统集市距离别墅仅 10 分钟路程，提供极其丰富的新鲜本土农特产和海鱼。集市上还供应各种地道小吃、美食，以及适合带给家人的衣物和纪念礼品。'
      },
      badge: {
        id: 'Wajib Dikunjungi',
        en: 'Must Visit',
        zh: '必游推荐'
      },
      distance: {
        id: '10 Menit Berkendara',
        en: '10 Mins Drive',
        zh: '驱车 10 分钟'
      },
      icon: ShoppingBag
    },
    {
      id: 'waterfalls',
      category: {
        id: 'Petualangan Alam',
        en: 'Nature Adventure',
        zh: '自然胜地'
      },
      title: {
        id: 'Air Terjun & Sungai Spectacular',
        en: 'Spectacular Waterfalls & Rivers',
        zh: '壮丽瀑布与河流'
      },
      desc: {
        id: 'Saksikan keindahan alam Lampung yang paling megah. Kami siap memandu dan membantu transportasi Anda menuju beberapa sungai jernih dan air terjun tersembunyi yang paling spektakuler di seluruh Lampung Barat—semuanya terletak tidak terlalu jauh dari kenyamanan Villa.',
        en: 'We can assist you in getting to some of the most spectacular rivers and waterfalls in all of Lampung. All of which are not too far from the Villa.',
        zh: '我们可以协助您前往楠榜（Lampung）地区一些最壮丽、最纯净的河流与瀑布。所有的自然奇观距离别墅均较近，交通便捷。'
      },
      badge: {
        id: 'Keindahan Alam',
        en: 'Scenic Spot',
        zh: '自然风光'
      },
      distance: {
        id: 'Jarak Dekat / Berkendara',
        en: 'Short Drive Away',
        zh: '车程不远'
      },
      icon: Trees
    },
    {
      id: 'banana_island',
      category: {
        id: 'Eksplorasi Pulau',
        en: 'Island Getaway',
        zh: '海岛避世'
      },
      title: {
        id: 'Petualangan Pulau Pisang',
        en: 'Banana Island Trip',
        zh: '香蕉岛之旅（Banana Island）'
      },
      desc: {
        id: 'Kami siap mengurus perjalanan perahu terorganisir ke Pulau Pisang (Banana Island) yang eksotis, atau menyewa kapal pribadi sesuai rencana liburan Anda sendiri. Pulau Pisang adalah surga tropis luar biasa untuk bersantai total. Perjalanan memerlukan boat ride dan dapat bergantung pada kondisi cuaca.',
        en: 'We can assist to arrange either an organized boat trip to Banana island or charter a boat to run your own program. Banana island is a spectacular place to unwind. Can be weather dependent as getting there requires a boat ride.',
        zh: '我们可以协助安排前往香蕉岛的有组织船游，或为您租用专船进行专属自由行。香蕉岛是放松身心、避世放空的绝佳圣地。由于需要乘船前往，行程需视天气状况而定。'
      },
      badge: {
        id: 'Liburan Santai',
        en: 'Island Escape',
        zh: '离岛体验'
      },
      distance: {
        id: 'Perlu Naik Perahu',
        en: 'Requires Boat Ride',
        zh: '需搭乘快艇'
      },
      icon: Palmtree
    }
  ];

  const categories = [
    { key: 'all', label: language === 'zh' ? '全部活动' : language === 'en' ? 'All Activities' : 'Semua Aktivitas' },
    { key: 'ocean', label: language === 'zh' ? '海洋与探索' : language === 'en' ? 'Ocean & Water' : 'Lautan & Air' },
    { key: 'nature', label: language === 'zh' ? '自然与人文' : language === 'en' ? 'Nature & Culture' : 'Alam & Budaya' }
  ];

  const getFilteredActivities = () => {
    if (activeTab === 'all') return activities;
    if (activeTab === 'ocean') {
      return activities.filter(a => a.id === 'surfing' || a.id === 'fishing_diving' || a.id === 'banana_island');
    }
    if (activeTab === 'nature') {
      return activities.filter(a => a.id === 'markets' || a.id === 'waterfalls');
    }
    return activities;
  };

  const filtered = getFilteredActivities();

  return (
    <section id="todo" className="py-24 bg-gradient-to-b from-white to-sand-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-sans text-xs tracking-[0.25em] text-ocean-600 uppercase font-bold">
              {language === 'zh' ? '普贡瓦鲁体验' : language === 'en' ? 'The Pugung Walur Experience' : 'Pengalaman Seru Pugung Walur'}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {language === 'zh' ? '周边玩乐与探索' : language === 'en' ? 'Things to Do' : 'Aktivitas Menarik'}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 font-light text-base sm:text-lg leading-relaxed">
            {language === 'zh' 
              ? '发现哈玛拉别墅周边的无穷魅力。无论您热爱冲浪、渴望海钓潜水，还是喜欢亲近自然，我们都会为您提供全面的协助与指南。' 
              : language === 'en' 
              ? 'Discover the endless wonder surrounding Hamara Guest House. From directly in front of our lawn to local hidden treasures, we are delighted to assist your perfect tropical exploration.' 
              : 'Temukan keindahan luar biasa di sekitar Hamara Guest House. Mulai dari pantai tepat di halaman kami hingga permata tersembunyi lokal, kami siap membantu mewujudkan petualangan tropis Anda.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-sand-100 p-1.5 rounded-xl border border-sand-200">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.key
                    ? 'bg-white text-ocean-950 shadow-md border border-slate-100'
                    : 'text-slate-600 hover:text-ocean-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-gold-300 border border-slate-100 transition-all duration-300"
              >
                <div>
                  {/* Category & Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans text-[10px] tracking-widest text-gold-600 uppercase font-bold">
                      {activity.category[language]}
                    </span>
                    <span className="px-2.5 py-1 bg-gold-50 rounded-full font-sans text-[10px] text-gold-700 uppercase font-semibold">
                      {activity.badge[language]}
                    </span>
                  </div>

                  {/* Icon Frame */}
                  <div className="inline-flex p-3 rounded-2xl bg-ocean-50/70 text-ocean-600 mb-6 group-hover:scale-110 group-hover:bg-ocean-100 transition-all duration-300">
                    <IconComponent className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  {/* Title & Details */}
                  <h3 className="font-display font-bold text-xl text-ocean-950 mb-3 group-hover:text-gold-600 transition-colors">
                    {activity.title[language]}
                  </h3>
                  
                  <p className="font-serif text-slate-600 font-light text-sm leading-relaxed mb-6">
                    {activity.desc[language]}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-gold-500" />
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-wider">
                        {activity.distance[language]}
                      </span>
                    </div>
                    
                    {/* Interactive Link / Button */}
                    {activity.id === 'waterfalls' ? (
                      <button
                        onClick={() => setShowWaterfalls(!showWaterfalls)}
                        className="flex items-center gap-1 text-ocean-500 hover:text-gold-600 active:text-gold-700 transition-colors cursor-pointer font-sans text-[11px] font-bold uppercase tracking-wider"
                        id="btn-toggle-waterfalls"
                      >
                        <span>
                          {language === 'zh' ? '了解详情' : language === 'en' ? 'Explore' : 'Detail'}
                        </span>
                        <ChevronRight className={`h-3 w-3 transform transition-transform duration-300 ${showWaterfalls ? 'rotate-90 text-gold-500' : 'group-hover:translate-x-0.5'}`} />
                      </button>
                    ) : activity.id === 'markets' ? (
                      <button
                        onClick={() => setShowMarkets(!showMarkets)}
                        className="flex items-center gap-1 text-ocean-500 hover:text-gold-600 active:text-gold-700 transition-colors cursor-pointer font-sans text-[11px] font-bold uppercase tracking-wider"
                        id="btn-toggle-markets"
                      >
                        <span>
                          {language === 'zh' ? '了解详情' : language === 'en' ? 'Explore' : 'Detail'}
                        </span>
                        <ChevronRight className={`h-3 w-3 transform transition-transform duration-300 ${showMarkets ? 'rotate-90 text-gold-500' : 'group-hover:translate-x-0.5'}`} />
                      </button>
                    ) : activity.id === 'surfing' ? null : (
                      <a
                        href={`https://wa.me/6282177671110?text=${encodeURIComponent(
                          language === 'zh'
                            ? `您好 Tia，我对哈玛拉别墅周边的“${activity.title.zh}”活动很感兴趣。`
                            : language === 'en'
                            ? `Hi Tia, I'm interested in the "${activity.title.en}" activity near Hamara Guest House.`
                            : `Halo Tia, saya tertarik dengan aktivitas "${activity.title.id}" di sekitar Hamara Guest House.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-ocean-500 hover:text-gold-600 transition-colors font-sans text-[11px] font-bold uppercase tracking-wider"
                        id={`btn-explore-${activity.id}`}
                      >
                        <span>
                          {language === 'zh' ? '了解详情' : language === 'en' ? 'Explore' : 'Detail'}
                        </span>
                        <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                  {/* Collapsible Waterfall Detail Buttons */}
                  {activity.id === 'waterfalls' && showWaterfalls && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-dashed border-slate-100 space-y-2.5 overflow-hidden"
                    >
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=-5.049190,103.809679"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-sand-50/70 hover:bg-gold-50/60 border border-sand-100 hover:border-gold-300 transition-all duration-300 group/loc cursor-pointer"
                        id="btn-map-sungai-way-rua"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-xs font-bold text-ocean-950 group-hover/loc:text-gold-600 transition-colors">
                            Sungai Way Rua Pampang
                          </span>
                          <span className="font-serif text-[11px] text-slate-500 italic mt-0.5">
                            {language === 'zh' ? '距离 Hamara 20 分钟车程' : language === 'en' ? '20 mins from Hamara' : '20 menit dari Hamara'}
                          </span>
                        </div>
                        <div className="p-1.5 bg-white text-gold-600 rounded-lg shadow-sm border border-slate-100 group-hover/loc:bg-gold-500 group-hover/loc:text-slate-950 transition-all duration-300">
                          <Compass className="h-3.5 w-3.5 transition-transform duration-500 group-hover/loc:rotate-45" />
                        </div>
                      </a>

                      <a
                        href="https://www.google.com/maps/search/?api=1&query=-5.116617,103.906830"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-sand-50/70 hover:bg-gold-50/60 border border-sand-100 hover:border-gold-300 transition-all duration-300 group/loc cursor-pointer"
                        id="btn-map-terjun-way-pelimbang"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-xs font-bold text-ocean-950 group-hover/loc:text-gold-600 transition-colors">
                            Terjun Way Pelimbang
                          </span>
                          <span className="font-serif text-[11px] text-slate-500 italic mt-0.5">
                            {language === 'zh' ? '距离 Hamara 50 分钟车程' : language === 'en' ? '50 mins from Hamara' : '50 menit dari Hamara'}
                          </span>
                        </div>
                        <div className="p-1.5 bg-white text-gold-600 rounded-lg shadow-sm border border-slate-100 group-hover/loc:bg-gold-500 group-hover/loc:text-slate-950 transition-all duration-300">
                          <Compass className="h-3.5 w-3.5 transition-transform duration-500 group-hover/loc:rotate-45" />
                        </div>
                      </a>
                    </motion.div>
                  )}

                  {/* Collapsible Market Detail Buttons */}
                  {activity.id === 'markets' && showMarkets && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-dashed border-slate-100 space-y-2.5 overflow-hidden"
                    >
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=-5.025714,103.777463"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-sand-50/70 hover:bg-gold-50/60 border border-sand-100 hover:border-gold-300 transition-all duration-300 group/loc cursor-pointer"
                        id="btn-map-pasar-jumat"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-xs font-bold text-ocean-950 group-hover/loc:text-gold-600 transition-colors">
                            Pasar Jum'at Kerbang Langgar
                          </span>
                          <span className="font-serif text-[11px] text-slate-500 italic mt-0.5">
                            {language === 'zh' ? '距离 Hamara 10 分钟车程' : language === 'en' ? '10 mins from Hamara' : '10 menit dari Hamara'}
                          </span>
                        </div>
                        <div className="p-1.5 bg-white text-gold-600 rounded-lg shadow-sm border border-slate-100 group-hover/loc:bg-gold-500 group-hover/loc:text-slate-950 transition-all duration-300">
                          <Compass className="h-3.5 w-3.5 transition-transform duration-500 group-hover/loc:rotate-45" />
                        </div>
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Assist Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-ocean-950 to-ocean-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl"
        >
          {/* Subtle abstract wave lines using Tailwind's radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-gold-400" />
                <span className="font-sans text-xs tracking-[0.2em] text-gold-400 uppercase font-bold">
                  {language === 'zh' ? '哈玛拉管家服务' : language === 'en' ? 'Hamara Concierge Service' : 'Layanan Staf Hamara'}
                </span>
              </div>
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-champagne mb-4 leading-tight">
                {language === 'zh' 
                  ? '想定制您的专属游玩日程吗？' 
                  : language === 'en' 
                  ? 'Need help custom planning your adventures?' 
                  : 'Ingin bantuan merencanakan petualangan Anda?'}
              </h3>
              <p className="font-serif text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                {language === 'zh'
                  ? '我们的管家团队（包括 Ibu Tia）非常高兴能为您提供帮助。不管是安排租赁摩托车、包船出海、机场接送，还是提供集市的出行时间，我们都将确保您拥有高度安全且美好的度假体验。'
                  : language === 'en'
                  ? 'Our onsite team—including Ibu Tia—are delighted to assist in arranging motorbike hire, boat charters, airport transfers, or market timings to ensure you have a highly secure and beautiful experience.'
                  : 'Staf kami di lokasi—termasuk Ibu Tia—dengan senang hati siap membantu mengatur penyewaan motor, carter kapal, antar-jemput bandara, atau jadwal pasar tradisional untuk memastikan kunjungan Anda sepenuhnya aman, nyaman, dan berkesan.'}
              </p>
            </div>
            
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href="https://wa.me/6282177671110?text=Halo%20Tia%2C%20saya%20tertarik%20dengan%20aktivitas%20di%20sekitar%20Hamara%20Guest%20House%20Krui."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
              >
                <span>{t('nav.whatsapp')}</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
