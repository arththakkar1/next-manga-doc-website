// app/api/manga/latest/route.ts
import { NextResponse } from "next/server";

// --- Types ---
type Relationship = {
  type: string;
  attributes?: {
    fileName?: string;
  };
};

type MangaEntry = {
  id: string;
  attributes: {
    title: Record<string, string>;
  };
  relationships: Relationship[];
};

type MangaDexResponse = {
  data: MangaEntry[];
};

export async function GET() {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  try {
    const res = await fetch(
      "https://api.mangadex.org/manga?limit=12&order[latestUploadedChapter]=desc&includes[]=cover_art&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "MangaDex API returned an error." },
        { status: res.status }
      );
    }

    const json: MangaDexResponse = await res.json();

    const formatted = json.data.map((item) => {
      const id = item.id;
      const title =
        item.attributes.title.en ||
        Object.values(item.attributes.title)[0] ||
        "Untitled";

      const coverRel = item.relationships.find(
        (rel) => rel.type === "cover_art"
      );

      const fileName = coverRel?.attributes?.fileName;
      const thumbnail = fileName
        ? `https://uploads.mangadex.org/covers/${id}/${fileName}.512.jpg`
        : null;

      return { id, title, thumbnail };
    });

    return new NextResponse(JSON.stringify({ data: formatted }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Failed to fetch:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
