"use client";

import { useEffect, useState } from "react";
import { sora } from "@/lib/fonts";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChapterList from "@/components/ChapterList";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { User2 } from "lucide-react";

type MangaData = {
  id: string;
  title: string;
  thumbnail: string | null;
  description: string;
  status: string;
  authors: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  themes: string[];
  format: string;
  altTitles: string[];
  stars: number;
};

export default function MangaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [manga, setManga] = useState<MangaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchManga = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/manga?id=${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setManga(data);
      } catch {
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchManga();
  }, [id, router]);

  if (loading) {
    return <MangaPageSkeleton />;
  }

  if (!manga) {
    return <div className="text-center py-10 text-white">Manga not found</div>;
  }

  return (
    <div>
      <div className={`relative mx-2 min-h-screen ${sora.className}`}>
        <div className="relative z-10 flex justify-center items-center min-h-screen px-1 sm:px-4">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full flex flex-col md:flex-row overflow-hidden">
            {manga.thumbnail && (
              <div className="flex-shrink-0 w-full h-[320px] md:w-[320px] md:h-[480px]">
                <Image
                  src={manga.thumbnail}
                  alt={manga.title}
                  width={320}
                  height={480}
                  className="object-cover w-full h-full md:rounded-l-2xl"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4 sm:p-6 flex-1 flex flex-col min-w-0">
              <ScrollArea className="h-[260px] sm:h-[410px]">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-lg break-words">
                    {manga.title}
                  </h1>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < manga.stars ? "text-yellow-400" : "text-gray-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-300">
                      {manga.stars} / 5
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-600/80 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                      {manga.format}
                    </span>
                    {manga.themes.map((theme) => (
                      <span
                        key={theme}
                        className="bg-purple-600/60 text-xs px-2 py-1 rounded-full text-white"
                      >
                        {theme}
                      </span>
                    ))}
                    <span className="bg-green-600/80 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                      {manga.status}
                    </span>
                    {manga.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.id}/${tag.name}`}
                        className="bg-white/20 text-xs px-2 py-1 rounded-full text-gray-200"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                  {manga.altTitles.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold text-white text-sm">
                        Alternative Titles:
                      </span>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-1">
                        {manga.altTitles.map((alt, idx) => (
                          <li key={idx}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {manga.authors.length > 0 && (
                    <p className="text-gray-300 flex items-center gap-x-2 text-sm mb-2">
                      <span className="font-semibold text-white">
                        Author(s):
                      </span>{" "}
                      {manga.authors.map((author, i) => (
                        <span key={author.id}>
                          <Link
                            href={`/author/${author.id}/${author.name}`}
                            className="inline-flex items-center gap-1 rounded-full bg-zinc-950 hover:bg-zinc-700 px-3 py-1 text-sm font-medium text-zinc-200 hover:text-white transition-colors"
                          >
                            <User2 className="w-4 h-4" />
                            <span className="line-clamp-1">{author.name}</span>
                          </Link>
                          {i < manga.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="flex-1 min-h-0 mt-4">
                  <p className="whitespace-pre-line text-gray-200 leading-relaxed text-base break-words">
                    {manga.description}
                  </p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      <ChapterList mangaId={manga.id} />
    </div>
  );
}

const MangaPageSkeleton = () => (
  <div className="relative z-10 flex justify-center items-center min-h-screen px-1 sm:px-4">
    <div className="backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl w-full flex flex-col md:flex-row overflow-hidden">
      <Skeleton className="flex-shrink-0 w-full h-[320px] rounded-l-2xl rounded-r-[0px]  md:w-[320px] md:h-[480px] bg-zinc-700" />
      <div className="p-4 sm:p-6 flex-1 flex flex-col  space-y-3">
        <Skeleton className="h-8 w-3/4 bg-zinc-700" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full bg-zinc-700" />
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-16 rounded-full bg-zinc-700" />
          ))}
        </div>
        <Skeleton className="h-4 w-full bg-zinc-700" />
        <Skeleton className="h-4 w-5/6 bg-zinc-700" />
        <Skeleton className="h-4 w-2/3 bg-zinc-700" />
      </div>
    </div>
  </div>
);
