import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        // Initial dark state check
        setIsDark(document.documentElement.classList.contains('dark'));

        window.addEventListener('scroll', handleScroll);

        const handleThemeChange = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        window.addEventListener('theme-change', handleThemeChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('theme-change', handleThemeChange);
        };
    }, []);

    // Auto-close mobile menu on scroll
    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => {
            setIsOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    const toggleTheme = () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
        window.dispatchEvent(new CustomEvent('theme-change'));
    };

    const navLinks = [
        { name: 'Projects', href: '/#projects' },
        { name: 'Services', href: '/#services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Pill */}
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 pr-5 pl-2 py-1.5 rounded-full shadow-lg shadow-black/5 hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-9 h-9 flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform duration-500">
                            <img
                                src="/logo.png"
                                alt="SagayAI Lab Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white italic">Sagay<span className="text-indigo-600 dark:text-indigo-400">AI</span> Lab</span>
                    </Link>

                    {/* Desktop Nav Pill */}
                    <div className="hidden md:flex items-center space-x-1 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-2 py-1.5 rounded-full shadow-lg shadow-black/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-semibold text-slate-700 dark:text-slate-100 px-4 py-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-px h-6 bg-slate-300/50 dark:bg-white/20 mx-2"></div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-700 dark:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button + Theme Toggle (Pill style) */}
                    <div className="md:hidden flex items-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-2 py-1.5 rounded-full shadow-lg shadow-black/5">
                        <button
                            onClick={toggleTheme}
                            className="text-slate-700 dark:text-slate-100 p-2 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-full transition-all duration-300"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
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
            <div className={`md:hidden transition-all duration-500 ease-in-out absolute w-full ${isOpen ? 'max-h-[32rem] opacity-100 border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl' : 'max-h-0 opacity-0 border-transparent'} overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl`}>
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-5 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 active:bg-indigo-50/50 rounded-2xl transition-all duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
