import { SiteProps } from "./SiteCard";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "./ui/button";
import Typography from "./Typography";


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
          <Accordion.Root type="single" collapsible>
            {Object.keys(categories).map((tag) => (
              <Accordion.Item key={tag} value={tag}>
                <Accordion.Header>
                  <Accordion.Trigger asChild>
                    <Button className="text-lg block w-full text-gray-700 hover:bg-gray-200 transition-colors">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Button>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <ul className="space-y-2 p-4">
                    {categories[tag].map((site) => (
                      <li key={site.id}>
                        <div className="bg-white p-4 shadow rounded">
                          <Typography variant="h3" className="font-semibold">{site.title}</Typography>
                          <Typography>{site.summarize}</Typography>
                          <Button asChild>
                            <a href={site.url} className="text-blue-500">{site.url}</a>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
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
                <div key={site.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <Typography variant="h2" className="font-semibold">{site.title}</Typography>
                  <Typography className="mt-2">{site.summarize}</Typography>
                  <Button asChild>
                    <a href={site.url} className="text-blue-500 mt-2">{site.url}</a>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
