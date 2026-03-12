import { cn } from "../../lib/utils";
import { isOverdue } from "../../lib/utils";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  OVERDUE_COLORS,
} from "../../lib/constants";
import type { OrderStatus } from "../../types";

interface BadgeProps {
  status: OrderStatus;
  dueDate?: number;
  className?: string;
}

export function Badge({ status, dueDate, className }: BadgeProps) {
  const overdue = dueDate !== undefined && isOverdue(dueDate, status);
  const colors = overdue ? OVERDUE_COLORS : ORDER_STATUS_COLORS[status];
  const label = overdue ? "Overdue" : ORDER_STATUS_LABELS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      {label}
    </span>
  );
}
