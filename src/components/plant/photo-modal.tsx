import { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { PhotoUpload } from "../ui/photo-upload";
import { useDataRefresh } from "../../context/data-refresh-context";
import { addItemPhotos } from "../../data";
import type { Item } from "../../types";

interface PhotoModalProps {
  item: Item;
  orderId: string;
  onClose: () => void;
}

export function PhotoModal({ item, onClose }: PhotoModalProps) {
  const { refresh } = useDataRefresh();
  const [photos, setPhotos] = useState<string[]>([...item.plantPhotos]);

  const handleSave = () => {
    // Find new photos that weren't already on the item
    const newPhotos = photos.filter((p) => !item.plantPhotos.includes(p));
    if (newPhotos.length > 0) {
      addItemPhotos(item._id, newPhotos, "plantPhotos");
      refresh();
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
