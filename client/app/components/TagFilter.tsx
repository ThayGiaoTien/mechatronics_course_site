'use client';

// components/TagFilter.tsx
export default function TagFilter({ tags, selected, onSelect }) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1 rounded ${selected === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All Tags
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`px-3 py-1 rounded ${selected === tag ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            #{tag}
          </button>
        ))}
      </div>
    );
  }
  