import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_SERVICES, ServiceItem, SERVICES } from '../data/salonData';
import { LazyImage } from './LazyImage';
import gsap from 'gsap';

interface FeaturedServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified entrance timeline running once: true
      gsap.fromTo(
        cardsContainerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFeatureClick = (title: string) => {
    let match: ServiceItem | undefined;
    if (title.includes('COLOUR')) {
      match = SERVICES.find((s) => s.id === 'hair-coloring');
    } else if (title.includes('KERATIN')) {
      match = SERVICES.find((s) => s.id === 'keratin-treatment');
    } else if (title.includes('BRIDAL')) {
      match = SERVICES.find((s) => s.id === 'bridal-services');
    }
    if (match) {
      onSelectService(match);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#F3EFE8]/50 border-y border-[#222222]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
            Signature Focus
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#222222] tracking-tight mt-1">
            CLIENT FAVORITES
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-light mt-1">
            Transformative hair transformations crafted with premium formulations.
          </p>
        </div>

        {/* 3 Large Visual Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start"
        >
          {FEATURED_SERVICES.map((item) => (
            <div
              key={item.title}
              onClick={() => handleFeatureClick(item.title)}
              style={{ aspectRatio: '4 / 5' }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_6px_20px_rgba(0,0,0,0.05)] bg-[#222222] cursor-pointer text-left flex flex-col justify-end p-6 sm:p-7"
            >
              {/* Background Image with Zoom */}
              <LazyImage
                src={item.image}
                fallbackKey="salon"
                alt={item.title}
                aspectRatio="4 / 5"
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:from-black/90" />

              {/* Content Box */}
              <div className="relative z-10 space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C9A96A] tracking-wider font-semibold">
                    {item.number}
                  </span>
                  
                  {/* Circular Arrow Badge */}
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#C9A96A] group-hover:text-[#222222] group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#FAF9F6] tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#FAF9F6]/90 font-light leading-relaxed">
                  {item.tagline}
                </p>

                <p className="text-[11px] text-[#FAF9F6]/70 font-light pt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
