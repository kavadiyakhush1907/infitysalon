import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Scissors, Palette, Sparkles, Heart } from 'lucide-react';

interface PinnedShowcaseProps {
  onOpenBookingModal: () => void;
}

const PINNED_ITEMS = [
  {
    tag: 'PRECISION & MOVEMENT',
    title: 'HAIR',
    subtitle: 'Tailored Cuts & Textures',
    description: 'Bespoke unisex cuts shaped to your face, texture, and everyday lifestyle. Precision scissors and artistic razors.',
    image: '/src/assets/images/infinity_hero_styling_1790420043245.jpg',
    icon: Scissors,
  },
  {
    tag: "L'ORÉAL COLORBAR",
    title: 'COLOUR',
    subtitle: 'Dimensional Shading & Balayage',
    description: 'Luminous multidimensional hair color, sunlit highlights, and gentle glosses formulated to preserve natural hair health.',
    image: '/src/assets/images/infinity_hair_color_1790420058500.jpg',
    icon: Palette,
  },
  {
    tag: 'RITUAL & FINISH',
    title: 'STYLE',
    subtitle: 'Volume Blowouts & Keratin Glass',
    description: 'Silky smooth keratin smoothing and bouncy blowouts that resist Gujarat humidity and leave an unforgettable mirror shine.',
    image: '/src/assets/images/infinity_salon_interior_1790420024360.jpg',
    icon: Sparkles,
  },
  {
    tag: 'ELEGANCE & CARE',
    title: 'BEAUTY',
    subtitle: 'Skin Glow & Bridal Perfection',
    description: 'Refreshing facial therapies, clean threading, hot towel beard grooming, and bridal looks crafted for special memories.',
    image: '/src/assets/images/infinity_bridal_look_1790420075472.jpg',
    icon: Heart,
  },
];

export const PinnedShowcase: React.FC<PinnedShowcaseProps> = ({ onOpenBookingModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Kinetic Text Ribbon (Scrub only while visible)
      if (marqueeRef.current && containerRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { x: 60 },
          {
            x: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3,
            },
          }
        );
      }

      // 2. Optimized Pinned Sequence (Desktop only, throttled index change to prevent React re-render lag)
      if (isDesktop && !prefersReducedMotion && pinSectionRef.current) {
        ScrollTrigger.create({
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            const newIndex = Math.min(
              PINNED_ITEMS.length - 1,
              Math.floor(p * PINNED_ITEMS.length)
            );
            // ONLY trigger React re-render when index genuinely changes!
            if (newIndex !== activeIndexRef.current) {
              activeIndexRef.current = newIndex;
              setActiveIndex(newIndex);
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentItem = PINNED_ITEMS[activeIndex];
  const IconComponent = currentItem.icon;

  return (
    <section ref={containerRef} className="bg-[#1a1a1a] text-[#FAF9F6] relative overflow-hidden">
      
      {/* Scroll-based text effect moving horizontally */}
      <div className="py-5 border-y border-white/10 overflow-hidden bg-black/40">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap flex items-center gap-8 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C9A96A] font-medium"
        >
          <span>HAIR</span>
          <span className="text-white/30">•</span>
          <span>BEAUTY</span>
          <span className="text-white/30">•</span>
          <span>STYLE</span>
          <span className="text-white/30">•</span>
          <span>CONFIDENCE</span>
          <span className="text-white/30">•</span>
          <span>HAIR</span>
          <span className="text-white/30">•</span>
          <span>BEAUTY</span>
          <span className="text-white/30">•</span>
          <span>STYLE</span>
          <span className="text-white/30">•</span>
          <span>CONFIDENCE</span>
          <span className="text-white/30">•</span>
          <span>INFINITY THE UNISEX SALON</span>
        </div>
      </div>

      {/* Pinned Showcase Container */}
      <div
        ref={pinSectionRef}
        className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative"
      >
        {/* Background Image Cross-Fade */}
        <div className="absolute inset-0 z-0">
          {PINNED_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === activeIndex ? 'opacity-30' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/75 to-[#1a1a1a] pointer-events-none" />
        </div>

        {/* Content Box */}
        <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Big Pinned Changing Typography */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-3">
              {PINNED_ITEMS.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => {
                    activeIndexRef.current = idx;
                    setActiveIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-10 bg-[#C9A96A]'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View ${item.title}`}
                />
              ))}
              <span className="text-xs font-mono text-[#C9A96A] ml-2">
                0{activeIndex + 1} / 0{PINNED_ITEMS.length}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96A] font-semibold flex items-center gap-2">
                <IconComponent className="w-4 h-4 text-[#C9A96A]" />
                {currentItem.tag}
              </span>

              {/* Big Animated Title */}
              <h2 className="font-['Cormorant_Garamond'] text-6xl sm:text-8xl lg:text-9xl font-light tracking-tight text-[#FAF9F6] leading-none transition-all duration-300">
                {currentItem.title}
              </h2>

              <p className="font-['Cormorant_Garamond'] text-xl sm:text-2xl text-[#FAF9F6]/90 italic font-normal">
                {currentItem.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed font-light">
              {currentItem.description}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF9F6] text-[#222222] text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors cursor-pointer shadow-lg active:scale-95"
              >
                <span>Book This Service</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/15 shadow-xl bg-black">
              {PINNED_ITEMS.map((item, idx) => (
                <img
                  key={item.title}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
                    idx === activeIndex
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96A] font-semibold block">
                  Studio Craft
                </span>
                <p className="font-['Cormorant_Garamond'] text-xl text-[#FAF9F6] font-medium">
                  {currentItem.subtitle}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
