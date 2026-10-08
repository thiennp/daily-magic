import { describe, expect, it } from "vitest";

import { resolveAgentRunReportProgressView } from "@/features/reports/utils/resolveAgentRunReportProgressView";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";

describe("resolveAgentRunReportProgressView", () => {
  it("drops the echoed launch command and shows the failure reason (S5/S10)", () => {
    expect(
      resolveAgentRunReportProgressView({
        runStatus: "failed",
        reportStatus: "in_progress",
        reportSummary:
          'agent-witch@mac ~ % agy --sandbox -p "Run workflow…"\nagent-witch@linux ~ $',
        denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT,
      }),
    ).toEqual({
      summaryLine: null,
      statusLabel: "failed",
      reasonLine: "Lost connection to your computer — this task stopped.",
    });
  });

  it("labels a user-stopped run Stopped without a reason (S9)", () => {
    expect(
      resolveAgentRunReportProgressView({
        runStatus: "failed",
        reportSummary: "Analyzing the repo",
        resultOutput: "error: interrupted\nStopped by user.",
        denialReason: "ignored",
      }),
    ).toEqual({
      summaryLine: "Analyzing the repo",
      statusLabel: "stopped",
      reasonLine: null,
    });
  });

  it("keeps the host report status while the run is still going", () => {
    expect(
      resolveAgentRunReportProgressView({
        runStatus: "running",
        reportStatus: "in_progress",
        reportSummary: "Editing files",
        denialReason: "not yet",
      }),
    ).toEqual({
      summaryLine: "Editing files",
      statusLabel: "in progress",
      reasonLine: null,
    });
  });
});
