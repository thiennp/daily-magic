import type { AwcProjectPitfallRow } from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";

export type AwcPitfallSeverityFilter = "all" | AwcProjectPitfallRow["severity"];

export type AwcPitfallSeverityCounts = Readonly<
  Record<AwcPitfallSeverityFilter, number>
>;

const matchesQuery = (row: AwcProjectPitfallRow, needle: string): boolean =>
  needle === "" ||
  row.title.toLowerCase().includes(needle) ||
  row.situation.toLowerCase().includes(needle) ||
  row.fix.toLowerCase().includes(needle) ||
  row.triggers.some((trigger) => trigger.toLowerCase().includes(needle));

/** Chip filter + keyword search over title, situation, fix and triggers. */
const filterAwcProjectPitfallRows = (
  rows: readonly AwcProjectPitfallRow[],
  filter: AwcPitfallSeverityFilter,
  query: string,
): readonly AwcProjectPitfallRow[] => {
  const needle = query.trim().toLowerCase();
  return rows.filter(
    (row) =>
      (filter === "all" || row.severity === filter) &&
      matchesQuery(row, needle),
  );
};

export const countAwcPitfallRowsBySeverity = (
  rows: readonly AwcProjectPitfallRow[],
): AwcPitfallSeverityCounts => ({
  all: rows.length,
  block: rows.filter((row) => row.severity === "block").length,
  warn: rows.filter((row) => row.severity === "warn").length,
  info: rows.filter((row) => row.severity === "info").length,
});

export default filterAwcProjectPitfallRows;
