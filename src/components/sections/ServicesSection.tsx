
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface ServiceData {
  name: string;
  description: string;
  icon: string;
  bg_color: string;
  visible: boolean;
  color: string;
  percentage: number;
  progress_color: string;
  progress_bg_color: string;
}

interface ServicesResponse {
  success: boolean;
  data: ServiceData[];
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
    colors: {
      progress: {
        green: string;
        blue: string;
        pink: string;
        yellow: string;
        violet: string;
      }
    }
  };
}

const ServicesSection = () => {
  const { data: servicesData, status } = useFetchData<ServicesResponse>('/data/services.json');
  const { data: configData } = useFetchData<ConfigResponse>('/data/config.json');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  
  // Get only the visible services
  const visibleServices = servicesData?.data.filter(service => service.visible) || [];

  // Get progress colors from config
  const progressColors = configData?.data?.colors?.progress || {
    green: '#48BB78',
    blue: '#4299E1',
    pink: '#ED64A6',
    yellow: '#ECC94B',
    violet: '#9F7AEA'
  };

  useEffect(() => {
    if (inView && visibleServices.length > 0) {
      // Reset progress values
      const initialValues: { [key: string]: number } = {};
      visibleServices.forEach((service, index) => {
        initialValues[index] = 0;
      });
      setProgressValues(initialValues);
      
      // Animate progress bars
      const interval = setInterval(() => {
        setProgressValues(prev => {
          const newValues = { ...prev };
          let allComplete = true;
          
          visibleServices.forEach((service, index) => {
            if (newValues[index] < service.percentage) {
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
  }, [inView, visibleServices]);

  const getProgressColor = (color: string) => {
    switch(color) {
      case 'green': return progressColors.green;
      case 'blue': return progressColors.blue;
      case 'pink': return progressColors.pink;
      case 'yellow': return progressColors.yellow;
      case 'violet': return progressColors.violet;
      default: return progressColors.blue;
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="relative mr-3">
            <span className="absolute -left-1 -top-1 w-8 h-8" style={{ 
              background: `url(${configData?.data?.paths?.dotsBg || "/icons/dots-bg.svg"})`, 
              backgroundSize: 'cover',
              zIndex: -1 
            }}></span>
            S
          </span>
          ervices
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10" ref={ref}>
          {status === 'loading' ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md">
                <Skeleton className="w-24 h-24 mx-auto mb-6 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-20 w-full mx-auto mb-4" />
                <Skeleton className="h-2 w-full mx-auto" />
              </div>
            ))
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load services. Please try again later.
            </div>
          ) : visibleServices.length > 0 ? (
            visibleServices.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                style={{ 
                  color: service.color || 'white', 
                  backgroundColor: service.bg_color || 'white',
                  borderRadius: '0.75rem'
                }}
              >
                <div className="p-6">
                  <div className="mb-4 w-24 h-24 mx-auto flex items-center justify-center bg-white/10 rounded-full">
                    <img src={service.icon} alt={service.name} className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="mb-6 opacity-90">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${inView ? progressValues[index] || 0 : 0}%`,
                          backgroundColor: getProgressColor(service.progress_color),
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">{inView ? progressValues[index] || 0 : 0}%</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No services available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
