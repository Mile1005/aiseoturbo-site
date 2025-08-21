export async function GET() {
	const base = 'https://aiseoturbo.com';
	const urls = ['/', '/blog'];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
		.map((u) => `<url><loc>${base}${u}</loc></url>`)
		.join('')}</urlset>`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}


