// components/ui/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Example: load user from localStorage or context
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Khóa học", href: "/courses" },
    { label: "Bài viết", href: "/blogs" },
    { label: "Dự án thực tế", href: "/projects" },
    { label: "Liên hệ", href: "/about" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        {/* Above: Logo */}
        <div className="flex items-center justify-center bg-blue-100 py-2">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-600 cursor-pointer">
              tailieucodientu.com
            </span>
          </Link>
        </div>
        
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3  text-gray-1000 text-2xl font-italic ">

        {/* Center / Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`${
                pathname === href
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        

        {/* Right: User/Login */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
                <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
                >
                {user.name}
                </Link>
                <Link 
                href="/"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => {
                  // Clear user data on logout
                  localStorage.removeItem("user");
                  setUser(null);
                }}
                >
                Đăng xuất
                </Link>
            </>
            
          ) : (
            <>
                <Link href="/login" className="text-xl text-gray-600 hover:text-blue-600">
                Đăng nhập
                </Link>
                <Link href="/register" className="text-xl text-gray-600 hover:text-blue-600">
                Đăng ký
                </Link>
            </>
            
            
          )}
        </div>

        {/* Mobile: Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile: Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`block px-2 py-2 rounded ${
                  pathname === href
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-200 mt-2 pt-2">
              {user ? (
                <>
                    <Link
                    href="/dashboard"
                    className="block px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    {user.name}
                    </Link>
                    <Link 
                    href="/"
                    className="block px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                    // Clear user data on logout
                    localStorage.removeItem("user");
                    setUser(null);
                    }}
                    >
                    Đăng xuất
                    </Link>
                </>
                
              ) : (
                <>
                    <Link href="/login" className="block px-2 py-2 rounded text-gray-700 hover:bg-gray-50">
                    Đăng nhập
                    </Link>
                    <Link href="/login" className="block px-2 py-2 rounded text-gray-700 hover:bg-gray-50">
                    Đăng ký
                    </Link>
                </>
                
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
