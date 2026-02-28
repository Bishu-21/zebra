import { NextResponse } from 'next/server';
import { db, analysisResults } from '@zebra/db';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: analysisId } = await context.params;

        if (!analysisId) {
            return NextResponse.json({ error: 'Missing analysis id' }, { status: 400 });
        }

        const result = await db.query.analysisResults.findFirst({
            where: eq(analysisResults.id, analysisId),
        });

        if (!result) {
            return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching analysis result:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
