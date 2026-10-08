const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Design date format: 08 Oct 2026. */
export default function formatAccountDate(value: number | Date): string {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
