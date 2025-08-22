import BrandContainer from '../../components/brand/BrandContainer';
import Link from 'next/link';

export default function Pricing() {
	const plans = [
		{ name: 'Free', price: '$0', query: 'free', bullets: ['Limited audits', 'Basic report'] },
		{ name: 'Pro', price: '$49', query: 'pro', bullets: ['Scheduled audits', 'Exports', 'PSI/GSC integration'] },
		{ name: 'Agency', price: '$199', query: 'agency', bullets: ['Multi-site', 'White-label'] },
	];
	return (
		<BrandContainer className="py-16 space-y-10">
			<h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{plans.map((p) => (
					<div key={p.name} className="rounded-xl border p-6">
						<div className="text-lg font-medium">{p.name}</div>
						<div className="text-3xl font-semibold mt-2">{p.price}</div>
						<ul className="mt-4 space-y-1 text-sm text-muted-foreground">
							{p.bullets.map((b) => (
								<li key={b}>• {b}</li>
							))}
						</ul>
						<Link href={`https://app.aiseoturbo.com/signup?plan=${p.query}`} className="mt-6 inline-flex items-center rounded-full px-4 py-2 bg-blue-600 text-white">
							Choose {p.name}
						</Link>
					</div>
				))}
			</div>
		</BrandContainer>
	);
}


