import "./agentWitchHub.writerRun.testMocks";
import { beforeEach, describe, expect, it } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  createCollector,
  createHubFixture,
  registerPairedClients,
  USER_ID,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("AgentWitchHub writer session end", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("relays writer session end from dashboard to paired agent", async () => {
    const agent = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      payload: { writerAgent: "claude-cli" },
      requestId: "req-writer-end-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
    );
    expect(agent.messages[0]?.payload?.writerAgent).toBe("claude-cli");
  });

  it("rejects writer session end without writerAgent", async () => {
    await registerPairedClients(
      hub,
      pairingStore,
      () => undefined,
      () => undefined,
    );

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      payload: {},
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toContain("writerAgent");
  });

  it("rejects writer session end when no Mac is connected", async () => {
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      payload: { writerAgent: "codex" },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toBe(
      "Your Mac is offline. Open Agent Witch on your Mac — it checks in about every 30 seconds.",
    );
  });
});
