import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  USER_ID,
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("AgentWitchHub Claude commands", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("dispatches Claude commands from authenticated dashboard to paired agent", async () => {
    const agent = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "run lint" },
      requestId: "req-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    );
    expect(agent.messages[0]?.payload?.prompt).toBe("run lint");
  });

  it("rejects Claude commands from unauthenticated dashboard clients", () => {
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: () => undefined,
    });

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "run lint" },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toContain("authenticated");
  });

  it("returns an error when no paired agent is connected", () => {
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "run lint" },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(response?.payload?.errorMessage).toBe(
      "No paired local agent is connected for your account.",
    );
  });

  it("forwards Claude results from paired agent to matching dashboard", async () => {
    const dashboard = createCollector();
    await registerPairedClients(
      hub,
      pairingStore,
      () => undefined,
      dashboard.send,
    );

    const response = hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { exitCode: 0, output: "done" },
      requestId: "req-2",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.payload?.output).toBe("done");
  });

  it("rejects Claude commands from agent clients", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      userId: USER_ID,
      send: () => undefined,
    });

    const response = hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "run lint" },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });
});
