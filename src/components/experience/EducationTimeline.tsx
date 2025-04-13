
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Timeline from "../timeline/Timeline";

interface Education {
  institute: string;
  course: string;
  duration: string;
  location: string;
  description?: string[];
}

interface EducationTimelineProps {
  data: Education[] | undefined;
  status: "loading" | "error" | "success";
}

const EducationTimeline: React.FC<EducationTimelineProps> = ({ data, status }) => {
  if (status === "loading") {
    return (
      <>
        {Array(2)
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
        Failed to load education information. Please try again later.
      </div>
    );
  }

  const formattedItems = data?.map(edu => ({
    title: edu.course,
    subtitle: edu.institute,
    location: edu.location,
    duration: edu.duration,
    descriptions: edu.description || []
  })) || [];

  return <Timeline items={formattedItems} type="education" />;
};

export default EducationTimeline;
