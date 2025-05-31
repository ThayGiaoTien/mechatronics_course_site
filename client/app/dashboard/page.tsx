'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function Dashboard(){
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        if(!token) {
            // If no token, redirect to login page
            router.push('/login');
            return;
        }
        // Fetch user data from the backend
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/user/me`, {
            headers: {
                Authorization: token,
            }, 
        })
        .then((res) => {
            setUserData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Failed to fetch user data:', err);
            setError(err.response?.data?.message || 'Failed to fetch user data');   
            setLoading(false);
        });
    }, [router]);

    if(loading) {
        return (
            <main className="p-6">
                <p>Loading...</p>
            </main>
        );
    }
    if(error) {
        return (
            <main className="p-6">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }   
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">Welcome, {userData.name}</p>
            <p className="mb-4">Your email is: {userData.email}</p>
            <p className="mb-4">Your username ID is: {userData._id}</p>
            <p className="mb-4">Your credentials is: {userData.credit}</p>
            
            {userData.isAdmin  && (
                
                <a href="/admin/courses" className="text-blue-500">Go to admin dashboard</a>
            )}
        </main>
    );
}

