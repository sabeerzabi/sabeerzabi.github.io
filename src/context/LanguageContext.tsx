import React, { createContext, useState, useEffect, useContext } from 'react';

interface LanguageContextProps {
  currentLanguage: string;
  translations: any;
  setLanguage: (language: SupportedLanguage) => void;
  isRtl: boolean;
}

type SupportedLanguage = 'en' | 'ar';

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<any>(null);
  const [isRtl, setIsRtl] = useState(false);

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

  const setLanguage = (language: SupportedLanguage) => {
    if (typeof language === 'object' && language !== null && 'code' in language) {
      // This handles the case where language might be passed as an object
      const langCode = language.code as string;
      localStorage.setItem('selectedLanguage', langCode);
      setCurrentLanguage(langCode as SupportedLanguage);
      document.documentElement.lang = langCode;
      document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
      setIsRtl(langCode === 'ar');
      fetchTranslations(langCode);
    } else {
      // This handles the direct string code case
      const langCode = language as string;
      localStorage.setItem('selectedLanguage', langCode);
      setCurrentLanguage(langCode as SupportedLanguage);
      document.documentElement.lang = langCode;
      document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
      setIsRtl(langCode === 'ar');
      fetchTranslations(langCode);
    }
  };

  const value: LanguageContextProps = {
    currentLanguage,
    translations,
    setLanguage,
    isRtl,
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
