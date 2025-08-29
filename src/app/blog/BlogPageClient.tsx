"use client";

import { useState } from "react";
import BlogPostCardVertical from "../components/blog/blog-post-cards/BlogPostCardVertical";
import BlogPostCardHorizontalLong from "../components/blog/blog-post-cards/BlogPostCardHorizontalLong";
import BackButton from "../components/blog/BackButton";
import FooterColumn from "../components/landing/FooterColumn";
import ViewToggle from "../components/blog/ViewToggle";
import { BlogPost } from "@/lib/types";

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const handleViewChange = (view: "grid" | "list") => {
    setViewMode(view);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Header with Back Button */}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-16 space-y-16">
          <div className="max-w-6xl mx-auto w-full">
            <BackButton href="/" title="Home" />

            {/* Blog Header */}
            <div className="mb-12">
              <div className="text-center">
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

              {/* View Toggle */}
              <div className="flex justify-end mt-8">
                <ViewToggle
                  onViewChange={handleViewChange}
                  defaultView="list"
                />
              </div>
            </div>

            {/* Blog Posts */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {posts.map((post, index) => (
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
            ) : (
              <div className="space-y-6 mb-16">
                {posts.map((post, index) => (
                  <div
                    key={post.slug + index}
                    className="opacity-0 animate-fadeIn"
                    style={{
                      animationDelay: `${200 + index * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <BlogPostCardHorizontalLong post={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8">
          <div className="max-w-6xl mx-auto">
            <FooterColumn />
          </div>
        </div>
      </div>
    </>
  );
}
