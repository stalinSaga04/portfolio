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
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Neural Canvas Background */}
                    <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
                    />

                    {/* Central Glowing Orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none"></div>

                    {/* Text Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-200"
                            style={{ textShadow: "0 0 40px rgba(0, 229, 255, 0.3)" }}
                        >
                            StalinSaga.dev
                        </motion.h1>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="mt-6 flex items-center gap-3"
                        >
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
                            </div>
                            <span className="text-sm font-semibold tracking-[0.3em] text-cyan-500/80 uppercase">
                                Neural Initializing
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
