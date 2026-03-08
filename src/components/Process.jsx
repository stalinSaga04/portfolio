import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const Process = () => {
    const steps = [
        {
            title: 'Discovery',
            description: 'We discuss your business goals, target audience, and specific requirements to build a strategic roadmap.',
            icon: <Search className="w-8 h-8" />,
            color: 'from-blue-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600'
        },
        {
            title: 'Design',
            description: 'I create stunning, high-converting wireframes and glassmorphic UI designs tailored to your brand identity.',
            icon: <PenTool className="w-8 h-8" />,
            color: 'from-indigo-500 to-violet-600',
            bg: 'bg-violet-50',
            text: 'text-violet-600'
        },
        {
            title: 'Development',
            description: 'Using React and Tailwind CSS, I build a lightning-fast, fully responsive application with clean, scalable code.',
            icon: <Code className="w-8 h-8" />,
            color: 'from-violet-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600'
        },
        {
            title: 'Launch',
            description: 'After rigorous testing and performance optimization, your premium website goes live to the world.',
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-fuchsia-600',
            bg: 'bg-fuchsia-50',
            text: 'text-fuchsia-600'
        }
    ];

    return (
        <section id="process" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-100/40 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-sm font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                        Proven Workflow
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        My Development <span className="text-gradient italic">Process</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        A streamlined, transparent approach to translating your vision into a high-performance digital reality.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <div key={step.title} className="flex flex-col items-center text-center group">
                                <div className={`w-24 h-24 rounded-3xl ${step.bg} ${step.text} flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-slate-200/50 relative overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                    <div className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                                    {step.title}
                                </h3>

                                <p className="text-slate-500 text-base leading-relaxed font-medium px-2">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
