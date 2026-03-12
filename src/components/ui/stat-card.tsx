import { cn } from "../../lib/utils";
import { GlassCard } from "./glass-card";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  accent?: string;
  className?: string;
}

export function StatCard({
  icon,
  value,
  label,
  accent = "text-primary-400",
  className,
}: StatCardProps) {
  return (
    <GlassCard className={cn("flex items-center gap-4", className)}>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-white/10",
          accent
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </GlassCard>
  );
}
