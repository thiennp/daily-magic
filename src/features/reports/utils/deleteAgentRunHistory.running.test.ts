import { beforeEach, describe, expect, it, vi } from "vitest";

import { deleteAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import {
  listAgentRunsLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const makeRunningRun = (): AgentRunRecord => ({
  id: "run-running",
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  deviceId: null,
  prompt: "hello",
  status: AgentRunStatus.RUNNING,
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
  startedAt: "2026-07-19T10:00:00.000Z",
  completedAt: null,
  lastRunHeartbeatAt: null,
});

describe("deleteAgentRunHistory running jobs (AGENT-059)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("requests stop before deleting a running job", async () => {
    upsertAgentRunLocalCache(makeRunningRun());
    const fetchMock = vi.fn(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.endsWith("/stop") && init?.method === "POST") {
          return { ok: true, status: 200, json: async () => ({ ok: true }) };
        }
        if (init?.method === "DELETE") {
          return { ok: true, status: 200 };
        }
        return { ok: false, status: 500 };
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(deleteAgentRunHistory("run-running")).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledWith("/api/agent-runs/run-running/stop", {
      method: "POST",
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/agent-runs/run-running", {
      method: "DELETE",
    });
    expect(listAgentRunsLocalCache()).toEqual([]);
  });
});
