// components/CategoryFilter.tsx
'use client';
import { Category} from "@/types/category";

export default function CategoryFilter({ categories, selected, onSelect }: Category ){
    return (
      <div className="flex text-sm flex-wrap gap-1 mb-1">
        <button
          onClick={() => onSelect(null)}
          className={`px-1 py-1 rounded ${selected === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Tất cả danh mục
        </button>
        {categories?.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-1 py-1 rounded ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
  