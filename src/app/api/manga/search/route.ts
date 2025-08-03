import { tagNameToIdMap } from "@/lib/tagNameToIdMap";
import { NextResponse } from "next/server";

// --- Type Definitions ---
type MangaResponse = {
  data: Manga[];
  total: number;
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
  };
};

// --- API Handler ---
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const tagsParam = searchParams.get("tags");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Tags processing
  const tagNames =
    tagsParam?.split(",").map((t) => t.trim().toLowerCase()) ?? [];

  const tagIds = tagNames
    .map((name) => tagNameToIdMap[name])
    .filter((id): id is string => !!id);

  const tagFilters = tagIds.map((id) => `includedTags[]=${id}`).join("&");
  const titleQuery = title ? `title=${encodeURIComponent(title)}&` : "";

  // API Request
  const res = await fetch(
    `https://api.mangadex.org/manga?${titleQuery}includes[]=cover_art&includes[]=author&limit=${limit}&offset=${offset}&${tagFilters}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_NEXT_API_SECRETE_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const json: MangaResponse = await res.json();

  // Format Manga
  const manga = json.data.map((m) => {
    const cover = m.relationships.find((rel) => rel.type === "cover_art");
    const fileName = cover?.attributes?.fileName || "";

    const authors = m.relationships
      .filter((rel) => rel.type === "author")
      .map((rel) => rel.attributes?.name)
      .filter(Boolean) as string[];

    const tags = m.attributes.tags
      .map((tag) => tag.attributes.name.en)
      .filter(Boolean);

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

  return new NextResponse(JSON.stringify({ manga, total: json.total }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=59",
    },
  });
}
