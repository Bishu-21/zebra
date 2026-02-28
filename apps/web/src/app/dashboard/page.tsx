'use client';

import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-black to-black text-[#FAFAFA] min-h-screen relative overflow-x-hidden">
            <style jsx global>{`
                .liquid-bg {
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 10, 1) 70%, rgba(0, 0, 0, 1) 100%);
                }
                .tracking-widest-extra {
                    letter-spacing: 0.15em;
                }
            `}</style>

            {/* Background Layer */}
            <div aria-hidden="true" className="fixed inset-0 z-0 liquid-bg opacity-60 pointer-events-none"></div>

            {/* Main Content Container */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

                {/* Brand Header */}
                <header className="mb-12 text-center" data-purpose="brand-header">
                    <Link href="/">
                        <h1 className="text-3xl font-display font-light tracking-widest-extra uppercase text-white/40 hover:text-white transition-colors cursor-pointer">Zebra AI</h1>
                    </Link>
                </header>

                {/* Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full" data-purpose="dashboard-grid">

                    {/* Card 1: LinkedIn Import */}
                    <Link href="/import" className="group bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl p-12 flex flex-col items-center justify-center gap-6 transition-all duration-500 cursor-pointer hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" data-purpose="action-card">
                        <div className="text-white/90 group-hover:text-white transition-colors">
                            <svg fill="none" height="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                <path d="M12 12v9"></path>
                                <path d="m8 17 4 4 4-4"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-light tracking-wide text-white/90 group-hover:text-white transition-colors">LinkedIn Import</span>
                    </Link>

                    {/* Card 2: Fix Old Resume */}
                    <Link href="/fix-resume" className="group bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl p-12 flex flex-col items-center justify-center gap-6 transition-all duration-500 cursor-pointer hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" data-purpose="action-card">
                        <div className="text-white/90 group-hover:text-white transition-colors">
                            <svg fill="none" height="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                                <path d="m14 7 3 3"></path>
                                <path d="M5 6v4"></path>
                                <path d="M19 14v4"></path>
                                <path d="M10 2v2"></path>
                                <path d="M7 8H3"></path>
                                <path d="M21 16h-4"></path>
                                <path d="M11 3H9"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-light tracking-wide text-white/90 group-hover:text-white transition-colors">Fix Old Resume</span>
                    </Link>

                    {/* Card 3: Build From Scratch */}
                    <Link href="/build" className="group bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl p-12 flex flex-col items-center justify-center gap-6 transition-all duration-500 cursor-pointer hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" data-purpose="action-card">
                        <div className="text-white/90 group-hover:text-white transition-colors">
                            <svg fill="none" height="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                                <rect height="7" rx="1" width="7" x="14" y="3"></rect>
                                <rect height="7" rx="1" width="7" x="3" y="14"></rect>
                                <rect height="7" rx="1" width="7" x="14" y="14"></rect>
                                <path d="M3 9V3.5A.5.5 0 0 1 3.5 3H9"></path>
                                <path d="M5 10V5h5"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-light tracking-wide text-white/90 group-hover:text-white transition-colors">Build From Scratch</span>
                    </Link>

                    {/* Card 4: Tailor to JD */}
                    <Link href="/tailor" className="group bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl p-12 flex flex-col items-center justify-center gap-6 transition-all duration-500 cursor-pointer hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" data-purpose="action-card">
                        <div className="text-white/90 group-hover:text-white transition-colors">
                            <svg fill="none" height="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 22V4a2 2 0 0 1 2-2h8.5L20 7.5V22H4Z"></path>
                                <path d="M14 2v6h6"></path>
                                <circle cx="11.5" cy="13.5" r="2.5"></circle>
                                <path d="m16 18-2.7-2.7"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-light tracking-wide text-white/90 group-hover:text-white transition-colors">Tailor to JD</span>
                    </Link>

                </div>

                {/* Footer Branding */}
                <footer className="mt-16 text-white/20 text-xs font-light tracking-widest font-display uppercase" data-purpose="footer">
                    © 2024 ZEBRA AI. ALL RIGHTS RESERVED.
                </footer>

            </main>
        </div>
    );
}
