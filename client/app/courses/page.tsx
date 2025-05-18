'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import DeleteConfitmModal from '../components/DeleteConfirmModal';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  
  const handleRequestDelete = (id:string) => {
    setSelectedCourseId(id);
    setShowModal(true);
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setIsAdmin(user.isAdmin);

        const res = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err: any) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
   // alert(`Trying to delete course: ${id}`); // Debugging
    //if (!window.confirm('Are you sure you want to delete this course?')) return
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(courses.filter((course) => course._id !== id));
      alert('Course deleted successfully');
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('Failed to delete course.');
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ✅ Delete confirmation modal */}
      <DeleteConfitmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          if (selectedCourseId) {
            handleDelete(selectedCourseId);
          }
        }}
        message="Are you sure you want to delete this course?"
      />
      {/* ✅ Courses list */}
    
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {isAdmin && (
        <Link href="/admin/create-course">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Create New Course</button>
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded">
          {/* ✅ Only the image and title are clickable */}
          <Link href={`/courses/${course._id}`}>
            <div className="cursor-pointer">
              
              {<img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded" />}
              <h2 className="text-lg font-bold mt-2">{course.title}</h2>
            </div>
          </Link>
 
          <p className="text-gray-600">{course.description}</p>
          <p className="font-bold mt-2">${course.price}</p>
        
          {isAdmin && (
            <div className="flex space-x-2 mt-2">
              <Link href={`/admin/edit-course/${course._id}`}>
                <button className="hover:underline bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              </Link>
              {/* ✅ Delete button */}
              <button
                onClick={(e) => {
                 // e.preventDefault();
                  e.stopPropagation();  
                  console.log("Delete clicked for:", course._id); // 🔍 Debug log
                  handleRequestDelete(course._id);
                }}
                className="hover:underline bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        
        ))}
        
      </div>
    </div>
  );
}
