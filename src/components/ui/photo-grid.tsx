import { ImageIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface PhotoGridProps {
  photos: string[];
  emptyMessage?: string;
  className?: string;
}

export function PhotoGrid({
  photos,
  emptyMessage = "No photos",
  className,
}: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl bg-white/5 border border-dashed border-white/10 p-8 text-slate-500",
          className
        )}
      >
        <ImageIcon size={24} />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {photos.map((photo, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-white/10 border border-white/10 overflow-hidden"
        >
          <img
            src={photo}
            alt={`Photo ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
