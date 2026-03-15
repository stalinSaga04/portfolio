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
        <section ref={containerRef} className="relative min-h-screen text-white overflow-hidden" id="hero">

            {/* ── BACKGROUND ── */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(145deg, #0F172A 0%, #0a1020 50%, #020617 100%)' }}
            />

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(250,204,21,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.5) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Radial glow — left (yellow) */}
            <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 70%)' }}
            />

            {/* Radial glow — right (orange, behind portrait) */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 30%, rgba(251,146,60,0.12) 0%, rgba(250,204,21,0.06) 40%, transparent 70%)' }}
            />

            {/* Floating dots */}
            <FloatingDot x={8} y={20} size={6} delay={0} color="rgba(250,204,21,0.4)" />
            <FloatingDot x={14} y={70} size={4} delay={1} color="rgba(251,146,60,0.4)" />
            <FloatingDot x={5} y={45} size={3} delay={0.5} color="rgba(250,204,21,0.3)" />
            <FloatingDot x={75} y={15} size={5} delay={1.5} color="rgba(251,146,60,0.25)" />
            <FloatingDot x={90} y={75} size={4} delay={0.8} color="rgba(250,204,21,0.2)" />

            {/* ── MAIN CONTENT GRID ── */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-screen py-28">

                    {/* ════ LEFT: TEXT CONTENT ════ */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="flex flex-col justify-center order-2 lg:order-1 z-10"
                    >
                        {/* Eyebrow badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mb-8"
                            style={{
                                background: 'rgba(250,204,21,0.08)',
                                border: '1px solid rgba(250,204,21,0.25)',
                            }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FACC15' }} />
                            <span className="text-xs font-semibold tracking-wide" style={{ color: '#FACC15' }}>
                                Open to Projects — Let's Build
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="font-black leading-[1.05] tracking-tight mb-4"
                            style={{ fontSize: 'clamp(42px, 6vw, 76px)' }}
                        >
                            <span className="text-white">Build Fast.</span>
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(90deg, #FACC15, #FB923C)' }}
                            >
                                Launch Smart.
                            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-400 leading-relaxed mb-3"
                            style={{ fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '480px' }}
                        >
                            I design and develop modern websites and web apps that help ideas become real products.
                        </motion.p>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28, duration: 0.6 }}
                            className="text-sm font-medium mb-10"
                            style={{ color: '#FB923C' }}
                        >
                            Turning ideas into real digital products.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.38, duration: 0.6 }}
                            className="flex flex-wrap gap-4 mb-12"
                        >
                            {/* Primary */}
                            <motion.a
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-900 transition-all duration-300"
                                style={{ background: 'linear-gradient(135deg, #FACC15, #FB923C)' }}
                                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(250,204,21,0.45)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            {/* Secondary */}
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300"
                                style={{
                                    color: '#FACC15',
                                    border: '1px solid rgba(250,204,21,0.35)',
                                    background: 'rgba(250,204,21,0.05)',
                                }}
                                whileHover={{
                                    background: 'rgba(250,204,21,0.12)',
                                    borderColor: 'rgba(250,204,21,0.6)',
                                    boxShadow: '0 0 25px rgba(250,204,21,0.2)',
                                    scale: 1.04,
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Start a Project
                            </motion.a>
                        </motion.div>

                        {/* Tech pills */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap gap-2 mb-10"
                        >
                            <TechPill icon={Code2} label="React / Next.js" delay={0.55} />
                            <TechPill icon={Cpu} label="AI-Assisted Dev" delay={0.62} />
                            <TechPill icon={Globe} label="Web3 Native" delay={0.69} />
                            <TechPill icon={Zap} label="Performance First" delay={0.76} />
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.6 }}
                            className="flex flex-wrap gap-3"
                        >
                            <StatBadge value="20+" label="Projects Built" delay={0.7} />
                            <StatBadge value="3+" label="Years Exp." delay={0.78} />
                            <StatBadge value="100%" label="Client Focus" delay={0.86} />
                        </motion.div>
                    </motion.div>

                    {/* ════ RIGHT: PORTRAIT IMAGE ════ */}
                    <div className="relative order-1 lg:order-2 flex items-end justify-center lg:justify-end h-[60vh] lg:h-screen">

                        {/* Large warm background glow orb */}
                        <div className="absolute pointer-events-none" style={{
                            width: '520px', height: '520px',
                            borderRadius: '50%',
                            bottom: '-8%', right: '-12%',
                            background: 'radial-gradient(circle, rgba(250,204,21,0.18) 0%, rgba(251,146,60,0.12) 40%, transparent 72%)',
                            filter: 'blur(8px)',
                        }} />

                        {/* Rotating outer accent ring */}
                        <motion.div
                            className="absolute pointer-events-none"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: '460px', height: '460px',
                                borderRadius: '50%',
                                bottom: '0%', right: '-8%',
                                border: '1px dashed rgba(250,204,21,0.2)',
                            }}
                        />
                        {/* Counter-rotating inner ring */}
                        <motion.div
                            className="absolute pointer-events-none"
                            animate={{ rotate: [360, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: '330px', height: '330px',
                                borderRadius: '50%',
                                bottom: '8%', right: '2%',
                                border: '1px solid rgba(251,146,60,0.15)',
                            }}
                        />
                        {/* The Portrait — Pop Art / Reference Image Style */}
                        <motion.div
                            style={{ scale: imageScale, y: imageY }}
                            className="relative z-10 w-full lg:w-auto h-full flex flex-col justify-center items-center lg:items-end mt-12 lg:mt-0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Decorative shadow blob behind the card */}
                            <div className="absolute w-[80%] h-[80%] bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

                            {/* Crisp White Card Container */}
                            <div className="relative overflow-hidden shadow-2xl bg-white"
                                style={{
                                    borderRadius: '32px',
                                    height: 'clamp(400px, 75vh, 700px)',
                                    width: 'clamp(300px, 40vw, 560px)',
                                    boxShadow: '0 25px 80px -20px rgba(0,0,0,0.6)'
                                }}>
                                
                                {/* Minimalist window dots */}
                                <div className="absolute top-6 left-6 flex gap-2 z-20">
                                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                                </div>

                                {/* Large Abstract Orange Geometric Star */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                    <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] opacity-90" style={{ fill: '#FF5A1F', transform: 'rotate(15deg) scale(1.15)' }}>
                                        <rect x="42" y="-20" width="16" height="140" rx="3" transform="rotate(0 50 50)" />
                                        <rect x="42" y="-20" width="16" height="140" rx="3" transform="rotate(45 50 50)" />
                                        <rect x="42" y="-20" width="16" height="140" rx="3" transform="rotate(90 50 50)" />
                                        <rect x="42" y="-20" width="16" height="140" rx="3" transform="rotate(135 50 50)" />
                                    </svg>
                                </div>

                                {/* Portrait overlapping with multiply blend mode & grayscale filter */}
                                <div className="absolute inset-x-0 bottom-0 h-[92%] flex justify-center items-end">
                                    <img
                                        src="/hero_portrait.jpg"
                                        alt="Stalin"
                                        className="h-full w-auto object-contain object-bottom select-none pointer-events-none"
                                        style={{ 
                                            /* The magic: white background becomes invisible, darks overlap the orange star */
                                            mixBlendMode: 'multiply',
                                            filter: 'grayscale(100%) contrast(1.15) brightness(1.05)',
                                            transform: 'scale(1.02)'
                                        }}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating "Available" badge — top left of portrait area */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: -10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                            className="absolute z-20 top-[18%] left-[2%] pointer-events-none"
                        >
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl"
                                style={{
                                    background: 'rgba(15,23,42,0.85)',
                                    border: '1px solid rgba(250,204,21,0.3)',
                                    backdropFilter: 'blur(12px)',
                                }}>
                                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                                <span className="text-xs font-semibold text-white">Available for Work</span>
                            </div>
                        </motion.div>

                        {/* Floating "Projects" stat badge — bottom right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="absolute z-20 bottom-[22%] right-[0%] pointer-events-none"
                        >
                            <div className="flex flex-col items-center px-5 py-3 rounded-2xl shadow-2xl"
                                style={{
                                    background: 'rgba(15,23,42,0.90)',
                                    border: '1px solid rgba(250,204,21,0.25)',
                                    backdropFilter: 'blur(14px)',
                                }}>
                                <span className="text-2xl font-black" style={{ color: '#FACC15' }}>20+</span>
                                <span className="text-xs text-slate-400 font-medium">Projects</span>
                            </div>
                        </motion.div>

                        {/* Floating "React / Next.js" tech mini badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="absolute z-20 bottom-[38%] right-[-4%] pointer-events-none"
                        >
                            <div className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
                                style={{
                                    background: 'rgba(250,204,21,0.12)',
                                    border: '1px solid rgba(250,204,21,0.3)',
                                    color: '#FACC15',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                ⚡ React / Next.js
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: 'rgba(250,204,21,0.5)' }}>
                    Scroll
                </span>
                <div className="w-5 h-8 rounded-full flex justify-center pt-1.5"
                    style={{ border: '1px solid rgba(250,204,21,0.3)' }}
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 h-1 rounded-full"
                        style={{ background: '#FACC15' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
