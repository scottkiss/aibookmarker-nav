"use client";
// src/app/page.tsx

import ClientComponent from '@/components/clientComponent';
import { SiteProps } from '../components/SiteCard';
import { useState } from 'react';

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`, {
    next: { tags: ['site'] },
  });
  const initialSites: SiteProps["site"][] = await response.json();

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <ClientComponent
      initialSites={initialSites}
      activeTag={activeTag}
      setActiveTag={setActiveTag}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
