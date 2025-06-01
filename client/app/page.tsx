// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogCard from "./components/BlogCard";
import axios from "axios";

import  {Blog}  from '@/types/blog';

// export const metadata = {
//   title: "Mechatronics – Home",
//   description: "Explore mechatronics courses, blogs, and projects.",
//   openGraph: {
//     title: "Mechatronics – Home",
//     description: "Explore mechatronics courses, blogs, and projects.",
//     url: "https://mechatronics-course-site.vercel.app/",
//     siteName: "Mechatronics Site",
//   },
// };

export default function HomePage() {
  // State for fetched blogs
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination & sorting state
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "views">(
    "newest"
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // true if next page exists

  // Number of blogs per page
  const LIMIT = 10;

  // Re-fetch whenever sortOption or page changes
  useEffect(() => {
    setLoading(true);

    const fetchBlogs = async () => {
      try {
        // Build the query string
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/blogs`,
          {
            params: {
              sort: sortOption,
              page,     // 1-based page
              limit: LIMIT,
            },
          }
        );
        const data: Blog[] = res.data;

        setBlogs(data);
        // If we got fewer than LIMIT items, there's no next page
        setHasMore(data.length === LIMIT);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [sortOption, page]);

  // Handlers for sorting
  const handleSortChange = (option: "newest" | "oldest" | "views") => {
    setSortOption(option);
    setPage(1); // reset to first page whenever sorting changes
  };

  return (
    <>
     
      {/* <section
        className="relative mt-20 h-69 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBY70Tbvm7asm06CGKtM8TZtBop4aD12jxkQ&s')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">tailieucodientu.com.vn</h1>
            <p className="mt-1 text-2xl font-semibold">
              Tổng hợp các tài liệu hay nhất, mới nhất về  lĩnh vực cơ - điện tử  (mechatronics) từ cơ bản đến nâng cao
            </p>
          </div>
        </div>
      </section> */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto mt-30 flex grow flex-col bg-gray-100 pt-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Sort Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sortOption === "newest"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleSortChange("newest")}
              >
                Newest
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sortOption === "oldest"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleSortChange("oldest")}
              >
                Oldest
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sortOption === "views"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleSortChange("views")}
              >
                Most Viewed
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Page {page}
            </div>
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-600 py-12">
              No blogs found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {blogs.map((blog) => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  isAdmin={false} 
                  onRequestDelete={() => {}} 
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between py-4">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded ${
                hasMore
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!hasMore}
              onClick={() => hasMore && setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>

     
    </>
  );
}
