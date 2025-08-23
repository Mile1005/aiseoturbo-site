import Link from 'next/link';
import BrandContainer from '../../components/brand/BrandContainer';
import SectionHeading from '../../components/brand/SectionHeading';

export default function FeaturesIndex() {
	const features = [
		{ href: '/features/seo-audit', title: 'SEO Audit', blurb: 'Comprehensive AI-powered analysis with actionable insights.' },
		{ href: '/features/rank-tracker', title: 'Technical Analysis', blurb: 'Meta tags, schema markup, and technical SEO checks.' },
		{ href: '/features/backlinks', title: 'Accessibility (ARIA)', blurb: 'WCAG compliance and accessibility recommendations.' },
		{ href: '#', title: 'Performance Metrics', blurb: 'Core Web Vitals and mobile speed analysis.' },
	];
	return (
		<BrandContainer className="py-16">
			<SectionHeading title="Features" subcopy="AI-powered SEO analysis for better search rankings." />
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


