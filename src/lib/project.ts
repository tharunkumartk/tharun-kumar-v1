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
  // Get markdown files directly from /content/projects
  const projectFiles = fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);

  const allProjectData = await Promise.all(
    projectFiles.map(async (fileName) => {
      // Use filename without extension as slug
      const slug = path.basename(fileName, ".md");

      // Read markdown file directly
      const fullPath = path.join(projectsDirectory, fileName);

      if (!fs.existsSync(fullPath)) {
        console.warn(`Project file ${fileName} not found`);
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Get timestamp from either 'timestamp' or 'date' field for backward compatibility
      const timestamp = matterResult.data.timestamp || matterResult.data.date;

      // Combine the data with the slug and content
      return {
        slug: matterResult.data.slug || slug, // Use slug from frontmatter if available, otherwise use filename
        title: matterResult.data.title,
        timestamp: timestamp,
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
    const fullPath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      console.error(`Project ${slug} not found`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);

    // Get timestamp from either 'timestamp' or 'date' field for backward compatibility
    const timestamp = matterResult.data.timestamp || matterResult.data.date;

    // Combine the data with the slug and content
    return {
      slug: matterResult.data.slug || slug, // Use slug from frontmatter if available, otherwise use provided slug
      title: matterResult.data.title,
      timestamp: timestamp,
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
  const projectFiles = fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => path.basename(dirent.name, ".md"));

  return projectFiles.filter((fileName) => {
    const filePath = path.join(projectsDirectory, `${fileName}.md`);
    return fs.existsSync(filePath);
  });
}
