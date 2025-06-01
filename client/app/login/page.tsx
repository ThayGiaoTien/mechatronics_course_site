'use client';

import {useState, useContext} from 'react';
import {useRouter} from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function LoginPage(){
    const router = useRouter();
    const {setUser} = useContext(AuthContext);
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
   
            console.log("Sending form data: " ,formData);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, formData);
            // Save token to localStorage, update AuthContext then redirect to the homepage
            const {token, user} = res.data;
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
            setUser(user);
            console.log("Login succesfully!");
            router.push('/'); // Automatically redirect to home page
        } catch (err: any) {
            console.log("Login failed!");
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    return (
        <main className = "mt-30 p-6">
            <h1 className = "text-2xl font-bold mb-4">Login</h1>
            {error && <p className = "text-red-500 mb-4"> error </p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input 
                    type="email" 
                    name ="email" 
                    placeholder="Email" 
                    value= {formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required 
                />
                <input 
                    type="password" 
                    name ="password" 
                    placeholder="Password" 
                    value= {formData.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required 
                />
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white p-2 rounded"
                >   
                    Login
                </button>
            </form>
        </main>
    );
}

