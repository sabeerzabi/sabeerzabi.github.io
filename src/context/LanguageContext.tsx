import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

interface Language {
  name: string;
  code: string;
  flag: string;
  enabled: boolean;
  default: boolean;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translations: any;
  languages: Record<string, Language>;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { data: configData } = useFetchData<any>('/data/config.json');
  const [languages, setLanguages] = useState<Record<string, Language>>({});
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [translations, setTranslations] = useState<any>({});
  const [isRtl, setIsRtl] = useState<boolean>(false);

  useEffect(() => {
    if (configData?.data?.languages) {
      setLanguages(configData.data.languages);
      
      const defaultLang = Object.values(configData.data.languages).find(
        (lang: any) => lang.default && lang.enabled
      );
      
      if (defaultLang) {
        setCurrentLanguage(defaultLang.code);
      }
    }
  }, [configData]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/lang/${currentLanguage}.json`);
        const data = await response.json();
        setTranslations(data.data);
        
        setIsRtl(currentLanguage === 'ar');
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    if (currentLanguage) {
      fetchTranslations();
    }
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    if (languages[code] && languages[code].enabled) {
      setCurrentLanguage(code);
      localStorage.setItem('preferredLanguage', code);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translations, languages, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
