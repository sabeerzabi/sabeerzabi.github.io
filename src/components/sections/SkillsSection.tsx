import { useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";

interface Skill {
  name: string;
  image: string;
  message: string;
  percentage: number;
}

interface SkillsResponse {
  success: boolean;
  data: Skill[];
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
  };
}

const SkillsSection = () => {
  const { data: skillsData, status } =
    useFetchData<SkillsResponse>("/data/skills.json");
  const { translations } = useLanguage();
  const [sectionRef, sectionInView] = useInView({
    threshold: 1,
    triggerOnce: true,
  });
  const [progressValues, setProgressValues] = useState<{
    [key: string]: number;
  }>({});
  // Sort skills by percentage in descending order
  const sortedSkills = skillsData?.data
    ? [...skillsData.data].sort((a, b) => b.percentage - a.percentage)
    : [];

  useEffect(() => {
    const initialValues: { [key: string]: number } = {};
    sortedSkills.forEach((skill, index) => {
      initialValues[index] = skill.percentage;
    });
    setProgressValues(initialValues);
  }, [sectionRef, skillsData]);

  const t = translations?.skills || {};

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2
          ref={sectionRef}
          className={`section-title fade-up ${sectionInView ? "visible" : ""}`}
        >
          {t.title || "Technical Skills"}
        </h2>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {status === "loading" ? (
              Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm"
                  >
                    <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                ))
            ) : status === "error" ? (
              <div className="col-span-full text-center text-red-500">
                Failed to load skills. Please try again later.
              </div>
            ) : (
              <TooltipProvider>
                {sortedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <span className="text-sm text-gray-500">
                          {progressValues[index] || 0}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {skill.message}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-portfolio-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${progressValues[index] || 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
