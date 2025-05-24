export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  posts?: Post[]; // Optional as it might not always be loaded
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string | null;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  posts?: Post[]; // Optional as it might not always be loaded
  createdAt: Date;
  updatedAt: Date;
}

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: { html: string };
  headerImage?: string;
  status: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  structuredData?: object;
  viewCount: number;
  searchVector?: unknown;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse {
  data: {
    items: Post[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
  message: string;
  statusCode: number;
}
