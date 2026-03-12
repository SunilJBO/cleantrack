import { useState, useMemo, useCallback } from "react";
import type { Order, OrderStatus } from "../types";
import {
  getAllOrders,
  getOrderById,
  getOrdersAtPlant,
  getOrdersDueToday,
  getOverdueOrders,
  getItemsByOrderId,
  getLogsByOrderId,
  searchOrders as searchOrdersData,
} from "../data";
import { isOverdue } from "../lib/utils";

export function useOrders(filters?: {
  status?: OrderStatus | "all" | "overdue";
  search?: string;
}) {
  const orders = useMemo(() => {
    let result = getAllOrders();

    if (filters?.search) {
      result = searchOrdersData(filters.search);
    }

    if (filters?.status && filters.status !== "all") {
      if (filters.status === "overdue") {
        result = result.filter((o) => isOverdue(o.dueDate, o.status));
      } else {
        result = result.filter((o) => o.status === filters.status);
      }
    }

    return result;
  }, [filters?.status, filters?.search]);

  return orders;
}

export function useOrderById(id: string) {
  return useMemo(() => getOrderById(id), [id]);
}

export function useOrderItems(orderId: string) {
  return useMemo(() => getItemsByOrderId(orderId), [orderId]);
}

export function useOrderLogs(orderId: string) {
  return useMemo(() => getLogsByOrderId(orderId), [orderId]);
}

export function useMetrics() {
  return useMemo(
    () => ({
      atPlant: getOrdersAtPlant().length,
      dueToday: getOrdersDueToday().length,
      overdue: getOverdueOrders().length,
    }),
    []
  );
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
