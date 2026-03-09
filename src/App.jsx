import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Skills from './components/Skills'
import About from './components/About'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import LoadingScreen from './components/LoadingScreen'

const AppContent = () => {
  const [showLegal, setShowLegal] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Theme handling (Storage > Time-based)
  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      let isDark;

      if (storedTheme) {
        isDark = storedTheme === 'dark';
      } else {
        const hour = new Date().getHours();
        isDark = hour >= 18 || hour < 6;
      }

      document.documentElement.classList.toggle('dark', isDark);
    };

    updateTheme();

    // Listen for manual theme changes
    window.addEventListener('theme-change', updateTheme);
    const interval = setInterval(updateTheme, 60000); // sync time every minute

    return () => {
      window.removeEventListener('theme-change', updateTheme);
      clearInterval(interval);
    };
  }, []);

  // Smooth scroll handling
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleShowLegal = (e) => {
      setShowLegal(e.detail);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('show-legal', handleShowLegal);
    return () => window.removeEventListener('show-legal', handleShowLegal);
  }, []);

  const closeLegal = () => {
    setShowLegal(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 selection:bg-indigo-600 selection:text-white flex flex-col relative overflow-hidden transition-colors duration-500">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </div>
      <Footer />

      {/* Legal Modals */}
      {showLegal === 'privacy' && <PrivacyPolicy onClose={closeLegal} />}
      {showLegal === 'terms' && <TermsConditions onClose={closeLegal} />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
