import React from 'react';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';

const CtaSection = () => {
    return (
        <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Ambient Colors */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="bg-white rounded-[3rem] p-10 sm:p-16 md:p-20 shadow-2xl shadow-indigo-100/50 border border-slate-100 flex flex-col items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <span className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-black uppercase tracking-widest mb-8">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Let's Talk
                    </span>

                    <h2 className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Ready to Build Your <br className="hidden sm:block" />
                        <span className="text-gradient italic">Website?</span>
                    </h2>

                    <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Whether you need a high-converting landing page or a complex AI SaaS, let's create something extraordinary together.
                    </p>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
                        <a
                            href="#contact"
                            className="group/btn relative w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center gap-3 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Contact Me
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </a>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
                            <a
                                href="mailto:stalin.sagayaraj04@gmail.com"
                                className="p-5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-white hover:text-indigo-600 hover:scale-110 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-200"
                                aria-label="Email Me"
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/stalin-sagayaraj-a-5347b3249/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-white hover:text-indigo-600 hover:scale-110 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-200"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
