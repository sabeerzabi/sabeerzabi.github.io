
import { ChevronDown } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

interface SocialMedia {
  name: string;
  url: string;
  icon_class: string;
}

interface SocialMediaResponse {
  success: boolean;
  data: SocialMedia[];
}

const HeroSection = () => {
  const { data: socialMediasData, status } = useFetchData<SocialMediaResponse>('/data/social-medias.json');
  
  return (
    <section id="hero" className="relative min-h-screen bg-portfolio-purple flex items-center justify-center overflow-hidden pt-16">
      {/* Decorative Shapes */}
      <div className="shape shape-1 animate-float">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#FFD166" fillOpacity="0.3"/>
        </svg>
      </div>
      <div className="shape shape-2 animate-float" style={{ animationDelay: '1s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="10" fill="#FF3365" fillOpacity="0.2"/>
        </svg>
      </div>
      <div className="shape shape-3 animate-float" style={{ animationDelay: '2s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="#7E5FEC" fillOpacity="0.2"/>
        </svg>
      </div>
      <div className="shape shape-4 animate-float" style={{ animationDelay: '3s' }}>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 0L23.7 11.9L35 17.5L23.7 23.1L17.5 35L11.3 23.1L0 17.5L11.3 11.9L17.5 0Z" fill="#FFD166" fillOpacity="0.3"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <h2 className="text-2xl md:text-3xl font-light mb-2">Hello, I'm</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Sabeer C A</h1>
        <p className="text-xl md:text-2xl font-light text-white/90 mb-8">Web Developer & Software Engineer</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {status === 'loading' ? (
            Array(6).fill(0).map((_, index) => (
              <Skeleton key={index} className="w-10 h-10 rounded-full" />
            ))
          ) : (
            socialMediasData?.data.slice(0, 6).map((socialMedia, index) => (
              <a 
                key={index} 
                href={socialMedia.url} 
                target="_blank"
                rel="noopener noreferrer" 
                className="social-icon"
                title={socialMedia.name}
              >
                <i className={`fa ${socialMedia.icon_class}`}></i>
              </a>
            ))
          )}
        </div>
        
        <a href="#contact" className="btn-primary inline-block">Hire Me</a>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 animate-bounce">
          <a href="#about">
            <ChevronDown size={30} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
