import heroStylingImg from '../assets/images/infinity_hero_styling_1790420043245.jpg';
import salonInteriorImg from '../assets/images/infinity_salon_interior_1790420024360.jpg';
import hairColorImg from '../assets/images/infinity_hair_color_1790420058500.jpg';
import bridalLookImg from '../assets/images/infinity_bridal_look_1790420075472.jpg';

// Curated high-reliability CDN fallback links (Unsplash premium salon photos)
export const CDN_FALLBACKS = {
  hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  salon: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
  hairColor: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
  bridal: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80',
  haircut: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
  keratin: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
};

// Exported structured image dictionary with bundled Vite assets as primary
export const SALON_IMAGES = {
  hero: heroStylingImg || '/images/hero/infinity-hero.jpg',
  interior: salonInteriorImg || '/images/salon/interior.jpg',
  hairColor: hairColorImg || '/images/services/hair-color.jpg',
  bridal: bridalLookImg || '/images/services/bridal.jpg',
  haircut: heroStylingImg || '/images/services/haircut.jpg',
  keratin: salonInteriorImg || '/images/services/keratin.jpg',
  gallery: [
    salonInteriorImg || '/images/gallery/gallery-01.jpg',
    heroStylingImg || '/images/gallery/gallery-02.jpg',
    hairColorImg || '/images/gallery/gallery-03.jpg',
    bridalLookImg || '/images/gallery/gallery-04.jpg',
    salonInteriorImg || '/images/gallery/gallery-05.jpg',
    heroStylingImg || '/images/gallery/gallery-06.jpg',
  ],
};

/**
 * Universal safe image error handler to prevent broken-image icons anywhere on the site.
 * Tries the public folder image first, then the CDN fallback, and stops to prevent infinite loop.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackKey: keyof typeof CDN_FALLBACKS = 'hero'
) => {
  const target = e.currentTarget;
  const attempts = parseInt(target.getAttribute('data-fallback-attempt') || '0', 10);

  if (attempts === 0) {
    target.setAttribute('data-fallback-attempt', '1');
    const publicPath =
      fallbackKey === 'hero' ? '/images/hero/infinity-hero.jpg' :
      fallbackKey === 'salon' ? '/images/salon/interior.jpg' :
      fallbackKey === 'hairColor' ? '/images/services/hair-color.jpg' :
      fallbackKey === 'bridal' ? '/images/services/bridal.jpg' :
      fallbackKey === 'keratin' ? '/images/services/keratin.jpg' :
      '/images/services/haircut.jpg';
    target.src = publicPath;
  } else if (attempts === 1) {
    target.setAttribute('data-fallback-attempt', '2');
    target.src = CDN_FALLBACKS[fallbackKey] || CDN_FALLBACKS.hero;
  }
};
