import { describe, expect, it } from "vitest";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import disconnectAgentClientsForDevice from "@/lib/agentWitch/disconnectAgentClientsForDevice";
import { createHubFixture } from "@/lib/agentWitch/agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const USER_ID = "user-1";
const DEVICE_ID = "device-1";

describe("disconnectAgentClientsForDevice", () => {
  it("disconnects only matching online agent clients for the user", () => {
    const { hub } = createHubFixture();
    const sentMessages: unknown[] = [];

    hub.registerClient({
      id: "agent-target",
      role: "agent",
      userId: USER_ID,
      deviceId: DEVICE_ID,
      send: (message) => {
        sentMessages.push(message);
      },
    });
    hub.registerClient({
      id: "agent-other-device",
      role: "agent",
      userId: USER_ID,
      deviceId: "device-2",
      send: () => undefined,
    });
    hub.registerClient({
      id: "agent-other-user",
      role: "agent",
      userId: "other-user",
      deviceId: DEVICE_ID,
      send: () => undefined,
    });

    disconnectAgentClientsForDevice(hub, USER_ID, DEVICE_ID);

    expect(sentMessages).toEqual([
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage: "This device was removed from your account.",
        },
      },
    ]);
    expect(hub.listOnlineAgentClientsForUser(USER_ID)).toHaveLength(1);
    expect(hub.listOnlineAgentClientsForUser(USER_ID)[0]?.id).toBe(
      "agent-other-device",
    );
    expect(hub.listOnlineAgentClientsForUser("other-user")).toHaveLength(1);
  });

  it("is a no-op when no matching clients are connected", () => {
    const hub = new AgentWitchHub(createHubFixture().pairingStore);

    expect(() => {
      disconnectAgentClientsForDevice(hub, USER_ID, DEVICE_ID);
    }).not.toThrow();
  });
});
