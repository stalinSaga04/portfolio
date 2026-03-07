import React from 'react';
import { X, FileText } from 'lucide-react';

const TermsConditions = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col border border-slate-200">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Terms & Conditions</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-500 font-medium mb-8 italic">Last Updated: March 2024</p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">1. Agreement to Terms</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            By accessing or using our website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">2. Intellectual Property Rights</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">3. User Obligations</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            You agree NOT to:
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                                <li>Use the website in any way that causes or may cause damage to the website or impairment of the availability or accessibility of the website.</li>
                                <li>Engage in data mining, data harvesting, data extracting, or any other similar activity.</li>
                                <li>Use this website to engage in any advertising or marketing without our consent.</li>
                            </ul>
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">4. Limitation of Liability</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            In no event shall we be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence, or other tort, arising out of or in connection with the use of the website or the contents of the website.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">5. Governing Law</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            These Terms & Conditions are governed by and construed in accordance with the laws of Tamil Nadu, India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        Accept Terms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
