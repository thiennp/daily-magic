import { describe, expect, it } from "vitest";

import selectHomeAttentionRuns, {
  HOME_ATTENTION_MAX_ROWS,
} from "@/features/home/utils/selectHomeAttentionRuns";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const NOW = Date.parse("2026-10-08T12:00:00Z");
const run = (id: string, status: string, updatedAt: string): AgentRunRecord =>
  ({ id, status, updatedAt }) as AgentRunRecord;

describe("selectHomeAttentionRuns", () => {
  it("keeps pending approvals and recent failures, newest first", () => {
    const result = selectHomeAttentionRuns(
      [
        run("old-fail", "failed", "2026-09-30T12:00:00Z"),
        run("fail", "failed", "2026-10-08T10:00:00Z"),
        run("ok", "completed", "2026-10-08T11:00:00Z"),
        run("wait", "pending_approval", "2026-10-08T11:30:00Z"),
        run("old-wait", "pending_approval", "2026-10-01T00:00:00Z"),
      ],
      NOW,
    );

    expect(result.map((r) => r.id)).toEqual(["wait", "fail", "old-wait"]);
  });

  it("leaves out runs the user stopped (4139ca18, B3)", () => {
    const stopped = {
      ...run("stopped", "failed", "2026-10-08T11:00:00Z"),
      resultOutput: "error: interrupted\nStopped by user.",
      resultExitCode: 130,
    } as AgentRunRecord;
    const reportStopped = {
      ...run("report-stopped", "failed", "2026-10-08T11:10:00Z"),
      reportStatus: "stopped",
    } as AgentRunRecord;

    expect(
      selectHomeAttentionRuns([stopped, reportStopped], NOW).map((r) => r.id),
    ).toEqual([]);
  });

  it("keeps a Stalled run when newer failures fill the list (f5881faa)", () => {
    const stalled = {
      ...run("stalled", "failed", "2026-10-08T01:00:00Z"),
      denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT,
      resultOutput: "",
    } as AgentRunRecord;
    const failures = Array.from({ length: HOME_ATTENTION_MAX_ROWS }, (_, i) =>
      run(`f${i}`, "failed", `2026-10-08T11:${String(i).padStart(2, "0")}:00Z`),
    );

    const ids = selectHomeAttentionRuns([stalled, ...failures], NOW).map(
      (r) => r.id,
    );
    expect(ids).toHaveLength(HOME_ATTENTION_MAX_ROWS);
    expect(ids.at(-1)).toBe("stalled");
  });

  it("keeps failures of the last 7 days, not just 24h (a13083ee)", () => {
    const ids = selectHomeAttentionRuns(
      [run("two-days", "failed", "2026-10-06T12:00:00Z")],
      NOW,
    ).map((r) => r.id);
    expect(ids).toEqual(["two-days"]);
  });
});
