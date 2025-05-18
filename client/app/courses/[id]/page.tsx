'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Video {
  youtubeId: string;
  title: string;
  description: string;
  isFree: boolean;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  videos: Video[];
}

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        //console.log(res.data);
      } catch (err: any) {
        setError('Failed to load course');
      }
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchCourse();
  }, [id]);

  const hasAccess = (video: Video): boolean => {
    return video.isFree || (user && user.purchasedCourses?.includes(course?._id));
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-4 text-gray-600">{course.description}</p>

      <div className="grid gap-6">
        {course.videos.map((video, index) => (
          <div key={index} className="mb-4">
          <h3 className="font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.description}</p>
          {/* ✅ Video thumbnail */}  
          {/* <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded" /> */}
          {/* ✅ Video iframe */}
            {hasAccess(video) ? (
              <div className="mt-2 aspect-video">
                <iframe
                  width="100%"
                  height="315"
                  src={video.youtubeId.replace("watch?v=", "embed/")}
                      title={video.title}
                      frameBorder="0"
                      allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="mt-2 text-red-500 italic">
                🔒 You need to purchase this course to view this video.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
