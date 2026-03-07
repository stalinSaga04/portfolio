import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [showLegal, setShowLegal] = useState(null); // 'privacy' | 'terms' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on refresh
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

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
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Legal Modals */}
      {showLegal === 'privacy' && <PrivacyPolicy onClose={closeLegal} />}
      {showLegal === 'terms' && <TermsConditions onClose={closeLegal} />}
    </div>
  )
}

export default App
