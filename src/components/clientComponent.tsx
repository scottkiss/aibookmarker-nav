
import SiteCard, { SiteProps } from '../components/SiteCard';
import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';



import { GetServerSideProps } from 'next';
import Head from 'next/head';

// SSR - Fetch the sites data on the server side
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.API_URL}/api/sites`);
  const initialSites = await response.json();

  return {
    props: {
      initialSites,
    },
  };
};

// SEO-optimized ClientComponent
export default function ClientComponent({ initialSites }: { initialSites: SiteProps["site"][] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [sites, setSites] = useState<SiteProps["site"][]>(initialSites);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const categories = categorizeByTags(sites);

  // Set default tag on initial load
  if (Object.keys(categories).length > 0 && !activeTag) {
    setActiveTag(Object.keys(categories)[0]);
  }

  if (activeTag && categories[activeTag]) {
    const totalItems = categories[activeTag].length;
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }

  const getCurrentPageData = () => {
    if (activeTag && categories[activeTag]) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return categories[activeTag].slice(startIndex, startIndex + itemsPerPage);
    }
    return [];
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Dynamically setting page meta based on the active tag for better SEO
  const currentTagName = activeTag ? `Category: ${activeTag}` : 'All Categories';

  return (
    <>
      <Head>
        <title>{`${currentTagName} | Featured Website Navigation`}</title>
        <meta name="description" content={`Browse websites categorized under ${activeTag || 'various topics'} and discover valuable resources.`} />
        <meta name="keywords" content={`website navigation, ${activeTag}, site categories, tag-based browsing`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Featured Websites - ${currentTagName}`} />
        <meta property="og:description" content={`Explore websites related to ${activeTag || 'various categories'}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aibookmarker-nav.vercel.app/" />
        <meta property="og:image" content="https://aibookmarker-nav.vercel.app/preview-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-blue-600 text-white rounded-md focus:outline-none z-20"
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        <aside
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block bg-white shadow-lg p-4 rounded-md transition-all duration-300 ease-in-out lg:w-48 lg:pr-2 lg:static absolute top-0 left-0 w-full lg:w-64 z-10`}
        >
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => {
                    setActiveTag(tag);
                    setMenuOpen(false);
                    setCurrentPage(1);  // Reset page when category changes
                  }}
                  className={`text-lg block w-full text-left p-2 rounded-md ${
                    activeTag === tag
                      ? "font-bold text-blue-600 bg-blue-100"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 m-8">
          {activeTag ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageData().map((site, index) => (
                  <SiteCard key={index} site={site} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-lg text-gray-600">No sites available for this category.</p>
          )}
        </main>
      </div>
    </>
  );
}
