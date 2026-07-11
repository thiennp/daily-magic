import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

const createCollector = () => {
  const messages: AgentWitchMessage[] = [];
  return {
    messages,
    send: (message: AgentWitchMessage) => {
      messages.push(message);
    },
  };
};

describe("AgentWitchHub", () => {
  let hub: AgentWitchHub;

  beforeEach(() => {
    hub = new AgentWitchHub();
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
      send: () => undefined,
    });

    expect(hub.getStatus()).toEqual({
      agentCount: 1,
      dashboardCount: 1,
    });
  });

  it("dispatches Claude commands from dashboard to agent", () => {
    const agent = createCollector();
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: agent.send,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: () => undefined,
    });

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

  it("returns an error when no agent is connected", () => {
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
    expect(response?.payload?.errorMessage).toBe(
      "No local agent is connected.",
    );
  });

  it("forwards Claude results from agent to dashboards", () => {
    const dashboard = createCollector();
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: dashboard.send,
    });

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
      send: () => undefined,
    });

    const response = hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { prompt: "run lint" },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });

  it("resolves register roles from payload", () => {
    expect(hub.resolveRoleFromRegisterPayload({ role: "agent" })).toBe("agent");
    expect(hub.resolveRoleFromRegisterPayload({ role: "invalid" })).toBeNull();
    expect(hub.resolveRoleFromRegisterPayload(undefined)).toBeNull();
  });

  it("dispatches harness requests from dashboard to agent", () => {
    const agent = createCollector();
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: agent.send,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: () => undefined,
    });

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
              title: "No Let",
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

  it("stores and forwards harness manifest reports to dashboards", () => {
    const dashboard = createCollector();
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: dashboard.send,
    });

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

  it("forwards harness request results from agent to dashboards", () => {
    const dashboard = createCollector();
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      send: dashboard.send,
    });

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
