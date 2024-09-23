import { SiteProps } from "./SiteCard";
import { Button, Card, Typography } from "shadcn-ui";

export default function ClientComponent({ initialSites }: { initialSites: SiteProps["site"][] }) {
  const categorizeByTags = (sites: SiteProps["site"][]) => {
    const categories: { [tagName: string]: SiteProps["site"][] } = {};
    sites.forEach((site) => {
      site.tags.forEach((tag) => {
        const tagName = tag.name.toLowerCase();
        if (!categories[tagName]) {
          categories[tagName] = [];
        }
        categories[tagName].push(site);
      });
    });
    return categories;
  };

  const categories = categorizeByTags(initialSites);

  return (
    <div className="flex flex-1">
      <aside className="lg:w-64 p-4 bg-gray-100 shadow-lg fixed h-full overflow-y-auto">
        <Typography variant="h2" className="font-bold mb-4">网站分类</Typography>
        <nav aria-label="Category navigation">
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <Button
                  variant="link"
                  href={`#${tag}`}
                  className="text-lg block p-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 ml-64 bg-gray-50">
        {Object.keys(categories).map((tag) => (
          <section key={tag} id={tag} className="mb-8">
            <Typography variant="h1" className="text-3xl font-bold mb-4">
              {tag.charAt(0).toUpperCase() + tag.slice(1)} 网站
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories[tag].map((site) => (
                <Card key={site.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <Typography variant="h2" className="font-semibold">{site.title}</Typography>
                  <Typography className="mt-2">{site.summarize}</Typography>
                  <Button
                    variant="link"
                    href={site.url}
                    className="text-blue-500 mt-2"
                  >
                    {site.url}
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
