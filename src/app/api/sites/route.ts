// src/app/api/sites/route.js
export const dynamic = 'force-dynamic';

import { getPublishedSites } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const sites = await getPublishedSites();
    return NextResponse.json(sites);

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
