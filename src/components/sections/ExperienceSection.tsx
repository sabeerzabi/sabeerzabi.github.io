import { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Experience {
  company: string;
  country: string;
  website: string | null;
  designation: string;
  duration: string;
  order: number;
  sub_role: string | null;
  tasks: string[];
  technologies: string[];
  descriptions: string[];
}

interface Education {
  institute: string;
  course: string;
  duration: string;
  order: number;
  location: string;
  website: string | null;
  descriptions: string[];
}

interface ExperienceResponse {
  success: boolean;
  data: Experience[];
}

interface EducationResponse {
  success: boolean;
  data: Education[];
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
  };
}

const ExperienceSection = () => {
  const { data: experiencesData, status: expStatus } =
    useFetchData<ExperienceResponse>("/data/experiences.json");
  const { data: educationsData, status: eduStatus } =
    useFetchData<EducationResponse>("/data/educations.json");
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");
  const { translations } = useLanguage();
  const [activeTab, setActiveTab] = useState("experience");
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sort data by order
  const sortedExperiences = experiencesData?.data
    ? [...experiencesData.data].sort((a, b) => a.order - b.order)
    : [];

  const sortedEducations = educationsData?.data
    ? [...educationsData.data].sort((a, b) => a.order - b.order)
    : [];

  const t = translations?.experience || {};

  return (
    <section id="experience" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <h2
          ref={sectionRef}
          className={`section-title fade-up ${sectionInView ? "visible" : ""}`}
        >
          {t.title || "Experience & Education"}
        </h2>

        <Tabs
          defaultValue="experience"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-10"
        >
          <TabsList className="grid grid-cols-2 mb-10 w-full sm:w-80 mx-auto">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <div className="shadow-lg hover:shadow-xl transition-all duration-300 group h-full p-8 bg-grey-50">
              <div className="timeline">
                {expStatus === "loading" ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="mb-10">
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))
                ) : expStatus === "error" ? (
                  <div className="text-center text-red-500">
                    Failed to load experiences. Please try again later.
                  </div>
                ) : (
                  <div className="relative">
                    {/* Red vertical line */}
                    <div className="absolute left-5 top-2 bottom-0 w-0.5 bg-portfolio-pink"></div>

                    {sortedExperiences.map((experience, index) => (
                      <div key={index} className="relative mb-12 pb-10 pl-12">
                        {/* Red dot with icon */}
                        <div className="absolute left-0 top-1.5 w-10 h-10 bg-gray-50  flex items-center justify-center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-laptop-code"
                            className="text-portfolio-pink h-6 w-6"
                          />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                          <h3 className="text-xl font-bold text-portfolio-primary mb-1">
                            {experience.designation}
                          </h3>
                          <div className="text-portfolio-pink font-semibold mb-2">
                            <a
                              href={experience.website || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {experience.company}
                            </a>
                            <span>{experience.country}</span>
                          </div>
                          <p className="text-gray-500 mb-4">
                            {experience.duration}
                          </p>

                          {experience.tasks?.length > 0 && (
                            <div className="mb-4">
                              <p className="text-gray-700 font-medium mb-2">
                                Responsibilities:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                {experience.tasks.map((task, i) => (
                                  <li key={i} className="text-gray-600">
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {experience.descriptions?.length > 0 && (
                            <div className="mb-5">
                              <ul className="list-disc pl-5 space-y-1">
                                {experience.descriptions.map((desc, i) => (
                                  <li key={i} className="text-gray-600">
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {experience.technologies?.length > 0 && (
                            <div>
                              <p className="text-gray-700 font-medium mb-2">
                                Technologies:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, i) => (
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
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="shadow-lg hover:shadow-xl transition-all duration-300 group h-full p-8">
              <div className="timeline">
                {eduStatus === "loading" ? (
                  Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="mb-10">
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))
                ) : eduStatus === "error" ? (
                  <div className="text-center text-red-500">
                    Failed to load education information. Please try again
                    later.
                  </div>
                ) : (
                  <div className="relative">
                    {/* Red vertical line */}
                    <div className="absolute left-5 top-2 bottom-0 w-0.5 bg-portfolio-pink"></div>

                    {sortedEducations.map((education, index) => (
                      <div key={index} className="relative mb-12 pb-10 pl-12">
                        {/* Red dot with graduation cap icon */}
                        <div className="absolute left-0 top-1.5 w-10 h-10 bg-gray-50  flex items-center justify-center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-user-graduate"
                            className="text-portfolio-pink h-6 w-6"
                          />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                          <h3 className="text-xl font-bold text-portfolio-primary  mb-1">
                            {education.course}
                          </h3>
                          <div className="text-portfolio-pink font-semibold mb-2">
                            <a
                              href={education.website || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {education.institute}
                            </a>
                            <div className="text-sm text-black font-normal">
                              {education.location}
                            </div>
                          </div>
                          <p className="text-gray-500 mb-4">
                            {education.duration}
                          </p>

                          {education.descriptions?.length > 0 && (
                            <div>
                              <ul className="list-disc pl-5 space-y-1">
                                {education.descriptions.map((desc, i) => (
                                  <li key={i} className="text-gray-600">
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExperienceSection;
