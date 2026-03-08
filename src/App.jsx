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
  const [showLegal, setShowLegal] = useState(null); // 'privacy' | 'terms' | null
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling or scroll to top
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-600 selection:text-white flex flex-col relative overflow-hidden">
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
