import Link from 'next/link';

export default function BlogIndex() {
	const posts = [{ slug: 'hello-world', title: 'Hello World' }];

	return (
		<main style={{ padding: 40 }}>
			<h1>Blog</h1>
			<ul>
				{posts.map((p) => (
					<li key={p.slug}>
						<Link href={`/blog/${p.slug}`}>{p.title}</Link>
					</li>
				))}
			</ul>
		</main>
	);
}


