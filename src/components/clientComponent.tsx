import { SiteProps } from "./SiteCard";


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
      <aside className="lg:w-64 p-4 bg-white shadow-lg">
        <h2 className="font-bold mb-4">网站分类</h2>
        <nav aria-label="Category navigation">
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <a
                  href={`#${tag}`}
                  className="text-lg block p-2 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {Object.keys(categories).map((tag) => (
          <section key={tag} id={tag} className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{tag.charAt(0).toUpperCase() + tag.slice(1)} 网站</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories[tag].map((site) => (
                <div key={site.id} className="bg-white p-4 shadow rounded">
                  <h2 className="font-semibold">{site.title}</h2>
                  <p>{site.summarize}</p>
                  <a href={site.url} className="text-blue-500">{site.url}</a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
