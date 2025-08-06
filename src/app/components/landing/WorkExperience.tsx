import { WorkExperience } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

interface WorkExperienceProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceProps) => {
  const dateRange = formatDateRange(experience.startDate, experience.endDate);

  return (
    <a
      href={experience.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[150px_1fr] gap-2 xl:gap-8 xl:p-4 xl:rounded-lg xl:transition-colors xl:duration-300 xl:hover:bg-stone-100 xl:dark:hover:bg-stone-800/50 xl:cursor-pointer">
        {/* Date - appears above title on small screens, left column on md+ */}
        <div className="text-sm text-stone-600 dark:text-stone-400 order-1 xl:order-none">
          {dateRange}
        </div>

        {/* Content - appears below date on small screens, right column on md+ */}
        <div className="order-2 xl:order-none">
          {/* Position title */}
          <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
            {experience.position} @ {experience.company}
          </h3>

          {/* Content */}
          <div className="mb-4">
            <div
              className="text-stone-700 dark:text-stone-300 leading-relaxed prose prose-sm max-w-none prose-stone dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: experience.content }}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default WorkExperienceCard;
