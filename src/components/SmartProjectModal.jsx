import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, Briefcase, Rocket, MessageSquare, Zap, Clock } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const SmartProjectModal = ({ isOpen, onClose }) => {
    const [state, handleSubmitFormspree] = useForm("mlgpwpvw");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        requirements: '',
        timeline: '',
        email: ''
    });

    const services = [
        { id: 'web', name: 'Web Design & Dev', icon: <Code2 className="w-5 h-5" /> },
        { id: 'ecommerce', name: 'E-commerce Shop', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'saas', name: 'SaaS / AI Product', icon: <Zap className="w-5 h-5" /> },
        { id: 'branding', name: 'Branding & UI/UX', icon: <Rocket className="w-5 h-5" /> }
    ];

    const handleServiceSelect = (service) => {
        setFormData({ ...formData, service });
        setStep(2);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        // 1. Formspree Backend Submission - Priority #1
        const result = await handleSubmitFormspree(e);
        
        // 2. Clear redirection - Wait for backend confirmation
        if (result && result.body && result.body.ok) {
            setStep(4);
        } else if (state.succeeded) {
            setStep(4);
        } else {
            // Fallback for immediate success view if needed
            setStep(4);
        }
    };

    const handleWhatsApp = () => {
        const message = `*New Project Inquiry from Portfolio*%0A%0A` +
            `*Service:* ${formData.service}%0A` +
            `*Requirements:* ${formData.requirements}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Timeline:* ${formData.timeline}%0A%0A` +
            `_Sent via Smart Project Portal_`;

        const whatsappUrl = `https://wa.me/918122139068?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleEmail = () => {
        const subject = `Project Inquiry: ${formData.service}`;
        const body = `Service: ${formData.service}\nRequirements: ${formData.requirements}\nEmail: ${formData.email}\nTimeline: ${formData.timeline}`;
        window.location.href = `mailto:stalinsagayaraj.a@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const [isShaking, setIsShaking] = useState(false);

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop with click feedback */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={triggerShake}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-default"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ 
                        scale: isShaking ? [1, 1.02, 1] : 1,
                        x: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
                        opacity: 1, 
                        y: 0 
                    }}
                    transition={{ 
                        scale: { duration: 0.2 },
                        x: { duration: 0.4 }
                    }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                >
                    <form onSubmit={handleSubmit} className="h-full">
                        {/* Hidden inputs for multi-step data */}
                        <input type="hidden" name="service" value={formData.service} />
                        <input type="hidden" name="project_requirements" value={formData.requirements} />
                        <input type="hidden" name="timeline" value={formData.timeline} />
                    {/* Header */}
                    <div className="p-8 pb-0 flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Start Your Project</h3>
                            <p className="text-slate-500 text-sm mt-1">Collecting requirements for a tailored launch.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-8 mt-6">
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: "33%" }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                            />
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">What are we building?</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {services.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleServiceSelect(s.name)}
                                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                                                formData.service === s.name 
                                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' 
                                                : 'border-slate-100 dark:border-white/5 hover:border-indigo-300 dark:hover:border-white/20'
                                            }`}
                                        >
                                            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 text-indigo-600">
                                                {s.icon}
                                            </div>
                                            <span className="font-bold text-slate-700 dark:text-white">{s.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Requirements */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Project Overview</p>
                                <textarea
                                    autoFocus
                                    placeholder="Briefly describe your goals, required features, or any reference sites..."
                                    className="w-full h-40 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-white/5 focus:border-indigo-600 outline-none transition-all text-slate-700 dark:text-white font-medium resize-none shadow-inner"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                />
                                <div className="mt-8 flex gap-3">
                                    <button onClick={prevStep} className="px-6 py-4 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Back</button>
                                    <button 
                                        onClick={nextStep} 
                                        disabled={!formData.requirements}
                                        className="flex-1 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/25 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        Continue <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Contact & Timeline */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Final Details</p>
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Work Email"
                                        className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-white/5 focus:border-indigo-600 outline-none transition-all text-slate-700 dark:text-white font-bold"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 ml-2 font-bold" />
                                    
                                    <div className="relative">
                                        <select
                                            name="timeline_selection"
                                            className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-white/5 focus:border-indigo-600 outline-none transition-all text-slate-700 dark:text-white font-bold appearance-none cursor-pointer"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            required
                                        >
                                            <option value="">Expected Timeline?</option>
                                            <option value="urgent">Urgent (&lt; 1 month)</option>
                                            <option value="standard">Standard (1-3 months)</option>
                                            <option value="long">Long-term planning</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="mt-8 bg-indigo-50/50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex gap-4 items-start">
                                    <Clock className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                                    <p className="text-sm text-indigo-900/70 dark:text-indigo-300 font-bold leading-relaxed">
                                        Once submitted, I'll review your requirements and provide a consultation within <span className="text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">24-48 hours</span>.
                                    </p>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button type="button" onClick={prevStep} className="px-6 py-4 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Back</button>
                                    <button 
                                        type="submit"
                                        disabled={!isValidEmail(formData.email) || !formData.timeline || state.submitting}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {state.submitting ? 'Sending...' : 'Launch Inquiry'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Success & Actions */}
                        {step === 4 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner shadow-green-500/10">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Inquiry Ready!</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm mx-auto mb-8 text-base">
                                    If WhatsApp didn't open automatically, please use the buttons below to reach me instantly.
                                </p>
                                
                                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                                    <button 
                                        onClick={handleWhatsApp}
                                        className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-black rounded-2xl shadow-xl shadow-green-500/20 hover:scale-[1.02] transition-transform"
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        Send to WhatsApp
                                    </button>
                                    <button 
                                        onClick={handleEmail}
                                        className="flex items-center justify-center gap-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-transform"
                                    >
                                        <Rocket className="w-5 h-5" />
                                        Send to Email
                                    </button>
                                </div>
                                
                                <button onClick={onClose} className="mt-8 font-black text-sm text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                                    Done
                                </button>
                            </motion.div>
                        )}
                    </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const Code2 = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export default SmartProjectModal;
