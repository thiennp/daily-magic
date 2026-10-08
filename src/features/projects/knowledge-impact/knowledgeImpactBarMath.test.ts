import { describe, expect, it } from "vitest";

import {
  buildBarRects,
  formatWeekLabel,
  hasNoChartData,
} from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import {
  CHART_HEIGHT,
  CHART_PAD,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";

describe("buildBarRects", () => {
  it("scales grouped bars to the highest value", () => {
    const { rects, max } = buildBarRects(
      [
        [2, 4],
        [1, 0],
      ],
      false,
    );
    expect(max).toBe(4);
    expect(rects).toHaveLength(4);
    expect(rects[1]?.height).toBe(CHART_HEIGHT - 2 * CHART_PAD);
    expect(rects[3]?.height).toBe(0);
  });
  it("stacks the second series on top of the first", () => {
    const { rects, max } = buildBarRects([[3], [1]], true);
    expect(max).toBe(4);
    expect(rects[1]?.y).toBe(CHART_PAD);
    expect(rects[1]?.x).toBe(rects[0]?.x);
  });
});

describe("hasNoChartData", () => {
  it("is true for empty or all-zero series", () => {
    expect(hasNoChartData([[], [0, null]])).toBe(true);
    expect(hasNoChartData([[0], [0.1]])).toBe(false);
  });
});

describe("formatWeekLabel", () => {
  it("formats ISO dates and passes through garbage", () => {
    expect(formatWeekLabel("2026-10-05")).toBe("Oct 5");
    expect(formatWeekLabel("nope")).toBe("nope");
  });
});
