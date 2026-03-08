import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import robot_glow from '../assets/robot_glow.jpg';

const Hero = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center">

            {/* === ANIMATED GRADIENT BACKGROUND (Purple → Magenta → Orange) === */}
            <div className="absolute inset-0 z-0 hero-gradient-bg"></div>

            {/* Robot Face — single image, centered, subtle overlay */}
            <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                <img
                    src={robot_glow}
                    alt="AI"
                    className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
                />
            </div>

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
                    <div className="inline-flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 transition-colors cursor-pointer mb-8 animate-fade-in shadow-lg w-max mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-black text-cyan-50 uppercase tracking-[0.2em] whitespace-nowrap">Modern Web Development</span>
                    </div>

                    {/* Headline */}
                    <div className="h-[140px] sm:h-[160px] md:h-[220px] flex items-center justify-center w-full">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-[1.1] animate-fade-in-up px-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
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
                                className="inline-block whitespace-pre-line"
                            />
                        </h1>
                    </div>

                    {/* Subtext */}
                    <div className="max-w-2xl mx-auto mb-10 md:mb-12 px-4 mt-6">
                        <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                            I help businesses grow by designing and developing stunning modern websites, AI-powered tools, and premium SaaS platforms.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 overflow-hidden"
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

            {/* Bottom Gradient Fade to slate-50/slate-900 */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors duration-500" />
        </section>
    );
};

export default Hero;
