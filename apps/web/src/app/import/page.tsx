'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function LinkedInImportPage() {
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
            console.log('Processing LinkedIn PDF:', file.name);
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
        <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col items-center justify-center p-6 relative">

            {/* Absolute positioning to place back nav if we need it later */}
            <div className="absolute top-6 left-6">
                <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <line x1="19" x2="5" y1="12" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Header Section */}
            <header className="text-center mb-12 flex flex-col items-center gap-4" data-purpose="page-header">
                <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white">
                    Import LinkedIn Profile
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                    Drop your exported PDF here. Our AI will parse and rebuild your career timeline instantly.
                </p>
            </header>

            {/* Main Upload Area */}
            <main className="w-full max-w-3xl" data-purpose="upload-container">
                {/* Drag & Drop Zone */}
                <div
                    className={`relative group aspect-[21/9] w-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer 
                        ${isDragging ? 'bg-white/[0.08] border-white/60 scale-[1.02]' : 'border-white/20 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/50 hover:scale-[1.02]'}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    data-purpose="interactive-drop-zone"
                >
                    {/* Lucide-style FileDown Icon */}
                    <div className="mb-6 text-white/50 group-hover:text-white/80 transition-colors duration-300">
                        <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                    </div>

                    {/* Instruction Text */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-white/80 text-xl font-medium tracking-tight">
                            Drag &amp; drop your LinkedIn PDF here
                        </p>
                        <span className="text-white/40 text-sm font-light uppercase tracking-widest">or</span>
                        <button
                            className="mt-2 bg-white/10 border border-white/10 hover:bg-white/20 px-8 py-3 rounded-xl text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Avoid double click triggers
                                triggerFileInput();
                            }}
                        >
                            Browse Files
                        </button>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        accept=".pdf"
                        className="hidden"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Additional Info / Help */}
                <footer className="mt-8 text-center" data-purpose="upload-footer">
                    <p className="text-white/30 text-sm">
                        Need help finding your PDF? <a className="text-white/50 hover:text-white underline underline-offset-4 transition-colors" href="#">Follow this guide</a>
                    </p>
                </footer>
            </main>
        </div>
    );
}
