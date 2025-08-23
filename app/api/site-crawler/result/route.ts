import { NextRequest, NextResponse } from "next/server";

const SEO_AUDIT_BASE_URL = process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crawlId = searchParams.get("id");
    
    if (!crawlId) {
      return NextResponse.json({ error: "crawlId parameter is required" }, { status: 400 });
    }
    
    // Proxy the request to the seo-audit crawl backend
    const response = await fetch(`${SEO_AUDIT_BASE_URL}/api/crawl/get?id=${crawlId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to seo-audit crawl backend:", error);
    return NextResponse.json(
      { error: "Failed to get crawl result" },
      { status: 500 }
    );
  }
}
