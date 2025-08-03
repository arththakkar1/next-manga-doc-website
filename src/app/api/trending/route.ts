// app/api/manga/trending/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  try {
    const res = await fetch(
      "https://api.mangadex.org/manga?limit=12&order[followedCount]=desc&includes[]=cover_art&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    const json = await res.json();
    const data = json?.data || [];

    const formatted = data.map((item: any) => {
      const id = item.id;
      const title =
        item.attributes.title.en ||
        Object.values(item.attributes.title)[0] ||
        "Untitled";

      let thumbnail = null;
      const coverRel = item.relationships.find(
        (rel: any) => rel.type === "cover_art"
      );
      if (coverRel) {
        const fileName = coverRel.attributes?.fileName;
        if (fileName) {
          // Use higher quality thumbnail
          thumbnail = `https://uploads.mangadex.org/covers/${id}/${fileName}`;
        }
      }
      // ---------------------------------------------------

      return { id, title, thumbnail };
    });

    return new NextResponse(JSON.stringify({ data: formatted }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trending manga" },
      { status: 500 }
    );
  }
}
