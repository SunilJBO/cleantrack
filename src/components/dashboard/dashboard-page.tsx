import { useState } from "react";
import type { Order } from "../../types";
import { StoreReceiveSection } from "./store-receive-section";
import { MetricsRow } from "./metrics-row";
import { OrderList } from "./order-list";
import { RescheduleModal } from "./reschedule-modal";
import { useReschedule } from "../../hooks/use-orders";

export function DashboardPage() {
  const [rescheduleOrder, setRescheduleOrder] = useState<Order | null>(null);
  const { reschedule } = useReschedule();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Overview of all active orders
        </p>
      </div>

      <StoreReceiveSection />

      <MetricsRow />

      <OrderList onReschedule={setRescheduleOrder} />

      <RescheduleModal
        order={rescheduleOrder}
        isOpen={rescheduleOrder !== null}
        onClose={() => setRescheduleOrder(null)}
        onSave={(orderId, newDueDate) => {
          reschedule(orderId, newDueDate);
        }}
      />
    </div>
  );
}
