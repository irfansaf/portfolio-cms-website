/**
 * SEO Utility Functions
 * 
 * Helper functions for generating meta tags, structured data, and SEO-related content
 */

export interface MetaTag {
  title?: string;
  name?: string;
  property?: string;
  content: string;
}

/**
 * Strip HTML tags from text for use in meta descriptions
 */
export function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: simple regex approach
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  // Client-side: use DOM parser for better accuracy
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Truncate text to a specific length, adding ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Generate a clean description from HTML content
 */
export function generateDescription(html: string, maxLength: number = 160): string {
  const text = stripHtml(html);
  return truncateText(text, maxLength);
}

export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
  siteName?: string;
}

export interface TwitterCardData {
  card?: 'summary' | 'summary_large_image';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image?: string;
}

/**
 * Get the base URL for the site
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR
  return process.env.BASE_URL || 'https://example.com';
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(data: OpenGraphData): MetaTag[] {
  const baseUrl = getBaseUrl();
  const tags: MetaTag[] = [
    { property: 'og:type', content: data.type || 'website' },
    { property: 'og:url', content: data.url.startsWith('http') ? data.url : `${baseUrl}${data.url}` },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
  ];

  if (data.image) {
    const imageUrl = data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`;
    tags.push({ property: 'og:image', content: imageUrl });
    tags.push({ property: 'og:image:width', content: '1200' });
    tags.push({ property: 'og:image:height', content: '630' });
    tags.push({ property: 'og:image:alt', content: data.title });
  }

  if (data.siteName) {
    tags.push({ property: 'og:site_name', content: data.siteName });
  }

  tags.push({ property: 'og:locale', content: 'en_US' });

  return tags;
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(data: TwitterCardData): MetaTag[] {
  const tags: MetaTag[] = [
    { name: 'twitter:card', content: data.card || 'summary_large_image' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
  ];

  if (data.site) {
    tags.push({ name: 'twitter:site', content: data.site });
  }

  if (data.creator) {
    tags.push({ name: 'twitter:creator', content: data.creator });
  }

  if (data.image) {
    const baseUrl = getBaseUrl();
    const imageUrl = data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`;
    tags.push({ name: 'twitter:image', content: imageUrl });
    tags.push({ name: 'twitter:image:alt', content: data.title });
  }

  return tags;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return path.startsWith('http') ? path : `${baseUrl}${path}`;
}

/**
 * Generate structured data (JSON-LD) for Person
 */
export function generatePersonStructuredData(data: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    url: data.url,
    ...(data.jobTitle && { jobTitle: data.jobTitle }),
    ...(data.description && { description: data.description }),
    ...(data.image && { image: data.image }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

/**
 * Generate structured data (JSON-LD) for Article/BlogPost
 */
export function generateArticleStructuredData(data: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    author: {
      '@type': 'Person',
      name: data.author.name,
      ...(data.author.url && { url: data.author.url }),
    },
    ...(data.image && {
      image: {
        '@type': 'ImageObject',
        url: data.image,
      },
    }),
  };
}

/**
 * Generate structured data (JSON-LD) for Project/SoftwareApplication
 */
export function generateProjectStructuredData(data: {
  name: string;
  description: string;
  url: string;
  image?: string;
  technologies?: string[];
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.technologies && data.technologies.length > 0 && {
      applicationCategory: 'DeveloperApplication',
      operatingSystem: data.technologies.join(', '),
    }),
  };
}

/**
 * Generate structured data (JSON-LD) for Website
 */
export function generateWebsiteStructuredData(data: {
  name: string;
  url: string;
  description?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
  };
}

