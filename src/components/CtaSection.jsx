import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CtaSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Same Cyberpunk Gradient as Hero */}
            <div className="absolute inset-0 z-0 hero-gradient-bg"></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 z-[1] bg-black/20"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-24 md:py-36">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-sm font-black uppercase tracking-widest mb-8">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        Let's Talk
                    </span>

                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-lg">
                        Ready to Build Your <br className="hidden sm:block" />
                        <span className="italic bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">Website?</span>
                    </h2>

                    <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Whether you need a high-converting landing page or a complex AI SaaS, let's create something extraordinary together.
                    </p>

                    <a
                        href="#contact"
                        className="group/btn relative inline-flex px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] items-center justify-center gap-3 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Contact Me
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;
