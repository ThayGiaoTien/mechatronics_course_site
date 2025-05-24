import { Blog } from './blog';
export interface BlogCardProps {
    blog: Blog;
  isAdmin: boolean;
  onRequestDelete: (id: string) => void;
}