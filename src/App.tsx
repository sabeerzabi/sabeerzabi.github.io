
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { LanguageProvider } from '@/context/LanguageContext';
import { ConfigProvider } from '@/context/ConfigContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ConfigProvider>
      <LanguageProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ConfigProvider>
  );
}

export default App;
