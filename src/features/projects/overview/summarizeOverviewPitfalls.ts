import {
  countActiveProjectPitfalls,
  type ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";

export type OverviewPitfallsSummary = {
  readonly active: number;
  readonly important: number;
  readonly warning: number;
  readonly note: number;
  readonly totalHits: number;
};

const summarizeOverviewPitfalls = (
  items: readonly ProjectPitfallView[],
): OverviewPitfallsSummary => {
  const activeItems = items.filter((item) => item.source !== "retired");
  return {
    active: countActiveProjectPitfalls(items),
    important: activeItems.filter((item) => item.severity === "block").length,
    warning: activeItems.filter((item) => item.severity === "warn").length,
    note: activeItems.filter((item) => item.severity === "info").length,
    totalHits: activeItems.reduce((sum, item) => sum + item.hitCount, 0),
  };
};

export default summarizeOverviewPitfalls;
