'use client';
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Tag } from "lucide-react"; // example icon

interface CategorySectionProps {
  categories: string[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [active, setActive] = useState<string | null>(params.get("category"));

  useEffect(() => {
    setActive(params.get("category"));
  }, [params]);

  const handleClick = (cat: string) => {
    const href =
      active === cat
        ? "/?categories=" // clear filter
        : `/?categories=${encodeURIComponent(cat)}`;
    setActive(active === cat ? null : cat);
    router.push(href);
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
                ${
                  active === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }
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
