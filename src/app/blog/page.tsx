import { getAllBlogPosts } from "@/lib/blog";
import BlogPostCardVertical from "../components/blog/blog-post-cards/BlogPostCardVertical";
import BackButton from "../components/blog/BackButton";

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Back to Home Button */}
          <div className="flex items-center justify-between mb-16">
            <BackButton />
          </div>

          {/* Blog Header */}
          <div className="mb-12">
            <h1
              className="font-bold text-gray-900 dark:text-gray-100 mb-2 opacity-0 animate-fadeIn"
              style={{
                fontSize: "45px",
                animationDelay: "0ms",
                animationFillMode: "forwards",
              }}
            >
              Blog
            </h1>
            <p
              className="mt-4 text-gray-600 dark:text-gray-400 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
              style={{
                fontSize: "18px",
                animationDelay: "100ms",
                animationFillMode: "forwards",
              }}
            >
              A collection of memories, projects, and dialogue
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.slug + index}
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${200 + index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <BlogPostCardVertical post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
