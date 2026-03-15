import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink, Code2, Cpu, Zap, Globe } from 'lucide-react';

/* ─── Floating ambient dots ─── */
const FloatingDot = ({ x, y, size, delay, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
);

/* ─── Stat badge ─── */
const StatBadge = ({ value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center px-5 py-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
        <span className="text-2xl font-black" style={{ color: '#FACC15' }}>{value}</span>
        <span className="text-xs text-slate-400 font-medium mt-0.5">{label}</span>
    </motion.div>
);

/* ─── Tech pill ─── */
const TechPill = ({ icon: Icon, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-400"
        style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)' }}
    >
        <Icon className="w-3.5 h-3.5" style={{ color: '#FACC15' }} />
        {label}
    </motion.div>
);

const Hero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

    return (
        <section ref={containerRef} className="relative min-h-screen text-white overflow-hidden bg-[#0F172A]" id="hero">

            {/* ── BACKGROUND LAYERS ── */}
            
            {/* Main Dark Background */}
            <div className="absolute inset-0 bg-[#0F172A]" />

            {/* Organic/Lightning Split Background */}
            <motion.div 
                className="absolute inset-y-0 right-0 w-[90%] md:w-[65%] lg:w-[55%] z-0"
                style={{
                    background: '#F1F5F9',
                    // Aggressive Lightning jagged cut
                    clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%, 8% 70%, 18% 45%, 5% 30%)'
                }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Tech dot pattern on light side */}
                <div className="absolute inset-0 opacity-[0.06]" 
                    style={{ 
                        backgroundImage: `linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)`, 
                        backgroundSize: '32px 32px' 
                    }} 
                />
            </motion.div>

            {/* Ambient effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.06)_0%,transparent_70%)]" />
            </div>

            {/* ── MAIN CONTENT GRID ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full pt-16">

                    {/* Left side: Text content */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="flex flex-col justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full mb-6 bg-yellow-400/10 border border-yellow-400/20"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-400">Available for Projects</span>
                        </motion.div>

                        <motion.h1 
                            className="font-black leading-[0.9] tracking-tighter mb-6"
                            style={{ fontSize: 'clamp(52px, 8.5vw, 100px)' }}
                        >
                            Build Fast.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Launch Smart.
                            </span>
                        </motion.h1>

                        <motion.p className="text-slate-400 text-lg md:text-xl max-w-md leading-relaxed mb-8">
                            I design and develop modern websites and web apps that help ideas become real products.
                        </motion.p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <motion.a
                                href="#projects"
                                className="px-8 py-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900 font-black flex items-center gap-2 shadow-lg shadow-yellow-400/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Work <ArrowRight className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 rounded-xl border border-slate-700 font-extrabold bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start a Project
                            </motion.a>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <TechPill icon={Code2} label="React / Next.js" delay={0.1} />
                            <TechPill icon={Cpu} label="AI Development" delay={0.2} />
                            <TechPill icon={Zap} label="Performance" delay={0.3} />
                        </div>
                    </motion.div>

                    {/* Right side: Giant Portrait */}
                    <div className="relative flex justify-center lg:justify-end items-end h-[50vh] lg:h-[80vh] mt-12 lg:mt-0">
                        {/* Portrait Container */}
                        <motion.div
                            style={{ scale: imageScale, y: imageY }}
                            className="absolute bottom-0 right-[-10%] lg:right-[-25%] w-[120%] lg:w-[160%] h-[120%] flex items-end justify-center lg:justify-end pointer-events-none"
                            initial={{ opacity: 0, x: 120 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src="/hero_portrait.jpg"
                                alt="Stalin"
                                className="w-auto h-[100%] lg:h-[115%] object-contain object-bottom select-none"
                                style={{ 
                                    mixBlendMode: 'multiply',
                                    filter: 'grayscale(100%) contrast(1.15) brightness(0.96)',
                                    transformOrigin: 'bottom'
                                }}
                            />

                            {/* Floating Badge 1: Status */}
                            <motion.div 
                                className="absolute top-[35%] left-[10%] lg:left-[15%] px-4 py-2.5 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-white flex items-center gap-2 pointer-events-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Available for Work</span>
                            </motion.div>

                            {/* Floating Badge 2: Stats */}
                            <motion.div 
                                className="absolute bottom-[20%] right-[10%] lg:right-[20%] px-5 py-4 bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-700/50 flex flex-col items-center pointer-events-auto"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                <span className="text-2xl font-black text-yellow-400">20+</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Projects Completed</span>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Bottom scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40"
            >
                <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-slate-500">Scroll to Explore</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-yellow-400 to-transparent" />
            </motion.div>


        </section>
    );
};

export default Hero;

