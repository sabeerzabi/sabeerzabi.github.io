
import { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { data: skillsData, status } = useFetchData<SkillsResponse>('/data/skills.json');
  const { data: configData } = useFetchData<ConfigResponse>('/data/config.json');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    if (inView && skillsData?.data) {
      const initialValues: { [key: string]: number } = {};
      skillsData.data.forEach((_, index) => {
        initialValues[index] = 0;
      });
      setProgressValues(initialValues);
      
      const interval = setInterval(() => {
        setProgressValues(prev => {
          const newValues = { ...prev };
          let allComplete = true;
          
          skillsData.data.forEach((skill, index) => {
            if (newValues[index] < skill.percentage) {
              newValues[index] += 1;
              allComplete = false;
            }
          });
          
          if (allComplete) {
            clearInterval(interval);
          }
          
          return newValues;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [inView, skillsData]);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-portfolio-purple">
          <span className="relative mr-3">
            <span className="absolute -left-1 -top-1 w-8 h-8" style={{ 
              background: `url(${configData?.data?.paths?.dotsBg || "/icons/dots-bg.svg"})`, 
              backgroundSize: 'cover',
              zIndex: -1
            }}></span>
            T
          </span>
          echnical Skills
        </h2>
        
        <div className="mt-10" ref={ref}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {status === 'loading' ? (
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm">
                  <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              ))
            ) : status === 'error' ? (
              <div className="col-span-full text-center text-red-500">
                Failed to load skills. Please try again later.
              </div>
            ) : (
              <TooltipProvider>
                {skillsData?.data.map((skill, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-help">
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
                            <span className="text-sm text-gray-500">{inView ? progressValues[index] || 0 : 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-portfolio-purple h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${inView ? progressValues[index] || 0 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{skill.message}</p>
                      <p className="font-semibold mt-1">Proficiency: {skill.percentage}%</p>
                    </TooltipContent>
                  </Tooltip>
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
