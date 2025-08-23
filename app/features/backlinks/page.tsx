import BrandContainer from '../../../components/brand/BrandContainer';

export default function AccessibilityAnalysis() {
	return (
		<BrandContainer className="py-16 space-y-8">
			<div className="space-y-4">
				<h1 className="text-4xl font-semibold tracking-tight">Accessibility & ARIA Analysis</h1>
				<p className="text-muted-foreground max-w-3xl text-lg">Comprehensive accessibility analysis to ensure your website is inclusive and compliant with WCAG guidelines and ARIA standards.</p>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">WCAG Compliance</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li>• Color contrast ratio validation</li>
						<li>• Keyboard navigation testing</li>
						<li>• Screen reader compatibility</li>
						<li>• Focus management analysis</li>
						<li>• Text alternatives for images</li>
						<li>• Semantic HTML structure</li>
						<li>• Form accessibility validation</li>
						<li>• Multimedia accessibility</li>
					</ul>
				</div>
				
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">ARIA Implementation</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li>• ARIA labels and descriptions</li>
						<li>• ARIA roles and states</li>
						<li>• ARIA landmarks validation</li>
						<li>• ARIA live regions</li>
						<li>• ARIA expanded/collapsed states</li>
						<li>• ARIA required and invalid</li>
						<li>• ARIA hidden and visible</li>
						<li>• ARIA navigation patterns</li>
					</ul>
				</div>
			</div>
			
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Example Accessibility Fix</h2>
				<pre className="rounded-lg border p-4 overflow-auto text-sm bg-gray-50 dark:bg-gray-900">
					<code>{`<!-- Add proper alt text for images -->
<img src="hero-image.jpg" alt="Team collaboration meeting in modern office" />

<!-- Add ARIA labels for interactive elements -->
<button aria-label="Close modal dialog" aria-expanded="false">
  <span aria-hidden="true">×</span>
</button>

<!-- Add proper form labels -->
<label for="email">Email Address</label>
<input type="email" id="email" aria-required="true" />

<!-- Add ARIA landmarks -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none"><a role="menuitem" href="/">Home</a></li>
  </ul>
</nav>

<!-- Add skip links for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>`}</code>
				</pre>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="rounded-lg border p-4 text-center">
					<div className="text-2xl font-bold text-green-600">WCAG 2.1</div>
					<div className="text-sm text-muted-foreground">AA Compliance</div>
				</div>
				<div className="rounded-lg border p-4 text-center">
					<div className="text-2xl font-bold text-blue-600">ARIA</div>
					<div className="text-sm text-muted-foreground">Best Practices</div>
				</div>
				<div className="rounded-lg border p-4 text-center">
					<div className="text-2xl font-bold text-purple-600">Screen Reader</div>
					<div className="text-sm text-muted-foreground">Compatible</div>
				</div>
			</div>
			
			<div className="text-center pt-8">
				<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-6 py-3 bg-blue-600 text-white font-medium">
					Start Accessibility Analysis
				</a>
			</div>
		</BrandContainer>
	);
}


