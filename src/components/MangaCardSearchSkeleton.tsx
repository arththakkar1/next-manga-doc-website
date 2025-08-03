import { Skeleton } from "@/components/ui/skeleton";

const base = "bg-zinc-700/40"; // dark theme skeleton color

const MangaCardSearchSkeleton = () => (
  <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-md overflow-hidden">
    <Skeleton className={`${base} w-full sm:w-56 h-56 sm:h-72 rounded`} />
    <div className="p-4 flex flex-col flex-1 space-y-3">
      <Skeleton className={`${base} h-5 w-3/4`} /> {/* Title */}
      <Skeleton className={`${base} h-4 w-1/2`} /> {/* Author */}
      <Skeleton className={`${base} h-4 w-16`} /> {/* Stars */}
      <div className="flex gap-2">
        <Skeleton className={`${base} h-4 w-12 rounded-full`} />
        <Skeleton className={`${base} h-4 w-16 rounded-full`} />
      </div>
      <Skeleton className={`${base} h-3 w-full`} />
      <Skeleton className={`${base} h-3 w-5/6`} />
      <Skeleton className={`${base} h-3 w-2/3`} />
      <Skeleton className={`${base} h-9 w-24 mt-4 ml-auto rounded-full`} />
    </div>
  </div>
);

export default MangaCardSearchSkeleton;
