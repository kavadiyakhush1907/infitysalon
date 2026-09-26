import React, { useEffect, useRef } from 'react';
import { Scissors, Smile, Sparkles, HeartHandshake } from 'lucide-react';
import { WHY_INFINITY } from '../data/salonData';
import gsap from 'gsap';

export const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const icons = [Scissors, Smile, Sparkles, HeartHandshake];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified entrance timeline running once: true
      const cards = cardsContainerRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
            The Experience
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#222222] tracking-tight mt-1">
            WHY PEOPLE KEEP COMING BACK
          </h2>
          <p className="text-base text-[#666666] font-light mt-3">
            No attitude, no rush. Just honest haircare, friendly faces, and thoughtful attention to detail right in the heart of Kudasan.
          </p>
        </div>

        {/* 4 Minimal Feature Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_INFINITY.map((item, idx) => {
            const IconComponent = icons[idx];
            return (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-2xl bg-[#F3EFE8]/40 border border-[#222222]/6 hover:border-[#C9A96A]/50 transition-all duration-300 text-left hover:-translate-y-1.5 group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#222222]/10 flex items-center justify-center text-[#222222] group-hover:text-[#C9A96A] transition-colors shadow-xs">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="font-mono text-xs text-[#999999] font-medium">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#222222] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#666666] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
