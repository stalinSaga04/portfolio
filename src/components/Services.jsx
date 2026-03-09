import React from 'react';
import { Globe, Target, Cpu, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            title: 'Online Presence',
            description: 'Stand out with a premium, lightning-fast website that instantly builds trust and credibility for your brand.',
            icon: <Globe className="w-8 h-8" />,
            tag: 'Web Design'
        },
        {
            title: 'Lead Generation',
            description: 'Convert visitors into paying customers with high-converting funnels, strategic CTAs, and optimized user flows.',
            icon: <Target className="w-8 h-8" />,
            tag: 'Conversion'
        },
        {
            title: 'AI Automation',
            description: 'Save hundreds of hours by automating repetitive tasks with custom AI integrations and smart chatbots.',
            icon: <Cpu className="w-8 h-8" />,
            tag: 'Intelligence'
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 flex flex-col items-center text-center"
                        >
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2.5rem]"></div>

                            <div className="relative z-10 p-5 rounded-3xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 mb-6 shadow-md shadow-indigo-100/50 dark:shadow-none group-hover:scale-110 transition-transform duration-500 border border-indigo-50 dark:border-slate-700">
                                {service.icon}
                            </div>

                            <span className="relative z-10 text-[10px] uppercase tracking-widest font-black py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                                {service.tag}
                            </span>

                            <h3 className="relative z-10 text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 tracking-tight">
                                {service.title}
                            </h3>

                            <p className="relative z-10 text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium mb-8">
                                {service.description}
                            </p>

                            <div className="mt-auto relative z-10 w-full">
                                <a href="/#contact" className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl font-bold text-sm transition-all duration-300 hover:bg-indigo-600 dark:hover:bg-indigo-600 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                    <span>Learn more</span>
                                    <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
