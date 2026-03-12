import { useState } from "react";
import { Check, PackageCheck } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useOrders } from "../../hooks/use-orders";
import { useAuth } from "../../hooks/use-auth";
import { useDataRefresh } from "../../context/data-refresh-context";
import { updateOrderStatus, addLog } from "../../data";
import { cn } from "../../lib/utils";

export function StoreReceiveSection() {
  const { currentStaff } = useAuth();
  const { refresh } = useDataRefresh();
  const returningOrders = useOrders({ status: "returning_to_store" });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);

  if (returningOrders.length === 0 && !completed) return null;

  const toggleOrder = (orderId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === returningOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(returningOrders.map((o) => o._id)));
    }
  };

  const handleMarkReady = () => {
    selectedIds.forEach((orderId) => {
      updateOrderStatus(orderId, "ready_for_pickup", "Store A");
      if (currentStaff) {
        addLog({
          orderId,
          staffId: currentStaff._id,
          action: "returned_to_store",
          timestamp: Date.now(),
          location: "Store A",
        });
        addLog({
          orderId,
          staffId: currentStaff._id,
          action: "ready_for_pickup",
          timestamp: Date.now() + 1,
          location: "Store A",
        });
      }
    });
    refresh();
    setCompleted(true);
    setTimeout(() => {
      setSelectedIds(new Set());
      setCompleted(false);
    }, 2000);
  };

  if (completed) {
    return (
      <GlassCard className="border border-emerald-500/20 bg-emerald-500/5">
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Orders marked ready!</p>
            <p className="text-xs text-slate-400">Customers can now pick up</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="border border-yellow-500/20 bg-yellow-500/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
          <PackageCheck size={20} className="text-yellow-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            {returningOrders.length} order{returningOrders.length !== 1 ? "s" : ""} arriving
          </p>
          <p className="text-xs text-slate-400">
            Verify and mark as ready for customer pickup
          </p>
        </div>
        {returningOrders.length > 1 && (
          <button
            onClick={selectAll}
            className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
          >
            {selectedIds.size === returningOrders.length ? "Deselect All" : "Select All"}
          </button>
        )}
      </div>

      <div className="space-y-2">
        {returningOrders.map((order) => {
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

      {selectedIds.size > 0 && (
        <div className="mt-4 pt-4 border-t border-white/8">
          <Button className="w-full" size="lg" onClick={handleMarkReady}>
            <Check size={18} />
            Mark Ready for Pickup ({selectedIds.size})
          </Button>
        </div>
      )}
    </GlassCard>
  );
}
