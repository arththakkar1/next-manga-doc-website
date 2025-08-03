"use client";

import { Manga } from "@/app/page";
import { sora } from "@/lib/fonts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCard from "./MangaCard";
import { Skeleton } from "@/components/ui/skeleton";

function TrendingManga() {
  const { data: trendingData = [], isLoading: trendingLoading } = useQuery<
    Manga[]
  >({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await fetch("/api/trending");
      if (!res.ok) throw new Error("Failed to fetch trending manga");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <div className="my-10 mx-6">
      <h1
        className={`text-[clamp(1.8rem,5vw,2.75rem)] ${sora.className} font-bold tracking-tight leading-tight text-white mx-4 sm:mx-2 mb-8`}
      >
        Trending Manga
      </h1>

      {trendingLoading ? (
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-5 py-2 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className="snap-start flex-shrink-0 w-48 space-y-2"
              >
                <Skeleton className="h-64 w-full rounded-xl bg-zinc-800" />
                <Skeleton className="h-4 w-5/6 bg-zinc-700" />
                <Skeleton className="h-4 w-3/4 bg-zinc-700" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-5 py-2 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
            {trendingData.map((manga) =>
              manga.thumbnail ? (
                <div key={manga.id} className="snap-start flex-shrink-0 w-48">
                  <MangaCard
                    id={manga.id}
                    title={manga.title}
                    thumbnail={manga.thumbnail}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendingManga;
