import { NextResponse } from 'next/server';

export const maxDuration = 60; // Set max duration to 60s for Vercel

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { latex } = body;

        if (!latex) {
            return NextResponse.json({ error: 'Missing latex source' }, { status: 400 });
        }

        // We use a public LaTeX compilation service.
        const formData = new FormData();
        formData.append('text', latex);
        formData.append('command', 'pdflatex');

        const res = await fetch('https://latexonline.cc/compile', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('LaTeX Compile Error:', res.status, errorText);
            return NextResponse.json({ error: 'Failed to compile LaTeX' }, { status: res.status });
        }

        const pdfBuffer = await res.arrayBuffer();

        // Convert the PDF ArrayBuffer to a base64 string
        const base64Pdf = Buffer.from(pdfBuffer).toString('base64');

        return NextResponse.json({ pdf: base64Pdf });
    } catch (error) {
        console.error('Proxy Compile Error:', error);
        return NextResponse.json({ error: 'Internal server error compiling LaTeX' }, { status: 500 });
    }
}
