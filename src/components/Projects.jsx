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
            description: 'Educational landing page optimized for lead generation. Features course listings and enquiry management.',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            tech: ['React', 'Tailwind', 'Responsive Design'],
            live: 'https://sanvionacademy.vercel.app',
            category: 'Education SaaS',
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
            image: 'https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=800&auto=format&fit=crop',
            tech: ['Python', 'FastAPI', 'OpenCV'],
            live: 'https://carecut.vercel.app',
            category: 'AI Systems',
            inDev: true,
        }
    ];

    return (
        <section id="projects" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Recent <span className="text-gradient">AI Systems</span>
                        </h2>
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium opacity-80">
                            I build scalable AI products and high-performance web applications that solve real-world problems.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="group relative h-[420px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50"
                        >
                            {/* Card Background & Border Glow */}
                            <div className="absolute inset-0 bg-slate-50 border border-slate-200 group-hover:border-indigo-300 transition-colors duration-500 rounded-[2rem]" />
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

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
                                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            {project.inDev ? (
                                                <span className="p-2.5 rounded-full bg-amber-50 text-amber-500 border border-amber-200 cursor-default" title="In Development">
                                                    <ExternalLink className="w-4 h-4" />
                                                </span>
                                            ) : (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2.5 rounded-full bg-white text-slate-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 border border-slate-200 hover:border-indigo-400/50"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-slate-500 text-sm line-clamp-2 md:line-clamp-3 mb-4 font-medium leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                        {project.tech.map((item) => (
                                            <span
                                                key={item}
                                                className="text-[9px] font-black tracking-tight px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-indigo-200 transition-colors"
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
