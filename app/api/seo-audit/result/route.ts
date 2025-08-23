import { NextRequest, NextResponse } from "next/server";

const SEO_AUDIT_BASE_URL = process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const runId = searchParams.get("runId");
    
    if (!runId) {
      return NextResponse.json({ error: "runId parameter is required" }, { status: 400 });
    }
    
    // Proxy the request to the seo-audit backend
    const response = await fetch(`${SEO_AUDIT_BASE_URL}/api/audit/result?runId=${runId}`, {
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
    console.error("Error proxying to seo-audit backend:", error);
    return NextResponse.json(
      { error: "Failed to get audit result" },
      { status: 500 }
    );
  }
}
