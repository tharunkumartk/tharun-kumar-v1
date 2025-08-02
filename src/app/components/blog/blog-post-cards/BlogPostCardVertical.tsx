import Link from "next/link";
import Image from "next/image";
import {
  BlogPostCardProps,
  formatDate,
  estimateReadTime,
} from "./BlogPostCardProps";

export default function BlogPostCardVertical({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full h-full">
      <div className="flex flex-col h-full space-y-4 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50">
        {/* Gradient image */}
        <div className="relative aspect-video rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-900 dark:text-white mb-2 line-clamp-3">
            {post.title}
          </h3>

          <div className="flex flex-row text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-x-4 mt-auto">
            <span>{formatDate(post.timestamp)}</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
