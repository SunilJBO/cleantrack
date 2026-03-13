import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByOrderId = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .collect();
  },
});

export const createBatch = mutation({
  args: {
    items: v.array(
      v.object({
        orderId: v.id("orders"),
        type: v.string(),
        initialPhotos: v.array(v.string()),
        plantPhotos: v.array(v.string()),
        completionPhotos: v.array(v.string()),
        notes: v.string(),
        defects: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const item of args.items) {
      const id = await ctx.db.insert("items", item);
      ids.push(id);
    }
    return ids;
  },
});

export const addDefect = mutation({
  args: {
    id: v.id("items"),
    defect: v.string(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new Error("Item not found");
    await ctx.db.patch(args.id, {
      defects: [...item.defects, args.defect],
    });
  },
});

export const addPhotos = mutation({
  args: {
    id: v.id("items"),
    photos: v.array(v.string()),
    photoType: v.string(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new Error("Item not found");

    const field = args.photoType as
      | "initialPhotos"
      | "plantPhotos"
      | "completionPhotos";
    await ctx.db.patch(args.id, {
      [field]: [...item[field], ...args.photos],
    });
  },
});
