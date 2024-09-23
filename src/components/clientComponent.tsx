// src/components/ClientComponent.tsx

import SiteCard, { SiteProps } from '../components/SiteCard';

interface ClientComponentProps {
  initialSites: SiteProps["site"][];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClientComponent({
  initialSites,
  activeTag,
  setActiveTag,
  currentPage,
  setCurrentPage,
}: ClientComponentProps) {
  const itemsPerPage = 6;

  const categorizeByTags = (sites: SiteProps["site"][]) => {
    const categories: { [tagName: string]: SiteProps["site"][] } = {};
    sites.forEach((site) => {
      if (Array.isArray(site.tags)) {
        site.tags.forEach((tag: any) => {
          const tagName = tag.name.toLowerCase();
          if (!categories[tagName]) {
            categories[tagName] = [];
          }
          categories[tagName].push(site);
        });
      }
    });
    return categories;
  };

  const categories = categorizeByTags(initialSites);

  const totalPages = (tag: string | null) => {
    if (tag && categories[tag]) {
      return Math.ceil(categories[tag].length / itemsPerPage);
    }
    return 0;
  };

  const getCurrentPageData = (tag: string | null) => {
    if (tag && categories[tag]) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return categories[tag].slice(startIndex, startIndex + itemsPerPage);
    }
    return [];
  };

  const renderSites = () => {
    const sitesToRender = getCurrentPageData(activeTag);
    return sitesToRender.map((site, index) => <SiteCard key={site.id || index} site={site} />);
  };

  const pageNumbers = () => {
    const total = totalPages(activeTag);
    return Array.from({ length: total }, (_, index) => index + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <aside className="bg-white shadow-lg p-4 rounded-md lg:w-48 lg:pr-2">
        <nav aria-label="Category navigation">
          <h2 className="sr-only">Website Categories</h2>
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => {
                    setActiveTag(tag);
                    setCurrentPage(1); // Reset to first page when changing tag
                  }}
                  className={`text-lg block w-full text-left p-2 rounded-md ${
                    activeTag === tag ? "font-bold text-blue-600 bg-blue-100" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 m-8">
        <h1 className="text-3xl font-bold mb-6">{activeTag ? `${activeTag.charAt(0).toUpperCase() + activeTag.slice(1)} Websites` : 'Featured Websites'}</h1>
        {activeTag ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSites()}
            </div>

            <nav className="mt-6 flex justify-center space-x-2" aria-label="Pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  aria-label="Go to previous page"
                >
                  Previous
                </button>
              )}

              {pageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-current={currentPage === number ? 'page' : undefined}
                >
                  {number}
                </button>
              ))}

              {currentPage < totalPages(activeTag!) && (
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages(activeTag!)))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  aria-label="Go to next page"
                >
                  Next
                </button>
              )}
            </nav>
          </div>
        ) : (
          <p className="text-lg text-gray-600">No sites available for this category.</p>
        )}
      </main>
    </div>
  );
}
