import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LaneCompareHelpPanel from "@/features/projects/access/laneCompare/LaneCompareHelpPanel";
import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/laneCompareCopy.constant";

describe("LaneCompareHelpPanel render", () => {
  it("renders title, both path cards, and diffs", () => {
    const html = renderToStaticMarkup(createElement(LaneCompareHelpPanel));
    expect(html).toContain(LANE_COMPARE_COPY.title);
    expect(html).toContain(LANE_COMPARE_COPY.codingTools.label);
    expect(html).toContain(LANE_COMPARE_COPY.assistant.label);
    expect(html).toContain(LANE_COMPARE_COPY.diff.results);
    expect(html).toContain(LANE_COMPARE_COPY.diff.approvals);
    expect(html).not.toMatch(/\bLane A\b|\bLane B\b|\bMCP\b|\bbot\b/i);
  });
});
