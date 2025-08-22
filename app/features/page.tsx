import Link from 'next/link';
import BrandContainer from '../../components/brand/BrandContainer';
import SectionHeading from '../../components/brand/SectionHeading';

export default function FeaturesIndex() {
	const features = [
		{ href: '/features/seo-audit', title: 'SEO Audit', blurb: 'Find issues and get prioritized fixes.' },
		{ href: '/features/rank-tracker', title: 'Rank Tracking', blurb: 'Track daily positions and trends.' },
		{ href: '/features/backlinks', title: 'Backlink Snapshot', blurb: 'See referring domains and growth.' },
		{ href: '#', title: 'Automation (Soon)', blurb: 'Autofix common issues safely.' },
	];
	return (
		<BrandContainer className="py-16">
			<SectionHeading title="Features" subcopy="Everything you need to grow organic traffic." />
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{features.map((f) => (
					<Link key={f.title} href={f.href} className="rounded-xl border p-5 block">
						<div className="font-medium">{f.title}</div>
						<p className="text-sm text-muted-foreground">{f.blurb}</p>
					</Link>
				))}
			</div>
		</BrandContainer>
	);
}


