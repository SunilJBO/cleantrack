import type { LogEntry } from "../types";

const now = Date.now();
const DAY = 86400000;
const HOUR = 3600000;

export const mockLogs: LogEntry[] = [
  // Order 001 journey
  { _id: "log_001", orderId: "order_001", staffId: "staff_001", action: "created", timestamp: now - 5 * DAY, location: "Store A" },
  { _id: "log_002", orderId: "order_001", staffId: "staff_003", action: "transferred_out", timestamp: now - 4 * DAY, location: "Store A" },
  { _id: "log_003", orderId: "order_001", staffId: "staff_005", action: "plant_received", timestamp: now - 4 * DAY + 2 * HOUR, location: "Plant" },

  // Order 002 journey
  { _id: "log_004", orderId: "order_002", staffId: "staff_001", action: "created", timestamp: now - 3 * DAY, location: "Store A" },
  { _id: "log_005", orderId: "order_002", staffId: "staff_003", action: "transferred_out", timestamp: now - 2 * DAY, location: "Store A" },
  { _id: "log_006", orderId: "order_002", staffId: "staff_006", action: "plant_received", timestamp: now - 2 * DAY + 2 * HOUR, location: "Plant" },
  { _id: "log_007", orderId: "order_002", staffId: "staff_005", action: "processing_started", timestamp: now - 1 * DAY, location: "Plant" },

  // Order 003 journey
  { _id: "log_008", orderId: "order_003", staffId: "staff_002", action: "created", timestamp: now - 1 * DAY, location: "Store A" },

  // Order 004 journey
  { _id: "log_009", orderId: "order_004", staffId: "staff_001", action: "created", timestamp: now - 2 * DAY, location: "Store A" },
  { _id: "log_010", orderId: "order_004", staffId: "staff_004", action: "transferred_out", timestamp: now - 3 * HOUR, location: "Store A" },

  // Order 005 journey
  { _id: "log_011", orderId: "order_005", staffId: "staff_002", action: "created", timestamp: now - 6 * DAY, location: "Store A" },
  { _id: "log_012", orderId: "order_005", staffId: "staff_003", action: "transferred_out", timestamp: now - 5 * DAY, location: "Store A" },
  { _id: "log_013", orderId: "order_005", staffId: "staff_005", action: "plant_received", timestamp: now - 5 * DAY + 3 * HOUR, location: "Plant" },
  { _id: "log_014", orderId: "order_005", staffId: "staff_006", action: "processing_started", timestamp: now - 4 * DAY, location: "Plant" },
  { _id: "log_015", orderId: "order_005", staffId: "staff_005", action: "defect_noted", timestamp: now - 3 * DAY, location: "Plant", notes: "Wine stain on suit jacket left lapel" },

  // Order 006 journey (completed)
  { _id: "log_016", orderId: "order_006", staffId: "staff_001", action: "created", timestamp: now - 4 * DAY, location: "Store A" },
  { _id: "log_017", orderId: "order_006", staffId: "staff_004", action: "transferred_out", timestamp: now - 3 * DAY, location: "Store A" },
  { _id: "log_018", orderId: "order_006", staffId: "staff_006", action: "plant_received", timestamp: now - 3 * DAY + 2 * HOUR, location: "Plant" },
  { _id: "log_019", orderId: "order_006", staffId: "staff_005", action: "processing_started", timestamp: now - 2 * DAY, location: "Plant" },
  { _id: "log_020", orderId: "order_006", staffId: "staff_005", action: "completed", timestamp: now - 2 * HOUR, location: "Plant" },

  // Order 007 journey
  { _id: "log_021", orderId: "order_007", staffId: "staff_002", action: "created", timestamp: now - 2 * DAY, location: "Store B" },
  { _id: "log_022", orderId: "order_007", staffId: "staff_003", action: "transferred_out", timestamp: now - 1 * DAY, location: "Store B" },
  { _id: "log_023", orderId: "order_007", staffId: "staff_005", action: "plant_received", timestamp: now - 1 * DAY + 3 * HOUR, location: "Plant" },

  // Order 008 journey (overdue at plant)
  { _id: "log_024", orderId: "order_008", staffId: "staff_001", action: "created", timestamp: now - 7 * DAY, location: "Store A" },
  { _id: "log_025", orderId: "order_008", staffId: "staff_004", action: "transferred_out", timestamp: now - 6 * DAY, location: "Store A" },
  { _id: "log_026", orderId: "order_008", staffId: "staff_006", action: "plant_received", timestamp: now - 6 * DAY + 2 * HOUR, location: "Plant" },

  // Order 009 journey (returning)
  { _id: "log_027", orderId: "order_009", staffId: "staff_002", action: "created", timestamp: now - 5 * DAY, location: "Store B" },
  { _id: "log_028", orderId: "order_009", staffId: "staff_003", action: "transferred_out", timestamp: now - 4 * DAY, location: "Store B" },
  { _id: "log_029", orderId: "order_009", staffId: "staff_005", action: "plant_received", timestamp: now - 4 * DAY + 2 * HOUR, location: "Plant" },
  { _id: "log_030", orderId: "order_009", staffId: "staff_006", action: "processing_started", timestamp: now - 3 * DAY, location: "Plant" },
  { _id: "log_031", orderId: "order_009", staffId: "staff_006", action: "completed", timestamp: now - 2 * DAY, location: "Plant" },
  { _id: "log_032", orderId: "order_009", staffId: "staff_004", action: "collected_from_plant", timestamp: now - 1 * HOUR, location: "Plant" },

  // Order 010 (ready for pickup)
  { _id: "log_033", orderId: "order_010", staffId: "staff_001", action: "created", timestamp: now - 4 * DAY, location: "Store A" },
  { _id: "log_034", orderId: "order_010", staffId: "staff_003", action: "transferred_out", timestamp: now - 3 * DAY, location: "Store A" },
  { _id: "log_035", orderId: "order_010", staffId: "staff_005", action: "plant_received", timestamp: now - 3 * DAY + 2 * HOUR, location: "Plant" },
  { _id: "log_036", orderId: "order_010", staffId: "staff_005", action: "completed", timestamp: now - 2 * DAY, location: "Plant" },
  { _id: "log_037", orderId: "order_010", staffId: "staff_004", action: "collected_from_plant", timestamp: now - 1 * DAY, location: "Plant" },
  { _id: "log_038", orderId: "order_010", staffId: "staff_004", action: "returned_to_store", timestamp: now - 18 * HOUR, location: "Store A" },
  { _id: "log_039", orderId: "order_010", staffId: "staff_001", action: "ready_for_pickup", timestamp: now - 6 * HOUR, location: "Store A" },

  // Order 011 (just dropped off)
  { _id: "log_040", orderId: "order_011", staffId: "staff_002", action: "created", timestamp: now, location: "Store B" },

  // Order 012 (in transit)
  { _id: "log_041", orderId: "order_012", staffId: "staff_001", action: "created", timestamp: now - 1 * DAY, location: "Store A" },
  { _id: "log_042", orderId: "order_012", staffId: "staff_003", action: "transferred_out", timestamp: now - 2 * HOUR, location: "Store A" },

  // Order 013 (processing)
  { _id: "log_043", orderId: "order_013", staffId: "staff_002", action: "created", timestamp: now - 3 * DAY, location: "Store B" },
  { _id: "log_044", orderId: "order_013", staffId: "staff_004", action: "transferred_out", timestamp: now - 2 * DAY, location: "Store B" },
  { _id: "log_045", orderId: "order_013", staffId: "staff_006", action: "plant_received", timestamp: now - 2 * DAY + 3 * HOUR, location: "Plant" },
  { _id: "log_046", orderId: "order_013", staffId: "staff_005", action: "processing_started", timestamp: now - 8 * HOUR, location: "Plant" },

  // Order 014 (just dropped off)
  { _id: "log_047", orderId: "order_014", staffId: "staff_001", action: "created", timestamp: now, location: "Store A" },

  // Order 015 (processing, overdue)
  { _id: "log_048", orderId: "order_015", staffId: "staff_001", action: "created", timestamp: now - 8 * DAY, location: "Store A" },
  { _id: "log_049", orderId: "order_015", staffId: "staff_003", action: "transferred_out", timestamp: now - 7 * DAY, location: "Store A" },
  { _id: "log_050", orderId: "order_015", staffId: "staff_005", action: "plant_received", timestamp: now - 7 * DAY + 2 * HOUR, location: "Plant" },
  { _id: "log_051", orderId: "order_015", staffId: "staff_006", action: "processing_started", timestamp: now - 5 * DAY, location: "Plant" },
  { _id: "log_052", orderId: "order_015", staffId: "staff_005", action: "defect_noted", timestamp: now - 3 * DAY, location: "Plant", notes: "Ink stain on wool coat pocket — requires specialist treatment" },
];
