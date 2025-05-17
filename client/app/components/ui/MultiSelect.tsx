// components/ui/MultiSelect.tsx
'use client';
import React from 'react';

interface MultiSelectProps {
  label?: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelect({ label, options, value, onChange }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`px-3 py-1 border rounded-full transition ${
              value.includes(option)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
