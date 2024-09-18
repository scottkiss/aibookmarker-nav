// src/app/page.tsx

import ClientComponent from '@/components/clientComponent';
import { SiteProps } from '../components/SiteCard';


export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`, {
    next: { tags: ['site'] },
  });
  const initialSites: SiteProps["site"][] = await response.json();
  return <ClientComponent initialSites={initialSites} />;
}


