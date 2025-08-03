"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "motion/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { sora } from "@/lib/fonts";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type ChapterPagesResponse = {
  pages: string[];
};

export default function ChapterPage() {
  const [data, setData] = useState<ChapterPagesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [systemB, setSystemB] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const chapterId = params?.id as string;
  const mangaId = params?.mangaId as string;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    if (!chapterId) return;

    const fetchPages = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/chapter/chapter-pages?id=${chapterId}`
        );

        if (!res.ok) {
          router.push("/not-found");
          return;
        }

        const json: ChapterPagesResponse = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching chapter pages:", error);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [chapterId, baseUrl, router]);

  useEffect(() => {
    if (systemB && scrollRef.current) {
      const container = scrollRef.current;
      const children = container.children;
      if (children[currentIndex]) {
        (children[currentIndex] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [currentIndex, systemB]);

  if (loading)
    return (
      <Skeleton className="px-4 bg-zinc-700  mt-36 py-8 max-w-5xl mx-auto w-full h-screen" />
    );
  if (!data || data.pages.length === 0)
    return (
      <p className="text-gray-300 h-screen w-full flex justify-center items-center">
        No pages found for this chapter.
        <Link className="font-bold text-blue-600" href={`/manga/${mangaId}`}>
          Go Back to Manga
        </Link>
      </p>
    );

  return (
    <section className="px-4 mt-20 py-8 max-w-6xl mx-auto w-full space-y-4">
      <div className="flex justify-end items-center mb-6">
        <div className="flex items-center bg-zinc-800 border border-white/20 p-2 rounded-full px-4 gap-2">
          <label className="text-sm text-white">System B</label>
          <Switch checked={systemB} onCheckedChange={setSystemB} />
        </div>
      </div>

      {systemB ? (
        <div className="relative w-full overflow-hidden">
          {/* Side arrows */}
          <button
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-zinc-800 text-white p-2 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            <MdNavigateBefore className="text-2xl" />
          </button>

          <button
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-zinc-800 text-white p-2 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(prev + 1, data.pages.length - 1)
              )
            }
            disabled={currentIndex === data.pages.length - 1}
          >
            <MdNavigateNext className="text-2xl" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex w-full overflow-hidden items-center justify-center"
            >
              <Image
                src={data.pages[currentIndex]}
                alt={`Page ${currentIndex + 1}`}
                width={800}
                height={1200}
                unoptimized
                className="w-auto h-[90vh] rounded shadow"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Page index at bottom */}
          <div
            className={`absolute ${sora.className} bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/80 px-4 py-1 rounded-full text-white text-sm shadow border border-white/10`}
          >
            Page {currentIndex + 1} of {data.pages.length}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {data.pages.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt={`Page ${idx + 1}`}
              width={800}
              height={1200}
              unoptimized
              className="w-full rounded shadow"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <Link
        href={`/manga/${mangaId}`}
        className="fixed bottom-4 right-4 font-semibold bg-zinc-800 text-white px-4 py-2 rounded-full shadow hover:bg-zinc-700 transition"
      >
        Go Back to Manga
      </Link>
    </section>
  );
}
