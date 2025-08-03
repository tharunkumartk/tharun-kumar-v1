import { getAllProjects } from "@/lib/project";
import ProjectCardHorizontal from "@/app/components/landing/ProjectCardHorizontal";

export default async function ProjectColumn() {
  const projects = await getAllProjects();

  return (
    <div id="projects" className="flex flex-col space-y-8 pt-20">
      {projects.slice(0, 3).map((project, index) => (
        <div
          key={project.slug}
          className="opacity-0 animate-fadeIn"
          style={{
            animationDelay: `${index * 100 + 200}ms`,
            animationFillMode: "forwards",
          }}
        >
          <ProjectCardHorizontal project={project} />
        </div>
      ))}
    </div>
  );
}
