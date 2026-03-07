import React from 'react';
import { X, Shield } from 'lucide-react';

const PrivacyPolicy = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col border border-slate-200">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Privacy Policy</h2>
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

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">1. Information We Collect</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            We collect information you provide directly to us when you fill out a contact form or communicate with us via email or WhatsApp. This may include your name, email address, phone number, and any other information you choose to provide.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">2. How We Use Your Information</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            We use the information we collect to:
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                                <li>Respond to your inquiries and provide services.</li>
                                <li>Send updates and information related to your projects.</li>
                                <li>Improve our website and user experience.</li>
                                <li>Protect against fraudulent or illegal activity.</li>
                            </ul>
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">3. Data Security</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">4. Third-Party Links</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
                        </p>

                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">5. Contact Us</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                            If you have any questions about this Privacy Policy, please contact us at stalin.sagayaraj04@gmail.com.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
