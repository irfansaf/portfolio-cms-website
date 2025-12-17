/**
 * Sitemap Generator Utility
 * 
 * Generates XML sitemap for SEO
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate XML sitemap from URLs
 */
export function generateSitemap(urls: SitemapUrl[], baseUrl: string = 'https://example.com'): string {
  const urlEntries = urls.map(url => {
    const loc = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>`;
    
    if (url.lastmod) {
      entry += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      entry += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      entry += `\n    <priority>${url.priority}</priority>`;
    }
    
    entry += '\n  </url>';
    return entry;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate default sitemap URLs for portfolio site
 */
export function generateDefaultSitemapUrls(
  projects: Array<{ slug: string; updated_at?: string }> = [],
  diaries: Array<{ slug: string; date?: string }> = []
): SitemapUrl[] {
  const urls: SitemapUrl[] = [
    {
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: '/portfolio',
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: '/diaries',
      changefreq: 'weekly',
      priority: 0.8,
    },
  ];

  // Add project pages
  projects.forEach(project => {
    urls.push({
      loc: `/project/${project.slug}`,
      lastmod: project.updated_at ? new Date(project.updated_at).toISOString().split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  // Add diary pages
  diaries.forEach(diary => {
    urls.push({
      loc: `/diary/${diary.slug}`,
      lastmod: diary.date ? new Date(diary.date).toISOString().split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  return urls;
}

