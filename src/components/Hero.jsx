import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ExternalLink, Code2, Cpu, Zap, Globe, Facebook, Twitter, Github } from 'lucide-react';

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

const Signature = ({ scrollYProgress }) => {
    const [hasTriggered, setHasTriggered] = useState(false);

    // Monitor scroll progress to detect the "Navbar Touch" point
    const threshold = 0.45;
    
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= threshold && !hasTriggered) {
            setHasTriggered(true);
        }
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={hasTriggered ? { opacity: 1 } : { opacity: 0 }}
            className="absolute left-0 bottom-[-110px] z-50 w-64 h-32 pointer-events-none md:hidden"
        >
            <svg viewBox="0 0 500 150" className="w-full h-full text-indigo-600 drop-shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
                <motion.path
                    d="M30,80 C30,30 65,30 65,80 C65,130 100,130 100,80 C100,30 135,30 135,80 C135,130 170,130 170,80 C185,60 205,60 200,95 C205,65 225,65 220,95 C225,65 245,65 240,95 C245,65 265,65 260,95 M290,40 L290,110 M320,100 C320,50 360,40 360,90 C360,140 400,130 400,80 C415,60 435,60 430,95 C435,65 455,65 450,95 C455,65 475,65 470,95"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={hasTriggered ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                />
                {/* Live Pen Tip Follower */}
                <motion.circle
                    r="4"
                    fill="#4F46E5"
                    initial={{ opacity: 0 }}
                    animate={hasTriggered ? { 
                        opacity: [0, 1, 1, 0],
                        offsetDistance: ["0%", "100%"]
                    } : { opacity: 0 }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    style={{ 
                        offsetPath: "path('M30,80 C30,30 65,30 65,80 C65,130 100,130 100,80 C100,30 135,30 135,80 C135,130 170,130 170,80 C185,60 205,60 200,95 C205,65 225,65 220,95 C225,65 245,65 240,95 C245,65 265,65 260,95 M290,40 L290,110 M320,100 C320,50 360,40 360,90 C360,140 400,130 400,80 C415,60 435,60 430,95 C435,65 455,65 450,95 C455,65 475,65 470,95')" 
                    }}
                />
            </svg>
        </motion.div>
    );
};

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
        <section ref={containerRef} className="relative h-screen min-h-[700px] text-[#0F172A] overflow-hidden bg-white" id="hero">

            {/* ── UNIFIED BACKGROUND CANVAS ── */}
            {/* Base White for the right side */}
            <div className="absolute inset-0 bg-white z-0" />
            
            {/* Diagonal Organic Wave Base (The dynamic part of the split) */}
            <motion.div 
                className="absolute inset-0 z-5"
                style={{
                    background: 'linear-gradient(135deg, #E11D48 0%, #4F46E5 100%)',
                    clipPath: 'polygon(0 0, 78% 0, 85% 15%, 75% 40%, 82% 65%, 72% 85%, 78% 100%, 0% 100%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* ── DYNAMIC RAYS (Layered behind portrait) ── */}
            <div className="absolute top-[50%] right-[-5%] -translate-y-1/2 w-[900px] h-[900px] z-1 pointer-events-none hidden lg:block opacity-[0.2]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/01/svg">
                        {Array.from({ length: 32 }).map((_, i) => (
                            <line 
                                key={i}
                                x1="100" y1="100" 
                                x2={100 + Math.cos((i * (360/32) * Math.PI) / 180) * 100} 
                                y2={100 + Math.sin((i * (360/32) * Math.PI) / 180) * 100}
                                stroke="#4F46E5" 
                                strokeWidth="2.5"
                                strokeDasharray="4 8"
                            />
                        ))}
                    </svg>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-radial from-[#4F46E533] to-transparent blur-[120px]" />
            </div>

            {/* ── GIANT PORTRAIT (High-level blend) ── */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] z-10 pointer-events-none flex items-end justify-end overflow-visible">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-[120%] sm:h-[135%] md:h-[145%] bottom-[8%] sm:bottom-[18%] right-[-12%] sm:right-[-10%]"
                    style={{ mixBlendMode: 'normal' }}
                >
                    <motion.img
                        initial={{ opacity: 0, scale: 1.1, x: 100 }}
                        animate={{ opacity: 1, scale: 1.35, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src="/hero_portrait.jpg"
                        alt="Stalin"
                        className="w-full h-full object-contain object-bottom select-none"
                    />
                    
                    {/* Floating Accents */}
                    <div className="absolute top-[40%] right-[35%] w-6 h-6 rounded-full bg-[#4F46E5] blur-[4px] opacity-40 animate-pulse" />
                    <div className="absolute bottom-[30%] right-[65%] w-5 h-5 rounded-full bg-[#E11D48] blur-[3px] opacity-30" />
                </motion.div>
            </div>

            {/* ── MAIN CONTENT GRID ── */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-full flex items-center">
                <div className="w-full lg:w-1/2 pt-40 sm:pt-44 lg:pt-20 relative">

                    {/* Left side: Text content with Glass Contrast Card */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="relative p-6 sm:p-12 rounded-[2rem] bg-indigo-900/10 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none border border-white/10 lg:border-none flex flex-col justify-center text-white lg:text-[#0F172A]"
                    >
                        {/* Desktop subtle glass highlight for better contrast */}
                        <div className="absolute inset-0 bg-white/5 lg:bg-[#0F172A]/[0.02] backdrop-blur-[2px] rounded-[2rem] hidden lg:block border border-white/10 lg:border-[#0F172A]/5 pointer-events-none" />
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative flex items-center gap-3 mb-6"
                        >
                            <div className="w-8 h-[2px] bg-indigo-600 rounded-full" />
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-indigo-100 lg:text-indigo-600 dark:text-indigo-400">
                                Turning ideas into real digital products.
                            </span>
                        </motion.div>

                        <Signature scrollYProgress={scrollYProgress} />

                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.12 } }
                            }}
                            className="relative"
                        >
                            <motion.h1 
                                whileHover={{ scale: 1.02, filter: "brightness(1.2)" }}
                                className="font-black leading-[1.1] sm:leading-[0.95] tracking-tighter mb-6 transition-all duration-300 group cursor-default"
                                style={{ fontSize: 'clamp(32px, 8vw, 68px)' }}
                            >
                                <div className="overflow-hidden inline-block">
                                    <motion.span 
                                        variants={{
                                            hidden: { y: 100 },
                                            visible: { y: 0 }
                                        }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="inline-block lg:text-[#0F172A]"
                                    >
                                        Build
                                    </motion.span>
                                </div>
                                {' '}
                                <div className="overflow-hidden inline-block">
                                    <motion.span 
                                        variants={{
                                            hidden: { y: 100 },
                                            visible: { y: 0 }
                                        }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="inline-block lg:text-[#0F172A]"
                                    >
                                        Fast.
                                    </motion.span>
                                </div>
                                <br />
                                <div className="overflow-hidden inline-block">
                                    <motion.span 
                                        variants={{
                                            hidden: { y: 100 },
                                            visible: { y: 0 }
                                        }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="inline-block text-white lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-[#FF00FF] lg:to-[#00FFFF] group-hover:drop-shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all"
                                    >
                                        Launch
                                    </motion.span>
                                </div>
                                {' '}
                                <div className="overflow-hidden inline-block">
                                    <motion.span 
                                        variants={{
                                            hidden: { y: 100 },
                                            visible: { y: 0 }
                                        }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="inline-block text-white lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-[#FF00FF] lg:to-[#00FFFF] group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
                                    >
                                        Smart.
                                    </motion.span>
                                </div>
                            </motion.h1>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="relative text-white/80 lg:text-[#0F172A]/70 text-sm md:text-lg max-w-md mb-8 sm:mb-10 leading-relaxed font-bold"
                        >
                           I design and develop modern websites and web apps that help ideas become real products.
                        </motion.p>

                        <div className="relative">
                            <motion.a
                                href="#projects"
                                className="px-10 sm:px-12 py-4 sm:py-5 bg-[#FF00FF] text-white font-black rounded-full shadow-[0_15px_40px_rgba(255,0,255,0.4)] hover:shadow-[0_20px_50px_rgba(255,0,255,0.6)] transition-all flex items-center justify-center gap-3 text-sm sm:text-base border border-white/20 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Modern Vertical Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-10 left-12 flex flex-col items-center gap-4 group"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] rotate-90 mb-4 opacity-30 group-hover:opacity-100 transition-opacity">Scroll</span>
                <div className="w-[2px] h-12 bg-gradient-to-b from-[#FF00FF] to-transparent rounded-full" />
            </motion.div>

        </section>
    );
};

export default Hero;

