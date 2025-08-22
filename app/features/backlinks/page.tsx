import BrandContainer from '../../../components/brand/BrandContainer';

export default function Backlinks() {
	return (
		<BrandContainer className="py-16 space-y-6">
			<h1 className="text-3xl font-semibold tracking-tight">Backlink Snapshot</h1>
			<p className="text-muted-foreground max-w-2xl">See referring domains, growth trends, and opportunities.</p>
			<div className="flex gap-3">
				<div className="rounded-lg border px-4 py-2">Referring domains: 142</div>
				<div className="rounded-lg border px-4 py-2">New last 30d: 24</div>
			</div>
		</BrandContainer>
	);
}


