import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/salonData';
import gsap from 'gsap';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair & Styling' },
    { id: 'beauty', label: 'Skin & Beauty' },
    { id: 'occasions', label: 'Bridal & Occasions' },
    { id: 'family', label: 'Family & Kids' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  // One-time staggered cascade entrance on scroll
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div className="space-y-3 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
              Our Menu
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#222222] tracking-tight">
              WHAT WE DO
            </h2>
            <p className="text-base text-[#666666] font-light">
              A little something for everyone. Unisex grooming, coloring, rituals, and occasion styling.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE8] rounded-2xl border border-[#222222]/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#FAF9F6] text-[#222222] shadow-xs font-semibold'
                    : 'text-[#666666] hover:text-[#222222] hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with GPU-Friendly Hover Transitions */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group relative rounded-2xl p-6 sm:p-7 bg-[#FFFFFF] border border-[#222222]/8 hover:border-[#C9A96A]/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_24px_rgba(201,169,106,0.12)] transition-all duration-300 hover:-translate-y-1.5 text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Row: Number & Category */}
                <div className="flex items-center justify-between text-xs text-[#888888] mb-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#C9A96A]">
                    {service.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#777777]">
                    {service.categoryLabel}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#222222] group-hover:text-[#111111] transition-colors mb-2.5">
                  {service.name}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-[13px] text-[#666666] leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Bottom Interactive Prompt */}
              <div className="mt-6 pt-4 border-t border-[#222222]/5 flex items-center justify-between text-xs font-medium text-[#444444] group-hover:text-[#222222]">
                <span className="text-[11px] uppercase tracking-wider text-[#888888] group-hover:text-[#C9A96A] transition-colors">
                  Tap to view details
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#222222]/10 group-hover:border-[#C9A96A] flex items-center justify-center transition-colors group-hover:bg-[#C9A96A] group-hover:text-[#222222]">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note below services */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#777777] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Consultations are complimentary. Walk-ins are always welcomed subject to stylist availability.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
