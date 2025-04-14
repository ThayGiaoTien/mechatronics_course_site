'use client';

import { useState } from 'react';

interface Video {
  title: string;
  description: string;
  youtubeId: string;
  isFree: boolean;
}

interface VideoListFormProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

export default function VideoListForm({ videos, setVideos }: VideoListFormProps) {
  const handleVideoChange = (index: number, field: keyof Video, value: string | boolean) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], [field]: value };
    setVideos(updated);
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', description: '', youtubeId: '', isFree: false }]);
  };

  const removeVideo = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Course Videos</h2>
      {videos.map((video, index) => (
        <div key={index} className="border p-4 rounded shadow-sm space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Video {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeVideo(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={video.title}
            onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={video.description}
            onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="YouTube Video ID"
            value={video.youtubeId}
            onChange={(e) => handleVideoChange(index, 'youtubeId', e.target.value)}
            className="w-full border p-2 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={video.isFree}
              onChange={(e) => handleVideoChange(index, 'isFree', e.target.checked)}
            />
            <span>Free for everyone</span>
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={addVideo}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Video
      </button>
    </div>
  );
}
