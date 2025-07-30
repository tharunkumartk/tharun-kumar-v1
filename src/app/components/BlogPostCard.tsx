import Link from "next/link";
import { BlogPost } from "@/lib/blog";

// Helper function to estimate read time
function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to format date
function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full h-full">
      <div className="flex flex-col h-full space-y-4">
        {/* Gradient image */}
        <div className="rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 flex-shrink-0 w-full h-full" />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[28px] font-medium text-white mb-2">
            {post.title}
          </h3>

          <div className="flex flex-row text-sm text-gray-400 space-x-4">
            <span>{formatDate(post.timestamp)}</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
