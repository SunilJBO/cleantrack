import { cn } from "../../lib/utils";
import type { OrderStatus } from "../../types";

type FilterValue = OrderStatus | "all" | "overdue";

interface StatusFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "overdue", label: "Overdue" },
  { value: "dropped_off", label: "Dropped Off" },
  { value: "transfer_to_plant", label: "In Transit" },
  { value: "at_plant", label: "At Plant" },
  { value: "processing", label: "Processing" },
  { value: "completed_at_plant", label: "Completed" },
  { value: "returning_to_store", label: "Returning" },
  { value: "ready_for_pickup", label: "Ready" },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all",
            value === f.value
              ? "bg-primary-500/30 text-primary-300 border border-primary-500/40"
              : "bg-white/5 text-slate-400 border border-white/8 hover:text-white hover:bg-white/10"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
