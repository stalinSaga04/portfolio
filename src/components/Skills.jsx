import React from 'react';
import { Cpu, Layout, Code, Terminal, Server, Brain, GitBranch, Layers } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            icon: <Layout className="w-6 h-6" />,
            skills: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive Design']
        },
        {
            title: 'Backend',
            icon: <Server className="w-6 h-6" />,
            skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'Authentication']
        },
        {
            title: 'AI & Data',
            icon: <Brain className="w-6 h-6" />,
            skills: ['AI API Integration', 'Prompt Engineering', 'RAG Systems', 'Vector DBs']
        },
        {
            title: 'Tools',
            icon: <Terminal className="w-6 h-6" />,
            skills: ['Git', 'Vercel', 'Docker', 'Postman']
        }
    ];

    return (
        <section id="skills" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-100/50 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/50 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight italic px-1">
                        Technical <span className="text-gradient">Stack</span>
                    </h2>
                    <p className="text-slate-500 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed opacity-80 px-1">
                        A specialized toolkit focused on building intelligent systems and high-performance web applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 hover:border-indigo-300 transition-all duration-500 hover:scale-[1.03] group shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-indigo-200/50 group-hover:rotate-12 transition-all duration-500 shadow-inner">
                                {category.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">{category.title}</h3>
                            <div className="flex flex-wrap gap-2 md:gap-2.5">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-slate-50 text-slate-600 text-[10px] md:text-[11px] lg:text-xs font-black border border-slate-100 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all duration-300"
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
