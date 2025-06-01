'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';// from next/navigation not next/router 
import axios from 'axios';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/register`, formData);
            // Save token to localStorage, then redirect
            localStorage.setItem('token', res.data.token);
            router.push('/');  // Automatically redirect to home page
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <main className="p-6 mt-30">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className= "border p-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"             
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"                   
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded"
                >
                    Register
                </button>
            </form> 
        </main>
    );
}
