'use client';
// components/TableOfContents.tsx
import { TocItem } from "@/app/utils/getToc";
import { nextImageLoaderRegex } from "next/dist/build/webpack-config";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav>
      <ul className="space-y-1">
        {items.map(({ id, text, level }, idx) => (
          <li
            key={`${id}-${idx}`}                  // now unique even if id repeats
            className={`pl-${(level - 1) * 4} text-sm hover:text-blue-600`}
          >
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
