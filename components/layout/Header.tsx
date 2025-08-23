import Link from 'next/link';

export default function Header() {
	return (
		<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-lg">A</span>
					</div>
					<span className="font-bold text-xl text-gray-900 tracking-tight">
						AISEO Turbo
					</span>
				</Link>
				<nav className="hidden md:flex gap-8 text-sm font-medium">
					<Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
					<Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</Link>
					<Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
					<Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
					<Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
				</nav>
				<div className="flex items-center gap-4">
					<a href="https://app.aiseoturbo.com/signin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
						Sign in
					</a>
					<a href="https://app.aiseoturbo.com/signup" className="inline-flex items-center rounded-full px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
						Try 7 days for free
					</a>
				</div>
			</div>
		</header>
	);
}


