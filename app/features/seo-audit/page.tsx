import BrandContainer from '../../../components/brand/BrandContainer';

export default function SeoAudit() {
	return (
		<BrandContainer className="py-16 space-y-6">
			<h1 className="text-3xl font-semibold tracking-tight">SEO Audit</h1>
			<p className="text-muted-foreground max-w-2xl">Find issues, get prioritized fixes, and ship improvements quickly.</p>
			<pre className="rounded-lg border p-4 overflow-auto text-sm"><code>{`<!-- Example fix snippet -->\n<meta name="description" content="Compelling summary for this page." />\n<link rel="canonical" href="https://example.com/page" />`}</code></pre>
		</BrandContainer>
	);
}


