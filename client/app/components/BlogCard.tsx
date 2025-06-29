// components/BlogCard.tsx
'use client';
import Link from 'next/link';
import { BlogCardProps } from '@/types/blog_card';

export default function BlogCard({ blog, isAdmin, onRequestDelete }: BlogCardProps) {
  const maxDescriptionLength = 120;
  if (!blog) {
    return <div className="text-gray-500">No blog data available</div>;
  }
  if (blog.description && blog.description.length > maxDescriptionLength) {
    blog.description = blog.description.substring(0, maxDescriptionLength) + '...';
  }
  
  return (
    <div className="rounded-lg border p-4 shadow-sm hover:shadow-md transition">
      {blog.slug &&
      <Link href={`/blogs/${blog.slug}`}>
        <h2 className="text-xl text-gray-900 font-semibold hover:underline">{blog.title}</h2>
      </Link>
}
      <p className="text-gray-800 mt-1">{blog.description}</p>
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-48 h-48 object-cover rounded mt-2"
        />
      )}
      <div className="mt-2 text-sm text-blue-600">
        {blog.categories?.map((cat) => (
          <span key={cat} className="mr-2">#{cat}</span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {blog.tags?.map((tag) => (
          <span key={tag} className="mr-2">#{tag}</span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span>By {blog?.author?.name  || 'Teacher Forward'}</span>
        <span className="ml-4">{new Date(blog.publishedAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span>Views: {blog.views || 0}</span>
      </div>
      {isAdmin && (
        <div className="flex space-x-2 mt-2">
          <Link href={`/admin/edit-blog/${blog.slug}`}>
            <button className="hover:underline bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete(blog._id);
            }}
            className="hover:underline bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div> 
      )}
    </div>
  );
}
