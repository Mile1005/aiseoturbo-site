import { getAllPostsMeta } from '../../lib/blog';

export async function GET() {
	const base = 'https://aiseoturbo.com';
	const posts = getAllPostsMeta();
	
	// Static pages
	const staticUrls = ['/', '/blog', '/features', '/pricing'];
	
	// Blog post URLs
	const blogUrls = posts.map(post => `/blog/${post.slug}`);
	
	// Combine all URLs
	const allUrls = [...staticUrls, ...blogUrls];
	
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${base}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}


