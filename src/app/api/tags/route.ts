import { NextResponse } from "next/server";

interface TagAttributes {
  name: {
    en: string;
    [key: string]: string;
  };
  group: string;
}

interface Tag {
  id: string;
  attributes: TagAttributes;
}

interface MangaDexTagResponse {
  data: Tag[];
}

export async function GET() {
  try {
    const res = await fetch("https://api.mangadex.org/manga/tag", {
      next: {
        revalidate: 60 * 60 * 24 * 365, // 1 year
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_NEXT_API_SECRETE_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tags from MangaDex" },
        { status: 500 }
      );
    }

    const json: MangaDexTagResponse = await res.json();

    const tags = json.data.map((tag) => ({
      id: tag.id,
      name: tag.attributes.name.en,
      group: tag.attributes.group,
    }));

    const response = NextResponse.json({ tags });
    response.headers.set(
      "Cache-Control",
      "public, immutable, max-age=31536000" // 1 year
    );

    return response;
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
