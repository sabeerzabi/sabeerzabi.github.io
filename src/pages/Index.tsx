
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Loader from '@/components/ui/loader';
import { useFetchData } from '@/hooks/useFetchData';

// Update the favicon
const updateFavicon = (path: string) => {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', path);
  document.getElementsByTagName('head')[0].appendChild(link);
};

const Index = () => {
  const { data: configData } = useFetchData<any>('/data/config.json');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (configData?.data?.paths?.favicon) {
      updateFavicon(configData.data.paths.favicon);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [configData]);

  return (
    <div className="min-h-screen">
      <Loader />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
