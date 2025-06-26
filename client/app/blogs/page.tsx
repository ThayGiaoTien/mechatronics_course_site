'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import TagFilter from '../components/TagFilter';
import DeleteConfirModal from '../components/DeleteConfirmModal';

import  {Blog}  from '@/types/blog';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [featured, setFeatured] = useState<Blog | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
 // const [error, setError] = useState<string | null>(null);

  // Pagination & sorting state
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "views">(
    "newest"
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // true if next page exists

  // Number of blogs per page
  const LIMIT = 10;

  
  const handleRequestDelete = (id:string) => {
    setSelectedBlogId(id);
    setShowModal(true);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.isAdmin);
  }, []);


  // Fetch blogs and categories on initial load
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
        const allBlogs: Blog[] = res.data;
        setBlogs(allBlogs);

        const allCategories = Array.from(new Set(allBlogs.flatMap((b: Blog) => b.categories || []))) as string[];
        const allTags = Array.from(new Set(allBlogs.flatMap((b: Blog) => b.tags || []))) as string[];
        setCategories(allCategories);
        setTags(allTags);

        // Set default selected category to the first one
        const pinned = allBlogs.find((b:Blog) => b.tags?.includes('featured'));
        setFeatured(pinned ?? null);
        setFilteredBlogs(allBlogs);
        // If we got fewer than LIMIT items, there's no next page
        setHasMore(allBlogs.length === LIMIT);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [sortOption, page, selectedBlogId]);

  useEffect(() => {
    let temp = blogs;

    if (selectedCategory) {
      temp = temp.filter((b) => b.categories?.includes(selectedCategory));
    }

    if (selectedTag) {
      temp = temp.filter((b) => b.tags?.includes(selectedTag));
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      temp = temp.filter(
        (b) =>
          b.title.toLowerCase().includes(s) ||
          b.description.toLowerCase().includes(s)
      );
    }

    temp = temp.sort((a, b) => {
      const dateA = new Date(a.publishedAt ).getTime();
      const dateB = new Date(b.publishedAt ).getTime();
      return sort === 'latest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredBlogs(temp);
  }, [blogs, selectedCategory, selectedTag, search, sort]);

  // Handle delete action
  const handleDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/blogs/${slug}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the blogs list
      setBlogs(blogs.filter((blog) => blog.slug !== slug));
      setFilteredBlogs(filteredBlogs.filter((blog) => blog.slug !== slug));
      setShowModal(false);
      alert('Blog deleted successfully');
      //refresh the page or update state as needed
      setSelectedBlogId(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('Failed to delete blog.');
    }
  };
  if (loading) return <p>Loading Blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-30 px-4 py-6">
      {/* ✅ Delete confirmation modal */}
      <DeleteConfirModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          if (selectedBlogId) {
            handleDelete(selectedBlogId);
          }
        }}
        message="Are you sure you want to delete this course?"
      />
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      {isAdmin && (
        <Link href="/admin/create-blog">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Create New Blog</button>
        </Link>
      )}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded shadow-sm"
      />

      <div className="flex justify-between items-center ">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'latest' | 'oldest')}
          className="border px-2 py-1 rounded"
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <TagFilter
        tags={tags}
        selected={selectedTag}
        onSelect={setSelectedTag}
      />
      {featured && (
        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-6">
          <p className="text-sm text-yellow-800 font-semibold">📌 Featured Blog</p>
          <BlogCard blog={featured} isAdmin={isAdmin} onRequestDelete={handleRequestDelete}/>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} isAdmin={isAdmin} onRequestDelete={handleRequestDelete} />
          ))
        )}
      </div>
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
  );
}