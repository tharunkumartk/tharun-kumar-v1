import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface WorkExperience {
  slug: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  companyUrl: string;
  skills: string[];
  order: number;
  content: string;
}

const workDirectory = path.join(process.cwd(), "content/work");

export async function getAllWorkExperiences(): Promise<WorkExperience[]> {
  // Get file names under /content/work
  const fileNames = fs.readdirSync(workDirectory);
  const allWorkData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".md"))
      .map(async (fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(workDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the work metadata section
        const matterResult = matter(fileContents);

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();

        // Combine the data with the slug and content
        return {
          slug,
          company: matterResult.data.company,
          position: matterResult.data.position,
          startDate: matterResult.data.startDate,
          endDate: matterResult.data.endDate,
          companyUrl: matterResult.data.companyUrl,
          skills: matterResult.data.skills,
          order: matterResult.data.order || 999,
          content: contentHtml,
        } as WorkExperience;
      })
  );

  // Sort work experiences by order (ascending)
  return allWorkData.sort((a, b) => a.order - b.order);
}

export async function getWorkExperience(
  slug: string
): Promise<WorkExperience | null> {
  try {
    const fullPath = path.join(workDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the work metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and content
    return {
      slug,
      company: matterResult.data.company,
      position: matterResult.data.position,
      startDate: matterResult.data.startDate,
      endDate: matterResult.data.endDate,
      companyUrl: matterResult.data.companyUrl,
      skills: matterResult.data.skills,
      order: matterResult.data.order || 999,
      content: contentHtml,
    } as WorkExperience;
  } catch (error) {
    console.error(`Error reading work experience ${slug}:`, error);
    return null;
  }
}

export function getAllWorkSlugs(): string[] {
  const fileNames = fs.readdirSync(workDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const startYear = start.getFullYear();

  if (endDate === "present") {
    return `${startYear} - present`;
  }

  const end = new Date(endDate);
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    return startYear.toString();
  }

  return `${startYear} - ${endYear}`;
}
