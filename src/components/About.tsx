import React, { useEffect, useRef } from 'react';
import { Star, Users, Scissors, Award, Check } from 'lucide-react';
import gsap from 'gsap';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Counter targets refs
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Single unified entrance timeline that runs once: true
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        [labelRef.current, headingRef.current, paragraphRef.current, checklistRef.current],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        imageFrameRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        statsContainerRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      )
      .add(() => {
        // Single unified counter animation running once
        const countObj = { progress: 0 };
        gsap.to(countObj, {
          progress: 1,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            const p = countObj.progress;
            if (stat1Ref.current) {
              const r = 4.0 + 0.8 * p;
              stat1Ref.current.innerText = r.toFixed(1) + '★';
            }
            if (stat2Ref.current) {
              const c = Math.round(1400 + 239 * p);
              stat2Ref.current.innerText = c.toLocaleString() + '+';
            }
            if (stat3Ref.current) {
              const s = Math.round(12 + 22 * p);
              stat3Ref.current.innerText = s + '+';
            }
            if (stat4Ref.current) {
              const h = Math.round(38000 + 9000 * p);
              stat4Ref.current.innerText = h.toLocaleString() + '+';
            }
          },
        });
      }, '-=0.2');

      // Subtle desktop-only image parallax (25px max)
      if (isDesktop && imageRef.current && imageFrameRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -20 },
          {
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FAF9F6] relative border-t border-[#222222]/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Story & Salon Ambience Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div
              ref={labelRef}
              className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold"
            >
              About Infinity
            </div>
            
            <h2
              ref={headingRef}
              className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl lg:text-5xl font-light text-[#222222] tracking-tight leading-[1.12]"
            >
              MORE THAN JUST A HAIRCUT.
            </h2>

            <p
              ref={paragraphRef}
              className="text-base sm:text-lg text-[#555555] leading-relaxed font-light"
            >
              Welcome to Infinity the Unisex Salon — a modern space in Kudasan, Gandhinagar where good hair, good vibes and great service come together. Whether it’s a fresh haircut, hair colour, treatment, styling or a complete makeover, our goal is simple — help you look your best and leave feeling even better.
            </p>

            <div
              ref={checklistRef}
              className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-[#444444]"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C9A96A]/20 flex items-center justify-center text-[#B59353]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Unisex hair &amp; aesthetic styling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C9A96A]/20 flex items-center justify-center text-[#B59353]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Professional salon-grade products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C9A96A]/20 flex items-center justify-center text-[#B59353]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Friendly, no-rush personalized care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C9A96A]/20 flex items-center justify-center text-[#B59353]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Prime VTC Kudasan 1st floor location</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parallax Salon Interior Image */}
          <div className="lg:col-span-5">
            <div
              ref={imageFrameRef}
              className="relative rounded-3xl overflow-hidden shadow-md bg-[#F3EFE8] group border border-[#222222]/8 h-80 sm:h-96"
            >
              <img
                ref={imageRef}
                src="/src/assets/images/infinity_salon_interior_1790420024360.jpg"
                alt="Infinity The Unisex Salon interior in Kudasan Gandhinagar"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white text-left z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#FAF9F6]/80 font-medium">Inside Infinity</span>
                <p className="font-['Cormorant_Garamond'] text-lg font-medium italic text-[#FAF9F6]">
                  A calming sanctuary with backlit mirrors &amp; L'Oréal ColorBar
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Statistics Row with Animated Count-Up */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-[#222222]/8">
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {/* Stat 1 */}
            <div className="text-left p-4 sm:p-5 rounded-2xl bg-[#F3EFE8]/40 border border-[#222222]/5">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                  Google Rating
                </span>
              </div>
              <div
                ref={stat1Ref}
                className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#222222] tracking-tight"
              >
                4.8★
              </div>
              <p className="text-xs text-[#666666] mt-1.5 font-light">
                Consistently rated top tier
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-left p-4 sm:p-5 rounded-2xl bg-[#F3EFE8]/40 border border-[#222222]/5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                  Google Reviews
                </span>
              </div>
              <div
                ref={stat2Ref}
                className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#222222] tracking-tight"
              >
                1,639+
              </div>
              <p className="text-xs text-[#666666] mt-1.5 font-light">
                Verified local clients
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-left p-4 sm:p-5 rounded-2xl bg-[#F3EFE8]/40 border border-[#222222]/5">
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                  Modern Services
                </span>
              </div>
              <div
                ref={stat3Ref}
                className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#222222] tracking-tight"
              >
                34+
              </div>
              <p className="text-xs text-[#666666] mt-1.5 font-light">
                Hair, skin, beard &amp; bridal
              </p>
            </div>

            {/* Stat 4 */}
            <div className="text-left p-4 sm:p-5 rounded-2xl bg-[#F3EFE8]/40 border border-[#222222]/5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                  Happy Customers
                </span>
              </div>
              <div
                ref={stat4Ref}
                className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#222222] tracking-tight"
              >
                47,000+
              </div>
              <p className="text-xs text-[#666666] mt-1.5 font-light">
                Serving Gandhinagar &amp; Kudasan
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
