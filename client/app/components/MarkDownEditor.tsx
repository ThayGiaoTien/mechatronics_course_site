// components/MarkdownRenderer.tsx
'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

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
        remarkPlugins={[remarkGfm]}
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
        ]}
      />
    </article>
  );
}
