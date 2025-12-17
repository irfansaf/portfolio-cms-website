import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  fallback?: string;
}

/**
 * ResponsiveImage Component
 * 
 * Provides responsive image support with srcset and WebP fallback
 * Falls back to regular img tag if picture element not fully supported
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes,
  srcSet,
  fallback,
}: ResponsiveImageProps) {
  const [error, setError] = useState(false);

  // If no srcset provided, use regular img tag
  if (!srcSet && !sizes) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        onError={() => setError(true)}
      />
    );
  }

  // Use picture element for responsive images
  return (
    <picture>
      {/* WebP source if available */}
      {fallback && !error && (
        <source
          srcSet={fallback}
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Regular source with srcset */}
      {srcSet && (
        <source
          srcSet={srcSet}
          sizes={sizes || '100vw'}
        />
      )}
      
      {/* Fallback img */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        onError={() => setError(true)}
      />
    </picture>
  );
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const sizes: string[] = [];
  
  if (breakpoints.mobile) {
    sizes.push(`(max-width: 768px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    sizes.push(breakpoints.desktop);
  }
  
  return sizes.length > 0 ? sizes.join(', ') : '100vw';
}

