import React, { useEffect, useRef } from 'react';
import { Star, MapPin, Phone, ArrowUpRight, Sparkles, Clock } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SALON_IMAGES, handleImageError } from '../utils/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroProps {
  onOpenBookingModal: () => void;
  introDone: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal, introDone }) => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const floatingCard3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const mouseTargetRef = useRef<HTMLDivElement>(null);

  // Word-by-word reveal & entrance after intro completes
  useEffect(() => {
    if (!introDone) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.hero-word');
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Unboxed top badge
      tl.fromTo(
        badgesRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      // 2. Word-by-word heading reveal
      .fromTo(
        words || [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
        },
        '-=0.25'
      )
      // 3. Subtitle
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      // 4. CTAs
      .fromTo(
        ctasRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.25'
      )
      // 5. Phone note
      .fromTo(
        phoneRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.25'
      )
      // 6. Image Clip-Path & Scale entrance
      .fromTo(
        imageWrapperRef.current,
        { clipPath: 'inset(8% 8% 8% 8% round 24px)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1, duration: 0.9, ease: 'power3.inOut' },
        '-=0.8'
      )
      .fromTo(
        imageElementRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.9'
      )
      // 7. Floating cards glide in
      .fromTo(
        [floatingCard1Ref.current, floatingCard2Ref.current, floatingCard3Ref.current],
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' },
        '-=0.5'
      )
      // 8. Scroll indicator
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      );

      // Unified Hardware-Accelerated Scroll Parallax (Max 30-40px movement as instructed)
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      if (headingRef.current) {
        parallaxTl.to(headingRef.current, { y: -30, ease: 'none' }, 0);
      }
      if (subtitleRef.current) {
        parallaxTl.to(subtitleRef.current, { y: -20, ease: 'none' }, 0);
      }
      if (imageElementRef.current) {
        parallaxTl.to(imageElementRef.current, { y: -45, scale: 1.05, ease: 'none' }, 0);
      }
      if (floatingCard1Ref.current) {
        parallaxTl.to(floatingCard1Ref.current, { y: -35, ease: 'none' }, 0);
      }
      if (floatingCard2Ref.current) {
        parallaxTl.to(floatingCard2Ref.current, { y: -50, ease: 'none' }, 0);
      }
      if (scrollIndicatorRef.current) {
        parallaxTl.to(scrollIndicatorRef.current, { opacity: 0, ease: 'power1.in' }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, [introDone]);

  // Desktop Mouse Parallax with zero React re-renders using direct style transform & rAF
  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop || !mouseTargetRef.current) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

    const mouseTargetEl = mouseTargetRef.current;
    const card1El = floatingCard1Ref.current;
    const card2El = floatingCard2Ref.current;

    const updatePosition = () => {
      // Smooth lerp (friction = 0.08)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (mouseTargetEl) {
        mouseTargetEl.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      if (card1El) {
        card1El.style.transform = `translate3d(${(-currentX * 1.2).toFixed(2)}px, 0, 0)`;
      }
      if (card2El) {
        card2El.style.transform = `translate3d(${(currentX * 1.4).toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle 6px max movement
      targetX = (e.clientX / window.innerWidth - 0.5) * 12;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-36 pb-16 flex flex-col justify-center items-center overflow-hidden bg-[#FAF9F6]"
    >
      {/* Subtle organic light accent backdrop without heavy blur cost */}
      <div className="absolute top-12 right-1/4 w-72 h-72 rounded-full bg-[#F3EFE8]/50 blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-[#C9A96A]/8 blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Unboxed Metadata & Status */}
            <div
              ref={badgesRef}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] text-[#555555]"
            >
              <div className="flex items-center gap-1.5 font-medium text-[#222222]">
                <span className="flex text-[#C9A96A]">
                  <Star className="w-3.5 h-3.5 fill-[#C9A96A]" />
                </span>
                <span className="font-semibold text-sm">4.8</span>
                <span className="text-[#777777]">({SALON_INFO.reviewCount.toLocaleString()} Google Reviews)</span>
              </div>
              <span className="text-[#C9A96A]/60 hidden sm:inline">·</span>
              <div className="flex items-center gap-1 text-[#444444]">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96A]" />
                <span>Kudasan, Gandhinagar</span>
              </div>
              <span className="text-[#C9A96A]/60 hidden md:inline">·</span>
              <div className="hidden md:flex items-center gap-1 text-[#2e7d32] font-medium text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] inline-block" />
                <span>{SALON_INFO.hoursStatus}</span>
              </div>
            </div>

            {/* Main Editorial Headline with Word-by-Word Reveal */}
            <div className="space-y-2 overflow-hidden">
              <h1
                ref={headingRef}
                className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#1a1a1a] leading-[1.06]"
              >
                <span className="inline-block hero-word mr-2.5 sm:mr-3.5">YOUR</span>
                <span className="inline-block hero-word mr-2.5 sm:mr-3.5">STYLE.</span>
                <br />
                <span className="italic font-normal text-[#222222]">
                  <span className="inline-block hero-word mr-2.5 sm:mr-3.5">YOUR</span>
                  <span className="inline-block hero-word">INFINITY.</span>
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="text-base sm:text-lg text-[#555555] max-w-xl font-light pt-2 leading-relaxed"
              >
                Modern hair, beauty &amp; grooming services for everyone. Handcrafted cuts, custom color, and transformative treatments in Kudasan.
              </p>
            </div>

            {/* CTAs and Direct Actions */}
            <div
              ref={ctasRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-1"
            >
              <button
                onClick={onOpenBookingModal}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#222222] text-[#FAF9F6] text-xs sm:text-[13px] font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors duration-200 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Book Your Visit</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#222222]/20 hover:border-[#222222] bg-[#FAF9F6] hover:bg-[#F3EFE8] text-[#222222] text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-colors duration-200 active:scale-95 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#C9A96A]" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Subtle Phone & Landmark Strip */}
            <div
              ref={phoneRef}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#777777]"
            >
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 hover:text-[#222222] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
                <span className="font-medium text-[#333333]">{SALON_INFO.phone}</span>
                <span className="text-[11px] text-[#888888]">(Tap to call)</span>
              </a>
              <span className="text-[#C9A96A]/60 hidden sm:inline">·</span>
              <div className="hidden sm:inline-flex items-center gap-1 text-[#666666]">
                <Clock className="w-3 h-3 text-[#777777]" />
                <span>1st Floor, Vrundavan Trade Center</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with Clip-Path Reveal & Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
            <div
              ref={mouseTargetRef}
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-none"
            >
              
              {/* Outer decorative soft border ring */}
              <div className="absolute -inset-2.5 rounded-[2rem] border border-[#C9A96A]/20 pointer-events-none -z-1" />

              {/* Main Vertical Editorial Image with Clip Mask */}
              <div
                ref={imageWrapperRef}
                style={{ aspectRatio: '3 / 4' }}
                className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_12px_36px_rgba(0,0,0,0.06)] bg-[#F3EFE8]"
              >
                <img
                  ref={imageElementRef}
                  src={SALON_IMAGES.hero}
                  onError={(e) => handleImageError(e, 'hero')}
                  alt="Modern haircut and styling at Infinity The Unisex Salon"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Gentle image gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Bottom caption in photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <p className="text-[10px] uppercase tracking-widest text-[#FAF9F6]/80 font-medium">Kudasan • Gandhinagar</p>
                  <p className="font-['Cormorant_Garamond'] text-lg font-medium text-[#FAF9F6] italic">Crafted for everyday confidence</p>
                </div>
              </div>

              {/* Floating Card 1: Google Rating */}
              <div
                ref={floatingCard1Ref}
                className="absolute -top-3 sm:-top-5 -left-3 sm:-left-6 bg-white/95 rounded-2xl p-3 sm:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-[#222222]/8 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] flex items-center justify-center text-[#C9A96A] border border-[#C9A96A]/25">
                  <Star className="w-5 h-5 fill-[#C9A96A]" />
                </div>
                <div className="text-left">
                  <div className="text-sm sm:text-base font-bold text-[#222222] leading-none">4.8★</div>
                  <div className="text-[10px] text-[#666666] tracking-wide uppercase font-medium mt-1">Google Rating</div>
                </div>
              </div>

              {/* Floating Card 2: 1,639+ Reviews */}
              <div
                ref={floatingCard2Ref}
                className="absolute -bottom-4 sm:-bottom-5 -right-3 sm:-right-4 bg-white/95 rounded-2xl p-3 sm:p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-[#222222]/8 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#F3EFE8] flex items-center justify-center text-[#222222]">
                  <Sparkles className="w-4 h-4 text-[#C9A96A]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#222222] leading-none">1,639+ Reviews</div>
                  <div className="text-[10px] text-[#666666] uppercase tracking-wide font-medium mt-1">Trusted Locally</div>
                </div>
              </div>

              {/* Floating Card 3: 34+ Services */}
              <div
                ref={floatingCard3Ref}
                className="hidden sm:flex absolute top-1/2 -right-6 -translate-y-1/2 bg-[#222222] text-[#FAF9F6] rounded-2xl px-3.5 py-2.5 shadow-md items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A96A]" />
                <span className="text-xs font-semibold tracking-wider uppercase">34+ Services</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator at bottom with animated line */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#888888] pointer-events-none"
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="w-[1.5px] h-7 bg-[#222222]/15 relative overflow-hidden rounded-full">
          <div className="w-full h-1/2 bg-[#C9A96A] absolute top-0 animate-[moveDown_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
