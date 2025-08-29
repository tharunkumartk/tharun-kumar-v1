import { getBlogPosts } from "@/lib/blog";
import { postsDirectory, projectsDirectory } from "@/lib/types";
import BlogPageClient from "./BlogPageClient";

export default function BlogPage() {
  const blogPosts = getBlogPosts(postsDirectory);
  const projects = getBlogPosts(projectsDirectory);

  const allPosts = [...blogPosts, ...projects];

  const sortedPosts = allPosts.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return -1;
    }
  });

  return <BlogPageClient posts={sortedPosts} />;
}
