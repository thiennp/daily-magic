import { vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { requestAgentRunStop } from "@/lib/dispatch/requestAgentRunStop";

export type SentMessage = { type: string; payload?: unknown };

export const createStopTestRun = (status: string) => ({
  id: "run-1",
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  prompt: "run lint",
  status,
  dispatchPolicy: "open",
  resultOutput: null,
  resultExitCode: null,
  resultOutcomeCode: null,
  denialReason: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: null,
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  lastRunHeartbeatAt: null,
  deviceId: "device-1",
  projectId: "proj-1",
});

export const stopTestMessage = {
  type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
  payload: { agentRunId: "run-1" },
  requestId: "req-stop-1",
};

export const stopTestDashboard = (userId: string) =>
  ({ role: "dashboard", id: "dash-1", userId }) as never;

/** Hub runtime whose computer socket is (live) or isn't on this instance. */
export const stopTestRuntime = (sent: SentMessage[], live = true) =>
  ({
    findAgentClientForUser: () =>
      live ? { send: (m: SentMessage) => sent.push(m) } : undefined,
  }) as never;

/** Needs vi.mock of agentRunQueries + requestAgentRunStop in the test file. */
export const mockActiveStop = (status: string = AgentRunStatus.RUNNING) => {
  const run = createStopTestRun(status);
  vi.mocked(getAgentRunById).mockResolvedValue(run as never);
  vi.mocked(requestAgentRunStop).mockResolvedValue({
    ok: true,
    endedBeforeStart: status === AgentRunStatus.PENDING_APPROVAL,
    run: run as never,
  });
};
