
import { Trophy, Award, Lightbulb } from 'lucide-react';

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-xl p-8 text-center shadow-md transition-transform hover:transform hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Award-Winning Work</h3>
            <p className="text-gray-600 mb-4">Best Design Award 2022</p>
            <div className="flex items-center justify-center">
              <div className="text-portfolio-pink font-semibold">
                <span className="text-4xl">10</span>
                <span className="text-sm ml-1">Awards</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-md transition-transform hover:transform hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Hall of Fame</h3>
            <p className="text-gray-600 mb-4">Top Developer 2023</p>
            <div className="flex items-center justify-center">
              <div className="text-portfolio-pink font-semibold">
                <span className="text-4xl">5</span>
                <span className="text-sm ml-1">Recognitions</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-md transition-transform hover:transform hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
              <Lightbulb size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Project Completions</h3>
            <p className="text-gray-600 mb-4">Successfully Delivered</p>
            <div className="flex items-center justify-center">
              <div className="text-portfolio-pink font-semibold">
                <span className="text-4xl">100</span>
                <span className="text-sm ml-1">Projects</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="btn-primary">Download Resume</a>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
