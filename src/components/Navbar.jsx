import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        <img
                            src="/favicon.png"
                            alt="SagayAI Lab"
                            className="w-10 h-10 rounded-full group-hover:rotate-12 transition-all duration-500 shadow-md shadow-indigo-200 dark:shadow-indigo-900/50"
                        />
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white italic">Sagay<span className="text-indigo-600 dark:text-indigo-400">AI</span> Lab</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            to="/#contact"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-full text-sm font-bold transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/50"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
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
                    <div className="pt-4 pb-2 px-2">
                        <Link
                            to="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-indigo-600 active:bg-indigo-700 text-white px-5 py-4 rounded-2xl text-base font-black transition-all duration-300 shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/50"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
