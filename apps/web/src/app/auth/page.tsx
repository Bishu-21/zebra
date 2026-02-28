'use client';

import Link from 'next/link';

import { SignIn } from '@clerk/nextjs';

export default function AuthPage() {
    return (
        <div className="bg-background-dark text-white font-body antialiased h-screen w-full flex overflow-hidden">
            <style jsx global>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.8);
                }
                .liquid-bg {
                    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 55%, transparent 60%);
                    background-size: 100% 100%, 200% 200%;
                    animation: shimmer 8s infinite linear;
                }
                .glass-text-bg {
                    position: relative;
                    z-index: 10;
                }
                @keyframes shimmer {
                    0% { background-position: 50% 50%, 0% 0%; }
                    100% { background-position: 50% 50%, 200% 200%; }
                }
            `}</style>

            <div className="hidden lg:flex w-1/2 h-full relative flex-col justify-center items-center overflow-hidden bg-zebra-black">
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Liquid Texture Background" className="w-full h-full object-cover opacity-60 grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDepkU4QtMyahTBntdkXNihfWvtk6gYGXvjn8Wm3FuT-ONvLKb5vJpa1JV4XFwC2kx3y3VOY3cNoLFfU4Kv60B1kxrtJanyYBwgHErR1jetKqkRAX2XQ-3DdFRNI9xo-4-0H7kV1AwZ-3dDeE8l6AOUAD3tqYoWBL8nN3POOhq_13vVVIwo4QTgNWbtPGJryHh4SWBrbYBYRB2cy36kK6ycJiew794B24CA_ubnFYy8oaR_Kwg8L37hO5gt8pm_TEq0nWXZAUeesDU" />
                    <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black"></div>
                    <div className="liquid-bg absolute inset-0 opacity-30 mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 p-12 text-center">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#FAFAFA] leading-tight">
                        Step inside.<br />
                        Your next interview awaits.
                    </h1>
                </div>

                <Link href="/" className="absolute bottom-8 left-8 z-10 flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="w-3 h-3 bg-black rounded-full"></span>
                    </span>
                    <span className="font-display font-bold text-sm tracking-widest uppercase text-white/80">Zebra.ai</span>
                </Link>
            </div>

            <div className="w-full lg:w-1/2 h-full bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-y-auto">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="glass-card w-full max-w-[420px] p-8 md:p-10 rounded-2xl relative z-10 flex justify-center">
                    <SignIn
                        routing="hash"
                        forceRedirectUrl="/dashboard"
                        fallbackRedirectUrl="/dashboard"
                        appearance={{
                            elements: {
                                card: "bg-transparent shadow-none w-full p-0 flex justify-center items-center m-0",
                                rootBox: "w-full flex justify-center",
                                cardBox: "w-full shadow-none",
                                headerTitle: "font-display font-bold text-3xl text-[#FAFAFA] text-center",
                                headerSubtitle: "text-white/60 text-sm text-center",
                                socialButtonsBlockButton: "bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium transition-colors",
                                socialButtonsBlockButtonText: "text-white font-medium",
                                dividerLine: "bg-white/20",
                                dividerText: "text-white/40 glass-text-bg bg-[#0A0A0A]",
                                formFieldLabel: "text-xs font-medium text-white/80 uppercase tracking-wider",
                                formFieldInput: "bg-transparent border border-white/20 text-white placeholder-white/30 focus:ring-0 focus:border-white transition-colors rounded-lg bg-black/50 py-2",
                                formButtonPrimary: "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-[#0A0A0A] bg-[#FAFAFA] hover:bg-white/90 transition-all duration-200",
                                footerActionText: "text-white/60",
                                footerActionLink: "text-white hover:text-white font-medium",
                                identityPreviewText: "text-white",
                                identityPreviewEditButton: "text-white/60 hover:text-white",
                                formFieldSuccessText: "text-white",
                                formFieldWarningText: "text-white",
                                formFieldErrorText: "text-red-400",
                                alertText: "text-white"
                            },
                        }}
                    />
                </div>
            </div>

            <Link href="/" className="absolute top-6 left-6 lg:hidden z-50 hover:opacity-80 transition-opacity">
                <span className="font-display font-bold text-lg tracking-tight text-white">Zebra.ai</span>
            </Link>
        </div>
    );
}
