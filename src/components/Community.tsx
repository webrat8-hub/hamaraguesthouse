import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Heart, Star, GraduationCap, Trash2, Wind, HelpCircle } from 'lucide-react';

export default function Community() {
  const { language } = useLanguage();

  const content = {
    en: {
      accent: 'Giving Back to Lampung',
      title: 'Community & Philanthropy',
      intro1: 'The owner of the guesthouse was born and raised in Lampung. The importance of giving back to the local community is 100% paramount in our mission.',
      intro2: 'A percentage of all profits from the Hamara guesthouse goes directly to community projects and assisting those in need.',
      impactHeader: 'Some Measures We Have Taken Include:',
      impacts: [
        {
          title: 'Village-Wide Waste Disposal',
          desc: 'Established an organized waste disposal system across Pugung walur village to help keep the pristine beaches as plastic-free as possible.',
          icon: Trash2
        },
        {
          title: 'Regular Beach Cleanups',
          desc: 'Hamara staff and family members regularly clean up the public beach area from marine debris and plastic washed up on the coast.',
          icon: Wind
        },
        {
          title: 'Local School Support',
          desc: 'Supplied and implemented brand-new wooden seating structures and cooling fans in several local school classrooms to improve learning environments.',
          icon: GraduationCap
        },
        {
          title: 'Educational Sponsorships',
          desc: 'Helping to sponsor children from disadvantaged families or orphans to secure their school enrollment and give them the best chance at a bright future.',
          icon: Star
        }
      ],
      nextInitiativeTitle: 'Our Next Initiative: Preventative Dental Care',
      nextInitiativeDesc: 'The health of local children is severely affected by poor tooth hygiene. It is a significant problem in Lampung village life, where most children consume processed sugars without routine brushing. Our next goal is to distribute free quality toothbrushes and toothpaste to the village, and host fun educational sessions on the importance of dental hygiene for their long-term health.',
      ctaText: 'By staying with us, you are actively helping support these initiatives.'
    },
    id: {
      accent: 'Kontribusi Sosial Lampung',
      title: 'Komunitas & Filantropi',
      intro1: 'Pemilik guesthouse lahir dan dibesarkan langsung di Lampung. Memberi kembali kepada masyarakat lokal adalah misi utama yang 100% mutlak dan terpenting bagi kami.',
      intro2: 'Sebagian persentase dari seluruh keuntungan Hamara Guest House didedikasikan secara langsung untuk proyek-proyek komunitas dan membantu mereka yang membutuhkan.',
      impactHeader: 'Beberapa Langkah Nyata Yang Telah Kami Lakukan:',
      impacts: [
        {
          title: 'Sistem Pembuangan Sampah Desa',
          desc: 'Membangun sistem pembuangan sampah teratur di seluruh Desa Pugung untuk membantu menjaga pantai yang indah tetap bebas dari limbah plastik.',
          icon: Trash2
        },
        {
          title: 'Pembersihan Pantai Berkala',
          desc: 'Staf Hamara beserta anggota keluarga secara rutin bergotong-royong membersihkan area pantai umum dari sampah kiriman laut yang terdampar.',
          icon: Wind
        },
        {
          title: 'Fasilitas Sekolah Lokal',
          desc: 'Menyediakan dan memasang bangku belajar kayu baru serta kipas angin di beberapa ruang kelas sekolah lokal untuk menciptakan suasana belajar yang nyaman.',
          icon: GraduationCap
        },
        {
          title: 'Sponsor Pendidikan Anak',
          desc: 'Membantu mensponsori anak-anak dari keluarga prasejahtera atau yatim piatu untuk memastikan mereka tetap bersekolah dan meraih masa depan cerah.',
          icon: Star
        }
      ],
      nextInitiativeTitle: 'Inisiatif Berikutnya: Kesehatan Gigi & Mulut Pencegahan',
      nextInitiativeDesc: 'Kesehatan anak-anak lokal sangat dipengaruhi oleh kebersihan gigi yang kurang terjaga. Ini adalah masalah besar di pedesaan Lampung, di mana anak-anak mengonsumsi terlalu banyak gula olahan tanpa kebiasaan menyikat gigi yang teratur. Langkah kami selanjutnya adalah mendistribusikan sikat gigi dan pasta gigi gratis secara merata ke desa, serta memberikan edukasi menyenangkan mengenai pentingnya merawat gigi demi kesehatan masa depan mereka.',
      ctaText: 'Dengan menginap bersama kami, Anda turut berkontribusi aktif mendukung seluruh inisiatif sosial ini.'
    },
    zh: {
      accent: '回馈楠榜本土地带',
      title: '社区与慈善公益',
      intro1: '别墅创始人土生土长于楠榜（Lampung）。对于我们而言，回馈本地社区是哈玛拉别墅 100% 至关重要、不容妥协的核心使命。',
      intro2: '哈玛拉别墅的一部分利润将直接用于社区公益项目，并向有需要的人群提供切实援助。',
      impactHeader: '我们目前已付诸实践的举措包括：',
      impacts: [
        {
          title: '全村垃圾清运系统',
          desc: '在整个普贡村建立系统的垃圾清运与处理机制，尽最大可能保持原始沙滩免受塑料等废弃物的污染。',
          icon: Trash2
        },
        {
          title: '常态化沙滩清洁',
          desc: '哈玛拉员工及家属定期清理海岸线上因潮汐冲刷上岸的各类海洋垃圾与生活废弃物，保护生态。',
          icon: Wind
        },
        {
          title: '改善学校基础设施',
          desc: '为部分当地学校捐赠并安装了全新的木质课桌椅与高风量电风扇，切实改善孩子们的课堂学习环境。',
          icon: GraduationCap
        },
        {
          title: '资助贫困儿童教育',
          desc: '资助困难家庭的子女或失去双亲的孤儿，为其提供坚实的教育经费保障，助力他们改变命运。',
          icon: Star
        }
      ],
      nextInitiativeTitle: '下一阶段计划：儿童口腔健康预防保健',
      nextInitiativeDesc: '由于缺乏良好的口腔卫生习惯，当地儿童的身体健康正受到严重的蛀牙困扰。这是楠榜村庄中一个普遍的问题：孩子们食用了大量精制糖，却很少刷牙。我们的下一个目标是向整个村庄免费分发优质牙刷与牙膏，并开展趣味牙齿卫生宣教，让孩子们了解保护牙齿对未来健康的重要性。',
      ctaText: '您的每一次入住，都是对这些可持续社区公益项目的直接支持与奉献。'
    }
  };

  const current = content[language] || content.en;

  return (
    <section id="community" className="py-24 bg-sand-50/40 border-t border-b border-sand-100/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
              {current.accent}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {current.title}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold-50 rounded-2xl text-gold-600">
                  <Heart className="h-6 w-6 stroke-[1.5] fill-gold-100" />
                </div>
                <h3 className="font-display font-bold text-xl text-ocean-950">
                  {language === 'zh' ? '关怀本土，重在行动' : language === 'en' ? 'Our Local Mission' : 'Misi Sosial Kami'}
                </h3>
              </div>

              <div className="font-serif text-slate-600 font-light text-base leading-relaxed space-y-4">
                <p>{current.intro1}</p>
                <p className="font-semibold text-ocean-950 bg-gold-50/50 p-4 rounded-xl border-l-4 border-gold-500">
                  {current.intro2}
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Impacts and Next Initiative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm">
              <h4 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-widest mb-6">
                {current.impactHeader}
              </h4>

              {/* Grid of accomplishments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {current.impacts.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-sand-50/40 border border-transparent hover:border-sand-100/50 transition-all duration-300">
                      <div className="p-2 bg-ocean-50 text-ocean-600 rounded-xl shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-wide mb-1">
                          {item.title}
                        </h5>
                        <p className="font-serif text-[12px] text-slate-500 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Initiative Card */}
              <div className="border border-gold-100 rounded-2xl p-6 bg-gold-50/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-200/20 rounded-full filter blur-xl pointer-events-none" />
                
                <div className="flex gap-2.5 items-center mb-3">
                  <div className="p-1 bg-gold-500 text-slate-950 rounded-full shrink-0">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </div>
                  <h5 className="font-sans font-bold text-xs text-ocean-950 uppercase tracking-wider">
                    {current.nextInitiativeTitle}
                  </h5>
                </div>
                
                <p className="font-serif text-xs text-slate-600 leading-relaxed font-light">
                  {current.nextInitiativeDesc}
                </p>
              </div>

              {/* Bottom CTA */}
              <p className="font-sans text-[11px] font-bold text-gold-600 uppercase tracking-widest text-center mt-8">
                ✨ {current.ctaText}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
