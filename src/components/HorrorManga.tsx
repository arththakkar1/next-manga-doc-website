"use client";

import { useQuery } from "@tanstack/react-query";
import MangaCard from "./MangaCard";
import MangaCardSkeleton from "./MangaCardSkeleton"; // 👈 import this
import { sora } from "@/lib/fonts";

type Manga = {
  id: string;
  title: string;
  thumbnail: string | null;
};

export default function HorrorManga() {
  const { data = [], isLoading } = useQuery<Manga[]>({
    queryKey: ["horror-manga"],
    queryFn: async () => {
      const res = await fetch("/api/horror-manga");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="my-10 mx-6">
      <h2
        className={`text-[clamp(1.6rem,4.5vw,2.25rem)] ${sora.className} font-semibold text-white mx-4 sm:mx-2 mb-8`}
      >
        Horror Manga
      </h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4 px-5 py-2 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="snap-start flex-shrink-0 w-48">
                  <MangaCardSkeleton />
                </div>
              ))
            : data.map((manga) =>
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
    </div>
  );
}
