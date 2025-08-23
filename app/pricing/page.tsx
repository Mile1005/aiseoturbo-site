import BrandContainer from '../../components/brand/BrandContainer';
import Link from 'next/link';

export default function Pricing() {
	return (
		<BrandContainer className="py-16 space-y-10">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-semibold tracking-tight">Free SEO Audit Tool</h1>
				<p className="text-muted-foreground max-w-2xl mx-auto text-lg">We believe in making advanced SEO and accessibility insights available to everyone. No hidden costs, no premium paywalls.</p>
			</div>
			
			<div className="max-w-2xl mx-auto">
				<div className="rounded-xl border p-8 text-center">
					<div className="text-2xl font-medium mb-2">Completely Free</div>
					<div className="text-5xl font-bold text-blue-600 mb-6">$0</div>
					<div className="text-muted-foreground mb-8">Forever</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
						<div>
							<h3 className="font-semibold mb-3">What&apos;s Included:</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Unlimited SEO audits</li>
								<li>• Comprehensive technical analysis</li>
								<li>• Accessibility and ARIA checks</li>
								<li>• Core Web Vitals analysis</li>
								<li>• Actionable recommendations</li>
								<li>• Code snippets and fixes</li>
								<li>• Export and share reports</li>
								<li>• Mobile-friendly interface</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-3">AI-Powered Features:</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Intelligent issue detection</li>
								<li>• Prioritized fix recommendations</li>
								<li>• Content quality analysis</li>
								<li>• Schema markup validation</li>
								<li>• User experience insights</li>
								<li>• Performance optimization tips</li>
								<li>• SEO best practices guidance</li>
								<li>• Accessibility compliance checks</li>
							</ul>
						</div>
					</div>
					
					<Link href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-8 py-4 bg-blue-600 text-white font-medium text-lg">
						Start Free Audit Now
					</Link>
				</div>
			</div>
			
			<div className="text-center text-muted-foreground">
				<p>No credit card required • No hidden fees • No limitations</p>
			</div>
		</BrandContainer>
	);
}


