import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { orderStatus } from "./schema";

export const list = query({
  args: {
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let orders;

    const validStatuses = [
      "dropped_off", "transfer_to_plant", "at_plant", "processing",
      "completed_at_plant", "returning_to_store", "ready_for_pickup",
    ] as const;

    if (args.status && args.status !== "all" && args.status !== "overdue") {
      const statusValue = args.status as (typeof validStatuses)[number];
      orders = await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", statusValue))
        .collect();
    } else {
      orders = await ctx.db.query("orders").collect();
    }

    if (args.status === "overdue") {
      const now = Date.now();
      orders = orders.filter(
        (o) =>
          o.dueDate < now &&
          o.status !== "ready_for_pickup" &&
          o.status !== "completed_at_plant"
      );
    }

    if (args.search) {
      const q = args.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.invoiceNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      );
    }

    return orders;
  },
});

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const metrics = query({
  args: {},
  handler: async (ctx) => {
    const allOrders = await ctx.db.query("orders").collect();
    const now = Date.now();

    const atPlant = allOrders.filter(
      (o) =>
        o.status === "at_plant" ||
        o.status === "processing" ||
        o.status === "completed_at_plant"
    ).length;

    const startOfDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime();
    const endOfDay = startOfDay + 86400000;
    const dueToday = allOrders.filter(
      (o) => o.dueDate >= startOfDay && o.dueDate < endOfDay
    ).length;

    const overdue = allOrders.filter(
      (o) =>
        o.dueDate < now &&
        o.status !== "ready_for_pickup" &&
        o.status !== "completed_at_plant"
    ).length;

    return { atPlant, dueToday, overdue };
  },
});

export const create = mutation({
  args: {
    invoiceNumber: v.string(),
    customerName: v.string(),
    dueDate: v.number(),
    status: orderStatus,
    location: v.string(),
    itemCount: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("orders", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("orders"),
    status: orderStatus,
    location: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      location: args.location,
      updatedAt: Date.now(),
    });
  },
});
