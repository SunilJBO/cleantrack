import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowRight, Check } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { ScannerInput } from "../ui/scanner-input";
import { Badge } from "../ui/badge";
import { useOrders } from "../../hooks/use-orders";
import { useAuth } from "../../hooks/use-auth";
import { cn } from "../../lib/utils";
import type { Id } from "../../../convex/_generated/dataModel";

type Mode = "transfer" | "delivery";

export function LogisticsPage() {
  const navigate = useNavigate();
  const { currentStaff } = useAuth();
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  const createLog = useMutation(api.logs.create);
  const [mode, setMode] = useState<Mode>("transfer");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scanValue, setScanValue] = useState("");
  const [completed, setCompleted] = useState(false);

  const transferOrders = useOrders({ status: "dropped_off" });
  const deliveryOrders = useOrders({ status: "completed_at_plant" });
  const orders = mode === "transfer" ? transferOrders : deliveryOrders;

  const handleScan = (invoice: string) => {
    const found = orders.find(
      (o) => o.invoiceNumber.toLowerCase() === invoice.toLowerCase().trim()
    );
    if (found) {
      setSelectedIds((prev) => new Set(prev).add(found._id));
    }
    setScanValue("");
  };

  const toggleOrder = (orderId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o._id)));
    }
  };

  const handleComplete = async () => {
    const newStatus = mode === "transfer" ? "transfer_to_plant" : "returning_to_store";
    const location = "In Transit";
    const action = mode === "transfer" ? "transferred_out" : "collected_from_plant";

    for (const orderId of selectedIds) {
      await updateOrderStatus({ id: orderId as Id<"orders">, status: newStatus, location });
      if (currentStaff) {
        await createLog({
          orderId: orderId as Id<"orders">,
          staffId: currentStaff._id,
          action,
          timestamp: Date.now(),
          location,
        });
      }
    }

    setCompleted(true);
    setTimeout(() => {
      setSelectedIds(new Set());
      setCompleted(false);
      navigate("/");
    }, 1500);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <Check size={40} className="text-emerald-400" />
        </div>
        <h2 className="font-heading text-xl font-semibold text-white">
          {mode === "transfer" ? "Transfer" : "Delivery"} Complete!
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {selectedIds.size} order{selectedIds.size !== 1 ? "s" : ""} updated
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-white">
          Logistics
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Select orders to transfer or deliver
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === "transfer" ? "primary" : "secondary"}
          onClick={() => {
            setMode("transfer");
            setSelectedIds(new Set());
          }}
        >
          <Truck size={18} />
          Transfer to Plant
        </Button>
        <Button
          variant={mode === "delivery" ? "primary" : "secondary"}
          onClick={() => {
            setMode("delivery");
            setSelectedIds(new Set());
          }}
        >
          <ArrowRight size={18} />
          Return to Store
        </Button>
      </div>

      {/* Scanner */}
      <GlassCard>
        <ScannerInput
          value={scanValue}
          onChange={setScanValue}
          onSubmit={handleScan}
          placeholder="Scan invoice to check off..."
        />
      </GlassCard>

      {/* Checklist */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">
            {mode === "transfer" ? "Transfer" : "Delivery"} Checklist
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {selectedIds.size}/{orders.length} selected
            </span>
            {orders.length > 0 && (
              <button
                onClick={selectAll}
                className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                {selectedIds.size === orders.length ? "Deselect All" : "Select All"}
              </button>
            )}
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No orders ready for {mode === "transfer" ? "transfer" : "delivery"}
          </p>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => {
              const checked = selectedIds.has(order._id);
              return (
                <div
                  key={order._id}
                  onClick={() => toggleOrder(order._id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer",
                    checked
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-white/5 border border-transparent hover:bg-white/8"
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                      checked
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-white/20 hover:border-white/40"
                    )}
                  >
                    {checked && <Check size={14} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {order.invoiceNumber}
                    </p>
                    <p className="text-xs text-slate-400">
                      {order.customerName} · {order.itemCount} items
                    </p>
                  </div>
                  <Badge status={order.status} />
                </div>
              );
            })}
          </div>
        )}

        {selectedIds.size > 0 && (
          <div className="mt-4 pt-4 border-t border-white/8">
            <Button className="w-full" size="lg" onClick={handleComplete}>
              <Check size={18} />
              Complete {mode === "transfer" ? "Transfer" : "Delivery"} ({selectedIds.size})
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
