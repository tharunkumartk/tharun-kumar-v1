import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  timestamp: string;
  tags: string[];
  imageUrl: string;
  summary: string;
  content: string;
}

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

export const postsDirectory = path.join(process.cwd(), "content/blog");

export const projectsDirectory = path.join(process.cwd(), "content/projects");
