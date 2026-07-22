import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { handleClaudeStopMessageAsync } from "@/lib/dispatch/handleClaudeStopMessageAsync";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: vi.fn(),
}));

const createRun = (status: string) => ({
  id: "run-1",
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  prompt: "run lint",
  status,
  dispatchPolicy: "open",
  resultOutput: null,
  resultExitCode: null,
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
});

describe("handleClaudeStopMessageAsync", () => {
  beforeEach(() => {
    vi.mocked(getAgentRunById).mockReset();
  });

  it("rejects non-dashboard clients", async () => {
    const response = await handleClaudeStopMessageAsync(
      { findAgentClientForUser: () => undefined } as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
      },
      { role: "agent", id: "agent-1", userId: "user-1" } as never,
    );

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });

  it("forwards stop to the paired Mac agent for an active run", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue(
      createRun(AgentRunStatus.RUNNING) as never,
    );

    const agentMessages: Array<{ type: string; payload?: unknown }> = [];
    const response = await handleClaudeStopMessageAsync(
      {
        findAgentClientForUser: () => ({
          send: (message: { type: string; payload?: unknown }) => {
            agentMessages.push(message);
          },
        }),
      } as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
        requestId: "req-stop-1",
      },
      { role: "dashboard", id: "dash-1", userId: "user-1" } as never,
    );

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(response?.payload).toMatchObject({
      agentRunId: "run-1",
      stopped: true,
    });
    expect(agentMessages).toHaveLength(1);
    expect(agentMessages[0]).toMatchObject({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
      payload: { agentRunId: "run-1" },
      requestId: "req-stop-1",
    });
  });

  it("rejects stop when the run is no longer active", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue(
      createRun(AgentRunStatus.COMPLETED) as never,
    );

    const response = await handleClaudeStopMessageAsync(
      {
        findAgentClientForUser: () => ({
          send: () => undefined,
        }),
      } as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
      },
      { role: "dashboard", id: "dash-1", userId: "user-1" } as never,
    );

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toContain("not active");
  });
});
