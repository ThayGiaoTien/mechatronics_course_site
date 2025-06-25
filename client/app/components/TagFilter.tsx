'use client';
import { Tag } from "@/types/tag";
// components/TagFilter.tsx
export default function TagFilter({ tags, selected, onSelect }: Tag) {
  if (!tags || tags.length === 0) { 
    return <div className="text-gray-500">Không có từ khoá</div>;
  }
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1 rounded ${selected === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Từ khóa liên quan
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`px-3 py-1 rounded ${selected === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
            #{tag}
          </button>
        ))}
      </div>
    );
  }
  