import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const TERMINAL_STREAM_TEST_RUN_ID = "run-stream-1";

export const buildTerminalStreamTestRun = (
  overrides: Partial<AgentRunRecord> = {},
): AgentRunRecord => ({
  id: TERMINAL_STREAM_TEST_RUN_ID,
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
  ...overrides,
});

export const buildTerminalStreamExecutorAgent = (
  overrides: Partial<AgentWitchHubClient> = {},
): AgentWitchHubClient => ({
  id: "agent-1",
  role: "agent",
  userId: "executor-1",
  deviceId: "device-1",
  send: () => undefined,
  ...overrides,
});

export const createTerminalStreamTestRuntime = (): {
  readonly runtime: AgentWitchHubRuntime;
  readonly broadcasts: AgentWitchMessage[];
} => {
  const broadcasts: AgentWitchMessage[] = [];
  return {
    broadcasts,
    runtime: {
      broadcastToDashboardUser: (_userId, message) => {
        broadcasts.push(message);
      },
    } as AgentWitchHubRuntime,
  };
};
