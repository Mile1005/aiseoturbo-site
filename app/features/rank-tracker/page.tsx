import BrandContainer from '../../../components/brand/BrandContainer';

export default function TechnicalAnalysis() {
	return (
		<BrandContainer className="py-16 space-y-8">
			<div className="space-y-4">
				<h1 className="text-4xl font-semibold tracking-tight">Technical SEO Analysis</h1>
				<p className="text-muted-foreground max-w-3xl text-lg">Comprehensive technical SEO analysis including meta tags, schema markup, canonical URLs, and more to ensure your site is properly indexed by search engines.</p>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Technical Checks</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li>• Meta title and description optimization</li>
						<li>• Canonical URL implementation</li>
						<li>• Robots.txt and sitemap validation</li>
						<li>• Schema markup and structured data</li>
						<li>• Open Graph and Twitter Card tags</li>
						<li>• Header tag hierarchy (H1-H6)</li>
						<li>• URL structure and redirects</li>
						<li>• XML sitemap generation</li>
					</ul>
				</div>
				
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Performance Metrics</h2>
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">Core Web Vitals</h3>
							<ul className="text-sm text-muted-foreground space-y-1">
								<li>• Largest Contentful Paint (LCP)</li>
								<li>• Cumulative Layout Shift (CLS)</li>
								<li>• Interaction to Next Paint (INP)</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Mobile Performance</h3>
							<ul className="text-sm text-muted-foreground space-y-1">
								<li>• Mobile page speed analysis</li>
								<li>• Responsive design validation</li>
								<li>• Touch target optimization</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Example Technical Fix</h2>
				<pre className="rounded-lg border p-4 overflow-auto text-sm bg-gray-50 dark:bg-gray-900">
					<code>{`<!-- Optimize meta tags for better search visibility -->
<title>Your Page Title | Brand Name</title>
<meta name="description" content="Compelling description with target keywords (150-160 characters)." />

<!-- Add structured data for rich snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
</script>

<!-- Ensure proper canonical URL -->
<link rel="canonical" href="https://example.com/page" />`}</code>
				</pre>
			</div>
			
			<div className="text-center pt-8">
				<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-6 py-3 bg-blue-600 text-white font-medium">
					Start Technical Analysis
				</a>
			</div>
		</BrandContainer>
	);
}


