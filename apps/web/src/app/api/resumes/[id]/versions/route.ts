import { NextResponse } from 'next/server';
import { db, resumeVersions, analysisResults } from '@zebra/db';

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { content, jobTargetId } = await request.json();
        const { id: resumeId } = await context.params;

        if (!content) {
            return NextResponse.json({ error: 'Missing content' }, { status: 400 });
        }

        // 1. Insert resume_versions
        const [newVersion] = await db.insert(resumeVersions).values({
            resumeId,
            content,
        }).returning({ versionId: resumeVersions.id });

        if (!newVersion) throw new Error("Failed to insert resume_version");

        // 2. Insert analysis_results with status 'pending'
        const [newAnalysis] = await db.insert(analysisResults).values({
            resumeVersionId: newVersion.versionId,
            jobTargetId: jobTargetId || null,
            status: 'pending',
        }).returning({ analysisResultId: analysisResults.id });

        if (!newAnalysis) throw new Error("Failed to insert analysis_result");

        // 3. Attempt POST to FastApi worker with retry
        const correlationId = crypto.randomUUID();
        console.log(`[CorrelationId=${correlationId}] Enqueuing analysis job for analysisResultId=${newAnalysis.analysisResultId}`);

        let enqueueSuccess = false;
        let lastError = null;

        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const response = await fetch('http://localhost:8000/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        analysisResultId: newAnalysis.analysisResultId,
                        correlationId
                    }),
                });

                if (!response.ok) {
                    console.warn(`[CorrelationId=${correlationId}] FastAPI worker returned non-200 status: ${response.status} on attempt ${attempt}`);
                    lastError = new Error(`HTTP ${response.status}`);
                } else {
                    console.log(`[CorrelationId=${correlationId}] Successfully enqueued analysis job on attempt ${attempt}`);
                    enqueueSuccess = true;
                    break;
                }
            } catch (fetchError) {
                console.warn(`[CorrelationId=${correlationId}] Failed to enqueue analysis job on attempt ${attempt}:`, fetchError);
                lastError = fetchError;
            }

            if (attempt === 1) {
                // Wait briefly before retry
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        if (!enqueueSuccess) {
            console.error(`[CorrelationId=${correlationId}] Final failure to enqueue analysis job after 2 attempts. Error:`, lastError);
        }

        return NextResponse.json({
            versionId: newVersion.versionId,
            analysisResultId: newAnalysis.analysisResultId,
            status: 'pending'
        });
    } catch (error) {
        console.error('Error creating resume version:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
