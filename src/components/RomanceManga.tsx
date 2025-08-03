"use client";

import { useQuery } from "@tanstack/react-query";
import MangaCard from "./MangaCard";
import { sora } from "@/lib/fonts";
import MangaCardSkeleton from "./MangaCardSkeleton";

type Manga = {
  id: string;
  title: string;
  thumbnail: string | null;
};

export default function RomanceManga() {
  const { data = [], isLoading } = useQuery<Manga[]>({
    queryKey: ["romance-manga"],
    queryFn: async () => {
      const res = await fetch("/api/romance-manga");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div>
      <h2
        className={`text-[clamp(1.6rem,4.5vw,2.25rem)] ${sora.className} font-semibold tracking-tight leading-tight text-white mx-4 sm:mx-8 my-6 sm:my-8`}
      >
        Romance Manga
      </h2>

      <div className="grid p-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MangaCardSkeleton key={i} />
            ))
          : data.map((manga) =>
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
