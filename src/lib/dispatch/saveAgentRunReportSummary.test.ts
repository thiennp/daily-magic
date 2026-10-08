import { describe, expect, it } from "vitest";

import { readAgentRunReportFields } from "@/lib/dispatch/saveAgentRunReportSummary";
import { resolveAgentRunTitleSummary } from "@/lib/dispatch/resolveAgentRunTitleSummary";

describe("readAgentRunReportFields (c1731750)", () => {
  it("reads the host summary from a result frame", () => {
    expect(
      readAgentRunReportFields({
        reportStatus: "completed",
        reportSummary: "Warm sepia reading mode implemented.",
      }),
    ).toEqual({
      reportStatus: "completed",
      reportSummary: "Warm sepia reading mode implemented.",
    });
  });

  it("caps the summary like other run meta", () => {
    const fields = readAgentRunReportFields({
      reportStatus: "failed",
      reportSummary: "x".repeat(500),
    });
    expect(fields?.reportSummary.length).toBeLessThanOrEqual(120);
  });

  it("ignores unknown statuses and empty summaries", () => {
    expect(
      readAgentRunReportFields({ reportStatus: "weird", reportSummary: "a" }),
    ).toBeNull();
    expect(
      readAgentRunReportFields({
        reportStatus: "completed",
        reportSummary: " ",
      }),
    ).toBeNull();
    expect(readAgentRunReportFields(undefined)).toBeNull();
  });
});

describe("resolveAgentRunTitleSummary (c1731750)", () => {
  it("never titles a failed run with its reason", () => {
    expect(
      resolveAgentRunTitleSummary({
        status: "failed",
        reportSummary: "Stopped by user.",
      }),
    ).toBeNull();
    expect(
      resolveAgentRunTitleSummary({
        status: "completed",
        reportSummary: "Done it.",
      }),
    ).toBe("Done it.");
  });
});
