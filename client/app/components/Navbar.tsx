'use client';

import Link from 'next/link';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';   

export default function Navbar() {
    const router = useRouter();
    const {user, setUser} = useContext(AuthContext);
    

    // These codes are no longer needed since we are using AuthContext to manage user state
    // useEffect(() => {
    //     // Retrieve the user data from localStorage
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser){
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    const handleLogout= () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className='flex items-center justify-between p-3 bg-blue-600 opacity-90 text-white'>
            <div className='space-x-3 '>
            <Link href='/'> 
                <span className='font-bold  text-2xl cursor-pointer'> Trang chủ </span>
            </Link>
            <Link href='/courses'> 
                <span className='font-italic  text-xl cursor-pointer'>Khóa học</span>
            </Link>
            <Link href='/blogs'> 
                <span className='font-italic  text-xl cursor-pointer'>Bài viết</span>
            </Link>
            <Link href='/projects'> 
                <span className='font-italic  text-xl cursor-pointer'>Dự án</span>
            </Link>
            <Link href='/about'> 
                <span className='font-italic  text-xl cursor-pointer'>Liên hệ</span>
            </Link>
            </div>
            <div className='space-x-4 inline-flex '>
                
                {user? ( 
                    <> 
                        
                        <Link href='/dashboard'>
                        <h1 className= "hover:underline cursor-pointer">Welcome, <p className='font-bold'>{user.name}</p></h1>
                        </Link>
                        <button onClick = {handleLogout} className = "hover:underline">
                            Log out
                        </button>
                    </>
                        ):(
                    <>
                        <Link href='/login'>
                            <span className='hover:underline cursor-pointer'>Login</span>
                        </Link>
                        <Link href='/register'>
                            <span className='hover:underline cursor-pointer'>Register</span>
                        </Link>
                    </>
                        )
                }
            </div>
        </nav>
    );
}

