import { getAllBlogPosts } from "@/lib/blog";
import BlogPostCardVertical from "../components/blog/blog-post-cards/BlogPostCardVertical";
import BackButton from "../components/blog/BackButton";

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 py-16">
        <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
          <BackButton href="/" title="Home" />
        </div>

        <div className="max-w-4xl mx-auto px-8">
          {/* Back to Home Button */}

          {/* Blog Header */}
          <div className="mb-12">
            <h1
              className="font-regular text-stone-900 dark:text-stone-100 mb-2 opacity-0 animate-fadeIn"
              style={{
                fontSize: "65px",
                animationDelay: "0ms",
                animationFillMode: "forwards",
              }}
            >
              Blog
            </h1>
            <p
              className="mt-4 text-stone-600 dark:text-stone-400 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
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
