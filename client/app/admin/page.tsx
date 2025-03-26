'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function AdminDashBoard(){
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
        // Check if user is admin
        if(userData.userRole !== 'admin') {
            router.push('/login');
            console.log("You are not an admin");
            return;
        }
        // Fetch user data from the backend
        axios.get('http://localhost:5000/api/user/me', {
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
            <h1 className="text-2xl font-bold mb-4">Admin Dash Board</h1>
            <p className="mb-4">Welcome BOSS, {userData.userName}</p>
            <p className="mb-4">Your email is: {userData.userEmail}</p>
            <p className="mb-4">Your username ID is: {userData.userId}</p>
            <p className="mb-4">Your credentials is: {userData.userCredit}</p>
        </main>
    );
}