import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Copy, Check, Navigation } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import gsap from 'gsap';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified entrance timeline with once: true
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(
        rightColRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF9F6] border-t border-[#222222]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
            Find Us
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#222222] tracking-tight mt-1">
            COME SAY HELLO
          </h2>
          <p className="text-base text-[#666666] font-light mt-1">
            Conveniently situated on the 1st Floor at Vrundavan Trade Center (VTC), Reliance Cross Road.
          </p>
        </div>

        {/* 2-Column Split Entrance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Address, Hours, Contact Card */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 bg-[#FFFFFF] rounded-3xl p-7 sm:p-9 border border-[#222222]/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-6">
              {/* Salon Name & Status */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A96A] font-semibold">
                  Location &amp; Hours
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#222222] mt-1">
                  {SALON_INFO.name}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#2e7d32]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2e7d32] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2e7d32]" />
                  </span>
                  <span>{SALON_INFO.hoursStatus}</span>
                  <span className="text-[#888888] font-normal">· Daily 10 AM – 9 PM</span>
                </div>
              </div>

              {/* Address with Copy Button */}
              <div className="pt-2 border-t border-[#222222]/6 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <MapPin className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                      {SALON_INFO.address}
                    </p>
                    <p className="text-[11px] text-[#777777] mt-1">
                      Landmark: {SALON_INFO.landmark}
                    </p>
                    <p className="text-[11px] text-[#999999]">
                      Plus Code: {SALON_INFO.plusCode}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#222222] py-1 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2e7d32]" />
                        <span className="text-[#2e7d32] font-medium">Address copied to clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone & Direct Dial */}
              <div className="pt-2 border-t border-[#222222]/6">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C9A96A] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] block">Direct Line</span>
                    <a
                      href={`tel:${SALON_INFO.phoneRaw}`}
                      className="text-base font-semibold text-[#222222] hover:text-[#C9A96A] transition-colors"
                    >
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Visiting Tips */}
              <div className="pt-2 border-t border-[#222222]/6 text-xs text-[#666666] space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C9A96A]" />
                  <span>Elevator access available to the 1st floor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#C9A96A]" />
                  <span>Ample commercial center parking at Reliance Cross Rd</span>
                </div>
              </div>

            </div>

            {/* Direct Google Maps Action Button with Micro-Animation */}
            <div className="pt-4">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#222222] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
              >
                <span>Get Directions in Google Maps</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Location View */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#222222]/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-[#F3EFE8] relative flex flex-col min-h-[360px] lg:min-h-full"
          >
            <iframe
              title="Infinity The Unisex Salon Location Map"
              src="https://maps.google.com/maps?q=Infinity+the+unisex+salon+Vrundavan+Trade+Center+Kudasan+Gandhinagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Quick Action Overlay on Map */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-[#FAF9F6]/95 p-3 sm:p-4 rounded-2xl border border-[#222222]/10 shadow-md text-left max-w-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-['Cormorant_Garamond'] text-base font-bold text-[#222222]">
                    Infinity The Unisex Salon
                  </h4>
                  <p className="text-[11px] text-[#666666]">
                    Vrundavan Trade Center, Kudasan
                  </p>
                </div>
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#222222] text-[#FAF9F6] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#C9A96A] hover:text-[#222222] transition-colors shrink-0"
                >
                  Navigate
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
