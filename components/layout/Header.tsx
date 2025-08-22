import Link from 'next/link';

export default function Header() {
	return (
		<header className="sticky top-0 z-40 bg-white/70 dark:bg-zinc-900/60 backdrop-blur border-b border-white/20 dark:border-white/10">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
				<Link href="/" className="font-semibold tracking-tight">AISEO Turbo</Link>
				<nav className="hidden md:flex gap-6 text-sm">
					<Link href="/features">Features</Link>
					<Link href="/pricing">Pricing</Link>
					<Link href="/blog">Blog</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</nav>
				<div className="flex items-center gap-3">
					<a href="https://app.aiseoturbo.com" className="inline-flex items-center rounded-full px-4 py-2 bg-blue-600 text-white text-sm">
						Start Free Audit
					</a>
				</div>
			</div>
		</header>
	);
}


