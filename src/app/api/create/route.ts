// app/api/create/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, url, favicon, summarize, tags } = body;

    // Validate request body
    if (!title || !url || !favicon || !summarize || !Array.isArray(tags)) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Create or connect tags
    const tagOperations = tags.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag },
    }));

    const newSite = await prisma.site.create({
      data: {
        title,
        url,
        favicon,
        summarize,
        published: false,  // Default to not published
        tags: {
          connectOrCreate: tagOperations,
        },
      },
    });

    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
