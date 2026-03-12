import { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/use-auth";
import { useDataRefresh } from "../../context/data-refresh-context";
import { updateItemDefect, addLog } from "../../data";
import type { Item } from "../../types";

interface DefectModalProps {
  item: Item;
  orderId: string;
  onClose: () => void;
}

export function DefectModal({ item, orderId, onClose }: DefectModalProps) {
  const { currentStaff } = useAuth();
  const { refresh } = useDataRefresh();
  const [defectText, setDefectText] = useState("");

  const handleSubmit = () => {
    if (!defectText.trim()) return;

    updateItemDefect(item._id, defectText.trim());

    if (currentStaff) {
      addLog({
        orderId,
        staffId: currentStaff._id,
        action: "defect_noted",
        timestamp: Date.now(),
        location: "Plant",
        notes: `${item.type}: ${defectText.trim()}`,
      });
    }

    refresh();
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} title={`Defect — ${item.type}`}>
      {item.defects.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {item.defects.map((d, i) => (
            <span
              key={i}
              className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <Input
          value={defectText}
          onChange={(e) => setDefectText(e.target.value)}
          placeholder="Describe the defect..."
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" type="submit" disabled={!defectText.trim()}>
            Add Defect
          </Button>
        </div>
      </form>
    </Modal>
  );
}
