import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Phone, MapPin, Globe } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const brandColRef = useRef<HTMLDivElement>(null);
  const linksColRef = useRef<HTMLDivElement>(null);
  const externalColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [brandColRef.current, linksColRef.current, externalColRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-[#FAF9F6] border-t border-[#222222]/8 pt-16 pb-24 sm:pb-16 text-left overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#222222]/8">
          
          {/* Brand Info */}
          <div ref={brandColRef} className="md:col-span-5 space-y-3">
            <div className="flex flex-col">
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold tracking-[0.2em] text-[#222222] leading-tight">
                {SALON_INFO.brandName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#777777] font-medium leading-none">
                {SALON_INFO.subtitle}
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-[#666666] leading-relaxed font-light pt-2 max-w-sm">
              Modern hair, beauty, styling &amp; grooming for everyone. Welcoming guests with personalized care and thoughtful craft.
            </p>

            <div className="pt-2 text-xs text-[#555555] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96A] shrink-0 mt-0.5" />
                <span>{SALON_INFO.addressShort}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="hover:text-[#222222] transition-colors font-medium">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksColRef} className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#222222] font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#666666]">
              <li>
                <button
                  onClick={() => scrollTo('#home')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#about')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#services')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#gallery')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#reviews')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#location')}
                  className="hover:text-[#222222] transition-colors cursor-pointer"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div ref={externalColRef} className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#222222] font-semibold block">
              Official Presence
            </span>
            <div className="space-y-2.5">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F3EFE8]/50 hover:bg-[#F3EFE8] border border-[#222222]/5 text-xs text-[#222222] font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A96A]" />
                  <span>Google Maps Business Listing</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#777777]" />
              </a>

              <a
                href={SALON_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F3EFE8]/50 hover:bg-[#F3EFE8] border border-[#222222]/5 text-xs text-[#222222] font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C9A96A]" />
                  <span>Official Website (Grexa)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#777777]" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#777777]">
              <span>Opening hours: 10:00 AM – 9:00 PM Daily</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
          <p>© 2026 Infinity the unisex salon. All rights reserved.</p>
          <p className="text-[11px] text-[#999999]">Hair • Beauty • Style • Confidence</p>
        </div>

      </div>
    </footer>
  );
};
