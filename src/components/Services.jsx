import React from 'react';
import { Globe, Target, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            title: 'Online Presence',
            subtitle: 'Create a Website That Builds Trust',
            description: 'Modern, high-performance websites designed to showcase your brand and give customers confidence in your business.',
            icon: <Globe className="w-8 h-8" />,
            tag: 'WEB DEVELOPMENT'
        },
        {
            title: 'Lead Generation',
            subtitle: 'Convert Visitors Into Opportunities',
            description: 'Strategic page structure and clear calls-to-action that turn website traffic into leads and real conversations.',
            icon: <Target className="w-8 h-8" />,
            tag: 'GROWTH OPTIMIZATION'
        },
        {
            title: 'AI Automation',
            subtitle: 'Automate Repetitive Work With AI',
            description: 'AI-powered tools and integrations that streamline workflows and reduce manual effort.',
            icon: <Cpu className="w-8 h-8" />,
            tag: 'AI AUTOMATION'
        }
    ];

    return (
        <section id="services" className="py-16 md:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight px-1">
                        What I Help Businesses <span className="text-gradient italic">Achieve</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg sm:text-xl pt-2 leading-relaxed font-medium px-1">
                        My exact focus is delivering measurable results and driving your business forward through modern digital solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col items-center text-center overflow-hidden"
                        >
                            {/* Simple attractive accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 p-5 rounded-3xl bg-slate-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 mb-8 border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                {React.cloneElement(service.icon, { className: "w-8 h-8" })}
                            </div>

                            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-black text-indigo-600/60 dark:text-indigo-400/60 mb-3">
                                {service.tag}
                            </span>

                            <h3 className="relative z-10 text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                {service.title}
                            </h3>

                            <h4 className="relative z-10 text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-5 px-4 leading-tight">
                                {service.subtitle}
                            </h4>

                            <p className="relative z-10 text-slate-500 dark:text-slate-300 text-base md:text-lg leading-[1.6] font-medium opacity-90">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

