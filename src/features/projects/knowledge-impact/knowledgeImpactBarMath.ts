import {
  CHART_HEIGHT,
  CHART_PAD,
  CHART_WIDTH,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";

export type BarRect = {
  readonly seriesIndex: number;
  readonly categoryIndex: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/** True when no value is above zero (the chart would be empty). */
export const hasNoChartData = (
  series: readonly (readonly (number | null)[])[],
): boolean => series.every((values) => values.every((v) => (v ?? 0) <= 0));

const axisMax = (
  series: readonly (readonly number[])[],
  count: number,
  stacked: boolean,
): number =>
  Math.max(
    1,
    ...Array.from({ length: count }, (_, c) =>
      stacked
        ? series.reduce((sum, v) => sum + (v[c] ?? 0), 0)
        : Math.max(0, ...series.map((v) => v[c] ?? 0)),
    ),
  );

/** Grouped or stacked bar rectangles; also returns the axis max used for scaling. */
export const buildBarRects = (
  series: readonly (readonly number[])[],
  stacked: boolean,
): { readonly rects: BarRect[]; readonly max: number } => {
  const count = Math.max(0, ...series.map((values) => values.length));
  const slot = (CHART_WIDTH - 2 * CHART_PAD) / Math.max(1, count);
  const group = Math.max(4, slot - 6);
  const inner = CHART_HEIGHT - 2 * CHART_PAD;
  const max = axisMax(series, count, stacked);
  const rects = series.flatMap((values, seriesIndex) =>
    values.map((value, categoryIndex): BarRect => {
      const height = (value / max) * inner;
      const below = stacked
        ? series
            .slice(0, seriesIndex)
            .reduce((sum, v) => sum + (v[categoryIndex] ?? 0), 0)
        : 0;
      const width = stacked ? group : group / series.length;
      return {
        seriesIndex,
        categoryIndex,
        x:
          CHART_PAD +
          categoryIndex * slot +
          (slot - group) / 2 +
          (stacked ? 0 : seriesIndex * width),
        y: CHART_HEIGHT - CHART_PAD - height - (below / max) * inner,
        width,
        height,
      };
    }),
  );
  return { rects, max };
};

/** "2026-10-05" -> "Oct 5". */
export const formatWeekLabel = (weekStart: string): string => {
  const date = new Date(`${weekStart}T00:00:00Z`);
  return Number.isNaN(date.getTime())
    ? weekStart
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
};
