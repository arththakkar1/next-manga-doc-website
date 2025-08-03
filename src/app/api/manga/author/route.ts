import { NextResponse } from "next/server";

type Tag = {
  id: string;
  attributes: {
    name: Record<string, string>;
  };
};

type Relationship = {
  id: string;
  type: string;
  attributes?: {
    fileName?: string;
    name?: string;
  };
};

type Manga = {
  id: string;
  attributes: {
    title: Record<string, string>;
    description: Record<string, string> | string;
    tags: Tag[];
  };
  relationships: Relationship[];
};

type MangaResponse = {
  data: Manga[];
  total: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const authorId = searchParams.get("id");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!authorId) {
    return new NextResponse(
      JSON.stringify({ error: "Author ID is required" }),
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.mangadex.org/manga?authors[]=${authorId}&includes[]=cover_art&includes[]=author&limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_NEXT_API_SECRETE_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const data: MangaResponse = await res.json();

  const manga = data.data.map((m) => {
    const cover = m.relationships.find((rel) => rel.type === "cover_art");
    const fileName = cover?.attributes?.fileName;

    const authors = m.relationships
      .filter((rel) => rel.type === "author")
      .map((rel) => rel.attributes?.name)
      .filter((name): name is string => Boolean(name));

    const tags = m.attributes.tags.map(
      (tag) => tag.attributes.name.en || "Unknown"
    );

    const stars = Math.floor(Math.random() * 5) + 1;

    const description =
      typeof m.attributes.description === "object"
        ? m.attributes.description.en || "No description"
        : m.attributes.description || "No description";

    return {
      id: m.id,
      title: m.attributes.title.en || "No Title",
      thumbnail: fileName
        ? `https://uploads.mangadex.org/covers/${m.id}/${fileName}.512.jpg`
        : "",
      description,
      authors,
      stars,
      tags,
    };
  });

  return new NextResponse(JSON.stringify({ manga, total: data.total }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=59",
    },
  });
}
