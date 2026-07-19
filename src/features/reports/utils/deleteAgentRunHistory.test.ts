import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearAgentRunHistory,
  deleteAgentRunHistory,
} from "@/features/reports/utils/deleteAgentRunHistory";
import {
  listAgentRunsLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { isAgentRunLocalCacheTombstoned } from "@/features/reports/agentRunLocalCacheTombstones";
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

describe("deleteAgentRunHistory (AGENT-033 / AGENT-034)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("drops local cache even when remote delete fails", async () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    await expect(deleteAgentRunHistory("run-1")).resolves.toBe(false);
    expect(listAgentRunsLocalCache()).toEqual([]);
    expect(isAgentRunLocalCacheTombstoned("run-1")).toBe(true);
  });

  it("AGENT-034: clear deletes server runs then empties local history", async () => {
    upsertAgentRunLocalCache(makeRun("run-local"));
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/agent-runs") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            runs: [{ id: "run-remote" }, { id: "run-local" }],
          }),
        };
      }
      return { ok: true, status: 200 };
    });
    vi.stubGlobal("fetch", fetchMock);

    await clearAgentRunHistory();

    expect(listAgentRunsLocalCache()).toEqual([]);
    expect(isAgentRunLocalCacheTombstoned("run-local")).toBe(true);
    expect(isAgentRunLocalCacheTombstoned("run-remote")).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith("/api/agent-runs");
    expect(fetchMock).toHaveBeenCalledWith("/api/agent-runs/run-remote", {
      method: "DELETE",
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/agent-runs/run-local", {
      method: "DELETE",
    });
  });

  it("AGENT-034: clear still empties local when list/delete fetch throws", async () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await clearAgentRunHistory();
    expect(listAgentRunsLocalCache()).toEqual([]);
  });
});
