import React from "react";
import MangaPanel from "./MangaPanel";
import Link from "next/link";

type MangaCardProps = {
  title: string;
  thumbnail: string;
  description: string;
  authors: string[];
  stars: number;
  tags: string[];
  id: string;
};

const MangaCard: React.FC<MangaCardProps> = ({
  title,
  thumbnail,
  description,
  authors,
  stars,
  tags,
  id,
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link
        href={`/manga/${id}`}
        className="w-full sm:w-56 h-56 sm:h-72 relative flex-shrink-0"
      >
        <MangaPanel src={thumbnail} alt={title} />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div>
          <h2 className="text-white text-lg font-semibold line-clamp-2">
            {title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-zinc-400">by</span>
            <span className="text-sm text-blue-300 font-medium">
              {(authors ?? []).join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
            <span className="text-sm text-yellow-300 font-semibold">
              {stars}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(tags ?? []).map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 text-blue-400 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-zinc-400 text-sm mt-2 line-clamp-3">{description}</p>
        <div className="flex-1" />
        <div className="mt-4 flex">
          <Link
            href={`/manga/${id}`}
            className="inline-block w-full sm:w-auto px-5 py-2 rounded-full bg-white hover:bg-white/60 text-black font-semibold transition-colors duration-200 shadow ml-auto text-center"
          >
            Read Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
