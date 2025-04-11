
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

interface Achievement {
  title: string;
  'sub-title': string;
  year: string;
  image: string;
  latest: boolean;
  link: string | null;
}

interface AchievementsResponse {
  success: boolean;
  data: Achievement[];
}

const AchievementsSection = () => {
  const { data: achievementsData, status } = useFetchData<AchievementsResponse>('/data/achivements.json');

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {status === 'loading' ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md">
                <Skeleton className="w-16 h-16 mx-auto mb-6 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                <Skeleton className="h-10 w-16 mx-auto rounded" />
              </div>
            ))
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load achievements. Please try again later.
            </div>
          ) : (
            achievementsData?.data.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md transition-transform hover:transform hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-portfolio-purple/10 rounded-full">
                  <img src={achievement.image} alt={achievement.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement['sub-title']}</p>
                <div className="flex items-center justify-center">
                  <div className="text-portfolio-pink font-semibold">
                    <span className="text-sm">{achievement.year}</span>
                    {achievement.latest && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Latest</span>
                    )}
                  </div>
                </div>
                {achievement.link && (
                  <a 
                    href={achievement.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 inline-block text-portfolio-purple hover:underline text-sm"
                  >
                    View More
                  </a>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="btn-primary">Download Resume</a>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
