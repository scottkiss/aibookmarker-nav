// app/api/sites/route.ts
export const dynamic = 'force-dynamic';

import { getSitesQuery } from '@/lib/db';
import { NextResponse } from 'next/server';



const VALID_API_KEY = process.env.API_KEY;


export async function GET(request: Request) {
  try {
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ message: 'API key is missing' }, { status: 401 });
  }

  if (apiKey !== VALID_API_KEY) {
    return NextResponse.json({ message: 'Invalid API key' }, { status: 403 });
  }
  const sites = await getSitesQuery();

  const formattedSites = sites.map((site: { createdAt: { toISOString: () => any; }; favicon: any; summarize: any; tags: any[]; title: any; url: any; }) => ({
      createdAt: site.createdAt.toISOString(),
      favicon: site.favicon,
      summarize: site.summarize,
      tags: site.tags.map((tag: { name: any; }) => tag.name),
      title: site.title,
      url: site.url
  }));
    return NextResponse.json(formattedSites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
