import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get('title') ?? 'AISEO Turbo';

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
					color: 'white',
					fontSize: 72,
					fontWeight: 700,
					letterSpacing: -1,
					padding: 60,
				}}
			>
				{title}
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}


