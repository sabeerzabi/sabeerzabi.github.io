
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the structure for language configuration
interface LanguageConfig {
  name: string;
  code: string;
  flag: string;
  enabled: boolean;
  default?: boolean;
}

// Define the supported language codes
export type SupportedLanguage = 'en' | 'ar' | 'ml';

// Interface for language context props
interface LanguageContextProps {
  currentLanguage: SupportedLanguage;
  translations: any;
  setLanguage: (language: SupportedLanguage | { code: string }) => void;
  isRtl: boolean;
  languages: Record<string, LanguageConfig>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<any>(null);
  const [isRtl, setIsRtl] = useState(false);
  const [languages, setLanguages] = useState<Record<string, LanguageConfig>>({});

  // Fetch language configurations from config.json
  useEffect(() => {
    const fetchLanguageConfig = async () => {
      try {
        const response = await fetch('/data/config.json');
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        const data = await response.json();
        setLanguages(data.data.languages || {});
      } catch (error) {
        console.error("Error fetching language config:", error);
      }
    };
    
    fetchLanguageConfig();
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage') as SupportedLanguage || 'en';
    setLanguage(storedLanguage);
  }, []);

  const fetchTranslations = async (language: SupportedLanguage) => {
    try {
      const response = await fetch(`/lang/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const data = await response.json();
      setTranslations(data.data);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  const setLanguage = (language: SupportedLanguage | { code: string }) => {
    if (language === null) {
      // Fallback to default language if null
      const langCode = 'en' as SupportedLanguage;
      applyLanguageSettings(langCode);
    } else if (typeof language === 'object' && language !== null && 'code' in language) {
      // Handle case where language is passed as an object
      const langCode = language.code as SupportedLanguage;
      applyLanguageSettings(langCode);
    } else {
      // Handle direct string code case
      const langCode = language as SupportedLanguage;
      applyLanguageSettings(langCode);
    }
  };

  // Helper function to apply language settings
  const applyLanguageSettings = (langCode: SupportedLanguage) => {
    localStorage.setItem('selectedLanguage', langCode);
    setCurrentLanguage(langCode);
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    setIsRtl(langCode === 'ar');
    fetchTranslations(langCode);
  };

  const value: LanguageContextProps = {
    currentLanguage,
    translations,
    setLanguage,
    isRtl,
    languages,
  };

  return (
    <LanguageContext.Provider value={value}>
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
