
import { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

interface ConfigResponse {
  success: boolean;
  data: {
    loader: {
      background: string;
      spinner: string;
    };
  };
}

export function Loader() {
  const { data: configData } = useFetchData<ConfigResponse>('/data/config.json');
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  const spinnerColorClass = configData?.data?.loader?.spinner || '#FFFFFF';
  const bgColor = configData?.data?.loader?.background || '#7E5FEC';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ backgroundColor: bgColor }}
    >
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4" style={{ borderColor: spinnerColorClass }}></div>
    </div>
  );
}

export default Loader;
