import SectionShell from '../components/brand/SectionShell';
import BrandContainer from '../components/brand/BrandContainer';
import SectionHeading from '../components/brand/SectionHeading';
import Sparkline from '../components/charts/Sparkline';

export default function HomePage() {
	return (
		<>
			<SectionShell className="mt-8">
				<BrandContainer className="text-center space-y-4">
					<h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">SEO that fixes itself—meet AISEO Turbo</h1>
					<p className="text-muted-foreground max-w-2xl mx-auto">Actionable audits, daily rank tracking, backlink snapshots, and automation to keep your site winning.</p>
					<div className="flex items-center justify-center gap-3">
						<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-5 py-3 bg-blue-600 text-white">Start Free Audit</a>
						<a href="#demo" className="inline-flex items-center rounded-full px-5 py-3 border">See Live Demo</a>
					</div>
				</BrandContainer>
			</SectionShell>

			<BrandContainer className="py-10">
				<div className="opacity-70 text-sm">Trusted by</div>
				<div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60">
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
					<div className="h-8 bg-black/10 dark:bg-white/10 rounded" />
				</div>
			</BrandContainer>

			<BrandContainer className="py-16">
				<SectionHeading title="Everything you need to grow" subcopy="From quick wins to deep dives—get a clear path to results." />
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="rounded-xl border p-5">
						<div className="font-medium">Actionable audits</div>
						<p className="text-sm text-muted-foreground">Clear issues and prioritized fixes.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Daily rank tracking</div>
						<p className="text-sm text-muted-foreground">Track keywords and trends.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">Backlink snapshots</div>
						<p className="text-sm text-muted-foreground">Referring domains, growth.</p>
					</div>
					<div className="rounded-xl border p-5">
						<div className="font-medium">One‑click fixes (soon)</div>
						<p className="text-sm text-muted-foreground">Autofix common issues.</p>
					</div>
				</div>
			</BrandContainer>

			<BrandContainer className="py-16">
				<SectionHeading title="Rank trend" subcopy="Keep a pulse on movements with sparklines." />
				<div className="mt-6"><Sparkline /></div>
			</BrandContainer>
		</>
	);
}


