import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowUpRight, Quote } from 'lucide-react';
import { REVIEWS, SALON_INFO } from '../data/salonData';
import gsap from 'gsap';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ratingBadgeRef = useRef<HTMLDivElement>(null);
  const starContainerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Single unified scroll entrance animation with once: true
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(
        ratingBadgeRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.4'
      );

      const stars = starContainerRef.current?.querySelectorAll('.star-icon');
      if (stars && stars.length > 0) {
        tl.fromTo(
          stars,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' },
          '-=0.3'
        );
      }

      if (carouselContainerRef.current) {
        tl.fromTo(
          carouselContainerRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" ref={sectionRef} className="py-20 sm:py-28 bg-[#F3EFE8]/40 border-t border-[#222222]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div ref={headerRef} className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
                Client Voices
              </span>
              <span className="text-[#C9A96A]/60">·</span>
              
              {/* Rating Scale & Sequential Stars */}
              <div ref={ratingBadgeRef} className="flex items-center gap-1.5 text-xs text-[#444444] font-medium">
                <div ref={starContainerRef} className="flex items-center text-[#C9A96A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon w-3.5 h-3.5 fill-[#C9A96A]" />
                  ))}
                </div>
                <span className="font-semibold text-[#222222]">4.8</span>
                <span className="text-[#777777]">({SALON_INFO.reviewCount.toLocaleString()} Google Reviews)</span>
              </div>
            </div>

            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#222222] tracking-tight">
              WHAT CLIENTS SAY
            </h2>
            <p className="text-base text-[#666666] font-light">
              Real reflections from regular visitors and new faces who trust our chairs.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#222222]/15 bg-[#FAF9F6] hover:bg-[#FAF9F6] hover:border-[#222222] flex items-center justify-center text-[#222222] transition-colors cursor-pointer active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[#222222]/15 bg-[#FAF9F6] hover:bg-[#FAF9F6] hover:border-[#222222] flex items-center justify-center text-[#222222] transition-colors cursor-pointer active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Display */}
        <div
          ref={carouselContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REVIEWS.map((rev, idx) => {
            return (
              <div
                key={rev.id}
                className={`p-7 rounded-3xl bg-[#FAF9F6] border border-[#222222]/8 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between text-left transition-all duration-300 ${
                  idx === currentIndex ? 'ring-1 ring-[#C9A96A]/60 shadow-sm -translate-y-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5 text-[#C9A96A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C9A96A]" />
                      ))}
                    </div>

                    <Quote className="w-4 h-4 text-[#C9A96A]/30" />
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-[14px] text-[#333333] font-light italic leading-relaxed mb-6">
                    “{rev.text}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#222222]/6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-[#222222]">
                      {rev.author}
                    </h4>
                    {rev.service && (
                      <span className="text-[11px] text-[#777777]">
                        {rev.service}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#999999] font-medium">
                    Google
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Read More on Google Button */}
        <div className="mt-12 text-center">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#222222] hover:text-[#C9A96A] transition-colors py-2 px-4 rounded-full border border-[#222222]/15 hover:border-[#C9A96A] active:scale-95"
          >
            <span>Read More Reviews on Google</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A96A]" />
          </a>
        </div>

      </div>
    </section>
  );
};
