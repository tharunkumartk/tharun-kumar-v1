import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  timestamp: string;
  cover: string;
  github: string;
  tech: string[];
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Project[]> {
  // Get directory names under /content/projects
  const projectDirs = fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const allProjectData = await Promise.all(
    projectDirs.map(async (dirName) => {
      // Use directory name as slug
      const slug = dirName;

      // Read index.md file from the project directory
      const fullPath = path.join(projectsDirectory, dirName, "index.md");

      if (!fs.existsSync(fullPath)) {
        console.warn(`No index.md found in ${dirName} directory`);
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug and content
      return {
        slug,
        title: matterResult.data.title,
        timestamp: matterResult.data.timestamp,
        cover: matterResult.data.cover,
        github: matterResult.data.github,
        tech: matterResult.data.tech || [],
        content: matterResult.content,
      } as Project;
    })
  );

  // Filter out any null results and sort projects by timestamp (descending order - newest first)
  return allProjectData
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, slug, "index.md");

    if (!fs.existsSync(fullPath)) {
      console.error(`Project ${slug} not found`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug and content
    return {
      slug,
      title: matterResult.data.title,
      timestamp: matterResult.data.timestamp,
      cover: matterResult.data.cover,
      github: matterResult.data.github,
      tech: matterResult.data.tech || [],
      content: matterResult.content,
    } as Project;
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  const projectDirs = fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return projectDirs.filter((dirName) => {
    const indexPath = path.join(projectsDirectory, dirName, "index.md");
    return fs.existsSync(indexPath);
  });
}
