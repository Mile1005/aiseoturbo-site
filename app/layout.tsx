export const metadata = {
	title: 'AISEO Turbo',
	description: 'Premium SEO automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<link rel="stylesheet" href="/app/globals.css" />
				{children}
			</body>
		</html>
	);
}


