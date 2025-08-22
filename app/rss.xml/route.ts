import { getAllPostsMeta } from '../../lib/blog';

export async function GET() {
	const base = 'https://aiseoturbo.com';
	const posts = getAllPostsMeta();
	const items = posts
		.map((p) => `
		<item>
			<title><![CDATA[${p.frontmatter.title}]]></title>
			<link>${base}/blog/${p.slug}</link>
			<guid>${base}/blog/${p.slug}</guid>
			<pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
			<description><![CDATA[${p.frontmatter.description ?? ''}]]></description>
		</item>`)
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0">
			<channel>
				<title>AISEO Turbo Blog</title>
				<link>${base}/blog</link>
				<description>Insights on SEO and automation.</description>
				${items}
			</channel>
		</rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}


