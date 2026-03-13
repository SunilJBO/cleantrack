import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { PhotoUpload } from "../ui/photo-upload";

interface PhotoModalProps {
  item: Doc<"items">;
  orderId: string;
  onClose: () => void;
}

export function PhotoModal({ item, onClose }: PhotoModalProps) {
  const addPhotos = useMutation(api.items.addPhotos);
  const [photos, setPhotos] = useState<string[]>([...item.plantPhotos]);

  const handleSave = async () => {
    const newPhotos = photos.filter((p) => !item.plantPhotos.includes(p));
    if (newPhotos.length > 0) {
      await addPhotos({ id: item._id, photos: newPhotos, photoType: "plantPhotos" });
    }
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} title={`Photos — ${item.type}`}>
      <div className="space-y-4">
        <PhotoUpload
          photos={photos}
          onPhotosChange={setPhotos}
          maxPhotos={6}
          label="Plant inspection photos"
        />

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Photos
          </Button>
        </div>
      </div>
    </Modal>
  );
}
