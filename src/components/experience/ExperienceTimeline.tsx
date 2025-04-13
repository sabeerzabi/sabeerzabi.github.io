
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Timeline from "../timeline/Timeline";

interface Experience {
  company: string;
  designation: string;
  duration: string;
  location: string;
  experience?: string;
  technologies?: string[];
  descriptions?: string[];
}

interface ExperienceTimelineProps {
  data: Experience[] | undefined;
  status: "loading" | "error" | "success";
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ data, status }) => {
  if (status === "loading") {
    return (
      <>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="mb-10">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-500">
        Failed to load experiences. Please try again later.
      </div>
    );
  }

  const formattedItems = data?.map(exp => ({
    title: exp.designation,
    subtitle: exp.company,
    location: exp.location,
    duration: exp.duration,
    descriptions: exp.descriptions || [],
    technologies: exp.technologies
  })) || [];

  return <Timeline items={formattedItems} type="experience" />;
};

export default ExperienceTimeline;
