
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Language {
  name: string;
  code: string;
  flag: string;
  enabled: boolean;
  default: boolean;
}

export interface LanguageConfig {
  [key: string]: Language;
}

interface LanguageContextType {
  language: string;
  translations: any;
  isRtl: boolean;
  setLanguage: (language: string) => void;
  availableLanguages: LanguageConfig;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");
  const [translations, setTranslations] = useState<any>(null);
  const [isRtl, setIsRtl] = useState<boolean>(false);
  const [availableLanguages, setAvailableLanguages] = useState<LanguageConfig>({});

  useEffect(() => {
    // Fetch languages from config
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/data/config.json');
        const data = await response.json();
        
        if (data.success && data.data.languages) {
          setAvailableLanguages(data.data.languages);
          
          // Find default language
          const defaultLang = Object.values(data.data.languages as LanguageConfig).find(
            (lang) => lang.default === true && lang.enabled === true
          ) as Language;
          
          if (defaultLang && defaultLang.code) {
            setLanguage(defaultLang.code);
          }
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    
    fetchLanguages();
  }, []);

  useEffect(() => {
    // Load translations for selected language
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/lang/${language}.json`);
        const data = await response.json();
        setTranslations(data);
        
        // Set RTL based on language
        setIsRtl(language === "ar");
      } catch (error) {
        console.error(`Error fetching translations for ${language}:`, error);
      }
    };
    
    if (language) {
      fetchTranslations();
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, translations, isRtl, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
