import {
  countActiveProjectPitfalls,
  type ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";

export type OverviewPitfallsSummary = {
  readonly active: number;
  readonly mustFix: number;
  readonly warning: number;
  readonly totalHits: number;
};

const summarizeOverviewPitfalls = (
  items: readonly ProjectPitfallView[],
): OverviewPitfallsSummary => {
  const activeItems = items.filter((item) => item.source !== "retired");
  return {
    active: countActiveProjectPitfalls(items),
    mustFix: activeItems.filter((item) => item.severity === "block").length,
    warning: activeItems.filter((item) => item.severity === "warn").length,
    totalHits: activeItems.reduce((sum, item) => sum + item.hitCount, 0),
  };
};

export default summarizeOverviewPitfalls;
