import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import gsap from 'gsap';

export const Gallery: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('all');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  const tags = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Salon Interior' },
    { id: 'hairstyles', label: 'Hair Styles' },
    { id: 'haircolour', label: 'Hair Colour' },
    { id: 'bridal', label: 'Bridal & Occasions' },
  ];

  const filteredItems = activeTag === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.tag === activeTag);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified entrance timeline for the gallery grid with once: true
      const items = galleryGridRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryGridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTag]);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    const nextIdx = (selectedIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIdx(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    const nextIdx = (selectedIdx + 1) % filteredItems.length;
    setSelectedIdx(nextIdx);
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF9F6] border-t border-[#222222]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-3 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
              Visual Journal
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#222222] tracking-tight">
              THE INFINITY LOOK
            </h2>
            <p className="text-base text-[#666666] font-light">
              Glimpses into our styling chairs, color transformations, and Kudasan studio ambience.
            </p>
          </div>

          {/* Gallery Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE8] rounded-2xl border border-[#222222]/5">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeTag === tag.id
                    ? 'bg-[#FAF9F6] text-[#222222] shadow-xs font-semibold'
                    : 'text-[#666666] hover:text-[#222222]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Gallery Grid with CSS GPU Hover Zooms */}
        <div
          ref={galleryGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="gallery-card group relative rounded-3xl overflow-hidden aspect-[4/4] sm:aspect-[4/5] bg-[#222222] cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                loading="lazy"
                decoding="async"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white text-left">
                <div className="flex justify-end">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A96A] font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#FAF9F6]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && filteredItems[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[selectedIdx].image}
              alt={filteredItems[selectedIdx].title}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain mx-auto"
            />
            <div className="p-4 bg-black/85 text-left text-white flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#C9A96A] font-medium">
                  {filteredItems[selectedIdx].category}
                </p>
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#FAF9F6]">
                  {filteredItems[selectedIdx].title}
                </h4>
              </div>
              <span className="text-xs text-white/50">
                {selectedIdx + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
