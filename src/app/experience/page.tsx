import { getAllWorkExperiences } from "@/lib/work";
import WorkExperienceCard from "@/app/components/WorkExperience";

export default async function ExperiencePage() {
  const experiences = await getAllWorkExperiences();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-8 sm:px-20 py-12 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            A collection of my professional experiences, from internships to
            full-time roles, showcasing the technologies I&apos;ve worked with
            and the impact I&apos;ve made.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <WorkExperienceCard
              key={experience.slug}
              experience={experience}
              showViewMore={false}
            />
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No work experiences found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
