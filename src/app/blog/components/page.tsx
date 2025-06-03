// app/blog/page.tsx
import React from 'react';

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  posts?: Post[];
  createdAt: string;
  updatedAt: string;
}

interface Author {
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

interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  posts?: Post[];
  createdAt: string;
  updatedAt: string;
}

enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: { html: string };
  headerImage?: string;
  status: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  structuredData?: object;
  viewCount: number;
  // searchVector?: unknown;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
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

// Simulated API fetch
async function fetchPosts(): Promise<ApiResponse> {
  const now = new Date().toISOString();
  return {
    data: {
      items: [
        {
          id: '1',
          title: 'First Blog Post',
          slug: 'first-blog-post',
          excerpt: 'This is the excerpt for the first post.',
          content: { html: '<p>Full content here</p>' },
          status: PostStatus.PUBLISHED,
          author: {
            id: 'a1',
            email: 'author1@example.com',
            fullName: 'John Doe',
            profileImage: null,
            role: 'Writer',
            isVerified: true,
            isActive: true,
            createdAt: now,
            updatedAt: now,
          },
          category: {
            id: 'c1',
            name: 'Technology',
            slug: 'technology',
            createdAt: now,
            updatedAt: now,
          },
          tags: [
            {
              id: 't1',
              name: 'Tech',
              slug: 'tech',
              createdAt: now,
              updatedAt: now,
            },
          ],
          viewCount: 100,
          createdAt: now,
          updatedAt: now,
          publishedAt: now,
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    },
    message: 'Success',
    statusCode: 200,
  };
}

// ✅ Correct Server Component
export default async function BlogPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const response = await fetchPosts();
    posts = response.data.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="border border-gray-300 rounded-lg p-5 shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-2">{post.excerpt}</p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {post.status} &nbsp;|&nbsp;
                <strong>Author:</strong> {post.author.fullName} &nbsp;|&nbsp;
                <strong>Category:</strong> {post.category.name}
              </p>
              <p className="text-sm text-gray-500">
                Published: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
