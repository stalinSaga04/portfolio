import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import robot_sketch from '../assets/robot_sketch.jpg';
import robot_glow from '../assets/robot_glow.jpg';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    // Meteorite Animation Values
    const meteoriteY = useTransform(scrollYProgress, [0, 0.4], [-200, 380]);
    const meteoriteX = useTransform(scrollYProgress, [0, 0.4], [-200, 180]);
    const meteoriteOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.4], [0, 1, 1, 0]);
    const meteoriteScale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1.5]);

    // Robot Face Transition
    const glowOpacity = useTransform(scrollYProgress, [0.38, 0.45], [0, 1]);
    const faceScale = useSpring(useTransform(scrollYProgress, [0.38, 0.45], [1, 1.05]), { stiffness: 100, damping: 20 });
    const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <section id="home" ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-[140vh] flex flex-col items-center">
            {/* Animated Particles Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    particles: {
                        color: {
                            value: "#4f46e5", // indigo-600
                        },
                        links: {
                            color: "#818cf8", // indigo-400
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 0.8,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 30,
                        },
                        opacity: {
                            value: 0.3,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center w-full">
                <motion.div style={{ opacity: sectionOpacity }} className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
                    {/* Status Badge */}
                    <div className="inline-flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 backdrop-blur-md border border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer mb-8 animate-fade-in shadow-sm w-max mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-widest whitespace-nowrap">AI & Modern Web Solutions</span>
                    </div>

                    <div className="h-[140px] sm:h-[160px] md:h-[220px] flex items-center justify-center w-full">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[1.1] md:leading-[1.1] animate-fade-in-up px-2">
                            <TypeAnimation
                                sequence={[
                                    'AI & Web Developer',
                                    2000,
                                    'Building Intelligent\nWeb Applications',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="text-gradient drop-shadow-sm inline-block whitespace-pre-line"
                            />
                        </h1>
                    </div>

                    <div className="max-w-2xl mx-auto mb-10 md:mb-12 px-4 mt-6">
                        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed font-medium transition-all duration-300">
                            I help businesses grow by designing and developing stunning modern websites, AI-powered tools, and premium SaaS platforms.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-slate-900 border-2 border-slate-200 rounded-2xl font-black text-lg transition-all duration-300 hover:border-slate-900 hover:text-slate-900 hover:scale-[1.02] hover:bg-slate-50 hover:shadow-lg flex items-center justify-center"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* Robotic Animation Container */}
                <div className="relative mt-20 w-full max-w-[600px] h-[500px] flex items-center justify-center">
                    <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ scale: faceScale }}
                    >
                        {/* Base Sketch */}
                        <img
                            src={robot_sketch}
                            alt="AI Base"
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                        />

                        {/* Glowing Transition Layer */}
                        <motion.img
                            src={robot_glow}
                            alt="AI Powered"
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(79,70,229,0.4)]"
                            style={{ opacity: glowOpacity }}
                        />

                        {/* Falling Meteorite (Eri Kal) */}
                        <motion.div
                            className="absolute w-12 h-12 z-50 pointer-events-none"
                            style={{
                                y: meteoriteY,
                                x: meteoriteX,
                                opacity: meteoriteOpacity,
                                scale: meteoriteScale
                            }}
                        >
                            {/* Meteorite Head */}
                            <div className="w-4 h-4 bg-orange-500 rounded-full blur-[2px] relative overflow-visible">
                                {/* Meteorite Glow */}
                                <div className="absolute inset-0 bg-yellow-400 blur-[8px] rounded-full scale-150 animate-pulse"></div>

                                {/* Meteorite Tail */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-[150%] -translate-y-1/2 w-20 h-2 bg-gradient-to-r from-transparent via-orange-600 to-yellow-300 rounded-full opacity-80 -rotate-45 origin-right"></div>
                            </div>

                            {/* Impact Flash Circle (Invisible until core reach) */}
                            <motion.div
                                className="absolute top-0 left-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-[40px] z-10"
                                style={{
                                    scale: useTransform(scrollYProgress, [0.39, 0.42], [0, 2]),
                                    opacity: useTransform(scrollYProgress, [0.39, 0.4, 0.42], [0, 0.8, 0])
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Bottom Fade / Divider */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default Hero;
