"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface Site {
  id: number;
  url: string;
  title: string;
  favicon: string;
  summarize: string;
  published: boolean;
  createdAt: string;
  tags: { name: string }[];
}

export default function AdminSites() {
  const { data: session } = useSession();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if the user is not authenticated
    if (status === "unauthenticated") {
      router.push("/api/auth/signin"); // Redirect to login page
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchSites();
    }
  }, [session]);

  const fetchSites = async () => {
    try {
      const response = await fetch("/api/admin/sites",{ cache: 'no-store' });
      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const togglePublish = async (id: number, published: boolean) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/publish", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, published }),
      });

      if (response.ok) {
        fetchSites();
      } else {
        console.error("Error updating publish status");
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSites = sites.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sites.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 ${
            currentPage === i ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Site Management</h1>

        {session?.user && (
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
              <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-gray-700">
              <span>{session.user.name}</span>
            </div>
            <Button variant="outline" onClick={() => signOut()} className="text-blue-500">
              Sign out
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="max-w-8xl mx-auto bg-white shadow-md rounded-lg">
          <div className="hidden md:block">
            <Table className="w-full text-sm sm:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">Title</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">URL</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">Summary</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">Created At</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">Publish Status</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSites.map((site) => (
                  <tr key={site.id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">{site.title}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">{site.url}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">{site.summarize}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">
                      {site.published ? "Published" : "Unpublished"}
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-200">
                      <Button onClick={() => togglePublish(site.id, !site.published)} disabled={loading} className="w-full sm:w-auto">
                        {site.published ? "Unpublish" : "Publish"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="block md:hidden">
            {paginatedSites.map((site) => (
              <div key={site.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="mb-2">
                  <strong>Title:</strong> {site.title}
                </div>
                <div className="mb-2">
                  <strong>URL:</strong>{" "}
                  <a href={site.url} className="text-blue-500">
                    {site.url}
                  </a>
                </div>
                <div className="mb-2">
                  <strong>Summary:</strong> {site.summarize}
                </div>
                <div className="mb-2">
                  <strong>Created At:</strong> {new Date(site.createdAt).toLocaleDateString()}
                </div>
                <div className="mb-2">
                  <strong>Publish Status:</strong> {site.published ? "Published" : "Unpublished"}
                </div>
                <Button onClick={() => togglePublish(site.id, !site.published)} disabled={loading} className="w-full">
                  {site.published ? "Unpublish" : "Publish"}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center p-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <Select onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-full sm:w-auto">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end space-x-2">{renderPageNumbers()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
