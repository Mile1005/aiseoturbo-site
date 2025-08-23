import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const rise: Variants = {
	hidden: { opacity: 0, y: 32 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } };

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


