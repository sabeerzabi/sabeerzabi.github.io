
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

interface Education {
  period: string;
  cource: string;
  institute: string;
  location: string;
}

interface Experience {
  period: string;
  company: string;
  designation: string;
  location: string;
  experience: string;
  tags: string[];
  description: string;
}

interface EducationsResponse {
  success: boolean;
  data: Education[];
}

interface ExperiencesResponse {
  success: boolean;
  data: Experience[];
}

const ExperienceSection = () => {
  const { data: educationsData, status: educationsStatus } = useFetchData<EducationsResponse>('/data/educations.json');
  const { data: experiencesData, status: experiencesStatus } = useFetchData<ExperiencesResponse>('/data/experiences.json');

  const isLoading = educationsStatus === 'loading' || experiencesStatus === 'loading';
  const hasError = educationsStatus === 'error' || experiencesStatus === 'error';

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education & Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">Education</h3>
            
            <div className="space-y-0">
              {isLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="pt-1 mb-8">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-6 w-48 mb-1" />
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              ) : hasError ? (
                <div className="text-red-500">
                  Failed to load education data. Please try again later.
                </div>
              ) : (
                educationsData?.data.map((education, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">
                        {education.period}
                      </span>
                      <h4 className="text-xl font-semibold">{education.cource}</h4>
                      <p className="text-gray-600">{education.institute}</p>
                      <p className="mt-2 text-gray-700">{education.location}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">Experience</h3>
            
            <div className="space-y-0">
              {isLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="pt-1 mb-8">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-6 w-48 mb-1" />
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              ) : hasError ? (
                <div className="text-red-500">
                  Failed to load experience data. Please try again later.
                </div>
              ) : (
                experiencesData?.data.map((experience, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">
                        {experience.period}
                      </span>
                      <h4 className="text-xl font-semibold">{experience.designation}</h4>
                      <p className="text-gray-600">{experience.company}</p>
                      <p className="mt-2 text-gray-700">{experience.location}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {experience.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
