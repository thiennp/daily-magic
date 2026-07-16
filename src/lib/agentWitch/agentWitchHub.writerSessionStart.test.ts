import "./agentWitchHub.claude.testMocks";
import { beforeEach, describe, expect, it } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("AgentWitchHub writer session start", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("relays writer session start from dashboard to paired agent", async () => {
    const agent = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "cursor" },
      requestId: "req-writer-start-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
    );
    expect(agent.messages[0]?.payload?.writerAgent).toBe("cursor");
  });
});
