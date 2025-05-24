import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={600} // Set width here
              height={400} // Set height here
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full">{post.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">{post.title}</h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-primary hover:text-indigo-800 transition-colors">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
