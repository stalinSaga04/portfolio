import React from 'react';
import { Layers, Server, Cpu, Wrench } from 'lucide-react';

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
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden transition-colors duration-500">
            {/* Abstract Background Decor */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-100/30 dark:bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-24 px-1">
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                        Technical Arsenal
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Powering Your <span className="text-gradient italic">Ideas</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        I leverage modern frameworks and robust tools to build scalable, high-performance applications from concept to deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
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
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 animate-pulse">Always learning. Currently expanding into Advanced AI Agents.</p>
                </div>
            </div>
        </section>
    );
};

export default Skills;
