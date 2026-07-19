import { afterEach, describe, expect, it } from "vitest";

import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { authorizeTerminalStreamPublisher } from "@/lib/dispatch/authorizeTerminalStreamPublisher";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  registerAgentRunSession,
  removeAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const RUN_ID = "run-1";

const baseRun = (overrides: Partial<AgentRunRecord> = {}): AgentRunRecord => ({
  id: RUN_ID,
  groupId: null,
  requesterUserId: "requester-1",
  executorUserId: "executor-1",
  prompt: "run tests",
  status: AgentRunStatus.RUNNING,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  createdAt: "2026-07-14T20:00:00.000Z",
  updatedAt: "2026-07-14T20:00:00.000Z",
  startedAt: "2026-07-14T20:00:00.000Z",
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: null,
  writerAgent: "claude-cli",
  lastRunHeartbeatAt: null,
  ...overrides,
});

const executorAgent = (
  overrides: Partial<AgentWitchHubClient> = {},
): AgentWitchHubClient => ({
  id: "agent-1",
  role: "agent",
  userId: "executor-1",
  deviceId: "device-1",
  send: () => undefined,
  ...overrides,
});

describe("authorizeTerminalStreamPublisher", () => {
  afterEach(() => {
    removeAgentRunSession(RUN_ID);
  });

  it("authorizes the run executor for a running run", async () => {
    registerAgentRunSession(baseRun());

    const result = await authorizeTerminalStreamPublisher(
      executorAgent(),
      RUN_ID,
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.run.id).toBe(RUN_ID);
      expect(result.publisher.executorUserId).toBe("executor-1");
    }
  });

  it("rejects agents that are not the run executor", async () => {
    registerAgentRunSession(baseRun());

    const result = await authorizeTerminalStreamPublisher(
      executorAgent({ userId: "other-user" }),
      RUN_ID,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.payload?.errorMessage).toBe(
        "Agent is not the run executor.",
      );
    }
  });

  it("rejects streams for non-running runs unless cleanup is allowed", async () => {
    registerAgentRunSession(
      baseRun({
        status: AgentRunStatus.COMPLETED,
        completedAt: "2026-07-14T20:01:00.000Z",
      }),
    );

    const blocked = await authorizeTerminalStreamPublisher(
      executorAgent(),
      RUN_ID,
    );
    expect(blocked.ok).toBe(false);

    const allowed = await authorizeTerminalStreamPublisher(
      executorAgent(),
      RUN_ID,
      { allowNonRunning: true },
    );
    expect(allowed.ok).toBe(true);
  });

  it("rejects agents when the run device does not match", async () => {
    registerAgentRunSession(baseRun({ deviceId: "device-expected" }));

    const result = await authorizeTerminalStreamPublisher(
      executorAgent({ deviceId: "device-other" }),
      RUN_ID,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.payload?.errorMessage).toBe(
        "Agent device does not match the run executor device.",
      );
    }
  });
});
