import { NextRequest, NextResponse } from 'next/server';

const SEO_AUDIT_BASE_URL = process.env.SEO_AUDIT_BASE_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { url, competitors } = body;

		if (!url || !competitors || !Array.isArray(competitors)) {
			return NextResponse.json(
				{ error: 'Invalid request. URL and competitors array are required.' },
				{ status: 400 }
			);
		}

		// Call the seo-audit backend competitor analysis endpoint
		const response = await fetch(`${SEO_AUDIT_BASE_URL}/api/audit/competitor-analysis`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url,
				competitors,
			}),
		});

		if (!response.ok) {
			throw new Error(`Backend responded with status: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);

	} catch (error) {
		console.error('Competitor analysis error:', error);
		return NextResponse.json(
			{ error: 'Failed to analyze competitors. Please try again.' },
			{ status: 500 }
		);
	}
}
