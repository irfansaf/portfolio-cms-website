/**
 * RSS Feed Generator Utility
 * 
 * Generates RSS 2.0 XML feed for blog/diary entries
 */

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
  author?: string;
}

export interface RSSChannel {
  title: string;
  description: string;
  link: string;
  language?: string;
  copyright?: string;
  managingEditor?: string;
  webMaster?: string;
  lastBuildDate?: string;
  items: RSSItem[];
}

/**
 * Generate RSS 2.0 XML feed
 */
export function generateRSSFeed(channel: RSSChannel): string {
  const items = channel.items.map(item => {
    let itemXml = `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.link)}</link>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>`;
    
    if (item.author) {
      itemXml += `\n      <author>${escapeXml(item.author)}</author>`;
    }
    
    itemXml += '\n    </item>';
    return itemXml;
  }).join('\n');

  const lastBuildDate = channel.lastBuildDate || new Date().toUTCString();
  const language = channel.language || 'en-US';

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <description>${escapeXml(channel.description)}</description>
    <link>${escapeXml(channel.link)}</link>
    <language>${language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(channel.link)}/feed.xml" rel="self" type="application/rss+xml" />
${channel.copyright ? `    <copyright>${escapeXml(channel.copyright)}</copyright>` : ''}
${channel.managingEditor ? `    <managingEditor>${escapeXml(channel.managingEditor)}</managingEditor>` : ''}
${channel.webMaster ? `    <webMaster>${escapeXml(channel.webMaster)}</webMaster>` : ''}
${items}
  </channel>
</rss>`;
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
 * Format date for RSS (RFC 822)
 */
export function formatRSSDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[d.getUTCDay()];
  const dateNum = d.getUTCDate();
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');
  
  return `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

/**
 * Strip HTML and truncate for RSS description
 */
export function createRSSDescription(html: string, maxLength: number = 300): string {
  // Simple HTML stripping
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

