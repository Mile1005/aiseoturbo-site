import BrandContainer from '../../../components/brand/BrandContainer';
import Link from 'next/link';
import { getAllPostSlugs, getPost } from '../../../lib/blog';

export function generateStaticParams() {
	return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return null;
	return (
		<BrandContainer className="py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
			<article className="prose dark:prose-invert max-w-none">
				<h1>{post.frontmatter.title}</h1>
				<div className="text-sm text-muted-foreground">{new Date(post.frontmatter.date).toLocaleDateString()} • {post.readingTimeMinutes} min read</div>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
				<div className="mt-8 flex gap-3 text-sm">
					<span>Share:</span>
					<a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontmatter.title)}&url=${encodeURIComponent('https://aiseoturbo.com/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer">Twitter</a>
				</div>
			</article>
			<aside className="space-y-3">
				<div className="font-medium">On this page</div>
				<nav className="text-sm space-y-1">
					{post.headings.map((h) => (
						<Link key={h.id} href={`#${h.id}`} className="block opacity-80">
							{h.text}
						</Link>
					))}
				</nav>
			</aside>
		</BrandContainer>
	);
}


