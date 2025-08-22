"use client";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Sparkline({ data = [] as { v: number }[] }: { data?: { v: number }[] }) {
	const series = data.length ? data : Array.from({ length: 24 }, (_, i) => ({ v: Math.max(0, Math.sin(i / 3) * 10 + 20 + (Math.random() * 4 - 2)) }));
	return (
		<div className="h-12 w-40">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={series} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
					<Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}


