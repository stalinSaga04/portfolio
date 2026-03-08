import React from 'react';
import { Layers, Server, Cpu, Wrench } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            icon: <Layers className="w-6 h-6" />,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50',
            skills: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive UI']
        },
        {
            title: 'Backend',
            icon: <Server className="w-6 h-6" />,
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-emerald-50',
            skills: ['Node.js', 'REST APIs', 'Authentication', 'Database Design']
        },
        {
            title: 'AI Integration',
            icon: <Cpu className="w-6 h-6" />,
            color: 'from-indigo-500 to-violet-500',
            bg: 'bg-indigo-50',
            skills: ['AI API Integration', 'Prompt Engineering', 'Automation', 'RAG Systems']
        },
        {
            title: 'Tools & DevOps',
            icon: <Wrench className="w-6 h-6" />,
            color: 'from-fuchsia-500 to-pink-500',
            bg: 'bg-fuchsia-50',
            skills: ['Git', 'Vercel', 'Docker', 'Postman']
        }
    ];

    return (
        <section id="skills" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Ambient Background Decor */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-100/50 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/50 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-2xl px-1">
                        <span className="text-sm font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                            Technical Arsenal
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">
                            Core <span className="text-gradient italic">Competencies</span>
                        </h2>
                        <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                            A carefully curated stack of modern web technologies and AI frameworks designed for building scalable, high-performance applications.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="group relative bg-white/80 backdrop-blur-md rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 flex flex-col"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className={`p-4 rounded-2xl ${category.bg} shadow-inner group-hover:scale-110 transition-transform duration-500 flex items-center justify-center`}>
                                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2.5 relative z-10 mt-auto">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-[11px] sm:text-xs font-bold tracking-wide px-4 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 group-hover:border-indigo-100 group-hover:bg-white group-hover:text-indigo-700 transition-all duration-300 shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
