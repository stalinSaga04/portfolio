import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

const LoadingScreen = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        "Initializing Sagay AI...",
        "Loading Neural Networks...",
        "Optimizing Interface Components...",
        "Establishing Secure Connection...",
        "Syncing Laboratory Data...",
        "Ready."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinish, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onFinish]);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 600);
        return () => clearInterval(messageInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6">
            <div className="relative mb-12">
                <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center animate-pulse border border-indigo-100 shadow-xl shadow-indigo-100/50">
                    <Cpu className="w-12 h-12 text-indigo-600 animate-spin-slow" />
                </div>
                <div className="absolute -inset-4 bg-indigo-400/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
            </div>

            <div className="w-full max-w-sm">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">System Status</span>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight transition-all duration-300">
                            {messages[messageIndex]}
                        </h3>
                    </div>
                    <span className="text-2xl font-black text-slate-900 tabular-nums italic">{progress}%</span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="absolute bottom-12 flex flex-col items-center opacity-30">
                <div className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase mb-4">Sagay AI Laboratory v2.0</div>
                <div className="flex gap-4">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
