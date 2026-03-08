import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Hero = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-[90vh] flex items-center justify-center">
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
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 40,
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

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden max-w-[100vw] z-0">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-indigo-300/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] bg-blue-300/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center w-full mt-10">
                <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
                    {/* Status Badge */}
                    <div className="inline-flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 backdrop-blur-md border border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer mb-8 animate-fade-in shadow-sm w-max mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-widest whitespace-nowrap">Available for new projects</span>
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
                </div>
            </div>

            {/* Subtle Bottom Fade / Divider */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default Hero;
