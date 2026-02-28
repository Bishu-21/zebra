import { NextResponse } from 'next/server';
import { db, resumes } from '@zebra/db';

export async function POST(request: Request) {
    try {
        const { userId, title } = await request.json();

        if (!userId || !title) {
            return NextResponse.json({ error: 'Missing userId or title' }, { status: 400 });
        }

        const [newResume] = await db.insert(resumes).values({
            userId,
            title,
        }).returning({ resumeId: resumes.id });

        return NextResponse.json(newResume);
    } catch (error) {
        console.error('Error creating resume:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
