// src/app/api/admin/sites/route.ts
import { getSites } from '@/lib/db';
import { NextResponse } from 'next/server';

export const revalidate = 0;
export async function GET() {
  try {
    const sites = await getSites();
    return NextResponse.json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
