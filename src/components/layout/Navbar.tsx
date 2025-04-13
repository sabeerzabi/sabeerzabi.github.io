import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useFetchData } from "@/hooks/useFetchData";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { data: configData } = useFetchData<any>("/data/config.json");
  const { currentLanguage, setLanguage, translations, languages, isRtl } =
    useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "services",
        "experience",
        "projects",
        "skills",
        "contact",
      ];
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply RTL to document body
  useEffect(() => {
    if (isRtl) {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
    }
  }, [isRtl]);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setIsLanguageMenuOpen(false);
  };

  const t = translations?.navbar || {};

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-portfolio-primary/95 backdrop-blur-sm py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-white">
          <img
            src={configData?.data?.paths?.logo || "/icons/logo.svg"}
            alt="Sabeer"
            className="h-10"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex items-center space-x-1">
            <a
              href="#hero"
              className={`nav-link font-bold transition-colors ${
                activeSection === "hero"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.home || "Home"}
            </a>
            <a
              href="#about"
              className={`nav-link font-bold transition-colors ${
                activeSection === "about"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.about || "About"}
            </a>
            <a
              href="#services"
              className={`nav-link font-bold transition-colors ${
                activeSection === "services"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.services || "Services"}
            </a>
            <a
              href="#experience"
              className={`nav-link font-bold transition-colors ${
                activeSection === "experience"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.experience || "Experience"}
            </a>
            <a
              href="#projects"
              className={`nav-link font-bold transition-colors ${
                activeSection === "projects"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.projects || "Projects"}
            </a>
            <a
              href="#skills"
              className={`nav-link font-bold transition-colors ${
                activeSection === "skills"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.skills || "Skills"}
            </a>
            <a
              href="#contact"
              className={`nav-link font-bold transition-colors ${
                activeSection === "contact"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
            >
              {t.contact || "Contact"}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="language-switcher ml-4" ref={languageMenuRef}>
            <button
              className="flex items-center gap-1 text-white px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
              onClick={toggleLanguageMenu}
            >
              {languages[currentLanguage] && (
                <img
                  src={languages[currentLanguage].flag}
                  alt={languages[currentLanguage].name}
                  className="language-flag"
                />
              )}
              <span className="text-sm font-medium mr-1">
                {languages[currentLanguage]?.name || "English"}
              </span>
              <ChevronDown size={16} />
            </button>

            {isLanguageMenuOpen && (
              <div className="language-menu">
                {Object.entries(languages).map(
                  ([code, lang]) =>
                    lang.enabled && (
                      <div
                        key={code}
                        className={`language-item ${
                          currentLanguage === code ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleLanguageSelect(code)}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="language-flag"
                        />
                        <span>{lang.name}</span>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Mobile Language Switcher */}
          <div className="language-switcher mr-3" ref={languageMenuRef}>
            <button
              className="flex items-center gap-1 text-white p-1 rounded-full bg-white/10"
              onClick={toggleLanguageMenu}
            >
              {languages[currentLanguage] && (
                <img
                  src={languages[currentLanguage].flag}
                  alt={languages[currentLanguage].name}
                  className="language-flag"
                />
              )}
            </button>

            {isLanguageMenuOpen && (
              <div className="language-menu">
                {Object.entries(languages).map(
                  ([code, lang]) =>
                    lang.enabled && (
                      <div
                        key={code}
                        className={`language-item ${
                          currentLanguage === code ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleLanguageSelect(code)}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="language-flag"
                        />
                        <span>{lang.name}</span>
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-portfolio-primary/95 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <a
              href="#hero"
              className={`nav-link font-bold transition-colors ${
                activeSection === "hero"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.home || "Home"}
            </a>
            <a
              href="#about"
              className={`nav-link font-bold transition-colors ${
                activeSection === "about"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.about || "About"}
            </a>
            <a
              href="#services"
              className={`nav-link font-bold transition-colors ${
                activeSection === "services"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.services || "Services"}
            </a>
            <a
              href="#experience"
              className={`nav-link font-bold transition-colors ${
                activeSection === "experience"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.experience || "Experience"}
            </a>
            <a
              href="#projects"
              className={`nav-link font-bold transition-colors ${
                activeSection === "projects"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.projects || "Projects"}
            </a>
            <a
              href="#skills"
              className={`nav-link font-bold transition-colors ${
                activeSection === "skills"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.skills || "Skills"}
            </a>
            <a
              href="#contact"
              className={`nav-link font-bold transition-colors ${
                activeSection === "contact"
                  ? "text-portfolio-yellow"
                  : "text-white/90 hover:text-portfolio-yellow"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact || "Contact"}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
