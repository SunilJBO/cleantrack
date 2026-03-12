import { useState } from "react";
import { format } from "date-fns";
import { Modal } from "../ui/modal";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Order } from "../../types";

interface RescheduleModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderId: string, newDueDate: number) => void;
}

export function RescheduleModal({
  order,
  isOpen,
  onClose,
  onSave,
}: RescheduleModalProps) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleOpen = () => {
    if (order) {
      setDate(format(new Date(order.dueDate), "yyyy-MM-dd"));
      setReason("");
    }
  };

  const handleSave = () => {
    if (!order || !date) return;
    const newDate = new Date(date).getTime();
    onSave(order._id, newDate);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Order"
    >
      {order && (
        <div className="space-y-4">
          <div className="text-sm text-slate-300">
            <span className="text-white font-medium">{order.invoiceNumber}</span>
            {order.customerName && (
              <span className="text-slate-400"> — {order.customerName}</span>
            )}
          </div>

          <DatePicker
            label="New Due Date"
            value={date || (order ? format(new Date(order.dueDate), "yyyy-MM-dd") : "")}
            onChange={setDate}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">
              Reason (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Extra processing time needed..."
              rows={2}
              className="w-full rounded-xl bg-white/8 border border-white/12 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!date}>
              Save
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
