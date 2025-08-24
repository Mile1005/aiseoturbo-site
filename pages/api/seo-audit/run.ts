import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addAuditJob } from '../../../lib/seo-audit/queue';
import { dbHelpers } from '../../../lib/seo-audit/db';

// Input validation schema
const StartAuditRequest = z.object({
  url: z.string().url("Invalid URL format"),
  keyword: z.string().optional(),
  options: z.object({
    technical: z.boolean().default(true),
    accessibility: z.boolean().default(true),
    performance: z.boolean().default(true),
    content: z.boolean().default(true),
  }).default({
    technical: true,
    accessibility: true,
    performance: true,
    content: true,
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, keyword, options } = StartAuditRequest.parse(body);

    // Create audit record in database
    const auditRun = await dbHelpers.createRun({
      id: crypto.randomUUID(),
      pageUrl: url,
      targetKeyword: keyword || undefined,
      email: undefined,
      status: 'queued',
    });

    // Queue the audit job
    await addAuditJob({
      runId: auditRun.id,
      pageUrl: url,
      targetKeyword: keyword,
    });

    const response = {
      auditId: auditRun.id,
      status: 'queued',
      message: `SEO audit started for ${url}`,
      estimatedTime: '30-60 seconds',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Start audit error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to start audit',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
