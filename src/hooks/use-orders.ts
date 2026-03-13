import { useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { OrderStatus } from "../types";
import type { Id } from "../../convex/_generated/dataModel";

export function useOrders(filters?: {
  status?: OrderStatus | "all" | "overdue";
  search?: string;
}) {
  const orders = useQuery(api.orders.list, {
    status: filters?.status,
    search: filters?.search,
  });
  return orders ?? [];
}

export function useOrderById(id: string) {
  const order = useQuery(api.orders.getById, {
    id: id as Id<"orders">,
  });
  return order ?? undefined;
}

export function useOrderItems(orderId: string) {
  const items = useQuery(api.items.getByOrderId, {
    orderId: orderId as Id<"orders">,
  });
  return items ?? [];
}

export function useOrderLogs(orderId: string) {
  const logs = useQuery(api.logs.getByOrderId, {
    orderId: orderId as Id<"orders">,
  });
  return logs ?? [];
}

export function useMetrics() {
  const metrics = useQuery(api.orders.metrics);
  return metrics ?? { atPlant: 0, dueToday: 0, overdue: 0 };
}

export function useReschedule() {
  const [orders, setOrders] = useState<Map<string, number>>(new Map());

  const reschedule = useCallback((orderId: string, newDueDate: number) => {
    setOrders((prev) => new Map(prev).set(orderId, newDueDate));
  }, []);

  const getRescheduledDate = useCallback(
    (orderId: string, originalDate: number) => {
      return orders.get(orderId) ?? originalDate;
    },
    [orders]
  );

  return { reschedule, getRescheduledDate };
}
