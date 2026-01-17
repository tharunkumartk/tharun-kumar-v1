import Link from "next/link";
import Image from "next/image";
import { BlogPostCardProps } from "./BlogPostCardProps";
import { formatDate, estimateReadTime } from "@/lib/utils";
import { T, Var } from "gt-next";

export default function BlogPostCardVertical({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full h-full">
      <div className="flex flex-col h-full space-y-4 rounded-lg transition-colors duration-300">
        {/* Gradient image */}
        <div className="relative aspect-square rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover aspect-square transition-transform duration-300 group-hover:scale-115"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <h3 className="text-lg font-medium text-stone-900 dark:text-white mb-2 line-clamp-3">
            {post.title}
          </h3>

          <div className="flex flex-row text-xs text-stone-600 dark:text-stone-400 space-x-4 mt-auto">
            <span>{formatDate(post.timestamp)}</span>
            <T>
              <span><Var>{estimateReadTime(post.content)}</Var> min read</span>
            </T>
          </div>
        </div>
      </div>
    </Link>
  );
}
