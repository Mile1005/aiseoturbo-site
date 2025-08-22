import type React from 'react';
import BrandContainer from './BrandContainer';

export default function SectionShell({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
	return (
		<section id={id} className={`rounded-section bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md ${className}`}>
			<BrandContainer className="py-16 sm:py-20">{children}</BrandContainer>
		</section>
	);
}


