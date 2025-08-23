import BrandContainer from '../../../components/brand/BrandContainer';

export default function SeoAudit() {
	return (
		<BrandContainer className="py-16 space-y-8">
			<div className="space-y-4">
				<h1 className="text-4xl font-semibold tracking-tight">AI-Powered SEO Audit</h1>
				<p className="text-muted-foreground max-w-3xl text-lg">Get comprehensive SEO analysis with actionable insights, technical recommendations, and accessibility checks powered by artificial intelligence.</p>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">What We Analyze</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li>• Technical SEO (meta tags, canonical URLs, robots.txt)</li>
						<li>• Content quality and structure</li>
						<li>• Accessibility and ARIA compliance</li>
						<li>• Core Web Vitals performance</li>
						<li>• Mobile friendliness</li>
						<li>• Schema markup and structured data</li>
						<li>• Internal linking structure</li>
						<li>• User experience factors</li>
					</ul>
				</div>
				
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Key Benefits</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li>• AI-powered analysis for deeper insights</li>
						<li>• Prioritized actionable recommendations</li>
						<li>• Code snippets and step-by-step fixes</li>
						<li>• Free and unlimited audits</li>
						<li>• Export and share reports</li>
						<li>• Modern, mobile-friendly interface</li>
					</ul>
				</div>
			</div>
			
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Example Fix</h2>
				<pre className="rounded-lg border p-4 overflow-auto text-sm bg-gray-50 dark:bg-gray-900">
					<code>{`<!-- Missing meta description - Add this to your <head> -->
<meta name="description" content="Compelling summary for this page that includes your target keywords." />

<!-- Missing canonical URL - Add this to your <head> -->
<link rel="canonical" href="https://example.com/page" />

<!-- Missing Open Graph tags - Add these for better social sharing -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://example.com/image.jpg" />`}</code>
				</pre>
			</div>
			
			<div className="text-center pt-8">
				<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-6 py-3 bg-blue-600 text-white font-medium">
					Start Free SEO Audit
				</a>
			</div>
		</BrandContainer>
	);
}


