import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isPast, isTomorrow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  return format(new Date(timestamp), "MMM d, yyyy");
}

export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp), "MMM d, yyyy h:mm a");
}

export function formatRelativeDate(timestamp: number): string {
  const date = new Date(timestamp);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return `Overdue (${format(date, "MMM d")})`;
  return format(date, "MMM d");
}

export function isOverdue(dueDate: number, status: string): boolean {
  return (
    isPast(new Date(dueDate)) &&
    status !== "ready_for_pickup" &&
    status !== "completed_at_plant"
  );
}
