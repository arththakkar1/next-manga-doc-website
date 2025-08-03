import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;
  const { searchParams } = new URL(req.url);
  const mangaId = searchParams.get("mangaId");
  const lang = searchParams.get("lang") || "en";

  if (!mangaId) {
    return NextResponse.json({ error: "Missing mangaId" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=${lang}&order[chapter]=asc&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        // Optional revalidation hint for Next.js
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();

    const response = NextResponse.json(data, { status: 200 });

    // ✅ Set 1 hour cache on CDN
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
