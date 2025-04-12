
import { useState, useEffect } from 'react';
import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AboutData {
  name: string;
  description: string;
  image: string;
  roles: string[];
  projects: {
    laravel: { count: number; icon: string };
    codeiginter: { count: number; icon: string };
    'core-php': { count: number; icon: string };
    wordpress: { count: number; icon: string };
  };
}

interface ServiceData {
  name: string;
  description: string;
  icon: string;
  bg_color: string;
  visible: boolean;
  color: string;
  percentage: number;
}

interface AboutResponse {
  success: boolean;
  data: AboutData;
}

interface ServicesResponse {
  success: boolean;
  data: ServiceData[];
}

const AboutSection = () => {
  const { data: aboutData, status: aboutStatus } = useFetchData<AboutResponse>('/data/about.json');
  const { data: servicesData, status: servicesStatus } = useFetchData<ServicesResponse>('/data/services.json');
  
  // For animated counters
  const [counts, setCounts] = useState({
    laravel: 0,
    codeiginter: 0,
    'core-php': 0,
    wordpress: 0,
  });

  useEffect(() => {
    if (aboutData?.data?.projects) {
      const { laravel, codeiginter, 'core-php': corePhp, wordpress } = aboutData.data.projects;
      
      // Animate counts from 0 to target
      const interval = setInterval(() => {
        setCounts(prev => {
          const newCounts = { ...prev };
          
          if (newCounts.laravel < laravel.count) newCounts.laravel += 1;
          if (newCounts.codeiginter < codeiginter.count) newCounts.codeiginter += 1;
          if (newCounts['core-php'] < corePhp.count) newCounts['core-php'] += 1;
          if (newCounts.wordpress < wordpress.count) newCounts.wordpress += 1;
          
          // If all counts reached their targets, clear interval
          if (
            newCounts.laravel === laravel.count &&
            newCounts.codeiginter === codeiginter.count &&
            newCounts['core-php'] === corePhp.count &&
            newCounts.wordpress === wordpress.count
          ) {
            clearInterval(interval);
          }
          
          return newCounts;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [aboutData]);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-10 mt-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            {aboutStatus === 'loading' ? (
              <Skeleton className="rounded-full w-64 h-64" />
            ) : (
              <div className="rounded-full overflow-hidden border-4 border-portfolio-purple/20 w-64 h-64">
                <img 
                  src={aboutData?.data?.image || "/lovable-uploads/4247e634-839f-43bf-bb4f-ccd4688dd08b.png"} 
                  alt={aboutData?.data?.name || "Profile image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          {/* About Information */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">Who am I?</h3>
            {aboutStatus === 'loading' ? (
              <>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
              </>
            ) : (
              <p className="text-gray-700 mb-6">
                {aboutData?.data?.description}
              </p>
            )}
            
            {/* Project Count Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {aboutStatus === 'loading' ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))
              ) : aboutData?.data?.projects ? (
                Object.entries(aboutData.data.projects).map(([key, value]) => (
                  <Card key={key} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <img src={value.icon} alt={key} className="w-10 h-10 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-portfolio-purple">{counts[key as keyof typeof counts]}</p>
                      <p className="text-sm text-gray-500">{key.replace('-', ' ')} projects</p>
                    </CardContent>
                  </Card>
                ))
              ) : null}
            </div>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Experience</h4>
                  <p className="text-gray-600">5+ Years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">Kerala, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">sabeer@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">+91 963 374 3391</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Progress Bars */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-portfolio-purple">Services & Skills</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servicesStatus === 'loading' ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 rounded-full" />
                </div>
              ))
            ) : servicesData?.data ? (
              servicesData.data
                .filter(service => service.visible)
                .map((service, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-${service.bg_color}-500`}>
                        <img src={service.icon} alt={service.name} className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold">{service.name}</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={service.percentage} 
                        className="h-2" 
                      />
                      <span className="text-xs font-medium">{service.percentage}%</span>
                    </div>
                  </div>
                ))
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
