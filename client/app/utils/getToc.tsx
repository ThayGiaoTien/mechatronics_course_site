'use client';

// utils/getToc.ts
export type TocItem = { id: string; text: string; level: number };

export function getToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const Toc: TocItem[] = [];

  for (let line of lines) {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (match) {
      const level = match[1].length;            // number of # → heading level
      const text = match[2].trim();             // heading text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")                // remove punctuation
        .replace(/\s+/g, "-");                  // spaces → dashes

      Toc.push({ id, text, level });
    }
  }

  return Toc;
}
