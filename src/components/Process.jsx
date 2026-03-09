import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Process = () => {
    const steps = [
        {
            title: 'Discovery',
            description: 'We discuss your business goals, target audience, and specific requirements to build a strategic roadmap.',
            icon: <Search className="w-8 h-8" />,
            color: 'from-blue-500 to-indigo-600',
            bg: 'bg-indigo-50 dark:bg-indigo-900/30',
            text: 'text-indigo-600 dark:text-indigo-400'
        },
        {
            title: 'Design',
            description: 'I create stunning, high-converting wireframes and glassmorphic UI designs tailored to your brand identity.',
            icon: <PenTool className="w-8 h-8" />,
            color: 'from-indigo-500 to-violet-600',
            bg: 'bg-violet-50 dark:bg-violet-900/30',
            text: 'text-violet-600 dark:text-violet-400'
        },
        {
            title: 'Development',
            description: 'Using React and Tailwind CSS, I build a lightning-fast, fully responsive application with clean, scalable code.',
            icon: <Code className="w-8 h-8" />,
            color: 'from-violet-500 to-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-900/30',
            text: 'text-purple-600 dark:text-purple-400'
        },
        {
            title: 'Launch',
            description: 'After rigorous testing and performance optimization, your premium website goes live to the world.',
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-fuchsia-600',
            bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
            text: 'text-fuchsia-600 dark:text-fuchsia-400'
        }
    ];

    return (
        <section id="process" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                        Proven Workflow
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        My Development <span className="text-gradient italic">Process</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        A streamlined, transparent approach to translating your vision into a high-performance digital reality.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-24 h-24 rounded-3xl ${step.bg} ${step.text} flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 relative overflow-hidden border border-slate-200/50 dark:border-slate-700/50`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                    <div className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white dark:border-slate-900 shadow-sm">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                    {step.title}
                                </h3>

                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium px-2">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
