'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import VideoListForm from '@/app/components/VideoListForm';


interface Video {
  title: string;
  description: string;
  youtubeId: string;
  isFree: boolean;
}


export default function CreateCourse() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState('');
   const [videos, setVideos] = useState<Video[]>([]); // 👈 manage video list

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const courseData = {
        title,
        description,
        price,
        thumbnail,
        videos, // ✅ include videos in submit payload
      };

      await axios.post('http://localhost:5000/api/courses', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Course created!');
      router.push('/courses');
    } catch (err: any) {
      console.error('Error creating course:', err);
      alert('Failed to create course.');
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* 👇 Include the VideoListForm component */}
        <VideoListForm videos={videos}  setVideos={setVideos} />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Course
        </button>
      </form>
    </main>
  );
}
