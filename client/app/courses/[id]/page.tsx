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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`);
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
  if (!course) return <p>Đang tải khóa học...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-30 p-6">
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
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                </div>
            ) : (
              <div className="mt-2 text-red-500 italic">
                🔒 Video chứa nội dung cần trả tiền. Mở khóa để xem!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
