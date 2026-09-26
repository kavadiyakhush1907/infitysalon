import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SALON_INFO } from '../data/salonData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          onComplete();
        },
      });

      // Initial state
      gsap.set(logoRef.current, { opacity: 0, y: 15, scale: 0.96 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });

      // Step 1: Reveal INFINITY (0ms)
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'power3.out',
      })
      // Step 2: Animate thin gold line underneath (250ms)
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.35,
        ease: 'power2.inOut',
      }, '-=0.15')
      // Step 3: Reveal THE UNISEX SALON (400ms)
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.35em',
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.15')
      // Hold briefly (700-850ms mark)
      .to({}, { duration: 0.25 })
      // Step 4: Logo moves upward and background curtain dissolves smoothly
      .to([logoRef.current, lineRef.current, subtitleRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.25');
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center">
        {/* INFINITY */}
        <h1
          ref={logoRef}
          className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.22em] text-[#222222]"
        >
          {SALON_INFO.brandName}
        </h1>

        {/* Animated thin gold line */}
        <div
          ref={lineRef}
          className="w-24 sm:w-32 h-[1px] bg-[#C9A96A] my-3"
        />

        {/* THE UNISEX SALON */}
        <p
          ref={subtitleRef}
          className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#777777] font-medium"
        >
          {SALON_INFO.subtitle}
        </p>
      </div>
    </div>
  );
};
