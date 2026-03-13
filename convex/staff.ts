import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByPin = query({
  args: { pin: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("staff")
      .withIndex("by_pin", (q) => q.eq("pin", args.pin))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("staff") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("staff").collect();
  },
});
