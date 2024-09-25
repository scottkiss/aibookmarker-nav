import ServerSideComponent from '@/components/serverComponent';
import { SiteProps } from '../components/SiteCard';

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`, {
    next: { tags: ['site'] },
  });
  const initialSites: SiteProps["site"][] = await response.json();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <ServerSideComponent initialSites={initialSites} />
    </div>
  );
}
