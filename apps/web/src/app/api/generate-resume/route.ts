import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || '',
});
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Set max duration to 60s for Vercel

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, targetRole } = body;

        if (!firstName || !lastName || !targetRole) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const prompt = `
You are an expert LaTeX resume generator.
Create a professional, modern, and ATS-friendly resume in LaTeX for:
Name: ${firstName} ${lastName}
Target Role: ${targetRole}

Requirements:
- Output ONLY valid, compilable LaTeX code.
- Do not use any markdown formatting like \`\`\`latex.
- Make it a single column, clean design.
- Include sections for Summary, Experience, Education, and Skills. Fill it with professional placeholder content suitable for the target role.
- Keep the design minimal and sleek, optimized for ATS parsers (no complex tables or graphics).
- Ensure documentclass is 'article'.
- Use 'geometry' package for margins.
`;

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            prompt,
        });

        // Strip any markdown fences strictly
        let latex = text.trim();
        if (latex.startsWith('\`\`\`latex')) {
            latex = latex.replace(/^\`\`\`latex\n/, '');
        }
        if (latex.startsWith('\`\`\`')) {
            latex = latex.replace(/^\`\`\`\n/, '');
        }
        if (latex.endsWith('\`\`\`')) {
            latex = latex.replace(/\n\`\`\`$/, '');
        }

        return NextResponse.json({ latex });
    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
    }
}
