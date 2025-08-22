import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';
import type { Root, Heading, Text } from 'mdast';

export type BlogFrontmatter = {
	title: string;
	description?: string;
	date: string;
	author?: string;
	tags?: string[];
	image?: string;
	featured?: boolean;
};

export type BlogPost = {
	slug: string;
	frontmatter: BlogFrontmatter;
	readingTimeMinutes: number;
	headings: { depth: number; text: string; id: string }[];
	html: string;
};

// Use the blog directory as configured in contentlayer
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPostSlugs(): string[] {
	if (!fs.existsSync(CONTENT_DIR)) return [];
	return fs
		.readdirSync(CONTENT_DIR)
		.filter((f) => f.endsWith('.mdx'))
		.map((f) => f.replace(/\.mdx$/i, ''));
}

export function getAllPostsMeta(): Array<{ slug: string; frontmatter: BlogFrontmatter; readingTimeMinutes: number }>{
	const posts = getAllPostSlugs()
		.map((slug) => {
			const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
			if (!fs.existsSync(filePath)) return null;
			const raw = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(raw);
			const fm = normalizeFrontmatter(data ?? {});
			const rt = Math.max(1, Math.round(readingTime(content).minutes));
			return { slug, frontmatter: fm, readingTimeMinutes: rt };
		})
		.filter((post): post is { slug: string; frontmatter: BlogFrontmatter; readingTimeMinutes: number } => post !== null);
	
	return posts.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
}

export function getFeaturedPosts(): Array<{ slug: string; frontmatter: BlogFrontmatter; readingTimeMinutes: number }> {
	return getAllPostsMeta()
		.filter(post => post.frontmatter.featured)
		.slice(0, 3);
}

export function getPostsByTag(tag: string): Array<{ slug: string; frontmatter: BlogFrontmatter; readingTimeMinutes: number }> {
	return getAllPostsMeta()
		.filter(post => post.frontmatter.tags?.includes(tag));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
	const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
	if (!fs.existsSync(filePath)) return null;
	
	const raw = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(raw);
	const frontmatter = normalizeFrontmatter(data ?? {});
	const headings: { depth: number; text: string; id: string }[] = [];

	// Collect headings and add ids for ToC
	const collectHeadings = () => (tree: Root) => {
		visit(tree, 'heading', (node: Heading) => {
			const depth = node.depth;
			if (depth < 2 || depth > 3) return;
			let text = '';
			visit(node, 'text', (t: Text) => {
				if (typeof t.value === 'string') text += t.value;
			});
			const id = text
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.trim()
				.replace(/\s+/g, '-');
			headings.push({ depth, text, id });
		});
	};

	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(collectHeadings)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypePrettyCode, { theme: 'github-dark' })
		.use(rehypeStringify)
		.process(content);

	const html = String(file);
	const readingTimeMinutes = Math.max(1, Math.round(readingTime(content).minutes));
	return { slug, frontmatter, headings, html, readingTimeMinutes };
}

function normalizeFrontmatter(data: Record<string, unknown>): BlogFrontmatter {
	return {
		title: String(data.title ?? 'Untitled'),
		description: data.description ? String(data.description) : undefined,
		date: String(data.date ?? new Date().toISOString()),
		author: data.author ? String(data.author) : 'AISEO Turbo Team',
		tags: Array.isArray(data.tags) ? (data.tags as unknown[]).map((t) => String(t)) : [],
		image: data.image ? String(data.image) : undefined,
		featured: Boolean(data.featured),
	};
}


