import { NextResponse } from "next/server";

interface MangaTitle {
  en?: string;
  [key: string]: string | undefined;
}

interface CoverArt {
  type: "cover_art";
  attributes?: {
    fileName?: string;
  };
}

interface Manga {
  id: string;
  attributes: {
    title: MangaTitle;
  };
  relationships: CoverArt[];
}

interface MangaDexResponse {
  data: Manga[];
}

export async function GET() {
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

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch trending manga" },
        { status: res.status }
      );
    }

    const json: MangaDexResponse = await res.json();
    const data = json?.data ?? [];

    const formatted = data.map((item) => {
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
        ? `https://uploads.mangadex.org/covers/${id}/${fileName}`
        : null;

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
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
