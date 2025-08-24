import { NextApiRequest, NextApiResponse } from 'next';
// import { dbHelpers } from '../../../lib/seo-audit/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing audit ID parameter' });
    }

    // Return a simple response since we're not using database
    return res.status(200).json({
      status: "done",
      message: "Audit was processed inline and results were returned immediately",
      note: "Check the original API response for the audit results"
    });
  } catch (error) {
    console.error('Get audit result error:', error);

    return res.status(500).json({
      error: 'Failed to get audit result',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
