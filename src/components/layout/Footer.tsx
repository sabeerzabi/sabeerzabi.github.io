
import { Facebook, Twitter, Linkedin, GitHub, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolio-purple text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Sabeer</h3>
            <p className="text-white/70 mt-1">Web Developer & UI Designer</p>
          </div>
          
          <div className="flex space-x-3">
            <a href="#" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-icon">
              <GitHub size={18} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/70">
          <p>© {currentYear} Sabeer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
