import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findEnrichedAgentClientForUser: vi.fn(),
  listFreshRegistryDeviceIdsForUser: vi.fn(),
  enqueueAgentWitchDispatchOutbox: vi.fn(),
  findAgentWitchDeviceById: vi.fn(),
}));

vi.mock("@/lib/agentWitch/findEnrichedAgentClientForUser", () => ({
  findEnrichedAgentClientForUser: mocks.findEnrichedAgentClientForUser,
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  listFreshRegistryDeviceIdsForUser: mocks.listFreshRegistryDeviceIdsForUser,
}));

vi.mock("@/lib/agentWitch/enqueueAgentWitchDispatchOutbox", () => ({
  enqueueAgentWitchDispatchOutbox: mocks.enqueueAgentWitchDispatchOutbox,
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: mocks.findAgentWitchDeviceById,
}));

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));

import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("deliverOrQueueAgentWitchDispatchMessage", () => {
  beforeEach(() => {
    mocks.findEnrichedAgentClientForUser.mockReset();
    mocks.listFreshRegistryDeviceIdsForUser.mockReset();
    mocks.enqueueAgentWitchDispatchOutbox.mockReset();
    mocks.findAgentWitchDeviceById.mockReset();
  });

  it("delivers immediately when a live client exists", async () => {
    const send = vi.fn();
    mocks.findEnrichedAgentClientForUser.mockResolvedValue({
      role: "agent",
      send,
    });

    const result = await deliverOrQueueAgentWitchDispatchMessage({
      userId: "user-1",
      deviceId: "device-1",
      idempotencyKey: "key-1",
      message: {
        type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
        payload: {},
      },
    });

    expect(result.kind).toBe("delivered");
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("queues harness work when registry shows the device live elsewhere", async () => {
    mocks.findEnrichedAgentClientForUser.mockResolvedValue(undefined);
    mocks.listFreshRegistryDeviceIdsForUser.mockResolvedValue(
      new Set(["device-1"]),
    );
    mocks.enqueueAgentWitchDispatchOutbox.mockResolvedValue({
      outboxId: "outbox-1",
      queued: true,
    });

    const result = await deliverOrQueueAgentWitchDispatchMessage({
      userId: "user-1",
      deviceId: "device-1",
      idempotencyKey: "key-1",
      message: {
        type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
        payload: {},
      },
    });

    expect(result).toEqual({ kind: "queued", outboxId: "outbox-1" });
  });
});
