import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;
  const chapterId = req.nextUrl.searchParams.get("id");

  if (!chapterId) {
    return NextResponse.json({ error: "Missing chapter ID" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "MangaDex API error" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const { baseUrl, chapter } = json;
    const { hash, data } = chapter;

    const pageUrls = data.map(
      (file: string) => `${baseUrl}/data/${hash}/${file}`
    );

    const response = NextResponse.json(
      {
        id: chapterId, // 👈 Include the chapter ID here
        pages: pageUrls,
      },
      { status: 200 }
    );

    response.headers.set(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chapter pages" },
      { status: 500 }
    );
  }
}
