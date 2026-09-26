import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { FeaturedServices } from './components/FeaturedServices';
import { PinnedShowcase } from './components/PinnedShowcase';
import { WhyUs } from './components/WhyUs';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { LocationSection } from './components/LocationSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { BookingModal } from './components/BookingModal';
import { MobileActionBar } from './components/MobileActionBar';
import { LoadingScreen } from './components/LoadingScreen';
import { ServiceItem } from './data/salonData';
import { initSmoothScroll, destroySmoothScroll } from './utils/scrollSetup';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll linked to GSAP ScrollTrigger
    const lenis = initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#222222] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#C9A96A]/25 selection:text-[#222222] relative overflow-x-hidden">
      {/* Editorial page load intro sequence */}
      <LoadingScreen onComplete={() => setIntroDone(true)} />

      {/* Reactive Floating Navbar */}
      <Navbar
        onOpenBookingModal={() => setIsBookingOpen(true)}
        introDone={introDone}
      />

      {/* Main Content Flow with Scroll-Triggered Experiences */}
      <main>
        {/* Hero Section with Parallax, Clip Mask & Word-by-Word Reveal */}
        <Hero
          onOpenBookingModal={() => setIsBookingOpen(true)}
          introDone={introDone}
        />

        {/* About Section with Sequential Scroll Reveal & Live Counters */}
        <About />

        {/* Services Menu Section with Cascade Entrances & Micro-Interactions */}
        <Services onSelectService={(service) => setSelectedService(service)} />

        {/* Featured Visual Services with Parallax Speed Offsets */}
        <FeaturedServices onSelectService={(service) => setSelectedService(service)} />

        {/* Pinned Showcase with Kinetic Scrub Marquee */}
        <PinnedShowcase onOpenBookingModal={() => setIsBookingOpen(true)} />

        {/* Why Infinity Section with Directional Entrances & Spring Icons */}
        <WhyUs />

        {/* Dynamic Editorial Gallery with Rotations & Lightbox */}
        <Gallery />

        {/* Testimonials with Sequential Star Reveal & Smooth Carousel */}
        <Reviews />

        {/* Location & Map Section with Split Entrance */}
        <LocationSection />

        {/* Final Call to Action with Zoom & Stagger */}
        <ContactCTA />
      </main>

      {/* Staggered Footer */}
      <Footer />

      {/* Fixed Bottom Action Bar for Mobile Devices */}
      <MobileActionBar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Interactive Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Quick Booking / Call Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
