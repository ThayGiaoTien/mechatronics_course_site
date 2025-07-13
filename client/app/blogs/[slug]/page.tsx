'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
//import rehypeHighlight from "rehype-highlight";
import axios from 'axios';
import MarkDownEditor from '@/app/components/MarkDownEditor';
import RelatedBlogsSection from '@/app/components/RelatedBlogsSection';



import  {Blog}  from '@/types/blog';
import { RelatedBlog } from '@/types/related_blogs';

export default function BlogDetailPage() {
  // Using useRouter to get the slug from the URL
  // This is the recommended way in Next.js 13+ with app directory
  // as useParams is not available in the app directory
  const router = useRouter();
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (slug) {
      // Fetch the blog post based on the slug
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/blogs/${slug}`);
          setBlog(res.data);
         
          // Fetch related blogs
          const related= await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/blogs/related?category=${res.data?.categories[0]}&excludeId=${res.data._id}`);
          setRelatedBlogs(related.data);
        } catch (error) {
          console.error('Error fetching blog:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    
    }
  }, [slug]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!blog) return <div className="p-4 text-red-500">Blog not found</div>;

  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-2/5 md:max-w-xs mt-30 md:mt-30 p-6 shadow">
        <RelatedBlogsSection blogs={relatedBlogs} />
      </div>
      <div className="w-full md:w-3/5 mt-10 md:mt-30 pl-2 pr-1 md:p-6">
      {blog.thumbnail && (
        <img
        src={blog.thumbnail}
        alt="Blog Thumbnail"
        className="w-auto h-32 md:h-64 object-cover rounded-xl mb-6 shadow"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-4">{blog.description}</p>
      <div className="text-sm text-gray-400 mb-4">
        <span>By {blog?.author?._id || 'Teacher Forward'}</span>
        <span className="mx-2">|</span>
        <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {blog.categories.map((cat: string) => (
        <span
          key={cat}
          className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
        >
          {cat}
        </span>
        ))}
      </div>

      <MarkDownEditor content={blog.content} />
      </div>
      
    </div>

    
  );
}
