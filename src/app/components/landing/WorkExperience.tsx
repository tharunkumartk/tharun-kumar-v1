import { WorkExperience as WorkExp } from "@/lib/work";
import { formatDateRange } from "@/lib/utils";

interface WorkExperienceProps {
  experience: WorkExp;
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
      <div className="grid grid-cols-[150px_1fr] gap-8 p-4 rounded-lg transition-colors duration-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 cursor-pointer">
        {/* Left column - Date only */}
        <div className="text-sm text-stone-600 dark:text-stone-400">
          {dateRange}
        </div>

        {/* Right column - Everything else */}
        <div>
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
