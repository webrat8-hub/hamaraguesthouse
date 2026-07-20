import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { IMAGES } from '../data';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HamaraStory() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const storyImages = [
    { src: IMAGES.hamaraStory1, alt: 'Hamara Story Chapter 1', caption: 'g35' },
    { src: IMAGES.hamaraStory2, alt: 'Hamara Story Chapter 2', caption: 'g36' },
    { src: IMAGES.hamaraStory3, alt: 'Hamara Story Chapter 3', caption: 'g37' },
    { src: IMAGES.hamaraStory4, alt: 'Hamara Story Chapter 4', caption: 'g38' },
    { src: IMAGES.hamaraStory5, alt: 'Hamara Story Chapter 5', caption: 'g39' },
    { src: IMAGES.hamaraStory6, alt: 'Hamara Story Chapter 6', caption: 'g40' },
    { src: IMAGES.hamaraStory7, alt: 'Hamara Story Chapter 7', caption: 'g41' },
    { src: IMAGES.hamaraStory8, alt: 'Hamara Story Chapter 8', caption: 'g42' },
    { src: IMAGES.hamaraStory9, alt: 'Hamara Story Chapter 9', caption: 'g43' },
  ];

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storyImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [storyImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + storyImages.length) % storyImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % storyImages.length);
  };

  return (
    <section id="story" className="py-24 bg-gradient-to-b from-sand-50 to-white overflow-hidden border-t border-b border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Detailed Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Heading Accent */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-8 bg-gold-500" />
              <span className="font-sans text-xs tracking-[0.25em] text-gold-600 uppercase font-bold">
                {t('story.title')}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 leading-tight mb-6">
              {t('story.subtitle')}
            </h2>

            {/* Paragraph Description */}
            <div className="font-serif text-slate-700 text-sm sm:text-base leading-relaxed space-y-5 font-light text-justify">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-ocean-700 first-letter:mr-3 first-letter:float-left">
                {t('story.p1')}
              </p>
              <p>{t('story.p2')}</p>
              <p className="border-l-2 border-gold-400 pl-4 italic text-slate-600 bg-gold-50/20 py-2 rounded-r-lg">
                "{t('story.p3')}"
              </p>
              <p>{t('story.p4')}</p>
              <p>{t('story.p5')}</p>
              <p>{t('story.p6')}</p>
              <p className="font-medium text-ocean-900">{t('story.p7')}</p>
            </div>

            {/* Signature or Badge */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gold-100 border-2 border-white flex items-center justify-center text-gold-600">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-ocean-950">
                  Ibu Tia & Family
                </h4>
                <p className="font-serif text-[11px] text-slate-400 italic">
                  Founders of Hamara Guest House
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Image Slider with Thumbnail strip */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-sand-200 bg-white p-2">
              <div className="relative h-[350px] sm:h-[420px] rounded-xl overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={storyImages[currentSlide].src}
                    alt={storyImages[currentSlide].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
                
                {/* Visual Overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Left/Right Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-ocean-600 transition shadow-md hover:scale-105 z-10"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-ocean-600 transition shadow-md hover:scale-105 z-10"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Counter Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white font-sans text-[11px] font-semibold tracking-wider uppercase">
                  {currentSlide + 1} / {storyImages.length}
                </div>

                {/* Caption tag */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <p className="font-sans text-xs font-semibold tracking-wider uppercase text-gold-300">
                    Hamara Album
                  </p>
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="grid grid-cols-9 gap-1.5 mt-2.5 px-0.5">
                {storyImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      currentSlide === idx ? 'border-gold-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Story Timeline visual decorators */}
            <div className="mt-6 p-4 rounded-xl bg-sand-100/50 border border-sand-200 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white text-gold-600 shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="font-sans font-semibold text-ocean-950 block">Authentic Village Heritage</span>
                <span className="font-serif text-slate-500 font-light">Meticulously preserving coral walls since 1950</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
