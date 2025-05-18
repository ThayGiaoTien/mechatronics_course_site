// components/CategoryFilter.tsx
'use client';
export default function CategoryFilter({ categories, selected, onSelect }) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1 rounded ${selected === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-3 py-1 rounded ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
  