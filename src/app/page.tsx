// src/app/page.tsx

import ClientComponent from '@/components/clientComponent';
import { SiteProps } from '../components/SiteCard';
import Head from 'next/head';


export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`, {
    next: { tags: ['site'] },
  });
  const initialSites: SiteProps["site"][] = await response.json();
  const initialTag = 'Machine learning';

  return(
  <>
  <Head>
        <title>{`Browse ${initialTag.charAt(0).toUpperCase() + initialTag.slice(1)} Websites - AIBookmarker`}</title>
        <meta name="description" content={`Discover and explore ${initialTag} websites. Find valuable resources and content in our curated collection.`} />
        <meta name="keywords" content={`${initialTag} websites, website navigation, content discovery, AIBookmarker`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Browse ${initialTag.charAt(0).toUpperCase() + initialTag.slice(1)} Websites - AIBookmarker`} />
        <meta property="og:description" content={`Discover and explore ${initialTag} websites. Find valuable resources and content in our curated collection.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nav.aibookmarker.com/${initialTag}`} />
        <meta property="og:image" content="https://nav.aibookmarker.com/preview-image.jpg" />
        <link rel="canonical" href={`https://nav.aibookmarker.com/${initialTag}`} />
  </Head>
  <ClientComponent initialSites={initialSites} />;
  </>
  )
}


