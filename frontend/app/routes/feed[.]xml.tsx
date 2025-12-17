import { type Route } from './+types/feed[.]xml';
import { generateRSSFeed, formatRSSDate, createRSSDescription } from '@/modules/shared/lib/rss';
import { getDiaries } from '@/modules/portfolio/api';
import { getSystemStatus } from '@/modules/shared/api/system';

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = new URL(request.url).origin;
  
  try {
    // Fetch system status and diaries
    const [status, diaries] = await Promise.all([
      getSystemStatus().catch(() => ({ site_name: 'Portfolio', initialized: true })),
      getDiaries().catch(() => []),
    ]);

    const siteName = status.site_name || 'Portfolio';
    
    // Filter only public entries and sort by date (newest first)
    const publicDiaries = diaries
      .filter(diary => diary.visibility === 'public')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20); // Limit to 20 most recent entries

    // Generate RSS items
    const items = publicDiaries.map(diary => ({
      title: diary.title,
      description: createRSSDescription(diary.content || diary.excerpt || diary.title),
      link: `${baseUrl}/diary/${diary.slug}`,
      pubDate: formatRSSDate(diary.date),
      guid: `${baseUrl}/diary/${diary.slug}`,
      author: siteName,
    }));

    // Generate RSS feed
    const rss = generateRSSFeed({
      title: `${siteName} - Engineering Diaries`,
      description: 'Technical articles, thoughts, and lessons learned along the journey.',
      link: baseUrl,
      language: 'en-US',
      copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
      managingEditor: siteName,
      lastBuildDate: formatRSSDate(new Date()),
      items,
    });

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    // Fallback to empty feed if API fails
    const rss = generateRSSFeed({
      title: 'Portfolio - Engineering Diaries',
      description: 'Technical articles and thoughts.',
      link: baseUrl,
      items: [],
    });

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}

