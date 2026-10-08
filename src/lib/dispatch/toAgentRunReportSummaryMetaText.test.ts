import { describe, expect, it } from "vitest";

import { AGENT_RUN_NEON_META_MAX_CHARS } from "@/lib/dispatch/toAgentRunNeonMetaText";
import { toAgentRunReportSummaryMetaText } from "@/lib/dispatch/toAgentRunReportSummaryMetaText";

const CHANGED =
  "Changed: 2 files changed, 749 insertions(+), 1 deletion(-), 1 new file(s).";

describe("toAgentRunReportSummaryMetaText (f4bf6a0c)", () => {
  it("keeps the whole Changed line when the summary is too long", () => {
    const summary = `Reviewed implementation and documentation: Validated HTML5 markup syntax, clean layout, and repository diff. ${CHANGED}`;

    const meta = toAgentRunReportSummaryMetaText(summary);

    expect(meta.length).toBeLessThanOrEqual(AGENT_RUN_NEON_META_MAX_CHARS);
    expect(meta.endsWith(CHANGED)).toBe(true);
    expect(meta.startsWith("Reviewed implementation")).toBe(true);
    expect(meta).toContain("… Changed: ");
  });

  it("leaves short summaries untouched", () => {
    expect(toAgentRunReportSummaryMetaText(`Added a page. ${CHANGED}`)).toBe(
      `Added a page. ${CHANGED}`,
    );
  });

  it("falls back to the plain cap without a Changed line", () => {
    const meta = toAgentRunReportSummaryMetaText("x".repeat(300));
    expect(meta.length).toBe(AGENT_RUN_NEON_META_MAX_CHARS);
    expect(meta.endsWith("…")).toBe(true);
  });
});
