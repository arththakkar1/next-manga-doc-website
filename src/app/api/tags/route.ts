// app/api/tags/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://api.mangadex.org/manga/tag", {
      next: {
        revalidate: 60 * 60 * 24 * 365, // 1 year in seconds
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tags from MangaDex" },
        { status: 500 }
      );
    }

    const { data } = await res.json();

    const tags = data.map((tag: any) => ({
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
