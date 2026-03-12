import { useNavigate } from "react-router-dom";
import { ChevronRight, Package, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { GlassCard } from "../ui/glass-card";
import { formatRelativeDate, isOverdue } from "../../lib/utils";
import type { Order } from "../../types";

interface OrderRowProps {
  order: Order;
  onReschedule: (order: Order) => void;
}

export function OrderRow({ order, onReschedule }: OrderRowProps) {
  const navigate = useNavigate();
  const overdue = isOverdue(order.dueDate, order.status);

  return (
    <GlassCard
      hover
      className="flex items-center gap-4 p-4"
      onClick={() => navigate(`/orders/${order._id}`)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-white truncate">
            {order.invoiceNumber}
          </span>
          <Badge status={order.status} dueDate={order.dueDate} />
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {order.customerName && <span>{order.customerName}</span>}
          <span className="flex items-center gap-1">
            <Package size={12} />
            {order.itemCount} items
          </span>
          <span
            className={`flex items-center gap-1 ${overdue ? "text-red-400" : ""}`}
          >
            <Clock size={12} />
            {formatRelativeDate(order.dueDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-slate-500 hidden sm:block">
          {order.location}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReschedule(order);
          }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all text-xs"
          title="Reschedule"
        >
          <Clock size={14} />
        </button>
        <ChevronRight size={18} className="text-slate-500" />
      </div>
    </GlassCard>
  );
}
