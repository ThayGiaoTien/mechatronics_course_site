'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
const ReactMde = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
//import 'react-mde/lib/styles/css/react-mde-all.css';

// Custom components
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Textarea from '@/app/components/ui/TextArea';
import MultiSelect from '@/app/components/ui/MultiSelect';
import Showdown from 'showdown';
import api from '@/lib/api'; // Adjust the import path as necessary
import  {Blog}  from '@/types/blog';
// Removed unused import

export default function EditBlogPage() {
    const params = useParams();
    const blogSlug= params.slug;
    
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [slug, setSlug] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [tags, setTags] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [author, setAuthor] = useState<string>(''); // Assuming you have a way to get the author
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [id, setId] = useState<string>('');

   
    // Removed unused state
    
    
    // Removed unused variable

    // Fetch blog data for editing
    
    useEffect(() => {
        if (!blogSlug) {
            setError('Blog slug is required');
            return;
        }
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${api}/blogs/${blogSlug}`, {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}` ,
                    },
                });
                const blogData = res.data;
                setBlog(blogData);
                setTitle(blogData.title);
                setSlug(blogData.slug);
                setDescription(blogData.description);
                setThumbnail(blogData.thumbnail);
                setCategories(blogData.categories);
                setTags(blogData.tags.join(', '));
                setContent(blogData.content);
                setAuthor(blogData.author);
                setIsPublished(blogData.isPublished);
                setLoading(false);
                setId(blogData._id);
            }
            catch (err: any) {
                console.error('Error fetching blog:', err.response?.data || err.message);
                alert('Failed to load blog data.');
            }
        };
        fetchBlog();
        
    }, []);
    
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!blog){
            alert('Blog not found');
            return;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a blog post.');
            router.push('/login');
            return;
        }
        if (!blog.title || !blog.description || !blog.content) {
            alert('Please fill in all required fields.');
            return;
        }
          
        try {
        // Update the blog via a PUT request
          await axios.put(`${api}/blogs/${id}`, {
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
                  'Content-Type': 'application/json',
              },
          });
          
          alert('Blog updated successfully!');
          router.push('/blogs');
        
        }
        catch (err: any) {
            console.error('Error:', err.response?.data || err.message);
            alert('Failed to update blog.');
        } 
        
    };
  
    if (loading) return <p className="p-6">Loading blog details...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;
    if (!blog) return <p className="p-6">Blog not found.</p>;


      return (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
    
          <Input label="Title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="mb-2" />
          <Input label= "Slug" placeholder="Slug (auto-generate or type)" value={slug} onChange={e => setSlug(e.target.value)} className="mb-2" />
          <Textarea placeholder="Short description..." value={description} onChange={e => setDescription(e.target.value)} className="mb-2" />
          <Input label = "Thumbnail" placeholder="Thumbnail URL (CDN image)" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="mb-2" />
    
          <MultiSelect
            options={["Electronics", "Microcontroller", "Programming", "Mechanical","Embedded","Electrical"]}
            value={categories}
            onChange={ setCategories}
            label='Categories'
            
          />
    
          <Input label = "Tag"placeholder="Tags (comma separated)" value={blog.tags} onChange={e => setTags(e.target.value)} className="mb-2" />
    
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
            <Button onClick={handleSubmit}>Update Blog</Button>
          </div>
        </div>
      );
}