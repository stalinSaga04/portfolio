import React from 'react';
import { User, Lightbulb, Coffee, Code2 } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 px-4 sm:px-6 lg:px-8 relative min-h-screen overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* About Content */}
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-8 shadow-sm">
                            <User className="w-4 h-4" />
                            About Me
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight italic leading-tight px-1">
                            Engineering <br className="sm:hidden" />
                            <span className="text-gradient">Intelligent Solutions</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium opacity-80 px-1">
                            I build modern, AI-powered systems that help businesses automate workflows,
                            analyze data, and establish a strong digital presence. My focus is clean UI,
                            peak performance, and intelligent engineering that drives results.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 px-1">
                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500 group">
                                <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-600 group-hover:rotate-12 transition-transform duration-500 shadow-inner shrink-0">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 mb-1 italic text-lg tracking-tight">Innovation</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">Always exploring new tech and design trends to deliver the best.</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-500 group">
                                <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-600 group-hover:rotate-12 transition-transform duration-500 shadow-inner shrink-0">
                                    <Coffee className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 mb-1 italic text-lg tracking-tight">Efficiency</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">Fast deliveries without compromising on the highest quality standards.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Decorative Element instead of Pic */}
                    <div className="hidden lg:flex flex-1 justify-center relative">
                        <div className="w-64 h-64 border-[16px] border-indigo-600/10 rounded-[3rem] rotate-12 absolute -z-10 animate-pulse"></div>
                        <div className="w-64 h-64 border-[16px] border-blue-600/10 rounded-[3rem] -rotate-12 animate-pulse [animation-delay:1s]"></div>
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 w-48 h-48 rounded-[2.5rem] shadow-2xl shadow-indigo-200 flex items-center justify-center p-8 group">
                            <Code2 className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
