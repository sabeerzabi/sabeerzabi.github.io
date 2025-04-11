
import { Code, Globe, PenTool } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="service-card bg-portfolio-card-blue text-white">
            <div className="mb-4 w-16 h-16 flex items-center justify-center bg-white/10 rounded-full">
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Frontend Development</h3>
            <p className="text-white/80">
              I build responsive and interactive user interfaces using modern frontend technologies like React, Vue, and Angular.
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
            <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
            <p className="text-white/80">
              Creating beautiful, intuitive, and user-friendly designs that enhance the overall user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
