import { useState } from "react";
import type { Order, OrderStatus } from "../../types";
import { useOrders } from "../../hooks/use-orders";
import { SearchBar } from "../ui/search-bar";
import { StatusFilter } from "./status-filter";
import { OrderRow } from "./order-row";

type FilterValue = OrderStatus | "all" | "overdue";

interface OrderListProps {
  onReschedule: (order: Order) => void;
}

export function OrderList({ onReschedule }: OrderListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all");

  const orders = useOrders({ status: statusFilter, search });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="flex-1"
        />
      </div>

      <StatusFilter value={statusFilter} onChange={setStatusFilter} />

      <div className="space-y-2">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onReschedule={onReschedule}
            />
          ))
        )}
      </div>

      <p className="text-xs text-slate-500 text-center">
        Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
