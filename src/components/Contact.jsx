import React from 'react';
import { Mail, Github, MessageCircle, Send, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10 text-center">
                <div className="inline-block mb-10">
                    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-black uppercase tracking-widest shadow-sm">
                        <Send className="w-4 h-4" />
                        Let's Collaborate
                    </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
                    Ready to Build Something <br />
                    <span className="text-gradient italic drop-shadow-sm">Extraordinary?</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-14 leading-relaxed font-medium opacity-80">
                    Whether you have a specific project in mind or just want to say hi, my inbox is always open.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <a
                        href="mailto:stalin.sagayaraj04@gmail.com"
                        className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all duration-400 shadow-sm hover:shadow-lg hover:shadow-indigo-50"
                    >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all duration-400 border border-slate-100 group-hover:border-indigo-200 shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left min-w-0">
                            <h4 className="text-sm font-black text-slate-900 tracking-tight">Email</h4>
                            <p className="text-xs text-slate-400 font-medium truncate">stalin.sagayaraj04@gmail.com</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                        href="https://github.com/stalinSaga04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all duration-400 shadow-sm hover:shadow-lg hover:shadow-indigo-50"
                    >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all duration-400 border border-slate-100 group-hover:border-indigo-200 shrink-0">
                            <Github className="w-5 h-5" />
                        </div>
                        <div className="text-left min-w-0">
                            <h4 className="text-sm font-black text-slate-900 tracking-tight">GitHub</h4>
                            <p className="text-xs text-slate-400 font-medium truncate">View my projects</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                        href="https://wa.me/918122139068"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-400 shadow-lg shadow-indigo-100 hover:shadow-indigo-200"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left min-w-0">
                            <h4 className="text-sm font-black text-white tracking-tight">WhatsApp</h4>
                            <p className="text-xs text-indigo-200 font-medium truncate">Instant consultation</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
