import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/use-auth";

interface DefectModalProps {
  item: Doc<"items">;
  orderId: string;
  onClose: () => void;
}

export function DefectModal({ item, orderId, onClose }: DefectModalProps) {
  const { currentStaff } = useAuth();
  const addDefect = useMutation(api.items.addDefect);
  const createLog = useMutation(api.logs.create);
  const [defectText, setDefectText] = useState("");

  const handleSubmit = async () => {
    if (!defectText.trim()) return;

    await addDefect({ id: item._id, defect: defectText.trim() });

    if (currentStaff) {
      await createLog({
        orderId: orderId as Id<"orders">,
        staffId: currentStaff._id,
        action: "defect_noted",
        timestamp: Date.now(),
        location: "Plant",
        notes: `${item.type}: ${defectText.trim()}`,
      });
    }

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
