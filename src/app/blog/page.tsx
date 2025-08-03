import { getAllBlogPosts } from "@/lib/blog";
import BlogPostCardVertical from "../components/blog/blog-post-cards/BlogPostCardVertical";
import BackButton from "../components/blog/BackButton";
import FooterColumn from "../components/landing/FooterColumn";

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <BackButton href="/" title="Home" />
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full">
            {/* Blog Header */}
            <div className="mb-12 text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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

        {/* Footer at Bottom */}
        <div className="px-8">
          <div className="max-w-4xl mx-auto">
            <FooterColumn />
          </div>
        </div>
      </div>
    </>
  );
}
