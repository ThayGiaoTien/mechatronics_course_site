'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import clsx from 'clsx';

interface Blog {
  title: string;
  description: string;
  slug: string;
  content: string;
  thumbnail?: string;
  categories: string[];
  tags: string[];
  author: string;
  isPublished: boolean;
  publicshedAt: string;
}

const CATEGORIES = ['React', 'Node.js', 'AI', 'Robotics', 'Embedded'];

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    const res = await axios.get('http://localhost:5000/api/blogs', {
      params: selectedCategory ? { category: selectedCategory } : {},
    });
    setBlogs(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Documentation & Blogs</h1>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory('')}
          className={clsx(
            'px-4 py-1 rounded-full border text-sm font-medium',
            selectedCategory === ''
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          )}
        >
          All
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              'px-4 py-1 rounded-full border text-sm font-medium',
              selectedCategory === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-auto h-64 object-cover rounded-xl mb-6 shadow"
                 
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600 mt-1">{blog.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {new Date(blog.publicshedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
