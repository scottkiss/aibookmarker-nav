// src/app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { getPublishedSites } from '@/lib/db';


export async function GET() {
  try {
    const sites = getPublishedSites();
    const rssFeed = `
      <?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Aibookmarker RSS Feed</title>
          <link>https://nav.aibookmarker.com</link>
          <description>Latest published sites</description>
          <language>en</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          ${(await sites)
            .map(
              (site) => `
              <item>
                <title>${site.title}</title>
                <link>${site.url}</link>
                <description>${site.summarize}</description>
                <pubDate>${format(new Date(site.createdAt), 'EEE, dd MMM yyyy HH:mm:ss O')}</pubDate>
                <guid>${site.url}</guid>
              </item>`
            )
            .join('')}
        </channel>
      </rss>
    `;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
