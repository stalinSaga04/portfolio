import React from 'react';
import { ExternalLink, Github, MessageSquare } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'RK Saloon',
            description: 'Luxury salon website with WhatsApp booking integration and service showcase. Designed for high conversion and premium feel.',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
            tech: ['React', 'Tailwind CSS', 'Vite'],
            live: 'https://rksaloon.vercel.app',
            category: 'Luxury Business',
        },
        {
            title: 'Savion Academy',
            description: 'Clean landing page designed specifically for lead generation. Features course listings and enquiry management.',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            tech: ['React', 'Tailwind'],
            live: 'https://savionacademy.vercel.app/',
            category: 'Funnel Page',
        },
        {
            title: 'Krish Law',
            description: 'Professional legal advisory website with consultation booking and practice area documentation.',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
            tech: ['React', 'Lucide Icons', 'Vercel'],
            live: 'https://krishlaw.vercel.app',
            category: 'Professional',
        },
        {
            title: 'Carecut AI',
            description: 'AI Video Director SaaS. Analyzes footage to automatically generate highlights, shorts, and cinematic edits using Computer Vision.',
            image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
            tech: ['Python', 'FastAPI', 'OpenCV'],
            live: 'https://carecut.vercel.app',
            category: 'AI Systems',
            inDev: true,
        }
    ];

    return (
        <section id="projects" className="py-16 md:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
                    <div className="max-w-2xl px-1">
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                            Selected <span className="text-gradient">Projects</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl leading-relaxed font-medium opacity-80">
                            Modern websites and landing pages built for businesses, professionals, and local brands.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="group relative h-[420px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30"
                        >
                            {/* Card Background & Border Glow */}
                            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/50 transition-colors duration-500 rounded-[2rem]" />
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-cyan-50/50 dark:from-indigo-900/20 dark:via-transparent dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative h-full flex flex-col">
                                {/* Image Container */}
                                <div className="h-[200px] overflow-hidden m-2 rounded-[1.5rem] relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-60"></div>

                                    {/* Category Tag (Floating) */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[10px] font-bold tracking-widest text-white uppercase px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* In Development Badge */}
                                    {project.inDev && (
                                        <div className="absolute top-4 right-4">
                                            <span className="text-[9px] font-black tracking-widest text-white uppercase px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md border border-amber-400/30 animate-pulse">
                                                🚧 In Development
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 pt-2 flex flex-col flex-1 justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            {project.inDev ? (
                                                <span className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 border border-amber-200 dark:border-amber-700/50 cursor-default" title="In Development">
                                                    <ExternalLink className="w-4 h-4" />
                                                </span>
                                            ) : (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2.5 rounded-full bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:scale-110 border border-slate-200 dark:border-slate-600 hover:border-indigo-400/50"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 md:line-clamp-3 mb-4 font-medium leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                        {project.tech.map((item) => (
                                            <span
                                                key={item}
                                                className="text-[9px] font-black tracking-tight px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-colors"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
