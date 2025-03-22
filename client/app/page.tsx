'use client';

import { useEffect, useState } from "react";
import api from "../lib/api";
import {Course} from "../types/course";
import Link from "next/link";

export default function HomePage(){
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses(){
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err: any) {
        console.error('Faile to fetch courses:', err);
        // Log additional error information
        console.error("Error response:", err.response);
        console.error("Error message:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3x1 font-bold mb-4">All Courses</h1>
      {loading? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course)=> (
            // Mapping of courses to wrap each card with link
            <Link key = {course._id} href={`/courses/${course._id}`}>
              <div
                className="bg-pink p-4 rounded shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <img 
                  src= {course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600">{course.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">{course.price.toLocaleString()}</p>   
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )};

// Testing Tailwind CSS
// export default function Home(){
//   return (
//     <main className="min-h-sreen bg-yellow-100 flex justify-center items-center">
//       <h1 className="text-3xl font-bold text-center">
//         Tailwind is working!
//       </h1>
//     </main>
//   )
// }