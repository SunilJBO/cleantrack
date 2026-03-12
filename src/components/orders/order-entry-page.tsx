import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { ScannerInput } from "../ui/scanner-input";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { PhotoUpload } from "../ui/photo-upload";
import { ITEM_TYPES } from "../../lib/constants";
import { addOrder, addItems, addLog } from "../../data";
import { useAuth } from "../../hooks/use-auth";

interface NewItem {
  type: string;
  notes: string;
  initialPhotos: string[];
}

export function OrderEntryPage() {
  const navigate = useNavigate();
  const { currentStaff } = useAuth();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<NewItem[]>([{ type: "Shirt", notes: "", initialPhotos: [] }]);

  const addItem = () => setItems([...items, { type: "Shirt", notes: "", initialPhotos: [] }]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: keyof NewItem, value: string | string[]) =>
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));

  const handleSubmit = () => {
    const order = addOrder({
      invoiceNumber: invoiceNumber.toUpperCase().trim(),
      customerName,
      dueDate: new Date(dueDate).getTime(),
      status: "dropped_off",
      location: "Store A",
      itemCount: items.length,
    });

    addItems(
      items.map((item) => ({
        orderId: order._id,
        type: item.type,
        initialPhotos: item.initialPhotos,
        plantPhotos: [],
        completionPhotos: [],
        notes: item.notes,
        defects: [],
      }))
    );

    if (currentStaff) {
      addLog({
        orderId: order._id,
        staffId: currentStaff._id,
        action: "created",
        timestamp: Date.now(),
        location: "Store A",
      });
    }

    navigate(`/orders/${order._id}`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-white">
          New Order
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Record a new drop-off order
        </p>
      </div>

      <GlassCard>
        <div className="space-y-4">
          <ScannerInput
            value={invoiceNumber}
            onChange={setInvoiceNumber}
            onSubmit={setInvoiceNumber}
            placeholder="Scan or enter invoice number"
          />

          <Input
            label="Customer Name (optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="John Smith"
          />

          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={setDueDate}
          />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Items</h2>
            <Button variant="ghost" size="sm" onClick={addItem}>
              <Plus size={16} />
              Add Item
            </Button>
          </div>

          {items.map((item, i) => (
            <div key={i} className="space-y-2 p-3 rounded-xl bg-white/5">
              <div className="flex gap-3 items-start">
                <select
                  value={item.type}
                  onChange={(e) => updateItem(i, "type", e.target.value)}
                  className="flex-1 rounded-xl bg-white/8 border border-white/12 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 [color-scheme:dark]"
                >
                  {ITEM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <Input
                  value={item.notes}
                  onChange={(e) => updateItem(i, "notes", e.target.value)}
                  placeholder="Notes..."
                  className="flex-1"
                />
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(i)}
                    className="p-2.5 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <PhotoUpload
                photos={item.initialPhotos}
                onPhotosChange={(photos) => updateItem(i, "initialPhotos", photos)}
                maxPhotos={3}
                label="Drop-off photos"
              />
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!invoiceNumber || !dueDate}
        >
          Create Order
        </Button>
      </div>
    </div>
  );
}
