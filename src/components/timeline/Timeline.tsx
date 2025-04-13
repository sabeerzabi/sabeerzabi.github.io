
import React from "react";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
  items: Array<{
    title: string;
    subtitle: string;
    location: string;
    duration: string;
    descriptions?: string[];
    technologies?: string[];
  }>;
  type: "experience" | "education";
}

const Timeline: React.FC<TimelineProps> = ({ items, type }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No {type} information available.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Red vertical line */}
      <div className="absolute left-5 top-2 bottom-0 w-0.5 bg-portfolio-pink"></div>

      {items.map((item, index) => (
        <TimelineItem
          key={index}
          icon={type}
          title={type === "experience" ? item.title : item.subtitle}
          subtitle={type === "experience" ? item.subtitle : item.title}
          location={item.location}
          duration={item.duration}
          descriptions={item.descriptions || []}
          technologies={item.technologies}
        />
      ))}
    </div>
  );
};

export default Timeline;
