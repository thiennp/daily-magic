import { describe, expect, it } from "vitest";

import type { AgentRunReportFile } from "./agentWitchRunReport";
import { readFinishedRunReportFields } from "./readFinishedRunReportFields";

const report = (
  status: AgentRunReportFile["status"],
  userSummary: string,
): AgentRunReportFile => ({
  reportKey: "k",
  agentRunId: "r",
  status,
  updatedAt: "2026-10-08T18:31:42.838Z",
  userSummary,
  history: [],
});

describe("readFinishedRunReportFields (c1731750)", () => {
  it("returns the final host summary for the result frame", () => {
    const summary =
      "Warm sepia reading mode implemented in index.html and documented in README.md.";
    expect(
      readFinishedRunReportFields("k", () => report("completed", summary)),
    ).toEqual({ reportStatus: "completed", reportSummary: summary });
    expect(
      readFinishedRunReportFields("k", () =>
        report("stopped", "Stopped by user."),
      ),
    ).toEqual({ reportStatus: "stopped", reportSummary: "Stopped by user." });
  });

  it("sends nothing for a live or missing report", () => {
    expect(
      readFinishedRunReportFields("k", () =>
        report("in_progress", "Working on your computer…"),
      ),
    ).toEqual({});
    expect(readFinishedRunReportFields("k", () => null)).toEqual({});
    expect(readFinishedRunReportFields(undefined, () => null)).toEqual({});
  });
});
