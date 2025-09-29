// utils/formatDate.js
import dayjs from "dayjs";

export function formatDate(dateString, format = "MMMM D, YYYY") {
  if (!dateString) return "—"; // fallback for missing date
  return dayjs(dateString).format(format);
}
