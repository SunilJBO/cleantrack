import type { Item } from "../types";

export const mockItems: Item[] = [
  // Order 001 - James Whitfield (3 items, at_plant)
  { _id: "item_001", orderId: "order_001", type: "Suit Jacket", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_002", orderId: "order_001", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_003", orderId: "order_001", type: "Tie", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: ["Small stain on front"] },

  // Order 002 - Emma Rodriguez (2 items, processing)
  { _id: "item_004", orderId: "order_002", type: "Silk Blouse", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Handle with care", defects: [] },
  { _id: "item_005", orderId: "order_002", type: "Dress", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: ["Loose button on sleeve"] },

  // Order 003 - David Kim (4 items, dropped_off)
  { _id: "item_006", orderId: "order_003", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_007", orderId: "order_003", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_008", orderId: "order_003", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Crease please", defects: [] },
  { _id: "item_009", orderId: "order_003", type: "Wool Coat", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 004 - Sophia Nkomo (1 item, transfer_to_plant)
  { _id: "item_010", orderId: "order_004", type: "Dress", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Wedding guest dress — urgent", defects: [] },

  // Order 005 - Robert Chang (5 items, processing, overdue)
  { _id: "item_011", orderId: "order_005", type: "Suit Jacket", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: ["Wine stain left lapel"] },
  { _id: "item_012", orderId: "order_005", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_013", orderId: "order_005", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_014", orderId: "order_005", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_015", orderId: "order_005", type: "Tie", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 006 - Lisa Okafor (2 items, completed_at_plant)
  { _id: "item_016", orderId: "order_006", type: "Skirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_017", orderId: "order_006", type: "Silk Blouse", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 007 - Michael Turner (3 items, at_plant)
  { _id: "item_018", orderId: "order_007", type: "Wool Coat", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Moth damage check requested", defects: [] },
  { _id: "item_019", orderId: "order_007", type: "Sweater", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_020", orderId: "order_007", type: "Scarf", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 008 - Anna Petrova (2 items, at_plant, overdue)
  { _id: "item_021", orderId: "order_008", type: "Curtains", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Large — 2 panels", defects: ["Fading on edges"] },
  { _id: "item_022", orderId: "order_008", type: "Curtains", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Large — 2 panels", defects: [] },

  // Order 009 - Hassan Ali (3 items, returning_to_store)
  { _id: "item_023", orderId: "order_009", type: "Suit Jacket", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_024", orderId: "order_009", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_025", orderId: "order_009", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 010 - Claire Beaumont (1 item, ready_for_pickup)
  { _id: "item_026", orderId: "order_010", type: "Dress", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 011 - Wei Zhang (6 items, dropped_off)
  { _id: "item_027", orderId: "order_011", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_028", orderId: "order_011", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_029", orderId: "order_011", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_030", orderId: "order_011", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_031", orderId: "order_011", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_032", orderId: "order_011", type: "Bedding", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "King size duvet cover", defects: [] },

  // Order 012 - Priya Sharma (2 items, transfer_to_plant)
  { _id: "item_033", orderId: "order_012", type: "Linen Pants", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_034", orderId: "order_012", type: "Silk Blouse", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 013 - Jorge Martinez (4 items, processing)
  { _id: "item_035", orderId: "order_013", type: "Suit Jacket", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_036", orderId: "order_013", type: "Trousers", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
  { _id: "item_037", orderId: "order_013", type: "Shirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "French cuffs", defects: [] },
  { _id: "item_038", orderId: "order_013", type: "Tie", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 014 - Fatima Al-Rashid (2 items, dropped_off)
  { _id: "item_039", orderId: "order_014", type: "Dress", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Delicate beadwork", defects: [] },
  { _id: "item_040", orderId: "order_014", type: "Skirt", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },

  // Order 015 - Yuki Tanaka (3 items, processing, overdue)
  { _id: "item_041", orderId: "order_015", type: "Wool Coat", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: ["Ink stain on pocket"] },
  { _id: "item_042", orderId: "order_015", type: "Sweater", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "Cashmere — low heat", defects: [] },
  { _id: "item_043", orderId: "order_015", type: "Linen Pants", initialPhotos: [], plantPhotos: [], completionPhotos: [], notes: "", defects: [] },
];
