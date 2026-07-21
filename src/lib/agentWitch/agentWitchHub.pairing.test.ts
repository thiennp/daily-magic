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

  it("rejects dashboard agent.pair because Macs link through install tokens", async () => {
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

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toContain("Home install command");
    expect(pairingStore.getClaimedPairing(PAIRING_TOKEN)).toBeNull();
  });

  it("keeps install-token claims available for agent registration", async () => {
    await pairingStore.claimPairing(
      PAIRING_TOKEN,
      USER_ID,
      USER_EMAIL,
      "MacBook-Pro",
    );

    expect(pairingStore.getClaimedPairing(PAIRING_TOKEN)?.userId).toBe(USER_ID);
  });
});
