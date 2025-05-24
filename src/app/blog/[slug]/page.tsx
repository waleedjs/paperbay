"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft, Share2, Bookmark, BookmarkCheck, ThumbsUp, Search } from "lucide-react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Post } from "../components/page";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.18.169:3000";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const postResponse = await fetch(`${BASE_URL}/posts/slug/${slug}?status=published`, { cache: "no-store" });

        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData = await postResponse.json();
        setPost(postData.data);

        const relatedResponse = await fetch(
          `${BASE_URL}/posts?status=published&category=${postData.data.category.id}&limit=6`,
          { cache: "no-store" }
        );

        if (!relatedResponse.ok) {
          throw new Error(`HTTP error! status: ${relatedResponse.status}`);
        }

        const relatedData = await relatedResponse.json();
        const filteredRelated = relatedData.data.items.filter((p: Post) => p.id !== postData.data.id);
        setRelatedPosts(filteredRelated);
        setSearchResults(filteredRelated);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = relatedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  function getReadingTime(html: string): number {
    const text = html.replace(/<[^>]+>/g, ""); // remove HTML tags
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute); // round up to nearest minute
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Black Background */}
      <section className="relative h-[400px] flex items-center bg-secondery">
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-white">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all articles
          </Link>

          <div className="mb-8 flex flex-col justify-center items-center">
            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-semibold text-black bg-white rounded-full">
                {post.category?.name || "Uncategorized"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl text-center lg:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center text-sm text-white/80 space-x-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "No date"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {getReadingTime((post.content as { html: string }).html)} min
                  read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section with Sidebar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
                {/* Social Sharing */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        isLiked ? "bg-red-100 hover:bg-red-200" : "bg-gray-100 hover:bg-gray-200"
                      }`}>
                      <ThumbsUp
                        className={`h-5 w-5 transition-colors ${
                          isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        isBookmarked ? "bg-primary/10 hover:bg-primary/20" : "bg-gray-100 hover:bg-gray-200"
                      }`}>
                      {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-primary fill-primary" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {post.headerImage && (
                    <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                      <Image
                        src={`${BASE_URL}${post.headerImage}`} // Fixed template literal syntax
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xl text-gray-700 mb-6">{post.excerpt}</p>
                  {post.content?.html ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.html,
                      }}
                    />
                  ) : (
                    <p>No content available</p>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                    {post.tags?.map((tag) => (
                      <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {tag.name}
                      </span>
                    ))}

                    {/* Additional tags would come from your data */}
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12 bg-gradient-to-r from-primary/90 to-primary rounded-xl shadow-lg p-8 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1974')] opacity-10"></div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Enjoyed this article?</h3>
                    <p className="text-white/90">
                      Subscribe to our newsletter to get the latest updates directly to your inbox.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow px-4 py-3 rounded-md border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Search Results</h4>
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <Link key={result.id} href={`/blog/${result.slug}`} className="flex items-center gap-4 group">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            {result.headerImage && (
                              <Image
                                src={`${BASE_URL}${result.headerImage}`}
                                alt={result.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            )}
                          </div>

                          <div className="flex-grow">
                            <h5 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {result.title}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Posts */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Related Posts</h4>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 5).map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="flex items-center gap-4 group">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          {relatedPost.headerImage && (
                            <Image
                              src={`${BASE_URL}${relatedPost.headerImage}`}
                              alt={relatedPost.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h5>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            <span>
                              {relatedPost.publishedAt
                                ? new Date(relatedPost.publishedAt).toLocaleDateString()
                                : "No date"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
