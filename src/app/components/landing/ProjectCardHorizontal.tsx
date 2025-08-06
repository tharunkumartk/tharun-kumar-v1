import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ProjectCardHorizontalProps {
  project: BlogPost;
}

export default function ProjectCardHorizontal({
  project,
}: ProjectCardHorizontalProps) {
  return (
    <Link href={`/blog/${project.slug}`} className="group block w-full h-full">
      <div className="flex flex-col xl:flex-row h-full space-y-4 xl:space-y-0 xl:p-4 xl:rounded-lg xl:transition-colors xl:duration-300 xl:hover:bg-stone-100 xl:dark:hover:bg-stone-800/50">
        {/* Content - appears first on small screens, second on large */}
        <div className="flex-1 flex flex-col justify-center order-1 xl:order-2 xl:ml-12">
          <h3 className="text-[28px] font-medium text-stone-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
            {project.summary}
          </p>

          <div className="flex flex-col space-y-2">
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {formatDate(project.timestamp)}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image - appears below content on small screens, left on large */}
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={200}
          height={150}
          className="rounded-xl flex-shrink-0 w-full xl:w-[200px] h-[150px] object-cover order-2 xl:order-1"
        />
      </div>
    </Link>
  );
}
