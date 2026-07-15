import { describe, expect, it } from "vitest";

import { buildViewerAgentRunsList } from "@/features/reports/utils/buildViewerAgentRunsList";
import { AgentRunScope } from "@/lib/dispatch/AgentRunScope.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const baseRun = (
  overrides: Partial<AgentRunRecord> & Pick<AgentRunRecord, "id">,
): AgentRunRecord => ({
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  prompt: "run tests",
  status: AgentRunStatus.COMPLETED,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: "ok",
  resultExitCode: 0,
  denialReason: null,
  createdAt: "2026-07-14T20:00:00.000Z",
  updatedAt: "2026-07-14T20:00:00.000Z",
  startedAt: "2026-07-14T20:00:00.000Z",
  completedAt: "2026-07-14T20:01:00.000Z",
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  ...overrides,
});

describe("buildViewerAgentRunsList", () => {
  it("merges cached runs with api runs and prefers api enrichment", () => {
    const cached = baseRun({ id: "run-1", resultOutput: null });
    const apiRuns = [
      {
        ...cached,
        resultOutput: "done",
        requesterEmail: "you@example.com",
        executorEmail: "you@example.com",
        requesterName: "You",
        executorName: "You",
      },
    ];

    const runs = buildViewerAgentRunsList({
      userId: "user-1",
      apiRuns,
      cachedRuns: [cached],
      statusFilter: "all",
      scopeFilter: AgentRunScope.ALL,
      groupFilter: "",
    });

    expect(runs).toHaveLength(1);
    expect(runs[0]?.resultOutput).toBe("done");
    expect(runs[0]?.requesterName).toBe("You");
  });

  it("shows cached-only runs when the api returns an empty list", () => {
    const runs = buildViewerAgentRunsList({
      userId: "user-1",
      apiRuns: [],
      cachedRuns: [baseRun({ id: "run-local" })],
      statusFilter: "all",
      scopeFilter: AgentRunScope.ALL,
      groupFilter: "",
    });

    expect(runs.map((run) => run.id)).toEqual(["run-local"]);
  });
});
