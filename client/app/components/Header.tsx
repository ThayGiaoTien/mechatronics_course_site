'use client';
// components/HeaderPanel.tsx
import React from 'react';

export default function HeaderPanel() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center flex-col py-4">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="tailieucodientu.com logo"
          className="h-16 w-auto mb-2"
        />
        {/* Slogan */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Làm Chủ Công Nghệ 4.0
        </h1>
      </div>
    </header>
  );
}
