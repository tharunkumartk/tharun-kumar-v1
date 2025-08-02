import Link from "next/link";
import {
  BlogPostCardProps,
  formatDate,
  estimateReadTime,
} from "./BlogPostCardProps";

export default function BlogPostCardHorizontal({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full h-full">
      <div className="flex flex-row h-full space-x-8 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50">
        {/* Gradient image */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="rounded-xl flex-shrink-0 w-[200px] h-[150px] object-cover"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[28px] font-medium text-gray-900 dark:text-white mb-2">
            {post.title}
          </h3>

          <div className="flex flex-row text-sm text-gray-600 dark:text-gray-400 space-x-4">
            <span>{formatDate(post.timestamp)}</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
