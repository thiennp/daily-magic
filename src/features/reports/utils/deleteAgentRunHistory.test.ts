import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearAgentRunHistory,
  deleteAgentRunHistory,
} from "@/features/reports/utils/deleteAgentRunHistory";
import {
  listAgentRunsLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const makeRun = (id: string): AgentRunRecord => ({
  id,
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  deviceId: null,
  prompt: "hello",
  status: AgentRunStatus.COMPLETED,
  dispatchPolicy: DispatchPolicy.OPEN,
  writerAgent: "claude-cli",
  capabilityId: null,
  capabilityVersionId: null,
  approvalExpiresAt: null,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  createdAt: "2026-07-19T10:00:00.000Z",
  updatedAt: "2026-07-19T10:00:00.000Z",
  startedAt: null,
  completedAt: null,
});

describe("deleteAgentRunHistory (AGENT-033)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("deletes one run remotely then drops local cache", async () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200 }),
    );

    await expect(deleteAgentRunHistory("run-1")).resolves.toBe(true);
    expect(fetch).toHaveBeenCalledWith("/api/agent-runs/run-1", {
      method: "DELETE",
    });
    expect(listAgentRunsLocalCache()).toEqual([]);
  });

  it("clears all local history after remote deletes", async () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    upsertAgentRunLocalCache(makeRun("run-2"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200 }),
    );

    await clearAgentRunHistory();
    expect(listAgentRunsLocalCache()).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
