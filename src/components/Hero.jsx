import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Cpu, Globe, Code2, Sparkles, Zap, ChevronDown } from 'lucide-react';

const MouseParallaxBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = document.documentElement;
            // Calculate mouse position relative to center of screen (-1 to 1)
            const x = (e.clientX / clientWidth) * 2 - 1;
            const y = (e.clientY / clientHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden perspective-1000">
            {/* The Image layer that rotates and shifts slightly opposite to mouse */}
            <motion.div 
                className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center"
                style={{ backgroundImage: 'url(/hero_bg.png)' }}
                animate={{
                    x: mousePosition.x * -30,
                    y: mousePosition.y * -30,
                    rotateX: mousePosition.y * 5,
                    rotateY: mousePosition.x * -5,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
            >
                {/* Techy Scanline & Dark Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] h-full" />
                <div className="hero-scanline z-0 opacity-30" />
            </motion.div>
        </div>
    );
};

const Hero = () => {
    const containerRef = useRef(null);

    // Native scroll tracking over entirely 300vh
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // ─── RAPID TRANSITION MAPPINGS ───
    // The user requested very fast, snappy reveals based on scroll depth.
    // Sharp transition thresholds create that instant 'snap' feel without scroll locking.

    // Stage 1 (0% to 30% scroll depth)
    const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

    // Stage 2 (35% to 65% scroll depth)
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], [40, 0, 0, -40]);
    const scale2 = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], [0.95, 1, 1, 1.05]);

    // Stage 3 (70% to 100% scroll depth - fades into About section naturally)
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.7, 0.95, 1], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.65, 0.7], [40, 0]);

    // Scroll Hint Text mapped to scroll progress
    const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 0]);

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-[#020617] text-white overflow-hidden">
            {/* STICKY CONTAINER: Locks to screen for 200vh to smoothly overlap with Services */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                
                <MouseParallaxBackground />

                {/* Abstract Glowing Orbs for Depth */}
                <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

                {/* ─── STAGE 1: INTRODUCTION ─── */}
                <motion.div 
                    style={{ opacity: opacity1, scale: scale1 }} 
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                        <Sparkles className="w-4 h-4" /> Available for New Projects
                    </div>
                    
                    <h1 className="text-[clamp(42px,8vw,80px)] font-black text-center leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-indigo-300 drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                        Hi, I'm <span className="text-white">Stalin</span>
                    </h1>
                    
                    <p className="mt-6 text-[clamp(18px,4vw,24px)] text-slate-300 text-center max-w-2xl font-medium leading-relaxed">
                        I engineer intelligent frontend solutions and modern web applications that elevate brand experiences.
                    </p>

                    {/* Floating Tech Badges */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-80">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                            <Code2 className="w-5 h-5 text-indigo-400" /> <span className="font-mono text-sm">React/Next.js</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                            <Cpu className="w-5 h-5 text-cyan-400" /> <span className="font-mono text-sm">AI Interfaces</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                            <Globe className="w-5 h-5 text-blue-400" /> <span className="font-mono text-sm">Web3 Native</span>
                        </div>
                    </div>
                </motion.div>

                {/* ─── STAGE 2: EXPERTISE (Glass UI Panel) ─── */}
                <motion.div 
                    style={{ opacity: opacity2, y: y2, scale: scale2 }} 
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 pointer-events-none"
                >
                    <div className="max-w-4xl w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center relative overflow-hidden text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                        
                        <Zap className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                        
                        <h2 className="text-[clamp(36px,6vw,64px)] font-black text-white leading-tight mb-4 tracking-tighter">
                            Bridging Design & <span className="text-cyan-400">Deep Tech</span>
                        </h2>
                        
                        <p className="text-[clamp(16px,2.5vw,20px)] text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Specializing in highly scalable frontend architectures, seamless GSAP animations, and integrating complex AI APIs into intuitive user interfaces.
                        </p>
                    </div>
                </motion.div>

                {/* ─── STAGE 3: THE CALL TO ACTION ─── */}
                <motion.div 
                    style={{ opacity: opacity3, y: y3 }} 
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 pointer-events-none"
                >
                    <div className="text-center">
                        <h2 className="text-[clamp(28px,6vw,56px)] font-bold text-slate-300 tracking-tight leading-none mb-2">
                            BUILDING NEXT-GEN PRODUCTS
                        </h2>
                        <h1 className="text-[clamp(36px,8vw,100px)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 tracking-tighter leading-[1.1] px-2 py-1 drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                            FOR THE MODERN WEB
                        </h1>
                        <p className="text-[clamp(14px,3.5vw,22px)] text-cyan-400 font-semibold tracking-widest uppercase mt-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                            Experience The Future
                        </p>
                    </div>
                </motion.div>

                {/* Universal Native Scroll Hint */}
                <motion.div 
                    style={{ opacity: hintOpacity }}
                    className="absolute bottom-12 flex flex-col items-center gap-3 pointers-events-none transition-colors duration-300"
                >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">
                        Scroll Down
                    </span>
                    <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center p-1 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
