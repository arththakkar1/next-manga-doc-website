"use client";

import Link from "next/link";
import React from "react";

type Chapter = {
  id: string;
  title: string;
  chapter: string;
  readableAt: string;
};

async function fetchChapters(mangaId: string): Promise<Chapter[]> {
  const res = await fetch(`/api/chapter?mangaId=${mangaId}`);
  const data = await res.json();
  if (!data?.data) return [];
  return data.data.map((ch: any) => ({
    id: ch.id,
    title: ch.attributes.title || `Chapter ${ch.attributes.chapter}`,
    chapter: ch.attributes.chapter,
    readableAt: ch.attributes.readableAt,
  }));
}

export default function ChapterList({ mangaId }: { mangaId: string }) {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchChapters(mangaId).then((chs) => {
      setChapters(chs);
      setLoading(false);
    });
  }, [mangaId]);

  return (
    <section className="w-full mx-auto mb-8 px-2 sm:px-5">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight px-2 sm:px-4">
        Chapters
      </h2>
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-x-auto border border-white/20 w-full">
        {loading ? (
          <div className="py-8 text-center text-gray-300">Loading...</div>
        ) : chapters.length === 0 ? (
          <div className="py-8 text-center text-gray-300">
            No chapters found.
          </div>
        ) : (
          <ul className="divide-y divide-white/10 min-w-[320px]">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  href={`/chapter/${mangaId}/${chapter.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <div>
                    <span className="text-blue-400 font-semibold mr-2">
                      #{chapter.chapter}
                    </span>
                    <span className="text-white">{chapter.title}</span>
                  </div>
                  <span className="text-xs text-gray-300">
                    {chapter.readableAt
                      ? new Date(chapter.readableAt).toLocaleDateString()
                      : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
