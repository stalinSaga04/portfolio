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
        { name: 'Skills', href: '/skills' },
        { name: 'Services', href: '/#services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-black p-0.5 shadow-md shadow-indigo-200 dark:shadow-indigo-900/50 group-hover:rotate-12 transition-all duration-500 overflow-hidden">
                            <img
                                src={isDark ? "/favicon-dark.png" : "/favicon.png"}
                                alt="SagayAI Lab"
                                className="w-full h-full object-contain scale-110"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic">Sagay<span className="text-indigo-600 dark:text-indigo-400">AI</span> Lab</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-semibold text-slate-600 dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm"
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button + Theme Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="text-slate-600 dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all duration-300"
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
