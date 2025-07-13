
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Tag } from "lucide-react"; // example icon
import axios from "axios";

interface CategorySectionProps {
  categories: string[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
   const router = useRouter();
  const [loadingCat, setLoadingCat] = useState<string | null>(null);

  const handleClick = async (cat: string) => {
    setLoadingCat(cat);
    try {
      // Fetch the newest single blog in this category
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/blogs`,
        {
          params: {
            categories: cat,
            sort: 'newest',
            page: 1,
            limit: 1,
          },
        }
      );

      const first = res.data[0];
      if (first && first.slug) {
        router.push(`/blogs/${first.slug}`);
      } else {
        alert('Không có bài viết nào trong danh mục này.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lấy bài viết đầu tiên.');
    } finally {
      setLoadingCat(null);
    }
  };


  return (
    <div className="w-3/5 mx-auto px-4 mb-8">
      <h2 className="text-2xl  font-semibold text-center mb-1">Xem các bài viết theo danh mục</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 gap-2">
        {categories?.map((cat) => (
          <Link href={`/blogs?categories=${encodeURIComponent(cat)}`} key={cat}>
            <button
              onClick={() => handleClick(cat)}
              className={`
                flex flex-col bg-blue-200 items-center justify-center p-4
                rounded-lg shadow-sm hover:shadow-md transition
                w-full h-16
                ${loadingCat === cat ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {/* <Tag className="w-6 h-6 mb-2" /> */}
              <span className="text-gray-600 font-semibold italic">{cat}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
