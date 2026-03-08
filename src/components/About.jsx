import React from 'react';
import { User, Lightbulb, Coffee, Code2 } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8 relative min-h-screen overflow-hidden transition-colors duration-500">
            {/* Abstract Shapes */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 blur-[120px] rounded-full translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* About Content */}
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-8 shadow-sm">
                            <User className="w-4 h-4" />
                            About Me
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tight italic leading-tight px-1">
                            Engineering <br className="sm:hidden" />
                            <span className="text-gradient">Intelligent Solutions</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-10 leading-relaxed font-medium opacity-80 px-1">
                            I build modern, AI-powered systems that help businesses automate workflows,
                            analyze data, and establish a strong digital presence. My focus is clean UI,
                            robust engineering, and scalable architecture.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10 px-1">
                            <div className="flex gap-4 items-start">
                                <div className="p-3.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-inner border border-indigo-50 dark:border-indigo-800">
                                    <Code2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1.5 px-1">Modern Stack</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-1">Specialized in React, Tailwind, Node.js, and integrating complex APIs.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl shadow-inner border border-blue-50 dark:border-blue-800">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1.5 px-1">AI Implementation</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-1">Integrating language models and visual AI directly into user workflows.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image / Visual Side */}
                    <div className="flex-1 w-full relative group">
                        <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] rotate-3 scale-105 opacity-10 dark:opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-[2.5rem] -rotate-3 scale-105 opacity-10 dark:opacity-20 group-hover:-rotate-6 transition-transform duration-500"></div>

                        <div className="relative bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
                            <Coffee className="w-20 h-20 text-slate-300 dark:text-slate-600 mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-center mb-4 tracking-tight">Fueled by Coffee & Code</h3>
                            <p className="text-center text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-2">
                                I believe the best products balance elegant design with uncompromising engineering. Let's build something great.
                            </p>
                            <a href="/skills" className="mt-8 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all shadow-lg active:scale-95">
                                View Technical Skills
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
