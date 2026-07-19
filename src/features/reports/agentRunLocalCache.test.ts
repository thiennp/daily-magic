import { beforeEach, describe, expect, it } from "vitest";

import {
  clearAgentRunsLocalCache,
  getAgentRunLocalCache,
  listAgentRunsLocalCache,
  removeAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { isAgentRunLocalCacheTombstoned } from "@/features/reports/agentRunLocalCacheTombstones";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const makeRun = (id: string, prompt = "hello"): AgentRunRecord => ({
  id,
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  deviceId: null,
  prompt,
  status: AgentRunStatus.COMPLETED,
  dispatchPolicy: DispatchPolicy.OPEN,
  writerAgent: "claude-cli",
  capabilityId: null,
  capabilityVersionId: null,
  approvalExpiresAt: null,
  resultOutput: "done",
  resultExitCode: 0,
  denialReason: null,
  createdAt: "2026-07-19T10:00:00.000Z",
  updatedAt: "2026-07-19T10:00:00.000Z",
  startedAt: "2026-07-19T10:00:00.000Z",
  completedAt: "2026-07-19T10:01:00.000Z",
  lastRunHeartbeatAt: null,
});

describe("agentRunLocalCache delete (AGENT-033)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("removes one run and blocks re-upsert via tombstone", () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    upsertAgentRunLocalCache(makeRun("run-2", "other"));
    removeAgentRunLocalCache("run-1");

    expect(getAgentRunLocalCache("run-1")).toBeNull();
    expect(listAgentRunsLocalCache().map((run) => run.id)).toEqual(["run-2"]);
    expect(isAgentRunLocalCacheTombstoned("run-1")).toBe(true);

    upsertAgentRunLocalCache(makeRun("run-1"));
    expect(getAgentRunLocalCache("run-1")).toBeNull();
  });

  it("clears all cached history runs", () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    upsertAgentRunLocalCache(makeRun("run-2", "other"));
    clearAgentRunsLocalCache();

    expect(listAgentRunsLocalCache()).toEqual([]);
    expect(isAgentRunLocalCacheTombstoned("run-1")).toBe(true);
    expect(isAgentRunLocalCacheTombstoned("run-2")).toBe(true);
  });
});
