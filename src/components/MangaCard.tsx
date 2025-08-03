"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type MangaCardProps = {
  id: string;
  title: string;
  thumbnail: string;
};

const MangaCard: React.FC<MangaCardProps> = ({ id, title, thumbnail }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      href={`/manga/${id}`}
      className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-200"
    >
      <div className="relative w-full aspect-[3/4] bg-zinc-800">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-zinc-700 animate-pulse" />
        )}

        <Image
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          width={512}
          height={682}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="p-3">
        <h3 className="text-white text-base font-semibold truncate">{title}</h3>
      </div>
    </Link>
  );
};

export default MangaCard;
