import { Skeleton } from "@/components/ui/skeleton";

export default function MangaCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow transition-shadow duration-200">
      <Skeleton className="w-full aspect-[3/4] bg-zinc-800" />
      <div className="p-3">
        <Skeleton className="h-4 w-3/4 bg-zinc-800" />
      </div>
    </div>
  );
}
