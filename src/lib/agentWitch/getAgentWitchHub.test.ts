import { afterEach, describe, expect, it } from "vitest";

import {
  getAgentWitchHub,
  getAgentWitchPairingStore,
  resetAgentWitchHubForTests,
} from "@/lib/agentWitch/getAgentWitchHub";

describe("getAgentWitchHub", () => {
  afterEach(() => {
    resetAgentWitchHubForTests();
  });

  it("AGENT-003: returns the same hub instance across repeated lookups", () => {
    const first = getAgentWitchHub();
    const second = getAgentWitchHub();

    expect(second).toBe(first);
    expect(getAgentWitchPairingStore()).toBe(first.pairingStore);
  });

  it("AGENT-003: keeps registered agent clients visible to later lookups", () => {
    const hub = getAgentWitchHub();
    hub.registerClient({
      id: "agent-client-1",
      role: "agent",
      userId: "user-1",
      deviceId: "device-1",
      pairingToken: "token-1",
      send: () => undefined,
    });

    expect(getAgentWitchHub().listAgentClients()).toEqual([
      expect.objectContaining({ id: "agent-client-1", deviceId: "device-1" }),
    ]);
  });

  it("resetAgentWitchHubForTests clears the process-wide singleton", () => {
    const beforeReset = getAgentWitchHub();
    resetAgentWitchHubForTests();
    const afterReset = getAgentWitchHub();

    expect(afterReset).not.toBe(beforeReset);
  });
});
