import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Projects />
            <Services />
            <Contact />
        </main>
    );
};

export default Home;
