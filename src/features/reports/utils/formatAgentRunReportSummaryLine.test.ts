import { describe, expect, it } from "vitest";

import { formatAgentRunReportSummaryLine } from "@/features/reports/utils/formatAgentRunReportSummaryLine";

describe("formatAgentRunReportSummaryLine", () => {
  it("returns trimmed summary or null", () => {
    expect(formatAgentRunReportSummaryLine("  Estimating…  ")).toBe(
      "Estimating…",
    );
    expect(formatAgentRunReportSummaryLine("")).toBeNull();
    expect(formatAgentRunReportSummaryLine(null)).toBeNull();
  });
});
