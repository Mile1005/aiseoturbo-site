import { NextRequest, NextResponse } from "next/server";

const SEO_AUDIT_BASE_URL = process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Proxy the request to the seo-audit SERP snapshot backend
    const response = await fetch(`${SEO_AUDIT_BASE_URL}/api/serp.snapshot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to seo-audit SERP backend:", error);
    return NextResponse.json(
      { error: "Failed to analyze SERP positions" },
      { status: 500 }
    );
  }
}
