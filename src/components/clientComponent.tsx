"use client";
import { SessionProvider } from "next-auth/react";

import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import SiteCard, { SiteProps } from '../components/SiteCard';

export default function ClientComponent({ initialSites }: { initialSites: SiteProps["site"][] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [sites] = useState<SiteProps["site"][]>(initialSites);
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
    <SessionProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <nav className="lg:hidden flex justify-between items-center mb-4" aria-label="Mobile navigation">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-blue-600 text-white rounded-md focus:outline-none z-20"
            aria-expanded={menuOpen}
            aria-controls="category-menu"
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </nav>

        <aside
          id="category-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block bg-white shadow-lg p-4 rounded-md transition-all duration-300 ease-in-out lg:w-48 lg:pr-2 lg:static absolute top-0 left-0 w-full lg:w-64 z-10`}
        >
          <nav aria-label="Category navigation">
            <h2 className="sr-only">Website Categories</h2>
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
                    aria-current={activeTag === tag ? 'page' : undefined}
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
                {getCurrentPageData().map((site, index) => (
                  <SiteCard key={site.id || index} site={site} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-6 flex justify-center space-x-2" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    aria-label="Go to previous page"
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
                      aria-current={currentPage === number ? 'page' : undefined}
                      aria-label={`Go to page ${number}`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    aria-label="Go to next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </div>
          ) : (
            <p className="text-lg text-gray-600">No sites available for this category.</p>
          )}
        </main>
      </div>
    </SessionProvider>
  );
}
