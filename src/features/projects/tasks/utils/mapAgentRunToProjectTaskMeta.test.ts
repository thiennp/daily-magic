import { describe, expect, it } from "vitest";

import { mapAgentRunToProjectTaskMeta } from "@/features/projects/tasks/utils/mapAgentRunToProjectTaskMeta";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const run = (
  overrides: Partial<EnrichedAgentRunRecord>,
): EnrichedAgentRunRecord =>
  ({
    id: "run-1",
    prompt: "Run workflow: Add vibe coding app feature",
    reportSummary: null,
    status: "failed",
    denialReason: null,
    resultOutput: null,
    resultExitCode: null,
    executorEmail: "host@example.com",
    createdAt: "2026-10-08T10:32:00.000Z",
    updatedAt: "2026-10-08T10:33:00.000Z",
    startedAt: null,
    completedAt: null,
    ...overrides,
  }) as EnrichedAgentRunRecord;

describe("mapAgentRunToProjectTaskMeta", () => {
  it("keeps the title and adds the lost-connection reason for a disconnected run", () => {
    const meta = mapAgentRunToProjectTaskMeta(
      run({
        denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT,
        resultOutput: "partial output",
      }),
      "p1",
    );
    expect(meta.title).toBe("Run workflow: Add vibe coding app feature");
    expect(meta.status).toBe("failed");
    expect(meta.statusReason).toBe(
      "Lost connection to your computer — this task stopped.",
    );
  });

  it("shows a swept stale run as Stalled with its last update (41888ea3)", () => {
    const meta = mapAgentRunToProjectTaskMeta(
      run({ denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.STALE }),
      "p1",
    );
    expect(meta.status).toBe("stalled");
    expect(meta.statusReason).toMatch(/^Last update from your computer .+\.$/);
  });

  it("shows an old lost-connection run with no output as Stalled (f5881faa)", () => {
    const meta = mapAgentRunToProjectTaskMeta(
      run({ denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT }),
      "p1",
    );
    expect(meta.status).toBe("stalled");
    expect(meta.statusReason).not.toMatch(/^Stalled/);
  });

  it("shows Stopped (no reason) for a user-stopped run", () => {
    const meta = mapAgentRunToProjectTaskMeta(
      run({ resultOutput: "error: interrupted\nStopped by user." }),
      "p1",
    );
    expect(meta.status).toBe("stopped");
    expect(meta.statusReason).toBeNull();
  });

  it("has no reason for completed runs", () => {
    const meta = mapAgentRunToProjectTaskMeta(
      run({ status: "completed", denialReason: "ignored" }),
      "p1",
    );
    expect(meta.status).toBe("done");
    expect(meta.statusReason).toBeNull();
  });

  it("keeps the user's title and shows the Done summary separately (f4bf6a0c)", () => {
    const summary =
      "Added the settings screen. Changed: 2 files changed, 749 insertions(+), 1 deletion(-), 1 new file(s)";
    const meta = mapAgentRunToProjectTaskMeta(
      run({ status: "completed", reportSummary: summary }),
      "p1",
    );
    expect(meta.title).toBe("Run workflow: Add vibe coding app feature");
    expect(meta.summaryLine).toBe(summary);
  });
});
