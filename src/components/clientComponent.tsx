"use client";

import SiteCard, { SiteProps } from '../components/SiteCard';
import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import Head from 'next/head';

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

  useEffect(() => {
    if (Object.keys(categories).length > 0 && activeTag === null) {
      setActiveTag(Object.keys(categories)[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (activeTag && categories[activeTag]) {
      const totalItems = categories[activeTag].length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }
  }, [activeTag, categories]);

  const getCurrentPageData = () => {
    if (activeTag && categories[activeTag]) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return categories[activeTag].slice(startIndex, startIndex + itemsPerPage);
    }
    return [];
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <Head>
        <title>Featured Website Navigation - Browse Categories by Tags</title>
        <meta name="description" content="Discover and explore a curated selection of websites organized by categories. Find valuable content and resources tailored to your interests." />
        <meta name="keywords" content="website navigation, tag categories, content discovery, resource browsing, curated websites" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nav.aibookmarker.com/" />
        <meta property="og:title" content="Featured Website Navigation - Browse Categories by Tags" />
        <meta property="og:description" content="Discover and explore a curated selection of websites organized by categories. Find valuable content and resources tailored to your interests." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nav.aibookmarker.com/" />
        <meta property="og:image" content="https://nav.aibookmarker.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Featured Website Navigation - Browse Categories by Tags" />
        <meta name="twitter:description" content="Discover and explore a curated selection of websites organized by categories. Find valuable content and resources tailored to your interests." />
        <meta name="twitter:image" content="https://nav.aibookmarker.com/preview-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Featured Website Navigation",
              "description": "Discover and explore a curated selection of websites organized by categories.",
              "url": "https://nav.aibookmarker.com/"
            }
          `}
        </script>
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <header className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">Featured Websites</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-blue-600 text-white rounded-md focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </header>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block bg-white shadow-lg p-4 rounded-md transition-all duration-300 ease-in-out lg:w-64 lg:static absolute top-0 left-0 w-full z-10`}
          aria-label="Category navigation"
        >
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {Object.keys(categories).map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => {
                    setActiveTag(tag);
                    setMenuOpen(false);
                    if (activeTag !== tag) setCurrentPage(1);
                  }}
                  className={`text-lg block w-full text-left p-2 rounded-md ${
                    activeTag === tag
                      ? "font-bold text-blue-600 bg-blue-100"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-current={activeTag === tag ? "true" : "false"}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 m-8" id="main-content">
          <h2 className="text-3xl font-bold mb-6">{activeTag ? `${activeTag.charAt(0).toUpperCase() + activeTag.slice(1)} Websites` : 'Featured Websites'}</h2>
          {activeTag ? (
            <section aria-label={`${activeTag} websites`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageData().map((site, index) => (
                  <SiteCard key={index} site={site} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-6 flex justify-center space-x-2" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    aria-label="Previous page"
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
                      aria-current={currentPage === number ? "page" : undefined}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </section>
          ) : (
            <p className="text-lg text-gray-600">Please select a category to view websites.</p>
          )}
        </main>
      </div>
    </>
  );
}
