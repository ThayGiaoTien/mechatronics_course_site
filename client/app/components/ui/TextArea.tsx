// components/ui/TextArea.tsx
'use client';
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <textarea
        {...props}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        rows={props.rows || 4}
      />
    </div>
  );
}
