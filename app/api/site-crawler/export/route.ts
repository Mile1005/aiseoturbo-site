import { NextRequest, NextResponse } from "next/server";

const SEO_AUDIT_BASE_URL = process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crawlId = searchParams.get("id");
    
    if (!crawlId) {
      return NextResponse.json({ error: "crawlId parameter is required" }, { status: 400 });
    }
    
    // Proxy the request to the seo-audit crawl export backend
    const response = await fetch(`${SEO_AUDIT_BASE_URL}/api/crawl/export?id=${crawlId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    // Forward the CSV response
    const csvData = await response.text();
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="crawl-${crawlId}.csv"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error proxying to seo-audit crawl export backend:", error);
    return NextResponse.json(
      { error: "Failed to export crawl data" },
      { status: 500 }
    );
  }
}
