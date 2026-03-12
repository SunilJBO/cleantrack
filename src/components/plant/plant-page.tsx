import { useState } from "react";
import {
  Factory,
  Package,
  AlertCircle,
  Check,
  Camera,
  Inbox,
  Play,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScannerInput } from "../ui/scanner-input";
import { useOrders } from "../../hooks/use-orders";
import { useAuth } from "../../hooks/use-auth";
import { useDataRefresh } from "../../context/data-refresh-context";
import { getItemsByOrderId, updateOrderStatus, addLog } from "../../data";
import { cn, formatRelativeDate, isOverdue } from "../../lib/utils";
import { DefectModal } from "./defect-modal";
import { PhotoModal } from "./photo-modal";
import type { Order, Item } from "../../types";

type Tab = "receive" | "process" | "completed";

export function PlantPage() {
  const { currentStaff } = useAuth();
  const { refresh } = useDataRefresh();

  const inTransit = useOrders({ status: "transfer_to_plant" });
  const atPlant = useOrders({ status: "at_plant" });
  const processing = useOrders({ status: "processing" });
  const completed = useOrders({ status: "completed_at_plant" });

  const [tab, setTab] = useState<Tab>("receive");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Receive tab state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scanValue, setScanValue] = useState("");
  const [receiveComplete, setReceiveComplete] = useState(false);

  // Modal state
  const [defectItem, setDefectItem] = useState<{ item: Item; orderId: string } | null>(null);
  const [photoItem, setPhotoItem] = useState<{ item: Item; orderId: string } | null>(null);

  // --- Receive tab handlers ---
  const handleScan = (invoice: string) => {
    const found = inTransit.find(
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
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === inTransit.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(inTransit.map((o) => o._id)));
    }
  };

  const handleConfirmReceipt = () => {
    selectedIds.forEach((orderId) => {
      updateOrderStatus(orderId, "at_plant", "Plant");
      if (currentStaff) {
        addLog({
          orderId,
          staffId: currentStaff._id,
          action: "plant_received",
          timestamp: Date.now(),
          location: "Plant",
        });
      }
    });
    refresh();
    setReceiveComplete(true);
    setTimeout(() => {
      setSelectedIds(new Set());
      setReceiveComplete(false);
      setTab("process");
    }, 1500);
  };

  // --- Process tab handlers ---
  const handleStartProcessing = (order: Order) => {
    updateOrderStatus(order._id, "processing", "Plant");
    if (currentStaff) {
      addLog({
        orderId: order._id,
        staffId: currentStaff._id,
        action: "processing_started",
        timestamp: Date.now(),
        location: "Plant",
      });
    }
    refresh();
  };

  const handleMarkComplete = (order: Order) => {
    updateOrderStatus(order._id, "completed_at_plant", "Plant");
    if (currentStaff) {
      addLog({
        orderId: order._id,
        staffId: currentStaff._id,
        action: "completed",
        timestamp: Date.now(),
        location: "Plant",
      });
    }
    refresh();
  };

  // --- Shared order card renderer ---
  const renderOrderCard = (order: Order, showActions: boolean) => {
    const items = getItemsByOrderId(order._id);
    const isExpanded = expandedOrder === order._id;
    const overdue = isOverdue(order.dueDate, order.status);

    return (
      <GlassCard key={order._id} className="p-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-white">
                {order.invoiceNumber}
              </span>
              <Badge status={order.status} dueDate={order.dueDate} />
            </div>
            <p className="text-xs text-slate-400">
              {order.customerName} · {items.length} items ·{" "}
              <span className={overdue ? "text-red-400" : ""}>
                {formatRelativeDate(order.dueDate)}
              </span>
            </p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/8 space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
              >
                <Package size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white">{item.type}</p>
                  {item.notes && (
                    <p className="text-xs text-slate-400">{item.notes}</p>
                  )}
                  {item.defects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
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
                </div>
                {showActions && (
                  <div className="flex gap-1 shrink-0">
                    <button
                      className="p-1.5 rounded-lg text-slate-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
                      title="Add defect note"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDefectItem({ item, orderId: order._id });
                      }}
                    >
                      <AlertCircle size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                      title="Add photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoItem({ item, orderId: order._id });
                      }}
                    >
                      <Camera size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {showActions && order.status === "at_plant" && (
              <Button className="w-full" onClick={() => handleStartProcessing(order)}>
                <Play size={16} />
                Start Processing
              </Button>
            )}

            {showActions && order.status === "processing" && (
              <Button className="w-full" onClick={() => handleMarkComplete(order)}>
                <Check size={16} />
                Mark All Complete
              </Button>
            )}
          </div>
        )}
      </GlassCard>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-white">
          Plant Processing
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage orders at the processing plant
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-semibold text-yellow-400">{inTransit.length}</p>
          <p className="text-xs text-slate-400 mt-1">In Transit</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-semibold text-blue-400">{atPlant.length}</p>
          <p className="text-xs text-slate-400 mt-1">Awaiting</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-semibold text-purple-400">{processing.length}</p>
          <p className="text-xs text-slate-400 mt-1">Processing</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-semibold text-teal-400">{completed.length}</p>
          <p className="text-xs text-slate-400 mt-1">Completed</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={tab === "receive" ? "primary" : "secondary"}
          onClick={() => setTab("receive")}
        >
          <Inbox size={18} />
          Receive ({inTransit.length})
        </Button>
        <Button
          variant={tab === "process" ? "primary" : "secondary"}
          onClick={() => setTab("process")}
        >
          <Factory size={18} />
          Process ({atPlant.length + processing.length})
        </Button>
        <Button
          variant={tab === "completed" ? "primary" : "secondary"}
          onClick={() => setTab("completed")}
        >
          <CheckCircle2 size={18} />
          Done ({completed.length})
        </Button>
      </div>

      {/* Receive Tab */}
      {tab === "receive" && (
        <>
          {receiveComplete ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Check size={40} className="text-emerald-400" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-white">
                Receipt Confirmed!
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                {selectedIds.size} order{selectedIds.size !== 1 ? "s" : ""} received
              </p>
            </div>
          ) : (
            <>
              <GlassCard>
                <ScannerInput
                  value={scanValue}
                  onChange={setScanValue}
                  onSubmit={handleScan}
                  placeholder="Scan invoice to check off..."
                />
              </GlassCard>

              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">
                    Incoming Shipment
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {selectedIds.size}/{inTransit.length} selected
                    </span>
                    {inTransit.length > 0 && (
                      <button
                        onClick={selectAll}
                        className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        {selectedIds.size === inTransit.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                    )}
                  </div>
                </div>

                {inTransit.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">
                    No orders in transit to receive
                  </p>
                ) : (
                  <div className="space-y-2">
                    {inTransit.map((order) => {
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
                    <Button className="w-full" size="lg" onClick={handleConfirmReceipt}>
                      <Check size={18} />
                      Confirm Receipt ({selectedIds.size})
                    </Button>
                  </div>
                )}
              </GlassCard>
            </>
          )}
        </>
      )}

      {/* Process Tab */}
      {tab === "process" && (
        <div className="space-y-2">
          {atPlant.length === 0 && processing.length === 0 ? (
            <GlassCard className="p-8">
              <p className="text-sm text-slate-500 text-center">
                No orders to process
              </p>
            </GlassCard>
          ) : (
            [...atPlant, ...processing].map((order) => renderOrderCard(order, true))
          )}
        </div>
      )}

      {/* Completed Tab */}
      {tab === "completed" && (
        <div className="space-y-2">
          {completed.length === 0 ? (
            <GlassCard className="p-8">
              <p className="text-sm text-slate-500 text-center">
                No completed orders awaiting pickup
              </p>
            </GlassCard>
          ) : (
            completed.map((order) => renderOrderCard(order, false))
          )}
        </div>
      )}

      {/* Defect Modal */}
      {defectItem && (
        <DefectModal
          item={defectItem.item}
          orderId={defectItem.orderId}
          onClose={() => setDefectItem(null)}
        />
      )}

      {/* Photo Modal */}
      {photoItem && (
        <PhotoModal
          item={photoItem.item}
          orderId={photoItem.orderId}
          onClose={() => setPhotoItem(null)}
        />
      )}
    </div>
  );
}
