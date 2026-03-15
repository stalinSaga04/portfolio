import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Sparkles, Terminal, Cpu, Globe } from 'lucide-react';
import Skills from './Skills';

const About = () => {
    const ideas = [
        { icon: <Zap className="w-6 h-6" />, label: "Catch the Spark", text: "Identifying unique business opportunities and AI-driven potential." },
        { icon: <Code2 className="w-6 h-6" />, label: "Code the Future", text: "Transforming raw ideas into scalable, production-ready systems." },
        { icon: <Sparkles className="w-6 h-6" />, label: "Ideas to Life", text: "Bridging the gap between conceptual vision and digital reality." }
    ];

    return (
        <section id="about" className="pt-[340px] sm:pt-[280px] lg:pt-[240px] pb-24 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 relative min-h-screen overflow-hidden transition-colors duration-500">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            
            {/* Floating Code Snippets (Visual Decor) */}
            <div className="absolute top-40 left-10 opacity-10 dark:opacity-20 hidden lg:block select-none pointer-events-none">
                <pre className="text-xs font-mono text-indigo-600 dark:text-indigo-400 leading-relaxed font-bold">
                    {`const idea = catch(spark);\nif (idea) {\n  code(future);\n  launch(impact);\n}`}
                </pre>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Safe Zone Spacer - Guaranteed Clearance */}
                <div className="h-16 lg:h-24" /> 
                
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                    
                    {/* Catch & Code Narrative */}
                    <div className="flex-1 space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-[0.3em] shadow-xl">
                                <Terminal className="w-4 h-4" />
                                Catch & Code
                            </div>
                            
                            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.05] tracking-tight">
                                We <span className="text-indigo-600 dark:text-indigo-400">Catch</span> Ideas,<br />
                                We <span className="text-indigo-600 dark:text-indigo-400">Code</span> Reality.
                            </h2>
                            
                            <p className="text-sm sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                                Engineering is more than just writing syntax. It's about capturing the fleeting spark of an idea 
                                and meticulously crafting it into a high-performance digital engine that drives growth.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                            {ideas.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
                                >
                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-lg border border-slate-100 dark:border-white/5 mb-6 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{item.label}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Creative Visual Side */}
                    <div className="flex-1 w-full lg:max-w-lg relative mt-8 lg:mt-0">
                        <div className="aspect-square relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-white/40 dark:bg-slate-950/40 backdrop-blur-3xl">
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <Cpu className="w-12 h-12 text-indigo-600 animate-pulse" />
                                    <Globe className="w-12 h-12 text-slate-400" />
                                    <Terminal className="w-12 h-12 text-slate-400" />
                                    <Code2 className="w-12 h-12 text-indigo-400" />
                                </div>
                                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">IDEAS TO CODE</h4>
                                <div className="w-20 h-[3px] bg-indigo-600 rounded-full mb-6" />
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Catching potential.<br />Coding results.
                                </p>
                            </div>
                        </div>
                        
                        {/* Decorative floating dots */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    </div>

                </div>
            </div>

            {/* Skills Section */}
            <div className="mt-16 lg:mt-24 relative z-10 w-full">
                <Skills />
            </div>
        </section>
    );
};

export default About;
