export default function SectionHeading({ eyebrow, title, subcopy }: { eyebrow?: string; title: string; subcopy?: string }) {
	return (
		<div className="text-center space-y-2">
			{eyebrow && <div className="text-sm uppercase tracking-widest text-sky-500">{eyebrow}</div>}
			<h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
			{subcopy && <p className="text-muted-foreground max-w-2xl mx-auto">{subcopy}</p>}
		</div>
	);
}


