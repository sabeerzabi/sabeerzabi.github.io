
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faLaptopCode, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

interface TimelineItemProps {
  icon: "experience" | "education";
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  descriptions?: string[];
  technologies?: string[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  subtitle,
  location,
  duration,
  descriptions,
  technologies,
}) => {
  const getIcon = (): IconDefinition => {
    return icon === "experience" ? faLaptopCode : faUserGraduate;
  };

  return (
    <div className="relative mb-12 pb-10 pl-12">
      {/* Red dot with icon */}
      <div className="absolute left-0 top-1.5 w-10 h-10 bg-gray-50 flex items-center justify-center">
        <FontAwesomeIcon
          icon={getIcon()}
          className="text-portfolio-pink h-6 w-6"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl font-bold text-portfolio-primary mb-1">
          {title}
        </h3>
        <div className="text-portfolio-pink font-semibold mb-2">
          {subtitle}
          <div className="text-sm text-black font-normal">
            {location}
          </div>
        </div>
        <p className="text-gray-500 mb-4">{duration}</p>

        {/* Only render if descriptions array exists and has items */}
        {descriptions && descriptions.length > 0 && (
          <div className="mb-5">
            <ul className="list-disc pl-5 space-y-1">
              {descriptions.map((desc, i) => (
                <li key={i} className="text-gray-600">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Only render if technologies array exists and has items */}
        {technologies && technologies.length > 0 && (
          <div>
            <p className="text-gray-700 font-medium mb-2">
              Technologies:
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-portfolio-primary/10 text-portfolio-primary px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
