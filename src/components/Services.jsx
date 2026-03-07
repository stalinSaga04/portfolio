import React from 'react';
import { Monitor, Rocket, RefreshCw, Zap, Shield, Target } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'Business Websites',
            description: 'Modern, high-performance websites for salons, legal firms, educational institutions, and local enterprises.',
            icon: <Monitor className="w-8 h-8" />,
            tag: 'Custom Design'
        },
        {
            title: 'Landing Pages',
            description: 'Ultra-fast, conversion-focused landing pages designed specifically for marketing and lead generation.',
            icon: <Target className="w-8 h-8" />,
            tag: 'Lead Gen'
        },
        {
            title: 'Website Redesign',
            description: 'Giving your existing web presence a complete overhaul for better performance, UI, and user engagement.',
            icon: <RefreshCw className="w-8 h-8" />,
            tag: 'Optimization'
        }
    ];

    return (
        <section id="services" className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 italic tracking-tight">
                        My Core <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-slate-500 max-w-3xl mx-auto text-lg md:text-xl pt-4 leading-relaxed font-medium opacity-80">
                        I provide end-to-end AI and Web solutions tailored to help businesses thrive with intelligent automation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="relative p-1 rounded-[2.5rem] group bg-gradient-to-br from-slate-100 to-transparent hover:from-indigo-100 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50"
                        >
                            <div className="bg-slate-50 p-10 rounded-[2.3rem] h-full relative z-10 border border-slate-200/50">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-600 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                        {service.icon}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-black py-2 px-4 rounded-full bg-white text-slate-500 border border-slate-200 shadow-sm">
                                        {service.tag}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium opacity-90">
                                    {service.description}
                                </p>

                                <div className="mt-10 pt-8 border-t border-slate-200/50 flex items-center justify-between group-hover:border-indigo-200 transition-colors">
                                    <span className="text-sm font-black text-slate-400 group-hover:text-indigo-600 transition-colors">Inquire now</span>
                                    <Rocket className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
