'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TailorPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger reveal animation on mount
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-zebraBlack min-h-screen font-sans text-white overflow-x-hidden relative">
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .glow-dot {
                    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
                }
            `}</style>

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[120px]"></div>
            </div>

            {/* Main Application Container */}
            <main
                className="relative z-10 min-h-screen flex flex-col p-8 md:p-16 transition-all duration-1000 ease-out"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)'
                }}
                data-purpose="page-wrapper"
            >
                {/* Back Nav */}
                <div className="absolute top-6 left-6 md:top-12 md:left-16 z-50">
                    <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <line x1="19" x2="5" y1="12" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Back to Dashboard</span>
                    </Link>
                </div>

                {/* Header Section */}
                <header className="mt-16 mb-16 max-w-4xl mx-auto w-full text-center md:text-left" data-purpose="header">
                    <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight mb-4 font-display">
                        Tailor to Job Description
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light">
                        Paste the JD. Match the keywords. Beat the ATS.
                    </p>
                </header>

                {/* Core Tool Layout */}
                <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-12" data-purpose="tool-container">

                    {/* Left Column (Input Area) */}
                    <section className="w-full md:flex-1" data-purpose="input-section">
                        <textarea
                            className="w-full h-80 bg-white/[0.02] border border-dashed border-white/20 rounded-2xl p-8 text-white/80 text-lg leading-relaxed focus:outline-none focus:border-white/50 focus:bg-white/[0.04] transition-all duration-500 resize-none placeholder:text-white/20 custom-scrollbar"
                            data-purpose="jd-textarea"
                            placeholder="Paste the Job Description here..."
                        ></textarea>
                    </section>

                    {/* Right Column (AI Visual & Action) */}
                    <section className="flex flex-col items-center gap-10 min-w-[240px]" data-purpose="action-section">

                        {/* AI Visualization Container */}
                        <div className="relative flex items-center justify-center p-8" data-purpose="ai-nodes-visual">

                            {/* Central Icon */}
                            <div className="relative z-10 text-white/90 animate-float">
                                <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                    <path d="M10 9H8"></path>
                                    <path d="M16 13H8"></path>
                                    <path d="M16 17H8"></path>
                                </svg>
                            </div>

                            {/* Pulsing Dots (AI Nodes) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {/* Node Top */}
                                <div className="absolute -top-4 w-2 h-2 bg-white rounded-full glow-dot animate-pulse"></div>
                                {/* Node Bottom Left */}
                                <div className="absolute -bottom-2 -left-4 w-2 h-2 bg-white/60 rounded-full glow-dot animate-pulse" style={{ animationDelay: '1s' }}></div>
                                {/* Node Bottom Right */}
                                <div className="absolute top-4 -right-4 w-2 h-2 bg-white/40 rounded-full glow-dot animate-pulse" style={{ animationDelay: '2s' }}></div>
                                {/* Node Far Left */}
                                <div className="absolute left-[-20px] top-1/2 w-1.5 h-1.5 bg-white/30 rounded-full glow-dot animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <button
                            className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
                            data-purpose="submit-button"
                        >
                            <svg className="text-black transition-transform group-hover:rotate-90 duration-500" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                            Tailor Resume
                        </button>

                    </section>
                </div>
            </main>
        </div>
    );
}
