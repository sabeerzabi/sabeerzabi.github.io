
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

interface ServiceData {
  name: string;
  description: string;
  icon: string;
  bg_color: string;
  visible: boolean;
  color: string;
  percentage: number;
}

interface ServicesResponse {
  success: boolean;
  data: ServiceData[];
}

const ServicesSection = () => {
  const { data: servicesData, status } = useFetchData<ServicesResponse>('/data/services.json');
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  
  // Get only the visible services
  const visibleServices = servicesData?.data.filter(service => service.visible) || [];

  useEffect(() => {
    if (isInView && visibleServices.length > 0) {
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
              newValues[index] += 2;
              if (newValues[index] > service.percentage) {
                newValues[index] = service.percentage;
              }
              allComplete = false;
            }
          });
          
          if (allComplete) {
            clearInterval(interval);
          }
          
          return newValues;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isInView, visibleServices]);

  return (
    <section id="services" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-portfolio-purple relative flex items-center">
          <span className="relative w-8 h-8 mr-3">
            <img src="/icons/dots-bg.svg" alt="dots" className="absolute -left-1 -top-1 w-full h-full" />
          </span>
          Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {status === 'loading' ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md">
                <Skeleton className="w-16 h-16 mx-auto mb-6 rounded-full" />
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
                className="service-card bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="mb-4 w-16 h-16 mx-auto flex items-center justify-center bg-portfolio-purple/10 rounded-full">
                    <img src={service.icon} alt={service.name} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-portfolio-purple">{service.name}</h3>
                  <p className="text-gray-700 mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={isInView ? progressValues[index] || 0 : 0} 
                      className="h-2" 
                    />
                    <span className="text-xs font-medium">{isInView ? progressValues[index] || 0 : 0}%</span>
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
