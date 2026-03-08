import React from 'react';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer justify-center md:justify-start" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/favicon.png"
                            alt="SagayAI Lab"
                            className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-indigo-500/30"
                        />
                        <span className="text-2xl font-black tracking-tight text-white italic">Sagay<span className="text-indigo-400">AI</span> Lab</span>
                    </div>

                    {/* Middle: Signature Quote (Typewriter Animation) */}
                    <div className="text-center flex justify-center w-full">
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 shadow-inner w-full max-w-sm">
                            <p className="text-sm md:text-base font-medium text-slate-300 italic leading-relaxed signature-text text-left">
                                "Choice is our's!\nChance is your's,\n<span className="text-indigo-400 font-bold">Thought is forever."</span>
                            </p>
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
