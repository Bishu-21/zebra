'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
    const { isSignedIn } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(true);

    const getStartedUrl = isSignedIn ? '/dashboard' : '/auth';

    useEffect(() => {
        // Enforce dark mode on mount
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-body antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-white selection:text-black transition-colors duration-300">
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-6 py-3">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="w-3 h-3 bg-black rounded-full"></span>
                        </span>
                        <span className="font-display font-bold text-lg tracking-tight dark:text-white text-black">Zebra.ai</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</Link>
                        <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Templates</Link>
                        <Link href="/pricing" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/demo" className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Demo</Link>
                        <Link href={getStartedUrl} className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                            {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative flex-grow flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-32 px-6">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.07] bg-grid-pattern"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-[0.03] blur-[120px] rounded-full drifting-bg"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gray-500 opacity-[0.05] blur-[100px] rounded-full drifting-bg" style={{ animationDelay: '-4s' }}></div>
                    <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform rotate-12 origin-top"></div>
                    <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent transform rotate-12 origin-top"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 w-fit glass-panel">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">v2.0 Now Available</span>
                        </div>
                        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-gray-900 dark:text-white">
                            Your career is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900 dark:from-gray-400 dark:to-white">not a template.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed font-light">
                            Overleaf-quality precision. Zero code required. Beat the ATS and secure the interview.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                            <Link href={getStartedUrl} className="group relative px-8 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <span className="relative flex items-center gap-2">
                                    {isSignedIn ? 'Build My Resume' : 'Build My Resume'}
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </span>
                            </Link>
                            <Link href="/demo" className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined">play_circle</span>
                                See how it works
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-6 text-gray-400 dark:text-gray-500 text-sm">
                            <div className="flex -space-x-3">
                                <Image alt="User" src="/avatars/avatar1.jpg" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white dark:border-black object-cover" />
                                <Image alt="User" src="/avatars/avatar2.jpg" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white dark:border-black object-cover" />
                                <Image alt="User" src="/avatars/avatar3.jpg" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white dark:border-black object-cover" />
                            </div>
                            <p>Joined by 10,000+ professionals</p>
                        </div>
                    </div>

                    <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 perspective-1000">
                        <div className="absolute w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br from-white/20 to-transparent rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-sm floating-element z-20 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] border border-white/20 backdrop-blur-sm">
                            <div className="absolute top-10 left-10 w-16 h-24 bg-white/30 rounded-full blur-xl"></div>
                            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        </div>

                        <div className="absolute top-[20%] left-[20%] w-40 h-40 bg-gradient-to-tr from-gray-500/10 to-transparent rounded-full blur-md floating-element" style={{ animationDelay: '-2s' }}></div>

                        <div className="absolute top-[10%] right-[5%] md:right-[10%] w-56 p-4 rounded-xl z-30 transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">ATS Score</span>
                                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-display font-bold text-white">98</span>
                                <span className="text-sm text-gray-400 mb-1">/ 100</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="bg-white h-full w-[98%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-[15%] left-[0%] md:left-[5%] w-64 p-4 rounded-xl z-30 transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-white/70 text-sm">auto_awesome</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">AI Suggestions</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <span className="material-symbols-outlined text-green-400 text-xs">check_circle</span>
                                    <span className="text-xs text-gray-300">Rephrased &quot;Managed team&quot;</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <span className="material-symbols-outlined text-green-400 text-xs">check_circle</span>
                                    <span className="text-xs text-gray-300">Added quantified impact</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[40%] right-[-5%] md:right-[0%] w-48 p-4 rounded-xl z-10 transform translate-y-[-50%] opacity-80 scale-90 blur-[1px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <div className="h-16 flex items-end justify-between gap-1">
                                <div className="w-2 bg-white/20 h-[40%] rounded-t-sm"></div>
                                <div className="w-2 bg-white/40 h-[60%] rounded-t-sm"></div>
                                <div className="w-2 bg-white/30 h-[30%] rounded-t-sm"></div>
                                <div className="w-2 bg-white/60 h-[80%] rounded-t-sm"></div>
                                <div className="w-2 bg-white h-[90%] rounded-t-sm shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                            </div>
                            <div className="mt-2 text-center text-[10px] text-gray-400 font-mono">CAREER VELOCITY</div>
                        </div>

                        <div className="absolute inset-0 border border-white/5 rounded-2xl z-0 transform rotate-[-2deg] scale-90">
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                                <div className="col-span-6 row-span-6 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="w-full border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-6">
                    <p className="text-center text-xs font-medium tracking-widest text-gray-500 dark:text-gray-500 uppercase">Trusted by leaders from</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="font-display font-bold text-xl text-gray-800 dark:text-white">ACME Corp</span>
                    <span className="font-display font-bold text-xl text-gray-800 dark:text-white italic">Globex</span>
                    <span className="font-display font-bold text-xl text-gray-800 dark:text-white tracking-widest">SOYLENT</span>
                    <span className="font-display font-bold text-xl text-gray-800 dark:text-white font-serif">Initech</span>
                    <span className="font-display font-bold text-xl text-gray-800 dark:text-white lowercase">umbrella</span>
                </div>
            </div>

            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleDarkMode}
                    className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-white border border-gray-200 dark:border-zinc-700 transition-transform hover:scale-110"
                >
                    <span className="material-symbols-outlined dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined hidden dark:block">light_mode</span>
                </button>
            </div>
        </div>
    );
}
