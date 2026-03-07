import React, { useState, useEffect } from 'react';
import { ChevronRight, Layout, Code2, Cpu, Globe } from 'lucide-react';

const Hero = () => {
    const fullText = "I design and develop modern websites, AI-powered tools, and SaaS platforms that help businesses grow with stunning UI and intelligent technology.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden max-w-[100vw]">
                <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] md:w-[40%] md:h-[40%] bg-indigo-200/30 blur-[80px] md:blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[35%] md:w-[35%] md:h-[35%] bg-blue-200/20 blur-[60px] md:blur-[100px] rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-10 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                        </span>
                        <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">Available for new projects</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 md:mb-10 tracking-tighter leading-[1.1] md:leading-[0.9] animate-fade-in-up px-2">
                        AI & Web Developer <br className="hidden sm:block" /> Building <br className="sm:hidden" />
                        <span className="text-gradient italic drop-shadow-sm">Modern Digital Products</span>
                    </h1>

                    <div className="max-w-3xl mx-auto mb-10 md:mb-14 min-h-[5rem] md:min-h-[4rem] px-4">
                        <p className="text-lg sm:text-xl md:text-2xl text-slate-500 leading-relaxed font-medium opacity-90 transition-all duration-300">
                            {displayedText}
                            <span className="inline-block w-1.5 h-6 ml-1 bg-indigo-600 animate-blink align-middle"></span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 md:mb-24 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
                        >
                            Get Started
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-black text-lg transition-all duration-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 flex items-center justify-center"
                        >
                            Contact Me
                        </a>
                    </div>

                    {/* Social Proof / Tech Stack */}
                    <div className="mt-16 md:mt-24 flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 px-4">
                        <div className="font-black text-base md:text-xl text-slate-900 tracking-tighter">REACT</div>
                        <div className="font-black text-base md:text-xl text-slate-900 tracking-tighter">VITE</div>
                        <div className="font-black text-base md:text-xl text-slate-900 tracking-tighter">TAILWIND</div>
                        <div className="font-black text-base md:text-xl text-slate-900 tracking-tighter">VERCEL</div>
                        <div className="font-black text-base md:text-xl text-slate-900 tracking-tighter">DOCKER</div>
                    </div>
                </div>
            </div>

            {/* Subtle Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent -z-10" />
        </section>
    );
};

export default Hero;
