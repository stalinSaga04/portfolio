import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasAutoFlipped, setHasAutoFlipped] = useState(false);
    const quoteRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (quoteRef.current) {
            observer.observe(quoteRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-flip effect
    useEffect(() => {
        let flipTimer;
        let unflipTimer;

        if (isVisible && !hasAutoFlipped) {
            // Wait 5 seconds for the wipe animation + reading time
            flipTimer = setTimeout(() => {
                setIsFlipped(true);
                setHasAutoFlipped(true);

                // Unflip after 4 seconds
                unflipTimer = setTimeout(() => {
                    setIsFlipped(false);
                }, 4000);
            }, 5000);
        }

        return () => {
            clearTimeout(flipTimer);
            clearTimeout(unflipTimer);
        };
    }, [isVisible, hasAutoFlipped]);

    return (
        <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer justify-center md:justify-start" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/favicon.png"
                            alt="SagayAI Lab"
                            className="w-10 h-10 rounded-full group-hover:rotate-12 transition-all duration-500 shadow-md shadow-indigo-500/30"
                        />
                        <span className="text-2xl font-black tracking-tight text-white italic">Sagay<span className="text-indigo-400">AI</span> Lab</span>
                    </div>

                    {/* Middle: Signature Quote & Flip Card */}
                    <div className="text-center flex justify-center w-full" ref={quoteRef}>
                        <div
                            className="w-full max-w-sm h-36 relative perspective-1000 group cursor-pointer"
                            onMouseEnter={() => setIsFlipped(true)}
                            onMouseLeave={() => setIsFlipped(false)}
                        >
                            <div className={`w-full h-full transition-transform duration-700 preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>

                                {/* Front Side: The Quote */}
                                <div className="absolute inset-0 backface-hidden flex w-full h-full bg-slate-800/80 rounded-2xl p-6 border border-slate-600/50 shadow-lg shadow-indigo-500/10 backdrop-blur-sm overflow-hidden text-left items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
                                    <div className="w-full">
                                        <p className={`text-sm md:text-base font-medium text-slate-200 italic leading-relaxed relative z-10 signature-text ${isVisible ? 'is-visible' : ''}`}>
                                            "Choice is our's!<br />Chance is your's,<br /><span className="text-indigo-400 font-bold">Thought is forever."</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Back Side: YOU for YOU */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-2xl overflow-hidden p-[2px] shadow-lg shadow-purple-500/20">
                                    {/* Animated Glowing Borders */}
                                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_300deg,theme(colors.indigo.500)_360deg)] animate-[spin_3s_linear_infinite] opacity-80"></div>
                                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_180deg,transparent_0_300deg,theme(colors.purple.500)_360deg)] animate-[spin_3s_linear_infinite] opacity-80"></div>

                                    {/* Inner Content */}
                                    <div className="absolute inset-[2px] bg-slate-900 rounded-2xl flex items-center justify-center z-10">
                                        <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 tracking-widest drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] select-none">
                                            YOU <span className="text-slate-500 text-lg mx-1">for</span> YOU
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Social Media Links */}
                    <div className="flex justify-center md:justify-end gap-4">
                        <a
                            href="https://wa.me/918122139068"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:-translate-y-1"
                            title="WhatsApp"
                        >
                            <MessageSquare className="w-5 h-5" />
                        </a>
                        <a
                            href="https://github.com/stalinSaga04"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
                            title="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/stalin-sagayaraj-a-5347b3249/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1"
                            title="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    <p>© {currentYear} Stalin (Sagay AI Lab). All rights reserved.</p>
                    <div className="flex items-center gap-10">
                        <button onClick={() => window.dispatchEvent(new CustomEvent('show-legal', { detail: 'privacy' }))} className="hover:text-indigo-400 transition-colors cursor-pointer">Privacy Policy</button>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('show-legal', { detail: 'terms' }))} className="hover:text-indigo-400 transition-colors cursor-pointer">Terms of Service</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
