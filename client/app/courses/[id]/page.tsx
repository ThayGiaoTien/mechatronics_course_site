'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Course } from '../../../types/course';

export default function CoursePage() {
  const { id } = useParams() as {id: string}; // Get the course ID from the URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        // Make HTTP GET request to your backend API 
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    }
    if(id) fetchCourse();
  }, [id]);

  // Processing
  if(loading) {
    return (
        <main className="p-6">  
            <p>Loading...</p>   
        </main>
    );
  }
  if(!course) {
    return (
        <main className="p-6">  
            <p>Course not found</p>   
        </main> 
    );
  }

  return (
    <main className="p-6">
    
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <img 
            src = {course.thumbnail}
            alt={course.title}
            className="w-full h-40 object-cover rounded mb-4"
        />
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <p className="text-lg font-bold text-blue-600">
        {course.price.toLocaleString()}
        </p>
        
    </main>
  );
}