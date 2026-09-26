import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NavbarProps {
  onOpenBookingModal?: () => void;
  introDone: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal, introDone }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial fade in when intro is done
    if (introDone && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
      );
    }
  }, [introDone]);

  useEffect(() => {
    // GSAP ScrollTrigger listener for smooth navbar transition
    const trigger = ScrollTrigger.create({
      start: 'top -40',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => trigger.kill();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isScrolled ? 'py-2.5 sm:py-3' : 'py-5 sm:py-6'
      }`}
    >
      <div
        ref={navContainerRef}
        className={`mx-auto max-w-6xl rounded-full px-5 sm:px-8 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#222222]/10 py-2 sm:py-2.5'
            : 'bg-[#FAF9F6]/40 backdrop-blur-xs border border-transparent py-3 sm:py-3.5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with smooth scale */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex flex-col group text-left cursor-pointer transition-transform duration-500 origin-left"
            style={{ transform: isScrolled ? 'scale(0.92)' : 'scale(1)' }}
          >
            <span className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#222222] transition-colors group-hover:text-[#C9A96A] leading-tight">
              {SALON_INFO.brandName}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#777777] font-medium leading-none">
              {SALON_INFO.subtitle}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs lg:text-[13px] uppercase tracking-wider text-[#444444] hover:text-[#222222] font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C9A96A] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button & Phone */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#222222] px-2.5 py-1.5 transition-colors font-medium"
              title="Call salon"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96A]" />
              <span className="hidden lg:inline">{SALON_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#222222] text-[#FAF9F6] hover:bg-[#C9A96A] hover:text-[#222222] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Book / Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBookingModal}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#222222] text-[#FAF9F6] active:scale-95 cursor-pointer"
            >
              Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#222222] hover:bg-[#F3EFE8] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 mx-auto max-w-sm bg-[#FAF9F6] border border-[#222222]/10 rounded-2xl shadow-xl p-5 backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3.5 pb-4 border-b border-[#222222]/8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm uppercase tracking-wider text-[#333333] hover:text-[#C9A96A] font-medium py-1 text-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#222222]/15 text-[#222222] text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EFE8] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C9A96A]" />
              <span>Call +91 90338 10121</span>
            </a>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#222222] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
