import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onFinish }) => {
    const canvasRef = useRef(null);
    const [isExiting, setIsExiting] = useState(false);

    // After a minimum display time of 2.5 seconds, start the exit animation 
    // to seamlessly transition into the Hero.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinish, 800); // 800ms fade out duration
        }, 2500);
        return () => clearTimeout(timer);
    }, [onFinish]);

    // Neural Network Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let animationFrameId;
        let particles = [];
        const numParticles = window.innerWidth < 768 ? 40 : 80;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
                ctx.fill();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        const drawNetwork = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const alpha = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.3})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(drawNetwork);
        };

        drawNetwork();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(20px)', y: -30 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Cinematic Nebula Glows */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15],
                            rotate: [0, 90, 180, 270, 360]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(225,29,72,0.05) 50%, transparent 100%)',
                            top: '-10%',
                            left: '-10%'
                        }}
                    />
                    <motion.div 
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            opacity: [0.1, 0.2, 0.1],
                            rotate: [360, 270, 180, 90, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(225,29,72,0.08) 0%, rgba(79,70,229,0.04) 50%, transparent 100%)',
                            bottom: '-10%',
                            right: '-10%'
                        }}
                    />

                    {/* Master Infinity Wrapper */}
                    <div className="relative flex flex-col items-center gap-16">
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="relative w-64 h-32"
                        >
                            <svg viewBox="0 0 100 50" className="w-full h-full filter drop-shadow-[0_0_25px_rgba(79,70,229,0.4)]">
                                <defs>
                                    <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#4F46E5" />
                                        <stop offset="50%" stopColor="#E11D48" />
                                        <stop offset="100%" stopColor="#4F46E5" />
                                    </linearGradient>
                                    <filter id="neonGlow">
                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Background Trace */}
                                <path 
                                    d="M25 40 C0 40 0 10 25 10 C35 10 40 25 50 25 C60 25 65 40 75 40 C100 40 100 10 75 10 C65 10 60 25 50 25 C40 25 35 40 25 40 Z" 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.03)" 
                                    strokeWidth="4" 
                                />

                                {/* Outer Glow Layer */}
                                <motion.path
                                    d="M25 40 C0 40 0 10 25 10 C35 10 40 25 50 25 C60 25 65 40 75 40 C100 40 100 10 75 10 C65 10 60 25 50 25 C40 25 35 40 25 40 Z"
                                    fill="none"
                                    stroke="url(#liquidGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    style={{ opacity: 0.3, filter: 'blur(4px)' }}
                                    animate={{ pathOffset: [0, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Inner Liquid Neon Layer */}
                                <motion.path
                                    d="M25 40 C0 40 0 10 25 10 C35 10 40 25 50 25 C60 25 65 40 75 40 C100 40 100 10 75 10 C65 10 60 25 50 25 C40 25 35 40 25 40 Z"
                                    fill="none"
                                    stroke="url(#liquidGradient)"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    filter="url(#neonGlow)"
                                    initial={{ pathLength: 0.3, pathOffset: 0 }}
                                    animate={{ 
                                        pathOffset: [0, 1],
                                        strokeWidth: [3.5, 4.2, 3.5]
                                    }}
                                    transition={{ 
                                        pathOffset: { duration: 2.2, repeat: Infinity, ease: "linear" },
                                        strokeWidth: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />

                                {/* Moving Light Streak */}
                                <motion.path
                                    d="M25 40 C0 40 0 10 25 10 C35 10 40 25 50 25 C60 25 65 40 75 40 C100 40 100 10 75 10 C65 10 60 25 50 25 C40 25 35 40 25 40 Z"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    style={{ opacity: 0.6 }}
                                    initial={{ pathLength: 0.1, pathOffset: 0 }}
                                    animate={{ pathOffset: [0, 1] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                                />
                            </svg>
                        </motion.div>

                        {/* Elite Branding Reveal */}
                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } }
                                }}
                                className="flex items-center gap-4 text-3xl md:text-4xl font-black uppercase tracking-[0.3em]"
                            >
                                <motion.span 
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-white"
                                >
                                    stalin sagay
                                </motion.span>
                                <motion.span 
                                    variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                                    className="w-[2px] h-8 bg-indigo-500/50 origin-center"
                                />
                                <motion.span 
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-indigo-500"
                                >
                                    2aj .dev
                                </motion.span>
                            </motion.div>

                            {/* Status Micro-copy */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[10px] font-mono tracking-[0.5em] text-slate-500 uppercase"
                            >
                                Fabricating Digital Excellence
                            </motion.div>
                        </div>
                    </div>

                    {/* Progress Track */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/5 overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
