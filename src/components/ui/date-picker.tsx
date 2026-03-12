import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { cn } from "../../lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  className,
}: DatePickerProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Calendar size={18} />
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-xl bg-white/8 border border-white/12 pl-10 pr-4 py-2.5 text-sm text-white",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50",
            "transition-all duration-200",
            "[color-scheme:dark]"
          )}
        />
      </div>
    </div>
  );
}
