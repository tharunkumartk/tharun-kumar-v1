import Hero from "./components/landing/Hero";
import AboutColumn from "./components/landing/AboutColumn";
import WorkExperienceColumn from "./components/landing/WorkExperienceColumn";
import Navbar from "./components/landing/Navbar";
import SocialIcons from "./components/landing/SocialIcons";
import ScrollDetector from "./components/landing/ScrollDetector";
import BlogColumn from "./components/landing/BlogColumn";
import ProjectColumn from "./components/landing/ProjectColumn";
import MeetingNewPeopleColumn from "./components/landing/MeetingNewPeopleColumn";
import FooterColumn from "./components/landing/FooterColumn";

export default async function Home() {
  return (
    <ScrollDetector>
      <div className="flex h-screen">
        {/* Fixed Left Column */}
        <div className="fixed left-0 top-0 w-1/2 h=[100vh] z-10 pl-32 px-16 py-20 space-y-20">
          <Hero />
          <Navbar />
          <div className="mt-30">
            <SocialIcons />
          </div>
        </div>

        {/* Scrollable Right Column */}
        <div className="ml-[50%] w-1/2 pr-16">
          <div className="min-h-screen px-8">
            <AboutColumn />
            <WorkExperienceColumn />
            <ProjectColumn />
            <BlogColumn />
            <MeetingNewPeopleColumn />
            <FooterColumn />
          </div>
        </div>
      </div>
    </ScrollDetector>
  );
}
