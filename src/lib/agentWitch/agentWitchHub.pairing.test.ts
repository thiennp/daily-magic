import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  USER_EMAIL,
  USER_ID,
  PAIRING_TOKEN,
  createHubFixture,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("AgentWitchHub pairing", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("claims pairing tokens for authenticated dashboard clients", async () => {
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      email: USER_EMAIL,
      send: () => undefined,
    });

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR,
      payload: { pairingToken: PAIRING_TOKEN },
      requestId: "pair-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(pairingStore.getClaimedPairing(PAIRING_TOKEN)?.userId).toBe(USER_ID);
  });

  it("rejects pairing tokens already claimed by another account", async () => {
    await pairingStore.claimPairing(
      PAIRING_TOKEN,
      "other-user",
      "other@example.com",
    );
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      email: USER_EMAIL,
      send: () => undefined,
    });

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR,
      payload: { pairingToken: PAIRING_TOKEN },
      requestId: "pair-2",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toContain("another account");
  });
});
