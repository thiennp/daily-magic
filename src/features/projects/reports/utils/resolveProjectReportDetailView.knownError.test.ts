import { describe, expect, it } from "vitest";

import { resolveProjectReportDetailView } from "@/features/projects/reports/utils/resolveProjectReportDetailView";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const AGY_429 = [
  "error: Individual quota reached. Resets in 44m20s.",
  'AGY_ERROR: {"error":{"code":429,"status":"RESOURCE_EXHAUSTED"}}',
].join("\n");

describe("Reports known CLI error (9b3947bc)", () => {
  it("What happened is one sentence; the raw error stays in details", () => {
    const view = resolveProjectReportDetailView({
      run: {
        status: "failed",
        reportSummary: null,
        reportStatus: null,
        denialReason: null,
        resultOutput: AGY_429,
        resultExitCode: 3,
      } satisfies Partial<AgentRunRecord>,
      fallbackOutput: "",
      cached: undefined,
    });
    expect(view.body).toBe("Antigravity quota reached; resets in 44m.");
    expect(view.details).toContain("AGY_ERROR");
  });

  it("other failures keep their body and have no details", () => {
    const view = resolveProjectReportDetailView({
      run: {
        status: "failed",
        reportSummary: null,
        reportStatus: null,
        denialReason: null,
        resultOutput: "npm run build failed",
        resultExitCode: 1,
      } satisfies Partial<AgentRunRecord>,
      fallbackOutput: "",
      cached: undefined,
    });
    expect(view.details).toBeNull();
  });
  it("Done shows the persisted host summary (c1731750)", () => {
    const view = resolveProjectReportDetailView({
      run: {
        status: "completed",
        reportSummary:
          "Warm sepia reading mode implemented in index.html and documented in README.md.",
        reportStatus: "completed",
        denialReason: null,
        resultOutput: "Run workflow: Add vibe coding app feature",
        resultExitCode: 0,
      } satisfies Partial<AgentRunRecord>,
      fallbackOutput: "",
      cached: undefined,
    });
    expect(view.body).toBe(
      "Warm sepia reading mode implemented in index.html and documented in README.md.",
    );
  });

  it("a killed run says so; Details hold the last output, never the same line (c1731750)", () => {
    const note =
      "The agent process was stopped unexpectedly (killed by SIGKILL).";
    const run = {
      status: "failed",
      reportSummary: note,
      reportStatus: "failed",
      denialReason: null,
      resultOutput: note,
      resultExitCode: -1,
    } satisfies Partial<AgentRunRecord>;
    const bare = resolveProjectReportDetailView({
      run,
      fallbackOutput: "",
      cached: undefined,
    });
    expect(bare.body).toBe(note);
    expect(bare.details).toBeNull();
    const withOutput = resolveProjectReportDetailView({
      run,
      fallbackOutput: `Reading index.html…\n${note}`,
      cached: undefined,
    });
    expect(withOutput.body).toBe(note);
    expect(withOutput.details).toContain("Reading index.html…");
  });
});
