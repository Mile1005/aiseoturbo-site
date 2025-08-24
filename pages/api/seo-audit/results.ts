import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '../../../lib/seo-audit/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing audit ID parameter' });
    }

    // Get run status from database
    const run = await dbHelpers.getRun(id);

    if (!run) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    const response: {
      id: string;
      url: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      result?: unknown;
      error?: string;
    } = {
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

    return res.status(200).json(response);
  } catch (error) {
    console.error('Get audit result error:', error);

    return res.status(500).json({
      error: 'Failed to get audit result',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
