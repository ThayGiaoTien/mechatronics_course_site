'use client'
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const markdown = `
Here is an inline equation: $E = mc^2$

And a block equation:

$$
F = k \\frac{|q_1 q_2|}{r^2}
$$
`;

export default function MarkdownRenderer() {
  return (
    <div style={{ padding: '20px' }}>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  );
}
