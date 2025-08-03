import Link from "next/link";
import Image from "next/image";
import { BlogPostCardProps } from "./BlogPostCardProps";
import { formatDate, estimateReadTime } from "@/lib/utils";

export default function BlogPostCardHorizontal({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full h-full">
      <div className="flex flex-col xl:flex-row h-full space-y-4 xl:space-y-0 xl:p-4 xl:rounded-lg xl:transition-colors xl:duration-300 xl:hover:bg-stone-100 xl:dark:hover:bg-stone-800/50">
        {/* Content - appears first on small screens, second on large */}
        <div className="flex-1 flex flex-col justify-center order-1 xl:order-2 xl:ml-12">
          <h3 className="text-[28px] font-medium text-stone-900 dark:text-white mb-2">
            {post.title}
          </h3>

          <div className="flex flex-row text-sm text-stone-600 dark:text-stone-400 space-x-4">
            <span>{formatDate(post.timestamp)}</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
        </div>

        {/* Image - appears below content on small screens, left on large */}
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={200}
          height={150}
          className="rounded-xl flex-shrink-0 w-full xl:w-[200px] h-[150px] object-cover order-2 xl:order-1"
        />
      </div>
    </Link>
  );
}
