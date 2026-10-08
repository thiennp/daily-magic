import { describe, expect, it } from "vitest";

import {
  buildPolylineSegments,
  buildSeriesPoints,
  CHART_HEIGHT,
  CHART_PAD,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";

describe("buildSeriesPoints", () => {
  it("places the max value at the top and zero on the baseline", () => {
    const points = buildSeriesPoints([0, 0.5], 0.5);
    expect(points[0]?.y).toBe(CHART_HEIGHT - CHART_PAD);
    expect(points[1]?.y).toBe(CHART_PAD);
  });
  it("keeps gaps as null and centres a single point", () => {
    const points = buildSeriesPoints([null, 0.2, null], 0.4);
    expect(points[0]).toBeNull();
    expect(points[2]).toBeNull();
    expect(buildSeriesPoints([0.1], 0.2)[0]?.x).toBeGreaterThan(CHART_PAD);
  });
});

describe("buildPolylineSegments", () => {
  it("splits at gaps", () => {
    const a = { x: 1, y: 1 };
    const b = { x: 2, y: 2 };
    const c = { x: 3, y: 3 };
    expect(buildPolylineSegments([a, b, null, c])).toEqual([[a, b], [c]]);
  });
});
