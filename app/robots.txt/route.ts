export async function GET() {
	const body = `User-agent: *\nAllow: /\nSitemap: https://aiseoturbo.com/sitemap.xml\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}


