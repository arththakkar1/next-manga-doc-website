"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MangaCard from "@/components/MangaCard";
import MangaCardSkeleton from "@/components/MangaCardSkeleton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

type Manga = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  authors: string[];
  stars: number;
  tags: string[];
};

export default function AuthorPage({
  params,
}: {
  params: { id: string; name: string };
}) {
  const { id: authorId, name: Name } = params;
  const authorName = decodeURIComponent(Name).replace(/-/g, " ");

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  const { data, isLoading } = useQuery({
    queryKey: ["author", authorId, page],
    queryFn: async () => {
      const res = await fetch(
        `/api/manga/author?id=${authorId}&limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch manga");
      return res.json();
    },
  });

  const manga: Manga[] = data?.manga || [];
  const total: number = data?.total || 0;
  const maxPages = Math.min(10, Math.ceil(total / limit));

  const changePage = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    router.push(
      `/author/${authorId}/${encodeURIComponent(authorName)}?${params}`
    );
  };

  return (
    <main className="min-h-screen pt-28 w-full bg-black text-white">
      <h1 className="text-3xl font-bold px-5 mb-4">Manga by {authorName}</h1>

      <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <MangaCardSkeleton key={i} />
            ))
          : manga.map((m) =>
              m.thumbnail ? (
                <MangaCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  thumbnail={m.thumbnail}
                />
              ) : null
            )}
      </div>

      {maxPages > 1 && (
        <div className="flex mb-5 justify-center items-center mt-10 gap-4">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}
            className="p-2.5 cursor-pointer rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40"
          >
            <MdNavigateBefore className="text-xl" />
          </button>

          <span className="px-4 py-2.5 text-sm bg-zinc-900 rounded-full border border-zinc-700">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{maxPages}</span>
          </span>

          <button
            onClick={() => changePage(page + 1)}
            disabled={page >= maxPages}
            className="p-2.5 cursor-pointer rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40"
          >
            <MdNavigateNext className="text-xl" />
          </button>
        </div>
      )}
    </main>
  );
}
