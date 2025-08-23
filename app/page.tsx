import SectionShell from '../components/brand/SectionShell';
import BrandContainer from '../components/brand/BrandContainer';
import SectionHeading from '../components/brand/SectionHeading';
import Sparkline from '../components/charts/Sparkline';

export default function HomePage() {
	return (
		<>
			<SectionShell className="mt-8">
				<BrandContainer className="text-center space-y-4">
					<h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">AI-Powered SEO Audit Tool</h1>
					<p className="text-muted-foreground max-w-2xl mx-auto">Get comprehensive SEO analysis with actionable insights, technical recommendations, and accessibility checks powered by artificial intelligence.</p>
					<div className="flex items-center justify-center gap-3">
						<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-5 py-3 bg-blue-600 text-white">Start Free Audit</a>
						<a href="#features" className="inline-flex items-center rounded-full px-5 py-3 border">See Features</a>
					</div>
				</BrandContainer>
			</SectionShell>

			<BrandContainer className="py-10">
				<div className="opacity-70 text-sm">Trusted by SEO professionals worldwide</div>
				<div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60">
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
				</div>
			</BrandContainer>

			<BrandContainer className="py-16" id="features">
				<SectionHeading title="Comprehensive SEO Analysis" subcopy="From technical SEO to content quality—we analyze every aspect that impacts your search rankings." />
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="rounded-xl border p-5">
						<div className="font-medium">Technical SEO</div>
						<p className="text-sm text-muted-foreground">Meta tags, canonical URLs, robots.txt, sitemap, and schema markup analysis.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Content Quality</div>
						<p className="text-sm text-muted-foreground">Readability, word count, keyword usage, and content structure evaluation.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Accessibility (ARIA)</div>
						<p className="text-sm text-muted-foreground">WCAG compliance, ARIA attributes, alt text, and keyboard navigation.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Core Web Vitals</div>
						<p className="text-sm text-muted-foreground">Performance metrics: LCP, CLS, INP, and mobile speed analysis.</p>
					</div>
				</div>
			</BrandContainer>

			<BrandContainer className="py-16">
				<SectionHeading title="AI-Powered Insights" subcopy="Get intelligent recommendations and actionable fixes for your SEO issues." />
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="rounded-xl border p-5">
						<div className="font-medium">Actionable Recommendations</div>
						<p className="text-sm text-muted-foreground">Prioritized fixes with code snippets and step-by-step instructions.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Mobile Friendliness</div>
						<p className="text-sm text-muted-foreground">Responsive design, viewport settings, and mobile usability checks.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">User Experience</div>
						<p className="text-sm text-muted-foreground">Navigation, internal links, layout, and engagement signal analysis.</p>
					</div>
				</div>
			</BrandContainer>

			<BrandContainer className="py-16">
				<SectionHeading title="Performance Tracking" subcopy="Monitor your SEO improvements with detailed analytics and trend analysis." />
				<div className="mt-6"><Sparkline /></div>
			</BrandContainer>

			<BrandContainer className="py-16">
				<SectionHeading title="Why Choose AISEO Turbo?" subcopy="Advanced features that set us apart from traditional SEO tools." />
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div className="rounded-xl border p-5">
						<div className="font-medium">AI-Driven Analysis</div>
						<p className="text-sm text-muted-foreground">Powered by artificial intelligence for deeper insights and more accurate recommendations.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Free & Unlimited</div>
						<p className="text-sm text-muted-foreground">Run unlimited audits for free. No hidden costs or premium paywalls.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Export & Share</div>
						<p className="text-sm text-muted-foreground">Download reports, share with your team, and track improvements over time.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Modern Interface</div>
						<p className="text-sm text-muted-foreground">Clean, mobile-friendly design that works seamlessly across all devices.</p>
					</div>
				</div>
			</BrandContainer>
		</>
	);
}


