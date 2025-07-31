"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/blog";
import BlogPostCard from "./BlogPostCard";

interface BlogPostHeroProps {
  blogPosts: BlogPost[];
}

export default function BlogPostHero({ blogPosts }: BlogPostHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // // Set up rotation timer
  // useEffect(() => {
  //   if (blogPosts.length <= 1) return;

  //   const interval = setInterval(() => {
  //     // Start fade out
  //     setIsVisible(false);

  //     // After fade out completes, change post and fade in
  //     setTimeout(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  //       setIsVisible(true);
  //     }, 600); // 300ms for fade out duration
  //   }, 5000); // 5 seconds between rotations

  //   return () => clearInterval(interval);
  // }, [blogPosts.length]);

  // // Reset visibility when currentIndex changes
  // useEffect(() => {
  //   setIsVisible(true);
  // }, [currentIndex]);

  if (blogPosts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-gray-400">No recent posts available.</div>
      </div>
    );
  }

  const currentPost = blogPosts[currentIndex];

  return (
    <div className="relative w-full h-[40vh]">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <BlogPostCard post={currentPost} />
      </div>
    </div>
  );
}
