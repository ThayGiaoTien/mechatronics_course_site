// components/RelatedBlogsSection.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

import { RelatedBlog } from '@/types/related_blogs';



export default function RelatedBlogsSection({ blogs }: { blogs: RelatedBlog[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="mt-6">
      {/* Desktop: fixed sidebar */}
      <div className="hidden md:block bg-gray-50 p-4 border rounded shadow">
        <h3 className="text-lg font-bold mb-3">Bài viết liên quan</h3>
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Link href={`/blogs/${blog.slug}`}>
                <span className="text-blue-600 hover:underline">{blog.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: always open */}
      <div className="md:hidden">
        <h3 className="text-lg font-bold mb-3 text-blue-600">Bài viết liên quan</h3>
        <ul className="space-y-2 bg-gray-50 p-4 border rounded shadow">
          {blogs.map((blog) => (
        <li key={blog._id}>
          <Link href={`/blogs/${blog.slug}`}>
            <span className="text-blue-600 hover:underline">{blog.title}</span>
          </Link>
        </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
