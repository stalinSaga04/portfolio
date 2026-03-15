import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import SmartProjectModal from './SmartProjectModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isDark = true; 

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Projects', href: '/#projects' },
        { name: 'Services', href: '/#services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo & Animated Brand Name */}
                        <Link to="/" className="flex items-center gap-3 group cursor-pointer py-1.5 transition-all duration-300 relative" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            {/* Logo with Coin Animation */}
                        {/* Brand Logo - Matches Footer Style */}
                        <motion.div 
                            whileHover={{ rotateY: 360 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-14 h-14 min-w-[3.5rem] flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-lg shadow-indigo-500/10 z-10 overflow-hidden relative"
                            style={{ perspective: 1000 }}
                        >
                            <img
                                src="/logo.png"
                                alt="Stalin Sagay A Raj Logo"
                                className="w-[120%] h-[120%] object-contain mix-blend-multiply filter contrast-[1.1] brightness-[1.1]"
                            />
                        </motion.div>
                            
                            <div className="flex flex-col ml-2 sm:ml-3 overflow-hidden max-w-[180px] sm:max-w-none">
                                <span className="text-base sm:text-xl font-black tracking-tighter text-slate-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                                    Stalin <span className="text-indigo-600 dark:text-indigo-400">Sagay</span> A Raj
                                </span>
                                <div className="h-[2px] w-full bg-gradient-to-r from-indigo-600 to-transparent opacity-40 shadow-sm" />
                            </div>
                        </Link>

                        {/* Desktop Nav Pill with Premium Link Styling */}
                        <div className="hidden md:flex items-center gap-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-2 py-1.5 rounded-full shadow-lg shadow-black/5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="group relative px-5 py-2 text-sm font-black tracking-tight text-slate-800 dark:text-slate-100 transition-all duration-300 overflow-hidden rounded-full"
                                >
                                    <span className="relative z-10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors drop-shadow-sm">{link.name}</span>
                                    {/* Animated Hover Glow & Underline */}
                                    <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            ))}

                            <div className="w-px h-6 bg-slate-300/40 dark:bg-white/10 mx-1"></div>

                            {/* Smart Project CTA */}
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-project-modal'))}
                                className="group flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95"
                            >
                                <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                Start a Project
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-2 py-1.5 rounded-full shadow-lg shadow-black/5">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all duration-300"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden absolute w-full overflow-hidden bg-white/95 dark:bg-slate-900/98 backdrop-blur-3xl border-b border-slate-200/50 dark:border-slate-800 shadow-2xl"
                        >
                            <div className="px-5 pt-4 pb-10 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-6 py-5 text-lg font-black tracking-tight text-slate-800 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-[1.5rem] transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('open-project-modal')); }}
                                    className="w-full flex items-center justify-center gap-3 py-6 mt-4 bg-indigo-600 text-white font-black text-xl rounded-[2rem] shadow-xl shadow-indigo-500/20"
                                >
                                    <Rocket className="w-6 h-6" />
                                    Start a Project
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
