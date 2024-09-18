// src/app/api/admin/publish/route.ts
import { updateSitePublished } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';


export async function PATCH(request: NextRequest) {
  try {
    const { id, published } = await request.json();

    if (typeof id !== 'number' || typeof published !== 'boolean') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
    const updatedSite = await updateSitePublished(id,published);
    revalidateTag('site');
    return NextResponse.json(updatedSite);
  } catch (error) {
    console.error('Error updating site:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
