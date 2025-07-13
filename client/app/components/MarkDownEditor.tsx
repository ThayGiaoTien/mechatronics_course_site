// components/MarkdownRenderer.tsx
'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <article className="prose  lg:prose-xl dark:prose-invert max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          rehypeSlug,

          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap", // makes the entire heading clickable
              properties: {
                className: "anchor-link",
              },
            },
          ],
          rehypeKatex
        ]}
        components={{
        h1: ({ node, ...props }) => <h1 className="mt-8 mb-4 text-2xl" {...props} />,
        h2: ({ node, ...props }) => <h2 className="mt-6 mb-3 text-xl" {...props} />,
        // etc…
        }}
      />
    </article>
  );
}
