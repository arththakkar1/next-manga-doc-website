import { NextRequest, NextResponse } from "next/server";

// Types for the Manga API response
type MangaResponse = {
  data: Manga;
};

type Manga = {
  id: string;
  attributes: {
    title: Record<string, string>;
    description: Record<string, string>;
    status: string;
    tags: Tag[];
    publicationDemographic: string;
    altTitles: Record<string, string>[];
  };
  relationships: Relationship[];
};

type Relationship = {
  type: string;
  id: string;
  attributes?: {
    fileName?: string;
    name?: string;
  };
};

type Tag = {
  id: string;
  attributes: {
    name: Record<string, string>;
    group: string;
  };
};

export async function GET(req: NextRequest) {
  const mangaId = new URL(req.url).searchParams.get("id");
  const token = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  if (!mangaId) {
    return NextResponse.json({ error: "Missing manga ID" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json(
      { error: "Missing MangaDex API token" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art&includes[]=author&includes[]=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch manga info" },
        { status: res.status }
      );
    }

    const json: MangaResponse = await res.json();
    const manga = json.data;

    const title =
      manga.attributes.title.en ||
      Object.values(manga.attributes.title)[0] ||
      "Untitled";

    const description =
      manga.attributes.description.en || "No description available.";

    const status = manga.attributes.status || "Unknown";

    // Cover art
    let thumbnail: string | null = null;
    const coverRel = manga.relationships.find(
      (rel) => rel.type === "cover_art"
    );

    if (coverRel?.attributes?.fileName) {
      thumbnail = `https://uploads.mangadex.org/covers/${mangaId}/${coverRel.attributes.fileName}`;
    }

    // Authors with ID and name
    const authorRelations = manga.relationships.filter(
      (rel) => rel.type === "author"
    );

    const authors = authorRelations
      .map((rel) => ({
        id: rel.id,
        name: rel.attributes?.name,
      }))
      .filter((a) => a.id && a.name);

    // Tags
    const tagsRaw = manga.attributes.tags || [];
    const tags = tagsRaw.map((tag) => ({
      id: tag.id,
      name: tag.attributes?.name?.en || "Unknown",
    }));

    const themes = tagsRaw
      .filter((tag) => tag.attributes?.group === "theme")
      .map((tag) => tag.attributes?.name?.en)
      .filter(Boolean);

    const format = manga.attributes.publicationDemographic || "Unknown";

    const altTitles = (manga.attributes.altTitles || [])
      .map((t) => Object.values(t)[0])
      .filter(Boolean)
      .slice(0, 4);

    const stars = Math.floor(Math.random() * 3) + 3;

    return NextResponse.json(
      {
        id: mangaId,
        title,
        thumbnail,
        description,
        status,
        authors, // now includes both ID and name
        tags,
        themes,
        format,
        altTitles,
        stars,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Manga fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
