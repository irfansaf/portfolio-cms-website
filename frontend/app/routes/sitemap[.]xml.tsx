import { type Route } from './+types/sitemap[.]xml';
import { generateSitemap, generateDefaultSitemapUrls } from '@/modules/shared/lib/sitemap';
import { getProjects, getDiaries } from '@/modules/portfolio/api';

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = new URL(request.url).origin;
  
  try {
    // Fetch projects and diaries for dynamic sitemap
    const [projects, diaries] = await Promise.all([
      getProjects().catch(() => []),
      getDiaries().catch(() => []),
    ]);

    const urls = generateDefaultSitemapUrls(
      projects.map(p => ({ slug: p.slug, updated_at: p.updated_at })),
      diaries.map(d => ({ slug: d.slug, date: d.date }))
    );

    const sitemap = generateSitemap(urls, baseUrl);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    // Fallback to basic sitemap if API fails
    const urls = generateDefaultSitemapUrls();
    const sitemap = generateSitemap(urls, baseUrl);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}

