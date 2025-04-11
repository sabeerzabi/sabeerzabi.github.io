
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

interface Skill {
  name: string;
  image: string;
}

interface SkillsResponse {
  success: boolean;
  data: Skill[];
}

const SkillsSection = () => {
  const { data: skillsData, status } = useFetchData<SkillsResponse>('/data/skills.json');
  
  const skills = [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 70 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {status === 'loading' ? (
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm">
                <Skeleton className="h-10 w-10 rounded-full mb-3" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load skills. Please try again later.
            </div>
          ) : (
            skillsData?.data.map((skill, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={skill.image} 
                  alt={skill.name} 
                  className="w-10 h-10 object-contain mb-3" 
                />
                <p className="font-medium">{skill.name}</p>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-8 text-center text-portfolio-purple">Proficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-portfolio-purple h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
