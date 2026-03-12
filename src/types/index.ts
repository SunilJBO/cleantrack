export type OrderStatus =
  | "dropped_off"
  | "transfer_to_plant"
  | "at_plant"
  | "processing"
  | "completed_at_plant"
  | "returning_to_store"
  | "ready_for_pickup";

export type StaffRole = "store" | "driver" | "plant" | "admin";

export type LogAction =
  | "created"
  | "transferred_out"
  | "plant_received"
  | "processing_started"
  | "defect_noted"
  | "completed"
  | "collected_from_plant"
  | "returned_to_store"
  | "ready_for_pickup"
  | "rescheduled";

export interface Order {
  _id: string;
  invoiceNumber: string;
  customerName: string;
  dueDate: number;
  status: OrderStatus;
  location: string;
  itemCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Item {
  _id: string;
  orderId: string;
  type: string;
  initialPhotos: string[];
  plantPhotos: string[];
  completionPhotos: string[];
  notes: string;
  defects: string[];
}

export interface Staff {
  _id: string;
  name: string;
  role: StaffRole;
  pin: string;
}

export interface LogEntry {
  _id: string;
  orderId: string;
  staffId: string;
  action: LogAction;
  timestamp: number;
  location: string;
  notes?: string;
}
