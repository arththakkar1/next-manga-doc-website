import { Manga } from "@/app/page";
import { sora } from "@/lib/fonts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCard from "./MangaCard";
import MangaCardSkeleton from "./MangaCardSkeleton";

function LatestManga() {
  const { data: latestData = [], isLoading: latestLoading } = useQuery<Manga[]>(
    {
      queryKey: ["latest"],
      queryFn: async () => {
        const res = await fetch("/api/latest");
        if (!res.ok) throw new Error("Failed to fetch latest manga");
        const json = await res.json();
        return json.data;
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 10,
    }
  );

  return (
    <div>
      <h2
        className={`text-[clamp(1.6rem,4.5vw,2.25rem)] ${sora.className} font-semibold tracking-tight leading-tight text-white mx-4 sm:mx-8 my-6 sm:my-8`}
      >
        Latest Manga
      </h2>

      <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {latestLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MangaCardSkeleton key={i} />
            ))
          : latestData.map((manga) =>
              manga.thumbnail ? (
                <MangaCard
                  key={manga.id}
                  id={manga.id}
                  title={manga.title}
                  thumbnail={manga.thumbnail}
                />
              ) : null
            )}
      </div>
    </div>
  );
}

export default LatestManga;
