import { mutation } from "./_generated/server";

export const seedStaff = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if staff already exists
    const existing = await ctx.db.query("staff").first();
    if (existing) return "Staff already seeded";

    const staffMembers: Array<{ name: string; role: "store" | "driver" | "plant" | "admin"; pin: string }> = [
      { name: "Sarah Chen", role: "store", pin: "1234" },
      { name: "Mike Johnson", role: "store", pin: "5678" },
      { name: "Carlos Rivera", role: "driver", pin: "1111" },
      { name: "Aisha Patel", role: "driver", pin: "2222" },
      { name: "Tom Williams", role: "plant", pin: "3333" },
      { name: "Lina Nakamura", role: "plant", pin: "4444" },
      { name: "Sunil", role: "admin", pin: "0000" },
    ];

    for (const staff of staffMembers) {
      await ctx.db.insert("staff", staff);
    }

    return "Seeded 7 staff members";
  },
});
