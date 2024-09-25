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
    <div className="flex flex-col lg:flex-row">
      <aside className="lg:w-64 p-4 bg-gray-100 shadow-lg fixed h-full overflow-y-auto">
        <h2 className="font-bold mb-4">Categories</h2>
        <nav aria-label="Category navigation">
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <a
                  href={`#${tag}`}
                  className="text-lg block p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-4 lg:ml-64 bg-gray-50">
        {Object.keys(categories).map((tag) => (
          <section key={tag} id={tag} className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories[tag].map((site) => (
                <div key={site.id} className="bg-white p-4 shadow rounded-lg transition-transform transform hover:scale-105">
                  <div className="flex items-center mb-2">
                    <img src={site.favicon} alt={`${site.title} favicon`} className="w-8 h-8 mr-2" />
                    <h2 className="font-semibold">{site.title}</h2>
                  </div>
                  <p className="mt-2">{site.summarize}</p>
                  <a
                    href={site.url}
                    className="mt-4 inline-block text-center bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
