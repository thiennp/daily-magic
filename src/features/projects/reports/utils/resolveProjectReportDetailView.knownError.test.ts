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
});
