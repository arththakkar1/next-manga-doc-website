import { NextResponse } from "next/server";

interface MangaAttributes {
  title: Record<string, string>;
}

interface CoverArtAttributes {
  fileName: string;
}

interface Relationship {
  type: string;
  attributes?: CoverArtAttributes;
}

interface Manga {
  id: string;
  attributes: MangaAttributes;
  relationships: Relationship[];
}

interface MangaDexResponse {
  data: Manga[];
}

export async function GET() {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  try {
    const res = await fetch(
      "https://api.mangadex.org/manga?limit=12&includedTags[]=423e2eae-a7a2-4a8b-ac03-a8351462d71d&order[followedCount]=desc&includes[]=cover_art&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "MangaDex API error", status: res.status },
        { status: res.status }
      );
    }

    const json: MangaDexResponse = await res.json();
    const data = json?.data ?? [];

    const formatted = data.map((item) => {
      const id = item.id;
      const title =
        item.attributes.title.en ??
        Object.values(item.attributes.title)[0] ??
        "Untitled";

      const coverRel = item.relationships.find(
        (rel) => rel.type === "cover_art"
      );

      const fileName = coverRel?.attributes?.fileName;
      const thumbnail = fileName
        ? `https://uploads.mangadex.org/covers/${id}/${fileName}`
        : null;

      return { id, title, thumbnail };
    });

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch seinen manga:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch seinen manga",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
