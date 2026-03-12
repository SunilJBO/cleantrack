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

// --- Mutation helpers (mock persistence, in-memory only) ---

let idCounter = Date.now();
function generateId(prefix: string) {
  return `${prefix}_${++idCounter}`;
}

export function addOrder(data: Omit<Order, "_id" | "createdAt" | "updatedAt">): Order {
  const now = Date.now();
  const order: Order = {
    ...data,
    _id: generateId("order"),
    createdAt: now,
    updatedAt: now,
  };
  mockOrders.unshift(order);
  return order;
}

export function addItems(items: Omit<Item, "_id">[]): Item[] {
  const created = items.map((item) => ({
    ...item,
    _id: generateId("item"),
  }));
  mockItems.push(...created);
  return created;
}

export function addLog(data: Omit<LogEntry, "_id">): LogEntry {
  const log: LogEntry = {
    ...data,
    _id: generateId("log"),
  };
  mockLogs.push(log);
  return log;
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  location: string
): Order | undefined {
  const order = mockOrders.find((o) => o._id === orderId);
  if (order) {
    order.status = status;
    order.location = location;
    order.updatedAt = Date.now();
  }
  return order;
}

export function getItemById(itemId: string): Item | undefined {
  return mockItems.find((i) => i._id === itemId);
}

export function updateItemDefect(itemId: string, defect: string): Item | undefined {
  const item = mockItems.find((i) => i._id === itemId);
  if (item) {
    item.defects.push(defect);
  }
  return item;
}

export function addItemPhotos(
  itemId: string,
  photoUrls: string[],
  photoType: "initialPhotos" | "plantPhotos" | "completionPhotos"
): Item | undefined {
  const item = mockItems.find((i) => i._id === itemId);
  if (item) {
    item[photoType].push(...photoUrls);
  }
  return item;
}

export { mockOrders, mockItems, mockLogs, mockStaff };
