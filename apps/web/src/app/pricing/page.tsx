'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-body selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden transition-colors duration-300">
            <style jsx global>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glass-panel-highlight {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
                }
                .liquid-shape {
                    position: absolute;
                    filter: blur(80px);
                    z-index: -1;
                    opacity: 0.4;
                    animation: flow 15s infinite ease-in-out;
                }
                @keyframes flow {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
            `}</style>

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-white rounded-full liquid-shape mix-blend-overlay opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gray-500 rounded-full liquid-shape mix-blend-overlay opacity-10" style={{ animationDelay: '-5s' }}></div>
                <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-gray-400 rounded-full liquid-shape mix-blend-overlay opacity-5" style={{ animationDelay: '-10s' }}></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-6 py-3">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
                            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <span className="w-3 h-3 bg-black rounded-full"></span>
                            </span>
                            <span className="font-display font-bold text-lg tracking-tight dark:text-white text-black">Zebra.ai</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="relative z-20 w-full glass-panel border-b border-white/10 dark:border-white/10 bg-white/10 dark:bg-white/5 py-3 px-4 mt-28">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-light tracking-wide">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
                        <span className="material-symbols-outlined text-lg">groups</span>
                        <p><span className="font-semibold">Invite the squad.</span> Refer 3 students and get one complete resume build entirely free.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-transparent border border-slate-300 dark:border-white/20 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                        Copy Link
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                </div>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16 space-y-8">
                    <h1 className="text-4xl md:text-6xl font-display font-light text-slate-900 dark:text-white tracking-tight">
                        Simple, transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-slate-900 dark:from-white dark:to-gray-500">pricing.</span>
                    </h1>
                    <div className="inline-flex items-center p-1 bg-slate-200 dark:bg-white/10 rounded-full border border-slate-300 dark:border-white/10 backdrop-blur-sm">
                        <button className="px-6 py-2 rounded-full text-sm font-medium bg-white dark:bg-white text-black shadow-lg transition-all">
                            Standard
                        </button>
                        <button className="px-6 py-2 rounded-full text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1">
                            Student Verified
                            <span className="material-symbols-outlined text-sm text-green-400">verified</span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-20">
                    {/* Basic Plan */}
                    <div className="group relative rounded-3xl p-8 glass-panel flex flex-col h-full hover:bg-white/5 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-lg font-display text-slate-600 dark:text-gray-400 mb-2">Basic</h3>
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-5xl font-display font-medium text-slate-900 dark:text-white">Just need one?</span>
                            </div>
                            <div className="flex items-center gap-3 mt-4 mb-8">
                                <span className="text-xl text-slate-400 dark:text-gray-500 line-through decoration-slate-400/50">₹18</span>
                                <span className="text-3xl font-bold text-slate-900 dark:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">₹9</span>
                                <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 border border-slate-300 dark:border-white/10 px-2 py-0.5 rounded">Single Use</span>
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent mb-8"></div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300 font-light">
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white text-sm border border-slate-300 dark:border-white/30 rounded-full p-0.5">check</span>
                                    1 ATS-Optimized PDF Export
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300 font-light">
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white text-sm border border-slate-300 dark:border-white/30 rounded-full p-0.5">check</span>
                                    1 AI Tailoring Suggestion
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300 font-light">
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white text-sm border border-slate-300 dark:border-white/30 rounded-full p-0.5">check</span>
                                    Standard Templates
                                </li>
                            </ul>
                            <Link href="/dashboard" className="w-full py-4 rounded-xl border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 flex justify-center items-center gap-2 group-hover:border-white/40">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative rounded-3xl p-8 glass-panel-highlight flex flex-col h-full transform md:-translate-y-4">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/30 to-transparent rounded-3xl blur opacity-20 dark:opacity-40 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-display text-white dark:text-white">Pro</h3>
                                <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-[0_0_10px_rgba(255,255,255,0.5)]">Most Popular</span>
                            </div>
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-4xl font-display font-medium text-slate-900 dark:text-white">Foreweekly Plan</span>
                            </div>
                            <div className="flex items-center gap-3 mt-4 mb-8">
                                <span className="text-xl text-slate-400 dark:text-gray-500 line-through decoration-gray-500/50">₹79</span>
                                <span className="text-4xl font-bold text-slate-900 dark:text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">₹39</span>
                                <span className="text-sm text-slate-500 dark:text-gray-400 font-light">/ 4-weeks</span>
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent mb-8"></div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center gap-3 text-slate-900 dark:text-white font-light">
                                    <span className="material-symbols-outlined text-black bg-white rounded-full p-0.5 text-sm">check</span>
                                    Unlimited PDF Exports
                                </li>
                                <li className="flex items-center gap-3 text-slate-900 dark:text-white font-light">
                                    <span className="material-symbols-outlined text-black bg-white rounded-full p-0.5 text-sm">check</span>
                                    Premium LaTeX Templates
                                </li>
                                <li className="flex items-center gap-3 text-slate-900 dark:text-white font-light">
                                    <span className="material-symbols-outlined text-black bg-white rounded-full p-0.5 text-sm">check</span>
                                    Unlimited AI Tailoring
                                </li>
                                <li className="flex items-center gap-3 text-slate-900 dark:text-white font-light">
                                    <span className="material-symbols-outlined text-black bg-white rounded-full p-0.5 text-sm">check</span>
                                    Priority Support
                                </li>
                                <li className="flex items-center gap-3 text-slate-900 dark:text-white font-light">
                                    <span className="material-symbols-outlined text-black bg-white rounded-full p-0.5 text-sm">check</span>
                                    Cover Letter Generator
                                </li>
                            </ul>
                            <Link href="/dashboard" className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex justify-center items-center gap-2 transform active:scale-[0.98]">
                                Subscribe Now
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                            <p className="text-center text-xs text-slate-500 dark:text-gray-500 mt-4">Cancel anytime. No hidden fees.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl group-hover:from-white/20 transition-all duration-700"></div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                                <span className="material-symbols-outlined text-slate-500 dark:text-gray-400">school</span>
                                Student Discount
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400 font-light text-sm leading-relaxed">
                                Are you currently enrolled? Verify your student status via SheerID to unlock an exclusive <span className="text-slate-900 dark:text-white font-medium">50% discount</span> on the Foreweekly Pro plan.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/dashboard" className="bg-white/5 hover:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
                                Verify Student ID
                                <span className="material-symbols-outlined text-sm opacity-70">open_in_new</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center py-8 text-slate-500 dark:text-gray-600 text-xs font-light relative z-10">
                <p>© 2024 Zebra AI. All rights reserved.</p>
            </footer>
        </div>
    );
}
