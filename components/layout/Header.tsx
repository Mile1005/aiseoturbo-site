import Link from 'next/link';

export default function Header() {
	return (
		<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
						<span className="text-white font-bold text-lg">A</span>
					</div>
					<span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
						AISEO Turbo
					</span>
				</Link>
				<nav className="hidden md:flex gap-8 text-sm font-medium">
					<Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Features
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Pricing
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Blog
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						About
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Contact
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<a href="https://app.aiseoturbo.com/signin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
						Sign in
					</a>
					<a href="https://app.aiseoturbo.com/signup" className="inline-flex items-center rounded-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
						Try 7 days for free
					</a>
				</div>
			</div>
		</header>
	);
}


