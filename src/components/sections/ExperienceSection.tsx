
import { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import ExperienceTimeline from "../experience/ExperienceTimeline";
import EducationTimeline from "../experience/EducationTimeline";
import SectionTitle from "../ui/section-title";

interface Experience {
  company: string;
  designation: string;
  duration: string;
  location: string;
  experience?: string;
  technologies?: string[];
  descriptions?: string[];
}

interface Education {
  institute: string;
  course: string;
  duration: string;
  location: string;
  description?: string[];
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

  // Only sort data when it's available
  const sortedExperiences = experiencesData?.data ? [...experiencesData.data] : [];
  const sortedEducations = educationsData?.data ? [...educationsData.data] : [];

  const t = translations?.experience || {};

  return (
    <section id="experience" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <SectionTitle>{t.title || "Experience & Education"}</SectionTitle>

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
                <ExperienceTimeline data={sortedExperiences} status={expStatus} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="shadow-lg hover:shadow-xl transition-all duration-300 group h-full p-8">
              <div className="timeline">
                <EducationTimeline data={sortedEducations} status={eduStatus} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExperienceSection;
