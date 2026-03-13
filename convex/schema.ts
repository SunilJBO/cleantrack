import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const orderStatus = v.union(
  v.literal("dropped_off"),
  v.literal("transfer_to_plant"),
  v.literal("at_plant"),
  v.literal("processing"),
  v.literal("completed_at_plant"),
  v.literal("returning_to_store"),
  v.literal("ready_for_pickup")
);

const staffRole = v.union(
  v.literal("store"),
  v.literal("driver"),
  v.literal("plant"),
  v.literal("admin")
);

const logAction = v.union(
  v.literal("created"),
  v.literal("transferred_out"),
  v.literal("plant_received"),
  v.literal("processing_started"),
  v.literal("defect_noted"),
  v.literal("completed"),
  v.literal("collected_from_plant"),
  v.literal("returned_to_store"),
  v.literal("ready_for_pickup"),
  v.literal("rescheduled")
);

export { orderStatus, staffRole, logAction };

export default defineSchema({
  orders: defineTable({
    invoiceNumber: v.string(),
    customerName: v.string(),
    dueDate: v.number(),
    status: orderStatus,
    location: v.string(),
    itemCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_invoiceNumber", ["invoiceNumber"]),

  items: defineTable({
    orderId: v.id("orders"),
    type: v.string(),
    initialPhotos: v.array(v.string()),
    plantPhotos: v.array(v.string()),
    completionPhotos: v.array(v.string()),
    notes: v.string(),
    defects: v.array(v.string()),
  }).index("by_orderId", ["orderId"]),

  staff: defineTable({
    name: v.string(),
    role: staffRole,
    pin: v.string(),
  }).index("by_pin", ["pin"]),

  logs: defineTable({
    orderId: v.id("orders"),
    staffId: v.id("staff"),
    action: logAction,
    timestamp: v.number(),
    location: v.string(),
    notes: v.optional(v.string()),
  }).index("by_orderId", ["orderId"]),
});
