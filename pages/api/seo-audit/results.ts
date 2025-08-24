import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers } from '../../../lib/seo-audit/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing audit ID parameter' }, { status: 400 });
    }

    // Get run status from database
    const run = await dbHelpers.getRun(id);

    if (!run) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    const response: any = {
      id: run.id,
      url: run.pageUrl,
      status: run.status,
      createdAt: run.createdAt,
      updatedAt: run.updatedAt,
    };

    // If audit is ready, get the result
    if (run.status === 'ready') {
      const audit = await dbHelpers.getAuditByRunId(id);
      if (audit) {
        response.result = audit.json;
      }
    } else if (run.status === 'failed') {
      response.error = 'Audit failed';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get audit result error:', error);

    return NextResponse.json(
      {
        error: 'Failed to get audit result',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
