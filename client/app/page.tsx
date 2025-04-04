'use client';

import { useEffect, useState } from "react";
import api from "../lib/api";
import {Course} from "../types/course";
import Link from "next/link";

export default function HomePage(){

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-red">
      
      <div>
        {/*Hero sections*/}
        <section 
          className="bg-cover bg-center h-64 flex items-center justify-center" 
          style={{ backgroundImage: `url('../sources/homepage_background.jpg')` }}
        > 
          <div className="bg-black bg-opacity-50 p-4 rounded">
            <h1 className="text-4xl font-bold text-white">Welcome to Teacher Forward</h1>
            <p className="text-white mt-2">Learn from the collected and qualified videos and documentation</p>
            <Link href='/courses'> 
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">Browse Courses</button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className= "p-6"> 
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/courses?category=programming">
              <h3 className="font-semibold">Programming</h3>
              <p>Learn the fundamental concepts of programming</p>
            </Link>
            <Link href="/courses?category=electronic">
              <h3 className="font-semibold">Electronics</h3>
              <p>Learn the fundamental concepts of electronics</p>
            </Link>
            <Link href="/courses?category=programming">
              <h3 className="font-semibold">Robotics and Automations</h3>
              <p>Learn the fundamental concepts of Robotics, Automations, PLC and manymore</p>
            </Link>
          </div>
        </section>

        {/* Add more categories here */}
      </div>
    </nav>
    
  )};

