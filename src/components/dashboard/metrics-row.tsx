import { Factory, Calendar, AlertTriangle } from "lucide-react";
import { StatCard } from "../ui/stat-card";
import { useMetrics } from "../../hooks/use-orders";

export function MetricsRow() {
  const metrics = useMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={<Factory size={24} />}
        value={metrics.atPlant}
        label="At Plant"
        accent="text-blue-400"
      />
      <StatCard
        icon={<Calendar size={24} />}
        value={metrics.dueToday}
        label="Due Today"
        accent="text-yellow-400"
      />
      <StatCard
        icon={<AlertTriangle size={24} />}
        value={metrics.overdue}
        label="Overdue"
        accent="text-red-400"
      />
    </div>
  );
}
