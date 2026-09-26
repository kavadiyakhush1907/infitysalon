import React, { useEffect, useRef } from 'react';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import gsap from 'gsap';

export const ContactCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified entrance timeline running once: true
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        }
      );

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.4)',
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle organic light accent backdrop without heavy blur cost */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F3EFE8]/60 blur-2xl pointer-events-none -z-10" />

      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
          Visit Us Today
        </span>

        <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-light text-[#222222] tracking-tight mt-3 mb-4 leading-tight">
          READY FOR YOUR NEXT LOOK?
        </h2>

        <p className="text-base sm:text-lg text-[#666666] font-light max-w-xl mx-auto mb-10 leading-relaxed">
          “Come in, sit back and let’s create something you’ll love.”
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#222222] text-[#FAF9F6] text-xs sm:text-[13px] font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors duration-200 shadow-md active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#C9A96A]" />
            <span>CALL NOW</span>
          </a>

          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#222222]/20 hover:border-[#222222] bg-[#FAF9F6] hover:bg-[#F3EFE8] text-[#222222] text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-colors duration-200 active:scale-95 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C9A96A]" />
            <span>GET DIRECTIONS</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <p className="text-xs text-[#888888] mt-8 font-light">
          {SALON_INFO.addressShort} · Open daily until 9 PM
        </p>

      </div>
    </section>
  );
};
