import { NextResponse } from "next/server";

type MangaResponse = {
  data: MangaEntry[];
};

type MangaEntry = {
  id: string;
  attributes: {
    title: Record<string, string>;
  };
  relationships: Relationship[];
};

type Relationship = {
  type: string;
  attributes?: {
    fileName?: string;
  };
};

export async function GET() {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  try {
    const res = await fetch(
      "https://api.mangadex.org/manga?limit=12&includedTags[]=cdad7e68-1419-41dd-bdce-27753074a640&order[followedCount]=desc&includes[]=cover_art&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    const json: MangaResponse = await res.json();
    const data = json?.data || [];

    const formatted = data.map((item) => {
      const id = item.id;
      const title =
        item.attributes.title.en ||
        Object.values(item.attributes.title)[0] ||
        "Untitled";

      let thumbnail: string | null = null;
      const coverRel = item.relationships.find(
        (rel) => rel.type === "cover_art"
      );

      if (coverRel?.attributes?.fileName) {
        thumbnail = `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}`;
      }

      return { id, title, thumbnail };
    });

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch seinen manga",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
