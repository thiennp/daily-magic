import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import { AgentWitchHub } from "./agentWitchHub";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

const USER_ID = "user-1";
const USER_EMAIL = "user@example.com";
const PAIRING_TOKEN = "pair-token-1";

const createCollector = () => {
  const messages: AgentWitchMessage[] = [];
  return {
    messages,
    send: (message: AgentWitchMessage) => {
      messages.push(message);
    },
  };
};

const registerPairedClients = (
  hub: AgentWitchHub,
  pairingStore: AgentWitchPairingStore,
  agentSend: (message: AgentWitchMessage) => void,
  dashboardSend: (message: AgentWitchMessage) => void,
): void => {
  pairingStore.claimPairing(PAIRING_TOKEN, USER_ID, USER_EMAIL);
  hub.registerClient({
    id: "agent-1",
    role: "agent",
    userId: USER_ID,
    pairingToken: PAIRING_TOKEN,
    send: agentSend,
  });
  hub.registerClient({
    id: "dash-1",
    role: "dashboard",
    userId: USER_ID,
    email: USER_EMAIL,
    send: dashboardSend,
  });
};

describe("AgentWitchHub", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    pairingStore = new AgentWitchPairingStore();
    hub = new AgentWitchHub(pairingStore);
  });

  it("lists connected clients with roles and timestamps", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    const clients = hub.listConnectedClients();

    expect(clients).toHaveLength(2);
    expect(clients.map((client) => client.role).sort()).toEqual([
      "agent",
      "dashboard",
    ]);
    expect(clients[0]?.connectedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("tracks connected roles in status", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    expect(hub.getStatus()).toEqual({
      agentCount: 1,
      dashboardCount: 1,
    });
  });

  it("dispatches Claude commands from authenticated dashboard to paired agent", () => {
    const agent = createCollector();
    registerPairedClients(hub, pairingStore, agent.send, () => undefined);

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

  it("forwards Claude results from paired agent to matching dashboard", () => {
    const dashboard = createCollector();
    registerPairedClients(hub, pairingStore, () => undefined, dashboard.send);

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

  it("claims pairing tokens for authenticated dashboard clients", () => {
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      email: USER_EMAIL,
      send: () => undefined,
    });

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR,
      payload: { pairingToken: PAIRING_TOKEN },
      requestId: "pair-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(pairingStore.getClaimedPairing(PAIRING_TOKEN)?.userId).toBe(USER_ID);
  });

  it("resolves register roles from payload", () => {
    expect(hub.resolveRoleFromRegisterPayload({ role: "agent" })).toBe("agent");
    expect(hub.resolveRoleFromRegisterPayload({ role: "invalid" })).toBeNull();
    expect(hub.resolveRoleFromRegisterPayload(undefined)).toBeNull();
  });

  it("dispatches harness requests from authenticated dashboard to paired agent", () => {
    const agent = createCollector();
    registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      payload: {
        writerAgent: "claude-cli",
        instruction: "write harness",
        spec: {
          name: "Rules",
          slug: "rules",
          items: [
            {
              id: "item-1",
              kind: "rule",
              title: "Prefer Const",
              content: "Prefer const.",
            },
          ],
        },
      },
      requestId: "req-harness-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK);
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    );
    expect(agent.messages[0]?.payload?.writerAgent).toBe("claude-cli");
  });

  it("stores and forwards harness manifest reports to matching dashboards", () => {
    const dashboard = createCollector();
    registerPairedClients(hub, pairingStore, () => undefined, dashboard.send);

    const response = hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REPORT,
      payload: {
        hostname: "local-mac",
        manifest: {
          version: 1,
          hostname: "local-mac",
          updatedAt: "2026-07-11T21:00:00.000Z",
          activeSetSlugs: ["rules"],
          sets: {},
        },
      },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(hub.listHarnessManifestReports()).toHaveLength(1);
    expect(hub.listHarnessManifestReports()[0]?.hostname).toBe("local-mac");
  });

  it("forwards harness request results from paired agent to matching dashboard", () => {
    const dashboard = createCollector();
    registerPairedClients(hub, pairingStore, () => undefined, dashboard.send);

    hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_RESULT,
      payload: {
        success: true,
        writerAgent: "claude-cli",
        exitCode: 0,
        output: "done",
      },
      requestId: "req-harness-2",
    });

    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.payload?.success).toBe(true);
  });
});
