
import { useState, useEffect } from 'react';

export type FetchStatus = 'loading' | 'success' | 'error' | 'idle';

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        const response = await fetch(url);
        if (!response.ok) {
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
  }, [url]);

  return { data, status, error };
}
