"use client";

import Carousel from "@/components/Carousel";
import LatestManga from "@/components/LatestManga";
import TrendingManga from "@/components/TrendingManga";
import HorrorManga from "@/components/HorrorManga";
import RomanceManga from "@/components/RomanceManga";

export type Manga = {
  id: string;
  title: string;
  thumbnail: string | null;
};

export default function TrendingPage() {
  return (
    <div className="md:mt-0 mt-10">
      <Carousel />

      {/* Trending */}
      <TrendingManga />

      {/* Romance Manga */}
      <RomanceManga />

      {/* Seinen Manga */}
      <HorrorManga />

      {/* Latest */}
      <LatestManga />
    </div>
  );
}
