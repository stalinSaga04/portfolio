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

    // Meteorite Animation
    const meteoriteY = useTransform(scrollYProgress, [0, 0.5], [-300, 250]);
    const meteoriteX = useTransform(scrollYProgress, [0, 0.5], [-400, 100]);
    const meteoriteOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.5], [0, 1, 1, 0]);
    const meteoriteScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 2]);

    // Robot Glow Transition
    const glowOpacity = useTransform(scrollYProgress, [0.48, 0.55], [0, 1]);
    const faceScale = useSpring(useTransform(scrollYProgress, [0.48, 0.55], [1, 1.03]), { stiffness: 100, damping: 20 });

    return (
        <section id="home" ref={containerRef} className="relative overflow-hidden min-h-screen flex items-center justify-center bg-black">

            {/* === FULL BANNER ROBOT BACKGROUND IMAGE === */}
            <motion.div className="absolute inset-0 z-0" style={{ scale: faceScale }}>
                {/* Base Sketch — full cover, dark */}
                <img
                    src={robot_sketch}
                    alt="AI Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Glowing AI Version — fades in on scroll */}
                <motion.img
                    src={robot_glow}
                    alt="AI Powered"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: glowOpacity }}
                />

                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
            </motion.div>

            {/* Meteorite (Eri Kal) */}
            <motion.div
                className="absolute w-16 h-16 z-30 pointer-events-none"
                style={{ y: meteoriteY, x: meteoriteX, opacity: meteoriteOpacity, scale: meteoriteScale }}
            >
                <div className="w-5 h-5 bg-orange-500 rounded-full blur-[2px] relative overflow-visible">
                    <div className="absolute inset-0 bg-yellow-400 blur-[10px] rounded-full scale-[2] animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-[150%] -translate-y-1/2 w-24 h-2.5 bg-gradient-to-r from-transparent via-orange-600 to-yellow-300 rounded-full opacity-80 -rotate-45 origin-right"></div>
                </div>
                <motion.div
                    className="absolute top-0 left-0 w-60 h-60 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-[60px] z-10"
                    style={{
                        scale: useTransform(scrollYProgress, [0.49, 0.52], [0, 3]),
                        opacity: useTransform(scrollYProgress, [0.49, 0.5, 0.52], [0, 0.9, 0])
                    }}
                />
            </motion.div>

            {/* Particles */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 120,
                    particles: {
                        color: { value: "#818cf8" },
                        links: { color: "#818cf8", distance: 150, enable: true, opacity: 0.1, width: 1 },
                        move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 0.5 },
                        number: { density: { enable: true, area: 800 }, value: 20 },
                        opacity: { value: 0.2 },
                        size: { value: { min: 1, max: 2 } },
                    },
                }}
                className="absolute inset-0 z-[5] pointer-events-none"
            />

            {/* === WHITE TEXT CONTENT OVERLAY === */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center w-full py-32 lg:py-48">
                <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
                    {/* Status Badge */}
                    <div className="inline-flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-indigo-400/50 transition-colors cursor-pointer mb-8 animate-fade-in shadow-sm w-max mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-indigo-300 uppercase tracking-widest whitespace-nowrap">AI & Modern Web Solutions</span>
                    </div>

                    {/* Headline */}
                    <div className="h-[140px] sm:h-[160px] md:h-[220px] flex items-center justify-center w-full">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-[1.1] animate-fade-in-up px-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
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
                                className="inline-block whitespace-pre-line bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm"
                            />
                        </h1>
                    </div>

                    {/* Subtext */}
                    <div className="max-w-2xl mx-auto mb-10 md:mb-12 px-4 mt-6">
                        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-medium transition-all duration-300">
                            I help businesses grow by designing and developing stunning modern websites, AI-powered tools, and premium SaaS platforms.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-black text-lg transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default Hero;
