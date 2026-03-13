import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { logAction } from "./schema";

export const getByOrderId = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("logs")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .collect();
    return logs.sort((a, b) => a.timestamp - b.timestamp);
  },
});

export const create = mutation({
  args: {
    orderId: v.id("orders"),
    staffId: v.id("staff"),
    action: logAction,
    timestamp: v.number(),
    location: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("logs", args);
  },
});
