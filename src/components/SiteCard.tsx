import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface SiteProps {
  site: {
    id: number;
    url: string;
    title: string;
    favicon: string;
    summarize: string;
    createdAt: Date;
    tags: { id: number; name: string }[];
  };
}




const SiteCard: FC<SiteProps> = ({ site }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardHeader className="flex items-center space-x-4">
        {site.favicon ? (
          <img src={site.favicon} alt="Favicon" className="w-8 h-8" />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded" />
        )}
        <CardTitle>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            {site.title}
          </a>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600">{site.summarize}</p>
        <div className="flex space-x-2 mt-4">
          {site.tags.map((tag) => (
            <span key={tag.id} className="bg-gray-100 text-sm px-2 py-1 rounded-lg">
                <span>{tag.name}</span>
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        <Button asChild>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            Visit Site
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SiteCard;
