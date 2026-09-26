import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { handleImageError, CDN_FALLBACKS } from '../utils/images';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  aspectRatio?: string; // CSS aspect-ratio e.g. '4/3', '3/4', '4/5', '1/1'
  fallbackKey?: keyof typeof CDN_FALLBACKS;
  rootMargin?: string;
  threshold?: number;
}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({
  src,
  alt,
  className = 'w-full h-full object-cover object-center',
  containerClassName = '',
  aspectRatio,
  fallbackKey = 'salon',
  rootMargin = '250px 0px',
  threshold = 0.01,
  onError,
  onLoad,
  style,
  ...restProps
}, forwardedRef) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const internalImgRef = useRef<HTMLImageElement>(null);

  // Expose internal image ref to parent for GSAP ScrollTrigger animations
  useImperativeHandle(forwardedRef, () => internalImgRef.current as HTMLImageElement);

  useEffect(() => {
    // Check for native IntersectionObserver support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageError(e, fallbackKey);
    if (onError) {
      onError(e);
    }
  };

  const containerStyle: React.CSSProperties = {
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#EFECE6] ${containerClassName}`}
      style={containerStyle}
    >
      {/* Subtle pulse placeholder background until image completes decoding */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#E8E4DC] to-[#F5F2EC] animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}

      {isInView && (
        <img
          ref={internalImgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleImgLoad}
          onError={handleImgError}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={style}
          {...restProps}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';
