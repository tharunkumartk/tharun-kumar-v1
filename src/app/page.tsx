import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperienceColumn from "./components/WorkExperienceColumn";
import BackgroundCursor from "./components/BackgroundCursor";
import BlogPostHero from "./components/BlogPostHero";
import { getAllBlogPosts } from "@/lib/blog";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";

export default async function Home() {
  const blogPosts = await getAllBlogPosts();

  return (
    <BackgroundCursor className="flex h-screen">
      {/* Fixed Left Column */}
      <div className="fixed left-0 top-0 w-1/2 h=[100vh] z-10 pl-32 px-16 py-20 space-y-20">
        <Hero />
        <Navbar currentPage="about" />
        <div className="mt-50">
          <SocialIcons />
        </div>
      </div>

      {/* Scrollable Right Column */}
      <div className="ml-[50%] w-1/2 overflow-y-auto pr-16">
        <div className="min-h-screen space-y-40 px-8">
          <About />
          <WorkExperienceColumn />
        </div>
      </div>
    </BackgroundCursor>
  );
}
