'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';


import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import TagFilter from '../components/TagFilter';
import DeleteConfirModal from '../components/DeleteConfirmModal';

import  {Blog}  from '@/types/blog';
import CategorySection from '../components/CategorySection';

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
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('categories');
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
        // Build query params
        const params: any = {
          sort: sortOption,
          page,
          limit: LIMIT,
        };
   
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/blogs`,
          { params }
        );
        const allBlogs: Blog[] = res.data;
        setBlogs(allBlogs);

        const allTags = Array.from(new Set(allBlogs.flatMap((b: Blog) => b.tags || []))) as string[];
        setTags(allTags);

        // Set featured blog
        const pinned = allBlogs.find((b: Blog) => b.tags?.includes('featured'));
        setFeatured(pinned ?? null);
        setFilteredBlogs(allBlogs);
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
    // Add selectedCategory as dependency
  }, [sortOption, page, selectedBlogId, selectedCategory, ]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/categories`);
        setCategories(res.data);
        if (categoryFromUrl) {
          setSelectedCategory(categoryFromUrl);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, [categoryFromUrl]);

  // // Fetch categories from URL
  // useEffect(() => {
  //   if (categoryFromUrl) {
  //     setSelectedCategory(categoryFromUrl);
  //   }
  // }, [categoryFromUrl]);
  
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
  if (loading) return <p>Đang tải bài viết...</p>;

  return (
    <div className="w-full md:w-3/5 mx-auto mt-30 px-4 py-6">
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
      <h1 className="text-3xl font-bold mb-6">Tất cả bài viết</h1>
      {isAdmin && (
        <Link href="/admin/create-blog">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Create New Blog</button>
        </Link>
      )}
      <div className="flex justify-between items-center flex-wrap mb-4 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 h-9 px-3 py-2 border rounded shadow-sm"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'latest' | 'oldest')}
          className="border min-w-0 h-9 px-2 py-1 rounded"
        >
          <option value="latest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
     
      <div className=" mb-2 bg-gray-100 pl-4 p-2 rounded shadow">
        <h1 className="text-xl font-semibold mb-2">Danh mục</h1>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className=" mb-2 bg-gray-100 pl-4 p-2 rounded shadow">
        <h1 className="text-xl font-semibold mb-2">Thẻ</h1>
         <TagFilter
        tags={tags}
        selected={selectedTag}
        onSelect={setSelectedTag}
      />
      </div>
     
      {featured && (
        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-6">
          <p className="text-sm text-yellow-800 font-semibold">📌 Featured Blog</p>
          <BlogCard blog={featured} isAdmin={isAdmin} onRequestDelete={handleRequestDelete}/>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500">Không tìm thấy blog nào.</p>
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
          Trước
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
          Tiếp theo
        </button>
      </div>

    </div>
  );
}