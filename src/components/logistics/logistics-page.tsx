import { useState } from "react";
import { Truck, ArrowRight, Check, Package } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { ScannerInput } from "../ui/scanner-input";
import { Badge } from "../ui/badge";
import { useOrders } from "../../hooks/use-orders";
import { cn } from "../../lib/utils";

type Mode = "transfer" | "delivery";

export function LogisticsPage() {
  const [mode, setMode] = useState<Mode>("transfer");
  const [scannedIds, setScannedIds] = useState<Set<string>>(new Set());
  const [scanValue, setScanValue] = useState("");

  const transferOrders = useOrders({ status: "dropped_off" });
  const deliveryOrders = useOrders({ status: "completed_at_plant" });
  const orders = mode === "transfer" ? transferOrders : deliveryOrders;

  const handleScan = (invoice: string) => {
    const found = orders.find((o) => o.invoiceNumber === invoice);
    if (found) {
      setScannedIds((prev) => new Set(prev).add(found._id));
    }
    setScanValue("");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-white">
          Logistics
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Scan and verify orders for transfer or delivery
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === "transfer" ? "primary" : "secondary"}
          onClick={() => {
            setMode("transfer");
            setScannedIds(new Set());
          }}
        >
          <Truck size={18} />
          Transfer to Plant
        </Button>
        <Button
          variant={mode === "delivery" ? "primary" : "secondary"}
          onClick={() => {
            setMode("delivery");
            setScannedIds(new Set());
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
          <span className="text-xs text-slate-400">
            {scannedIds.size}/{orders.length} verified
          </span>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No orders ready for {mode === "transfer" ? "transfer" : "delivery"}
          </p>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => {
              const checked = scannedIds.has(order._id);
              return (
                <div
                  key={order._id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all",
                    checked ? "bg-emerald-500/10" : "bg-white/5"
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                      checked
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-white/20"
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

        {scannedIds.size > 0 && scannedIds.size === orders.length && (
          <div className="mt-4 pt-4 border-t border-white/8">
            <Button className="w-full" size="lg">
              <Check size={18} />
              Complete {mode === "transfer" ? "Transfer" : "Delivery"}
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
