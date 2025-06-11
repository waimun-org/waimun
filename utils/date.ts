import { format } from "date-fns";

export function formatDate(date: Date | string) {
  if (typeof date === "string") date = new Date(date);
  if (date.toString() === "Invalid Date") return "Invalid Date";
  return format(date, "d MMM yyyy");
}
