import { describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { handleAgentRunHeartbeatMessageAsync } from "@/lib/dispatch/handleAgentRunHeartbeatMessageAsync";
import { touchAgentRunHeartbeatAt } from "@/lib/dispatch/touchAgentRunHeartbeatAt";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({ getAgentRunById: vi.fn() }));
vi.mock("@/lib/dispatch/touchAgentRunHeartbeatAt", () => ({
  touchAgentRunHeartbeatAt: vi.fn(),
}));
vi.mock("@/lib/dispatch/reconcileStaleAgentRuns", () => ({
  reconcileStaleAgentRuns: vi.fn(async () => undefined),
}));
vi.mock("@/lib/dispatch/dispatchWriterRunToAgent", () => ({
  notifyDashboardUser: vi.fn(),
}));

const run = {
  id: "run-1",
  requesterUserId: "member-1",
  executorUserId: "device-owner",
  status: "running",
};

const heartbeat = {
  type: AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT,
  payload: { agentRunId: "run-1" },
  requestId: "hb-1",
};

describe("run.heartbeat applies a stored stop (S0-7)", () => {
  it("sends command.claude.stop back on the computer socket when stop_requested_at is set", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue(run as never);
    vi.mocked(touchAgentRunHeartbeatAt).mockResolvedValue({
      ...run,
      stopRequestedAt: "2026-10-06T12:00:00.000Z",
    } as never);
    const sent: unknown[] = [];
    const sender = {
      role: "agent",
      id: "a1",
      userId: "device-owner",
      send: (m: unknown) => sent.push(m),
    };

    const response = await handleAgentRunHeartbeatMessageAsync(
      {} as never,
      heartbeat,
      sender as never,
    );

    expect(sent).toEqual([
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
        requestId: "hb-1",
      },
    ]);
    expect(response?.payload).toMatchObject({
      heartbeat: true,
      stopRequested: true,
    });
  });

  it("sends nothing extra when no stop is stored", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue(run as never);
    vi.mocked(touchAgentRunHeartbeatAt).mockResolvedValue({
      ...run,
      stopRequestedAt: null,
    } as never);
    const sent: unknown[] = [];
    const sender = {
      role: "agent",
      id: "a1",
      userId: "device-owner",
      send: (m: unknown) => sent.push(m),
    };

    const response = await handleAgentRunHeartbeatMessageAsync(
      {} as never,
      heartbeat,
      sender as never,
    );

    expect(sent).toHaveLength(0);
    expect(response?.payload).not.toHaveProperty("stopRequested");
  });
});
