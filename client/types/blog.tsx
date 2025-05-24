export interface Blog {
    _id: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    thumbnail?: string;
    categories: string[];
    tags: string[];
    author: string;
    isPublished: boolean;
    publishedAt: string;
  }