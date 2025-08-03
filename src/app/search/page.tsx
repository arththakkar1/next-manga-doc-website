"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MangaCard from "@/components/MangaCardSearch";
import SearchBar from "@/components/SearchBar";
import MangaCardSearchSkeleton from "@/components/MangaCardSearchSkeleton";
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

type Tag = {
  id: string;
  name: string;
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const tagParam = searchParams.get("tags") || "";
  const selectedTags = tagParam.split(",").filter(Boolean);
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch("/api/tags");
      if (!res.ok) throw new Error("Failed to fetch tags");
      const data = await res.json();
      return data.tags;
    },
    staleTime: 1000 * 60 * 60,
  });

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["search", q, selectedTags, page],
    queryFn: async () => {
      const res = await fetch(
        `/api/manga/search?title=${q}&tags=${selectedTags.join(
          ","
        )}&limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!q,
  });

  const manga = rawData?.manga || [];
  const total = rawData?.total || 0;
  const maxPages = Math.min(10, Math.ceil(total / limit));

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    params.set("page", "1"); // reset page
    router.push(`/search?${params.toString()}`);
  };

  const toggleTag = (tagId: string) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((t) => t !== tagId)
      : [...selectedTags, tagId];

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (updatedTags.length > 0) params.set("tags", updatedTags.join(","));
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen mt-28 w-full relative overflow-x-hidden">
      <div className="relative z-20 pt-10 pb-6">
        <SearchBar onSearch={handleSearch} initialValue={q} />
      </div>

      <div className="fixed inset-0 bg-black z-0" />
      <div className="fixed inset-0 z-0" />

      <div className="relative z-10 p-6 min-h-screen flex flex-col">
        <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {tags.map((tag: Tag) => {
              const isActive = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 cursor-pointer rounded-full border text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-6 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <MangaCardSearchSkeleton key={i} />
              ))}
            </div>
          ) : manga.length === 0 ? (
            <div className="flex-1 flex justify-center items-center mt-12">
              <span className="text-xl text-gray-400">No results found.</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 w-full max-w-full mt-8">
                {manga.map((manga: Manga) => (
                  <MangaCard
                    key={manga.id}
                    id={manga.id}
                    title={manga.title}
                    thumbnail={manga.thumbnail}
                    description={manga.description}
                    authors={manga.authors}
                    stars={manga.stars}
                    tags={manga.tags}
                  />
                ))}
              </div>

              <div className="flex justify-center items-center mt-10 gap-4">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page <= 1}
                  className=" p-2.5 cursor-pointer rounded-full text-sm font-medium transition-all duration-200
      bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdNavigateBefore className="text-xl" />
                </button>

                <span className="px-4 py-2.5 text-sm text-zinc-300 bg-zinc-900 rounded-full border border-zinc-700">
                  Page <span className="font-semibold text-white">{page}</span>{" "}
                  of{" "}
                  <span className="font-semibold text-white">{maxPages}</span>
                </span>

                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page >= maxPages}
                  className="p-2.5 cursor-pointer rounded-full text-sm font-medium transition-all duration-200
      bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdNavigateNext className="text-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
