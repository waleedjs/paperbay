import React from 'react';

// Define interfaces and enum within the file
interface Category {
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
  posts?: Post[]; // Optional as it might not always be loaded
  createdAt: Date;
  updatedAt: Date;
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
  searchVector?: unknown;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
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

// Simulated API fetch function (replace with actual API call)
async function fetchPosts(): Promise<ApiResponse> {
  // Mock data for testing; replace with your API endpoint
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          category: {
            id: 'c1',
            name: 'Technology',
            slug: 'technology',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          tags: [
            { id: 't1', name: 'Tech', slug: 'tech', createdAt: new Date(), updatedAt: new Date() },
          ],
          viewCount: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
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

export default async function Page() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const data: ApiResponse = await fetchPosts();
    posts = data.data.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <div className="blog-page">
      <h1>Blog Posts</h1>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <p>
                Status: {post.status}, Author: {post.author.fullName}, Category: {post.category.name}
              </p>
              <p>Published: {post.publishedAt?.toLocaleDateString() || 'Not published'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
      <style jsx>{`
        .blog-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .error {
          color: red;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 5px;
        }
        h2 {
          margin: 0 0 10px 0;
        }
      `}</style>
    </div>
  );
}