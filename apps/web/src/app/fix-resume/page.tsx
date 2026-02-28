'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function FixResumePage() {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFiles(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFiles(file);
        }
    };

    const handleFiles = (file: File) => {
        if (file.type === 'application/pdf') {
            console.log('Processing Fix Old Resume PDF:', file.name);
            // TODO: Route to backend processing logic here
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="bg-zebraBlack text-white min-h-screen flex flex-col items-center justify-center p-6 font-sans relative">
            <style jsx global>{`
                @keyframes glow {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.4)); }
                    50% { filter: drop-shadow(0 0 25px rgba(255,255,255,0.9)); }
                }
                .animate-glow {
                    animation: glow 3s ease-in-out infinite;
                }
            `}</style>

            {/* Absolute positioning back nav */}
            <div className="absolute top-6 left-6 z-50">
                <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <line x1="19" x2="5" y1="12" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Header Section */}
            <header className="text-center z-10" data-purpose="page-header">
                <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight font-display">
                    Fix Old Resume
                </h1>
                <p className="text-white/60 text-lg max-w-xl text-center leading-relaxed">
                    Upload your unpolished PDF. Our AI parses the data, fixes the formatting, and rewrites your impact.
                </p>
            </header>

            {/* Main Layout containing both sections */}
            <section className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 w-full max-w-5xl" data-purpose="workflow-container">

                {/* Upload Area */}
                <div
                    className={`aspect-[1/1.4] w-72 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden relative
                        ${isDragging ? 'bg-white/[0.08] border-white/60 scale-[1.02]' : 'border-white/20 bg-white/[0.02] hover:border-white/50'}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    data-purpose="upload-dropzone"
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {/* File Text Icon */}
                        <svg className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" x2="8" y1="13" y2="13"></line>
                            <line x1="16" x2="8" y1="17" y2="17"></line>
                            <line x1="10" x2="8" y1="9" y2="9"></line>
                        </svg>

                        <span className="text-white/50 group-hover:text-white text-sm font-light tracking-wide transition-colors">
                            Drop old PDF here
                        </span>
                    </div>
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Hidden File Input */}
                    <input
                        accept=".pdf"
                        className="hidden"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Transformation Icon */}
                <div className="flex items-center justify-center" data-purpose="transformation-indicator">
                    <div className="animate-glow text-white">
                        {/* Wand2 Icon */}
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                </div>

                {/* Output Preview */}
                <div className="aspect-[1/1.4] w-72 rounded-xl border border-white/20 bg-transparent flex flex-col overflow-hidden relative shadow-2xl shadow-white/5" data-purpose="output-preview">
                    {/* Simulated Document Lines */}
                    <div className="absolute inset-0 flex flex-col p-6 space-y-4 opacity-20" data-purpose="mock-document-structure">
                        {/* Header block */}
                        <div className="h-2 w-1/3 bg-white/40 mb-2 rounded-full"></div>
                        <div className="h-1 w-full bg-white/20 rounded-full"></div>

                        {/* Body content (simulated rows) */}
                        <div className="flex-1 divide-y divide-white/10">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className="py-2 h-4"></div>
                            ))}
                        </div>
                    </div>

                    {/* Central Status Label */}
                    <div className="m-auto z-20 px-4 py-2 bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-sm">
                        <p className="text-white/80 font-mono text-xs tracking-widest uppercase">
                            ATS Optimized Output
                        </p>
                    </div>
                </div>

            </section>

            {/* Footer Details */}
            <footer className="mt-20 text-white/20 text-[10px] tracking-[0.2em] uppercase">
                Secure • Monochrome • AI-Powered
            </footer>

        </div>
    );
}
