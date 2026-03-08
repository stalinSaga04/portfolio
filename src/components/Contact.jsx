import React from 'react';
import { Mail, MessageCircle, Send, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 md:py-32 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <div className="inline-block mb-8 md:mb-10 animate-fade-in">
                    <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs sm:text-sm font-black uppercase tracking-widest shadow-sm">
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Let's Collaborate
                    </div>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1] px-1 animate-fade-in-up">
                    Let's Build Something <br className="hidden sm:block" />
                    <span className="text-gradient italic drop-shadow-sm">Amazing</span>
                </h2>

                <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium opacity-90 px-2 animate-fade-in-up delay-200">
                    If you have a project idea or want a modern website for your business, let's discuss it.
                </p>

                <div className="flex flex-col items-center gap-6 animate-fade-in-up delay-300">
                    {/* Primary Action */}
                    <a
                        href="https://wa.me/918122139068"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full sm:w-auto min-w-[280px] px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-black text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] flex items-center justify-center gap-3 overflow-hidden shadow-xl"
                    >
                        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Start WhatsApp Chat</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </a>

                    {/* Secondary Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <a
                            href="mailto:stalin.sagayaraj04@gmail.com"
                            className="flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-auto rounded-xl border-2 border-slate-200 text-slate-600 font-bold bg-white hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all duration-300 shadow-sm"
                        >
                            <Mail className="w-5 h-5" />
                            <span>Email Me</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/stalin-sagayaraj-a-5347b3249/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-auto rounded-xl border-2 border-slate-200 text-slate-600 font-bold bg-white hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 transition-all duration-300 shadow-sm"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Subtle Divider Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </section>
    );
};

export default Contact;
