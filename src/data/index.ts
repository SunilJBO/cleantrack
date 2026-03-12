import type { Order, OrderStatus, Item, LogEntry, Staff } from "../types";
import { mockOrders } from "./mock-orders";
import { mockItems } from "./mock-items";
import { mockLogs } from "./mock-logs";
import { mockStaff } from "./mock-staff";
import { isOverdue } from "../lib/utils";

export function getAllOrders(): Order[] {
  return mockOrders;
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o._id === id);
}

export function getOrderByInvoice(invoiceNumber: string): Order | undefined {
  return mockOrders.find((o) => o.invoiceNumber === invoiceNumber);
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter((o) => o.status === status);
}

export function getOverdueOrders(): Order[] {
  return mockOrders.filter((o) => isOverdue(o.dueDate, o.status));
}

export function getOrdersDueToday(): Order[] {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfDay = startOfDay + 86400000;
  return mockOrders.filter(
    (o) => o.dueDate >= startOfDay && o.dueDate < endOfDay
  );
}

export function getOrdersAtPlant(): Order[] {
  return mockOrders.filter(
    (o) =>
      o.status === "at_plant" ||
      o.status === "processing" ||
      o.status === "completed_at_plant"
  );
}

export function searchOrders(query: string): Order[] {
  const q = query.toLowerCase();
  return mockOrders.filter(
    (o) =>
      o.invoiceNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q)
  );
}

export function getItemsByOrderId(orderId: string): Item[] {
  return mockItems.filter((i) => i.orderId === orderId);
}

export function getLogsByOrderId(orderId: string): LogEntry[] {
  return mockLogs
    .filter((l) => l.orderId === orderId)
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function getAllStaff(): Staff[] {
  return mockStaff;
}

export function getStaffById(id: string): Staff | undefined {
  return mockStaff.find((s) => s._id === id);
}

export function getStaffByPin(pin: string): Staff | undefined {
  return mockStaff.find((s) => s.pin === pin);
}

export { mockOrders, mockItems, mockLogs, mockStaff };
