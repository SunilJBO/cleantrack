import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Factory, Package, AlertCircle, Check, Camera } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useOrders } from "../../hooks/use-orders";
import { getItemsByOrderId } from "../../data";
import { cn, formatRelativeDate, isOverdue } from "../../lib/utils";
import type { Order } from "../../types";

export function PlantPage() {
  const navigate = useNavigate();
  const atPlant = useOrders({ status: "at_plant" });
  const processing = useOrders({ status: "processing" });
  const completed = useOrders({ status: "completed_at_plant" });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const allOrders = [...atPlant, ...processing, ...completed];

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
      <div className="grid grid-cols-3 gap-3">
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

      {/* Order list */}
      <div className="space-y-2">
        {allOrders.map((order) => {
          const items = getItemsByOrderId(order._id);
          const isExpanded = expandedOrder === order._id;
          const overdue = isOverdue(order.dueDate, order.status);

          return (
            <GlassCard key={order._id} className="p-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() =>
                  setExpandedOrder(isExpanded ? null : order._id)
                }
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
                      <Package
                        size={16}
                        className="text-slate-400 mt-0.5 shrink-0"
                      />
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
                      <div className="flex gap-1 shrink-0">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
                          title="Add defect note"
                        >
                          <AlertCircle size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                          title="Add photo"
                        >
                          <Camera size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {order.status !== "completed_at_plant" && (
                    <Button
                      className="w-full"
                      onClick={() =>
                        alert(`Marked ${order.invoiceNumber} as completed`)
                      }
                    >
                      <Check size={16} />
                      Mark All Complete
                    </Button>
                  )}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
