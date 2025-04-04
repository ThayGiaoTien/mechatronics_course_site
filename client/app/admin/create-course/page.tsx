'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

export default function CreateCoursePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({title: '', discription: '', price: 0, thumbnail: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/courses', formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
            });
            alert('Course created successfully');
            router.push('/courses');
        } catch (err: any) {
            console.error('Failed to create course:', err);
            setError(err.response?.data?.message || 'Failed to create course');
            setLoading(false);
        }
    };
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create a new course</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="discription"
                    placeholder="Discription"
                    value={formData.discription}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="thumbnail"
                    placeholder="Thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Create Course
                </button>
            </form>
        </main>
    );
}