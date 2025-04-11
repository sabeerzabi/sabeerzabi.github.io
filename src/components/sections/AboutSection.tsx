
import { Clock, MapPin, Mail, Phone } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-10 mt-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="rounded-full overflow-hidden border-4 border-portfolio-purple/20 w-64 h-64">
              <img 
                src="/lovable-uploads/4247e634-839f-43bf-bb4f-ccd4688dd08b.png" 
                alt="Sabeer D A"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">Who am I?</h3>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, 
              pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu 
              ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p className="text-gray-700 mb-8">
              Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet 
              rutrum faucibus dolor auctor. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, 
              a pharetra augue.
            </p>
            
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
                  <p className="text-gray-600">New York, USA</p>
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
                  <p className="text-gray-600">+1 234 567 890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
