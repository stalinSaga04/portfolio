import React from 'react';
import { Code2 } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-all duration-500">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white italic">Sagay<span className="text-indigo-400">AI</span> Lab</span>
                    </div>

                    {/* Animated Signature Quote */}
                    <div className="text-center md:text-right">
                        <p className="text-sm md:text-base font-medium text-slate-400 italic leading-relaxed signature-text">
                            "Choice is our's!<br />
                            Chance is your's,<br />
                            <span className="text-indigo-400 font-bold">Thought is forever."</span>
                        </p>
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
