'use client';
import { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const ReactMde = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
//import 'react-mde/lib/styles/css/react-mde-all.css';

// Custom components
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Textarea from '@/app/components/ui/TextArea';
import MultiSelect from '@/app/components/ui/MultiSelect';
//const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import * as Showdown from 'showdown';

export default function AdminBlogEditor() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string>('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // Assuming you have a way to get the author

  const [isPublished, setIsPublished] = useState(false);

  const converter = new Showdown.Converter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to create a blog post.');
        return;
      }
      if (!title || !description || !content) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!slug) {
        const slugifiedTitle = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        setSlug(slugifiedTitle);
      }
      //Check if slug already exists
      const existingSlug = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/blogs/${slug}`);
      if (existingSlug.data.exists) {
        alert('Slug already exists. Please choose a different one.');
        return;
      }
      // Create the blog post 
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/blogs`, {
        title,
        description,
        slug,
        content,
        thumbnail,
        categories,
        tags: tags.split(',').map(t => t.trim()),
        author,
        isPublished,
       
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/blogs');
    } catch (err: any) {
      console.error('Error creating blog:', err);
      alert('Failed to save blog.');
    }
  };

  useEffect(() => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user? setAuthor(user.name) : setAuthor(''); // Set author from user context
    }, []);
  

  return (
    <div className="max-w-4xl mt-30 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Blog Post</h1>

      <Input label="Title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="mb-2" />
      <Input label="Slug" placeholder="Slug (auto-generate or type)" value={slug} onChange={e => setSlug(e.target.value)} className="mb-2" />
      <Textarea placeholder="Short description..." value={description} onChange={e => setDescription(e.target.value)} className="mb-2" />
      <Input label="Thumbnail" placeholder="Thumbnail URL (CDN image)" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="mb-2" />

      <MultiSelect
        options={["Electronics", "Mạch DC", "Tụ điện", "Cuộn cảm", "Điện trở", "Mạch AC"]}
        value={categories}
        onChange={setCategories}
        label="Categories"
      />

      <Input label="Tag" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="mb-2" />

      {/* Author is now referenced from user context or authentication, so no manual input */}
      {/* Markdown Editor */}

      <ReactMde
        value={content}
        onChange={(value) => setContent(value || '')}
        className="react-md-editor"
      />

      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
          Publish Now
        </label>
        <Button onClick={handleSubmit}>Save Blog</Button>
      </div>
    </div>
  );
}
