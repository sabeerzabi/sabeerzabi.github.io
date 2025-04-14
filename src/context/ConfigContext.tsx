
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ConfigPaths {
  logo: string;
  favicon: string;
  resume: string;
  dotsBg: string;
  mapBg: string;
}

interface ConfigColors {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  white: string;
  dark: string;
  progress: {
    green: string;
    blue: string;
    pink: string;
    yellow: string;
    violet: string;
  };
}

interface ConfigLoader {
  background: string;
  spinner: string;
}

interface LanguageConfig {
  name: string;
  code: string;
  flag: string;
  enabled: boolean;
  default?: boolean;
}

interface ConfigData {
  paths: ConfigPaths;
  colors: ConfigColors;
  loader: ConfigLoader;
  languages: Record<string, LanguageConfig>;
}

interface ConfigContextType {
  config: ConfigData | null;
  loading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/data/config.json');
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setConfig(result.data);
        } else {
          throw new Error('Invalid config data');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
