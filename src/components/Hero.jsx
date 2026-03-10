import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import hero_robot from '../assets/hero_robot.jpg'; // We can keep this for fallback if needed, or remove it. Let's remove it and use HeroScrollFrames.
import HeroScrollFrames from './HeroScrollFrames';

const Hero = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <section ref={sectionRef} id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center">

            {/* === ANIMATED GRADIENT BACKGROUND (Purple → Magenta → Orange) === */}
            <div className="absolute inset-0 z-0 hero-gradient-bg"></div>

            {/* Robot Face — High Performance Canvas Scroll Sequence */}
            <HeroScrollFrames scrollYProgress={scrollYProgress} />

            {/* Extra dark overlay for text readability */}
            <div className="absolute inset-0 z-[2] bg-black/30"></div>

            {/* Particles */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 120,
                    particles: {
                        color: { value: "#ffffff" },
                        links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.08, width: 1 },
                        move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 0.5 },
                        number: { density: { enable: true, area: 800 }, value: 20 },
                        opacity: { value: 0.15 },
                        size: { value: { min: 1, max: 2 } },
                    },
                }}
                className="absolute inset-0 z-[3] pointer-events-none"
            />

            {/* === TEXT CONTENT === */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center w-full py-32 lg:py-48">
                <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 transition-colors cursor-pointer mb-8 shadow-lg w-max mx-auto"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-black text-cyan-50 uppercase tracking-[0.2em] whitespace-nowrap">Modern Web Development</span>
                    </motion.div>

                    {/* Headline — Stacked layout matching screenshot */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center justify-center w-full mb-8"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] md:leading-[1.1] px-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] text-center flex flex-col items-center justify-center gap-2 sm:gap-4 w-full">
                            <span>From Simple Ideas</span>
                            <span className="text-3xl sm:text-4xl md:text-6xl text-white/90">to</span>
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 transform sm:-translate-y-1">
                                    <TypeAnimation
                                        sequence={[
                                            'Powerful',
                                            2500,
                                            'Digital',
                                            2500,
                                            'Extraordinary',
                                            2500,
                                        ]}
                                        wrapper="span"
                                        speed={40}
                                        repeat={Infinity}
                                    />
                                </span>
                                <span>Experiences.</span>
                            </div>
                        </h1>
                    </motion.div>

                    {/* Subtext */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl mx-auto mb-10 md:mb-12 px-4"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                            I design and build modern websites that help businesses grow online.
                        </p>
                    </motion.div>

                    {/* Single CTA — View Projects (funnel entry) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center justify-center mb-16 w-full px-4 sm:px-0"
                    >
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade to slate-50/slate-900 */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors duration-500" />
        </section>
    );
};

export default Hero;
