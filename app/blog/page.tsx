import Link from 'next/link';
import BrandContainer from '../../components/brand/BrandContainer';
import { getAllPostsMeta, getFeaturedPosts } from '../../lib/blog';

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ q?: string; tag?: string }> }) {
	const { q: rawQ, tag } = await searchParams;
	const all = getAllPostsMeta();
	const featured = getFeaturedPosts();
	const q = (rawQ ?? '').toLowerCase();
	
	const posts = all.filter((p) => {
		const matchQ = q ? p.frontmatter.title.toLowerCase().includes(q) || (p.frontmatter.description ?? '').toLowerCase().includes(q) : true;
		const matchTag = tag ? (p.frontmatter.tags ?? []).includes(tag) : true;
		return matchQ && matchTag;
	});

	const tags = Array.from(new Set(all.flatMap((p) => p.frontmatter.tags ?? [])));

	return (
		<BrandContainer className="py-16 space-y-12">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold tracking-tight">Blog</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Insights on SEO automation, AI-powered tools, and digital marketing strategies
				</p>
			</div>

			{/* Featured Posts */}
			{featured.length > 0 && (
				<section className="space-y-6">
					<h2 className="text-2xl font-semibold">Featured Posts</h2>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{featured.map((post) => (
							<article key={post.slug} className="group">
								<Link href={`/blog/${post.slug}`} className="block space-y-3">
									{post.frontmatter.image && (
										<div className="aspect-video bg-muted rounded-lg overflow-hidden">
											<img 
												src={post.frontmatter.image} 
												alt={post.frontmatter.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
									)}
									<div className="space-y-2">
										<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
											{post.frontmatter.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-2">
											{post.frontmatter.description}
										</p>
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											<span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
											<span>•</span>
											<span>{post.readingTimeMinutes} min read</span>
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</section>
			)}

			{/* Search and Filter */}
			<section className="space-y-6">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1">
						<input 
							name="q" 
							placeholder="Search articles..." 
							className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
							defaultValue={q} 
						/>
					</div>
					<select 
						name="tag" 
						className="rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						defaultValue={tag ?? ''}
					>
						<option value="">All tags</option>
						{tags.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
					<button 
						type="submit" 
						className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						Filter
					</button>
				</div>
				
				{/* Results count */}
				<div className="text-sm text-muted-foreground">
					{posts.length} article{posts.length !== 1 ? 's' : ''} found
					{tag && ` in "${tag}"`}
					{q && ` for "${q}"`}
				</div>
			</section>

			{/* All Posts */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">All Articles</h2>
				<div className="space-y-6">
					{posts.map((post) => (
						<article key={post.slug} className="group border-b border-border pb-6 last:border-b-0">
							<Link href={`/blog/${post.slug}`} className="block space-y-3">
								<div className="space-y-2">
									<h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
										{post.frontmatter.title}
									</h3>
									<p className="text-muted-foreground line-clamp-2">
										{post.frontmatter.description}
									</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
										<span>•</span>
										<span>{post.readingTimeMinutes} min read</span>
										{post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
											<>
												<span>•</span>
												<div className="flex gap-2">
													{post.frontmatter.tags.map((tag) => (
														<Link
															key={tag}
															href={`/blog?tag=${encodeURIComponent(tag)}`}
															onClick={(e) => e.stopPropagation()}
															className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors"
														>
															{tag}
														</Link>
													))}
												</div>
											</>
										)}
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>
				
				{posts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground">No articles found. Try adjusting your search or filters.</p>
					</div>
				)}
			</section>
		</BrandContainer>
	);
}


