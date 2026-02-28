import { NextResponse } from 'next/server';
import { db, analysisResults } from '@zebra/db';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    context: { params: Promise<{ analysisId: string }> }
) {
    try {
        const { analysisId } = await context.params;

        // Fetch analysis row from DB
        const result = await db.query.analysisResults.findFirst({
            where: eq(analysisResults.id, analysisId)
        });

        if (!result) {
            return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
        }

        // Fetch queue length from FastAPI worker
        let queueLength = null;
        try {
            const workerResponse = await fetch('http://localhost:8000/queue-status');
            if (workerResponse.ok) {
                const workerData = await workerResponse.json();
                queueLength = workerData.queued_jobs;
            } else {
                console.warn(`Worker queue-status endpoint returned non-200: ${workerResponse.status}`);
            }
        } catch (err) {
            console.warn('Failed to fetch queue-status from worker:', err);
        }

        return NextResponse.json({
            ...result,
            queue_length: queueLength
        });

    } catch (error) {
        console.error('Error fetching debug info:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
