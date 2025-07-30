import { getAllWorkExperiences } from "@/lib/work";
import WorkExperienceCard from "./WorkExperience";

export default async function WorkExperienceColumn() {
  const workExperiences = await getAllWorkExperiences();

  return (
    <div className="flex flex-col space-y-8">
      {workExperiences.map((experience) => (
        <WorkExperienceCard
          key={experience.slug}
          experience={experience}
          showViewMore={true}
        />
      ))}
    </div>
  );
}
