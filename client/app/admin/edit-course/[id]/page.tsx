// client/app/admin/edit-course/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Video = {
  id: string;
  title: string;
  url: string;
};
import { useParams, useRouter } from 'next/navigation';
import VideoListForm from '@/app/components/VideoListForm';
import axios from 'axios';

  const [videos, setVideos] = useState<Video[]>([]); // 👈 manage video list
export default function EditCoursePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]); // 👈 manage video list
  const [error, setError] = useState('');

  // Fetch course data for editing
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token') || ''}` ,
            
        },
        });
        setCourse(res.data);
        setVideos(res.data.videos || []); // Initialize videos from course data
      } catch (err: any) {
        console.error('Error fetching course:', err.response?.data || err.message);
        setError('Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);
    // No need to include the VideoListForm into the hidden input field since the `videos` state is already being managed and updated directly.
    // You can safely remove the hidden input field and ensure the `videos` state is part of the `course` object before submission.

    useEffect(() => {
      if (course) {
        setCourse({ ...course, videos });
      }
    }, [videos]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (course) {
      setCourse({ ...course, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;


    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if(!token) {
        // If no token, redirect to login page
        router.push('/login');
        return;
    }
    try {
      // Update the course via a PUT request
      await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token') || ''}` ,
            
        },
      });
      alert('Course updated successfully!');
      router.push('/courses');
    } catch (err: any) {
      console.error('Update error:', err.response?.data || err.message);
      alert('Failed to update course.');
    }
  };

  if (loading) return <p className="p-6">Loading course details...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!course) return <p className="p-6">Course not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Course Price"
          value={course.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={course.thumbnail}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* 👇 Include the VideoListForm component */}
          <VideoListForm videos={videos} setVideos={setVideos} />
          
    /
        
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Course
        </button>
      </form>
    </div>
  );
}
