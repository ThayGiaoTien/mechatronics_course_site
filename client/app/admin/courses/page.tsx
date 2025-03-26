'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminCoursesPage (){
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch courses data from the backend
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/courses');
                setCourses(res.data);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
                
            } 
        };
        fetchCourses();
    }, []);

    // DELETE course - have not implemented the delete function
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`);
            setCourses((prevCourses: any) => prevCourses.filter((course: any) => course._id !== id));
        } catch (err) {
            console.error('Failed to delete course:', err);
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Courses Management</h1>
            {courses.length === 0 ? (
                <p>No courses found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">         
                    {courses.map((course: any) => (
                        <div key={course._id} className="bg-pink-100 p-4 rounded shadow-md hover:shadow-lg transition cursor-pointer">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded mb-2" />
                            <h2 className="text-xl font-semibold">{course.title}</h2>
                            <p className="text-sm text-gray-600">{course.description}</p>
                            <p className="text-lg font-bold text-blue-600 mt-2">{course.price.toLocaleString()}</p>
                            <div className="mt-4 flex justify-between">
                                <Link href={`/admin/edit-course/${course._id}`}>
                                    Edit course
                                </Link>
                                <button onClick={() => handleDelete(course._id)} className="text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}  
                </div>
                )}
        </main>
    );
}