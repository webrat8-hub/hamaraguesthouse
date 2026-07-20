import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getLocalizedGalleryTitles } from '../translations';

export default function GallerySection() {
  const { t, language } = useLanguage();
  const localizedTitles = getLocalizedGalleryTitles(language);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Exterior', 'Bedroom', 'Living Area', 'Outdoor', 'Garden', 'Beach', 'Waves', 'Sunset', 'Hamara Story', 'Bathroom', 'Kitchen'];

  const categoryTranslationMap: Record<string, string> = {
    'All': 'gallery.cat.all',
    'Exterior': 'gallery.cat.exterior',
    'Bedroom': 'gallery.cat.bedroom',
    'Living Area': 'gallery.cat.living',
    'Outdoor': 'gallery.cat.outdoor',
    'Garden': 'gallery.cat.garden',
    'Beach': 'gallery.cat.beach',
    'Waves': 'gallery.cat.waves',
    'Sunset': 'gallery.cat.sunset',
    'Hamara Story': 'gallery.cat.story',
    'Bathroom': 'gallery.cat.bathroom',
    'Kitchen': 'gallery.cat.kitchen'
  };

  const filteredImages = activeTab === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  const openLightbox = (imageSrc: string) => {
    const idx = GALLERY_IMAGES.findIndex(img => img.src === imageSrc);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-sand-50 border-t border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-ocean-600">
            <Camera className="h-4 w-4" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold">
              {t('gallery.accent')}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ocean-950 mb-4 leading-tight">
            {t('gallery.title')}
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mb-6" />
          <p className="font-serif text-slate-600 font-light text-base sm:text-lg leading-relaxed">
            {t('gallery.sub')}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-ocean-500 text-white shadow-md scale-105'
                  : 'bg-white hover:bg-sand-100 text-slate-600 border border-slate-100'
              }`}
            >
              {t(categoryTranslationMap[cat]) || cat}
            </button>
          ))}
        </div>

        {/* Bento/Grid Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => openLightbox(image.src)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-sm border border-slate-100 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-ocean-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="font-sans text-[10px] tracking-widest text-gold-300 uppercase font-semibold mb-1">
                  {t(categoryTranslationMap[image.category]) || image.category}
                </span>
                <h4 className="font-sans font-bold text-sm text-white mb-2 tracking-wide flex items-center justify-between">
                  <span>{localizedTitles[image.id] || image.title}</span>
                  <ZoomIn className="h-4 w-4 text-champagne" />
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Lightbox Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 max-h-[70vh] flex items-center">
                <img
                  src={GALLERY_IMAGES[lightboxIndex].src}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>

              {/* Caption */}
              <div className="text-center mt-5 text-white">
                <span className="font-sans text-[10px] tracking-widest text-gold-500 uppercase font-bold block mb-1">
                  {t(categoryTranslationMap[GALLERY_IMAGES[lightboxIndex].category]) || GALLERY_IMAGES[lightboxIndex].category} ({lightboxIndex + 1} / {GALLERY_IMAGES.length})
                </span>
                <h3 className="font-sans font-bold text-lg tracking-wide text-sand-50 mb-1">
                  {localizedTitles[GALLERY_IMAGES[lightboxIndex].id] || GALLERY_IMAGES[lightboxIndex].title}
                </h3>
                <p className="font-serif text-xs text-slate-400 font-light max-w-lg leading-relaxed">
                  {GALLERY_IMAGES[lightboxIndex].alt}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
