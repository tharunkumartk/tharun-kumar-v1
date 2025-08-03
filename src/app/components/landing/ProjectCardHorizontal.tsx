import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/project";
import { formatDate } from "@/lib/utils";

interface ProjectCardHorizontalProps {
  project: Project;
}

export default function ProjectCardHorizontal({
  project,
}: ProjectCardHorizontalProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block w-full h-full"
    >
      <div className="flex flex-row h-full space-x-8 p-4 rounded-lg transition-colors duration-300 hover:bg-stone-100 dark:hover:bg-stone-800/50">
        {/* Gradient image */}
        <Image
          src={project.cover}
          alt={project.title}
          width={200}
          height={150}
          className="rounded-xl flex-shrink-0 w-[200px] h-[150px] object-cover"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[28px] font-medium text-stone-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
            {project.content}
          </p>

          <div className="flex flex-col space-y-2">
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {formatDate(project.timestamp)}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
