// types/blog.ts
export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    readTime: number;
    excerpt: string;
    tags: string[];
    coverImage?: string;
    content: string;
  }