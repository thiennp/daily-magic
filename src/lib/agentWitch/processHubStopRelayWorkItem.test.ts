import { beforeEach, describe, expect, it, vi } from "vitest";

import { processHubStopRelayWorkItem } from "@/lib/agentWitch/processHubStopRelayWorkItem";
import {
  completeAgentWitchHubDispatchRelay,
  releaseAgentWitchHubDispatchRelayToPending,
} from "@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

vi.mock("@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus", () => ({
  completeAgentWitchHubDispatchRelay: vi.fn(async () => undefined),
  releaseAgentWitchHubDispatchRelayToPending: vi.fn(async () => undefined),
}));

const body = { kind: "stop" as const, agentRunId: "run-1" };
const workItem = {
  relayId: "relay-1",
  executorUserId: "device-owner",
  requesterUserId: "project-owner",
  requesterEmail: null,
  deviceId: "device-1",
  requestId: "stop:run-1",
  body,
};

describe("processHubStopRelayWorkItem (S0-7)", () => {
  beforeEach(() => {
    vi.mocked(completeAgentWitchHubDispatchRelay).mockClear();
    vi.mocked(releaseAgentWitchHubDispatchRelayToPending).mockClear();
  });

  it("sends command.claude.stop to the exact device and completes the relay", async () => {
    const sent: unknown[] = [];
    const findAgentClientForUser = vi.fn(() => ({
      send: (m: unknown) => sent.push(m),
    }));
    await processHubStopRelayWorkItem(
      { findAgentClientForUser } as never,
      workItem,
      body,
    );
    expect(findAgentClientForUser).toHaveBeenCalledWith(
      "device-owner",
      "device-1",
    );
    expect(sent).toEqual([
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
        requestId: "stop:run-1",
      },
    ]);
    expect(completeAgentWitchHubDispatchRelay).toHaveBeenCalledWith({
      relayId: "relay-1",
      result: { ok: true },
    });
  });

  it("releases the relay when the socket is gone", async () => {
    await processHubStopRelayWorkItem(
      { findAgentClientForUser: () => undefined } as never,
      workItem,
      body,
    );
    expect(releaseAgentWitchHubDispatchRelayToPending).toHaveBeenCalledWith(
      "relay-1",
    );
    expect(completeAgentWitchHubDispatchRelay).not.toHaveBeenCalled();
  });
});
