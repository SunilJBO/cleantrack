import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Clock } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PhotoGrid } from "../ui/photo-grid";
import { useOrderById, useOrderItems, useOrderLogs } from "../../hooks/use-orders";
import { formatDate, formatDateTime } from "../../lib/utils";
import { STAGE_ORDER } from "../../lib/constants";
import { getStaffById } from "../../data";
import { cn } from "../../lib/utils";

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = useOrderById(orderId!);
  const items = useOrderItems(orderId!);
  const logs = useOrderLogs(orderId!);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p>Order not found</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const currentStageIndex = STAGE_ORDER.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-heading text-xl font-semibold text-white">
            {order.invoiceNumber}
          </h1>
          <p className="text-sm text-slate-400">{order.customerName}</p>
        </div>
        <div className="ml-auto">
          <Badge status={order.status} dueDate={order.dueDate} />
        </div>
      </div>

      {/* Order Info */}
      <GlassCard>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Package size={16} className="text-slate-400" />
            <span className="text-slate-300">{order.itemCount} items</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-slate-300">{order.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-slate-400" />
            <span className="text-slate-300">Due {formatDate(order.dueDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-slate-400" />
            <span className="text-slate-300">Created {formatDate(order.createdAt)}</span>
          </div>
        </div>
      </GlassCard>

      {/* Timeline */}
      <GlassCard>
        <h2 className="text-sm font-semibold text-white mb-4">Progress</h2>
        <div className="flex items-center gap-1 mb-6">
          {STAGE_ORDER.map((stage, i) => (
            <div
              key={stage}
              className={cn(
                "h-2 flex-1 rounded-full transition-all",
                i <= currentStageIndex
                  ? "bg-primary-500"
                  : "bg-white/10"
              )}
            />
          ))}
        </div>

        <h2 className="text-sm font-semibold text-white mb-3">Activity Log</h2>
        <div className="space-y-3">
          {logs.map((log) => {
            const staff = getStaffById(log.staffId);
            return (
              <div key={log._id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-slate-300">
                    <span className="text-white font-medium">
                      {staff?.name ?? "Unknown"}
                    </span>{" "}
                    — {log.action.replace(/_/g, " ")}
                    {log.location && (
                      <span className="text-slate-500"> at {log.location}</span>
                    )}
                  </p>
                  {log.notes && (
                    <p className="text-slate-500 text-xs mt-0.5">{log.notes}</p>
                  )}
                  <p className="text-slate-500 text-xs">
                    {formatDateTime(log.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Items */}
      <GlassCard>
        <h2 className="text-sm font-semibold text-white mb-4">
          Items ({items.length})
        </h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
            >
              <Package size={18} className="text-slate-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.type}</p>
                {item.notes && (
                  <p className="text-xs text-slate-400 mt-0.5">{item.notes}</p>
                )}
                {item.defects.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
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
                {item.initialPhotos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-1">Drop-off Photos</p>
                    <PhotoGrid photos={item.initialPhotos} />
                  </div>
                )}
                {item.plantPhotos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-1">Plant Inspection</p>
                    <PhotoGrid photos={item.plantPhotos} />
                  </div>
                )}
                {item.completionPhotos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-1">Completion</p>
                    <PhotoGrid photos={item.completionPhotos} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
