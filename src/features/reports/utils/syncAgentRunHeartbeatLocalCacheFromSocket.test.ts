import { beforeEach, describe, expect, it } from "vitest";

import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { syncAgentRunHeartbeatLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunHeartbeatLocalCacheFromSocket";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const makeRun = (id: string): AgentRunRecord => ({
  id,
  groupId: null,
  requesterUserId: "u1",
  executorUserId: "u1",
  prompt: "do work",
  status: AgentRunStatus.RUNNING,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  createdAt: "2026-07-21T10:00:00.000Z",
  updatedAt: "2026-07-21T10:00:00.000Z",
  startedAt: "2026-07-21T10:00:00.000Z",
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: "d1",
  writerAgent: "claude-cli",
  lastRunHeartbeatAt: null,
});

describe("syncAgentRunHeartbeatLocalCacheFromSocket (AGENT-058)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("patches lastRunHeartbeatAt for a cached RUNNING run", () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    const synced = syncAgentRunHeartbeatLocalCacheFromSocket(
      JSON.stringify({
        type: "run.heartbeat",
        payload: {
          agentRunId: "run-1",
          at: "2026-07-21T10:01:00.000Z",
        },
      }),
    );

    expect(synced).toBe(true);
    expect(getAgentRunLocalCache("run-1")?.lastRunHeartbeatAt).toBe(
      "2026-07-21T10:01:00.000Z",
    );
  });

  it("patches report summary fields for a cached RUNNING run", () => {
    upsertAgentRunLocalCache(makeRun("run-1"));
    const synced = syncAgentRunHeartbeatLocalCacheFromSocket(
      JSON.stringify({
        type: "run.heartbeat",
        payload: {
          agentRunId: "run-1",
          at: "2026-07-21T10:01:00.000Z",
          reportStatus: "in_progress",
          reportSummary: "Reading project files.",
        },
      }),
    );

    expect(synced).toBe(true);
    expect(getAgentRunLocalCache("run-1")).toMatchObject({
      lastRunHeartbeatAt: "2026-07-21T10:01:00.000Z",
      reportStatus: "in_progress",
      reportSummary: "Reading project files.",
    });
  });

  it("ignores non-heartbeat messages", () => {
    expect(
      syncAgentRunHeartbeatLocalCacheFromSocket(
        JSON.stringify({ type: "agent.run.record", payload: {} }),
      ),
    ).toBe(false);
  });
});
