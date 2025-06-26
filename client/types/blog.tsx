interface Author{
  _id: string;
  name: string;
  
}
export interface Blog {
    _id: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    thumbnail?: string;
    categories: string[];
    tags: string[];
    author: Author;
    isPublished: boolean;
    views: number;
    publishedAt: string;
  }