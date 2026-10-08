export interface DayGroup<T> {
  readonly key: string;
  readonly label: string;
  readonly items: readonly T[];
}

const dayKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

/** "Today", "Yesterday", else "8 Oct" (+ year when not the current year). */
export const formatDayLabel = (date: Date, now: Date): string => {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (dayKey(date) === dayKey(now)) return "Today";
  if (dayKey(date) === dayKey(yesterday)) return "Yesterday";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(date.getFullYear() === now.getFullYear() ? {} : { year: "numeric" }),
  });
};

/** Groups items (already newest first) by local calendar day, order kept. */
export const groupProjectReportsByDay = <T extends { createdAt: string }>(
  items: readonly T[],
  now: Date = new Date(),
): readonly DayGroup<T>[] => {
  const groups: { key: string; label: string; items: T[] }[] = [];
  for (const item of items) {
    const date = new Date(item.createdAt);
    const key = Number.isNaN(date.getTime()) ? "unknown" : dayKey(date);
    const last = groups[groups.length - 1];
    if (last !== undefined && last.key === key) {
      last.items.push(item);
    } else {
      const label = key === "unknown" ? "Earlier" : formatDayLabel(date, now);
      groups.push({ key, label, items: [item] });
    }
  }
  return groups;
};
