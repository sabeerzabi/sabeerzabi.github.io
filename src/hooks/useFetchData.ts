
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export type FetchStatus = 'loading' | 'success' | 'error' | 'idle';

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        // Check if URL is a language-specific file
        let fetchUrl = url;
        if (url.startsWith('/data/en/') && currentLanguage !== 'en') {
          // Replace language part in URL
          fetchUrl = url.replace('/data/en/', `/data/${currentLanguage}/`);
        }

        const response = await fetch(fetchUrl);
        if (!response.ok) {
          // If language-specific file fails, try to fall back to English
          if (fetchUrl !== url) {
            const fallbackResponse = await fetch(url);
            if (!fallbackResponse.ok) {
              throw new Error(`Failed to fetch: ${response.status}`);
            }
            const fallbackResult = await fallbackResponse.json();
            setData(fallbackResult);
            setStatus('success');
            return;
          }
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setStatus('success');
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setStatus('error');
        console.error(`Error fetching data from ${url}:`, err);
      }
    };

    fetchData();
  }, [url, currentLanguage]);

  return { data, status, error };
}
