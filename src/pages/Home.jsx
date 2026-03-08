import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Projects from '../components/Projects';
import CtaSection from '../components/CtaSection';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <Process />
            <Projects />
            <CtaSection />
            <Contact />
        </main>
    );
};

export default Home;
