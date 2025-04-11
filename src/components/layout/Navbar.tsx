
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'services', 'experience', 'projects', 'skills', 'contact'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-portfolio-purple/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-white text-2xl font-bold">Sabeer</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#about" 
            className={`nav-link font-bold transition-colors ${activeSection === 'about' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            About
          </a>
          <a 
            href="#services" 
            className={`nav-link font-bold transition-colors ${activeSection === 'services' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            Services
          </a>
          <a 
            href="#experience" 
            className={`nav-link font-bold transition-colors ${activeSection === 'experience' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            Experience
          </a>
          <a 
            href="#projects" 
            className={`nav-link font-bold transition-colors ${activeSection === 'projects' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className={`nav-link font-bold transition-colors ${activeSection === 'skills' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className={`nav-link font-bold transition-colors ${activeSection === 'contact' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
          >
            Contact
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-portfolio-purple/95 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <a 
              href="#about" 
              className={`nav-link font-bold transition-colors ${activeSection === 'about' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className={`nav-link font-bold transition-colors ${activeSection === 'services' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#experience" 
              className={`nav-link font-bold transition-colors ${activeSection === 'experience' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="#projects" 
              className={`nav-link font-bold transition-colors ${activeSection === 'projects' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className={`nav-link font-bold transition-colors ${activeSection === 'skills' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className={`nav-link font-bold transition-colors ${activeSection === 'contact' ? 'text-portfolio-yellow' : 'text-white/90 hover:text-portfolio-yellow'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
