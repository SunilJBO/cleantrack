import { useRef } from "react";
import { X, Camera } from "lucide-react";
import { cn } from "../../lib/utils";

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  label?: string;
  className?: string;
}

export function PhotoUpload({
  photos,
  onPhotosChange,
  maxPhotos = 6,
  label,
  className,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = maxPhotos - photos.length;
    const filesToProcess = Array.from(files).slice(0, remaining);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onPhotosChange([...photos, dataUrl]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-xs text-slate-400">{label}</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg bg-white/10 border border-white/10 overflow-hidden group"
          >
            <img
              src={photo}
              alt={`Photo ${i + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(i)}
              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-lg border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-slate-300 hover:border-white/30 hover:bg-white/8 transition-all"
          >
            <Camera size={18} />
            <span className="text-[10px]">
              {photos.length}/{maxPhotos}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
