import React, { useState, useEffect } from 'react';
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
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-indigo-200">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 italic">Sagay<span className="text-indigo-600">AI</span> Lab</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-full text-sm font-bold transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-indigo-600 p-2.5 bg-slate-100 rounded-xl transition-all duration-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white/90 backdrop-blur-2xl border-b border-slate-200`}>
                <div className="px-4 pt-4 pb-8 space-y-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3.5 text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="pt-4 px-4">
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-2xl text-base font-bold transition-all duration-300 shadow-lg shadow-indigo-100"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
