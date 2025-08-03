import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.PUBLIC_NEXT_API_SECRETE_KEY;

  try {
    const res = await fetch("https://api.mangadex.org/manga/random", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const response = NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
