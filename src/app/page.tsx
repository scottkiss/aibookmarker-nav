import ServerSideComponent from '@/components/serverComponent';
import { SiteProps } from '../components/SiteCard';

export default async function Home() {
  let initialSites: SiteProps["site"][] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/api/sites`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 检查响应状态
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
          <ServerSideComponent initialSites={[]} />
        </div>
      );
    }

    // 检查内容类型
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
          <ServerSideComponent initialSites={[]} />
        </div>
      );
    }

    initialSites = await response.json();
  } catch (error) {
    console.error('Failed to fetch sites:', error);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <ServerSideComponent initialSites={initialSites} />
    </div>
  );
}
