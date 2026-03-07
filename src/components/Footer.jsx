import React from 'react';
import { Code2, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100 group-hover:rotate-12 transition-all duration-500">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900 italic">Sagay<span className="text-indigo-600">AI</span> Lab</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/stalinSaga04" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-indigo-50">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://www.linkedin.com/in/stalin-sagayaraj-a-5347b3249/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-indigo-50">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-indigo-50">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    <p>© {currentYear} Stalin (Sagay AI Lab). All rights reserved.</p>
                    <div className="flex items-center gap-10">
                        <button onClick={() => window.dispatchEvent(new CustomEvent('show-legal', { detail: 'privacy' }))} className="hover:text-indigo-600 transition-colors cursor-pointer">Privacy Policy</button>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('show-legal', { detail: 'terms' }))} className="hover:text-indigo-600 transition-colors cursor-pointer">Terms of Service</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
