"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type Tag = {
  id: string;
  name: string;
  count: number;
  group: string;
};

function groupTagsAlphabetically(tags: Tag[]) {
  const grouped: Record<string, Tag[]> = {};

  tags.forEach((tag) => {
    const firstLetter = tag.name[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(tag);
  });

  // Sort tags inside each group and sort group letters
  const sortedGroups = Object.keys(grouped)
    .sort()
    .map((letter) => ({
      letter,
      tags: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));

  return sortedGroups;
}

export default function TagsPage() {
  const { data: tags = [], isLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch("/api/tags");
      if (!res.ok) throw new Error("Failed to fetch tags");
      const data = await res.json();
      return data.tags;
    },
    staleTime: 1000 * 60 * 60,
  });

  const groupedTags = groupTagsAlphabetically(tags);

  return (
    <main className="mt-28 px-6 pb-24">
      <h1 className="text-4xl font-bold text-white mb-10">Tags</h1>

      {isLoading ? (
        <p className="text-zinc-400 text-lg">Loading tags...</p>
      ) : (
        <div className="space-y-12">
          {groupedTags.map(({ letter, tags }) => (
            <section key={letter}>
              <h2 className="text-2xl font-semibold text-white/90 mb-5 tracking-wider border-b border-white/10 pb-2">
                {letter} —
              </h2>

              <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-zinc-950/80 p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm">
                {tags.map((tag) => (
                  <Link
                    href={`/tags/${tag.id}/${encodeURIComponent(tag.name)}`}
                    key={tag.id}
                    className="group flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 text-white/90 text-sm font-medium hover:from-zinc-700 hover:to-zinc-800 hover:border-zinc-500 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span className="group-hover:text-white tracking-wide">
                      {tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
