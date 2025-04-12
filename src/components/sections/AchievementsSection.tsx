
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

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
              <Card key={index} className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <Skeleton className="w-24 h-24 mx-auto mb-6 rounded-full" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                  <Skeleton className="h-10 w-28 mx-auto rounded" />
                </CardContent>
              </Card>
            ))
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load achievements. Please try again later.
            </div>
          ) : (
            achievementsData?.data.map((achievement, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-portfolio-purple/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <img src={achievement.image} alt={achievement.title} className="w-14 h-14 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-portfolio-purple">{achievement.title}</h3>
                  <p className="text-gray-600 mb-4 text-lg">{achievement['sub-title']}</p>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-portfolio-pink font-semibold">
                      <span className="text-base">{achievement.year}</span>
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
                      className="inline-block px-4 py-2 bg-portfolio-purple text-white rounded-md hover:bg-portfolio-purple/80 transition-colors"
                    >
                      View More
                    </a>
                  )}
                </CardContent>
              </Card>
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
