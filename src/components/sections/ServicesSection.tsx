
import { Code, Globe, PenTool } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

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
  
  // Get only the visible services
  const visibleServices = servicesData?.data.filter(service => service.visible).slice(0, 3) || [];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {status === 'loading' ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md">
                <Skeleton className="w-16 h-16 mx-auto mb-6 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-20 w-full mx-auto" />
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
                className={`service-card bg-${service.bg_color === 'violet' ? 'portfolio-card-blue' : 
                             service.bg_color === 'yellow' ? 'portfolio-card-yellow' : 
                             'portfolio-card-pink'} text-${service.color}`}
              >
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-white/10 rounded-full">
                  <img src={service.icon} alt={service.name} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className={`text-${service.color === 'white' ? 'white/80' : 'gray-700'}`}>
                  {service.description}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="service-card bg-portfolio-card-blue text-white">
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-white/10 rounded-full">
                  <Code size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Backend Development</h3>
                <p className="text-white/80">
                  Developing robust server-side applications with Laravel, PHP, and Python for optimal performance.
                </p>
              </div>
              
              <div className="service-card bg-portfolio-card-yellow text-gray-800">
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-black/10 rounded-full">
                  <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Web Development</h3>
                <p className="text-gray-700">
                  Full-stack web application development with a focus on performance, security, and scalability.
                </p>
              </div>
              
              <div className="service-card bg-portfolio-card-pink text-white">
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-white/10 rounded-full">
                  <PenTool size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Project Management</h3>
                <p className="text-white/80">
                  Managing project teams and ensuring timely delivery of high-quality software solutions.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
