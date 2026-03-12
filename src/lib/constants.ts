import type { OrderStatus, StaffRole } from "../types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  dropped_off: "Dropped Off",
  transfer_to_plant: "In Transit to Plant",
  at_plant: "At Plant",
  processing: "Processing",
  completed_at_plant: "Completed at Plant",
  returning_to_store: "Returning to Store",
  ready_for_pickup: "Ready for Pickup",
};

export const ORDER_STATUS_COLORS: Record<
  OrderStatus,
  { bg: string; text: string; dot: string }
> = {
  dropped_off: {
    bg: "bg-slate-500/20",
    text: "text-slate-300",
    dot: "bg-slate-400",
  },
  transfer_to_plant: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    dot: "bg-yellow-400",
  },
  at_plant: {
    bg: "bg-blue-500/20",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  processing: {
    bg: "bg-purple-500/20",
    text: "text-purple-300",
    dot: "bg-purple-400",
  },
  completed_at_plant: {
    bg: "bg-teal-500/20",
    text: "text-teal-300",
    dot: "bg-teal-400",
  },
  returning_to_store: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    dot: "bg-yellow-400",
  },
  ready_for_pickup: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
};

export const OVERDUE_COLORS = {
  bg: "bg-red-500/20",
  text: "text-red-300",
  dot: "bg-red-400",
};

export const STAGE_ORDER: OrderStatus[] = [
  "dropped_off",
  "transfer_to_plant",
  "at_plant",
  "processing",
  "completed_at_plant",
  "returning_to_store",
  "ready_for_pickup",
];

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  store: "Store Staff",
  driver: "Driver",
  plant: "Plant Staff",
  admin: "Admin",
};

export const ITEM_TYPES = [
  "Shirt",
  "Suit Jacket",
  "Trousers",
  "Dress",
  "Silk Blouse",
  "Wool Coat",
  "Linen Pants",
  "Tie",
  "Skirt",
  "Sweater",
  "Curtains",
  "Bedding",
] as const;
