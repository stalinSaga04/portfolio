import React from 'react';
import { Layers, Server, Cpu, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            icon: <Layers className="w-6 h-6" />,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50 dark:bg-blue-900/30',
            skills: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive UI']
        },
        {
            title: 'Backend',
            icon: <Server className="w-6 h-6" />,
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-emerald-50 dark:bg-emerald-900/30',
            skills: ['Node.js', 'REST APIs', 'Authentication', 'Database Design']
        },
        {
            title: 'AI Integration',
            icon: <Cpu className="w-6 h-6" />,
            color: 'from-indigo-500 to-violet-500',
            bg: 'bg-indigo-50 dark:bg-indigo-900/30',
            skills: ['AI API Integration', 'Prompt Engineering', 'Automation', 'RAG Systems']
        },
        {
            title: 'Tools & DevOps',
            icon: <Wrench className="w-6 h-6" />,
            color: 'from-fuchsia-500 to-pink-500',
            bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
            skills: ['Git & GitHub', 'Vercel', 'Postman', 'CI/CD Basics']
        }
    ];

    return (
        <section className="pb-16 md:pb-24 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
            {/* Abstract Background Decor */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-100/30 dark:bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 pt-16 md:pt-24 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 px-1"
                >
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                        Technical Arsenal
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Powering Your <span className="text-gradient italic">Ideas</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        I leverage modern frameworks and robust tools to build scalable, high-performance applications from concept to deployment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 dark:from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                            <div className="relative flex items-center gap-5 mb-8">
                                <div className={`p-4 rounded-2xl ${category.bg} shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white dark:border-slate-700/50`}>
                                    <div className={`text-transparent bg-clip-text bg-gradient-to-br ${category.color}`}>
                                        {React.cloneElement(category.icon, { className: 'w-8 h-8 stroke-[2.5px] stroke-[url(#gradient)] text-slate-900 dark:text-white' })}
                                    </div>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-500/30 transition-colors duration-300"
                                    >
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Premium Learning Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 max-w-2xl mx-auto"
                >
                    <div className="relative group p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden text-center">
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Live Status</span>
                            </div>

                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-900 shadow-xl mb-6"
                            >
                                <Cpu className="w-8 h-8" />
                            </motion.div>

                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Always Learning. Always Building.</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                                Currently diving deep into <span className="text-indigo-600 dark:text-indigo-400">Advanced AI Agentic Workflows</span> & 
                                scalable multi-agent systems.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
